import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  isConnected: boolean = false;
  constructor() { }
}
