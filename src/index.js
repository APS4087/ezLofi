import "./style/main.styl";
import * as THREE from "three";
import { TweenLite } from "gsap/all";
// Instruments
import Piano from "./javascript/Piano.js";
import Guitar from "./javascript/Guitar.js";
import Drums from "./javascript/Drums.js";
import Bass from "./javascript/Bass.js";
// Box
import Box from "./javascript/box.js";
// Start
import startWebsite from "./javascript/Start.js";
// Sounds
import {
  setDefaultVolume,
  soundHandler,
  playSound1,
  isMuted,
  currentSoundPlayed,
  pianoAudioInstance,
  guitarAudioInstance,
  bassAudioInstance,
  drumsAudioInstance,
  drumsKickAudioInstance,
  drumsPercAudioInstance,
  guitarAudio2Instance,
  pianoAudio2Instance,
  bassAudio2Instance,
  drumsAudio2Instance,
  guitarAudio3Instance,
  bassAudio3Instance,
  drumsAudio3Instance,
  drumsKickAudio3Instance,
} from "./javascript/Sounds";
// Menu handler
import { menuHandler, menuCurrentSoundPlayed } from "./javascript/Menu";

// PRELOADER
document.addEventListener("DOMContentLoaded", () => {
  let preloaderHeight = document.querySelector(".preloader-container");
  let preloaderHeading = document.querySelector(".loading-heading");
  let count = document.querySelector(".count");
  let num = 0;

  let preloading = setInterval(() => {
    if (num < 100) {
      preloaderHeading.style.transform = `translateY(${0}%)`;
      preloaderHeading.style.transform = `skewY(${0}%)`;
      preloaderHeading.style.transition = "all ease 0.25s"; // Adjusted transition timing
      num++;
      document.documentElement.style.setProperty("--preloader", num + "%");
      count.textContent = num + "%";
      count.style.transition = "all ease 0.25s"; // Adjusted transition timing
    } else {
      clearInterval(preloading);
    }
  }, 25);

  window.addEventListener("load", () => {
    setTimeout(() => {
      preloaderHeading.style.transform = `translateY(${-100}%)`;
      preloaderHeading.style.transition = "all ease 1s";
      preloaderHeight.style.height = "0";
      preloaderHeight.style.transition = "all 2s cubic-bezier(1,0,0,1)";
      preloaderHeight.style.transitionDelay = "0.8s";
      count.style.opacity = "0";
      count.style.transition = "all ease 1s";
    }, 3000);
  });
});

let hasStarted = false;

/**
 * Sizes
 */
const sizes = {};
sizes.width = window.innerWidth;
sizes.height = window.innerHeight;

/**
 * Cursor
 */
const cursor = {};
cursor.x = 0;
cursor.y = 0;

window.addEventListener("mousemove", (_event) => {
  cursor.x = _event.clientX / sizes.width - 0.5;
  cursor.y = _event.clientY / sizes.height - 0.5;
});

/**
 * Scene
 */
const scene = new THREE.Scene();

/**
 * Lights
 */

const ambientlight = new THREE.AmbientLight(0xffffff, 0.4); // soft white light
ambientlight.castShadow = true;
scene.add(ambientlight);

// Box Piano Light
const pianoLight = new THREE.PointLight(0xffa2fb, 1.2, 3);
pianoLight.position.set(0, 1.05, 0);
pianoLight.castShadow = true;

// Box Guitar Light
const guitarLight = new THREE.PointLight(0x6cccff, 1.2, 3);
guitarLight.position.set(0, 1.05, 0);

guitarLight.castShadow = true;

// Box Drums Light
const drumsLight = new THREE.PointLight(0x9890ff, 1.2, 3);
drumsLight.position.set(0, 1.05, 0);
drumsLight.castShadow = true;

// Box Bass Light
const bassLight = new THREE.PointLight(0xffce80, 1.2, 3);
bassLight.position.set(0, 1.05, 0);
bassLight.castShadow = true;

