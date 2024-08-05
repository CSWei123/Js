class gameOver extends Phaser.Scene {
  constructor() {
    super("gameOver");
  }

preload() {
  this.load.image("gameOverImg", "assets/Virus_Maze_GameOver.png");

}

create() {
  console.log("*** gameover scene");

  // Add image and detect spacebar keypress
  this.add.image(0, 0, 'gameOverImg').setOrigin(0, 0);

  console.log("Jump to tutorial scene");
  window.heart = 1;
  window.key = 0;

  let spacebar = this.input.keyboard.addKey(32);


spacebar.on('down', function(){
    this.scene.start("Cyber_town");
    }, this );
}
}