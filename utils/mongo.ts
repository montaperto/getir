import { Collection, Db, MongoClient } from "mongodb";

export async function getMongoDb(): Promise<Db> {
  const client = await MongoClient.connect(process.env.MONGOURL!);
  return client.db();
}

export async function getCollection(name: string): Promise<Collection> {
  const db = await getMongoDb();
  return db.collection(name);
}
