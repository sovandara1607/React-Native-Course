import {Account, Client, Databases} from 'react-native-appwrite';

export const client = new Client();

client
  .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT || "https://syd.cloud.appwrite.io/v1")
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID || "688e4c9c000412ce632b")
  .setPlatform(process.env.EXPO_PUBLIC_APPWRITE_PLATFORM || "co.sovandara.habittracker");

export const account = new Account(client);
export const databases = new Databases(client);

