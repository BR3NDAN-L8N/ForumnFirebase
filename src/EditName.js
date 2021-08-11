import React from 'react'
import firebase from 'firebase'

export default function EditName({ document }) {

    const [newName, setNewName] = React.useState(document.name)

    const handleUpdate = () => {
        const database = firebase.firestore()
        const newDoc = database.collection("test-collection").doc(`${document.id}`).set({...document, name: newName})
        console.log(`NEW DOCUMENT: ${newDoc}`);
    }

    return (
        <form>
            <input type="text"
                value={newName}
                onChange={event => {
                    setNewName(event.target.value)
                }}
            />
            <button onClick={handleUpdate()}>Update</button>
        </form>
    )
}
