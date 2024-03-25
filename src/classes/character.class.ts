import { AnimationMixer, LoopOnce, Object3D } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { FBXLoader } from "three/examples/jsm/Addons.js";

export class Knight {
    private _container = new Object3D();
    private _GLTFLoader = new GLTFLoader();
    private _FXBLoader = new FBXLoader();
    private _animation: any;
    private _knight: any;
    private ss = 0
    private characterArray = [
        '/models/Walking.fbx',
        '/models/Standing Taunt Battlecry.fbx'
    ];

    get container(){
        this.init();
        return this._container;
    }

    get animation(){
        return this._animation;
    }

    init() {
        this.createKnight();
        this.setupKeyboardControls();
    }

    createKnight = () => {
        this._FXBLoader.load(this.characterArray[this.ss], (model) =>  {
            this._knight = model;
            console.log(model.animations);
            
            this._animation = new AnimationMixer(this._knight);
            // const action = this._animation.clipAction(model.animations[0]);
            // action.play();
            this._knight.scale.set(0.02, 0.02, 0.02);
            this._knight.position.set(0, 0, 5);
            this._container.add(this._knight);
        });
    }

    setupKeyboardControls() {
        document.addEventListener('keydown', (event) => {
            switch(event.key) {
                case 'w':
                    this.ss =1
                    this._knight.position.z += 1
                    this.startWalking();
                    break;
                case ' ':
                    this.ss = 1
                    this.stopWalking();
                    this.playStandingTauntBattlecryAnimation();
                    break;
            }
        });
    }

    startWalking() {
        // Assuming the walking animation is the first animation in the array if (this._animation && this._knight && this._knight.animations.length > 0) {
            const action = this._animation.clipAction(this._knight.animations[0]);
            action.setLoop(LoopOnce);
            action.play();
        
    }

    stopWalking() {
        // Assuming the walking animation is the first animation in the array
    
            const action = this._animation.clipAction(this._knight.animations[0]);
            action.stop();
        
    }

    playStandingTauntBattlecryAnimation() {
        // Assuming the Standing Taunt Battlecry animation is the second animation in the array
    
            const action = this._animation.clipAction(this._knight.animations[1]);
            action.play();
        
    }
}
