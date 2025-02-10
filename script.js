let dvdWidth, dvdHeight;
let baseSpeed = 0.0015; // Speed factor relative to viewport size
let dvdsVisible = true;

// Function to animate a given DVD element
function animateDvd(dvdElement) {
  let x = Math.random() * (document.body.clientWidth - dvdWidth);
  let y = Math.random() * (document.body.clientHeight - dvdHeight);
  let dirX = Math.random() < 0.5 ? 1 : -1;
  let dirY = Math.random() < 0.5 ? 1 : -1;

  function animate() {
    const screenHeight = document.body.clientHeight;
    const screenWidth = document.body.clientWidth;

    // Calculate normalized speed
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

    // Continue animation
    window.requestAnimationFrame(animate);
  }

  window.requestAnimationFrame(animate);
}

// Function to create a new DVD element
function createDvdElement() {
  const newDvd = document.createElement("div");
  newDvd.classList.add("dvd");
  newDvd.style.position = "absolute";
  newDvd.style.width = dvdWidth + "px";
  newDvd.style.height = dvdHeight + "px";

  // Determine if this DVD is the special fish
  const isFish = Math.random() < 0.01; // 1 in 100 chance
  newDvd.style.backgroundImage = isFish ? "url('fish.webp')" : "url('renousurgery.webp')";
  newDvd.style.backgroundSize = "cover";
  newDvd.style.backgroundPosition = "center";
  newDvd.style.left = "0px";
  newDvd.style.top = "0px";
  document.body.appendChild(newDvd);

  // Play fish sound if it is a fish
  if (isFish) {
    const fishSound = new Audio("fish.mp3");
    fishSound.play();
  }

  // Add click event to create more DVDs
  newDvd.addEventListener("click", createDvdElement);

  // Start animation for the new DVD
  animateDvd(newDvd);
}

// Toggle DVDs on or off
document.getElementById("toggle-dvds").addEventListener("click", () => {
  dvdsVisible = !dvdsVisible;

  // Toggle visibility of all DVDs
  const dvds = document.querySelectorAll(".dvd");
  dvds.forEach((dvd) => {
    dvd.style.visibility = dvdsVisible ? "visible" : "hidden";
  });
});

// Create initial DVD element dynamically on page load
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

  // Get its dimensions for animation
  dvdWidth = initialDvd.clientWidth;
  dvdHeight = initialDvd.clientHeight;

  // Add click event to create more DVDs
  initialDvd.addEventListener("click", createDvdElement);

  // Start animation for the initial DVD
  animateDvd(initialDvd);
});
