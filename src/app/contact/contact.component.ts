import { Component, OnInit, OnDestroy, inject, NgZone } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ReCaptchaV3Service } from 'ng-recaptcha-2';
import { Router } from '@angular/router';
import { Database, push, ref, set } from '@angular/fire/database';
import { UIService } from '../ui.service';
import { IonToolbar, IonTitle, IonContent, IonButton, IonInput, IonRow, IonGrid, IonCol, IonNote, IonItem, IonLabel, IonSpinner, IonCard, IonList, IonTextarea } from '@ionic/angular/standalone';

import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss'],
    standalone: true,
    imports: [IonList, IonTextarea, IonCard, IonItem, IonNote, IonCol, IonGrid, IonRow, IonInput, IonButton, IonToolbar, IonTitle, IonContent, HeaderComponent, FooterComponent, ReactiveFormsModule, CommonModule],
    
    // providers: [ReCaptchaV3Service]
})
export class ContactComponent  implements OnInit, OnDestroy {
  private db = inject(Database)
  private uiService = inject(UIService)
  private http = inject(HttpClient)
  private router = inject(Router)
  private zone = inject(NgZone)
  private recaptchaService = inject(ReCaptchaV3Service)
  private recaptchaSubscription!: Subscription;

  constructor() {
    // console.log('Database?', this.db)
    // console.log('HTTP', this.http)
  }

  isSubmitted = false;

  public errorMessages = {
    'name': [
      { type: 'required', message: 'Name is required' }
    ],
    'email': [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Please enter a valid email address' }
    ],
    'subject': [
      { type: 'required', message: 'Subject is required'}
    ],
    'message': [
      { type: 'required', message: 'Message is required'}
    ]
  };

  contactForm: FormGroup = new FormGroup({
    name: new FormControl('', { validators: [Validators.required] }),
    email: new FormControl('', Validators.compose([Validators.required,
    Validators.pattern('^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$')])),
    subject: new FormControl('', { validators: [Validators.required] }),
    message: new FormControl('', { validators: [Validators.required] })
  });

  ngOnInit() {
    console.log('contact')
  }

  onSubmit() {
    this.recaptchaSubscription = this.recaptchaService.execute('contact')
    .subscribe((token) => {
      console.log(token, 'token')
      this.verifyRecaptcha(token);
    })
  }

  verifyRecaptcha(token: string) {
    // const url = 'https://us-central1-ionicwebpage.cloudfunctions.net/checkRecaptcha';
    const url = 'https://us-central1-ionicwebpagev3.cloudfunctions.net/checkRecaptcha';
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
      
    this.http.post(url, { token }, { headers }).subscribe((response: any) => {
      console.log(response, 'response')
      this.zone.run(() => {
        const score = response.score;
        console.log(response, 'data')
        if (score >= 0.5) {
          this.isSubmitted = true
          const value = this.contactForm.value;
          const name = value.name;
          const email = value.email;
          const subject = value.subject;
          const message = value.message;
          const formRequest = { name, email, subject, message };
          const messagesRef = ref(this.db, '/messages');
          const newMessageRef = push(messagesRef);
          set(newMessageRef, { ...formRequest })
            .then(() => {
              // console.log(formRequest, 'What is showing here');
              this.contactForm.reset();
              this.uiService.presentToast('Your message was sent', 4000);
              this.router.navigate(['/']);
            })
            .catch((error) => {
              // console.log(error, 'Error in sending message');
              this.uiService.presentToast('Error in sending message', 4000);
              this.contactForm.reset();
              this.isSubmitted = false;
              this.router.navigate(['/']);
              throw error;
            });
        } else {
          this.uiService.presentToast('Please complete the reCAPTCHA', 4000);
          console.log('There was an error with recaptcha')
        }
      })
    })
  }

  ngOnDestroy():void {
    if (this.recaptchaSubscription) {
      this.recaptchaSubscription.unsubscribe();
    }
    const recaptchaBadges = document.getElementsByClassName('grecaptcha-badge'); 
    console.log(recaptchaBadges, "what element ffs")
    while (recaptchaBadges.length > 0) { 
      const badge = recaptchaBadges[0];
      if (badge && badge.parentNode) {
        badge.parentNode.removeChild(badge);
      }
    }
  }
}


