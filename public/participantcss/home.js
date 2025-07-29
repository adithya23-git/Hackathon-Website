const typewriterText = document.getElementById("typewriter-text");
const sentences = [
  "Welcome to WEBNOX",
  "Explore Our Events",
  "Join Our Community"
];
let currentSentenceIndex = 0;

function startTypewriter() {
  // Set the text content
  typewriterText.textContent = sentences[currentSentenceIndex];

  // Restart the animation
  typewriterText.style.animation = "none"; // Reset animation
  void typewriterText.offsetWidth; // Trigger reflow to restart animation
  typewriterText.style.animation = "typing 4s steps(40, end), deleting 4s steps(40, end) 4s, blink-caret 0.75s step-end";

  // Move to the next sentence
  currentSentenceIndex = (currentSentenceIndex + 1) % sentences.length;
}

// Start the typewriter effect initially
startTypewriter();

// Restart the typewriter effect after the animation completes (8 seconds)
setInterval(startTypewriter, 8000);

// Carousel Functionality
const carouselInner = document.querySelector(".carousel-inner");
const carouselItems = document.querySelectorAll(".carousel-item");
const prevButton = document.querySelector(".carousel-control.prev");
const nextButton = document.querySelector(".carousel-control.next");

let currentIndex = 0;

function updateCarousel() {
  const offset = -currentIndex * 100;
  carouselInner.style.transform = translateX(${offset}%);
}

prevButton.addEventListener("click", () => {
  currentIndex = (currentIndex > 0) ? currentIndex - 1 : carouselItems.length - 1;
  updateCarousel();
});

nextButton.addEventListener("click", () => {
  currentIndex = (currentIndex < carouselItems.length - 1) ? currentIndex + 1 : 0;
  updateCarousel();
});

// Auto-rotate carousel every 5 seconds
setInterval(() => {
  currentIndex = (currentIndex < carouselItems.length - 1) ? currentIndex + 1 : 0;
  updateCarousel();
}, 5000);
document.addEventListener('DOMContentLoaded', () => {
  // Reveal the certificate section when the page loads
  const certificateReveal = document.querySelector('.certificate-reveal');
  setTimeout(() => {
      certificateReveal.style.display = 'block';
  }, 1500);

  // Animate prize money on hover
  const prizeItems = document.querySelectorAll('.prize-item');
  prizeItems.forEach(item => {
      item.addEventListener('mouseenter', () => {
          const money = item.querySelector('.prize-money');
          money.classList.add('money-animation');
      });
      item.addEventListener('mouseleave', () => {
          const money = item.querySelector('.prize-money');
          money.classList.remove('money-animation');
      });
  });
});