import { Ingrediente } from './../../../viewmodel/template/receita/ingrediente';
import { IngredienteService } from './../ingrediente.service';
import { state } from '@angular/animations';
import { CropperSettings, ImageCropperComponent } from 'ng2-img-cropper';
import { AlertService } from 'app/service/alert.service';
import { Component, OnInit, Input, ViewContainerRef, ViewChild } from '@angular/core';

@Component({
    selector: 'cadastrar-ingrediente',
    templateUrl: 'cadastrar-ingrediente.component.html',
    styleUrls: ['cadastrar-ingrediente.component.css'],
    providers: [IngredienteService]
})


export class CadastrarIngredienteComponent implements OnInit {

    private loading: boolean = false;

    private ingrediente: Ingrediente = new Ingrediente();

    private ingredientes: Ingrediente[];

    private ingredienteMod: Ingrediente;
    private btnModIngredienteDisable: boolean = false;
    private modalOpenCloseStatus: boolean = false;

    public cropperSettings: CropperSettings;
    public img: any;
    public imgMod: any;

    private showImg: boolean = false;

    @ViewChild('cropper', undefined)
    cropper: ImageCropperComponent;

    constructor(
        private ingredienteService: IngredienteService,
        private alertService: AlertService) {
        this.preparaCropper()
    }

    public ngOnInit() {
        this.listarIngredientes();
    }

    preparaCropper() {
        this.img = {}
        this.imgMod = {}
        this.cropperSettings = new CropperSettings();
        this.cropperSettings.noFileInput = true;
        this.cropperSettings = new CropperSettings();
        this.cropperSettings.width = 350;
        this.cropperSettings.height = 200;
        this.cropperSettings.croppedWidth = 350;
        this.cropperSettings.croppedHeight = 200;
        this.cropperSettings.canvasWidth = 350;
        this.cropperSettings.canvasHeight = 200;
    }

    public validation(): boolean {
        if (this.ingrediente.imagem
            && this.ingrediente.nome) {
            return true;
        }
        return false;
    }

    private fileChangeListener($event) {
        var image: any = new Image();
        var file: File = $event.target.files[0];
        var myReader: FileReader = new FileReader();
        var that = this;
        myReader.onloadend = function (loadEvent: any) {
            image.src = loadEvent.target.result;
            that.cropper.setImage(image);
            that.ingrediente.imagem = image.src;
        };
        myReader.readAsDataURL(file);
        this.imageToBase64($event);
    }

    private imageToBase64(evt) {
        var files = evt.target.files;
        var file = files[0];
        if (files && file) {
            var reader = new FileReader();
            reader.onload = this._handleReaderLoaded.bind(this);
            reader.readAsBinaryString(file);
        }
    }

    private _handleReaderLoaded(readerEvt) {
        var binaryString = readerEvt.target.result;
        this.imgMod.image = "data:image/jpeg;base64," + btoa(binaryString);
    }

    private fileChangeListenerMod($event) {
        var image: any = new Image();
        var file: File = $event.target.files[0];
        var myReader: FileReader = new FileReader();
        var that = this;
        myReader.onloadend = function (loadEvent: any) {
            image.src = loadEvent.target.result;
            that.cropper.setImage(image);
            that.ingredienteMod.imagem = image.src;
        };
        myReader.readAsDataURL(file);
        this.imageToBase64Mod($event);
    }

    private imageToBase64Mod(evt) {
        var files = evt.target.files;
        var file = files[0];
        if (files && file) {
            var reader = new FileReader();
            reader.onload = this._handleReaderLoadedMod.bind(this);
            reader.readAsBinaryString(file);
        }
    }

    private _handleReaderLoadedMod(readerEvt) {
        var binaryString = readerEvt.target.result;
        this.imgMod.image = "data:image/jpeg;base64," + btoa(binaryString);
    }

    private abort() {
        this.img = {}
        this.ingrediente = new Ingrediente();
    }

    private cadastrarIngrediente() {
        if (this.validation()) {
            this.loading = true;
            this.ingredienteService.cadastrar(this.ingrediente).then(data => {
                this.loading = false;
                this.alertService.info('Ingrediente ' + data.nome + ' cadastrado!');
                this.abort();
            }, error => {
                this.alertService.error('Ocorreu um erro ao cadastrar Ingrediente!');
                this.abort();
            });
        }
    }

    private listarIngredientes() {
        this.loading = true;
        this.ingredienteService.list()
            .then(data => {
                this.ingredientes = data;
                this.loading = false;
            }, error => {
                this.alertService.error("Ocorreu um erro ao buscar Ingredientes!");
                this.loading = false;
            })
    }

    private atualizarIngrediente() {
        this.btnModIngredienteDisable = true;
        this.ingredienteService.atualizar(this.ingredienteMod)
            .then(data => {
                this.btnModIngredienteDisable = false;
                this.alertService.info("Ingrediente " + data.nome + " atualizado com sucesso.");
                this.modalOpenCloseStatus = false;
                this.ingredientes = null;
                this.listarIngredientes();
            }, error => {
                this.alertService.error("Ocorreu um erro ao Atualizar Ingrediente!");
                this.btnModIngredienteDisable = false;
                this.modalOpenCloseStatus = true;
            });
    }

    private findAndSpliceAddArrayIngrediente(ingrediente: Ingrediente) {
        this.ingredientes.forEach(ing => {
            if (ing.id === ingrediente.id) {

            }
        });
    }

    private modificaIngrediente(ingrediente: Ingrediente) {
        this.ingredienteMod = ingrediente;
        this.modalOpenCloseStatus = true;
    }

}
