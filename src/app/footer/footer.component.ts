import { Component, OnInit } from '@angular/core';
import { IonHeader, IonButtons, IonButton, IonMenuButton, IonIcon, IonLabel, IonToolbar } from "@ionic/angular/standalone";

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
    imports: [IonToolbar, IonButtons, IonButton, IonIcon],
    standalone: true
})
export class FooterComponent  implements OnInit {
  
  github = 'https://github.com/tomcatbuzz';
  linkedin = 'https://www.linkedin.com/in/anthony-buzzelli-8843ab21/';
  codepen = 'https://codepen.io/tomcatbuzz/';
  twitter = 'https://x.com/tomcatbuzz';

  constructor() { }

  currentYear: number = new Date().getFullYear();

  openGithub() {
    window.open(this.github, 'noopener');
  }

  openLinkedin() {
    window.open(this.linkedin, 'noopener');
  }

  openCodepen() {
    window.open(this.codepen, 'noopener');
  }

  openTwitter() {
    window.open(this.twitter, 'noopener');
  }

  ngOnInit() {
    console.log('footer');
    
  }

}

