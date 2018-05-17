import { LitElement, html } from '@polymer/polymer/lit-element.js';

class NeonHexParticles extends LitElement {
  static get template() {
    return html`
      <style>
        /* shadow DOM styles go here */
        :host {
          display: inline-block;
        }
        iron-icon {
          fill: rgba(0,0,0,0);
          stroke: currentcolor;
        }
        :host([pressed]) iron-icon {
          fill: currentcolor;
        }
      </style>
  
      <!-- shadow DOM goes here -->
      <iron-icon icon="[[toggleIcon]]"></iron-icon>
    `;
  }
  static get properties() {
    return {
      toggleIcon: {
        type: String
      },
      pressed: {
        type: Boolean,
        value: false,
        notify: true,
        reflectToAttribute: true
      },
    };
  }
  constructor() {
    super();
    this.addEventListener('click', this.toggle.bind(this));
  }
  toggle() {
    this.pressed = !this.pressed;
  }
}

customElements.define('icon-toggle', IconToggle);
