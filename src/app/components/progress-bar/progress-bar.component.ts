import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="progress-wrapper" *ngIf="isVisible">
      <div class="progress">
        <div class="progress-bar"
             role="progressbar"
             [style.width.%]="progress"
             [attr.aria-valuenow]="progress"
             aria-valuemin="0"
             aria-valuemax="100">
        </div>
      </div>
      <button class="close-button" (click)="hideProgressBar()">
        <i class="bi bi-x-lg"></i>
      </button>
    </div>
  `,
  styles: [`
    .progress-wrapper {
      position: relative;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      background-color: #F4F6F7;
      padding: 14px 20px 10px 20px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      display: flex;
      align-items: center;
      gap: 15px;
    }

    .progress {
      flex-grow: 1;
      height: .3rem;
      background-color: #DBDEE0;
      border-radius: 0.25rem;
      margin: 0;
    }

    .progress-bar {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #1F74AD;
      color: white;
      transition: width 0.3s ease;
    }

    .close-button {
      background: none;
      border: none;
      cursor: pointer;
      color: #50585E;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
    }

    .close-button i {
      font-size: 1.25rem;
    }

    .close-button:hover {
      color: #333;
    }
  `]
})
export class ProgressBarComponent {
  @Input() progress: number = 0;
  isVisible: boolean = true;

  hideProgressBar() {
    this.isVisible = false;
  }
}
