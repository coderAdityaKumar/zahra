// =====================
// GLOBAL AUDIO MANAGER
// =====================
let currentAudio = null;
let currentButton = null;
let currentIndicator = null;

function scrollToEvidence() {
  document.getElementById('evidence').scrollIntoView({ behavior: 'smooth' });
}

function toggleAudio(audioId, button, indicatorId, songName) {
  const audio = document.getElementById(audioId);
  const indicator = document.getElementById(indicatorId);
  const globalIndicator = document.getElementById('globalPlayerIndicator');
  const globalSongName = document.getElementById('globalSongName');

  if (!audio || !button || !indicator) {
    console.warn('Audio elements not found:', audioId);
    return;
  }

  if (currentAudio === audio && !audio.paused) {
    audio.pause();
    button.classList.remove('playing');
    button.innerHTML = '▶ Play 🎵';
    indicator.classList.remove('active');
    currentAudio = null;
    currentButton = null;
    currentIndicator = null;
    globalIndicator.classList.remove('visible');
    return;
  }

  if (currentAudio && currentAudio !== audio) {
    currentAudio.pause();
    if (currentButton) {
      currentButton.classList.remove('playing');
      currentButton.innerHTML = '▶ Play 🎵';
    }
    if (currentIndicator) {
      currentIndicator.classList.remove('active');
    }
  }

  audio
    .play()
    .then(() => {
      button.classList.add('playing');
      button.innerHTML = '⏸ Pause 🎵';
      indicator.classList.add('active');
      currentAudio = audio;
      currentButton = button;
      currentIndicator = indicator;
      globalSongName.textContent = '🎵 ' + songName;
      globalIndicator.classList.add('visible');
    })
    .catch((err) => {
      console.log('Playback failed:', err);
      alert('Tap play again to start music 🎵');
    });

  audio.onended = () => {
    button.classList.remove('playing');
    button.innerHTML = '▶ Play 🎵';
    indicator.classList.remove('active');
    globalIndicator.classList.remove('visible');
    currentAudio = null;
  };

  audio.onpause = () => {
    if (currentAudio === audio) {
      button.classList.remove('playing');
      button.innerHTML = '▶ Play 🎵';
      indicator.classList.remove('active');
      globalIndicator.classList.remove('visible');
    }
  };
}

// =====================
// STARS BACKGROUND
// =====================
function createStars() {
  const starsContainer = document.getElementById('stars');
  if (!starsContainer) return;

  for (let i = 0; i < 45; i++) {
    let s = document.createElement('div');
    s.classList.add('star');
    let sz = Math.random() * 4 + 2;
    s.style.width = sz + 'px';
    s.style.height = sz + 'px';
    s.style.top = Math.random() * 100 + '%';
    s.style.left = Math.random() * 100 + '%';
    s.style.animationDelay = Math.random() * 8 + 's';
    starsContainer.appendChild(s);
  }
}

// =====================
// FLOATING HEARTS
// =====================
function createFloatingHeart() {
  if (document.hidden) return;
  let h = document.createElement('div');
  h.classList.add('floating-heart');
  let emojis = ['🌸', '✨', '💖', '🌙', '🦋'];
  h.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
  h.style.left = Math.random() * 100 + 'vw';
  h.style.bottom = '-50px';
  h.style.fontSize = 16 + Math.random() * 18 + 'px';
  document.body.appendChild(h);
  setTimeout(() => h.remove(), 12000);
}

// =====================
// CLICK SPARKLES
// =====================
document.addEventListener('click', function (e) {
  if (e.target.classList && e.target.classList.contains('play-btn')) return;
  if (e.target.closest('#proposalOverlay')) return;

  let sp = document.createElement('div');
  sp.classList.add('sparkle');
  sp.style.left = e.clientX + 'px';
  sp.style.top = e.clientY + 'px';
  let spark = ['✨', '💖', '🌟', '💕'];
  sp.innerHTML = spark[Math.floor(Math.random() * spark.length)];
  document.body.appendChild(sp);
  setTimeout(() => sp.remove(), 800);
});

