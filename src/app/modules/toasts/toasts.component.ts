import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, map, takeUntil, tap } from 'rxjs';
import { ToastsService } from 'src/app/core/services/toasts.service';
import { ToastsState } from 'src/app/core/state';
import { MODELS } from 'src/app/shared';

@Component({
  selector: 'app-toasts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toasts.component.html',
  styleUrls: ['./toasts.component.scss'],
})
export class ToastsComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<void>();
  toasts$?: Observable<(MODELS.Toast & { toastClass: string })[]>;
  onRemoveToast$ = new Subject<string>();

  constructor(private toastService: ToastsService) {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.handleOnRemoveToast();
  }

  private handleOnRemoveToast(): void {
    this.onRemoveToast$.pipe(takeUntil(this.destroy$)).subscribe((id) => {
      this.toastService.removeToast(id);
    });
  }

  private initToasts(): void {
    const mapTypeToClass = (type: MODELS.ToastType): string => {
      switch (type) {
        case 'success':
          return 'text-bg-success';
        case 'error':
          return 'text-bg-danger';
        case 'warning':
          return 'text-bg-warning';
        default:
          return 'text-bg-info';
      }
    };

    this.toasts$ = ToastsState.toasts$.pipe(
      map((toasts: MODELS.Toast[]) =>
        toasts.map((toast) => ({
          ...toast,
          toastClass: mapTypeToClass(toast.type),
        }))
      )
    );
  }
}
