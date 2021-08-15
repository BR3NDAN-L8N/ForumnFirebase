import React from 'react'
import firebase from 'firebase'

export default function EditName({ document }) {

    const [newName, setNewName] = React.useState(document.name)

    const handleUpdate = (event) => {
        event.preventDefault()
        const database = firebase.firestore()
        const newDoc = database.collection("test-collection").doc(`${document.id}`).set({ ...document, name: newName })
        console.log(`NEW DOCUMENT: ${newDoc}`);
    }

    return (
        <>
            <form onSubmit={handleUpdate} style={{display: "none"}} >
                <input type="text"
                    value={newName}
                    onChange={event => {
                        setNewName(event.target.value)
                    }}
                />
                <button type="submit">Update</button>
            </form>
        </>
    )
}
