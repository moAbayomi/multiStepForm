export class Info extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const template = document.getElementById("personal-info-input");
    const content = template.content.cloneNode(true);
    this.appendChild(content);
  }
}

customElements.define("personal-info", Info);
