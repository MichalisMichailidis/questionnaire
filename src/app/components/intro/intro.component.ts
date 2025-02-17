import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-intro',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './intro.component.html',
  styleUrl: './intro.component.css'
})
export class IntroComponent {
  constructor(private router: Router) {}

  startQuestionnaire() {
    this.router.navigate(['/questionnaire']);
  }

  skip() {
    window.location.href = 'https://www.doctoranytime.gr';
  }
}
