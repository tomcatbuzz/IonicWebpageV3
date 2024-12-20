import { Directive, ElementRef, Renderer2, Input, AfterViewInit, inject } from '@angular/core';

@Directive({
  selector: 'ion-content[appScrollbar]',
  standalone: true
})
export class ScrollbarDirective implements AfterViewInit {
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  @Input() scrollbarColor: string = 'rgba(0, 0, 0, 0.5)';
  @Input() scrollbarTrackColor: string = 'rgba(0, 0, 0, 0.1)';
  @Input() scrollbarWidth: string = '8px';

  ngAfterViewInit() {
    // Wait for Ionic components to be fully initialized
    setTimeout(() => {
      const scrollElement = this.el.nativeElement.shadowRoot?.querySelector('.inner-scroll');
      console.log(scrollElement, 'scroll')
      if (scrollElement) {
        const styleElement = this.renderer.createElement('style');
        const styles = `
          .inner-scroll::-webkit-scrollbar {
            width: ${this.scrollbarWidth};
          }

          .inner-scroll::-webkit-scrollbar-thumb {
            // background-color: ${this.scrollbarColor};
            background-color: var(--scrollbar-thumb-light);
            border-radius: 20px;
            border: 2px solid transparent;
            background-clip: padding-box;
          }

          .inner-scroll::-webkit-scrollbar-track {
            // background-color: ${this.scrollbarTrackColor};
            background-color: var(--scrollbar-track-light);
          }
        `;

        styleElement.textContent = styles;
        this.renderer.appendChild(scrollElement, styleElement);
      }
    }, 0);
  }
}