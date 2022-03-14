import { writable } from 'svelte/store';

export const LevelsStore = writable([]);

export let nLevel = writable(0);
export let nCompleted = writable(0);