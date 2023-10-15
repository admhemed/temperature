import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
// import { GaugeComponent } from './gauge-old/gauge.component';
import { GaugeModule } from 'gauge';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, GaugeModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
