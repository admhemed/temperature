/**
 * GaugeComponent
 *
 * This Angular component serves as a temperature gauge visualizer.
 * It accepts minimum, maximum, and target temperature values as inputs,
 * as well as optional width and custom class for styling.
 *
 * @example
 * <app-gauge
 *    [minimumTemperature]="-20"
 *    [maximumTemperature]="50"
 *    [targetTemperature]="22">
 * </app-gauge>
 */

import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

interface Coordinate {
  x: number;
  y: number;
}

interface DegreeCoordinate {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

@Component({
  selector: 'app-gauge',
  templateUrl: './gauge.component.html',
  styleUrls: ['./gauge.component.scss'],
})
export class GaugeComponent implements OnInit, OnChanges {
  @Input() minimumTemperature!: number;
  @Input() maximumTemperature!: number;
  @Input() targetTemperature!: number;
  @Input() width: number = 200;
  @Input() customClass: string = '';

  radius: number = this.width / 2 - 5;
  viewSize: number = this.width + 10;
  center: number = this.radius + 5;
  minDegree: number = -235;
  maxDegree: number = 55;
  errorMessage: string = '';
  targetDegree!: number;
  isValidInput: boolean = true;

  minDegreeCoordinates!: DegreeCoordinate;
  maxDegreeCoordinates!: DegreeCoordinate;
  targetDegreeCoordinates!: DegreeCoordinate;

  constructor() {}

  ngOnInit(): void {
    this.setupGauge();
  }

  ngOnChanges(): void {
    this.setupGauge();
  }

  private setupGauge(): void {
    this.updateDimensions(); // this depends on width which has a default value so it is safe.
    this.validateInputs();
    if (this.isValidInput) {
      this.calculateGaugeValues();
      this.minDegreeCoordinates = this.getDegree(this.minDegree);
      this.maxDegreeCoordinates = this.getDegree(this.maxDegree);
      this.targetDegreeCoordinates = this.getTargetDegree(this.targetDegree);
    }
  }
  private updateDimensions(): void {
    this.radius = this.width / 2 - 5;
    this.viewSize = this.width + 10;
    this.center = this.radius + 5;
  }

  private validateInputs(): void {
    this.errorMessage = '';
    if (
      this.minimumTemperature === undefined ||
      this.maximumTemperature === undefined ||
      this.targetTemperature === undefined
    ) {
      this.errorMessage = 'All temperature values must be provided.';
      this.isValidInput = false;
      return;
    }
    if (this.targetTemperature < this.minimumTemperature) {
      this.errorMessage = 'Target is lower than min.';
      this.isValidInput = false;
      return;
    }
    if (this.targetTemperature > this.maximumTemperature) {
      this.errorMessage = 'Target is higher than max.';
      this.isValidInput = false;
      return;
    }
    this.isValidInput = true;
  }

  private calculateGaugeValues(): void {
    const degreeRange = this.maxDegree - this.minDegree;
    const tempRange = this.maximumTemperature - this.minimumTemperature;
    const targetTempDistance = this.targetTemperature - this.minimumTemperature;

    const targetDegreeDistance = (degreeRange * targetTempDistance) / tempRange;
    this.targetDegree = this.minDegree + targetDegreeDistance;
  }

  private getCoordinates(
    degree: number,
    distanceMultiplier: number
  ): Coordinate {
    const radian = degree * (Math.PI / 180);
    return {
      x: this.center + this.radius * distanceMultiplier * Math.cos(radian),
      y: this.center + this.radius * distanceMultiplier * Math.sin(radian),
    };
  }

  private getDegree(degree: number): DegreeCoordinate {
    const inner: Coordinate = this.getCoordinates(degree, 1.25); // ticks from the image are outside the gauge.
    const outer: Coordinate = this.getCoordinates(degree, 1);
    return {
      x1: inner.x,
      y1: inner.y,
      x2: outer.x,
      y2: outer.y,
    };
  }

  private getTargetDegree(degree: number): DegreeCoordinate {
    const inner: Coordinate = this.getCoordinates(degree, 1 / 3);
    const outer: Coordinate = this.getCoordinates(degree, 1);
    return {
      x1: inner.x,
      y1: inner.y,
      x2: outer.x,
      y2: outer.y,
    };
  }
}
