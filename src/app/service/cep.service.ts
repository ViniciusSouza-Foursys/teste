import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CepService {

  private cepUrl: string = 'https://viacep.com.br/ws/'

  constructor(
    private _http : HttpClient
  ) { }

  getEndereco(cep : any) : Observable<any>{
    return this._http.get<any>(this.cepUrl+cep+'/json')
  }
}
