import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Question, QuestionOption, UserAnswer } from '../models/question.interface';

interface APIResponse {
  Success: number;
  Data: Question[];
}

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private readonly API_URL = '/searchq/GetQuestions';
  private readonly BASE_URL = '/s/Psychologos';
  private cachedQuestions: Question[] = [];

  constructor(private http: HttpClient) {}

  getQuestions(): Observable<Question[]> {
    const headers = new HttpHeaders().set('Accept', 'application/json');
    const params = { version: 'v2', language: 'el' };

    return this.http.get<APIResponse>(this.API_URL, { headers, params }).pipe(
      map(response => {
        if (!response?.Success) {
          throw new Error('Invalid API response');
        }
        this.cachedQuestions = response.Data;
        return response.Data;
      })
    );
  }

  getQuestionById(id: number): Question | undefined {
    return this.cachedQuestions.find(q => q.Id === id);
  }

  getFirstQuestion(): Question | undefined {
    return this.cachedQuestions[0];
  }

  constructFinalUrl(userAnswers: UserAnswer[]): string {
    const queryParams = new Map<string, Set<string>>();

    userAnswers.forEach(answer => {
      answer.selectedOptions.forEach(option => {
        if (option.FilterQueryStringKey && option.FilterQueryStringValue) {
          if (!queryParams.has(option.FilterQueryStringKey)) {
            queryParams.set(option.FilterQueryStringKey, new Set());
          }
          queryParams.get(option.FilterQueryStringKey)?.add(option.FilterQueryStringValue);
        }
      });
    });

    const queryString = Array.from(queryParams.entries())
      .map(([key, values]) => `${key}=${Array.from(values).join('_and_')}`)
      .join('&');

    return `https://www.doctoranytime.gr${this.BASE_URL}${queryString ? '?' + queryString : ''}`;
  }
}
