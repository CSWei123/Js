class Maze_3 extends Phaser.Scene {
  constructor() {
    super({
      key: "Maze_3",
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
      key: "Maze_3",
    });

    // Load the game tiles
    // 1st parameter is name in Tiled,
    // 2nd parameter is key in Preload
    let streetTiles = map.addTilesetImage("Street32x32", "Street32x32ING");
    let tilex1 = map.addTilesetImage("tileset x1", "tlieset");
    let tilesf = map.addTilesetImage("tileset_sf", "tilesf");

    let tilesArray = [streetTiles, tilex1, tilesf];

    // Load in layers by layers
    this.floor = map.createLayer("floor", tilesArray, 0, 0)
    this.wall = map.createLayer("wall", tilesArray, 0, 0)
    this.deco = map.createLayer("deco", tilesArray, 0, 0)

    let enemy1 = map.findObject("ObjectLayer", (obj) => obj.name === "enemy1");
    let enemy2 = map.findObject("ObjectLayer", (obj) => obj.name === "enemy2");
    let enemy3 = map.findObject("ObjectLayer", (obj) => obj.name === "enemy3");
    let enemy4 = map.findObject("ObjectLayer", (obj) => obj.name === "enemy4");
    let enemy5 = map.findObject("ObjectLayer", (obj) => obj.name === "enemy5");
    let enemy6 = map.findObject("ObjectLayer", (obj) => obj.name === "enemy6");
    let enemy7 = map.findObject("ObjectLayer", (obj) => obj.name === "enemy7");
    let enemy8 = map.findObject("ObjectLayer", (obj) => obj.name === "enemy8");
    let enemy9 = map.findObject("ObjectLayer", (obj) => obj.name === "enemy9");
    let enemy10 = map.findObject("ObjectLayer", (obj) => obj.name === "enemy10");
    let enemy11 = map.findObject("ObjectLayer", (obj) => obj.name === "enemy11");
    let enemy12 = map.findObject("ObjectLayer", (obj) => obj.name === "enemy12");
    let enemy13 = map.findObject("ObjectLayer", (obj) => obj.name === "enemy13");
    let Key = map.findObject("ObjectLayer", (obj) => obj.name === "Key");
    let Start = map.findObject("ObjectLayer", (obj) => obj.name === "Start");


    // gen is the alias in preload 
    this.player = this.physics.add.sprite(Start.x, Start.y, 'maincharacter');
    this.player.body.setSize(this.player.width * 0.5, this.player.height * 0.5)

    // debug player
    window.player = this.player

    this.enemy1 = this.physics.add.sprite(enemy1.x, enemy1.y, 'Hacker').play("Rotate")
    this.enemy2 = this.physics.add.sprite(enemy2.x, enemy2.y, 'virus').play("Move")
    this.enemy3 = this.physics.add.sprite(enemy3.x, enemy3.y, 'Hacker').play("Rotate")
    this.enemy4 = this.physics.add.sprite(enemy4.x, enemy4.y, 'Hacker').play("Rotate")
    this.enemy5 = this.physics.add.sprite(enemy5.x, enemy5.y, 'Hacker').play("Rotate")
    this.enemy6 = this.physics.add.sprite(enemy6.x, enemy6.y, 'virus').play("Move")
    this.enemy7 = this.physics.add.sprite(enemy7.x, enemy7.y, 'virus').play("Move")
    // this.enemy8 = this.physics.add.sprite(enemy8.x, enemy8.y, 'Hacker').play("Rotate")
    this.enemy9 = this.physics.add.sprite(enemy9.x, enemy9.y, 'virus').play("Move")
    this.enemy10 = this.physics.add.sprite(enemy10.x, enemy10.y, 'Hacker').play("Rotate")
    this.enemy11 = this.physics.add.sprite(enemy11.x, enemy11.y, 'Hacker').play("Rotate")
    this.enemy12 = this.physics.add.sprite(enemy12.x, enemy12.y, 'virus').play("Move")
    this.enemy13 = this.physics.add.sprite(enemy13.x, enemy13.y, 'virus').play("Move")
    this.Key = this.physics.add.sprite(Key.x, Key.y, 'keyPart3').play("Glow3")
    this.bullet1 = this.physics.add.sprite(enemy1.x, enemy1.y, "bullet").play("flying")
    this.bullet4 = this.physics.add.sprite(enemy4.x, enemy4.y, "bullet").play("flying")
    this.bullet5 = this.physics.add.sprite(enemy5.x, enemy5.y, "bullet").play("flying")
    this.bullet10 = this.physics.add.sprite(enemy10.x, enemy10.y, "bullet").play("flying")
    this.bullet11 = this.physics.add.sprite(enemy11.x, enemy11.y, "bullet").play("flying")


    this.tweens.add({
      targets: this.enemy2,
      x: 319,
      flipX: true,
      yoyo: true,
      duration: 500,
      repeat: -1
    })

    this.tweens.add({
      targets: this.enemy6,
      x: 1328,
      flipX: true,
      yoyo: true,
      duration: 600,
      repeat: -1
    })

    this.tweens.add({
      targets: this.enemy7,
      x: 944,
      flipX: true,
      yoyo: true,
      duration: 600,
      repeat: -1
    })

    this.tweens.add({
      targets: this.enemy9,
      x: 1168,
      flipX: true,
      yoyo: true,
      duration: 600,
      repeat: -1
    })

    this.tweens.add({
      targets: this.enemy12,
      x: 1530,
      flipX: true,
      yoyo: true,
      duration: 600,
      repeat: -1
    })

    this.tweens.add({
      targets: this.enemy13,
      x: 2352,
      flipX: true,
      yoyo: true,
      duration: 600,
      repeat: -1
    })

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
    this.physics.add.collider(this.enemy2, this.wall)
    this.physics.add.collider(this.enemy6, this.wall)
    this.physics.add.collider(this.enemy7, this.wall)
    this.physics.add.collider(this.enemy9, this.wall)
    this.physics.add.collider(this.enemy12, this.wall)
    this.physics.add.collider(this.enemy13, this.wall)
    this.physics.add.collider([this.bullet1, this.bullet4, this.bullet5, this.bullet10, this.bullet11], this.wall)

    this.physics.add.overlap(this.player, [this.enemy2, this.enemy6, this.enemy7, this.enemy9, this.enemy12, this.enemy13], globalHitplayer, null, this);
    this.physics.add.overlap(this.player, [this.Key], globalCollectKey, null, this);
    this.physics.add.overlap(this.player, [this.bullet1, this.bullet4, this.bullet5, this.bullet10, this.bullet11], globalHitplayer, null, this);

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

    if (
      this.player.x < 1276 &&
      this.player.y > 2472 &&
      this.player.y < 2512
    ) {
      console.log("Go to RoomHome function");
      this.roomWin();
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

  roomWin(player, tile) {
    console.log("win function");
    this.scene.start("Win", {
      player: player,
      inventory: this.inventory,
    });
  }


  shootBullet() {
    console.log("shoot knife", this.angle1, this.angle2,)

    this.physics.velocityFromRotation(this.angle1, 100, this.bullet1.body.velocity);
    this.physics.velocityFromRotation(this.angle1, 100, this.bullet4.body.velocity);
    this.physics.velocityFromRotation(this.angle1, 100, this.bullet5.body.velocity);
    this.physics.velocityFromRotation(this.angle1, 100, this.bullet10.body.velocity);
    this.physics.velocityFromRotation(this.angle1, 100, this.bullet11.body.velocity);

  }

  resetBullet() {
    console.log("Reset knife location")
    this.bullet1.x = this.enemy1.x
    this.bullet1.y = this.enemy1.y
    this.bullet4.x = this.enemy4.x
    this.bullet4.y = this.enemy4.y
    this.bullet5.x = this.enemy5.x
    this.bullet5.y = this.enemy5.y
    this.bullet10.x = this.enemy10.x
    this.bullet10.y = this.enemy10.y
    this.bullet11.x = this.enemy11.x
    this.bullet11.y = this.enemy11.y

  }

} //////////// end of class world ////////////////////////