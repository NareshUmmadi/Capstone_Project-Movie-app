import { Directive, ElementRef, HostBinding, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appZoomHover]'
})
export class ZoomHoverDirective{

  constructor(private elementRef:ElementRef,private renderer2:Renderer2) {
    this.elementRef.nativeElement.style.transition="transform .3s";
  }

  @HostListener("mouseenter")
  zoomIn(){
    this.elementRef.nativeElement.style.transform="scale(1.05)";
    this.elementRef.nativeElement.style.zIndex="2";
  }
  @HostListener("mouseleave")
  zoomOut(){
    this.elementRef.nativeElement.style.transform="scale(1)";
  }




}
