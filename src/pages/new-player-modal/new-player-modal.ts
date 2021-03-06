import { Component } from '@angular/core';
import { ViewController, normalizeURL, ToastController, LoadingController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';
import { ImagePicker } from '@ionic-native/image-picker';

@Component({
  selector: 'page-new-player-modal',
  templateUrl: 'new-player-modal.html'
})
export class NewPlayerModalPage {
  addPlayerForm: FormGroup;
  image: any;
  loading: any;
  pace: number = 0;
  acceleration: number;
  sprintSpeed: number;
  shooting: number = 0;
  shotPositioning: number;
  shotPower: number;
  errorMessage: string = '';
  validationMessages = {
    'name': [
      { type: 'required', message: 'Name is required.' }
    ],
    'pace': {
      'acceleration': [
        { type: 'required', message: 'Acceleration is required.' },
        { type: 'min', message: 'Values must be above 0.' },
        { type: 'max', message: 'Values must be below 100.' }
      ],
      'sprintSpeed': [
        { type: 'required', message: 'Sprint Speed is required.' },
        { type: 'min', message: 'Values must be above 0.' },
        { type: 'max', message: 'Values must be below 100.' }
      ]
    },
    'shooting': {
      'shotPositioning': [
        { type: 'required', message: 'Positioning is required.' },
        { type: 'min', message: 'Values must be above 0.' },
        { type: 'max', message: 'Values must be below 100.' }
      ],
      'shotPower': [
        { type: 'required', message: 'Power is required.' },
        { type: 'min', message: 'Values must be above 0.' },
        { type: 'max', message: 'Values must be below 100.' }
      ]
    }
 };

  constructor(
    private viewCtrl: ViewController,
    private toastCtrl: ToastController,
    private formBuilder: FormBuilder,
    private imagePicker: ImagePicker,
    private firebaseService: FirebaseService,
    private loadingCtrl: LoadingController
  ) {
    this.loading = this.loadingCtrl.create();
  }

  ionViewWillLoad() {
    this.resetFields();
  }

  resetFields() {
    this.image = "./assets/imgs/default_player.png";
    this.addPlayerForm = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      acceleration: new FormControl('', Validators.compose([
        Validators.required,
        Validators.min(0),
        Validators.max(100)
      ])),
      sprintSpeed: new FormControl('', Validators.compose([
        Validators.required,
        Validators.min(0),
        Validators.max(100)
      ])),
      shotPositioning: new FormControl('', Validators.compose([
        Validators.required,
        Validators.min(0),
        Validators.max(100)
      ])),
      shotPower: new FormControl('', Validators.compose([
        Validators.required,
        Validators.min(0),
        Validators.max(100)
      ]))
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  addPlayer(value) {
    let skills = {
      'acceleration': this.acceleration,
      'sprintSpeed': this.sprintSpeed,
      'shotPositioning': this.shotPositioning,
      'shotPower': this.shotPower
    };
    let data = {
      name: value.name,
      status: 'To do',
      image: this.image,
      skills: skills
    };
    this.firebaseService.createFriend(data)
    .then(res => {
        this.resetFields();
        let toast = this.toastCtrl.create({
          message: 'Player was added successfully',
          duration: 2000
        });
        toast.present();
        this.viewCtrl.dismiss();
      }, err => {
        this.errorMessage = err.message;
      }
    )
  }

  openImagePicker() {
    this.imagePicker.hasReadPermission()
    .then((result) => {
      if(result == false) {
        // no callbacks required as this opens a popup which returns async
        this.imagePicker.requestReadPermission();
      }
      else if(result == true){
        this.imagePicker.getPictures({
          maximumImagesCount: 1
        }).then(
          (results) => {
            for (var i = 0; i < results.length; i++) {
              this.uploadImageToFirebase(results[i]);
            }
          }, (err) => console.log(err)
        );
      }
    }, (err) => {
      console.log(err);
    });
  }

  uploadImageToFirebase(image) {
    this.loading.present();
    image = normalizeURL(image);
    let randomId = Math.random().toString(36).substr(2, 5);

    // uploads img to firebase storage
    this.firebaseService.uploadImage(image, randomId)
    .then(photoURL => {
      this.image = photoURL;
      this.loading.dismiss();
      let toast = this.toastCtrl.create({
        message: 'Image was updated successfully',
        duration: 2000
      });
      toast.present();
      })
  }

  onChangePace() {
    this.pace = Math.round((this.acceleration * 0.45 || 0) + (this.sprintSpeed * 0.55 || 0));
  }

  onChangeShooting() {
    this.shooting = Math.round((this.shotPositioning * 0.5 || 0) + (this.shotPower * 0.5 || 0));
  }
}
