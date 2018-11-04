import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { PlayerDetailsPage } from '../player-details/player-details';

@Component({
  selector: 'page-player-list',
  templateUrl: 'player-list.html'
})
export class PlayerListPage {
  icons: string[];
  players: Array<{name: string, status:string, icon: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];

    this.players = [];
    for(let i = 1; i < 11; i++) {
      this.players.push({
        name: 'Player ' + i,
        status: 'To do',
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }
  }

  playerTapped(event, player) {
    this.navCtrl.push(PlayerDetailsPage, {
      player: player
    });
  }
}
