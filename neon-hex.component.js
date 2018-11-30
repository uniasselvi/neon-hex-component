import { LitElement, html } from '@polymer/lit-element';
import { NeonHexAnimation } from './neon-hex-animation';

class NeonHexComponent extends LitElement {
  
	_render() {
		return html`
			<style>
			:host {
				display: block;
			}
			:host,
			canvas {
				width: 100%; 
				height: 100%;
			}
			</style>
			<canvas></canvas>
		`;
	}

	static get properties() {
		return {
			maxParticles: 80,
			speed: 1,
			lifeTime: 500,
			radius: 1,
			avoidVisited: true
		};
	}

	/**
	 * Called after element DOM has been rendered.
	 */
	_didRender(props) {
		this.hexAnimation = new NeonHexAnimation(this.shadowRoot.querySelector('canvas').getContext('2d'), props);
		this.hexAnimation.init();
	}

}

customElements.define('neon-hex', NeonHexComponent);
