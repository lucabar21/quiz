import { Component, OnInit } from '@angular/core';
import { LeaderboardsService } from '../../services/leaderboards.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../components/button/button.component';

@Component({
  selector: 'app-leaderboard',
  imports: [CommonModule, ButtonComponent],
  templateUrl: './leaderboard.component.html',
  styleUrl: './leaderboard.component.scss',
})
export class LeaderboardComponent implements OnInit {
  public leaderboard: any;

  constructor(
    private leaderboardsService: LeaderboardsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadLeaderboard();
  }

  loadLeaderboard() {
    this.leaderboardsService.getLeaderboards().subscribe((data) => {
      this.leaderboard = data;
    });
  }

  goBack() {
    this.router.navigate(['']);
  }
}
