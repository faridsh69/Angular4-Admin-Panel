import {Directive, ElementRef, HostListener, OnInit} from '@angular/core';

@Directive({selector: '[directionDetect]'})
export class DirectionDetectDirective implements OnInit{



    element: ElementRef;

    constructor(el: ElementRef) {
        this.element = el;
    }

    ngOnInit(): void {
        setTimeout(() => this.inputDirDetect(), 50);
    }


    @HostListener('keyup') onKeyup() {
        this.inputDirDetect();
    }

    @HostListener('paste') OnPaste() {
        this.inputDirDetect();
    }

    private inputDirDetect(){
        const value = this.element.nativeElement.value;
        if(!value){
            this.element.nativeElement.style.direction = "rtl";
            return;
        }
        if(this.isUnicode(value)){
            this.element.nativeElement.style.direction = "rtl";
        }else{
            this.element.nativeElement.style.direction = "ltr";
        }
    }

    private isUnicode(str: string): boolean {
        var letters: any = [];
        for (var i = 0; i <= str.length; i++) {
            letters[i] = str.substring((i - 1), i);
            if (letters[i].charCodeAt() > 255) { return true; }
        }
        return false;
    }
}