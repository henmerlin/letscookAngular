import { Component, OnInit, ViewChild } from '@angular/core';
import { Wizard } from "clarity-angular";

@Component({
    selector: 'publicar-receita-component',
    templateUrl: 'publicar-receita.component.html',
    styleUrls: ['publicar-receita.component.css']
})

export class PublicarReceitaComponent implements OnInit {

    @ViewChild("wizardmd") wizardMedium: Wizard;

    constructor() { }

    ngOnInit() {
    }

    mdOpen: boolean = true;

}