export const aboutButton = document.querySelector(".about-button-js");
export const creditsButton = document.querySelector(".credits-button-js");
export const welcomeModal = document.querySelector(".welcome-modal-js");
export const aboutModal = document.querySelector(".about-modal-js");
export const creditsModal = document.querySelector(".credits-modal-js");
export const closeAboutModal = document.querySelector(".close-about-js");
export const closeCreditsModal = document.querySelector(".close-credits-js");
export const closeWelcomeModal = document.querySelector(".close-welcome-js");

export let currentSoundPlayed = 1;

let setDefaultVolume = null;

export const menuCurrentSoundPlayed = (newValue) => {
  currentSoundPlayed = newValue;
};

/**
 * MENU HANDLER
 */

export const menuHandler = (isMuted, setDefaultVolumeFn, callback) => {
  setDefaultVolume = setDefaultVolumeFn;

  if (creditsButton) {
    creditsButton.addEventListener("click", () => {
      openCreditsModalEvent(isMuted, callback);
    });
  }

  if (aboutButton) {
    aboutButton.addEventListener("click", () => {
      openAboutModalEvent(isMuted, callback);
    });
  }

  if (closeWelcomeModal) {
    closeWelcomeModal.addEventListener("click", () => {
      callback(true);
      closeWelcomeModalEvent(callback);
    });
  }

  if (closeAboutModal) {
    closeAboutModal.addEventListener("click", () => {
      closeAboutModalEvent(isMuted, callback);
    });
  }

  if (closeCreditsModal) {
    closeCreditsModal.addEventListener("click", () => {
      closeCreditsModalEvent(isMuted, callback);
    });
  }
};

// Function open/close modal

export function openAboutModalEvent(isMuted, callback) {
  callback(false);
  if (!isMuted) setDefaultVolume(0.2, currentSoundPlayed);
  aboutModal.style.zIndex = 2;
  aboutModal.classList.add("openModal");
}

export function openCreditsModalEvent(isMuted, callback) {
  callback(false);
  if (!isMuted) setDefaultVolume(0.2, currentSoundPlayed);
  creditsModal.style.zIndex = 2;
  creditsModal.classList.add("openModal");
}

export function closeCreditsModalEvent(isMuted, callback) {
  callback(true);
  if (!isMuted) setDefaultVolume(0.5, currentSoundPlayed);
  creditsModal.style.zIndex = -10;
  creditsModal.classList.remove("openModal");
  creditsModal.classList.add("closeModal");
}

export function closeWelcomeModalEvent(callback) {
  callback(true);
  welcomeModal.style.zIndex = -10;
  welcomeModal.classList.remove("openModal");
  welcomeModal.classList.add("closeModal");
}

export function closeAboutModalEvent(isMuted, callback) {
  callback(true);
  if (!isMuted) setDefaultVolume(0.5, currentSoundPlayed);
  aboutModal.style.zIndex = -10;
  aboutModal.classList.remove("openModal");
  aboutModal.classList.add("closeModal");
}
