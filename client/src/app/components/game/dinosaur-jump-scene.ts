import * as Phaser from 'phaser';

export class DinosaurJumpScene extends Phaser.Scene {
  private dinosaur!: Phaser.Physics.Arcade.Sprite;
  private platforms!: Phaser.Physics.Arcade.StaticGroup;
  private obstacles!: Phaser.Physics.Arcade.Group;

  private score!: number;
  private scoreText!: Phaser.GameObjects.Text;

  constructor() {
    super('DinosaurJumpScene');
  }

  preload(): void {
    this.load.image('ground', 'assets/ground.png');
    this.load.image('obstacle', 'assets/cactuses_small_3.png');
    this.load.spritesheet('dinosaur', 'assets/dino-run.png', { frameWidth: 32, frameHeight: 48 });
  }

  create(): void {
    // Create ground and dinosaur
    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();

    this.dinosaur = this.physics.add.sprite(100, 450, 'dinosaur');
    this.dinosaur.setBounce(0.2);
    this.dinosaur.setCollideWorldBounds(true);
    this.physics.add.collider(this.dinosaur, this.platforms);

    // Create obstacles
    this.obstacles = this.physics.add.group();
    this.physics.add.collider(this.obstacles, this.platforms);
    this.physics.add.overlap(this.dinosaur, this.obstacles, this.gameOver, undefined, this);

    // Create animations
    this.anims.create({
      key: 'jump',
      frames: this.anims.generateFrameNumbers('dinosaur', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    // Spawn obstacles
    this.time.addEvent({
      delay: 2000,
      callback: this.spawnObstacle,
      callbackScope: this,
      loop: true
    });

    // Input handling
    this.input.keyboard?.on('keydown-UP', this.jump, this);

    this.score = 0;
    this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', color: '#fff' });
  }

  override update(): void {
    if (this.dinosaur.body?.touching.down) {
      this.dinosaur.play('jump', true);
    }
    this.physics.overlap(this.dinosaur, this.obstacles, this.gameOver, undefined, this);
  }

  private jump(): void {
    if (this.dinosaur.body?.touching.down) {
      this.dinosaur.setVelocityY(-350);
    }
  }

  private spawnObstacle(): void {
    const obstacle = this.physics.add.sprite(800, 500, 'obstacle');
    this.obstacles.add(obstacle);
    obstacle.setVelocityX(-200);
    obstacle.setCollideWorldBounds(false);
    obstacle.setBounce(1);
    obstacle.setInteractive();
    obstacle.on('pointerdown', () => {
      this.obstacles.killAndHide(obstacle);
      obstacle.destroy();
      this.incrementScore();
    });

    // Destroy the obstacle when it's no longer visible
    obstacle.once('out', () => {
      this.obstacles.killAndHide(obstacle);
      obstacle.destroy();
    });
    this.time.delayedCall(1500, () => {
        if (obstacle.active) {
          this.incrementScore();
        }
      });
  }

  private gameOver(): void {
    this.registry.destroy(); // destroy registry
    this.events.removeAllListeners(); // disable all active events
    this.game.events.emit('gameover');
    // this.scene.restart(); // restart current scene
  }
  private incrementScore(): void {
    this.score += 1;
    this.updateScore();
  }

  private updateScore(): void {
    this.scoreText.setText('score: ' + this.score);
  }
}
