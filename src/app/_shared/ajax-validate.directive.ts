import {Directive, Input} from '@angular/core';
import {AbstractControl, FormControl, NG_VALIDATORS, ValidatorFn} from "@angular/forms";


export function serverError(server: string): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
        return control.value === server ? {'server': {value: control.value}} : null;
    };
}

@Directive({
    selector: '[server]',
    providers: [
        {provide: NG_VALIDATORS, useExisting: EmailValidator, multi: true}
    ]
})
export class EmailValidator {
    @Input() server: string;

    validate(control: AbstractControl): {[key: string]: any} {
        return this.server ? serverError(this.server)(control) : null;
    }
}