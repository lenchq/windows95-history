<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<svelte:head>
	<title>История Windows95</title>
</svelte:head>

<div class="flex flex-col place-items-center h-screen max-w-screen">
	{@render children()}
</div>
