import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MenuSelected } from '../models/interfaces/ITab';

@Injectable({
  providedIn: 'root'
})
export class TabServiceService {
  tabItemObservable: Subject<MenuSelected> = new Subject<MenuSelected>();
  constructor() { }
}
