<script lang="ts">
import { onMount } from 'svelte';
import { get } from 'svelte/store';
import { articlesStore, dateRangeStore } from './stores';
import type { Article } from './+layout.server.ts';
import ArticleItem from './ArticleItem.svelte';

// Local state with proper typings
let articles: Article[] = [];
let selectedDateRange: string = get(dateRangeStore) ?? 'today';

// Subscribe to store changes with typed callbacks
const unsubscribeArticles = articlesStore.subscribe((value: Article[] | undefined) => {
  articles = value ?? [];
});

const unsubscribeDateRange = dateRangeStore.subscribe((value: string | undefined) => {
  selectedDateRange = value ?? 'today';
});

// Fetch helper
async function fetchArticlesData(dateRange: string) {
  try {
    const response = await fetch(`/articles/?dateFilter=${dateRange}`);
    if (response.ok) {
      const data: Article[] = await response.json();
      articlesStore.set(data); // Update the writable store
    } else {
      console.error('Failed to fetch articles:', response.status);
      articlesStore.set([]);
    }
  } catch (error) {
    console.error('Error fetching articles:', error);
    articlesStore.set([]);
  }
}

// Handle filter change: update store and refetch
async function handleFilterChange() {
  dateRangeStore.set(selectedDateRange);
  await fetchArticlesData(selectedDateRange);
}

// Fetch initial data on mount and clean up subscriptions on destroy
onMount(() => {
  fetchArticlesData(selectedDateRange);
  return () => {
    unsubscribeArticles();
    unsubscribeDateRange();
  };
});
</script>

<div class="flex flex-col w-full overflow-y-auto">
  <div class="filters">
    <!-- Date Range Filter Dropdown -->
    <select
      bind:value={selectedDateRange}
      onchange={handleFilterChange}
      class="filter-select"
    >
      <option value="today">Today</option>
      <option value="2day">Past 2 Days</option>
      <option value="week">Past Week</option>
    </select>
  </div>

  <div class="articles-container flex flex-col gap-2 overflow-y-scroll">
    {#if articles.length === 0}
      <p>No articles found.</p>
    {:else}
      {#each articles as article (article.url)}
        <ArticleItem {article} />
      {/each}
    {/if}
  </div>
</div>

<style>
  .filters {
    margin-bottom: 1.5rem;
  }

  .filter-select {
    padding: 0.5rem 2rem 0.5rem 0.75rem;
    border: 1px solid #d0d0d0;
    border-radius: 6px;
    background-color: white;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23333' d='M6 9L2 5h8z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 0.75rem center;
    background-size: 12px;
    appearance: none;
    cursor: pointer;
    font-size: 0.875rem;
  }

  .filter-select:focus {
    outline: 2px solid #4a90e2;
    outline-offset: 2px;
  }

  .articles-container {
    width: 100%;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .article-item {
    margin-bottom: 1.5rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid #ddd;
  }

  .article-item:last-child {
    border-bottom: none;
  }

  .article-title {
    font-size: 1.25rem;
    font-weight: bold;
    color: #333;
    text-decoration: none;
  }

  .article-title:hover {
    text-decoration: underline;
  }

  .article-excerpt {
    margin: 0.5rem 0;
    color: #666;
  }

  .article-meta {
    color: #999;
    font-size: 0.875rem;
  }
</style>