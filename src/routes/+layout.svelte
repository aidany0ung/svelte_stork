<script lang="ts">
	import Header from './Header.svelte';
	import Globe from './Globe.svelte';
	import type { LayoutData } from './$types';
	import '../app.css';

	// Get the articles data from layout.server.ts
	let { data, children } = $props<{ data: LayoutData; children: any }>();
</script>

<div class="app">
	<Header />
	
	
	<main>
		<Globe articles={data.articles} />
		{@render children()}
	</main>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		background-color: rgba(176, 255, 174, 0.475);
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: row;
		width: 100%;
		margin: 0 auto;
		box-sizing: border-box;
		padding: 0px 8px;
	}

	/* Remove the footer styles if you're not using a footer
	   or add a footer element to your layout */
	/*
	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
	*/
</style>