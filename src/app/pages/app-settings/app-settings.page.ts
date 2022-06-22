import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-app-settings',
  templateUrl: './app-settings.page.html',
  styleUrls: ['./app-settings.page.scss'],
})
export class AppSettingsPage implements OnInit {
  config_measure_enable: boolean;

  constructor() { 
    this.config_measure_enable = false;
  }

  ngOnInit() {
  }

  switch_config_measure(): void{
    this.config_measure_enable = !this.config_measure_enable;
  }

}
