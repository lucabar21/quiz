import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuestionsService {
  private apiURL = 'https://the-trivia-api.com/v2/questions';

  constructor(private http: HttpClient) {}

  getQuestion(): Observable<any> {
    return this.http.get<any[]>(this.apiURL).pipe(
      map((questions) => {
        if (questions.length > 0) {
          return {
            question: questions[0].question.text,
            correctAnswer: questions[0].correctAnswer,
            answers: [
              questions[0].correctAnswer,
              ...questions[0].incorrectAnswers,
            ],
          };
        }
        return null;
      })
    );
  }
}
