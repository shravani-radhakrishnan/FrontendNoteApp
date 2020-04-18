import { Component } from '@angular/core';
import { StorageService } from './core/services/storage.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'NoteApp';
  constructor(public storageService:StorageService){
    this.storageService.setItem('notes',[]);
  }
}
