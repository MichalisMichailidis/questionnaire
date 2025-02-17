import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuestionService } from '../../services/question.service';
import { Question, QuestionOption, UserAnswer } from '../../models/question.interface';
import { LoaderComponent } from '../loader/loader.component';
import { ErrorModalComponent } from '../error-modal/error-modal.component';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [CommonModule, FormsModule, LoaderComponent, ErrorModalComponent, ProgressBarComponent],
  templateUrl: './question.component.html',
  styleUrl: './question.component.css'
})
export class QuestionComponent implements OnInit {
  currentQuestion?: Question;
  questions: Question[] = [];
  userAnswers: UserAnswer[] = [];
  selectedOptions: QuestionOption[] = [];

  finalUrl = '';
  progress = 0;
  totalQuestions = 0;
  requiredQuestionsCount = 0;

  loading = true;
  error = false;
  showResult = false;

  constructor(private questionService: QuestionService) {}

  ngOnInit() {
    this.initializeQuestions();
  }

  private async initializeQuestions() {
    try {
      this.loading = true;
      const questions = await this.questionService.getQuestions().toPromise();

      if (!questions || !questions.length) {
        throw new Error('No questions available');
      }

      this.questions = questions;
      this.totalQuestions = this.questions.length;
      this.requiredQuestionsCount = this.questions.filter(q => !q.IsOptional).length;
      this.currentQuestion = this.questions[0];
      this.updateProgress();

    } catch (error) {
      console.error('Failed to load questions:', error);
      this.error = true;
    } finally {
      this.loading = false;
    }
  }

  onOptionSelect(option: QuestionOption) {
    if (!this.currentQuestion) return;

    if (this.currentQuestion.QuestionSelectType === 0) {
      this.selectedOptions = [option];
    } else {
      const index = this.selectedOptions.findIndex(o => o.Id === option.Id);
      if (index === -1) {
        this.selectedOptions = [...this.selectedOptions, option];
      } else {
        this.selectedOptions = this.selectedOptions.filter(o => o.Id !== option.Id);
      }
    }
  }

  onNext() {
    if (!this.currentQuestion) return;

    const canProceed = this.selectedOptions.length > 0 || this.currentQuestion.IsOptional;
    if (!canProceed) return;

    if (this.selectedOptions.length > 0 || !this.currentQuestion.IsOptional) {
      this.userAnswers.push({
        questionId: this.currentQuestion.Id,
        selectedOptions: [...this.selectedOptions]
      });
    }

    if (this.selectedOptions.length === 0) {
      const currentIndex = this.questions.findIndex(q => q.Id === this.currentQuestion?.Id);
      const nextQuestion = this.questions[currentIndex + 1];

      if (nextQuestion) {
        this.moveToNextQuestion(nextQuestion.Id);
      } else {
        this.showResults();
      }
    } else {
      const [selectedOption] = this.selectedOptions;
      if (selectedOption.Action === 'GoToUrl') {
        this.showResults();
      } else {
        this.moveToNextQuestion(selectedOption.GoToQuestionId);
      }
    }

    this.updateProgress();
  }

  private showResults() {
    this.finalUrl = this.questionService.constructFinalUrl(this.userAnswers);
    this.showResult = true;
    this.progress = 100;
  }

  private moveToNextQuestion(questionId: number) {
    this.currentQuestion = this.questionService.getQuestionById(questionId);
    this.selectedOptions = [];
  }

  getInputType(questionType: number): string {
    if (questionType === 0) {
      return 'radio';
    }
    return 'checkbox';
  }

  onBack() {
    if (!this.userAnswers.length) return;

    this.userAnswers.pop();
    this.showResult = false;

    const lastAnswer = this.userAnswers.at(-1);
    if (lastAnswer) {
      this.currentQuestion = this.questionService.getQuestionById(lastAnswer.questionId);
    } else {
      this.currentQuestion = this.questionService.getFirstQuestion();
    }

    this.selectedOptions = [];
    this.updateProgress();
  }

  private updateProgress() {
    if (this.showResult) {
      this.progress = 100;
    } else {
      const answeredRequiredCount = this.userAnswers.filter(answer => {
        const question = this.questions.find(q => q.Id === answer.questionId);
        return question && !question.IsOptional;
      }).length;

      this.progress = Math.round((answeredRequiredCount / this.requiredQuestionsCount) * 100);
    }
  }

  resetQuestionnaire() {
    this.userAnswers = [];
    this.selectedOptions = [];
    this.showResult = false;
    this.progress = 0;
    this.finalUrl = '';
    this.currentQuestion = this.questions[0];
  }
}
