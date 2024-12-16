import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {
  private _isDarkMode = new BehaviorSubject<boolean>(false);
  isDarkMode$ = this._isDarkMode.asObservable();

  constructor() {
    this.initializeDarkMode();
  }

  private initializeDarkMode() {
    const savedMode = localStorage.getItem('darkMode');
    
    if (savedMode !== null) {
      const isDark = JSON.parse(savedMode);
      this._isDarkMode.next(isDark);
      this.applyDarkMode(isDark);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
      this._isDarkMode.next(prefersDark.matches);
      this.applyDarkMode(prefersDark.matches);
    }
  }

  toggleDarkMode() {
    const currentMode = this._isDarkMode.getValue();
    const newMode = !currentMode;
    
    this._isDarkMode.next(newMode);
    this.applyDarkMode(newMode);
    localStorage.setItem('darkMode', JSON.stringify(newMode));
  }

  private applyDarkMode(isDarkMode: boolean) {
    document.body.classList.toggle('dark', isDarkMode);
    // document.body.classList.add('transition');
  }
}