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

// Gallery navigation
let currentGalleryIndex = 0;

function moveGallery(direction) {
  const gallery = document.getElementById('gallery');
  const items = gallery.querySelectorAll('.archive-item');
  
  // Hide current item
  items[currentGalleryIndex].classList.remove('active');
  
  // Update index
  currentGalleryIndex += direction;
  
  // Loop around
  if (currentGalleryIndex >= items.length) {
    currentGalleryIndex = 0;
  } else if (currentGalleryIndex < 0) {
    currentGalleryIndex = items.length - 1;
  }
  
  // Show new item
  items[currentGalleryIndex].classList.add('active');
}

// Touch/Swipe handling for gallery
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('DOMContentLoaded', function() {
  const gallery = document.getElementById('gallery');
  
  gallery.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
  }, false);
  
  gallery.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, false);
});

function handleSwipe() {
  const swipeThreshold = 50;
  const difference = touchStartX - touchEndX;
  
  if (Math.abs(difference) > swipeThreshold) {
    if (difference > 0) {
      // Swipe left - show next item
      moveGallery(1);
    } else {
      // Swipe right - show previous item
      moveGallery(-1);
    }
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

// Spectrum playhead control
document.addEventListener('DOMContentLoaded', function() {
  const player = document.getElementById('audioPlayer');
  const spectrum = document.getElementById('spectrum');
  const playhead = document.getElementById('playhead');

  if (!player || !spectrum || !playhead) return;

  // When metadata loaded, set playhead animation duration
  player.addEventListener('loadedmetadata', () => {
    const dur = Math.max(1, Math.floor(player.duration));
    // set animation with exact duration
    playhead.style.animation = `playheadMove ${player.duration}s linear forwards`;
    playhead.style.animationPlayState = 'paused';
  });

  player.addEventListener('play', () => {
    spectrum.classList.add('playing');
    playhead.style.animationPlayState = 'running';
  });

  player.addEventListener('pause', () => {
    spectrum.classList.remove('playing');
    playhead.style.animationPlayState = 'paused';
  });

  player.addEventListener('ended', () => {
    spectrum.classList.remove('playing');
    playhead.style.animationPlayState = 'paused';
    // move playhead to end
    playhead.style.transform = 'translateX(calc(100% - 3px))';
  });

  // Toggle playback when clicking the spectrum
  spectrum.addEventListener('click', () => {
    if (player.paused) {
      player.play();
    } else {
      player.pause();
    }
  });

  // Reset playhead when modal closed via closeAudio
  const originalClose = closeAudio;
  window.closeAudio = function() {
    try {
      player.pause();
      player.currentTime = 0;
      spectrum.classList.remove('playing');
      // reset animation
      playhead.style.animation = 'none';
      // force reflow
      void playhead.offsetWidth;
      playhead.style.transform = 'translateX(0)';
      // reassign animation so loadedmetadata can set it again if needed
      if (player.duration && player.duration > 0) {
        playhead.style.animation = `playheadMove ${player.duration}s linear forwards`;
        playhead.style.animationPlayState = 'paused';
      }
    } finally {
      // call original behavior to hide modal
      originalClose();
    }
  }
});

// Initialize particles on load
createParticles();

