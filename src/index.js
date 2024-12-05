import "./style/main.styl";
import * as THREE from "three";
import { TweenLite, TimelineMax } from "gsap/all";
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
 * Resize
 */
window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
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

//cameraFunction Zoom on instrument
function instrumentZoom(posX, posY) {
  setTimeout(() => {
    isZooming = false;
  }, 1000);
  TweenLite.to(boxContent.position, 1, {
    x: boxContent.position.x + posX,
    y: boxContent.position.y + posY,
    z: camera.position.z - 1.6,
    ease: "Power3.easeInOut",
  });
  hasPlayedZoomAnimation = true;
  isZooming = true;
  if (!isMuted) setDefaultVolume(0.1, currentSoundPlayed);
}

function originalZoom(posX, posY, posZ) {
  setTimeout(() => {
    isZooming = false;
  }, 1000);
  TweenLite.to(boxContent.position, 1, {
    x: boxContent.position.x + posX,
    y: boxContent.position.y + posY,
    z: camera.position.z + posZ,

    ease: "Power3.easeInOut",
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
    instrumentZoom(1.25, 1.25);
    if (!isMuted) {
      if (currentSoundPlayed == 1) {
        pianoAudioInstance.volume = 1;
      } else if (currentSoundPlayed == 2) {
        pianoAudio2Instance.volume = 1;
      }
    }
  } else if (hoverPiano && hasPlayedZoomAnimation === true) {
    originalZoom(-1.25, -1.25, -6);
  }
});

//GUITAR ZOOM
let hoverGuitar = false;
document.addEventListener("click", () => {
  if (isZooming) return;
  if (hoverGuitar && hasPlayedZoomAnimation === false) {
    instrumentZoom(-1.25, 1.25);
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
    originalZoom(1.25, -1.25, -6);
  }
});

//DRUMS ZOOM
let hoverDrums = false;
document.addEventListener("click", () => {
  if (isZooming) return;
  if (hoverDrums && hasPlayedZoomAnimation === false) {
    instrumentZoom(-1.25, -1.25);
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
    originalZoom(1.25, 1.25, -6);
  }
});

//BASS ZOOM
let hoverBass = false;
document.addEventListener("click", () => {
  if (isZooming) return;
  if (hoverBass && hasPlayedZoomAnimation === false) {
    instrumentZoom(1.25, -1.25);
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
    originalZoom(-1.25, 1.25, -6);
  }
});

/**
 * Float box
 */

const animation = new TimelineMax({
  yoyo: true,
  repeat: -1,
});
animation
  .from(boxContent.position, 1, {
    y: boxContent.position.y + 0.03,
    ease: "linear",
  })
  .to(boxContent.position, 1, {
    y: boxContent.position.y - 0.03,
    ease: "linear",
  })
  .to(boxContent.position, 1, {
    y: boxContent.position.y + 0.03,
    ease: "linear",
  });

/**
 * Loop
 */
const raycaster = new THREE.Raycaster();

const loop = () => {
  window.requestAnimationFrame(loop);

  //Add text
  if (boxContent.position.z.toFixed(1) == 4.4) {
    box.group.add(box.pianoText);
    animation.pause();
  } else {
    box.group.remove(box.pianoText);
    animation.resume();
  }
  if (boxContent.position.z.toFixed(1) == 4.4) {
    box4.group.add(box.bassText);
    animation.pause();
  } else {
    box4.group.remove(box.bassText);
    animation.resume();
  }
  if (boxContent.position.z.toFixed(1) == 4.4) {
    box3.group.add(box.drumsText);
    animation.pause();
  } else {
    box3.group.remove(box.drumsText);
    animation.resume();
  }
  if (boxContent.position.z.toFixed(1) == 4.4) {
    box2.group.add(box.guitarText);
    animation.pause();
  } else {
    box2.group.remove(box.guitarText);
    animation.resume();
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
