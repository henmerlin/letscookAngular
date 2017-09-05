import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'publicar-receita-component',
    templateUrl: 'publicar-receita.component.html',
    styleUrls: ['publicar-receita.component.css']
})

export class PublicarReceitaComponent implements OnInit {
    step2: any = {
        showNext: true,
        showPrev: true
    };

    step3: any = {
        showSecret: false
    };

    data: any = {
        email: 'muk@gmail.com'
    };

    isCompleted: boolean = false;

    constructor() { }

    ngOnInit() {
    }

    onStep1Next(event) {
        console.log('Step1 - Next');
    }

    onStep2Next(event) {
        console.log('Step2 - Next');
    }

    onStep3Next(event) {
        console.log('Step3 - Next');
    }

    onComplete(event) {
        this.isCompleted = true;
    }

    onStepChanged(step) {
        console.log('Changed to ' + step.title);
    }

}