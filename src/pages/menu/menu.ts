import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav } from 'ionic-angular';
import { PlayerProfilePage } from '../player-profile/player-profile';
import { PlayerListPage } from '../player-list/player-list';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html'
})

export class MenuPage {
  @ViewChild(Nav) nav: Nav;

  // make PlayerListPage the root (or first) page
  rootPage = PlayerProfilePage;
  pages: Array<{ title: string, component: any }>;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen
  ) {
    // set our app's pages
    this.pages = [
      { title: 'My Profile', component: PlayerProfilePage },
      { title: 'Player List', component: PlayerListPage }
    ];
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}
