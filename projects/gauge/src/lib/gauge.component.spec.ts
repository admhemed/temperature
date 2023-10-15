import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GaugeComponent } from './gauge.component';

describe('GaugeComponent', () => {
  let component: GaugeComponent;
  let fixture: ComponentFixture<GaugeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GaugeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GaugeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Initial Setup', () => {
    it('should have sensible default values', () => {
      expect(component.width).toBe(200);
      expect(component.customClass).toBe('');
    });

    it('should update dimensions based on default width', () => {
      expect(component.radius).toBe(95);
      expect(component.viewSize).toBe(210);
      expect(component.center).toBe(100);
    });
  });

  describe('Temperature Inputs', () => {
    it('should validate inputs correctly', () => {
      component.minimumTemperature = 10;
      component.maximumTemperature = 30;
      component.targetTemperature = 20;

      component.ngOnChanges();
      expect(component.isValidInput).toBeTrue();
    });

    it('should invalidate when target is less than min', () => {
      component.minimumTemperature = 10;
      component.maximumTemperature = 30;
      component.targetTemperature = 5;

      component.ngOnChanges();
      expect(component.isValidInput).toBeFalse();
      expect(component.errorMessage).toBe('Target is lower than min.');
    });

    it('should invalidate when target is more than max', () => {
      component.minimumTemperature = 10;
      component.maximumTemperature = 30;
      component.targetTemperature = 35;

      component.ngOnChanges();
      expect(component.isValidInput).toBeFalse();
      expect(component.errorMessage).toBe('Target is higher than max.');
    });
  });

  describe('Gauge Calculations', () => {
    it('should calculate gauge values correctly', () => {
      component.minimumTemperature = 0;
      component.maximumTemperature = 100;
      component.targetTemperature = 50;

      component.ngOnChanges();
      expect(component.targetDegree).toBeCloseTo(-90, 2);
    });
  });
});
