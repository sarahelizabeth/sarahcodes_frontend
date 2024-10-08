import { Function } from 'appwrite';
import { client, account } from '../utils/appwriteClient';

export const authenticate = async () => {
  try {
    const session = await client.account.get();

    if (!session) {
      throw new Error('No active session');
    }

    const user = await database.getDocument(databaseId, usersCollectionId, session.$id);
  } catch (error) {
    console.error('authenticate error: ', error);
  }
}