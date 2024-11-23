const conf ={
    appWriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appWriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appWriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appWriteBucketId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appWriteCollectionId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID)
}
//this is done to ensure all these passed ids and urls are in string format otherwise it may create problem i production grade application

export default conf;