import { GameScene } from "./classes/gameScene.class";

class GameComponent {
  private gameScene = new GameScene()
  init(){
    this.gameScene.init()
  }
}

const gameComponent = new GameComponent()
gameComponent.init()