<script>
	import { LevelsStore, nLevel, nCompleted } from "../stores.js";
	import { tick } from "svelte";
	import { fade } from "svelte/transition";

	let isModalOpen = false;
	let path;
	let isBusy = false;
	let svgSettings = {
		width: 1100,
		height: 700,
		d: "",
		totalHeight: null,
		startCoor: {
			x: null,
			y: null,
		},
		circleRad: 50,
	};
	const createPath = async () => {
		isBusy = true;
		let n = Math.ceil(($nLevel + 1) / 6);
		let wHalf = svgSettings.width / 2;
		let hHalf = svgSettings.height / 2;
		let wQuarter = svgSettings.width / 4;
		let hQuarter = svgSettings.height / 4;
		let hOneEight = svgSettings.height / 8;
		let d = "";
		for (var i = 0; i < n; i++) {
			if (i == 0) {
				d += "M ";
				d += wHalf;
				d += " ";
				d += svgSettings.height / 100;

				d += " C ";
				d += wHalf;
				d += " ";
				d += hOneEight * 3;
				d += " ";
				d += wHalf;
				d += " ";
				d += hOneEight * 3;
				d += " ";
				d += wQuarter * 3;
				d += " ";
				d += hOneEight * 3;

				d += " C ";
				d += wQuarter * 3;
				d += " ";
				d += hOneEight * 3;
				d += " ";
				d += svgSettings.width - 50;
				d += " ";
				d += hOneEight * 3;
				d += " ";
				d += svgSettings.width - 50;
				d += " ";
				d += hHalf;

				d += " C ";
				d += svgSettings.width - 50;
				d += " ";
				d += hQuarter * 3;
				d += " ";
				d += svgSettings.width - 50;
				d += " ";
				d += hQuarter * 3;
				d += " ";
				d += wHalf;
				d += " ";
				d += hQuarter * 3;

				d += " C ";
				d += wQuarter;
				d += " ";
				d += hQuarter * 3;
				d += " 0 ";
				d += hHalf;
				d += " 50 ";
				d += svgSettings.height - svgSettings.height / 100;
				d += " ";
			} else {
				d += "C";
				d += " ";
				d += 50;
				d += " ";
				d += i * svgSettings.height;
				d += " ";
				d += 50;
				d += " ";
				d += i * svgSettings.height + hOneEight;
				d += " ";
				d += wQuarter;
				d += " ";
				d += i * svgSettings.height + hOneEight;
				d += " ";

				d += "C";
				d += " ";
				d += wQuarter;
				d += " ";
				d += i * svgSettings.height + hOneEight;
				d += " ";
				d += wHalf;
				d += " ";
				d += i * svgSettings.height + hOneEight;
				d += " ";
				d += wQuarter * 3;
				d += " ";
				d += i * svgSettings.height + hOneEight;
				d += " ";

				d += "C";
				d += " ";
				d += svgSettings.width - 100;
				d += " ";
				d += i * svgSettings.height + hOneEight;
				d += " ";
				d += svgSettings.width;
				d += " ";
				d += i * svgSettings.height + hOneEight;
				d += " ";
				d += svgSettings.width - 50;
				d += " ";
				d += i * svgSettings.height + hHalf;
				d += " ";

				d += "C";
				d += " ";
				d += svgSettings.width - 50;
				d += " ";
				d += i * svgSettings.height + hHalf;
				d += " ";
				d += svgSettings.width - 50;
				d += " ";
				d += i * svgSettings.height + hOneEight * 5;
				d += " ";
				d += wQuarter * 3;
				d += " ";
				d += i * svgSettings.height + hOneEight * 5;
				d += " ";

				d += "C";
				d += " ";
				d += wHalf;
				d += " ";
				d += i * svgSettings.height + hOneEight * 5;
				d += " ";
				d += wHalf;
				d += " ";
				d += i * svgSettings.height + hOneEight * 5;
				d += " ";
				d += wQuarter;
				d += " ";
				d += i * svgSettings.height + hOneEight * 5;
				d += " ";

				d += "C";
				d += " ";
				d += 100;
				d += " ";
				d += i * svgSettings.height + hOneEight * 5;
				d += " ";
				d += 0;
				d += " ";
				d += i * svgSettings.height + hOneEight * 5;
				d += " ";
				d += 50;
				d += " ";
				d += (i + 1) * svgSettings.height;
				d += " ";
			}
		}
		svgSettings.d = d;
		svgSettings.totalHeight = n * svgSettings.height + 100;
		isBusy = false;
		await tick();
		await createLevelCoordinates();
	};
	const createLevelCoordinates = async () => {
		isBusy = true;
		let n = $nLevel;
		let c = $nCompleted;
		let curve = path;
		let curveLength = curve.getTotalLength();
		let spacing = curveLength / (n + 1);
		LevelsStore.update((currentLevels) => {
			return (currentLevels = []);
		});
		for (var i = 1; i <= n; i++) {
			let coords = curve.getPointAtLength(i * spacing);
			const level = {
				id: n + 1 - i,
				x: coords.x - svgSettings.circleRad / 2,
				y: coords.y - svgSettings.circleRad / 2,
				stats: c + 1 == n + 1 - i ? 2 : n + 1 - i > c ? 0 : 1,
			};
			LevelsStore.update((currentLevels) => {
				return (currentLevels = [...currentLevels, level]);
			});
		}
		let coords = curve.getPointAtLength((n + 1) * spacing);
		svgSettings.startCoor.x = coords.x - svgSettings.circleRad / 2;
		svgSettings.startCoor.y = coords.y - svgSettings.circleRad / 2;
		isBusy = false;
		await tick();

		scrollTo();
	};
	const levelUp = async () => {
		// let currentLevelIndex = $LevelsStore.findIndex(
		// 	(obj) => obj.id == nCompleted + 1
		// );
		// let nextLevelIndex = $LevelsStore.findIndex(
		// 	(obj) => obj.id == nCompleted + 2
		// );
		// if ($LevelsStore[currentLevelIndex]) {
		// 	$LevelsStore[currentLevelIndex].stats = 1;
		// }
		// if ($LevelsStore[nextLevelIndex]) {
		// 	$LevelsStore[nextLevelIndex].stats = 2;
		// }

		nCompleted.update((currentLevels) => {
			return (currentLevels += 1);
		});
		// nCompleted +=1;
		// $emit("level-up");
		await tick();
		await createLevelCoordinates().then(() => {
			isModalOpen = false;
			scrollTo();
		});
	};
	const scrollTo = () => {
		if ($nCompleted != $nLevel) {
			var target = document.getElementById("level-" + ($nCompleted + 1));
			window.scrollTo(
				0,
				target.getBoundingClientRect().top +
					window.pageYOffset -
					document.documentElement.clientTop -
					window.innerHeight / 2
			);
		}
	};

	const toggleModal = () => {
		isModalOpen = !isModalOpen;
	};
	$: if ($nLevel > 0) {
		createPath();
	}
