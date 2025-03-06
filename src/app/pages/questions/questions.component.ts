import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Question, QuestionsService } from '../../services/questions.service';
import { ButtonComponent } from '../../components/button/button.component';
import { TimerChartComponent } from '../../components/timer-chart/timer-chart.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-questions',
  imports: [CommonModule, ButtonComponent, TimerChartComponent],
  templateUrl: './questions.component.html',
  styleUrl: './questions.component.scss',
})
export class QuestionsComponent implements OnInit {
  questions: Question[] = [];
  currentQuestionIndex: number = 0; // Indice della domanda corrente
  currentQuestion: Question | null = null; // Domanda corrente
  selectedAnswer: string | null = null; // Risposta selezionata
  currentOptions: string[] = []; // Opzioni della domanda corrente (array)
  score: number = 0; // Punteggio totale
  quizCompleted: boolean = false; // Indica se il quiz è completato

  timeLeft: number = 60;
  timer: any;

  constructor(
    private questionsService: QuestionsService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.loadQuestions();
  }

  // Carica tutte le domande
  loadQuestions(): void {
    this.questionsService.getQuestions().subscribe(
      (data: Question[]) => {
        this.questions = data;
        this.setCurrentQuestion(); // Imposta la prima domanda
      },
      (error) => {
        console.error('Errore nel recupero delle domande:', error);
      }
    );
  }

  // Imposta la domanda corrente
  setCurrentQuestion(): void {
    if (this.questions.length > 0) {
      this.currentQuestion = this.questions[this.currentQuestionIndex];

      // Converti le opzioni da stringa JSON a array
      if (
        this.currentQuestion &&
        typeof this.currentQuestion.options === 'string'
      ) {
        this.currentOptions = JSON.parse(this.currentQuestion.options);
      } else {
        this.currentOptions = this.currentQuestion?.options || [];
      }
      this.startTimer();
    }
  }

  startTimer(): void {
    this.timeLeft = 60;
    clearInterval(this.timer);

    this.timer = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        clearInterval(this.timer);
        console.log('Tempo scaduto');

        this.selectedAnswer = null;
        this.nextQuestion();
      }
    }, 1000);
  }
  // Passa alla prossima domanda
  nextQuestion(): void {
    clearInterval(this.timer);
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      this.setCurrentQuestion();
    } else {
      // Quiz completato
      this.quizCompleted = true;
      this.navigateToResults(); // Naviga alla pagina dei risultati
    }
  }

  // Gestisce la selezione della risposta
  selectAnswer(option: string): void {
    this.selectedAnswer = option; // Memorizza la risposta selezionata
    if (this.currentQuestion) {
      const isCorrect = option === this.currentQuestion.correct_answer;

      // Aggiorna il punteggio se la risposta è corretta
      if (isCorrect) {
        this.score += this.currentQuestion.points;
      }
      console.log(isCorrect ? 'Risposta corretta!' : 'Risposta errata!');

      // Passa alla prossima domanda automaticamente
      setTimeout(() => {
        this.nextQuestion();
      }, 500); // Aspetta prima di passare alla prossima domanda
    }
  }

  restartQuiz(): void {
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.quizCompleted = false;
    this.setCurrentQuestion();
  }

  // Naviga alla pagina dei risultati
  navigateToResults(): void {
    this.router.navigate(['/results'], { state: { score: this.score } }); // Passa il punteggio
  }

  // Carica le domande per categoria
  loadQuestionsByCategory(categoryId: number): void {
    this.questionsService.getQuestionsByCategory(categoryId).subscribe(
      (data: Question[]) => {
        this.questions = data;
      },
      (error) => {
        console.error('Errore nel recupero delle domande:', error);
      }
    );
  }
}
