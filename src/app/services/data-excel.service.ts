import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as XLSX from 'xlsx';
import { Messages } from 'src/app/funciones-utiles/messages';

@Injectable({
  providedIn: 'root'
})

export class DataExcelService {

  constructor() { }

  async exportToExcel(data, filename) {
    {
      Messages.toast_top("Expotando a Excel...");
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
      Messages.toast_top("Expotando a Excel...");
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      Messages.toast_top("Expotando a Excel...");
      XLSX.utils.book_append_sheet(wb, ws, filename);
      Messages.toast_top("Expotando a Excel...");
      XLSX.writeFile(wb, filename);
      Messages.toast_top("Expotando a Excel...");
    }
  }
  
/*
  <ion-fab horizontal="center" vertical="bottom" slot="fixed" *ngIf="!selected_product">
    <ion-fab-button color="success" (click)="downloadCSV()">
      <ion-icon name="download"></ion-icon>
    </ion-fab-button>
  </ion-fab>

    public toArrayString(): string[]{
        let properties_obj:string [] = [];
        for(let property in this){
            properties_obj.push(property);
        }
        return properties_obj;
    }
  }
  import * as papa from 'papaparse';

  exportToExcel() {
    this.dataExcel.exportToExcel(this.products, 'Productos.xlsx');
    Messages.toast_middle("Se exporto a Excel...");
  }

  downloadCSV() {
    let csv = papa.unparse({
      fields: ["Nombre", "Cantidad", "Medida", "Precio"],
      data: ["algo", "1", "Pieza(s)", "7"]
    });
 
    // Dummy implementation for Desktop download purpose
    let blob = new Blob([csv]);
    let a = window.document.createElement("a");
    a.href = window.URL.createObjectURL(blob);
    a.download = "productos.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
 */
}