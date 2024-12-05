import * as THREE from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js"

export default class Bass {
  constructor() {
    this.group = new THREE.Group()

    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath("/draco/")

    const gltfLoader = new GLTFLoader()
    gltfLoader.setDRACOLoader(dracoLoader)

    gltfLoader.load("./models/bass/guitar.gltf", _gltf => {
      this.bass = _gltf.scene.children[0]
      this.bass.position.set(0, 0.55, 0)
      this.bass.scale.set(0.06, 0.06, 0.06)
      this.bass.rotateY(180)
      this.group.add(this.bass)
    })
  }
}
