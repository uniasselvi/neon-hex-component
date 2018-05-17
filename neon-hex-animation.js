/**
 * Recreation of:
 * https://codepen.io/towc/pen/mJzOWJ
 * Most of the code is my own, but I used a few things from the original,
 * such as the neon/electric drawing effect using shadows
 * (and replacing the light component of the HSL values),
 * and the ctx.globalCompositeOperation change to make it look nicer.
 */
class NeonHexAnimation {
    constructor(canvas, settings) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");

        this.settings = {
            lineLength: 50,
            speed: 1,
            lifeTime: 500,
            maxParticles: 80,
            radius: 1,
            avoidVisited: true
        };

        this.visited = [];
        this.particles = [];

        // set the canvas width/height
        this.updateCanvasSize();

        // update the width/height if the window is resized
        window.onresize = this.updateCanvasSize;

        // start drawing
        updateAndDraw();
    }

    clearTrails() {
        this.ctx.clearRect(0, 0, width, height);
        this.visited = [];
    }

    restart() {
        this.ctx.clearRect(0, 0, width, height);
        this.particles = [];
        this.visited = [];
    }

    updateCanvasSize() {
        this.canvas.width = this.canvas.parentElement.offsetWidth;
        this.canvas.height = this.canvas.parentElement.offsetHeight;
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
        //add the position to the list if it does not already appear in the list
        if (!this.isVisited(x, y)) {
            let pos = [Math.floor(x), Math.floor(y)];
            this.visited.push(pos);
        }
    }

    updateAndDraw() {
        this.ctx.shadowBlur = 0;
        this.ctx.globalCompositeOperation = "source-over";

        this.ctx.fillStyle = "rgba(0, 0, 0, 0.03)";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.globalCompositeOperation = "lighter";

        this.removeTooOldParticles(this.particles);

        if (this.particles.length < this.settings.maxParticles) {
            // if more particles can be added
            if (Math.random() > 0.9) {
                this.particles.push(new NeonParticle(this.ctx));
            }
        } else if (this.particles.length > this.settings.maxParticles) {
            // if there are two many particles
            this.particles.splice(0, this.settings.maxParticles);
        }

        requestAnimationFrame(updateAndDraw);
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