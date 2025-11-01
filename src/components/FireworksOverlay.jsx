import React, { useRef, useEffect, useState } from "react";

const FireworksOverlay = ({ duration = 6000 }) => {
  const canvasRef = useRef(null);
  const [active, setActive] = useState(true);

  useEffect(() => {
    if (!active) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const rockets = [];
    const particles = [];

    class Rocket {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height;
        this.speed = Math.random() * 3 + 5;
        this.angle = (Math.random() * Math.PI) / 10 - Math.PI / 20;
        this.color = `hsl(${Math.random() * 360}, 100%, 60%)`;
        this.exploded = false;
        this.targetHeight =
          canvas.height * (Math.random() * 0.3 + 0.2); // random burst height (20%-50%)
      }

      update() {
        this.x += Math.sin(this.angle);
        this.y -= this.speed;
        if (this.y <= this.targetHeight && !this.exploded) {
          this.explode();
        }
      }

      explode() {
        this.exploded = true;
        const count = 60 + Math.random() * 80;
        for (let i = 0; i < count; i++) {
          particles.push(new Particle(this.x, this.y, this.color));
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();

        // Rocket trail glow
        const gradient = ctx.createLinearGradient(
          this.x,
          this.y,
          this.x,
          this.y + 40
        );
        gradient.addColorStop(0, this.color);
        gradient.addColorStop(1, "transparent");
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x, this.y + 40);
        ctx.stroke();
      }
    }

    class Particle {
      constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.angle = Math.random() * Math.PI * 2;
        this.speed = Math.random() * 5 + 1;
        this.life = 1;
        this.decay = Math.random() * 0.02 + 0.01;
      }

      update() {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed + 0.3; // gravity
        this.life -= this.decay;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `${this.color}${Math.floor(this.life * 255)
          .toString(16)
          .padStart(2, "0")}`;
        ctx.fill();
      }
    }

    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Launch rockets randomly
      if (Math.random() < 0.08) rockets.push(new Rocket());

      // Update rockets
      for (let i = rockets.length - 1; i >= 0; i--) {
        rockets[i].update();
        rockets[i].draw();
        if (rockets[i].exploded) rockets.splice(i, 1);
      }

      // Update particles
      for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].draw();
        if (particles[i].life <= 0) particles.splice(i, 1);
      }

      requestAnimationFrame(animate);
    };

    animate();

    const timeout = setTimeout(() => setActive(false), duration);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", resize);
    };
  }, [active, duration]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full z-[999] pointer-events-none"
      style={{ mixBlendMode: "screen" }}
    />
  );
};

export default FireworksOverlay;
