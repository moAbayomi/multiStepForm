export class Plan extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const template = document.getElementById("plan-input");
    const content = template.content.cloneNode(true);
    this.appendChild(content);
  }
}

customElements.define("plan-plan", Plan);
