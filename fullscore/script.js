(function () {
  const drawButton = document.getElementById("drawButton");
  const flipButton = document.getElementById("flipButton");
  const card = document.getElementById("card");
  const cardBack = document.querySelector(".card-back");
  const cardFace = document.querySelector(".card-face");
  const cornerTop = document.getElementById("cornerTop");
  const cornerBottom = document.getElementById("cornerBottom");
  const scoreValue = document.getElementById("scoreValue");
  const scoreUnit = document.getElementById("scoreUnit");

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const revealMs = prefersReducedMotion ? 600 : 1000;
  const settleMs = prefersReducedMotion ? 800 : 3820;
  const flipMs = prefersReducedMotion ? 120 : 760;
  const swapMs = prefersReducedMotion ? 20 : 360;

  let isBusy = false;
  let hasDrawn = false;
  let currentScore = null;

  function randomScore() {
    if (Math.random() < 0.05) {
      return 0;
    }
    return Math.ceil(Math.random() * 10);
  }

  function updateCard(score) {
    const isJoker = score === 0;
    const cornerText = isJoker ? "J" : String(score);

    card.classList.toggle("is-joker", isJoker);
    cornerTop.textContent = cornerText;
    cornerBottom.textContent = cornerText;
    scoreValue.textContent = isJoker ? "JOKER" : String(score);
    scoreUnit.textContent = isJoker ? "0分" : "分";
  }

  function showFront() {
    card.classList.add("is-flipping");

    window.setTimeout(function () {
      cardBack.style.display = "none";
      cardFace.style.display = "block";
      card.classList.add("is-flipped");
    }, swapMs);

    window.setTimeout(function () {
      card.classList.remove("is-flipping");
    }, flipMs);
  }

  function showBack() {
    card.classList.remove("is-flipped");
    card.classList.add("is-flipping");

    window.setTimeout(function () {
      cardFace.style.display = "none";
      cardBack.style.display = "grid";
    }, swapMs);

    window.setTimeout(function () {
      card.classList.remove("is-flipping");
    }, flipMs);
  }

  drawButton.addEventListener("click", function () {
    if (isBusy) {
      return;
    }

    isBusy = true;
    drawButton.disabled = true;
    flipButton.disabled = true;

    currentScore = randomScore();
    updateCard(currentScore);
    hasDrawn = true;

    card.classList.remove("is-swapping");

    if (card.classList.contains("is-flipped")) {
      void card.offsetWidth;
      card.classList.add("is-swapping");
    } else {
      showFront();
    }

    window.setTimeout(function () {
      card.classList.remove("is-swapping");
      showBack();
    }, revealMs);

    window.setTimeout(function () {
      isBusy = false;
      drawButton.disabled = false;
      flipButton.disabled = false;
    }, settleMs);
  });

  flipButton.addEventListener("click", function () {
    if (isBusy || !hasDrawn) {
      return;
    }

    isBusy = true;
    drawButton.disabled = true;
    flipButton.disabled = true;

    card.classList.remove("is-swapping");

    if (card.classList.contains("is-flipped")) {
      showBack();
    } else {
      showFront();
    }

    window.setTimeout(function () {
      isBusy = false;
      drawButton.disabled = false;
      flipButton.disabled = false;
    }, flipMs);
  });
})();
