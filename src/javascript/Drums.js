import * as THREE from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js"

export default class Drums {
  constructor() {
    this.group = new THREE.Group()

    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath("/draco/")

    const gltfLoader = new GLTFLoader()
    gltfLoader.setDRACOLoader(dracoLoader)

    gltfLoader.load("./models/drums/drums.gltf", _gltf => {
      this.drums = _gltf.scene.children[0]
      this.drums.position.set(-0.5, -3.15, 1.6)
      this.drums.scale.set(2.3, 2.3, 2.3)
      this.group.add(this.drums)
    })
  }
}
