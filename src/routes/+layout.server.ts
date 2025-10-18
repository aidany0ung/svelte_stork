// since there's no dynamic data here, we can prerender
import type { LayoutServerLoad } from "./$types";
import { getArticlesByDate } from "../db/newsParser";
import { it } from "node:test";

export interface Article {
  id: number;
  title: string;
  author: string;
  date: string;
  img: string;
  url: string;
  source: string;
  coordinates: [number, number];
  sentiment: number;
}


// Load articles data from the server, but for now use mock data
export const load: LayoutServerLoad = async () => {
    const data = await getArticlesByDate("01/02/2025")

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


 	//const res = await fetch('/api/articles');
 	//const articles: Article[] = await res.json();
    //const articles: Article[] = [
    //    { id: 1, url: '/article-1', title: 'Understanding SvelteKit Load Functions' },
    //    { id: 2, url: '/article-2', title: 'Building a Blog with SvelteKit' },
    //    { id: 3, url: '/article-3', title: 'Deploying SvelteKit Applications' },
    //];
 	return { articles };
 };

