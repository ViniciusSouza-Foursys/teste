import { Url } from './url';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  urlApi : string = 'http://localhost:3000/usuarios/'

  url : Url

  constructor(
    private _http : HttpClient,
  ) {
    this.url = new Url()
   }

  getUser(id : number) : Observable<any> {
    return this._http.get(this.url.urlApi+id)
  }

  getAllUsers() : Observable<any> {
    return this._http.get(this.urlApi)
  }

  postUser(user : any) : Observable<any> {
    return this._http.post(this.urlApi, user)
  }

  putUser(user : any) : Observable<any> {
    return this._http.put(this.urlApi+user.id, user)
  }

  deleteUser(id : number) : Observable<any> {
    return this._http.delete(this.urlApi+id)
  }
}
