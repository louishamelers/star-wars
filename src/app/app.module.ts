import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { CoreModule } from './core/core.module';
import { ROUTES } from './routes';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, RouterModule.forRoot(ROUTES), CoreModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
