import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonGrid, IonCol, IonRow } from '@ionic/angular/standalone';

import { HeaderComponent } from '../header/header.component';
// import * as THREE from 'three';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { FooterComponent } from '../footer/footer.component';
import { ShuffleComponent } from '../shuffle/shuffle.component';
import { gsap } from 'gsap';

// import model from '../../assets/facefull.glb'
import { CanvasCaseComponent } from '../canvas-case/canvas-case.component';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    imports: [IonRow, IonCol, IonGrid, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, HeaderComponent, FooterComponent, ShuffleComponent, CanvasCaseComponent],
    standalone: true
})
export class HomeComponent  implements OnInit, OnDestroy {  
  private timeline: GSAPTimeline | null = null;

  constructor() { 
  }

  ngOnInit() {
    this.init();
    // this.animate();
    // this.onWindowResize()
  }

  ngOnDestroy() {
    if (this.timeline) {
      this.timeline.kill();
    }
  }
    
  init() {
    this.timeline = gsap.timeline({ 
      defaults: {
        duration: 2, 
        ease: 'power1.in',
        delay: 1
      } 
    });
    this.timeline.fromTo('.canvasWrapper', { opacity: 0 },
      { opacity: 1, duration: 1.7, ease: 'sin.inOut' }
    );
    console.log('nothing')
  }
}
