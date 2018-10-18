import {Directive, ElementRef, Input, OnInit} from '@angular/core';

@Directive({ selector: '[setMinHeight]' })

export class SetMinHeightDirective implements OnInit{

    @Input() setMinHeight: number;
    element: ElementRef;

    constructor(el: ElementRef) {
        this.element = el;
    }

    ngOnInit(): void {
        this.element.nativeElement.style.minHeight = (window.innerHeight - this.setMinHeight) + "px";
    }
}