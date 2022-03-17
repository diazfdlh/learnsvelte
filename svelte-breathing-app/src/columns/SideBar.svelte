<script>
  import { BreathTecniques, CurrentBreathIndex } from "../store";
</script>

{#each $BreathTecniques as tecnique, i}
  <button
    class={$CurrentBreathIndex == i ? "active" : ""}
    on:click={() => CurrentBreathIndex.set(i)}
    ><strong>{tecnique.title}</strong>
  </button>
{/each}

<style>
  button {
    width: 100%;
    margin: 0;
    background-color: #fff;
    cursor: pointer;
    border: none;
    text-align: left;
    padding: 1rem;
  }
  button.active {
    background-color: #af7e24;
  }
</style>
