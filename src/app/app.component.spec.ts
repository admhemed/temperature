import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { GaugeComponent } from './gauge-old/gauge.component'; // <-- Import this

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        GaugeComponent, // <-- Add this
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
