// Create floating golden particles
function createParticles() {
  const container = document.getElementById('particles');
  const particleCount = 60;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const left = Math.random() * 100;
    const size = Math.random() * 3 + 1;
    const delay = Math.random() * 12;
    const duration = 10 + Math.random() * 10;
    const drift = (Math.random() - 0.5) * 300;
    
    particle.style.left = `${left}%`;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.animationDelay = `${delay}s`;
    particle.style.animationDuration = `${duration}s`;
    particle.style.setProperty('--drift', `${drift}px`);
    
    container.appendChild(particle);
  }
}

// Open audio modal
function openAudio(element) {
  const modal = document.getElementById('audioModal');
  const player = document.getElementById('audioPlayer');
  modal.classList.add('active');
  if (element && element.classList) element.classList.add('playing');
  setTimeout(() => {
    player.play();
  }, 300);
}

// Close audio modal
function closeAudio() {
  const modal = document.getElementById('audioModal');
  const player = document.getElementById('audioPlayer');
  player.pause();
  player.currentTime = 0;
  modal.classList.remove('active');
}

// Toggle playing class on click for archive items (start animation on click)
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.archive-item').forEach(item => {
    item.addEventListener('click', function(e) {
      // avoid toggling when clicking overlay controls inside modal
      if (e.target.closest('.archive-overlay')) {
        // toggle playing class
        this.classList.toggle('playing');
      }
    });
  });
});

// Close modal with ESC key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeAudio();
  }
});

// Close modal by clicking outside
document.addEventListener('DOMContentLoaded', function() {
  const modal = document.getElementById('audioModal');
  if (modal) {
    modal.addEventListener('click', function(e) {
      if (e.target === this) {
        closeAudio();
      }
    });
  }
});

// Initialize particles on load
createParticles();

