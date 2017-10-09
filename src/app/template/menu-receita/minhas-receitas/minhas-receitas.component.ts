import { ComponentInfo } from 'app/viewmodel/template/componentInfo';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'minhas-receitas-component',
    templateUrl: 'minhas-receitas.component.html',
    styleUrls: ['minhas-receitas.component.css']
})

export class MinhasReceitasComponent implements OnInit, ComponentInfo {
    component: any;
    nome: string;

    constructor() { 
        this.nome = "Minhas Receitas"
    }

    ngOnInit() { }
}