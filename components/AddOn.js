export class AddOn extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const template = document.getElementById("add-on-input");
    const content = template.content.cloneNode(true);
    this.appendChild(content);
  }
}

customElements.define("add-on", AddOn);
