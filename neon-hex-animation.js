import { NeonParticle } from './neon-particle';

/**
 * Recreation of:
 * https://codepen.io/towc/pen/mJzOWJ
 * Most of the code is my own, but I used a few things from the original,
 * such as the neon/electric drawing effect using shadows
 * (and replacing the light component of the HSL values),
 * and the ctx.globalCompositeOperation change to make it look nicer.
 */
export class NeonHexAnimation {
	constructor(canvas, settings) {

		if (typeof canvas === 'undefined') {
			throw DOMException('Undefined canvas element.');
		}

		this.canvas = canvas;
		this.ctx = canvas.getContext('2d');

		this.settings = Object.assign({
			// lineLength: 50, // // particle
			speed: 1,
			lifeTime: 500,
			maxParticles: 80,
			radius: 1,
			avoidVisited: true
		}, settings);

		this.visited = [];
		/**
		 * @var NeonParticle[]
		 */
		this.particles = [];

		// update the width/height if the window is resized
		window.onresize = this.updateCanvasSize;
	}

	/**
	 * Starts the animation drawing.
	 */
	init() {

		// set the canvas width/height
		this.updateCanvasSize();

		// start drawing
		this.updateAndDraw();
	}

	clearTrails() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.visited = [];
	}

	restart() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.particles = [];
		this.visited = [];
	}

	updateCanvasSize() {
		// this.canvas.width = this.canvas.parentElement.offsetWidth;
		// this.canvas.height = this.canvas.parentElement.offsetHeight;
	}

	updateAndDraw() {
		this.ctx.shadowBlur = 0;
		this.ctx.globalCompositeOperation = 'source-over';

		this.ctx.fillStyle = 'rgba(0, 0, 0, 0.03)';
		this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
		this.ctx.globalCompositeOperation = 'lighter';

		this.removeTooOldParticles(this.particles);

		if (this.particles.length < this.settings.maxParticles) {
			// if more particles can be added
			if (Math.random() > 0.9) {
				this.particles.push(new NeonParticle(this));
			}
		} else if (this.particles.length > this.settings.maxParticles) {
			// if there are two many particles
			this.particles.splice(0, this.settings.maxParticles);
		}

		requestAnimationFrame(() => this.updateAndDraw());
	}

	removeTooOldParticles(particles) {
		// go backwards through the particles, allowing them to be removed if neccesary
		for (let i = particles.length - 1; i >= 0; i--) {
			particles[i].updateAndDraw();

			if (particles[i].age > this.settings.lifeTime) {
				// remove the particle if it is too old
				particles.splice(i, 1);
			}
		}
	}
}