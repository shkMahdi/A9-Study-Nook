import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { betterAuth } from "better-auth"

import { jwt } from "better-auth/plugins";

const client = new MongoClient(process.env.MONGO_URI);

const db = client.db("study-nook-db");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    // Optional: if you don't provide a client, database transactions won't be enabled.
    client
  }),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      image: {
        type: "string",
        required: false,
      },
    },
  },
  socialProviders: {
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID, 
            clientSecret: process.env.GOOGLE_SECRET
        }, 
    },

    session: {
      cookieCache: {
        enabled: true,
        strategy: "cookie", 
        maxAge: 5 * 24 * 60 * 60
      }
    }, 
    plugins: [
      jwt()
    ]
});