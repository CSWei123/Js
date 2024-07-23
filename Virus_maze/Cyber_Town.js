class Cyber_town extends Phaser.Scene {
  constructor() {
    super({
      key: "Cyber_town",
    });

    // Put global variable here
  }

  // incoming data from scene below
  init(data) {
    this.player = data.player;
    this.inventory = data.inventory;
  }

  preload() { }

  create() {
    console.log("Cyber_town");

    // Create the map from main
    let map = this.make.tilemap({
      key: "Cyber_town",
    });

    // Load the game tiles
    // 1st parameter is name in Tiled,
    // 2nd parameter is key in Preload
    let streetTiles = map.addTilesetImage("Street32x32", "Street32x32ING");
    let defimon_1 = map.addTilesetImage("defimon1", "defimon_1");
    let defimom_2 = map.addTilesetImage("defimon2", "defimon_2");

    let tilesArray = [streetTiles, defimom_2, defimon_1]

    // Load in layers by layers
    this.ground = map.createLayer("ground", tilesArray, 0, 0)
    this.building = map.createLayer("building", tilesArray, 0, 0)
    this.gate = map.createLayer("gate", tilesArray, 0, 0)
    this.walkpath = map.createLayer("walkpath", tilesArray, 0, 0)

    let Start4 = map.findObject("objectLayer", (obj) => obj.name === "StartPoint");

    // gen is the alias in preload 
    this.player = this.physics.add.sprite(Start4.x, Start4.y, 'maincharacter');
    this.player.body.setSize(this.player.width * 0.5, this.player.height * 0.5)

    // debug player
    window.player = this.player


    // create the arrow keys
    this.cursors = this.input.keyboard.createCursorKeys();

    // Camera follow player
    this.cameras.main.startFollow(this.player);

    var spaceDown = this.input.keyboard.addKey('SPACE');

    this.building.setCollisionByExclusion(-1, true);
    this.physics.add.collider(this.player, this.building)


    let key1 = this.input.keyboard.addKey(49);
let key2 = this.input.keyboard.addKey(50);
let key3 = this.input.keyboard.addKey(51);
let key4 = this.input.keyboard.addKey(52);


key1.on('down', function(){
    this.scene.start("Maze_1");
    }, this );
    
key2.on('down', function(){
    this.scene.start("Maze_2");
    }, this );
 
key3.on('down', function(){
    this.scene.start("Maze_3");
    }, this );  

key4.on('down', function(){
      this.scene.start("Cyber_town");
      }, this );  


  } /////////////////// end of create //////////////////////////////

  update() {
    let speed = 200;

    if (this.cursors.left.isDown) {
      this.player.body.setVelocityX(-speed);
      this.player.anims.play("Move_left", true); // walk left
    } else if (this.cursors.right.isDown) {
      this.player.body.setVelocityX(speed);
      this.player.anims.play("Move_right", true);
    } else if (this.cursors.up.isDown) {
      this.player.body.setVelocityY(-speed);
      this.player.anims.play("Move_up", true);
    } else if (this.cursors.down.isDown) {
      this.player.body.setVelocityY(speed);
      this.player.anims.play("Move_down", true);
    } else {
      this.player.anims.stop();
      this.player.body.setVelocity(0, 0);
    }

    if (
      this.player.x > 1880 &&
      this.player.x < 1913 &&
      this.player.y < 909 &&
      this.player.y > 949
    ) {
      console.log("Go to Room1 function");
      this.room1();
    }

    if (
      this.player.x > 11 &&
      this.player.x < 18 &&
      this.player.y < 698 &&
      this.player.y > 768
    ) {
      console.log("Go to Room1 function");
      this.room2();
    }

    if (
      this.player.x > 1015 &&
      this.player.x < 865 &&
      this.player.y < 35 &&
      this.player.y > 15
    ) {
      console.log("Go to Room1 function");
      this.room3();
    }
  } /////////////////// end of update //////////////////////////////

  // Function to jump to room1
  room1(player, tile) {
    console.log("room1 function");
    this.scene.start("Maze_1", {
      player: player,
      inventory: this.inventory,
    });
  }

  room2(player, tile) {
    console.log("room1 function");
    this.scene.start("Maze_2", {
      player: player,
      inventory: this.inventory,
    });
  }

  room3(player, tile) {
    console.log("room1 function");
    this.scene.start("Maze_3", {
      player: player,
      inventory: this.inventory,
    });
  }


} //////////// end of class world ////////////////////////