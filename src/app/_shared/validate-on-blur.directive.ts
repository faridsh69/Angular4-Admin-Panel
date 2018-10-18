import {Component, Input, Directive, EventEmitter, HostListener} from '@angular/core';

import { NG_VALIDATORS,Validator,Validators,AbstractControl,ValidatorFn } from '@angular/forms';


@Directive({
  selector: '[validateOnBlur]', 
})

export class ValidateOnBlurDirective {
  // @Input('validateFormControl') validateFormControl;

  constructor() { } 
  // @HostListener('focus', ['$event.target'])
  //   onFocus(target) {    
  //   this.validateFormControl.markAsUntouched();
  //       }
  // @HostListener('focusout', ['$event.target'])
  // onFocusout(target) {
  //   this.validateFormControl.markAsTouched();
  // }
}