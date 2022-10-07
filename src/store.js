import { writable } from "svelte/store";

/* Theme helpers */
const storedTheme = localStorage.getItem("theme");
export const theme = writable(storedTheme);
theme.subscribe((value) => {
  localStorage.setItem("theme", value ? value : "dark");
});
