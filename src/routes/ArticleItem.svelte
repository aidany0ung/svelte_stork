<script lang="ts">
    import type { Article } from './+layout.server.ts';
    let { article } = $props<{ article: Article }>();
</script>

<div class="article-item bg-white/70 backdrop-blur-md rounded-lg border border-white/30 flex cursor-pointer" onclick={() => window.open(article.url, '_blank')}>
    <img src={article.img} alt={article.title} class="w-24 h-24 object-cover rounded-l-lg mr-4" />
    <div class="flex flex-col">
        <span class="text-lg">{article.title}</span>
        <span class="text-sm text-gray-200">{article.date} | {article.author} | {article.source}</span>
    </div>
</div>

<style>

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
</style>