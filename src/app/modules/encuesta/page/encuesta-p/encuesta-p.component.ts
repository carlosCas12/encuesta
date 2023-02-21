import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Filter } from '../../models/encuesta.model';
import { EncuestaService } from '../../services/encuesta.service';

@Component({
  selector: 'app-encuesta-p',
  templateUrl: './encuesta-p.component.html',
  styleUrls: ['./encuesta-p.component.css']
})
export class EncuestaPComponent implements OnInit {

  listFilter = {
    filProvincia: [],
    filCiudad:[],
    filSucursal:[]
  }
  lisPregunta :any[] = [];
  expandedCuestionario: boolean =false;
  selectTF:boolean =false;
  selectPro:string;
  sucursal :string;
  sexoModel: string;
  comentario : string;
  pregunta_siNo : string []= [];
  enum : number []= [];
  thumbLabel = true;

  nomAppFormControl =new FormControl('',[Validators.required]);
  CLIFormControl =new FormControl('',[Validators.required]);

  edadFormControl =new FormControl('',[Validators.required, Validators.max(110)]);

  constructor(private _serviceEncuesta: EncuestaService) { 
    this.FiltroProvincia();
    this.Preguntas();
  }
  FiltroProvincia(){
    let params = {
      Option: 0,
      Params: ""
    }
    this._serviceEncuesta.generalService(params).subscribe((resp: Filter[]) => {
      resp.forEach(resp =>{
        this.listFilter.filProvincia.push(resp)
      })
    }, () => {
        Swal.fire({
            title: "Error",
            text: "Ocurrió un problema al obtener las Provincia",
            icon: "error"
        });
    });
  }

  onSelectProvincia(value:any){
    if(value !== undefined){
      this.listFilter.filCiudad = [];
      const params = {
        Option: 1,
        Params: JSON.stringify({
          id_provincia: value
        })
      }
      this._serviceEncuesta.generalService(params).subscribe((resp: Filter[]) => {
        resp.forEach(resp =>{
          this.listFilter.filCiudad.push(resp)
        })
      }, () => {
          Swal.fire({
              title: "Error",
              text: "Ocurrió un problema al obtener las Plataformas",
              icon: "error"
          });
      });

    }
    else {
      this.listFilter.filCiudad = [];
    }
  }

  onSelectCiudad(value:any){
    if(value !== undefined){
      this.listFilter.filSucursal = [];
      const params = {
        Option: 2,
        Params: JSON.stringify({
          id_provincia: value
        })
      }
      this._serviceEncuesta.generalService(params).subscribe((resp: Filter[]) => {
        resp.forEach(resp =>{
          this.listFilter.filSucursal.push(resp);
          this.expandedCuestionario = true;
        })
      }, () => {
          Swal.fire({
              title: "Error",
              text: "Ocurrió un problema al obtener las Plataformas",
              icon: "error"
          });
      });

    }
    else {
      this.listFilter.filSucursal = [];
    }
  }
  onSelectSexo(value:any) {
    if (value !== undefined) {
      
    }
    else {
      this.selectTF =true
    }
  }
  
  formatLabel(value: number): string {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return `${value}`;
  }

  Preguntas(){
    let params = {
      Option: 3,
      Params: ""
    }
    this._serviceEncuesta.generalService(params).subscribe((resp: any[]) => {
      resp.forEach(resp =>{
           if ( resp.tipo.indexOf('-') !== -1) {
                const range = resp.tipo.split('-');
                resp['min'] = range[0];
                resp['max'] = range[1];
           }
           else if( resp.tipo === 'boolean') {
                resp['SiNo'] =1
                resp['preg'] = resp.id_pregunta +  resp.tipo
           }
           else if (resp.tipo === 'abierto') {
                resp['comentario'] = resp.id_pregunta + 'comentario'
           }
          this.lisPregunta.push(resp)
      })
    }, () => {
        Swal.fire({
            title: "Error",
            text: "Ocurrió un problema al obtener las Preguntas",
            icon: "error"
        });
    });
  }

  

  Enviar(){
    
    try {
      const result= this.lisPregunta.filter(pre => pre.tipo === 'boolean')
      if(this.nomAppFormControl.value === "" || this.CLIFormControl.value === ""  || this.edadFormControl.value === "") {
        if (this.nomAppFormControl.value === "") this.nomAppFormControl.markAllAsTouched();
        if (this.CLIFormControl.value === "") this.CLIFormControl.markAllAsTouched();
        if (this.edadFormControl.value === "") this.edadFormControl.markAllAsTouched();
        Swal.fire({
          title: "Error",
          text: "Ocurrió un problema LLene todos los campos",
          icon: "error"
        });
      }
      else{
        const params = {
          Option: 4,
          Params: JSON.stringify({
            id_sucursal: this.sucursal.valueOf(),
            nomAPP: this.nomAppFormControl.value,
            cli: this.CLIFormControl.value,
            edad: this.edadFormControl.value,
            sexo: this.sexoModel.valueOf(),
            preg1: this.pregunta_siNo[0],
            preg2: this.pregunta_siNo[1],
            preg3:this.enum[2],
            preg4: this.enum[3],
            preg5: this.enum[4],
            preg6: this.comentario.valueOf()
          })
        }
        this._serviceEncuesta.generalService(params).subscribe((resp: any[]) => {
          console.log(resp)
            Swal.fire({
              title: "Éxito",
              text: `Se mandó la encuesta`,
              icon: "success"
          });
          this.CLIFormControl.setValue("");
          this.CLIFormControl.markAsUntouched();
          this.nomAppFormControl.setValue("");
          this.nomAppFormControl.markAsUntouched();
          this.edadFormControl.setValue("");
          this.edadFormControl.markAsUntouched();
          this.comentario="";
          this.sucursal=""
          this.listFilter.filSucursal=[];
          this.listFilter.filCiudad=[];
          this.selectPro = "";
          this.sexoModel ="";
          this.pregunta_siNo = [];
          this.enum=[];

        }, () => {
          Swal.fire({
              title: "Error",
              text: "Ocurrió un problema",
              icon: "error"
          });
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Ocurrió un problema LLene todos los campos",
        icon: "error"
    });
    }
  }
  ngOnInit(): void {
    
  }

}
