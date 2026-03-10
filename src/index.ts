import { Header } from "./components/header-component.js";

const headerContainer = document.querySelector("#header-container") as HTMLElement;
const headerTemplate = document.querySelector("#header-template") as HTMLTemplateElement;

const header = new Header(headerContainer, headerTemplate);


header.render({
  logoImagePath: "./src/data/images/logo/logo-with-text.svg",
  isBorderShown: false,
})