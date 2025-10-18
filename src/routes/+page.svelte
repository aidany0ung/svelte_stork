<script lang="ts">
	import Counter from './Counter.svelte';
	import Globe from './Globe.svelte';
	import welcome from '$lib/images/svelte-welcome.webp';
	import welcomeFallback from '$lib/images/svelte-welcome.png';
	import ArticleList from './ArticleList.svelte';
	import type { PageData } from './$types';
	
	// In Svelte 5, you need to export the data prop
	export let data: PageData;
</script>

<svelte:head>
	<title>Stork</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<ArticleList articles={data.articles} />
