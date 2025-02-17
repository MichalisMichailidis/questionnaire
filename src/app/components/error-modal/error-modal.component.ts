import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-error-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="error-modal">
      <div class="error-content">
        <div class="logo-container">
          <img src="assets/mindtime-logo.png" alt="MindTime Logo" class="logo">
        </div>
        <h3>Error</h3>
        <p>An error occurred while loading the questions. Please try again later.</p>
        <button class="btn btn-primary" onClick="window.location.reload()">
          Reload Page
        </button>
      </div>
    </div>
  `,
  styles: [`
    .error-modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }

    .error-content {
      background-color: #fff;
      padding: 2rem;
      border-radius: 8px;
      text-align: center;
      max-width: 400px;
      margin: 0 1rem;
    }

    .logo-container {
      text-align: center;
      margin-bottom: 2rem;
    }

    .logo {
      max-width: 150px;
      height: auto;
    }

    h3 {
      color: #dc3545;
      margin-bottom: 1rem;
    }

    p {
      margin-bottom: 1.5rem;
    }
  `]
})
export class ErrorModalComponent {}
