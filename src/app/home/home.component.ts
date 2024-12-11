import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { NgForOf } from '@angular/common';
// import { ActivatedRoute } from '@angular/router';
import { IonHeader, IonToolbar, IonButtons, IonButton, IonMenuButton, IonTitle, IonContent, IonGrid, IonCol, IonRow, IonIcon, IonLabel, IonList, IonItem } from '@ionic/angular/standalone';

import { HeaderComponent } from '../header/header.component';
// import * as THREE from 'three';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { FooterComponent } from '../footer/footer.component';
import { ShuffleComponent } from '../shuffle/shuffle.component';
import { gsap } from 'gsap';

// import model from '../../assets/facefull.glb'
import { CanvasCaseComponent } from '../canvas-case/canvas-case.component';

import { chevronDownOutline, sendOutline, rocketOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    imports: [NgForOf, IonItem, IonList, IonIcon, IonLabel, IonRow, IonCol, IonGrid, IonHeader, IonToolbar, IonButtons, IonButton, IonMenuButton, IonTitle, IonContent, HeaderComponent, FooterComponent, ShuffleComponent, CanvasCaseComponent],
    standalone: true
})
export class HomeComponent  implements OnInit, OnDestroy {  
  private timeline: GSAPTimeline | null = null;

  projects = [
    { title: 'Project 1', description: 'Description of project 1' },
    { title: 'Project 2', description: 'Description of project 2' },
    // Add more projects as needed
  ];

  constructor() { 
    addIcons({ chevronDownOutline, sendOutline, rocketOutline })
  }

  navigateToProjects() {
    // Implement navigation logic
  }

  navigateToContact() {
    // Implement navigation logic
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
