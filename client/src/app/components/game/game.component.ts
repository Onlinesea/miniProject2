import { Component, ElementRef, OnInit } from '@angular/core';
import * as Phaser from 'phaser';
import { DinosaurJumpScene } from './dinosaur-jump-scene';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  private game!: Phaser.Game;

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      parent: this.elementRef.nativeElement.querySelector('.phaser-game'),
      scene: [DinosaurJumpScene],
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 500 },
          debug: false
        }
      }
    };

    this.game = new Phaser.Game(config);
  }
  stopGame(): void {
    if (this.game) {
      this.game.destroy(true);
      this.game = undefined!;
    }

  }
  startGame(): void {
    if (this.game) {
      // If a game instance exists, destroy it before creating a new one.
      this.game.destroy(true);
    }
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      parent: this.elementRef.nativeElement.querySelector('.phaser-game'),
      scene: [DinosaurJumpScene],
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 500 },
          debug: false,
        },
      },
    };

    this.game = new Phaser.Game(config);
    this.game.events.once('gameover', () => {
      this.game.destroy(true);
      this.game = undefined!;
    });
  }
}


