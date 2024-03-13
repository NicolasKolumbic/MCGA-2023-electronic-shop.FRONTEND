import { UserSession } from "@/core/dtos/user-session";
import firebase_app from "@/firebase/config";
import { getAuth, signOut } from "firebase/auth";
import { Collection, MongoClient } from "mongodb";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const auth = getAuth(firebase_app);

export async function POST(
    req: Request,
) {
        const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
        try {
            await signOut(auth);

            const response = NextResponse.json({status: 200});
            
            const iterable: IterableIterator<RequestCookie> = cookies().getAll()[Symbol.iterator]();
            let iterator: IteratorResult<RequestCookie> = iterable.next()
            while(!iterator.done) {
                response.cookies.delete(iterator.value.name);
                if(regexEmail.test(iterator.value.name)) {
                    setOffline(iterator.value.name);
                }
                iterator = iterable.next();
            }
            
            return response;
        } catch (error: any) {
            throw new Error(error);
        }
}

async function setOffline(email: string) {
    const client = new MongoClient(process.env.MONGODB_URI as string);

  try {
    await client.connect();
    const database = client.db("electronic-shop"); // Choose a name for your database

    const collection: Collection<UserSession> = database.collection("users"); // Choose a name for your collection

    const user: UserSession | null = await collection.findOne({email: email});

    if(user) {
        await collection.updateOne({_id: user._id}, {$set: {online: false}}, { upsert: true })
    }

  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
}