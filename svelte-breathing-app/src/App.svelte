<script>
  import breaths from "./breathTecniques.json";
  // import { BreathTecniques, CurrentBreathIndex } from "./store";
  import Breath from "./columns/Breath.svelte";
  import SideBar from "./columns/SideBar.svelte";
  import Card from "./components/Card.svelte";
  import { onMount } from "svelte";

  onMount(() => {
    // BreathTecniques.set(breaths);
    // console.log($BreathTecniques);
  });
</script>

<main class="row">
  <div id="sidebar">
    <Card><SideBar /></Card>
  </div>
  <div id="breath">
    <Card><Breath /></Card>
  </div>
</main>

<style>
  main {
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  .row {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
  }
  #sidebar,
  #breath {
    -webkit-box-flex: 0;
    -ms-flex: 0 0 100%;
    flex: 0 0 100%;
    max-width: 100%;
  }

  @media (min-width: 992px) {
    #breath {
      -webkit-box-flex: 0;
      -ms-flex: 0 0 70%;
      flex: 0 0 70%;
      max-width: 70%;
    }
    #sidebar {
      -webkit-box-flex: 0;
      -ms-flex: 0 0 30%;
      flex: 0 0 30%;
      max-width: 30%;
    }
  }
  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