/**
 * Objects
 */

const boxContent = new THREE.Group();

// EACH BOX x4
const box = new Box();
box.group.position.set(0.05, -1, 0);
box.group.castShadow = true;

boxContent.add(box.group);
const box2 = new Box();
box2.group.position.set(2.55, -1, 0);
box2.group.castShadow = true;
boxContent.add(box2.group);
const box3 = new Box();
box3.group.position.set(2.55, 1.45, 0);
box3.group.castShadow = true;
boxContent.add(box3.group);
const box4 = new Box();
box4.group.position.set(0.05, 1.45, 0);
box4.group.castShadow = true;
boxContent.add(box4.group);

boxContent.position.set(-1.25, -1.25, 0);

scene.add(boxContent);

//  INSTRUMENTS INSIDE BOX

const piano = new Piano();
box.group.add(piano.group);
const guitar = new Guitar();
box4.group.add(guitar.group);
const drums = new Drums();
box3.group.add(drums.group);
const bass = new Bass();
box2.group.add(bass.group);

// ADD LIGHT
box.group.add(pianoLight);
box2.group.add(bassLight);
box3.group.add(drumsLight);
box4.group.add(guitarLight);

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  20
);
camera.position.z = 6;
scene.add(camera);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  alpha: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearAlpha(0);
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.gammaFactor = 2.2;

const canvasContainer = document.querySelector(".canvas-js");
canvasContainer.appendChild(renderer.domElement);

/**
 * Adjust Sizes
 */
const adjustSizes = () => {
  if (sizes.width <= 768) {
    box.group.scale.set(0.7, 0.7, 0.7);
    box2.group.scale.set(0.7, 0.7, 0.7);
    box3.group.scale.set(0.7, 0.7, 0.7);
    box4.group.scale.set(0.7, 0.7, 0.7);

    // Adjust positions for a bit more gap
    box.group.position.set(0.05, -0.7, 0);
    box2.group.position.set(1.75, -0.7, 0);
    box3.group.position.set(1.75, 1.15, 0);
    box4.group.position.set(0.05, 1.15, 0);

    boxContent.position.set(-0.9, -0.9, 0);
  } else {
    box.group.scale.set(1.1, 1.1, 1.1);
    box2.group.scale.set(1.1, 1.1, 1.1);
    box3.group.scale.set(1.1, 1.1, 1.1);
    box4.group.scale.set(1.1, 1.1, 1.1);

    // Reset positions for larger gap
    box.group.position.set(0.05, -1.1, 0);
    box2.group.position.set(2.65, -1.1, 0);
    box3.group.position.set(2.65, 1.55, 0);
    box4.group.position.set(0.05, 1.55, 0);

    boxContent.position.set(-1.3, -1.3, 0);
  }
};

// Initial size adjustment
adjustSizes();

/**
 * Resize
 */
window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);

  // Adjust sizes for mobile devices
  adjustSizes();
});

/**
 * HANDLE SOUND
 */
soundHandler(
  box,
  (newSoundPlayed) => {
    menuCurrentSoundPlayed(newSoundPlayed);
  },
  (newValue) => {
    hasStarted = newValue;
  }
);

/**
 * START
 */
const start = () => {
  playSound1();
};

startWebsite(start);

/**
 * Click On Instruments
 */
let hasPlayedZoomAnimation = false;
let isZooming = false;

// Define zoom distances and positions for mobile devices
const mobileZoomDistance = 4.2;
const mobileZoomPositions = {
  piano: { x: 0.95, y: 0.8 },
  guitar: { x: -0.8, y: 0.8 },
  drums: { x: -0.8, y: -0.8 },
  bass: { x: 0.8, y: -0.8 },
};

// Function to check if the device is mobile
const isMobile = () => sizes.width <= 768;

let initialPosition = { x: 0, y: 0, z: 0 };

