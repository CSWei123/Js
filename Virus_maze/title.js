class title extends Phaser.Scene {
  constructor() {
    super("title");
  }

preload() {
  this.load.image("Ttilepng", "Virus_Maze_intro.png");

}

create() {
  console.log("*** gameover scene");

  // Add image and detect spacebar keypress
  this.add.image(0, 0, 'Ttilepng').setOrigin(0, 0);

  console.log("Jump to tutorial scene");
  window.heart = 1;
  window.key = 0;

  let spacebar = this.input.keyboard.addKey(32);


spacebar.on('down', function(){
    this.scene.start("Story");
    }, this );
}
}