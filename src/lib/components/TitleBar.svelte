<script lang="ts">
	let { text = '', small = false } = $props();
</script>

<div class="title-bar">
	<div class={`title-bar-text ${small ? 'text-sm' : 'text-lg'}`}>{text}</div>
	<div class="title-bar-controls">
		<button aria-label="Minimize"></button>
		<button aria-label="Maximize"></button>
		<button aria-label="Close"></button>
	</div>
</div>
