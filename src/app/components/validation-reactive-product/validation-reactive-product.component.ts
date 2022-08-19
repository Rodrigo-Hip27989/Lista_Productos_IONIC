import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Producto } from 'src/app/models/producto';
import { Randoms } from 'src/app/funciones/aleatorios';

@Component({
  selector: 'app-validation-reactive-product',
  templateUrl: './validation-reactive-product.component.html',
  styleUrls: ['./validation-reactive-product.component.scss'],
})

export class ValidationReactiveProductComponent implements OnInit {
  @Input() button_label: string;
  @Input() product_test_INPUT !: Producto;
  @Output() product_validated_OUTPUT = new EventEmitter();
  measuring_options_token: string;
  measuring_options: string[];
  measurement_symbol: string;
  unit_price_enabled: boolean;
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.measuring_options_token = "measure_array";
    this.measuring_options = JSON.parse(localStorage.getItem(this.measuring_options_token));
    this.unit_price_enabled = false;
    this.measurement_symbol ="$";
  }

  switch_type_price(){
    this.unit_price_enabled=!this.unit_price_enabled;
  }

  ngOnInit() {
    if(this.product_test_INPUT === undefined){
      this.product_test_INPUT = new Producto();
    }
    this.form = this.fb.group({
      nombre: new FormControl(this.product_test_INPUT.nombre, [Validators.required, Validators.maxLength(32), Validators.pattern("^[A-Za-z]+[A-Za-z\ ]*[A-Za-z]+")]),
      cantidad: new FormControl(this.product_test_INPUT.cantidad, [Validators.required, Validators.min(1), Validators.max(99999999)]),
      medida: new FormControl(this.product_test_INPUT.medida, [Validators.required, Validators.maxLength(16)]),
      precio: new FormControl(this.product_test_INPUT.precio, [Validators.required, Validators.min(0), Validators.max(99999999)]),
      precio_total: new FormControl(this.product_test_INPUT.precio_total, [Validators.required, Validators.min(0), Validators.max(99999999)]),
    });
  }

  enviarFormulario() {
    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
    // display form values on success
    let product_update:Producto = new Producto();
    for (const propiedad in this.form.value) {
      product_update[propiedad] = this.form.value[propiedad];
    }
    if(this.unit_price_enabled){
      if(product_update.precio !==0){
        product_update.precio_total = product_update.cantidad*product_update.precio;
      }
      else{
        product_update.precio_total = 0;
      }
    }
    else{
      product_update.precio = product_update.precio_total/product_update.cantidad;
    }
    //Esto es necesario por que no hay un ion-item para la propiedad fecha en el formulario
    product_update.fecha = this.product_test_INPUT.fecha;
//    console.log("Producto con Fecha (Emitido): ", product_update);
    this.product_validated_OUTPUT.emit(product_update);
    this.limpiarFormulario();
  }

  generarEjemplo(){
    this.form = this.fb.group({
      nombre: [Randoms.getStr(7), [Validators.required, Validators.maxLength(32), Validators.pattern("^[A-Za-z]+[A-Za-z\ ]*[A-Za-z]+")]],
      cantidad: [Randoms.getInt(2), [Validators.required, Validators.min(1), Validators.max(99999999)]],
      medida: ["Piezas", [Validators.required, Validators.maxLength(16)]],
      precio: [0, [Validators.required, Validators.min(0), Validators.max(99999999)]],
      precio_total: [Randoms.getInt(2), [Validators.required, Validators.min(0), Validators.max(99999999)]],
    });
    this.product_test_INPUT.fecha = (new Date()).toLocaleString();
  }
  
  save_date_picker(fechaRecivida: string){
    this.product_test_INPUT.fecha = fechaRecivida;
  }

  limpiarFormulario() {
    this.product_test_INPUT.fecha = "";
    this.form.reset();
  }
}