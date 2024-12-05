import * as THREE from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js"

export default class Piano {
  constructor() {
    this.group = new THREE.Group()

    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath("/draco/")

    const gltfLoader = new GLTFLoader()
    gltfLoader.setDRACOLoader(dracoLoader)

    gltfLoader.load("./models/piano/piano.gltf", _gltf => {
      this.piano = _gltf.scene.children[0]
      this.piano.position.set(0, 0.05, 0)
      this.piano.scale.set(0.1, 0.1, 0.1)
      this.piano.rotateY(180)
      this.group.add(this.piano)
    })
  }
}
