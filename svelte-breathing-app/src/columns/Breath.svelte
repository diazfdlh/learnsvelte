<script>
  import { CurrentBreathIndex, CurrentBreath } from "../store";
  import { onMount } from "svelte";
  console.log($CurrentBreath);
</script>

<div id="progress-bar">
  <div id="progress" />
</div>
<h1>{$CurrentBreath.title}</h1>
{@html $CurrentBreath.description}

<style>
</style>
