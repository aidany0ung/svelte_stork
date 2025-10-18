<script lang="ts">
	import type { Article } from './+layout.server.ts';
	
	// Define the props interface
	interface Props {
		articles?: Article[];
	}
	
	// Get props using Svelte 5 syntax
	let { articles = [] }: Props = $props();
</script>

<div class="articles-container">
	{#if articles.length === 0}
		<p>No articles found.</p>
	{:else}
		<ul>
			{#each articles as article (article.id)}
				<li class="article-item">
					<a href={article.url ?? '#'} class="article-title">{article.title}</a>
					{#if article.excerpt}
						<p class="article-excerpt">{article.excerpt}</p>
					{/if}
					<small class="article-meta">
						{article.author ? `by ${article.author}` : ''}
						{article.source ? ` — ${article.source}` : ''}
					</small>
				</li>
			{/each}
		</ul>
	{/if}
</div>

<style>
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