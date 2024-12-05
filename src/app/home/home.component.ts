import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent } from '@ionic/angular/standalone';

import { HeaderComponent } from '../header/header.component';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { FooterComponent } from '../footer/footer.component';
import { ShuffleComponent } from '../shuffle/shuffle.component';
import { gsap } from 'gsap';
// import { cube } from 'ionicons/icons';
// import model from '../../assets/facefull.glb'
import { CanvasCaseComponent } from '../canvas-case/canvas-case.component';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    imports: [IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, HeaderComponent, FooterComponent, ShuffleComponent, CanvasCaseComponent],
    standalone: true
})
export class HomeComponent  implements OnInit {  

  constructor() { 
  }

  ngOnInit() {
    this.init();
    // this.animate();
    // this.onWindowResize()
  }
    
  init() {

    console.log('nothing')
  }
}