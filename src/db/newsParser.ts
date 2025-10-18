// Get news articles for a given date
import { getDB } from "./mongo";
const db = getDB();

export async function getArticlesByDate(date: string): Promise<JSON> {
    // Ping the database to ensure a successful connection

    const data = await db.collection(date).find().project({_id:0}).toArray();

    // Print the retrieved data for debugging
    console.log("Retrieved articles:", data);

    return data;
}