import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IonHeader, IonButtons, IonButton, IonMenuButton, IonIcon, IonLabel, IonToolbar, IonToggle } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, heartOutline, heartSharp, archiveOutline, archiveSharp, trashOutline, trashSharp, warningOutline, warningSharp, bookmarkOutline, bookmarkSharp } from 'ionicons/icons';
// import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    standalone: true,
    imports: [FormsModule, IonToggle,  RouterLink, RouterLinkActive, IonHeader, IonButtons, IonButton, IonMenuButton, IonIcon, IonLabel, IonToolbar],
    
})
export class HeaderComponent implements OnInit {
  isDarkMode = false;

  constructor() { 
    addIcons({ mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, heartOutline, heartSharp, archiveOutline, archiveSharp, trashOutline, trashSharp, warningOutline, warningSharp, bookmarkOutline, bookmarkSharp });
  } 

  ngOnInit(): void {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    this.isDarkMode = prefersDark.matches;
    this.applyDarkMode(this.isDarkMode)
  }
  
  toggleDarkMode(event: CustomEvent) {
    this.isDarkMode = (event.detail as any).checked;
    this.applyDarkMode(this.isDarkMode);
    
    localStorage.setItem('darkMode', JSON.stringify(this.isDarkMode));
  }

  private applyDarkMode(isDarkMode: boolean) {
    document.body.classList.toggle('dark', isDarkMode);
  }
}
