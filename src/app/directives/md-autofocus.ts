import { Directive, ElementRef, AfterContentInit } from '@angular/core';

@Directive({
  selector: '[my-md-autofocus]' // using [ ] means selecting attributes		
})
export class MdAutofocus implements AfterContentInit {
  
  constructor(private elementRef: ElementRef) { }

  ngAfterContentInit() {
    this.elementRef.nativeElement.querySelector('input').focus();
  }
}
