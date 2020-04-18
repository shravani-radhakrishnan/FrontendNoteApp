import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { NavHeaderComponent } from './core/components/nav-header/nav-header.component';
import { SharedModule } from './shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import {AppDataService} from './shared/services/app-data.service';
import { SearchHighlightPipe } from './core/pipes/search-highlight.pipe';


@NgModule({
  declarations: [
    AppComponent,
    SearchHighlightPipe
    // NavHeaderComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule,
    AppRoutingModule,
    SharedModule,
  ],
  exports:[SearchHighlightPipe],
  providers: [AppDataService],
  bootstrap: [AppComponent],
})
export class AppModule { }
