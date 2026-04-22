---
layout: base
title: Code Constellations
hide: true
background: home.png
---

<script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js"></script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Bungee&family=Great+Vibes&display=swap');

  /* HIDE THE THEME FOOTER */
  footer, .footer, #footer, .site-footer, .page__footer {
    display: none !important;
  }

  body {
    margin: 0;
    height: 100vh;
    background: radial-gradient(circle at center, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 100%), url('{{ site.baseurl }}/home.png') no-repeat center center fixed;
    background-size: cover;
    color: #ffffff;
    font-family: 'Orbitron', sans-serif !important;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    overflow: hidden;
  }

  /* COOL SCANLINE EFFECT */
  body::before {
    content: " ";
    display: block;
    position: absolute;
    top: 0; left: 0; bottom: 0; right: 0;
    background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06));
    z-index: 2;
    background-size: 100% 4px, 3px 100%;
    pointer-events: none;
  }

  /* SHAKE EFFECT */
  .shake-screen {
    animation: screenShake 0.4s cubic-bezier(.36,.07,.19,.97) both;
  }

  @keyframes screenShake {
    10%, 90% { transform: translate3d(-2px, 0, 0); }
    20%, 80% { transform: translate3d(4px, 0, 0); }
    30%, 50%, 70% { transform: translate3d(-8px, 0, 0); }
    40%, 60% { transform: translate3d(8px, 0, 0); }
  }

  .typing-container {
    position: absolute;
    top: 10%;
    width: 95%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 5;
  }

  #typed { 
    font-family: 'Bungee', cursive;
    font-size: 6rem;
    line-height: 1.1;
    display: inline-block;
    color: #ffffff;
    text-shadow: 0 0 10px rgba(255,0,0,0.8), 4px 4px 0px #ff0000, -2px -2px 0px #0000ff;
    letter-spacing: -2px;
  }

  @media (max-width: 1000px) { #typed { font-size: 4rem; } }
  @media (max-width: 600px) { #typed { font-size: 2.2rem; } }

  .middle-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-family: 'Great Vibes', cursive;
    font-size: 9rem;
    color: #ffffff;
    text-shadow: 0 0 50px rgba(255,255,255,0.4);
    opacity: 0;
    animation: fadeInMiddle 1s ease-in forwards, float 3s ease-in-out infinite alternate;
    animation-delay: 2.8s, 3.8s;
  }

  @keyframes float {
    from { transform: translate(-50%, -50%); }
    to { transform: translate(-50%, -55%); }
  }

  @keyframes fadeInMiddle {
    from { opacity: 0; transform: translate(-50%, -40%); }
    to   { opacity: 1; transform: translate(-50%, -50%); }
  }

  /* --- CYBER RACING BUTTONS --- */
  .button-container {
    position: absolute;
    bottom: 5%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 100;
    display: flex;
    flex-direction: column;
    gap: 15px;
    align-items: center;
  }

  .button.large {
    display: inline-block;
    padding: 15px 80px;
    min-width: 300px;
    font-size: 1.8rem;
    text-decoration: none;
    font-family: 'Bungee', sans-serif;
    color: #fff !important;
    border: 3px solid #fff;
    border-radius: 4px;
    text-transform: uppercase;
    letter-spacing: 6px;
    transform: skew(-15deg);
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    position: relative;
    overflow: hidden;
  }

  .btn-start {
    background: #ff0000;
    box-shadow: 0 0 20px rgba(255, 0, 0, 0.3);
  }

  .btn-blog {
    background: #111;
    border-color: #555;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  }

  /* SPRINT 5 THEMED BUTTON */
  .btn-s5 {
    background: linear-gradient(45deg, #005f73, #00d4ff);
    box-shadow: 0 4px 15px rgba(0, 212, 255, 0.4);
    border-color: #00d4ff;
  }

  .button.large:hover {
    transform: skew(-15deg) translateY(-5px) scale(1.05);
    border-color: #fff;
    letter-spacing: 10px;
  }

  .btn-start:hover {
    background: #ff2a2a;
    box-shadow: 0 0 50px rgba(255, 0, 0, 0.8);
  }

  .btn-blog:hover {
    background: #222;
    box-shadow: 0 0 40px rgba(255, 255, 255, 0.2);
  }

  .btn-s5:hover {
    background: #00d4ff;
    box-shadow: 0 0 40px rgba(0, 212, 255, 0.8);
  }

  /* Button Inner Glow Overlay */
  .button.large::before {
    content: '';
    position: absolute;
    top: 0; left: -100%;
    width: 100%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
    transition: 0.5s;
  }

  .button.large:hover::before {
    left: 100%;
  }

  #cursor {
    display: inline-block;
    width: 10px;
    height: 4rem;
    background-color: #00f2ff;
    box-shadow: 0 0 15px #00f2ff;
    margin-left: 10px;
    vertical-align: middle;
    animation: blink 0.7s steps(1) infinite;
  }
  @keyframes blink { 50% { opacity: 0; } }
</style>

<div class="typing-container">
  <span id="typed"></span><span id="cursor"></span>
</div>

<div class="middle-text">Welcome</div>

<div class="button-container">
  <a href="{{site.baseurl}}/sprintfive" class="button large btn-s5">
    SPRINT 5
  </a>

  <a href="{{site.baseurl}}/sprintfour" class="button large btn-blog">
    SPRINT 4
  </a>

  <a href="{{site.baseurl}}/home" class="button large btn-start">
    START
  </a>
</div>

<script>
  const text = "THE HOME OF THE SPRINTING SNAILS";
  const speed = 40; 
  let i = 0;

  function typeWriter() {
    if (i < text.length) {
      document.getElementById("typed").innerHTML += text.charAt(i);
      i++;
      setTimeout(typeWriter, speed);
    } else {
      setTimeout(() => {
        triggerShake();
        setTimeout(fireConfetti, 200);
      }, 500);
    }
  }

  function triggerShake() {
    document.body.classList.add('shake-screen');
    setTimeout(() => {
      document.body.classList.remove('shake-screen');
    }, 500);
  }

  function fireConfetti() {
    const duration = 5 * 1000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 80,
        origin: { x: 0, y: 0.7 },
        colors: ['#ff0000', '#00f2ff', '#ffffff']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 80,
        origin: { x: 1, y: 0.7 },
        colors: ['#ff0000', '#00f2ff', '#ffffff']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  }
//lalalallalala
  window.onload = typeWriter;
</script>