// =====================
// EID OVERLAY
// =====================
function setupEidOverlay() {
  const eidTrigger = document.getElementById('eidTrigger');
  const eidOverlay = document.getElementById('eidOverlay');
  const closeEid = document.getElementById('closeEid');

  if (!eidTrigger || !eidOverlay || !closeEid) return;

  eidTrigger.addEventListener('click', () => {
    if (eidOverlay.classList.contains('active')) return;
    eidOverlay.classList.add('active');
    const burstContainer = document.getElementById('eidBurstContainer');
    if (burstContainer) {
      for (let i = 0; i < 35; i++) {
        let it = document.createElement('div');
        it.classList.add('eidBurstItem');
        it.innerHTML = ['🍢', '🍲', '❤️', '🌙', '✨', '🐐'][
          Math.floor(Math.random() * 6)
        ];
        it.style.left = '50%';
        it.style.top = '50%';
        it.style.setProperty('--x', Math.random() * 700 - 350 + 'px');
        it.style.setProperty('--y', Math.random() * 500 - 250 + 'px');
        burstContainer.appendChild(it);
        setTimeout(() => it.remove(), 2800);
      }
    }
  });

  closeEid.addEventListener('click', () => {
    eidOverlay.classList.remove('active');
  });
}

// =====================
// PROPOSAL EASTER EGG
// =====================

// Configuration - UPDATE THESE WITH YOUR PHOTOS
const proposalConfig = {
  photos: [
    {
      src: 'photo1.png',
      caption: 'The smile that stole my heart 💖',
    },
    {
      src: 'photo2.png',
      caption: 'The queen of late replies 😭',
    },
    {
      src: 'photo3.png',
      caption: 'Your eyes speak the language of love 🌙',
    },
    {
      src: 'photo4.png',
      caption: 'Playlist expert 🎵',
    },
    {
      src: 'photo5.png',
      caption: 'Raraaaaa 🌙',
    },
  ],
  message: `Raraaaaa 🌙✨

It's funny how a random anonymous chat became something special to me.

From playlists 🎵
to little little Hindi 😂
to all our random conversations ✨

You've become one of my favorite people.

I really like talking to you, and I'd like to know where this story can go 🌸

So I have one question...

Will you be my girlfriend? 💖

(No pressure 😭😂)

But if you say yes, I promise more playlists, more Hindi lessons, and many more "Raraaaaa" messages 🌙✨

`,
};

let currentPhotoIndex = 0;
let moonClickCount = 0;
let noBtnClickCount = 0;

function setupProposalTrigger() {
  const proposalTrigger = document.getElementById('proposalTrigger');
  const clickCounter = document.getElementById('clickCounter');

  if (!proposalTrigger || !clickCounter) return;

  // Reset counter display
  clickCounter.style.display = 'none';

  proposalTrigger.addEventListener('click', (e) => {
    e.stopPropagation();
    moonClickCount++;

    if (moonClickCount === 1) {
      clickCounter.style.display = 'flex';
      clickCounter.textContent = '2';
      createHint('The moon has secrets... tap 2 more times 🌙✨');
    } else if (moonClickCount === 2) {
      clickCounter.textContent = '1';
      createHint('One more tap... something magical awaits 💫');
    } else if (moonClickCount >= 3) {
      moonClickCount = 0;
      clickCounter.style.display = 'none';
      openProposal();
    }
  });

  // Reset counter after 5 seconds of no clicks
  proposalTrigger.addEventListener('mouseleave', () => {
    setTimeout(() => {
      if (moonClickCount < 3) {
        moonClickCount = 0;
        clickCounter.style.display = 'none';
      }
    }, 5000);
  });
}

function createHint(text) {
  // Remove any existing hints
  document.querySelectorAll('.hint-message').forEach((el) => el.remove());

  const hint = document.createElement('div');
  hint.className = 'hint-message';
  hint.style.cssText = `
    position: fixed;
    top: 15%;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(255, 255, 255, 0.95);
    padding: 15px 25px;
    border-radius: 25px;
    color: #ff4d88;
    font-weight: 600;
    z-index: 99999;
    box-shadow: 0 10px 30px rgba(255, 140, 180, 0.4);
    animation: float 3s infinite ease-in-out;
    font-family: 'Quicksand', sans-serif;
    text-align: center;
    max-width: 90vw;
  `;
  hint.textContent = text;
  document.body.appendChild(hint);
  setTimeout(() => hint.remove(), 3000);
}

// Open Proposal
function openProposal() {
  const overlay = document.getElementById('proposalOverlay');
  if (!overlay) return;

  overlay.classList.add('active');
  currentPhotoIndex = 0;
  updatePhoto();
  startTypingAnimation();
  createProposalParticles();
  noBtnClickCount = 0;
  resetNoButton();

  // Start proposal music
  const proposalMusic = document.getElementById('proposalMusic');
  if (proposalMusic) {
    proposalMusic.volume = 0.5;
    proposalMusic.currentTime = 0;
    proposalMusic.play().catch((err) => {
      console.log('Proposal music autoplay blocked:', err);
    });
  }

  // Scroll to top of proposal
  overlay.scrollTop = 0;
}

