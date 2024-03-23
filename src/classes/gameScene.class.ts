import * as THREE from 'three'

export class GameScene {
    private scene = new THREE.Scene()
    private camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000)
    private renderer = new THREE.WebGLRenderer()
    init() {
        this.drawScene()
        this.animate()
    }

    drawScene() {
        this.camera.position.set(10,10,50)
        this.renderer.setSize(window.innerWidth,window.innerHeight)
        document.body.appendChild(this.renderer.domElement)
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this))
        this.renderer.render(this.scene,this.camera)
    }
}