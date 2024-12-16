import { Component, OnInit, inject, OnDestroy } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IonHeader, IonButtons, IonButton, IonMenuButton, IonIcon, IonLabel, IonToolbar, IonToggle } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, heartOutline, heartSharp, archiveOutline, archiveSharp, trashOutline, trashSharp, warningOutline, warningSharp, bookmarkOutline, bookmarkSharp } from 'ionicons/icons';
// import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DarkModeService } from '../darkmode.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    standalone: true,
    imports: [CommonModule, FormsModule, IonToggle,  RouterLink, RouterLinkActive, IonHeader, IonButtons, IonButton, IonMenuButton, IonIcon, IonLabel, IonToolbar],
    
})
export class HeaderComponent implements OnInit, OnDestroy {
  isDarkMode = false;
  lightIcon = 'assets/sunny-sharp.svg';
  darkIcon = 'assets/moon-sharp.svg';
  currentIcon = this.lightIcon;
  private darkModeSub: Subscription | null = null;
  private darkModeService = inject(DarkModeService);

  constructor() { 
    addIcons({ mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, heartOutline, heartSharp, archiveOutline, archiveSharp, trashOutline, trashSharp, warningOutline, warningSharp, bookmarkOutline, bookmarkSharp });
  } 

  ngOnInit(): void {
    this.darkModeSub = this.darkModeService.isDarkMode$
      .subscribe((isDark: boolean) => {
        this.isDarkMode = isDark;
        this.currentIcon = this.isDarkMode ? this.lightIcon : this.darkIcon;
    });
  }
  
  toggleDarkMode() {
    this.darkModeService.toggleDarkMode();
    this.currentIcon = this.isDarkMode ? this.lightIcon : this.darkIcon;
  }

  ngOnDestroy(): void {
    this.darkModeSub?.unsubscribe();
  }
}
