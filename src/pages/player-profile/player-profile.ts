import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'page-player-profile',
  templateUrl: 'player-profile.html',
})
export class PlayerProfilePage {
  player: any;
  myProfileForm: FormGroup;
  validationMessages = {
    'name': [
      { type: 'required', message: 'Name is required.' }
    ],
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please enter a valid email.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 6 characters long.' }
    ]
 };
 editDisabled: boolean = true;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private authService: AuthService,
    private firebaseService: FirebaseService,
    private formBuilder: FormBuilder
  ) { }

  ionViewWillLoad() {
    this.getData();
    this.myProfileForm = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ])),
    });
  }

  getData() {
    const currentPlayer = this.authService.getCurrentPlayer();
    this.firebaseService.getPlayer(currentPlayer.uid).subscribe(player => {
      this.player = player;
      this.myProfileForm.controls['name'].setValue(this.player.name);
      this.myProfileForm.controls['email'].setValue(currentPlayer.email);
    });
  }

  editForm() {
    this.editDisabled = false;
  }

  updatePlayer(playerData) {
    // TODO change this
    console.log(playerData);
  }

  openImagePicker() {
    // TODO change this
    console.log(this.player);
  }
}
