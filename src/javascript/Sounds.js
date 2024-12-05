import { TweenLite } from "gsap/all";

/**
 * Sounds1
 */

// PIANO
import pianoAudio from "../audio/sound1/piano.wav";
// GUITAR
import guitarAudio from "../audio/sound1/guitar.wav";
// BASS
import bassAudio from "../audio/sound1/bass.wav";
// DRUMS
import drumsAudio from "../audio/sound1/drums.wav";
import drumsPercAudio from "../audio/sound1/drumsPerc.wav";
import drumsKickAudio from "../audio/sound1/drumsKick.wav";

/**
 * Sounds2
 */
//PIANO
import pianoAudio2 from "../audio/sound2/piano.wav";
// GUITAR
import guitarAudio2 from "../audio/sound2/mainChords.wav";
// BASS
import bassAudio2 from "../audio/sound2/bass.wav";
// DRUMS
import drumsAudio2 from "../audio/sound2/drums.wav";

/**
 * Sounds3
 */

// GUITAR
import guitarAudio3 from "../audio/sound3/guitar.wav";
// BASS
import bassAudio3 from "../audio/sound3/bass.wav";
// DRUMS
import drumsAudio3 from "../audio/sound3/drums.wav";
import drumsKickAudio3 from "../audio/sound3/drumsKick.wav";

/**
 * AUDIO VARIABLES
 */

//Sound 1
export const pianoAudioInstance = new Audio();
pianoAudioInstance.src = pianoAudio;
pianoAudioInstance.loop = true;

export const guitarAudioInstance = new Audio();
guitarAudioInstance.src = guitarAudio;
guitarAudioInstance.loop = true;

export const bassAudioInstance = new Audio();
bassAudioInstance.src = bassAudio;
bassAudioInstance.loop = true;

export const drumsAudioInstance = new Audio();
drumsAudioInstance.src = drumsAudio;
drumsAudioInstance.loop = true;

export const drumsKickAudioInstance = new Audio();
drumsKickAudioInstance.src = drumsKickAudio;
drumsKickAudioInstance.loop = true;

export const drumsPercAudioInstance = new Audio();
drumsPercAudioInstance.src = drumsPercAudio;
drumsPercAudioInstance.loop = true;

//Sound 2

export const guitarAudio2Instance = new Audio();
guitarAudio2Instance.src = guitarAudio2;
guitarAudio2Instance.loop = true;
export const pianoAudio2Instance = new Audio();
pianoAudio2Instance.src = pianoAudio2;
pianoAudio2Instance.loop = true;

export const bassAudio2Instance = new Audio();
bassAudio2Instance.src = bassAudio2;
bassAudio2Instance.loop = true;

export const drumsAudio2Instance = new Audio();
drumsAudio2Instance.src = drumsAudio2;
drumsAudio2Instance.loop = true;

//Sound 3

export const guitarAudio3Instance = new Audio();
guitarAudio3Instance.src = guitarAudio3;
guitarAudio3Instance.loop = true;

export const bassAudio3Instance = new Audio();
bassAudio3Instance.src = bassAudio3;
bassAudio3Instance.loop = true;

export const drumsAudio3Instance = new Audio();
drumsAudio3Instance.src = drumsAudio3;
drumsAudio3Instance.loop = true;
export const drumsKickAudio3Instance = new Audio();
drumsKickAudio3Instance.src = drumsKickAudio3;
drumsKickAudio3Instance.loop = true;

export let currentSoundPlayed = 1;

export const setDefaultVolume = (volume, soundNumber = 1) => {
  if (soundNumber == 1) {
    //Sound 1
    drumsAudioInstance.volume = volume;
    drumsKickAudioInstance.volume = volume;
    drumsPercAudioInstance.volume = volume;
    pianoAudioInstance.volume = volume;
    guitarAudioInstance.volume = volume;
    bassAudioInstance.volume = volume;
  } else if (soundNumber == 2) {
    //Sound 2
    guitarAudio2Instance.volume = volume;
    pianoAudio2Instance.volume = volume;
    bassAudio2Instance.volume = volume;
    drumsAudio2Instance.volume = volume;
    pianoAudioInstance.volume = 0;
  } else {
    //Sound 3
    guitarAudio3Instance.volume = volume;
    bassAudio3Instance.volume = volume;
    drumsAudio3Instance.volume = volume;
    drumsKickAudio3Instance.volume = volume;
    pianoAudioInstance.volume = 0;
  }
};

export let isMuted = false;

/**
 * soundHandle
 */

