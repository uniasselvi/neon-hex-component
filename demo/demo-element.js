import { LitElement, html } from '@polymer/lit-element';
import '../neon-hex.component';

class DemoElement extends LitElement {
	static get template() {
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
