import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimerChartComponent } from './timer-chart.component';

describe('TimerChartComponent', () => {
  let component: TimerChartComponent;
  let fixture: ComponentFixture<TimerChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimerChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimerChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
