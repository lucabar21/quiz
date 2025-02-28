import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  LeaderboardEntry,
  LeaderboardsService,
} from '../../services/leaderboards.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-results',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './results.component.html',
  styleUrl: './results.component.scss',
})
export class ResultsComponent implements OnInit {
  score: number = 0; // Punteggio
  userName: string = ''; // Nome utente
  submitted: boolean = false; // Indica se il punteggio è stato inviato

  constructor(
    private router: Router,
    private leaderboardsService: LeaderboardsService
  ) {
    // Recupera il punteggio dallo stato della navigazione
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.score = navigation.extras.state['score'];
    }
  }

  ngOnInit(): void {}

  submitScore(): void {
    const entry: LeaderboardEntry = {
      user_name: this.userName,
      score: this.score,
    };

    this.leaderboardsService.addToLeaderboard(entry).subscribe(
      (response) => {
        console.log('Punteggio salvato con successo:', response);
        this.submitted = true; // Mostra il messaggio di conferma
      },
      (error) => {
        console.error('Errore durante il salvataggio del punteggio:', error);
      }
    );
  }

  goBack(): void {
    this.router.navigate(['/']); // Torna alla pagina principale del quiz
  }
}
