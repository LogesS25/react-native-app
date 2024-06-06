import { Account, Avatars, Client, Databases, ID, Query } from "react-native-appwrite";


export const config = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.loges.youshare',
    projectId: '663a26c4002a2d179487',
    databaseId: '663a2881003bb72e5952',
    userCollectionId: '663a28aa0024a96bfda2',
    videoCollectionId: '663a28de002f9333208a',
    storageId: '663a2a99003cbeba61a9',
}

// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(config.endpoint) // Your Appwrite Endpoint
    .setProject(config.projectId) // Your project ID
    .setPlatform(config.platform) // Your application ID or bundle ID.

//instances
const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (email, password, username) => {
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        )
        if (!newAccount) throw Error;

        //else -> account created successfully , proceeding to create new image
        //.getinitial() -> gets the initals of the username
        const avatarUrl = avatars.getInitials(username)

        //this will pass email,password to createUser
        await signIn(email, password)

        const newUser = await databases.createDocument(
            config.databaseId, config.userCollectionId, ID.unique(),
            {
                accountId: newAccount.$id,
                email: email,
                username: username,
                avatar: avatarUrl,
            }
        )
        return newUser;
    } catch (error) {
        console.log("error message while creating user ");
        console.log(error);
        throw new Error(error);

    }
}

export const signIn = async (email, password) => {
    try {
        //trying to establish new user session 
        const session = await account.createEmailPasswordSession(email, password)
        return session;
    } catch (error) {
        throw new Error(error);
    }
}

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get();
        if(!currentAccount) throw Error;
        const currentUser = await databases.listDocuments(
            config.databaseId,
            config.userCollectionId,
            [Query.equal('accountId',currentAccount.$id)]
        )

        if(!currentUser) throw Error;

        return currentUser.documents[0];

    } catch (error) {
        console.log(error);
                
    }
}

export const getAllPosts = async () => {
    try {
        const posts = await databases.listDocuments(
            config.databaseId,config.videoCollectionId
        )
        return posts.documents;
    } catch (error) {
        throw new Error(error);        
    }
}

export const getLatestPosts = async () => {
    try {
        const posts = await databases.listDocuments(
            config.databaseId,
            config.videoCollectionId,
            [Query.orderDesc('$createdAt',Query.limit(7))]
        )
        return posts.documents;
    } catch (error) {
        throw new Error(error);        
    }
}

export const searchPosts = async (query) => {
    try {
        const posts = await databases.listDocuments(
            config.databaseId,
            config.videoCollectionId,
            [Query.search("title",query)]
        )
        return posts.documents;
    } catch (error) {
        throw new Error(error);        
    }
}

export const getUserPosts = async (userId) => {
    try {
        const posts = await databases.listDocuments(
            config.databaseId,
            config.videoCollectionId,
            [Query.equal("creator",userId)]
        )
        return posts.documents;
    } catch (error) {
        throw new Error(error);        
    }
}

export async function signOut() {
    try {
      const session = await account.deleteSession("current");
  
      return session;
    } catch (error) {
      throw new Error(error);
    }
  }

