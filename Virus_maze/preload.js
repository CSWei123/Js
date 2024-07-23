class preload extends Phaser.Scene {
  constructor() {
    super({
      key: "preload",
    });

    // Put global variable here
  }

  preload() {

    // this is the exported JSON map file
    this.load.tilemapTiledJSON("Maze_1", "assets/Maze_1.tmj");
    this.load.tilemapTiledJSON("Maze_2", "assets/Maze_2.tmj");
    this.load.tilemapTiledJSON("Maze_3", "assets/Maze_3.tmj");
    this.load.tilemapTiledJSON("Cyber_town", "assets/Cyber_Town.tmj");

    this.load.audio("Gameover_sound","assets/game-over-38511.mp3");

    this.load.image("tlieset", "assets/tileset x1.png");
    this.load.image("tilesf", "assets/tileset_sf.png");
    this.load.image("defimon_1", "assets/defimon1.png");
    this.load.image("defimon_2", "assets/defimon2.png");
    this.load.image("Street32x32ING", "assets/Street32x32.png");
    this.load.spritesheet("virus", "assets/Virus.png",
      { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet("Hacker", "assets/Hacker.png", {
      frameWidth: 32, frameHeight: 32
    });
    this.load.spritesheet("keyPart3", "assets/Mac_3.png",
      { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet("keyPart2", "assets/Mac_2.png", {
      frameWidth: 32, frameHeight: 32
    })
    this.load.spritesheet("keyPart1", "assets/Mac_1.png",
      { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('maincharacter', 'assets/character.png',
      { frameWidth: 64, frameHeight: 64 });
  }

  create() {
    this.anims.create({
      key: 'Move_up',
      frames: this.anims.generateFrameNumbers('maincharacter',
        { start: 105, end: 112 }),
      frameRate: 5,
      repeat: -1
    });

    this.anims.create({
      key: 'Move_left',
      frames: this.anims.generateFrameNumbers('maincharacter',
        { start: 118, end: 125 }),
      frameRate: 5,
      repeat: -1
    });

    this.anims.create({
      key: 'Move_down',
      frames: this.anims.generateFrameNumbers('maincharacter',
        { start: 131, end: 138 }),
      frameRate: 5,
      repeat: -1
    });

    this.anims.create({
      key: 'Move_right',
      frames: this.anims.generateFrameNumbers('maincharacter',
        { start: 144, end: 151 }),
      frameRate: 5,
      repeat: -1
    });

    this.anims.create({
      key: 'Move',
      frames: this.anims.generateFrameNumbers('virus',
        { start: 0, end: 1 }),
      frameRate: 5,
      repeat: -1
    });

    this.anims.create({
      key: 'Glow',
      frames: this.anims.generateFrameNumbers('keyPart1',
        { start: 0, end: 2 }),
      frameRate: 5,
      repeat: -1
    });

    this.anims.create({
      key: 'Rotate',
      frames: this.anims.generateFrameNumbers('Hacker',
        { start: 0, end: 3 }),
      frameRate: 5,
      repeat: -1
    });


    this.scene.start("Cyber_town")
  }


}