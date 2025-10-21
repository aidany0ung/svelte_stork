// Get news articles for a given date
import type { Article } from "../routes/proxy+layout.server";
import { getDB } from "./mongo";
const db = getDB();

export async function getArticlesByDate(date: string): Promise<Article[]> {
    // Ping the database to ensure a successful connection

    const data = await db.collection(date).find().project({_id:0}).toArray();

    // Print the retrieved data for debugging
    const deserializedData = JSON.parse(JSON.stringify(data));

    // Map the data to the Article interface
    const articles: Article[] = deserializedData.map((item: any, index: number) => ({
        id: index + 1,
        title: item.title,
        author: item.author,
        date: item.date,
        img: item.img,
        url: item.href,
        source: item.source,
        coordinates: item.coordinates,
        sentiment: item.sentiment

    }));

    return articles;
}