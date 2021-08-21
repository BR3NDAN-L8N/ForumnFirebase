// REACT
import React, { useState, useRef, useEffect, FC } from 'react'

// DATABASE
import {
    DB_getAllThreads,
    DB_addNewThread
} from '../../Firebase/DB/Threads'

// INTERFACE
import { IThreadObject } from '../../Interfaces/_index';

export const Threads: FC = () => {

    const [savedThreads, setSavedThreads] = useState(Array<IThreadObject>())

    const inputRef_threadTitle = useRef<HTMLInputElement | null>(null)
    const textareaRef_threadMessage = useRef<HTMLTextAreaElement | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            const threads = await DB_getAllThreads()

            setSavedThreads(threads.docs.map((doc: any) => {
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

    const updateThreadState = (newData: IThreadObject) => {
        const newThreads: IThreadObject[] = [...savedThreads, newData]
        setSavedThreads(newThreads)
    }

    const handleNewThread = (event: React.SyntheticEvent): void => {
        event.preventDefault()  // prevent submitting form from refreshing the page

        if (  // if either of these are null then TS has a fit
            inputRef_threadTitle.current === null ||
            textareaRef_threadMessage.current === null
        ) { return }

        // Compile thread and it's creators data
        const newThread: IThreadObject = {
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
            <section className="threads">
                <ul>
                    {savedThreads.length > 0 &&
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
