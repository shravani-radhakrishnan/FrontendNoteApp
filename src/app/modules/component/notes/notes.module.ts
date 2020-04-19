import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotesComponent } from './notes.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
// import { SearchHighlightPipe } from 'src/app/shared/pipes/search-highlight.pipe';

const routes: Routes = [{
  path:'',
  component:NotesComponent
}];

@NgModule({
  declarations: [NotesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    SharedModule
  ],
  providers:[]
})
export class NotesModule { }
