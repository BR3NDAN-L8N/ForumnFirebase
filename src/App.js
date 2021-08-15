import DB from './DatabaseQueries/firebase'
import {addDocToCollection} from './DatabaseQueries/_QueryBoilers/ADD'

import React from 'react'

import EditName from './EditName';

import './App.css';

function App() {

    const [savedDocs, setSavedDocs] = React.useState([])

    React.useEffect(() => {
        const fetchData = async () => {
            // const database = DB.firestore()
            const data = await DB.collection("test-collection").get()

            console.log("data: ", data)
            console.log("data.docs: ", data.docs)
            setSavedDocs(data.docs.map(doc => {
                const id = doc.id
                return {
                    id: id,
                    ...doc.data()
                }
            }))
        }

        fetchData()
    }, [])

    const addNewComment = (event) => {
        event.preventDefault()
        // console.dir prints out the value in the <textarea/> where the user put their comment
        console.dir(event.target.children['new-comment-textarea'].value)
        // stick the textarea.value in an object to send to DB
        let newComment = { comment: event.target.children['new-comment-textarea'].value }
        // sending the object to DB :: .doc() lets firebase decide the id
        addDocToCollection(newComment, 'test-collection')
            .then(() => {
                setSavedDocs((previouslySavedDocs) => [newComment, ...previouslySavedDocs]);
            })
            .catch((err) => {
                console.error(err);
            });
    }

    return (

        <section className="comments">

            <ol style={{ listStyle: 'none' }} className="list-of-comments">
                {savedDocs.map((document) => {

                    console.log("property: ", document);
                    return (
                        <li key={document.id} id={document.id} className="comment-card">
                            <p>
                                {document.comment}
                            </p>
                            <EditName document={document} />

                        </li>
                    )
                })}
            </ol>

            <form onSubmit={addNewComment} className="create-new-comment">
                <textarea name="new-comment-textarea" id="new-comment-id" cols="30" rows="10">

                </textarea>
                <input type="submit" value="SUBMIT" />
            </form>
        </section>
    );
}

export default App;
