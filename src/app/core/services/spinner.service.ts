import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


export interface ISpinnerService {
  spinner$: Observable<boolean>;
  show(): void;
  hide(): void;
}


@Injectable({
  providedIn: 'root'
})
export class SpinnerService implements ISpinnerService {
  private spinnerSubject = new BehaviorSubject<boolean>(false);
  spinner$: Observable<boolean> = this.spinnerSubject.asObservable();

  show(): void {
    this.spinnerSubject.next(true);
  }

  hide(): void {
    this.spinnerSubject.next(false);
  }
}

export class PaymentSpinnerService implements ISpinnerService {
  private spinnerSubject = new BehaviorSubject<boolean>(false);
  spinner$ = this.spinnerSubject.asObservable();

  show(): void {
    this.spinnerSubject.next(true);
  }

  hide(): void {
    this.spinnerSubject.next(false);
  }
}
