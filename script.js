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
  const currentItem = items[currentGalleryIndex];
  
  // Update index
  currentGalleryIndex += direction;
  
  // Loop around
  if (currentGalleryIndex >= items.length) {
    currentGalleryIndex = 0;
  } else if (currentGalleryIndex < 0) {
    currentGalleryIndex = items.length - 1;
  }
  
  const nextItem = items[currentGalleryIndex];
  
  // Add exit animation to current item
  currentItem.classList.add('exit');
  // Add active class to next item to start entry animation
  nextItem.classList.add('active');
  
  // Remove exit class after animation completes
  setTimeout(() => {
    currentItem.classList.remove('active', 'exit');
  }, 700);
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
  if (!modal) return;
  modal.classList.add('active');
  if (element && element.classList) element.classList.add('playing');
}

// Close audio modal
function closeAudio() {
  const modal = document.getElementById('audioModal');
  const activeItem = document.querySelector('.archive-item.playing');
  if (activeItem) activeItem.classList.remove('playing');
  if (!modal) return;
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

// Floating circle toggle functionality (no mouse following)
const floatingCircle = document.getElementById('floatingCircle');

// Toggle social popup on click
if (floatingCircle) {
  floatingCircle.addEventListener('click', (e) => {
    // Don't toggle if clicking on a social link
    if (!e.target.closest('.popup-link')) {
      floatingCircle.classList.toggle('active');
    }
  });
}

// Close popup when clicking outside
document.addEventListener('click', (e) => {
  if (floatingCircle && !e.target.closest('.floating-circle')) {
    floatingCircle.classList.remove('active');
  }
});

// Email form submission handler
document.addEventListener('DOMContentLoaded', function() {
  const emailForm = document.getElementById('emailForm');
  const thankYouMessage = document.getElementById('thankYouMessage');
  
  if (emailForm && thankYouMessage) {
    emailForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const formData = new FormData(emailForm);
      
      try {
        // Enviar el formulario a Formspree
        await fetch(emailForm.action, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });
        
        // Ocultar el formulario
        emailForm.classList.add('hidden');
        
        // Mostrar el mensaje de agradecimiento
        setTimeout(() => {
          thankYouMessage.classList.add('show');
        }, 200);
        
      } catch (error) {
        console.error('Error:', error);
        // Aún así mostrar el mensaje de agradecimiento
        emailForm.classList.add('hidden');
        setTimeout(() => {
          thankYouMessage.classList.add('show');
        }, 200);
      }
    });
  }
});
