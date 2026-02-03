import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {

    private _declarationNumber!: string;

    get DeclarationNumber() {
        return this._declarationNumber;
    }

    constructor() { }

    GetDeclarationNumber(value: string) {
        this._declarationNumber = value;
    }

}
