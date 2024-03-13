import firebase_app from "@/firebase/config";
import {
  signInWithEmailAndPassword,
  getAuth,
  UserCredential,
  User,
} from "firebase/auth";
import { NextResponse } from "next/server";
import { randomBytes, randomUUID } from "crypto";
import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { Collection, MongoClient } from "mongodb";
import { UserSession } from "@/core/dtos/user-session";

const auth = getAuth(firebase_app);

export async function POST(req: Request) {
  let credentials: UserCredential | null = null,
    error = null;
  try {
    const { email, password } = await req.json();
    credentials = await signInWithEmailAndPassword(auth, email, password);

    if (credentials.user) {
      const {
        cookiesOptions,
        headerTokenKey,
        headerTokenValue,
        requestTokenKey,
        requestTokenValue,
      } = await generateToken(credentials.user, req);

      const body: string = JSON.stringify({
        headerTokenKey: headerTokenKey,
        requestTokenKey: requestTokenKey,
        headerTokenValue: headerTokenValue,
        requestTokenValue: requestTokenValue,
        email: credentials.user.email,
      });

      const result = await saveSession({
        online: true,
        email: credentials.user.email ?? '',
        headerTokenKey,
        requestTokenKey,
        headerTokenValue,
        requestTokenValue
      });

      const response = NextResponse.json({
        body: credentials.user.email,
        status: 200,
      });

      response.cookies
        .set(...[requestTokenKey, requestTokenValue, cookiesOptions])
        .set(...[headerTokenKey, headerTokenValue, cookiesOptions])
        .set(
          ...[
            "X-EMAIL.user",
            decodeURIComponent(credentials.user.email ?? ""),
            cookiesOptions,
          ]
        );
      return response;
    }
  } catch (error: any) {
    if (error.type === "CredentialsSignin") {
      NextResponse.json({ error: "Invalid credentials.", status: 401 });
    } else {
      NextResponse.json({ error: "Something went wrong.", stauts: 500 });
    }
  }
}

async function generateToken(user: User, request: Request) {
  try {
    const userToken = await user.getIdToken();
    const cookiesOptions: Partial<ResponseCookie> = {
      httpOnly: false,
      sameSite: "none",
      path: "/",
      domain: "localhost",
      secure: true,
      expires: new Date(Date.now() + 1 * 24 * 60 * 1000),
    };

    const CSRF_HeaderTokenKey = `CSRF_HeaderToken.${randomUUID()}`;
    const CSRF_RequestVerificationTokenKey = `CSRF_RequestVerificationToken.${randomUUID()}`;
    const CSRF_RequestVerificationTokenValue = userToken;
    const CSRF_HeaderTokenValue = randomBytes(64).toString("hex");

    return {
      requestTokenValue: CSRF_RequestVerificationTokenValue,
      headerTokenValue: CSRF_HeaderTokenValue,
      requestTokenKey: CSRF_RequestVerificationTokenKey,
      headerTokenKey: CSRF_HeaderTokenKey,
      cookiesOptions: cookiesOptions,
    };
  } catch (error: any) {
    throw new Error(error);
  }
}

async function saveSession(session: Partial<UserSession>) {
  const client = new MongoClient(process.env.MONGODB_URI as string);

  try {
    await client.connect();
    const database = client.db("electronic-shop"); // Choose a name for your database

    const collection: Collection<UserSession> = database.collection("users"); // Choose a name for your collection

    const user: UserSession | null = await collection.findOne({email: session.email});

    if(user) {
        user.headerTokenKey = session.headerTokenKey ?? '';
        user.headerTokenValue = session.headerTokenValue ?? '';
        user.requestTokenKey = session.requestTokenKey ?? '';
        user.requestTokenValue = session.requestTokenValue ?? '';
        user.online =  true;

        await collection.updateOne({_id: user._id}, {$set: user}, { upsert: true })
    } else {
        await collection.insertOne(session as UserSession);
    }

  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
}
