<script>
	import Header from "../components/Header.svelte";
	import { nLevel, nCompleted } from "../stores.js";
	import Maps from "../components/Maps.svelte";
	import { onMount } from "svelte";
	import axios from "axios";

	// let nLevel = 0;
	// let nCompleted = 0;
	let isBusy = false;
	const getNCompleted = async (n) => {
		isBusy = true;
		await axios
			.get(
				"https://www.random.org/integers/?num=1&min=0&max=" +
					n +
					"&col=1&base=10&format=plain&rnd=new"
			)
			.then((response) => {
				nLevel.update((currentValue) => {
					return (currentValue = n);
				});
				nCompleted.update((currentValue) => {
					return (currentValue = response.data);
				});
				isBusy = false;
			})
			.catch((e) => {
				console.log(e);
				isBusy = false;
			});
	};
	const getNLevel = async () => {
		isBusy = true;
		await axios
			.get(
				"https://www.random.org/integers/?num=1&min=0&max=50&col=1&base=10&format=plain&rnd=new"
			)
			.then(async (response) => {
				if (response.data == 0) {
					await getNLevel();
				} else {
					await getNCompleted(response.data);
					isBusy = false;
				}
			})
			.catch((e) => {
				console.log(e);
				isBusy = false;
			});
	};
	onMount(async () => {
		await getNLevel();
	});
</script>

<div id="home">
	<Header title="Diaz Game!" />
	<Maps />
	<div id="btn-refresh-wrapper">
		<button class="btn-refresh" on:click={getNLevel}>Refresh Data</button>
	</div>
	{#if isBusy}
		<div class="overlay" />
	{/if}
</div>

<style>
	#btn-refresh-wrapper {
		position: fixed;
		bottom: 30px;
		right: 30px;
		width: 40vw;
	}
	.overlay {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.295);
	}
</style>
