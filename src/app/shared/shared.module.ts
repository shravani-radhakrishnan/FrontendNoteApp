import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';

import { from } from 'rxjs';
import { NavHeaderComponent } from '../core/components/nav-header/nav-header.component';
@NgModule({
    declarations: [
      NavHeaderComponent,
    ],
    imports: [
        CommonModule
    ],
    exports:[NavHeaderComponent]

  })
  export class SharedModule { }
