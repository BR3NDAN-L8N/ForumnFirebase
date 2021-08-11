import DB from './firebase'

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

    return (
        <ol>
            {savedDocs.map((document) => {

                console.log("property: ", document);
                return (
                    <li
                        key={document.id}
                    >
                        {document.name}
                        <EditName
                            document={document}
                        />
                    </li>
                )
            })
            }
        </ol>

    );
}

export default App;
