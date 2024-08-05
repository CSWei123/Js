class map extends Phaser.Scene {
  constructor() {
    super("map");
  }

preload() {
  this.load.image("map", "assets/Virus_Maze_Map.png");

}

create() {
  console.log("*** gameover scene");

  // Add image and detect spacebar keypress
  this.add.image(0, 0, 'map').setOrigin(0, 0);

  console.log("Jump to tutorial scene");
  window.heart = 1;
  window.key = 0;

  let spacebar = this.input.keyboard.addKey(32);


spacebar.on('down', function(){
    this.scene.start("Cyber_town");
    }, this );
}
}