//cameraFunction Zoom on instrument
function instrumentZoom(posX, posY) {
  const zoomDistance = isMobile() ? mobileZoomDistance : 4.4;
  initialPosition = {
    x: boxContent.position.x,
    y: boxContent.position.y,
    z: boxContent.position.z,
  };
  console.log("Initial Position:", initialPosition);

  setTimeout(() => {
    isZooming = false;
  }, 1000);

  TweenLite.to(boxContent.position, 1, {
    x: boxContent.position.x + posX,
    y: boxContent.position.y + posY,
    z: boxContent.position.z + zoomDistance,
    ease: "Power3.easeInOut",
    onComplete: () => {
      console.log("Zoomed In Position:", {
        x: boxContent.position.x,
        y: boxContent.position.y,
        z: boxContent.position.z,
      });
      // Log position after a short delay to catch any unexpected changes
      setTimeout(() => {
        console.log("Position shortly after zoom in:", {
          x: boxContent.position.x,
          y: boxContent.position.y,
          z: boxContent.position.z,
        });
      }, 500);
    },
  });
  hasPlayedZoomAnimation = true;
  isZooming = true;
  if (!isMuted) setDefaultVolume(0.1, currentSoundPlayed);
}

function originalZoom() {
  setTimeout(() => {
    isZooming = false;
  }, 1000);

  console.log("Returning to Initial Position:", initialPosition);
  TweenLite.to(boxContent.position, 1, {
    x: initialPosition.x,
    y: initialPosition.y,
    z: initialPosition.z,
    ease: "Power3.easeInOut",
    onComplete: () => {
      console.log("Zoomed Out Position:", {
        x: boxContent.position.x,
        y: boxContent.position.y,
        z: boxContent.position.z,
      });
      // Log position after a short delay to catch any unexpected changes
      setTimeout(() => {
        console.log("Position shortly after zoom out:", {
          x: boxContent.position.x,
          y: boxContent.position.y,
          z: boxContent.position.z,
        });
      }, 500);
    },
  });

  hasPlayedZoomAnimation = false;
  isZooming = true;
  if (!isMuted) setDefaultVolume(0.5, currentSoundPlayed);
}

//PIANO ZOOM
let hoverPiano = false;
document.addEventListener("click", () => {
  if (isZooming) return;
  if (hoverPiano && hasPlayedZoomAnimation === false) {
    const { x, y } = isMobile()
      ? mobileZoomPositions.piano
      : { x: 1.6, y: 1.25 };
    instrumentZoom(x, y);
    if (!isMuted) {
      if (currentSoundPlayed == 1) {
        pianoAudioInstance.volume = 1;
      } else if (currentSoundPlayed == 2) {
        pianoAudio2Instance.volume = 1;
      }
    }
  } else if (hoverPiano && hasPlayedZoomAnimation === true) {
    originalZoom();
  }
});

//GUITAR ZOOM
let hoverGuitar = false;
document.addEventListener("click", () => {
  if (isZooming) return;
  if (hoverGuitar && hasPlayedZoomAnimation === false) {
    const { x, y } = isMobile()
      ? mobileZoomPositions.guitar
      : { x: -1, y: 1.25 };
    instrumentZoom(x, y);
    if (!isMuted) {
      if (currentSoundPlayed == 1) {
        guitarAudioInstance.volume = 1;
      } else if (currentSoundPlayed == 2) {
        guitarAudio2Instance.volume = 1;
        pianoAudio2Instance.volume = 1;
      } else {
        guitarAudio3Instance.volume = 1;
      }
    }
  } else if (hoverGuitar && hasPlayedZoomAnimation === true) {
    originalZoom();
  }
});

