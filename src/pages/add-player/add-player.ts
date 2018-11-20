import { Component } from '@angular/core';

import { ViewController } from 'ionic-angular';

@Component({
  selector: 'page-add-player',
  templateUrl: 'add-player.html'
})

export class AddPlayerPage {
  constructor(public viewCtrl: ViewController) {
    
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
