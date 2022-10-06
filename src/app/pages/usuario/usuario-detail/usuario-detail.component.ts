import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CepService } from 'src/app/service/cep.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-usuario-detail',
  templateUrl: './usuario-detail.component.html',
  styleUrls: ['./usuario-detail.component.css']
})
export class UsuarioDetailComponent implements OnInit {


  cepErro : boolean = false

  userAcesso : any = ['Total', 'Restrito']

  formUsuario = new FormGroup({
    id: new FormControl(''),
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
    private _route : ActivatedRoute,
    private _router : Router
  ) { }

  ngOnInit(): void {
    if(!window.localStorage.getItem('user')){
      this._router.navigate(['login'])
    }

    this.buscarUser()
  }

  buscarUser(){
    this._userService.getUser(Number(this._route.snapshot.paramMap.get('id'))).subscribe(data =>{
      this.formUsuario.patchValue({
      id: data.id,
      nome: data.nome,
      telefone: data.telefone,
      email: data.email,
      senha: data.senha,
      acesso: data.acesso,
      cep: data.cep,
      endereco: data.endereco,
      bairro: data.bairro,
      cidade: data.cidade,
      estado: data.estado
      })
      console.log(this.formUsuario)
    })
  }

  goEditar(){
    this._userService.putUser(this.formUsuario.getRawValue()).subscribe()
    this._router.navigate(['usuario'])
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
