import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Question, QuestionsService } from '../../services/questions.service';
import { CommonModule } from '@angular/common';
import { Category, CategoryService } from '../../services/category.service';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-backoffice',
  imports: [FormsModule, CommonModule, HeaderComponent, HeaderComponent],
  templateUrl: './backoffice.component.html',
  styleUrl: './backoffice.component.scss',
})
export class BackofficeComponent implements OnInit {
  questionList: Question[] = [];
  editingQuestion: Question | null = null;

  newQuestion: Question = {
    id: 0,
    category_id: 0,
    question: '',
    options: ['', '', '', ''],
    correct_answer: '',
    difficulty: 'easy',
    points: 1,
  };

  newCategory: Category = {
    name: '',
  };
  categories: any[] = [];

  difficultyOptions = [
    { name: 'easy', value: 1 },
    { name: 'medium', value: 3 },
    { name: 'hard', value: 5 },
  ];

  constructor(
    private questionService: QuestionsService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.loadQuestions();
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => console.error('Errore nel recupero categorie', err),
    });
  }

  loadQuestions() {
    this.questionService.getQuestions().subscribe({
      next: (data) => {
        this.questionList = data;
      },
      error: (err) => console.error('Errore nel recupero delle domande', err),
    });
  }

  createCategory(form: NgForm) {
    if (form.valid) {
      console.log('Nuova categoria:', this.newCategory);
      this.categoryService.createCategory(this.newCategory).subscribe({
        next: (data) => {
          this.categories.push(data);
          this.resetCategoryForm(form);
          alert('Categoria creata con successo!');
        },
      });
    }
  }

  createQuestion(form: NgForm) {
    if (form.valid) {
      console.log('Nuova domanda:', this.newQuestion);
      this.questionService.createQuestion(this.newQuestion).subscribe({
        next: (data) => {
          this.questionList.push(data);
          this.resetQuestionForm(form);
          alert('Domanda creata con successo!');
        },
        error: (err) =>
          console.error('Errore nella creazioe della domanda', err),
      });
    }
  }

  editQuestion(question: Question) {
    this.editingQuestion = { ...question };
  }

  updateQuestion(form: NgForm) {
    if (this.editingQuestion) {
      this.questionService
        .updateQuestion(
          this.editingQuestion.id.toString(),
          this.editingQuestion
        )
        .subscribe({
          next: () => {
            this.loadQuestions();
            this.cancelEdit();
          },
          error: (err) =>
            console.error('Errore nella modifica della domanda', err),
        });
    }
  }

  deleteQuestion(id: number) {
    if (confirm('Sei sicuro di voler eliminare la domanda?')) {
      this.questionService.deleteQuestion(id.toString()).subscribe({
        next: () => {
          this.questionList = this.questionList.filter((q) => q.id !== id);
        },
        error: (err) =>
          console.error('Errore nella cancellazione della domanda', err),
      });
    }
  }

  // **Resetta il form**
  resetQuestionForm(form: NgForm) {
    this.newQuestion = {
      id: 0,
      category_id: 0,
      question: '',
      options: ['', '', '', ''],
      correct_answer: '',
      difficulty: 'easy',
      points: 0,
    };
    form.resetForm();
  }

  resetCategoryForm(form: NgForm) {
    this.newCategory = {
      name: '',
    };
    form.resetForm();
  }

  // **Annulla la modifica**
  cancelEdit() {
    this.editingQuestion = null;
  }

  //  Getter e Setter per ovviare al fatto che non viene ammesso l'espressione complessa in un binding bidirezionale
  get questionText(): string {
    return this.editingQuestion
      ? this.editingQuestion.question
      : this.newQuestion.question;
  }

  set questionText(value: string) {
    if (this.editingQuestion) {
      this.editingQuestion.question = value;
    } else {
      this.newQuestion.question = value;
    }
  }

  trackByIndex(index: number, item: any): number {
    return index; // Ritorna l'indice per associare ogni input correttamente
  }

  // Metodo per aggiornare i punti in base alla difficoltà selezionata
  updatePointsBasedOnDifficulty() {
    const selectedDifficulty = this.difficultyOptions.find(
      (d) => d.name === this.newQuestion.difficulty
    );
    if (selectedDifficulty) {
      this.newQuestion.points = selectedDifficulty.value;
    }
  }
}
