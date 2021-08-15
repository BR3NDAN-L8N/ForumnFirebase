/**
 * NON-SPECIFIC QUERIES 
 * 
 * These queries GET / FETCH data from firebase.
 * Their intended to be reusable boiler plate for
 * specific document and/or collection queries
 */

import DB from '../firebase' // DB === DB.firestore()

/**
 * 
 * @param {String} collectionName 
 * @returns An {Object} with the Documents from specified Collection. Object.docs.map(documents => {}) to loop through the Documents.
 */
export async function getAllDocsFromCollection(collectionName) {
    const data = await DB.collection(collectionName).get()
    return data
}