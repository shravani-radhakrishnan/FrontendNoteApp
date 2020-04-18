import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: 'note', pathMatch: 'full' },
  {
    path: 'note',
    loadChildren: () => import('./modules/component/notes/notes.module').then(m => m.NotesModule),
  },
  // {
  //   path: 'note/:id',
  //   loadChildren: () => import('./modules/component/detailed-note/detailed-note.module').then(m => m.DetailedNoteModule),
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
