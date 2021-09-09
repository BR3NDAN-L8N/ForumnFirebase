// REACT
import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'

// STYLES
import './Threads.css'

// DATABASE
import {
    DB_getAllThreads,
    DB_addNewThread
} from '../../Firebase/DB/Threads'


export default function Threads() {

    const [savedThreads, setSavedThreads] = useState([])

    const inputRef_threadTitle = useRef()
    const textareaRef_threadMessage = useRef()

    useEffect(() => {   
        const fetchData = async () => {
            const threads = await DB_getAllThreads()

            setSavedThreads(threads.docs.map((doc) => {
                console.log('threads from DB=> doc: ', doc.data())
                return {
                    id: doc.id,
                    title: doc.data().title,
                    message: doc.data().message,
                    creatorsName: doc.data().creatorsName,
                    creatorsIcon: doc.data().creatorsIcon,
                    creatorsId: doc.data().creatorsId,
                }
            }))
        }

        fetchData()
    }, [])

    const updateThreadState = (newData) => {
        const newThreads = [...savedThreads, newData]
        setSavedThreads(newThreads)
    }

    const handleNewThread = (event) => {
        event.preventDefault()  // prevent submitting form from refreshing the page

        if (  // if either of these are null then TS has a fit
            inputRef_threadTitle.current === null ||
            textareaRef_threadMessage.current === null
        ) { return }

        // Compile thread and it's creators data
        const newThread = {
            title: inputRef_threadTitle.current.value,
            message: textareaRef_threadMessage.current.value,
            creatorsName: "Admin",
            creatorsIcon: "8-{)",
            creatorsId: "012AdminId210"
        }
        // Log it, delete when finished coding function
        console.log(`newThread's Object: `, newThread)

        // Add the new thread to the DB
        const response = DB_addNewThread(newThread)
        console.log('addThread response: ', response)
        // Update threads in state
        updateThreadState(newThread)

        // reset input and textarea fields to being blank
        inputRef_threadTitle.current.value = ""
        textareaRef_threadMessage.current.value = ""
    }

    return (

        <article className="thread-home App">
            <div className="options">
                <form
                    onSubmit={handleNewThread}
                    className="create-new-thread">
                    <div>
                        <input
                            ref={inputRef_threadTitle}
                            type="text"
                            name="new-thread-title"
                            placeholder="New Thread's Title"
                        />
                    </div>
                    <div>
                        <textarea
                            ref={textareaRef_threadMessage}
                            placeholder="What Do You Want To Say?"
                        ></textarea>
                    </div>

                    <input type="submit" value="SUBMIT" />
                </form>
            </div>
            <section className="threads-list">
                <ul>
                    {savedThreads.length > 0 &&
                        savedThreads.map(thread => {
                            return (
                                <li key={thread.id}>
                                    <Link to={`/threads/thread/${thread.id}`}>
                                        <h2>{thread.title}</h2>
                                    </Link>
                                </li>
                            )
                        })
                    }
                </ul>
            </section>

        </article>
    );
}
