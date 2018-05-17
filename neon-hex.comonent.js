import { LitElement, html } from '@polymer/lit-element';

class NeonHexComponent extends LitElement {
  
	static get template() {
		return html`<canvas></canvas>`;
	}

	static get properties() {
		return {
			lineLength: 50,
			speed: 1,
			lifeTime: 500,
			maxParticles: 80,
			radius: 1,
			avoidVisited: true
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

customElements.define('neon-hex', NeonHexComponent);
