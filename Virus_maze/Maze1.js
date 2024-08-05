class Maze_1 extends Phaser.Scene {
    constructor() {
      super({
        key: "Maze_1",
      });
  
      // Put global variable here
    }
  
    // incoming data from scene below
    init(data) {
      this.player = data.player;
      this.inventory = data.inventory;
    }
  
    preload() {}
  

    create() {
      console.log("*** world scene");
      console.log("animationScene");
  
      // Create the map from main
      let map = this.make.tilemap({
        key: "Maze_1",
      });

      // Load the game tiles
      // 1st parameter is name in Tiled,
      // 2nd parameter is key in Preload
      let streetTiles = map.addTilesetImage("Street32x32", "Street32x32ING");
      let tilex1 = map.addTilesetImage("tileset x1", "tlieset");
      let tilesf = map.addTilesetImage("tileset_sf", "tilesf");
  
      let tilesArray = [streetTiles, tilex1, tilesf];

  
      // Load in layers by layers
      this.Floor = map.createLayer("Floor", tilesArray, 0, 0)
      this.wall = map.createLayer("wall", tilesArray, 0, 0)
      this.Deco = map.createLayer("Deco", tilesArray, 0, 0)

      let enemy1  = map.findObject("objectLayer",(obj) => obj.name === "enemy1");
      let enemy2  = map.findObject("objectLayer",(obj) => obj.name === "enemy2");
      let enemy3  = map.findObject("objectLayer",(obj) => obj.name === "enemy3");
      let enemy4  = map.findObject("objectLayer",(obj) => obj.name === "enemy4");
      let enemy5  = map.findObject("objectLayer",(obj) => obj.name === "enemy5");
      let enemy6  = map.findObject("objectLayer",(obj) => obj.name === "enemy6");
      let Key  = map.findObject("objectLayer",(obj) => obj.name === "Key");
      let Start  = map.findObject("objectLayer",(obj) => obj.name === "Start");

        
      // gen is the alias in preload 
    this.player = this.physics.add.sprite(Start.x, Start.y, 'maincharacter');
    this.player.body.setSize(this.player.width * 0.5, this.player.height * 0.5)

// debug player
window.player = this.player


    this.enemy1 = this.physics.add.sprite(enemy1.x, enemy1.y, 'virus').play("Move")
    this.enemy2 = this.physics.add.sprite(enemy2.x, enemy2.y, 'virus').play("Move")
    this.enemy3 = this.physics.add.sprite(enemy3.x, enemy3.y, 'virus').play("Move")
    this.enemy4 = this.physics.add.sprite(enemy4.x, enemy4.y, 'virus').play("Move")
    this.enemy5 = this.physics.add.sprite(enemy5.x, enemy5.y, 'virus').play("Move")
    this.enemy6 = this.physics.add.sprite(enemy6.x, enemy6.y, 'virus').play("Move")
    this.Key = this.physics.add.sprite(Key.x, Key.y, 'keyPart1').play("Glow1")

    this.tweens.add({
      targets: this.enemy6,
      x: 419,
      flipX: true,
      yoyo: true,
      duration: 500,
      repeat: -1
  })

  this.tweens.add({
    targets: this.enemy2,
    x: 464,
    flipX: true,
    yoyo: true,
    duration: 500,
    repeat: -1
})

this.tweens.add({
  targets: this.enemy3,
  x: 944,
  flipX: true,
  yoyo: true,
  duration: 500,
  repeat: -1
})

this.tweens.add({
  targets: this.enemy4,
  y: 1663,
  flipX: true,
  yoyo: true,
  duration: 900,
  repeat: -1
})

this.tweens.add({
  targets: this.enemy1,
  x: 624,
  flipX: true,
  yoyo: true,
  duration: 600,
  repeat: -1
})

this.tweens.add({
  targets: this.enemy5,
  x: 992,
  flipX: true,
  yoyo: true,
  duration: 1500,
  repeat: -1
})

// create the arrow keys
this.cursors = this.input.keyboard.createCursorKeys();

// Camera follow player
this.cameras.main.startFollow(this.player);

var spaceDown = this.input.keyboard.addKey('SPACE');
        

      this.wall.setCollisionByExclusion(-1, true);
this.physics.add.collider(this.player, this.wall)
this.physics.add.collider(this.enemy1, this.wall)
this.physics.add.collider(this.enemy2, this.wall)
this.physics.add.collider(this.enemy3, this.wall)
this.physics.add.collider(this.enemy4, this.wall)
this.physics.add.collider(this.enemy5, this.wall)
this.physics.add.collider(this.enemy6, this.wall)

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

     // Call to update inventory items
     this.time.addEvent({
      delay: 100,
      callback: updateInventory,
      callbackScope: this,
      loop: false,
    });
    
    // start another scene in parallel
    this.scene.launch("showInventory");
    
    // Call globalFunction globalHitFire on overlap
    this.physics.add.overlap(this.player, [this.enemy1, this.enemy2, this.enemy3, this.enemy4, this.enemy5, this.enemy6], globalHitplayer, null, this);
    this.physics.add.overlap(this.player, [this.Key], globalCollectKey, null, this);


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
        this.player.x < 50 &&
        this.player.y > 1264 &&
        this.player.y < 1328
      ) {
        console.log("Go to RoomHome function");
        this.roomHome();
      }

    } /////////////////// end of update //////////////////////////////
  
    // Function to jump to room1
    room1(player, tile) {
      console.log("room1 function");
      this.scene.start("room1", {
        player: player,
        inventory: this.inventory,
      });
    }

    roomHome(player, tile) {
      console.log("roomHome function");
      this.scene.start("Cyber_town", {
        player: player,
        inventory: this.inventory,
      });
    }

    hitEnemy(player, enemy){
      console.log("Player hit enemy");
      
			// // play a sound
      // this.hitSnd.play();

			// shake screen
	    this.cameras.main.shake(300);    

      // disable enemy body
      enemy.disableBody (true, true);
   }

    
  } //////////// end of class world ////////////////////////