import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { QuestionsService } from '../../services/questions.service';

@Component({
  selector: 'app-questions',
  imports: [CommonModule],
  templateUrl: './questions.component.html',
  styleUrl: './questions.component.scss',
})
export class QuestionsComponent implements OnInit {
  questionData: any;

  constructor(private questionsService: QuestionsService) {}

  ngOnInit(): void {
    this.getQuestion();
  }

  getQuestion() {
    this.questionsService.getQuestion().subscribe((data) => {
      this.questionData = data;
    });
  }
}
