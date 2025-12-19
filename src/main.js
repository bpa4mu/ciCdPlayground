import App from "./App.svelte";

new App({
  target: document.body,
  props: {
    // What's your name?
    name: "Pascal Baßler",
    // In the following fiels you can either give a single string,
    // or an array of bullet points

    // What do you associate with the term 'CI/CD'?
    associations: ["Not much"],
    // Which CI/CD tools do you use in your project?
    tools: "None so far",
    // What do you want to learn in this workshop?
    expectations: ["CI/CD basics"],
  },
});
