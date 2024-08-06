import {Directive, ElementRef, Input, OnChanges, Renderer2} from '@angular/core';

@Directive({
  selector: '[appAvailabilityColor]',
  standalone: true
})
export class AvailabilityColorDirective implements OnChanges {
  @Input() appAvailabilityColor: number = 0;

  constructor(private el: ElementRef, private renderer: Renderer2) {
  }

  ngOnChanges() {
    this.updateColor();
  }

  private updateColor() {
    let color: string;
    let text: string;

    if (this.appAvailabilityColor > 10) {
      color = 'green';
      text = 'In stock';
    } else if (this.appAvailabilityColor > 0 && this.appAvailabilityColor <= 10) {
      color = 'orange';
      text = 'Almost sold out';
    } else {
      color = 'red';
      text = 'Out of stock';
    }

    this.renderer.setStyle(this.el.nativeElement, 'color', color);
    this.renderer.setProperty(this.el.nativeElement, 'textContent', text);
  }
}
