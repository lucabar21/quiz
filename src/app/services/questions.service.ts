import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Question {
  id: number;
  category_id: number;
  question: string;
  options: string[];
  correct_answer: string;
  difficulty: string;
  points: number;
}

@Injectable({
  providedIn: 'root',
})
export class QuestionsService {
  private apiUrl = 'http://localhost:8000/api'; // URL del backend Laravel

  constructor(private http: HttpClient) {}

  // Recupera tutte le domande
  getQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.apiUrl}/questions`);
  }

  getQuestion(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createQuestion(question: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, question);
  }

  updateQuestion(id: string, question: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, question);
  }

  deleteQuestion(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  // Recupera le domande per categoria
  getQuestionsByCategory(categoryId: number): Observable<Question[]> {
    return this.http.get<Question[]>(
      `${this.apiUrl}/questions/category/${categoryId}`
    );
  }
}
