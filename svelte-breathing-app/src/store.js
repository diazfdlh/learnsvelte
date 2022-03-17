import {writable, derived} from "svelte/store";
import breaths from "./breathTecniques.json";


export const BreathTecniques = writable(breaths);

export const CurrentBreathIndex = writable(0);

export const CurrentBreath = derived([BreathTecniques, CurrentBreathIndex], ([$BreathTecniques, $CurrentBreathIndex]) => {
  let currentBreath = $BreathTecniques[$CurrentBreathIndex];
  return currentBreath;
})