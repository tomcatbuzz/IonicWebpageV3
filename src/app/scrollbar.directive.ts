import { Directive, ElementRef, Renderer2, Input, AfterViewInit, OnInit, inject } from '@angular/core';

@Directive({
  selector: '[appScrollbar]',
  standalone: true
})
export class ScrollbarDirective implements AfterViewInit {
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);
  @Input() scrollbarColor: string = 'rgba(0, 0, 0, 0.5)';
  @Input() scrollbarTrackColor: string = 'rgba(0, 0, 0, 0.1)';

  constructor() {}

  ngAfterViewInit() {
  // ngOnInit() {
    const scrollableElement = this.el.nativeElement.shadowRoot 
      ? this.el.nativeElement.shadowRoot.querySelector('.inner-scroll') 
      : this.el.nativeElement;

      console.log(".inner-scroll", "scroll??")

    if (scrollableElement) {
      this.applyStyles(scrollableElement);
    }
  }

  private applyStyles(scrollableElement: HTMLElement) {
    const styles = `
      ::-webkit-scrollbar {
        width: 18px;
        // height: 8px;
      }
      ::-webkit-scrollbar-thumb {
        background-color: ${this.scrollbarColor};
        border-radius: 20px;
        border: 3px solid transparent;
        background-clip: content-box;
      }
      ::-webkit-scrollbar-track {
        background-color: ${this.scrollbarTrackColor};
      }
    `;

    const styleSheet = this.renderer.createElement('style');
    styleSheet.type = 'text/css';
    styleSheet.textContent = styles;
    this.renderer.appendChild(scrollableElement, styleSheet);
  }
}