</script>

<div id="maps">
	<div class="dots">
		<div class="dot"><div /></div>
		<div class="dot"><div /></div>
		<div class="dot"><div /></div>
	</div>
	<div class="gate">
		<img src="/assets/gate@4x.png" alt="Logo" />
	</div>
	<svg
		id="svg"
		xmlns="http://www.w3.org/2000/svg"
		viewBox={"0 0 " +
			svgSettings.width +
			" " +
			(svgSettings.totalHeight ? svgSettings.totalHeight : svgSettings.height)}
		fill="none"
	>
		<path
			d={svgSettings.d}
			id="path"
			bind:this={path}
			stroke="#37ED96"
			stroke-width="18"
			stroke-miterlimit="1"
			stroke-dasharray="41 41"
			stroke-dashoffset="10"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		{#each $LevelsStore as level (level.id)}
			<foreignObject
				key={level.id}
				class="node"
				y={level.y}
				x={level.x}
				width={svgSettings.circleRad}
				height={svgSettings.circleRad * 2}
			>
				<div
					id={"level-" + level.id}
					ref={"level-" + level.id}
					class={"circle " +
						(level.stats == 0
							? "incompleted"
							: level.stats == 2
							? "currentLevel"
							: "")}
					on:click={level.stats == 2 ? toggleModal : ""}
				>
					{#if level.stats == 1}
						<div class="checkMark">&#10003;</div>
					{:else if level.stats == 2}
						<div class="circle-inside" />
					{/if}
				</div>
				<div class={"label " + (level.stats == 0 ? "incompleted" : "")}>
					{level.id}
				</div>
			</foreignObject>
		{/each}
		{#if svgSettings.startCoor.x}
			<foreignObject
				class="node"
				y={svgSettings.startCoor.y}
				x={svgSettings.startCoor.x}
				width={svgSettings.circleRad * 2}
				height={svgSettings.circleRad * 2}
			>
				<img src="/assets/Feet.svg" alt="Logo" height="100%" />
			</foreignObject>
		{/if}
	</svg>
	{#if isModalOpen}
		<div transition:fade={{ duration: 500 }} class="modal-overlay">
			<div class="modal">
				<div>
					<button
						class={"btn-refresh " + ($nCompleted == $nLevel ? "disable" : "")}
						on:click={$nCompleted == $nLevel ? "" : levelUp}
					>
						Press me to <span style="font-weight:700">WIN</span>
					</button>
					<button class="btn-secondary" on:click={toggleModal}>
						Press me to <span style="font-weight:500">LOSE</span>
					</button>
					<a href="/games/spaceshooter/"
						><button class="btn-game"
							>Gaming Time! <img
								src="/assets/game.svg"
								alt="Logo"
								style="width:20px"
							/></button
						></a
					>
				</div>
			</div>
		</div>
	{/if}
</div>

<style>
	#maps {
		padding: 10rem 0;
		min-height: 100vh;
	}
	.gate {
		width: 20%;
		margin: 0 auto;
	}
	.gate img {
		width: 100%;
	}
	.dots {
		display: flex;
		width: 45px;
		margin: 0 auto;
		padding: 10px 0;
		margin-bottom: 0.5rem;
	}
	.dot {
		flex: 1 0 0%;
		justify-content: center;
		align-items: center;
		display: flex;
	}
	.dot div {
		width: 10px;
		height: 10px;
		border-radius: 50%;
		background-color: #f0f0f0;
	}
	/* .circle{
        fill: #6601E5;
    } */
	.circle {
		display: flex;
		width: 100%;
		height: 50%;
		background-color: #6601e5;
		border-radius: 50%;
		justify-content: center;
		align-items: center;
	}
	.circle.currentLevel {
		cursor: pointer;
	}
	.circle.incompleted {
		background-color: #c4c4c4;
		cursor: default;
	}
	.circle-inside {
		width: 50%;
		height: 50%;
		border-radius: 50%;
		background-color: #fff;
	}
	.checkMark {
		color: #fff;
		font-size: 20pt;
	}
	.label {
		padding: 0.5rem;
		text-align: center;
		color: #6601e5;
		font-weight: 400;
		font-size: 25pt;
	}
	.label.incompleted {
		color: #c4c4c4;
	}
	.btn-secondary {
		border: none;
		width: 100%;
		background: #fff;
		padding: 0.5rem;
		border-radius: 1rem;
		font-size: 1.2rem;
		color: #000;
		cursor: pointer;
	}
	.btn-refresh.disable {
		cursor: not-allowed;
		background: linear-gradient(102.65deg, #608680 9.21%, #4a3e58 73.15%);
		border: 3pt sorgb(149, 233, 192) ED96;
	}
	.btn-game {
		border: none;
		width: 100%;
		background: #fff;
		padding: 0.5rem;
		border-radius: 1rem;
		font-size: 1.2rem;
		color: #000;
		cursor: pointer;
	}
	.modal-overlay {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.295);
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.modal {
		width: 50%;
		height: 50%;
		background-color: #fff;
		border-radius: 1rem;
		padding: 1rem;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.modal button {
		margin: 10px 0;
		box-shadow: 0 4px 4px 0 rgb(0 0 0 / 25%);
	}
	@media (max-width: 991.98px) {
		#maps {
			padding: 4rem 0;
		}
		.dots {
			width: 20px;
			margin-bottom: 0.1rem;
		}
		.dot div {
			width: 5px;
			height: 5px;
			border-radius: 50%;
			background-color: #f0f0f0;
		}
	}
</style>
