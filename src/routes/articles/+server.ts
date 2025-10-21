import { json, type RequestHandler } from '@sveltejs/kit';
import { getArticlesByDate } from '../../db/newsParser';
import type { Article } from '../+layout.server';

export const GET: RequestHandler = async ({ url }) => {
    // Access individual query parameters using url.searchParams.get()
    console.log('Received request with URL:', url.toString());
    const dateFilter = url.searchParams.get('dateFilter');

    console.log('dateFilter parameter:', dateFilter);


    if (!dateFilter) {
        return json({ error: 'dateFilter parameter is required' }, { status: 400 });
    }

    let data: Article[] = [];
    
    if (dateFilter === 'today') {
        const today = new Date();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const year = today.getFullYear();
        const formattedDate = `${month}/${day}/${year}`;
        data = await getArticlesByDate(formattedDate);
    } else if (dateFilter === '2day') {
        const today = new Date();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate() - 1).padStart(2, '0');
        const year = today.getFullYear();
        const formattedDate = `${month}/${day}/${year}`;
        // Need to make two calls here
        const data1 = await getArticlesByDate(formattedDate);
        const day2 = String(today.getDate() - 2).padStart(2, '0');
        const formattedDate2 = `${month}/${day2}/${year}`;
        const data2 = await getArticlesByDate(formattedDate2);
        data = [...data1, ...data2];
    } else if (dateFilter === 'week') {
        // Similar logic for 1 week
        const today = new Date();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const year = today.getFullYear();
        let allData = [] as Article[];
        for (let i = 1; i <= 7; i++) {
            const day = String(today.getDate() - i).padStart(2, '0');
            const formattedDate = `${month}/${day}/${year}`;
            const dailyData = await getArticlesByDate(formattedDate);
            allData = [...allData, ...dailyData];
        }
        data = allData;
    } else {
        return json({ error: 'Invalid dateFilter parameter' }, { status: 400 });
    }

    console.log(`Fetched ${data.length} articles for dateFilter: ${dateFilter}`);
    return json(data);
};