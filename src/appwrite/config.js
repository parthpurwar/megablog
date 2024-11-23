import conf from "../confi/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";
import { Account } from "appwrite";

export class Service{
    client= new Client();
    databases;
    bucket;
    account;
    constructor(){
      this.client= new Client();

    
        this.client
        .setEndpoint('https://cloud.appwrite.io/v1')
        .setProject('668982d400017406094e')
        this.databases= new Databases(this.client)
        this.bucket = new Storage(this.client)
        this.account = new Account(this.client);

    //this is how database access and bucket(storage) access is taken for more reference got to "https://appwrite.io/docs/references/cloud/client-web/databases#createDocument"
    }

    async createpost({title, slug, content, featuredImage, status, userId}){
            try{
                return await this.databases.createDocument(
                    conf.appWriteDatabaseId,
                    conf.appWriteCollectionId,
                    slug,
                    {
                        title,
                        content,
                        featuredImage,
                        status,
                        userId,
                    }
                )
            }
            catch(error){
                console.log("Appwrite service :: createPost :: error", error);      
            }
    }

    async updatePost(slug, {title, content, featuredImage, status}){
        //we are passing slug separately cause we will need slug as documentid so we take it sepaprtely so that we can call it directly
     try{
        return await this.databases.updateDocumentDocument(
            conf.appWriteDatabaseId,
            conf.appWriteCollectionId,
            slug,
            {   //what the user is changing
                title,
                content,
                featuredImage,
                status,
            }

        )
     }
     catch(error){
        console.log("Appwrite service :: createPost :: error", error);      

     }
    }

    async deletePost(slug){
        try{
            await this.databases.deleteDocument(
            conf.appWriteDatabaseId,
            conf.appWriteCollectionId,
            slug,

        )
        return true
    }
        catch(error){
            console.log("Appwrite service :: createPost :: error", error);      
            return false
        }
    }
    async getPost(slug){
        try{
            return await this.databases.getDocument(
                conf.appWriteDatabaseId,
                appWriteCollectionId,
                slug
            )
        }
        catch(error){
            console.log("Appwrite service :: createPost :: error", error);      
            return false;
        }
    }
    async getPosts(queries= [Query.equal("status", "active")]){
        try{
            return await this.databases.listDocuments(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                queries,
            )
        }
        catch(error){
            console.log("Appwrite service :: createPost :: error", error);      
            return false
        }
    }

    //file upload service/method
    async uploadFile(file){
        try{
            return await this.bucket.createFile(
                conf.appWriteBucketId,
                ID.unique(),
                file
            )
        }
        catch(error){
            console.log("Appwrite service :: createPost :: error", error);      
            return false;
        }
    }
    async deleteFile(fileId){
        try{
            await this.bucket.deleteFile(
                conf.appWriteBucketId,
                fileId
            )
            return true;
        }
        catch(error){
            console.log("Appwrite service :: createPost :: error", error);      
            return false
        }
    }
    getFilePreview(fileId){
return this.bucket.getFilePreview(
    conf.appWriteBucketId,
    fileId
)
    }
}

const service = new Service();
console.log(service)
export default service