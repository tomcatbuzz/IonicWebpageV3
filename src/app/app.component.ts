import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IonApp, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { homeSharp,homeOutline, mailSharp, mailOutline, helpSharp, helpOutline, appsSharp, appsOutline } from 'ionicons/icons';
// import { LoadingComponent } from './loading/loading.component';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
    standalone: true,
    imports: [RouterLink, RouterLinkActive, CommonModule, IonApp, IonMenu, IonContent, IonList, IonListHeader, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet],
    
})
export class AppComponent {
  
  public appPages = [
    { title:'Home', url: '/home', icon: 'home' },
    { title: 'About', url: '/about', icon: 'help' },
    { title: 'Projects', url: '/projects', icon: 'apps' },
    { title: 'Contact', url: '/contact', icon: 'mail' }
  ]

  constructor() {
    addIcons({ homeSharp, homeOutline, mailSharp, mailOutline, helpSharp, helpOutline, appsSharp, appsOutline });
  }
}
