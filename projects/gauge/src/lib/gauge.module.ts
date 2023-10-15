import { NgModule } from '@angular/core';
import { GaugeComponent } from './gauge.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [GaugeComponent],
  imports: [CommonModule],
  exports: [GaugeComponent],
})
export class GaugeModule {}
