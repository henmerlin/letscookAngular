import { Categoria } from './../../../viewmodel/template/receita/categoria';
import { AlertService } from 'app/service/alert.service';
import { Receita } from 'app/viewmodel/template/receita/receita';
import { CategoriaService } from 'app/template/categoria/categoria.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css'],
  providers: [CategoriaService]
})
export class CategoriaComponent implements OnInit {

  private receitas: Receita[];

  private categoria: Categoria;

  constructor(
    private serv: CategoriaService,
    private alert: AlertService,
    private route: ActivatedRoute) { }

  ngOnInit() {

    this.categoria = new Categoria()
    this.categoria.id = Number(this.route.snapshot.paramMap.get('id'));
    this.serv.getById(this.categoria)
      .then(data => {
        this.categoria = data;
      }, error => {
        this.alert.error("Ocorreu um erro ao buscar!");
      });
  }

  private listarReceitas() {
    this.serv.list()
      .then(data => {
      }, error => {
        this.alert.error("Ocorreu um erro ao buscar!");
      });
  }
}