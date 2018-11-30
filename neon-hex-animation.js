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
	constructor(context, settings) {

		if (typeof context === 'undefined') {
			throw DOMException('You must provide a context for drawing the animation.');
		}

		this.ctx = context;

		this.settings = Object.assign({
			lifeTime: 500,
			maxParticles: 80,
			// particle
			lineLength: 50,
			speed: 1,
			radius: 1,		
			avoidVisited: true
		}, settings);

		/**
		 * @var NeonParticle[]
		 */
		this.particles = [];

		// update the width/height if the window is resized
		window.onresize = e => this.updateCanvasSize();
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
		this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
		this.particles.forEach(x => x.visited = []);
	}

	restart() {
		this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
		this.particles.forEach(x => x = null);
	}

	updateCanvasSize() {
		this.canvasWidth = this.ctx.canvas.offsetWidth;
		this.canvasHeight = this.ctx.canvas.offsetHeight;
	}

	updateAndDraw() {

		this.ctx.shadowBlur = 0;
		this.ctx.fillStyle = 'rgba(0, 0, 0, 0.03)';
		this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
		this.ctx.globalCompositeOperation = 'lighter';

		this.removeTooOldParticles(this.particles);

		if (this.particles.length < this.settings.maxParticles) {
			// if more particles can be added
			if (Math.random() > 0.9) {
				this.particles.push(new NeonParticle(this.settings.radius));
			}
		} else if (this.particles.length > this.settings.maxParticles) {
			// if there are two many particles
			this.particles.splice(0, this.settings.maxParticles);
		}

		requestAnimationFrame(() => this.updateAndDraw());
	}

	/**
	 * 
	 * @param {NeonParticle[]} particles 
	 */
	removeTooOldParticles(particles) {
		// go backwards through the particles, 
		// allowing them to be removed if neccesary
		for (let i = particles.length - 1; i >= 0; i--) {
			particles[i].updateAndDraw(
				this.ctx, 
				this.settings.lineLength, 
				this.settings.speed,
				this.settings.avoidVisited
			);

			if (particles[i].age > this.settings.lifeTime) {
				// remove the particle if it is too old
				particles.splice(i, 1);
			}
		}
	}
}