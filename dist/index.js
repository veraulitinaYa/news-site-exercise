import { Header } from "./components/header-component.js";
const headerContainer = document.querySelector("#header-container");
const headerTemplate = document.querySelector("#header-template");
const header = new Header(headerContainer, headerTemplate);
header.render({
    logoImagePath: "./src/data/images/logo/logo-with-text.svg",
    isBorderShown: false,
});
