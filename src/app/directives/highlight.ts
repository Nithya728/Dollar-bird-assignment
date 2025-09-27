import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class Highlight {

 @Input() appHighlight: string = '#f8f9fa';
  @Input() defaultColor: string = 'transparent';
  @Input() highlightClass: string = 'highlighted';

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @HostListener('mouseenter') onMouseEnter() {
    this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', this.appHighlight);
    this.renderer.addClass(this.el.nativeElement, this.highlightClass);
    this.renderer.setStyle(this.el.nativeElement, 'transform', 'translateY(-2px)');
    this.renderer.setStyle(this.el.nativeElement, 'transition', 'all 0.3s ease');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', this.defaultColor);
    this.renderer.removeClass(this.el.nativeElement, this.highlightClass);
    this.renderer.setStyle(this.el.nativeElement, 'transform', 'translateY(0)');
  }
}