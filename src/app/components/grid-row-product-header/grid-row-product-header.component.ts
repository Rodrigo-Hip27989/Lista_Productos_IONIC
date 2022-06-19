import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-grid-row-product-header',
  templateUrl: './grid-row-product-header.component.html',
  styleUrls: ['./grid-row-product-header.component.scss'],
})
export class GridRowProductHeaderComponent implements OnInit {
  @Input() product_header_INPUT !: any[];

  constructor() { }

  ngOnInit() {}

}
