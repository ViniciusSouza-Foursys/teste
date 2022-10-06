import { Router } from '@angular/router';
import { CepService } from './../../../service/cep.service';
import { UserService } from './../../../service/user.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-usuario-cadastro',
  templateUrl: './usuario-cadastro.component.html',
  styleUrls: ['./usuario-cadastro.component.css']
})
export class UsuarioCadastroComponent implements OnInit {

  cepErro : boolean = false

  userAcesso : any = ['Total', 'Restrito']

  formUsuario = new FormGroup({
    nome: new FormControl('',[Validators.required]),
    telefone: new FormControl('',[Validators.required, Validators.maxLength(11)]),
    email: new FormControl('',[Validators.required]),
    senha: new FormControl('',[Validators.required]),
    acesso: new FormControl('',[Validators.required]),
    cep: new FormControl('',[Validators.required]),
    endereco: new FormControl({value: '', disabled: true},[Validators.required]),
    bairro: new FormControl({value: '', disabled: true},[Validators.required]),
    cidade: new FormControl({value: '', disabled: true},[Validators.required]),
    estado: new FormControl({value: '', disabled: true},[Validators.required]),
  })

  constructor(
    private _userService : UserService,
    private _cepService : CepService,
    private _router : Router
  ) { }

  ngOnInit(): void {
    if(!window.localStorage.getItem('user')){
      this._router.navigate(['login'])
    }
  }

  goCadastrar(){
    this._userService.postUser(this.formUsuario.getRawValue()).subscribe()
    this.formUsuario.reset()
  }

  goBuscarEndereco(){
    if(this.formUsuario.controls.cep.value?.length == 8){
      this._cepService.getEndereco(this.formUsuario.controls.cep.value).subscribe( data => {
        if(data.erro){
          this.cepErro = true
          setTimeout(() => {
            this.cepErro = false
          }, 2000)
        }
        else{
        this.formUsuario.patchValue({
          endereco: data.logradouro
        }

        )
        this.formUsuario.controls.bairro.setValue(data.bairro)
        this.formUsuario.controls.cidade.setValue(data.localidade)
        this.formUsuario.controls.estado.setValue(data.uf)
        }
      })
    }
    else{
      this.cepErro = true
          setTimeout(() => {
            this.cepErro = false
          }, 2000)
    }
  }

}
