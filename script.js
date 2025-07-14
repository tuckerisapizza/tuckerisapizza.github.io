let dvdWidth, dvdHeight;
let baseSpeed = 0.0015; 
let dvdsVisible = true;

function animateDvd(dvdElement) {
  let x = Math.random() * (document.body.clientWidth - dvdWidth);
  let y = Math.random() * (document.body.clientHeight - dvdHeight);
  let dirX = Math.random() < 0.5 ? 1 : -1;
  let dirY = Math.random() < 0.5 ? 1 : -1;

  function animate() {
    const screenHeight = document.body.clientHeight;
    const screenWidth = document.body.clientWidth;

    const normalizedSpeed = baseSpeed * (screenWidth + screenHeight) / 2;

    if (y + dvdHeight >= screenHeight || y < 0) {
      dirY *= -1;
    }
    if (x + dvdWidth >= screenWidth || x < 0) {
      dirX *= -1;
    }

    x += dirX * normalizedSpeed;
    y += dirY * normalizedSpeed;
    dvdElement.style.left = x + "px";
    dvdElement.style.top = y + "px";

    window.requestAnimationFrame(animate);
  }

  window.requestAnimationFrame(animate);
}

function createDvdElement() {
  const newDvd = document.createElement("div");
  newDvd.classList.add("dvd");
  newDvd.style.position = "absolute";
  newDvd.style.width = dvdWidth + "px";
  newDvd.style.height = dvdHeight + "px";

  const isFish = Math.random() < 0.01; 
  newDvd.style.backgroundImage = isFish ? "url('fish.webp')" : "url('renousurgery.webp')";
  newDvd.style.backgroundSize = "cover";
  newDvd.style.backgroundPosition = "center";
  newDvd.style.left = "0px";
  newDvd.style.top = "0px";
  document.body.appendChild(newDvd);

  if (isFish) {
    const fishSound = new Audio("fish.mp3");
    fishSound.play();
  }

  newDvd.addEventListener("click", createDvdElement);

  animateDvd(newDvd);
}

document.getElementById("toggle-dvds").addEventListener("click", () => {
  dvdsVisible = !dvdsVisible;

  const dvds = document.querySelectorAll(".dvd");
  dvds.forEach((dvd) => {
    dvd.style.visibility = dvdsVisible ? "visible" : "hidden";
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const initialDvd = document.createElement("div");
  initialDvd.classList.add("dvd");
  initialDvd.style.position = "absolute";
  initialDvd.style.width = "20vmin";
  initialDvd.style.height = "20vmin";
  initialDvd.style.maxheight = "50px";
  initialDvd.style.maxwidth = "50px";
  initialDvd.style.backgroundImage = "url('renousurgery.webp')";
  initialDvd.style.backgroundSize = "cover";
  initialDvd.style.backgroundPosition = "center";
  initialDvd.style.left = "0px";
  initialDvd.style.top = "0px";
  document.body.appendChild(initialDvd);

  dvdWidth = initialDvd.clientWidth;
  dvdHeight = initialDvd.clientHeight;

  initialDvd.addEventListener("click", createDvdElement);

  animateDvd(initialDvd);
});
