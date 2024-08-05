class Win extends Phaser.Scene {
  constructor() {
    super("Win");
  }

preload() {
  this.load.image("win", "assets/Virus_Maze_Win.png");

}

create() {
  console.log("*** gameover scene");

  // Add image and detect spacebar keypress
  this.add.image(0, 0, 'win').setOrigin(0, 0);

  console.log("Jump to tutorial scene");
  window.heart = 1;
  window.key = 0;

  let spacebar = this.input.keyboard.addKey(32);


spacebar.on('down', function(){
    this.scene.start("Cyber_Town");
    }, this );
}
}