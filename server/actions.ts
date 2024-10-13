'use server'

import { connectDB, client } from '@/lib/connectDB'
import { Password, transformData } from './db/schema'

const db = client.db("password-manager")
const collection = db.collection("passwords")

// creating a new collection with a default data
export async function createCollection() {

    // connecting to the database
    await connectDB()

    // creating a defautl passsword data
    const password: Password = {
        title: "My first password",
        username: "john_doe",
        password: "password123",
        url: "https://example.com",
        notes: "This is my first password",
        createdAt: new Date(),
        updatedAt: new Date(),
    }

    // using the password schema to validate the data
    const result = await collection.insertOne(password)

    console.log(`A document was inserted with the _id: ${result.insertedId}`)
}

// checking collection if it exists
export async function checkCollection() {

    // checking if the collection exists
    const collections = await db.listCollections().toArray()

    // if the collection does not exist, create it
    const collectionExists = collections.some((collection) => collection.name === "passwords")

    if (!collectionExists) {
        await createCollection()
        return;
    }

    return;
}

// Creating new passwords
export async function createPassword(
    password_info: Password
) {
    // connecting to the database
    await connectDB()

    // checking if the collection exists
    await checkCollection()

    try {

        // creating a new password object
        const newPassword: Password = {
            title: password_info.title,
            username: password_info.username,
            password: password_info.password,
            url: password_info.url,
            notes: password_info.notes,
            createdAt: new Date(),
            updatedAt: new Date(),
        }

        // adding to the database
        const result = await collection.insertOne(newPassword)

        // logging the results
        console.log(`A document was inserted with the _id: ${result.insertedId}`)

        // returning the results
        return result

    } catch (e) {
        console.log(`Error creating password ${e}`)
    }
}

// Reading passwords
export async function readPasswords() {
    // connecting to the database
    await connectDB()

    // checking if the collection exists
    await checkCollection()

    // reading the passwords
    try {
        // reading the passwords
        const data = await collection.find().toArray()
        console.log(`Found ${data.length} passwords`)

        const transformedData = data.map((item) => transformData(item as Password));
        return transformedData

    } catch (e) {
        console.log(`Error reading passwords ${e}`)
    }
}