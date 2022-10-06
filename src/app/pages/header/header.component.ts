import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  logado : boolean = false

  constructor(
    private _router :Router
  ) { }

  ngOnInit(): void {
    if(window.localStorage.getItem('user')){
      this.logado = true
    }
  }

  logOut(){
    window.localStorage.clear()
    this._router.navigate(['login'])
  }
}
