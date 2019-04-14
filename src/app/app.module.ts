import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { SoccerCardsApp } from './app.component';

import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { MenuPage } from '../pages/menu/menu';
import { PlayerProfilePage } from '../pages/player-profile/player-profile';
import { PlayerListPage } from '../pages/player-list/player-list';
import { PlayerDetailsPage } from '../pages/player-details/player-details';
import { NewPlayerModalPage } from '../pages/new-player-modal/new-player-modal';
import { GroupListPage } from '../pages/group-list/group-list';
import { GroupDetailsPage } from '../pages/group-details/group-details';

import { FirebaseService } from '../services/firebase.service';
import { AuthService } from '../services/auth.service';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ImagePicker } from '@ionic-native/image-picker';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environment/environment';

@NgModule({
  declarations: [
    SoccerCardsApp,
    LoginPage,
    RegisterPage,
    MenuPage,
    PlayerProfilePage,
    PlayerListPage,
    PlayerDetailsPage,
    NewPlayerModalPage,
    GroupListPage,
    GroupDetailsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(SoccerCardsApp),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    SoccerCardsApp,
    LoginPage,
    RegisterPage,
    MenuPage,
    PlayerProfilePage,
    PlayerListPage,
    PlayerDetailsPage,
    NewPlayerModalPage,
    GroupListPage,
    GroupDetailsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    FirebaseService,
    AuthService,
    ImagePicker,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
