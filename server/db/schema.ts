// create the schema

import { ObjectId } from "mongodb"

export interface Password {
  _id?: ObjectId
  title: string
  username: string
  password: string
  url: string
  notes: string
  createdAt: Date
  updatedAt: Date
}

export const transformData = (data: Password) => ({
  _id: data._id?.toString(), // Convert ObjectId to string
  title: data.title as string,
  username: data.username as string,
  password: data.password as string,
  url: data.url as string,
  notes: data.notes as string,
  createdAt: (data.createdAt as Date)?.toISOString(), // Convert Date to string (if needed)
  updatedAt: (data.updatedAt as Date)?.toISOString(), // Convert Date to string (if needed)
});