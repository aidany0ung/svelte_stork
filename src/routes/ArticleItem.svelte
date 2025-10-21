<script lang="ts">
    import type { Article } from './+layout.server.ts';
    let { article } = $props<{ article: Article }>();

    let subtext = '';
    if (article.author) {
        subtext += "By " + article.author;
        if (article.source) {
            subtext += " @ " + article.source;
        }
    } else {
        if (article.source) {
            subtext += "From" + article.source;
        }
    }
</script>

<div class="flex flex-col w-full items-end">
    <div class="article-item bg-white/70 backdrop-blur-md rounded-xl flex cursor-pointer card-shadow rubik-500 items-center" onclick={() => window.open(article.url, '_blank')}>
        <img src={article.img} alt={article.title} class="w-[100px] h-[100px] object-cover rounded-md m-2" />
        <div class="flex flex-col justify-between">
            <span class="text-2xl leading-none line-clamp-3">{article.title}</span>
            {#if subtext}
                <span class="text-sm mt-1 rubik-300">{subtext}</span>
            {/if}
        </div>
    </div>
</div>

<style>
    .article-item {
        box-shadow: inset 0 1px 2px #ffffff30,
        0 1px 2px #00000030,
        0 2px 4px #00000015;
        transition: box-shadow 0.3s ease;
    }

    .article-item:hover {
        box-shadow: inset 0 1px 2px #ffffff60,
        0 1px 2px #00000060,
        0 2px 6px #00000030;
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
        background: white;
        padding: 0 6px;
        border-radius: 4px;
    }
</style>