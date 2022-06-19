import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Lista Productos', url: '/product-list', icon: 'list' },
    { title: 'Configuraciones', url: '/app-settings', icon: 'settings' },
  ];
//  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  products_token: string = "products_array";

  constructor() {
    this.inicializarLocalStorage();
  }

  private inicializarLocalStorage(){
    if(localStorage.getItem(this.products_token) === null){
      localStorage.setItem(this.products_token, "[]");
    }
  }

}
