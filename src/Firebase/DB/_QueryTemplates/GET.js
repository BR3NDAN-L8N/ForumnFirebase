/**
 * NON-SPECIFIC QUERIES 
 * 
 * These queries GET / FETCH data from firebase.
 * Their intended to be reusable boiler plate for
 * specific document and/or collection queries
 */

import { DB } from '../../firebase' // DB === DB.firestore()

/**
 * 
 * @param {String} collectionName 
 * @returns An {Object} with the Documents from specified Collection. Object.docs.map(documents => {}) to loop through the Documents.
 */
export async function getAllDocumentsFromCollection(collectionName) {
    const data = await DB.collection(collectionName).get()
    return data
}

/**
 * 
 * @param {String} documentId 
 * @returns An {Object} with the Documents from specified Collection. Object.docs.map(documents => {}) to loop through the Documents.
 */
export async function getDocumentByIdFromCollection(documentId, collectionName) {
    const doc = await DB.collection(collectionName).doc(documentId).get()
    if (doc.exists) {
        return {
            status: "success",
            data: doc.data()
        }
    } else {
        return {
            status: "fail"
        }
    }
}