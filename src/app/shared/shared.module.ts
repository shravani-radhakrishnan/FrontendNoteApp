import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';

import { from } from 'rxjs';
import { NavHeaderComponent } from '../core/components/nav-header/nav-header.component';
import { SearchHighlightPipe } from './pipes/search-highlight.pipe';
import { HighlightPipe } from './pipes/highlight.pipe';
@NgModule({
    declarations: [
      NavHeaderComponent,
      SearchHighlightPipe,
      HighlightPipe
    ],
    imports: [
        CommonModule,
        // SearchHighlightPipe
    ],
    exports:[NavHeaderComponent,SearchHighlightPipe,HighlightPipe],
    providers:[SearchHighlightPipe,HighlightPipe]

  })
  export class SharedModule { }
