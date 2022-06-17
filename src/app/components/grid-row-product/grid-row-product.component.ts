import { Component, Input, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto';

@Component({
  selector: 'app-grid-row-product',
  templateUrl: './grid-row-product.component.html',
  styleUrls: ['./grid-row-product.component.scss'],
})
export class GridRowProductComponent implements OnInit {
  @Input() product_INPUT !: Producto;

  constructor() { }

  ngOnInit() {}

}
