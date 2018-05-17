class NeonParticle {
    constructor(canvasContext) {
        this.ctx = canvasContext;
        this.x = 0;
        this.y = 0;
        this.age = 0;

        const baseDirs = [1, 0];

        // starting directions for particles
        const dirVecs = [
            baseDirs,
            this.rotate(baseDirs, 120),
            this.rotate(baseDirs, 240)
        ];

        // choose a random starting direction from the possible 3
        this.dir = dirVecs[Math.floor(Math.random() * 3)];

        // color changes based on spawn time
        this.color = `hsl(${ (Date.now() / 100.0) % 360.0}, 90%, light%)`;
    }

    updateAndDraw() {
        // The movement is all based on a fixed time step, regardless of how quickly it draws
        // This means the hexagons drawn should all be nearly perfect
        this.age += 1;

        // if the age is a multiple of the lineLength (meaning it should make a turn)
        if (this.age % this.settings.lineLength == 0) {
            // get the two possible directions
            let dir1 = this.rotate(this.dir, 60);
            let dir2 = this.rotate(this.dir, -60);

            let options = [];

            if (this.settings.avoidVisited) {
                if (!isVisited(this.x + dir1[0] * this.settings.lineLength, this.y + dir1[1] * this.settings.lineLength)) {
                    // if the first option hasn't been visited before
                    options.push(dir1);
                }
                if (!isVisited(this.x + dir2[0] * this.settings.lineLength, this.y + dir2[1] * this.settings.lineLength)) {
                    // if the second option hasn't been visited before
                    options.push(dir2);
                }
                if (options.length == 0) {
                    // if both have been visited, both should be made valid choices
                    options = [dir1, dir2];
                }
            } else {
                // if the option is off, choose randomly
                options = [dir1, dir2];
            }

            // get a random direction from those possible
            this.dir = options[Math.floor(Math.random() * options.length)];

            addToVisited(this.x, this.y);
        }

        this.ctx.fillStyle = this.color.replace("light", "70");
        this.ctx.beginPath();
        this.ctx.arc(this.canvas.width / 2.0 + this.x, this.canvas.height / 2.0 + this.y, this.settings.radius, 0, 6.3);

        this.ctx.shadowBlur = this.settings.radius * 6;
        this.ctx.shadowColor = this.color.replace("light", "30");

        this.ctx.fill();

        this.x += this.dir[0] * this.settings.speed;
        this.y += this.dir[1] * this.settings.speed;
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