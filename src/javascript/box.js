import * as THREE from "three"
import pianoTextSource from "./../images/textures/texturePiano.png"
import bassTextSource from "./../images/textures/textureBass.png"
import drumsTextSource from "./../images/textures/textureDrums.png"
import guitarTextSource from "./../images/textures/textureGuitar.png"

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const pianoTextTexture = textureLoader.load(pianoTextSource)
const bassTextTexture = textureLoader.load(bassTextSource)
const drumsTextTexture = textureLoader.load(drumsTextSource)
const guitarTextTexture = textureLoader.load(guitarTextSource)

/**
 * Create box
 */

export default class Box {
  constructor() {
    this.group = new THREE.Group()

    const boxMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff
    })

    const boxBottom = new THREE.BoxGeometry(2, 0.1, 2)
    const boxBottomMesh = new THREE.Mesh(boxBottom, boxMaterial)

    // Text Texture
    this.pianoText = new THREE.Mesh(
      new THREE.BoxGeometry(2, 0.1, 2),
      new THREE.MeshStandardMaterial({
        color: 0xffffff,
        map: pianoTextTexture
      })
    )
    this.bassText = new THREE.Mesh(
      new THREE.BoxGeometry(2, 0.1, 2),
      new THREE.MeshStandardMaterial({
        color: 0xffffff,
        map: bassTextTexture
      })
    )
    this.drumsText = new THREE.Mesh(
      new THREE.BoxGeometry(2, 0.1, 2),
      new THREE.MeshStandardMaterial({
        color: 0xffffff,
        map: drumsTextTexture
      })
    )
    this.guitarText = new THREE.Mesh(
      new THREE.BoxGeometry(2, 0.1, 2),
      new THREE.MeshStandardMaterial({
        color: 0xffffff,
        map: guitarTextTexture
      })
    )

    // Text rotate
    this.pianoText.rotateZ(Math.PI * 0.5)
    this.pianoText.position.set(-1.05, 0.95, 0)
    this.bassText.rotateZ(Math.PI * 0.5)
    this.bassText.position.set(-1.05, 0.95, 0)
    this.drumsText.rotateZ(Math.PI * 0.5)
    this.drumsText.position.set(-1.05, 0.95, 0)
    this.guitarText.rotateZ(Math.PI * 0.5)
    this.guitarText.position.set(-1.05, 0.95, 0)

    // Box Mesh
    const boxLeft = new THREE.BoxGeometry(2, 0.1, 2)
    const boxLeftMesh = new THREE.Mesh(boxLeft, boxMaterial)

    const boxTop = new THREE.BoxGeometry(2, 0.1, 2)
    const boxTopMesh = new THREE.Mesh(boxTop, boxMaterial)
    boxTopMesh.position.set(-0.1, 2, 0)

    boxLeftMesh.rotateZ(Math.PI * 0.5)
    boxLeftMesh.position.set(-1.05, 0.95, 0)

    const boxRight = new THREE.BoxGeometry(2, 0.1, 2)
    const boxRightMesh = new THREE.Mesh(boxRight, boxMaterial)
    boxRightMesh.rotateZ(Math.PI * 0.5)
    boxRightMesh.position.set(0.95, 1.05, 0)

    const boxBack = new THREE.BoxGeometry(1.9, 0.1, 1.9)
    const boxBackMesh = new THREE.Mesh(boxBack, boxMaterial)
    boxBackMesh.rotateX(Math.PI * 0.5)
    boxBackMesh.position.set(-0.05, 1, -0.95)

    // Box plan with basic material
    const planMaterial = new THREE.MeshBasicMaterial({
      color: 0xd6d4d4
    })

    const planBottom = new THREE.PlaneGeometry(2.1, 2, 2)
    const planBottomMesh = new THREE.Mesh(planBottom, planMaterial)
    planBottomMesh.position.set(-0.05, -0.0501, 0)

    planBottomMesh.rotateX(Math.PI * 0.5)

    const planLeft = new THREE.PlaneGeometry(2, 2.1, 2)
    const planLeftMesh = new THREE.Mesh(planLeft, planMaterial)
    planLeftMesh.rotateY(-Math.PI * 0.5)
    planLeftMesh.position.set(-1.1001, 1, 0)

    const planRight = new THREE.PlaneGeometry(2, 2.1, 2)
    const planRightMesh = new THREE.Mesh(planRight, planMaterial)
    planRightMesh.rotateY(Math.PI * 0.5)
    planRightMesh.position.set(1.0001, 1, 0)

    const planTop = new THREE.PlaneGeometry(2.1, 2, 2)
    const planTopMesh = new THREE.Mesh(planTop, planMaterial)
    planTopMesh.position.set(-0.05, 2.0501, 0)

    planTopMesh.rotateX(-Math.PI * 0.5)

    // Small plan mesh border box
    const smallPlanMaterial = new THREE.MeshBasicMaterial({
      color: 0xf5f5f5
    })
    const smallPlanTop = new THREE.PlaneGeometry(2.1, 0.1, 2)
    const smallPlanTopMesh = new THREE.Mesh(smallPlanTop, smallPlanMaterial)
    smallPlanTopMesh.position.set(-0.05, 2, 1.0001)

    const smallPlanBottom = new THREE.PlaneGeometry(2.1, 0.1, 2)
    const smallPlanBottomMesh = new THREE.Mesh(
      smallPlanBottom,
      smallPlanMaterial
    )
    smallPlanBottomMesh.position.set(-0.05, 0, 1.0001)

    const smallPlanLeft = new THREE.PlaneGeometry(2, 0.1, 2)
    const smallPlanLeftMesh = new THREE.Mesh(smallPlanLeft, smallPlanMaterial)
    smallPlanLeftMesh.position.set(-1.05, 1, 1.0001)
    smallPlanLeftMesh.rotateZ(Math.PI * 0.5)

    const smallPlanRight = new THREE.PlaneGeometry(2, 0.1, 2)
    const smallPlanRightMesh = new THREE.Mesh(smallPlanRight, smallPlanMaterial)
    smallPlanRightMesh.position.set(0.95, 1, 1.0001)
    smallPlanRightMesh.rotateZ(Math.PI * 0.5)

    // Add group
    this.group.add(
      boxBottomMesh,
      boxTopMesh,
      boxLeftMesh,
      boxRightMesh,
      boxBackMesh,
      planBottomMesh,
      planLeftMesh,
      planRightMesh,
      planTopMesh,
      smallPlanTopMesh,
      smallPlanBottomMesh,
      smallPlanLeftMesh,
      smallPlanRightMesh
    )
  }
}
