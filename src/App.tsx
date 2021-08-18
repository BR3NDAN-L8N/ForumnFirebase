// REACT
import {useState, useRef, useEffect, FC} from 'react'

// DATABASE
import {
    DB_getAllThreads,
    DB_addNewThread
} from './DatabaseQueries/Threads'

// CSS
import './App.css';


interface ThreadObject {
    id?: string,
    title: any,
    message: any,
    creatorsName: string,
    creatorsIcon: any,
    creatorsId: string
}

export const App: FC = () => {

    const [savedThreads, setSavedThreads] = useState(Array<ThreadObject>())

    const inputRef_threadTitle = useRef<HTMLInputElement>()
    const textareaRef_threadMessage = useRef<HTMLTextAreaElement>()

    useEffect(() => {
        const fetchData = async () => {
            const threads = await DB_getAllThreads()
            setSavedThreads(threads.docs.map(doc => {
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

    const updateThreadState = (newData: ThreadObject) => {
        const newThreads: ThreadObject[] = [...savedThreads, newData]
        setSavedThreads(newThreads)
    }

    const handleNewThread = (event) => {
        event.preventDefault()

        const newThread:ThreadObject = {
            title: inputRef_threadTitle.current.value,
            message: textareaRef_threadMessage.current.value,
            creatorsName: "Admin",
            creatorsIcon: "8-{)",
            creatorsId: "012AdminId210"
        }
        console.log(`newThread's Object: `, newThread)

        const response = DB_addNewThread(newThread)
        console.log('addThread response: ', response)
        updateThreadState(newThread)
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
            <section className="threads">
                <ul>
                    {   savedThreads.length > 0 &&
                        savedThreads.map(thread => {
                            return (
                                <li key={thread.id}>
                                    <hr />
                                    <h2>{thread.title}</h2>
                                    <h3>CREATED BY: {thread.creatorsName} {thread.creatorsIcon}</h3>
                                    <p>{thread.message}</p>
                                </li>
                            )
                        })
                    }
                </ul>
            </section>

        </article>
    );
}
