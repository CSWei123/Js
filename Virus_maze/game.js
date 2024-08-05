var config = {
    type: Phaser.AUTO,
    // pixel size * tile map size * zoom 
    width: 32 * 20,
    height: 32 * 20,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },

    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    backgroundColor: '#000000',
    pixelArt: true,
    scene: [preload, Maze_1, Maze_2, Maze_3, Cyber_town, showInventory, gameOver, title, Story, Gameplay, thepart, map]
};

  let game = new Phaser.Game(config);
  // Add variables here
  window.heart = 3
  window.key = 0