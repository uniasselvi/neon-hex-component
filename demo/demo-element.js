import { LitElement, html } from '@polymer/lit-element';
import '../neon-hex.component.js';

class DemoElement extends LitElement {
	_render() {
		return html `<neon-hex></neon-hex>`;
	}

	_message(fav) {
		if (fav) {
			return 'You really like me!';
		} else {
			return 'Do you like me?';
		}
	}
}

customElements.define('demo-element', DemoElement);
