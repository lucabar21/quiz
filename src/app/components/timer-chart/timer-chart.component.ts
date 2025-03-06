import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Chart, registerables } from 'chart.js';
@Component({
  selector: 'app-timer-chart',
  imports: [],
  templateUrl: './timer-chart.component.html',
  styleUrl: './timer-chart.component.scss',
})
export class TimerChartComponent implements OnInit, OnDestroy {
  @Input() timeLeft: number = 60;
  private interval: any;
  private chart: any;

  constructor() {}

  ngOnInit(): void {
    Chart.register(...registerables);
    this.createChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['timeLeft'] && this.chart) {
      this.updateChart();
    }
  }

  createChart() {
    const ctx = document.getElementById('timerChart') as HTMLCanvasElement;

    this.chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        datasets: [
          {
            data: [60 - this.timeLeft, this.timeLeft],
            backgroundColor: ['#D0BDDB', '#613F75'],
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '80%',
        animation: { animateRotate: false, animateScale: false },
      },
    });
  }

  updateChart() {
    this.chart.data.datasets[0].data = [60 - this.timeLeft, this.timeLeft];
    this.chart.update();
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy(); // Distrugge il grafico per evitare memory leaks
    }
  }
}
