import * as THREE from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js"

export default class Guitar {
  constructor() {
    this.group = new THREE.Group()

    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath("/draco/")

    const gltfLoader = new GLTFLoader()
    gltfLoader.setDRACOLoader(dracoLoader)

    gltfLoader.load("./models/guitar/Electric_Guitar_01.gltf", _gltf => {
      this.guitar = _gltf.scene.children[0]
      this.guitar.scale.set(0.06, 0.06, 0.06)
      this.guitar.position.set(0, 0.55, 0.08)
      this.guitar.rotateY(180)
      this.group.add(this.guitar)
    })
  }
}
