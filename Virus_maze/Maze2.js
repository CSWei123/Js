class Maze_2 extends Phaser.Scene {
  constructor() {
    super({
      key: "Maze_2",
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
    console.log("*** world scene");
    console.log("animationScene");

    // Create the map from main
    let map = this.make.tilemap({
      key: "Maze_2",
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
    this.wall = map.createLayer("Wall", tilesArray, 0, 0)
    this.Deco = map.createLayer("decoy", tilesArray, 0, 0)

    let enemy1 = map.findObject("ObjectLayer", (obj) => obj.name === "enemy1");
    let enemy2 = map.findObject("ObjectLayer", (obj) => obj.name === "enemy2");
    let enemy3 = map.findObject("ObjectLayer", (obj) => obj.name === "enemy3");
    let enemy4 = map.findObject("ObjectLayer", (obj) => obj.name === "enemy4");
    let enemy5 = map.findObject("ObjectLayer", (obj) => obj.name === "enemy5");
    let enemy6 = map.findObject("ObjectLayer", (obj) => obj.name === "enemy6");
    let enemy7 = map.findObject("ObjectLayer", (obj) => obj.name === "enemy7");
    let Key = map.findObject("ObjectLayer", (obj) => obj.name === "Key");
    let Start = map.findObject("ObjectLayer", (obj) => obj.name === "Start");


    // gen is the alias in preload 
    this.player = this.physics.add.sprite(Start.x, Start.y, 'maincharacter');
    this.player.body.setSize(this.player.width * 0.5, this.player.height * 0.5)

    // debug player
    window.player = this.player

    this.player.body.setSize(this.player.width * 0.8, this.player.height * 0.8);

    this.enemy1 = this.physics.add.sprite(enemy1.x, enemy1.y, 'Hacker').play("Rotate")
    this.enemy2 = this.physics.add.sprite(enemy2.x, enemy2.y, 'Hacker').play("Rotate")
    this.enemy3 = this.physics.add.sprite(enemy3.x, enemy3.y, 'Hacker').play("Rotate")
    this.enemy4 = this.physics.add.sprite(enemy4.x, enemy4.y, 'Hacker').play("Rotate")
    this.enemy5 = this.physics.add.sprite(enemy5.x, enemy5.y, 'Hacker').play("Rotate")
    this.enemy6 = this.physics.add.sprite(enemy6.x, enemy6.y, 'Hacker').play("Rotate")
    this.enemy7 = this.physics.add.sprite(enemy7.x, enemy7.y, 'Hacker').play("Rotate")
    this.Key = this.physics.add.sprite(Key.x, Key.y, 'keyPart2').play("Glow2")
    this.bullet1 = this.physics.add.sprite(enemy1.x, enemy1.y, "bullet").play("flying")
    this.bullet2 = this.physics.add.sprite(enemy2.x, enemy2.y, "bullet").play("flying")
    this.bullet3 = this.physics.add.sprite(enemy3.x, enemy3.y, "bullet").play("flying")
    this.bullet4 = this.physics.add.sprite(enemy4.x, enemy4.y, "bullet").play("flying")
    this.bullet7 = this.physics.add.sprite(enemy7.x, enemy7.y, "bullet").play("flying")

    // create the arrow keys
    this.cursors = this.input.keyboard.createCursorKeys();

    // Camera follow player
    this.cameras.main.startFollow(this.player);

    this.timer1 = this.time.addEvent({
      delay: 5000,
      callback: this.shootBullet,
      callbackScope: this,
      loop: true,
    });

    this.timer2 = this.time.addEvent({
      delay: 10000,
      callback: this.resetBullet,
      callbackScope: this,
      loop: true,
    });

    this.wall.setCollisionByExclusion(-1, true);
    this.physics.add.collider(this.player, this.wall)
    this.physics.add.collider([this.bullet1,this.bullet2,this.bullet3,this.bullet4,this.bullet7], this.wall)

    this.physics.add.overlap(this.player, [this.Key], globalCollectKey, null, this);
    this.physics.add.overlap(this.player, [this.bullet1,this.bullet2,this.bullet3,this.bullet4], globalHitplayer, null, this);


    let key1 = this.input.keyboard.addKey(49);
    let key2 = this.input.keyboard.addKey(50);
    let key3 = this.input.keyboard.addKey(51);
    let key4 = this.input.keyboard.addKey(52);


    key1.on('down', function () {
      this.scene.start("Maze_1");
    }, this);

    key2.on('down', function () {
      this.scene.start("Maze_2");
    }, this);

    key3.on('down', function () {
      this.scene.start("Maze_3");
    }, this);

    key4.on('down', function () {
      this.scene.start("Cyber_town");
    }, this);


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

    this.angle1 = Phaser.Math.Angle.BetweenPoints(this.bullet1, this.player);
    this.angle2 = Phaser.Math.Angle.BetweenPoints(this.bullet2, this.player);
    this.angle3 = Phaser.Math.Angle.BetweenPoints(this.bullet3, this.player);
    this.angle4 = Phaser.Math.Angle.BetweenPoints(this.bullet4, this.player);
    this.angle7 = Phaser.Math.Angle.BetweenPoints(this.bullet7, this.player);

    if (
      this.player.x > 2182 &&
      this.player.y > 1113 &&
      this.player.y < 1190
    ) {
      console.log("Go to RoomHome function");
      this.roomHome();
    }


  } /////////////////// end of update //////////////////////////////

  // Function to jump to room1
  room2(player, tile) {
    console.log("room2 function");
    this.scene.start("Maze_2", {
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

  shootBullet() {
    console.log("shoot knife", this.angle1, this.angle2,)

    this.physics.velocityFromRotation(this.angle1, 100, this.bullet1.body.velocity);
    this.physics.velocityFromRotation(this.angle2, 100, this.bullet2.body.velocity);
    this.physics.velocityFromRotation(this.angle3, 100, this.bullet3.body.velocity);
    this.physics.velocityFromRotation(this.angle4, 100, this.bullet4.body.velocity);
    this.physics.velocityFromRotation(this.angle4, 100, this.bullet7.body.velocity);
  }

  resetBullet() {
    console.log("Reset knife location")
    this.bullet1.x = this.enemy1.x
    this.bullet1.y = this.enemy1.y
    this.bullet2.x = this.enemy2.x
    this.bullet2.y = this.enemy2.y
    this.bullet3.x = this.enemy3.x
    this.bullet3.y = this.enemy3.y
    this.bullet4.x = this.enemy4.x
    this.bullet4.y = this.enemy4.y
    this.bullet7.x = this.enemy7.x
    this.bullet7.y = this.enemy7.y
  }

}
