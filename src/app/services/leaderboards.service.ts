import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface LeaderboardEntry {
  user_name: string;
  score: number;
}

@Injectable({
  providedIn: 'root',
})
export class LeaderboardsService {
  constructor(private http: HttpClient) {}

  private apiUrl = 'http://localhost:8000/api';

  getLeaderboards() {
    return this.http.get(this.apiUrl + '/leaderboard');
  }

  addToLeaderboard(entry: LeaderboardEntry): Observable<any> {
    return this.http.post(this.apiUrl + '/leaderboard', entry);
  }
}
