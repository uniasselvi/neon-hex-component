import { LitElement, html } from '@polymer/lit-element';
import { NeonHexAnimation } from './neon-hex-animation';

class NeonHexComponent extends LitElement {
  
	_render() {
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

	/**
	 * Called after element DOM has been rendered.
	 */
	_didRender() {
		this.hexAnimation = new NeonHexAnimation(this.shadowRoot.querySelector('canvas'));
		this.hexAnimation.init();
	}

}

customElements.define('neon-hex', NeonHexComponent);
