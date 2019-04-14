import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'page-group-details',
  templateUrl: 'group-details.html',
})
export class GroupDetailsPage {
  group: any;
  friends: any = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private authService: AuthService,
    private firebaseService: FirebaseService
  ) { }

  ionViewWillLoad() {
    this.getData()
  }

  getData() {
    this.group = this.navParams.get('group');
    this.firebaseService.getGroupFriends(this.authService.getCurrentPlayer().uid, this.group.id)
    .subscribe(myFriends => {
      this.friends = [];
      myFriends.forEach((myFriend, index) => {
        this.friends.push(myFriend);
        this.firebaseService.getPlayer(myFriend.id).subscribe(friend => {
          this.friends[index] = Object.assign(this.friends[index], friend);
        })
      })
    });
  }
}
