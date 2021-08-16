/**
 * NON-SPECIFIC QUERIES 
 * 
 * These queries ADD / POST data to firebase.
 * 
 * Their intended to be reusable boiler plate for
 * specific document and/or collection queries
 */

import DB from '../firebase' // DB === DB.firestore()

/**
 *
 * @param {Object} newDocument
 * @param {String} collectionName
 * @returns An {Object} with the Documents from specified Collection. Object.docs.map(documents => {}) to loop through the Documents.
 */
export async function addDocumentToCollection(newDocument, collectionName) {
    const responseFromQuery = DB.collection(collectionName).doc().set(newDocument)
    return responseFromQuery
}