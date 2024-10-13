import { MongoClient, ServerApiVersion } from "mongodb"

const uri = process.env.MONGODB_URI

if (!uri) {
    throw new Error('Please add your Mongo URI to .env.local')
}

// creating a new MongoClient
export const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
})

export async function connectDB() {
    try {
        // connecting the client to the server
        await client.connect()
        
    } catch (error) {
        console.log(error)
    }
}