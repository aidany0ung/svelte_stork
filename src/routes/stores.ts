import { writable } from 'svelte/store';
import type { Article } from './+layout.server.ts';

export const articlesStore = writable<Article[]>([]);
export const dateRangeStore = writable<string>('today');