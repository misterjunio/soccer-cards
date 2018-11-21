import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { AuthService } from '../services/auth.service';
import { FirebaseService } from '../services/firebase.service';
import { NewPlayerModalPage } from '../new-player-modal/new-player-modal';
import { PlayerDetailsPage } from '../player-details/player-details';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-player-list',
  templateUrl: 'player-list.html'
})
export class PlayerListPage {
  players: Array<any>;

  constructor(
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private authService: AuthService,
    private firebaseService: FirebaseService
  ) {}

  ionViewWillEnter(){
    this.getData();
  }

  getData(){
    this.firebaseService.getFriends()
    .then(players => {
      this.players = players;
    })
  }

  viewPlayerDetails(id, player){
    // debugger
    let data = {
      name: player.name,
      status: player.status,
      image: player.image,
      id: id
    }
    this.navCtrl.push(PlayerDetailsPage, {
      data: data
    })
  }

  openAddPlayerModal() {
    const modal = this.modalCtrl.create(NewPlayerModalPage);
    modal.onDidDismiss(data => {
      this.getData();
    });
    modal.present();
  }

  logout(){
    this.authService.doLogout()
    .then(res => {
      this.navCtrl.push(LoginPage);
    })
  }
}
