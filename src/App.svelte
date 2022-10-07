<script>
  import Todos from "./Todos.svelte";

// This is importing the auth and googleProvider and importing the authState 
  import { auth, googleProvider } from "./firebase";
  import { authState } from "rxfire/auth";

// Importing the theme and fly transition 
  import { theme } from "./store.js";
  import { fly } from "svelte/transition";

  $: {
    console.log($theme);
    let classes = window.document.body.className.split(" ");
    classes.pop();
    classes.push($theme + "-theme");
    window.document.body.className = classes.join(" ");
  }

  let user;

  let showThemeBox = false;

  const unsubscribe = authState(auth).subscribe((u) => (user = u));

// login function with google
  function login() {
    auth.signInWithPopup(googleProvider);
  }

// logout function with google
  function logout() {
    auth.signOut();
  }
</script>

<svelte:head />

<main class="content">
  <div class="box" id="mainBox">
    {#if user}
      <div class="headerBar">
        <h1 class="header top">hello, {user.displayName}!</h1>
<!-- This is a button that logs the user out of the app. -->
        <button on:click={() => logout()} class="button" id="logoutButton"
          >logout</button
        >
<!-- This is a button that toggles the theme box. -->
        <button
          on:click={() => (showThemeBox = !showThemeBox)}
          class="button"
          id="themeButton">theme</button
        >
      </div>

<!-- This is creating a section that is displaying the todos. -->
      <section>
        <Todos uid={user.uid} />
      </section>
    {:else}
<!-- This is creating a header bar that is displaying the title of the app and a button that allows the user to sign in with google. -->
      <div class="headerBar">
        <h1 class="header top">svelte to-do</h1>
        <button on:click={login} class="button">sign in with google</button>
      </div>

<!-- This is a paragraph that is displaying text to the user. -->
      <p class="text">
        welcome to svelte to-do! this is a to-do list app made with svelte and
        firebase.
        <br />
        sign in to get started.
      </p>
    {/if}
  </div>

  {#if showThemeBox}
<!-- Creating a box with a header and buttons that change the theme of the page. -->
    <div class="box" id="themeBox" transition:fly={{ x: 300, duration: 300 }}>
      <h3 class="header top">themes</h3>
      <button on:click={() => theme.set("dark")} class="button">dark</button>
      <br />
      <button on:click={() => theme.set("light")} class="button">light</button>
      <br />
      <button on:click={() => theme.set("midnight")} class="button"
        >midnight</button
      >
      <br />
      <button on:click={() => theme.set("nebula")} class="button">nebula</button
      >
      <br />
      <button on:click={() => theme.set("olivia")} class="button">olivia</button
      >
      <br />
      <button on:click={() => theme.set("laser")} class="button">laser</button>
      <br />
      <button on:click={() => theme.set("carbon")} class="button">carbon</button
      >
    </div>
  {/if}
</main>

<!-- Styling the page. -->
<style>
  main {
    margin-top: 5rem;
    display: grid;
    grid-template-columns: auto 15rem 60rem 15rem auto;
    grid-column-gap: 2rem;
  }
  #mainBox {
    grid-column: 3 / 4;
  }
  #themeBox {
    height: fit-content;
  }
  .headerBar {
    display: flex;
    margin-bottom: 2rem;
  }
  .headerBar > * {
    white-space: nowrap;
  }
  #logoutButton {
    margin-right: 2rem;
  }
</style>
