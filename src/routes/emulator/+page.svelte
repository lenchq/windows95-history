<script lang="ts">
	import { onMount } from 'svelte';
	import win95_start from '$lib/assets/start.jpg';
	import win95_start_desktop from '$lib/assets/win95_start.jpg';

	let screen: HTMLDivElement;
	onMount(async () => {});
	let started = false;
	async function start() {
		if (started) return;
		started = true;

		// @ts-ignore
		var emulator = new V86({
			wasm_path: './build/v86.wasm',
			memory_size: 128 * 1024 * 1024,
			vga_memory_size: 32 * 1024 * 1024,
			screen_container: document.getElementById('screen_container'),
			bios: {
				url: './bios/seabios.bin'
			},
			vga_bios: {
				url: './bios/vgabios.bin'
			},
			hda: {
				url: './iso/windows95.img',
				async: true
			},
			// cdrom: {
			// 	url: './iso/wnt3.iso'
			// },
			// floppy: {
			//     url: './iso/wnt3.iso',
			//     async: true,
			// },
			autostart: true,
			boot_order: 0x132
		});

		setTimeout(async () => {
			console.log(emulator);
			// @ts-ignore
			emulator.screen_adapter.set_scale(1.6, 1.6);
			// const response = await fetch('./iso/windows95_default-state.bin');
			// const buffer = await response.arrayBuffer()
			// // @ts-ignore
			// await emulator.restore_state(buffer);
			// // @ts-ignore
			// emulator.run();
		}, 1500);

		screen.onclick = () => {
			screen.requestPointerLock();
		};
	}
</script>

<div
	onkeydown={start}
	onclick={start}
	tabindex="0"
	role="button"
	class="flex h-full w-full place-content-center place-items-center bg-[#55AAAA]"
>
	{#if !started}
		<div class="flex cursor-pointer place-content-center place-items-center">
			<img
				class="absolute max-h-screen max-w-full blur-sm"
				src={win95_start_desktop}
				alt=""
			/>
			<div class="relative z-10 flex flex-col place-items-center">
				<img class="h-32" src={win95_start} alt="" />
				<!-- <h3 class="text-white font-bold text-3xl">
					ЗАПУСК
				</h3> -->
			</div>
		</div>
	{/if}
	<!-- A minimal structure for the ScreenAdapter defined in browser/screen.js -->
	<div bind:this={screen} id="screen_container">
		<div
			class="!h-auto !w-auto"
			style="white-space: pre; font: 14px monospace; line-height: 14px"
		></div>
		<canvas style="display: none"></canvas>
	</div>
</div>

<style>
	img {
		image-rendering: crisp-edges;
	}
</style>