export const soundHandler = (box, menuCurrentSoundPlayedCallback, callback) => {
  // MUTE/UNMUTE
  const muteSound = document.querySelector(".mute-js");
  const unmuteSound = document.querySelector(".unmute-js");

  muteSound.addEventListener("mouseover", () => {
    callback(false);
  });

  unmuteSound.addEventListener("mouseover", () => {
    callback(false);
  });

  muteSound.addEventListener("mouseleave", () => {
    callback(true);
  });

  unmuteSound.addEventListener("mouseleave", () => {
    callback(true);
  });

  muteSound.addEventListener("click", () => {
    isMuted = false;
    setDefaultVolume(1, currentSoundPlayed);
    muteSound.classList.add("hidden");
    unmuteSound.classList.remove("hidden");
  });

  unmuteSound.addEventListener("click", () => {
    isMuted = true;
    setDefaultVolume(0, currentSoundPlayed);
    unmuteSound.classList.add("hidden");
    muteSound.classList.remove("hidden");
  });

  // SOUND SELECTOR
  const sounds = document.querySelectorAll(".sound");

  sounds.forEach((_sound) => {
    _sound.addEventListener("click", () => {
      document.querySelector(".soundActive").classList.remove("soundActive");
      _sound.classList.add("soundActive");
      if (_sound.getAttribute("data-value") == "sound1" && !isMuted) {
        currentSoundPlayed = 1;
        stopAllSound();
        playSound1();
        originalSlide(box);
      } else if (_sound.getAttribute("data-value") == "sound2" && !isMuted) {
        currentSoundPlayed = 2;
        stopAllSound();
        playSound2();
        originalSlide(box);
        setDefaultVolume(1, currentSoundPlayed);
      } else if (!isMuted) {
        currentSoundPlayed = 3;
        setDefaultVolume(1, currentSoundPlayed);
        stopAllSound();
        playSound3();
        if (hasSlide === false) {
          boxSlide(box);
        }
      } else if (_sound.getAttribute("data-value") == "sound1" && isMuted) {
        currentSoundPlayed = 1;
        stopAllSound();
        playSound1();
        originalSlide(box);
        setDefaultVolume(0, currentSoundPlayed);
      } else if (_sound.getAttribute("data-value") == "sound2" && isMuted) {
        currentSoundPlayed = 2;
        stopAllSound();
        playSound2();
        originalSlide(box);
        setDefaultVolume(0, currentSoundPlayed);
      } else if (_sound.getAttribute("data-value") == "sound3" && isMuted) {
        currentSoundPlayed = 3;
        isMuted = true;
        stopAllSound();
        playSound3();
        setDefaultVolume(0, currentSoundPlayed);
        if (hasSlide === false) {
          boxSlide(box);
        }
      }
      menuCurrentSoundPlayedCallback(currentSoundPlayed);
    });
  });

  /**
   * Slide Box
   */
  let hasSlide = false;

  function originalSlide(box) {
    TweenLite.to(box.group.position, 1, {
      y: -1,
      ease: "Power3.easeInOut",
    });
    hasSlide = false;
  }

  function boxSlide(box) {
    TweenLite.to(box.group.position, 1, {
      y: -6.5,
      ease: "Power3.easeInOut",
    });
    hasSlide = true;
  }
};

/**
 * Sound Play/Pause
 */

export function stopAllSound() {
  guitarAudioInstance.pause();
  bassAudioInstance.pause();
  pianoAudioInstance.pause();
  drumsAudioInstance.pause();
  drumsPercAudioInstance.pause();
  drumsKickAudioInstance.pause();

  guitarAudio2Instance.pause();
  pianoAudio2Instance.pause();
  bassAudio2Instance.pause();
  drumsAudio2Instance.pause();

  guitarAudio3Instance.pause();
  bassAudio3Instance.pause();
  drumsAudio3Instance.pause();
  drumsKickAudio3Instance.pause();
}

export function playSound1() {
  guitarAudioInstance.play();
  bassAudioInstance.play();
  pianoAudioInstance.play();
  drumsAudioInstance.play();
  drumsPercAudioInstance.play();
  drumsKickAudioInstance.play();
  setDefaultVolume(0.5);
}
export function playSound2() {
  guitarAudio2Instance.play();
  pianoAudio2Instance.play();
  bassAudio2Instance.play();
  drumsAudio2Instance.play();
  //   box.group.add(pianoLight)
  setDefaultVolume(0.5);
}
export function playSound3() {
  guitarAudio3Instance.play();
  bassAudio3Instance.play();
  drumsAudio3Instance.play();
  drumsKickAudio3Instance.play();
  setDefaultVolume(0.5);
}