// Close Proposal
function setupProposalClose() {
  const closeBtn = document.getElementById('closeProposal');
  if (!closeBtn) return;

  closeBtn.addEventListener('click', () => {
    document.getElementById('proposalOverlay').classList.remove('active');
    const proposalMusic = document.getElementById('proposalMusic');
    if (proposalMusic) {
      proposalMusic.pause();
      proposalMusic.currentTime = 0;
    }
  });
}

// Photo Navigation
function changePhoto(direction) {
  if (!proposalConfig.photos || proposalConfig.photos.length === 0) return;

  currentPhotoIndex += direction;
  if (currentPhotoIndex < 0)
    currentPhotoIndex = proposalConfig.photos.length - 1;
  if (currentPhotoIndex >= proposalConfig.photos.length) currentPhotoIndex = 0;
  updatePhoto();
}

function updatePhoto() {
  const photo = document.getElementById('currentPhoto');
  const caption = document.getElementById('photoCaption');
  const counter = document.getElementById('photoCounter');

  if (!photo || !caption || !counter) return;

  if (proposalConfig.photos && proposalConfig.photos.length > 0) {
    photo.src = proposalConfig.photos[currentPhotoIndex].src;
    caption.textContent = proposalConfig.photos[currentPhotoIndex].caption;
    counter.textContent = `${currentPhotoIndex + 1}/${proposalConfig.photos.length}`;

    // Fallback for missing photos
    photo.onerror = function () {
      this.src = 'https://via.placeholder.com/200x200/ffb6c1/ffffff?text=💖';
    };
  }
}

// Typing Animation
function startTypingAnimation() {
  const textElement = document.getElementById('typingText');
  if (!textElement) return;

  const message = proposalConfig.message;
  let charIndex = 0;

  textElement.textContent = '';

  function type() {
    if (charIndex < message.length) {
      textElement.textContent += message.charAt(charIndex);
      charIndex++;
      setTimeout(type, 35);
    }
  }

  type();
}

// Create floating particles in proposal
function createProposalParticles() {
  const container = document.getElementById('proposalParticles');
  if (!container) return;

  container.innerHTML = '';
  const emojis = ['💖', '🌸', '✨', '🌙', '💕', '🦋', '💗', '🎀'];

  for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div');
    particle.classList.add('proposal-particle');
    particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    particle.style.left = Math.random() * 90 + '%';
    particle.style.top = Math.random() * 90 + '%';
    particle.style.animationDelay = Math.random() * 4 + 's';
    particle.style.animationDuration = 3 + Math.random() * 5 + 's';
    particle.style.fontSize = 15 + Math.random() * 25 + 'px';
    container.appendChild(particle);
  }
}

// Yes Button - Celebration!
function setupYesButton() {
  const yesBtn = document.getElementById('yesBtn');
  if (!yesBtn) return;

  yesBtn.addEventListener('click', () => {
    document.getElementById('proposalOverlay').classList.remove('active');
    const proposalMusic = document.getElementById('proposalMusic');
    if (proposalMusic) {
      proposalMusic.pause();
      proposalMusic.currentTime = 0;
    }
    startCelebration();
  });
}

// No Button - Playful response
function resetNoButton() {
  const noBtn = document.getElementById('noBtn');
  if (!noBtn) return;

  noBtn.style.display = '';
  noBtn.style.position = '';
  noBtn.style.left = '';
  noBtn.style.top = '';
  noBtn.style.transform = '';
  noBtn.innerHTML =
    '<span class="btn-content"><span class="btn-emoji">🤔</span>Let me think...<span class="btn-emoji">🤔</span></span>';

  // Remove any extra messages
  const extraMessages = document.querySelectorAll(
    '.proposal-buttons div:not(.proposal-btn)',
  );
  extraMessages.forEach((el) => el.remove());
}

function setupNoButton() {
  const noBtn = document.getElementById('noBtn');
  if (!noBtn) return;

  noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    noBtnClickCount++;

    if (noBtnClickCount === 1) {
      noBtn.innerHTML =
        '<span class="btn-content"><span class="btn-emoji">🥺</span>Are you sure?<span class="btn-emoji">🥺</span></span>';

      noBtn.style.transform = 'scale(0.95)';
      createFloatingEmojis('🥺💖');
    } else if (noBtnClickCount === 2) {
      noBtn.innerHTML =
        '<span class="btn-content"><span class="btn-emoji">😭</span>Raraaaaa...<span class="btn-emoji">😭</span></span>';

      noBtn.style.transform = 'scale(0.9)';
      createFloatingEmojis('😭🌸');
    } else if (noBtnClickCount === 3) {
      noBtn.innerHTML =
        '<span class="btn-content"><span class="btn-emoji">😂</span>No<span class="btn-emoji">😂</span></span>';

      noBtn.style.position = 'relative';
      noBtn.style.left = Math.random() * 60 - 30 + 'px';
      noBtn.style.top = Math.random() * 30 - 15 + 'px';

      createFloatingEmojis('😂🌙✨');
    } else if (noBtnClickCount >= 4) {
      showNoOverlay();
    }
  });
}

