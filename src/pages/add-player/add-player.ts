import { Component } from '@angular/core';

import { ViewController } from 'ionic-angular';

import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'page-add-player',
  templateUrl: 'add-player.html'
})

export class AddPlayerPage {
  private addPlayerForm: FormGroup;

  constructor(public viewCtrl: ViewController, private formBuilder: FormBuilder) {
    this.addPlayerForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
  
  addPlayer(){
    console.log("Added player " + this.addPlayerForm.value.name);
    this.dismiss();
  }
}
