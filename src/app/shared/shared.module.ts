import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';

import { from } from 'rxjs';
import { NavHeaderComponent } from '../core/components/nav-header/nav-header.component';
import { SearchHighlightPipe } from './pipes/search-highlight.pipe';
@NgModule({
    declarations: [
      NavHeaderComponent,
      SearchHighlightPipe
    ],
    imports: [
        CommonModule,
        // SearchHighlightPipe
    ],
    exports:[NavHeaderComponent,SearchHighlightPipe],
    providers:[SearchHighlightPipe]

  })
  export class SharedModule { }
