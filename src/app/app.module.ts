import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { SoccerCardsApp } from './app.component';

import { PlayerListPage } from '../pages/player-list/player-list';
import { PlayerDetailsPage } from '../pages/player-details/player-details';
import { AddPlayerPage } from '../pages/add-player/add-player';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    SoccerCardsApp,
    PlayerListPage,
    PlayerDetailsPage,
    AddPlayerPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(SoccerCardsApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    SoccerCardsApp,
    PlayerListPage,
    PlayerDetailsPage,
    AddPlayerPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
