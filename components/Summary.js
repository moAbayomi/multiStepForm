export class Summary extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const template = document.getElementById("summary");
    const content = template.content.cloneNode(true);
    this.appendChild(content);
  }
}

customElements.define("summary-summary", Summary);
