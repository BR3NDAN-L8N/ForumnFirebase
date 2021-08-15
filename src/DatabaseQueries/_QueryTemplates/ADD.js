/**
 * NON-SPECIFIC QUERIES 
 * 
 * These queries ADD / POST data to firebase.
 * 
 * Their intended to be reusable boiler plate for
 * specific document and/or collection queries
 */

import DB from '../firebase' // DB === DB.firestore()

export async function addDocToCollection(newDocumentName, collectionName) {
    const responseFromQuery = DB.collection(collectionName).doc().set(newDocumentName)
    return responseFromQuery
}