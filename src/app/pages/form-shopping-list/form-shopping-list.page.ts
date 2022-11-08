import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LStorageData } from 'src/app/funciones/local_storage';
import { ShoppingList } from 'src/app/models/shopping_list';

@Component({
  selector: 'app-form-shopping-list',
  templateUrl: './form-shopping-list.page.html',
  styleUrls: ['./form-shopping-list.page.scss'],
})
export class FormShoppingListPage implements OnInit {
  this_form: FormGroup;
  shopping_list_preview !: ShoppingList;

  constructor(private readonly fb: FormBuilder) { }

  ngOnInit(): void {
    this.shopping_list_preview = new ShoppingList();
    this.this_form = this.initFormShoppingList()
  }

  onSubmit(): void {
    if (this.this_form.invalid) {
      return;
    }
    let shopping_list_submit: ShoppingList = new ShoppingList();
    for (const propiedad in this.this_form.value) {
      shopping_list_submit[propiedad] = this.this_form.value[propiedad];
    }
    shopping_list_submit.date = this.shopping_list_preview.date;    
    console.log('Form ->', shopping_list_submit);
  }

  initFormShoppingList(): FormGroup {
    //No remover el campo 'date' porque es requerido en la función 'onSubmit' al copiar los valores
    return this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(64), Validators.pattern("^[A-Za-z]+[A-Za-z\ ]*[A-Za-z]+")]],
      products: [ LStorageData.getProductsArray(), Validators.required ],
      note: ['', [Validators.maxLength(256)]],
    });
  }

  save_date_picker(fechaRecivida: string){
    this.shopping_list_preview.date = fechaRecivida;
  }

}
