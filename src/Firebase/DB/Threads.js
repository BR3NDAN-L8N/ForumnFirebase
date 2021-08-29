import { getAllDocumentsFromCollection, getDocumentByIdFromCollection } from './_QueryTemplates/GET'
import { addDocumentToCollection } from './_QueryTemplates/ADD'

const COLLECTION_NAME = 'test-threads'

export const DB_getAllThreads = async () => {
    const response = await getAllDocumentsFromCollection(COLLECTION_NAME)
    return response
}

export const DB_getThreadById = async (documentId) => {
    const response = await getDocumentByIdFromCollection(documentId, COLLECTION_NAME)

    if (response.status === 'success') {
        return response.data
    }
    if (response.status === 'fail') {
        return response
    }
}

export const DB_addNewThread = async (newDocument) => {
    const response = await addDocumentToCollection(newDocument, COLLECTION_NAME)
    return response
}