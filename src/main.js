import App from "./App.svelte";

/* Creating a new instance of the App component and rendering it to the DOM. */
const app = new App({
  target: document.body,
  props: {
    name: "To-do",
  },
});

export default app;
