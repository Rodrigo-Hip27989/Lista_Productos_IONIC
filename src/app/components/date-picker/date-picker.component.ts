import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
})

export class DatePickerComponent implements OnInit {
  @Output() newItemEvent = new EventEmitter();
  @Input() selected_date_INPUT: string;
  datePicker_enable: boolean;

  constructor() { 
    this.selected_date_INPUT = (new Date()).toLocaleString();
    this.datePicker_enable = false;
  }

  ngOnInit() {}

  select_date(confirmed_date: string){
    this.selected_date_INPUT = (new Date(confirmed_date)).toLocaleString();
    this.newItemEvent.emit(this.selected_date_INPUT);
    this.datePicker_enable = false;
  }

  switch_visibility_date_picker(){
    if(this.datePicker_enable){
      this.datePicker_enable = false;
    }
    else{
      this.datePicker_enable = true;
    }
  }

}