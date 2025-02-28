import { Component, OnDestroy, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
@Component({
  selector: 'app-timer-chart',
  imports: [],
  templateUrl: './timer-chart.component.html',
  styleUrl: './timer-chart.component.scss',
})
export class TimerChartComponent implements OnInit, OnDestroy {
  public timeLeft = 60;
  private interval: any;
  private chart: any;

  constructor() {}

  ngOnInit(): void {
    Chart.register(...registerables);
    this.createChart();
    this.startTimer();
  }

  createChart() {
    const ctx = document.getElementById('timerChart') as HTMLCanvasElement;

    this.chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        datasets: [
          {
            data: [0, this.timeLeft],
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

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
        this.updateChart();
      } else {
        clearInterval(this.interval);
      }
    }, 1000);
  }

  updateChart() {
    this.chart.data.datasets[0].data = [60 - this.timeLeft, this.timeLeft];
    this.chart.update();
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }
}
