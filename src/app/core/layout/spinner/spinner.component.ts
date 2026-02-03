import { SpinnerService } from 'src/app/core/services/spinner.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="isLoading | async" class="page-preloader">
      <div class="spinner"></div>
    </div>
  `,
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent {
  isLoading = this.spinnerService.spinner$;

  constructor(private spinnerService: SpinnerService) {}
}