function createFloatingEmojis(emojiString) {
  const emojis = emojiString.split('');
  for (let i = 0; i < 10; i++) {
    const emoji = document.createElement('div');
    emoji.style.cssText = `
      position: fixed;
      pointer-events: none;
      z-index: 99999;
      font-size: ${20 + Math.random() * 30}px;
      animation: riseUp 3s ease-out forwards;
      top: ${30 + Math.random() * 40}%;
      left: ${20 + Math.random() * 60}%;
    `;
    emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    document.body.appendChild(emoji);
    setTimeout(() => emoji.remove(), 3000);
  }
}

function showNoOverlay() {
  const overlay = document.getElementById('noOverlay');

  if (!overlay) return;

  overlay.classList.add('active');
}

function closeNoOverlay() {
  document.getElementById('noOverlay').classList.remove('active');

  const quoteBox = document.querySelector('.quote-box');

  if (quoteBox) {
    quoteBox.scrollIntoView({
      behavior: 'smooth',
    });
  }
}

// Celebration
function startCelebration() {
  const overlay = document.getElementById('celebrationOverlay');
  if (!overlay) return;

  overlay.classList.add('active');
  createFireworks();

  // Play celebration music
  const proposalMusic = document.getElementById('proposalMusic');
  if (proposalMusic) {
    proposalMusic.volume = 0.7;
    proposalMusic.currentTime = 0;
    proposalMusic.play().catch(() => {});
  }
}

function createFireworks() {
  const container = document.getElementById('celebrationFireworks');
  if (!container) return;

  const emojis = ['🎉', '💖', '✨', '🎊', '💕', '🌟', '💑', '🎆', '💗', '🌸'];

  const interval = setInterval(() => {
    if (
      !document
        .getElementById('celebrationOverlay')
        .classList.contains('active')
    ) {
      clearInterval(interval);
      return;
    }

    const firework = document.createElement('div');
    firework.classList.add('firework-particle');
    firework.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    firework.style.left = Math.random() * 100 + '%';
    firework.style.animationDuration = 2 + Math.random() * 3 + 's';
    container.appendChild(firework);
    setTimeout(() => firework.remove(), 3000);
  }, 200);
}

function closeCelebration() {
  document.getElementById('celebrationOverlay').classList.remove('active');
  const proposalMusic = document.getElementById('proposalMusic');
  if (proposalMusic) {
    proposalMusic.pause();
    proposalMusic.currentTime = 0;
  }

  // Scroll to quote section
  const quoteBox = document.querySelector('.quote-box');
  if (quoteBox) {
    quoteBox.scrollIntoView({ behavior: 'smooth' });
  }
}

// =====================
// FIREBASE COUNTER (Compat version)
// =====================
function setupFirebaseCounter() {
  if (typeof firebase === 'undefined') {
    console.log('Firebase not loaded, skipping counter');
    return;
  }

  try {
    const firebaseConfig = {
      apiKey: 'AIzaSyCAIKO1XTLbjY2D25lyQ04tVBVPtTDWB6Y',
      authDomain: 'rara-website-counter.firebaseapp.com',
      projectId: 'rara-website-counter',
      storageBucket: 'rara-website-counter.firebasestorage.app',
      messagingSenderId: '1079308575342',
      appId: '1:1079308575342:web:14f2c05e7df13f5817fc7f',
      measurementId: 'G-FGH01WMQ7N',
    };

    firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore();
    const counterRef = db.collection('visits').doc('website');

    counterRef
      .set(
        { count: firebase.firestore.FieldValue.increment(1) },
        { merge: true },
      )
      .then(() => console.log('Visit counted!'))
      .catch((err) => console.log('Counter update skipped:', err));
  } catch (e) {
    console.log('Firebase setup error:', e);
  }
}

// =====================
// INITIALIZATION
// =====================
document.addEventListener('DOMContentLoaded', function () {
  console.log('💖 Website loaded with proposal easter egg! 🌙✨');
  console.log('💡 Hint: Click the moon 3 times in the hero section... 🌙');

  createStars();
  setupEidOverlay();
  setupProposalTrigger();
  setupProposalClose();
  setupYesButton();
  setupNoButton();
  setupFirebaseCounter();

  // Start floating hearts
  setInterval(createFloatingHeart, 1800);

  // Initial photo setup
  updatePhoto();
});
