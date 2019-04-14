import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';
import { FirebaseService } from '../../services/firebase.service';
import { GroupDetailsPage } from '../group-details/group-details';

@Component({
  selector: 'page-group-list',
  templateUrl: 'group-list.html',
})
export class GroupListPage {
  groups: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private authService: AuthService,
    private firebaseService: FirebaseService
  ) { }

  ionViewWillLoad() {
    this.getData();
  }

  getData() {
    this.firebaseService.getCurrentPlayerGroups(this.authService.getCurrentPlayer().uid).subscribe(groups => {
      this.groups = groups;
    });
  }

  openAddGroupModal() {
    // TODO change this
    console.log('add group');
  }

  viewGroupDetails(group) {
    this.navCtrl.push(GroupDetailsPage, { group });
  }
}
