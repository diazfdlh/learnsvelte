<script>
  import { CurrentBreathIndex, CurrentBreath } from "../store";
  import { onMount } from "svelte";
  import Fa from "svelte-fa";
  import {
    faCircleStop,
    faCirclePlay,
  } from "@fortawesome/free-solid-svg-icons";

  let isPlaying = false;
  let totalTimer = 0;
  let remaining = 0;
  let interval;
  function play() {
    remaining = totalTimer;
    isPlaying = true;
    interval = setInterval(() => {
      remaining -= 1;
    }, 1000);
  }
  function stop() {
    remaining = totalTimer;
    isPlaying = false;
    clearInterval(interval);
  }
  function init() {
    stop();
    if ($CurrentBreath) {
      let timers = 0;
      $CurrentBreath.steps.forEach((step) => {
        timers += step.timer;
      });
      console.log(timers);
      totalTimer = timers;
      remaining = timers;
    }
  }
  $: {
    if (remaining < 0) {
      stop();
    }
  }
  $: {
    if ($CurrentBreathIndex > -1) {
      init();
    }
  }
  $: progressBar = (100 * Math.abs(remaining - totalTimer)) / totalTimer;
  onMount(() => {
    init();
  });
</script>

<div>
  <button on:click={isPlaying ? stop : play}>
    {#if isPlaying}
      <Fa icon={faCircleStop} fw /> Stop
    {:else}
      <Fa icon={faCirclePlay} fw /> Play
    {/if}
  </button>
  <div>
    Time Remaining <strong>{remaining}</strong>
  </div>
</div>
<div id="progress-bar">
  <div id="progress" style={"width:" + progressBar + "%"} />
</div>
<h1>{$CurrentBreath.title}</h1>
{@html $CurrentBreath.description}

<style>
  #progress-bar,
  #progress {
    border-radius: 10px;
    height: 20px;
  }
  #progress-bar {
    width: 100%;
    position: relative;
    background-color: #82bac0;
    overflow: hidden;
  }
  #progress {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #13747a;
    transition: width 1s linear;
  }
</style>
