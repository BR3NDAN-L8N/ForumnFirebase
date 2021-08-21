import { getAllDocumentsFromCollection } from './_QueryTemplates/GET'
import { addDocumentToCollection } from './_QueryTemplates/ADD'

const COLLECTION_NAME = 'test-threads'

export const DB_getAllThreads = async () => {
    const response = await getAllDocumentsFromCollection(COLLECTION_NAME)
    return response
}

export const DB_addNewThread = async (newDocument) => {
    const response = await addDocumentToCollection(newDocument, COLLECTION_NAME)
    return response
}