//DRUMS ZOOM
let hoverDrums = false;
document.addEventListener("click", () => {
  if (isZooming) return;
  if (hoverDrums && hasPlayedZoomAnimation === false) {
    const { x, y } = isMobile()
      ? mobileZoomPositions.drums
      : { x: -1, y: -1.5 };
    instrumentZoom(x, y);
    if (!isMuted) {
      if (currentSoundPlayed == 1) {
        drumsAudioInstance.volume = 1;
        drumsKickAudioInstance.volume = 1;
        drumsPercAudioInstance.volume = 1;
      } else if (currentSoundPlayed == 2) {
        drumsAudio2Instance.volume = 1;
      } else {
        drumsAudio3Instance.volume = 1;
        drumsKickAudio3Instance.volume = 1;
      }
    }
  } else if (hoverDrums && hasPlayedZoomAnimation === true) {
    originalZoom();
  }
});

//BASS ZOOM
let hoverBass = false;
document.addEventListener("click", () => {
  if (isZooming) return;
  if (hoverBass && hasPlayedZoomAnimation === false) {
    const { x, y } = isMobile()
      ? mobileZoomPositions.bass
      : { x: 1.6, y: -1.45 };
    instrumentZoom(x, y);
    if (!isMuted) {
      if (currentSoundPlayed == 1) {
        bassAudioInstance.volume = 1;
      } else if (currentSoundPlayed == 2) {
        bassAudio2Instance.volume = 1;
      } else {
        bassAudio3Instance.volume = 1;
      }
    }
  } else if (hoverBass && hasPlayedZoomAnimation === true) {
    originalZoom();
  }
});

/**
 * Loop
 */
const raycaster = new THREE.Raycaster();

const loop = () => {
  window.requestAnimationFrame(loop);

  // // Log the current position of boxContent
  // console.log("Current Position in Loop:", {
  //   x: boxContent.position.x,
  //   y: boxContent.position.y,
  //   z: boxContent.position.z,
  // });

  //Add text
  if (boxContent.position.z.toFixed(1) == 4.4) {
    box.group.add(box.pianoText);
  } else {
    box.group.remove(box.pianoText);
  }
  if (boxContent.position.z.toFixed(1) == 4.4) {
    box4.group.add(box.bassText);
  } else {
    box4.group.remove(box.bassText);
  }
  if (boxContent.position.z.toFixed(1) == 4.4) {
    box3.group.add(box.drumsText);
  } else {
    box3.group.remove(box.drumsText);
  }
  if (boxContent.position.z.toFixed(1) == 4.4) {
    box2.group.add(box.guitarText);
  } else {
    box2.group.remove(box.guitarText);
  }

  // Cursor raycasting
  const raycasterCursor = new THREE.Vector2(cursor.x * 2, -cursor.y * 2);
  raycaster.setFromCamera(raycasterCursor, camera);

  const intersectsBoxContent = raycaster.intersectObject(boxContent, true);
  hoverPiano = false;
  hoverGuitar = false;
  hoverDrums = false;
  hoverBass = false;
  if (intersectsBoxContent[0]) {
    //console.log(intersectsBoxContent[0].object.parent)
    if (intersectsBoxContent[0].object.parent === box.group && hasStarted) {
      hoverPiano = true;
    } else if (
      intersectsBoxContent[0].object.parent === box2.group &&
      hasStarted
    ) {
      hoverGuitar = true;
    } else if (
      intersectsBoxContent[0].object.parent === box3.group &&
      hasStarted
    ) {
      hoverDrums = true;
    } else if (
      intersectsBoxContent[0].object.parent === box4.group &&
      hasStarted
    ) {
      hoverBass = true;
    }
  }
  // Render
  renderer.render(scene, camera);
};

loop();

/**
 * Menu handling
 */

menuHandler(isMuted, setDefaultVolume, (newValue) => {
  hasStarted = newValue;
});

/**
 * Parallax box
 */

window.addEventListener("mousemove", (_event) => {
  let multipleRatio = 0.1;
  if (boxContent.position.z.toFixed(1) == 4.4) multipleRatio = 0.05;
  const ratioX = _event.clientX / sizes.width - 0.5;
  const ratioY = _event.clientY / sizes.height - 0.5;
  const translateX = -ratioX * multipleRatio;
  const translateY = -ratioY * multipleRatio;
  camera.position.x = translateX;
  camera.position.y = translateY;
});
