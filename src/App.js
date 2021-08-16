// REACT
import React from 'react'

// DATABASE
import {
    DB_getAllThreads,
    DB_addNewThread
} from './DatabaseQueries/Threads'

// CSS
import './App.css';

function App() {

    const [savedThreads, setSavedThreads] = React.useState([])

    React.useEffect(() => {
        const fetchData = async () => {
            const threads = await DB_getAllThreads()
            setSavedThreads(threads.docs.map(doc => {
                console.log('threads from DB=> doc: ', doc.data())
                return {
                    id: doc.id,
                    ...doc.data()
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
        event.preventDefault()

        console.log('handleNewThread=> event.target.children: ')
        console.dir(event.target.children)

        const newThread = {
            title: document.querySelector("input[name='new-thread-title']").value,
            message: document.querySelector("textarea[name='new-thread-message']").value,
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

        <article className="thread-home">
            <div className="options">
                <form
                    onSubmit={handleNewThread}
                    className="create-new-thread">
                    <div>
                        <label
                            htmlFor="new-thread-title"
                            value="Title:"
                        ></label>
                        <input
                            htmlFor="new-thread-title"
                            type="text"
                            name="new-thread-title"
                            placeholder="New Thread's Title"
                        />
                    </div>
                    <div>
                        <label htmlFor="new-thread-message">What Do You Want To Say?</label>
                        <textarea
                            htmlFor="new-thread-message"
                            name="new-thread-message"
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

export default App;
