import { bootstrapApplication } from '@angular/platform-browser';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { environment } from './environments/environment';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAnalytics, provideAnalytics, ScreenTrackingService } from '@angular/fire/analytics';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getFunctions, provideFunctions } from '@angular/fire/functions';
import { getStorage, provideStorage } from '@angular/fire/storage';

import { provideHttpClient, withFetch } from '@angular/common/http';
import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module } from "ng-recaptcha-2";
import { pageTransition } from './app/animations/nav-animation';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular({ navAnimation: pageTransition }),
    provideRouter(routes, withPreloading(PreloadAllModules)), 
    provideFirebaseApp(() => initializeApp({"projectId":"ionicwebpagev3","appId":"1:183555852708:web:70fdac704d39e58a765931","storageBucket":"ionicwebpagev3.firebasestorage.app","apiKey":"AIzaSyC1Q-IhdaZZEHX6a5mp26V1I_EhxISWbkA","authDomain":"ionicwebpagev3.firebaseapp.com","messagingSenderId":"183555852708","measurementId":"G-NLVGSGDM31"})), 
    provideAnalytics(() => getAnalytics()), 
    ScreenTrackingService, 
    provideDatabase(() => getDatabase()), 
    provideFunctions(() => getFunctions()), 
    provideStorage(() => getStorage()),
    provideHttpClient(withFetch()),

    importProvidersFrom(RecaptchaV3Module),
    { provide: RECAPTCHA_V3_SITE_KEY, useValue: environment.recaptcha.siteKey },
  ],
});
