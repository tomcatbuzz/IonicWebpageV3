import { Directive, ElementRef, inject, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appScrollbar3]',
  standalone: true
})
export class ScrollbarDirective implements OnInit {
  @Input() scrollbar: string = '';
  @Input() allowAllScreens: boolean | string = false;

  private elementRef = inject(ElementRef);

  constructor() { }

  ngOnInit() {
    const element = this.elementRef.nativeElement;
    if (element?.tagName === 'ION-CONTENT') {
      const styles = document.createElement('style');
      styles.textContent = this.scrollbar || this.getCustomStyles();
      document.head.appendChild(styles);
    }
  }

  private getCustomStyles() {
    const baseStyles = `
    ion-content::part(scroll) {
    --scrollbar-width: 12px;
    --scrollbar-background: #fff;
    --scrollbar-thumb-background: #ccc
    }
    
    ion-content::part(scroll)::-webkit-scrollbar {
        width: var(--scrollbar-width);
      }

      ion-content::part(scroll)::-webkit-scrollbar-track {
        background: var(--scrollbar-background);
      }

      ion-content::part(scroll)::-webkit-scrollbar-thumb {
        background: var(--scrollbar-thumb-background);
      }
    `;

    return this.allowAllScreens === true || this.allowAllScreens === 'true'
      ? baseStyles
      : `@media(pointer: fine) { ${baseStyles} }`;
  }

}
