export class NeonParticle {

	constructor(radius) {
		
		/**
		 * The particle radius.
		 * 
		 * @var number
		 */
		this.radius = radius;
		
		/**
		 * horizontal position.
		 */
		this.x = 0;

		/**
		 * Vertical position.
		 */
		this.y = 0;

		/**
		 * cicles age
		 */
		this.age = 0;

		/** 
		 * color changes based on spawn time
		 */
		this.color = `hsl(${ (Date.now() / 100.0) % 360.0}, 90%, light%)`;

		/** 
		 * visited coordinates
		 * 
		 * @var Array<number[2]>
		 */
		this.visited = [];

		const baseDirs = [1, 0];

		// starting directions for particles
		const dirVecs = [
			baseDirs,
			this.rotate(baseDirs, 120),
			this.rotate(baseDirs, 240)
		];

		// choose a random starting direction from the possible 3
		this.dir = dirVecs[Math.floor(Math.random() * 3)];
	}

	updateAndDraw(context, lineLength, speed, avoidVisited) {
		// The movement is all based on a fixed time step, regardless of how quickly it draws
		// This means the hexagons drawn should all be nearly perfect
		this.age += 1;

		// if the age is a multiple of the lineLength (meaning it should make a turn)
		if (this.age % lineLength == 0) {

			let options = [];

			if (avoidVisited) {

				// get the two possible directions
				
				let direction1 = this.rotate(this.dir, 60);

				if (!this.isVisited(this.x + direction1[0] * lineLength, this.y + direction1[1] * lineLength)) {
					// if the first option hasn't been visited before
					options.push(direction1);
				}
				
				let direction2 = this.rotate(this.dir, -60);

				if (!this.isVisited(this.x + direction2[0] * lineLength, this.y + direction2[1] * lineLength)) {
					// if the second option hasn't been visited before
					options.push(direction2);
				}
				
				if (options.length == 0) {
					// if both have been visited, both should be made valid choices
					options = [direction1, direction2];
				}
			} else {
				// if the option is off, choose randomly
				options = [direction1, direction2];
			}

			// get a random direction from those possible
			this.dir = options[Math.floor(Math.random() * options.length)];

			this.addToVisited(this.x, this.y);
		}

		context.fillStyle = this.color.replace('light', '70');
		context.beginPath();
		context.arc(context.canvas.offsetWidth / 2.0 + this.x, context.canvas.offsetHeight / 2.0 + this.y, this.radius, 0, 6.3);

		context.shadowBlur = this.radius * 6;
		context.shadowColor = this.color.replace('light', '30');

		context.fill();

		this.x += this.dir[0] * speed;
		this.y += this.dir[1] * speed;
	}

	isVisited(x, y) {
		// if the position appears in the visited list
		// using Math.floor should help reduce incorrect results due to rounding errors (hopefully)
		let pos = [Math.floor(x), Math.floor(y)];

		for (let i = 0; i < this.visited.length; i++) {
			if (this.visited[i][0] == pos[0] && this.visited[i][1] == pos[1]) {
				return true;
			}
		}

		return false;
	}

	addToVisited(x, y) {
		// add the position to the list if it does not already appear in the list
		if (!this.isVisited(x, y)) {
			let pos = [Math.floor(x), Math.floor(y)];
			this.visited.push(pos);
		}
	}

	rotate(vec, angle) {
		// convert the angle from degrees to radians
		angle = angle * Math.PI / 180;

		return [
			vec[0] * Math.cos(angle) - vec[1] * Math.sin(angle),
			vec[0] * Math.sin(angle) + vec[1] * Math.cos(angle)
		];
	}
}