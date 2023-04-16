import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { CoreModule } from './core/core.module';
import { ROUTES } from './routes';
import { environment } from 'src/environments/environment';

import { devTools } from '@ngneat/elf-devtools';

// enable devtools for elf-store
if (!environment.production) {
  devTools();
}

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, RouterModule.forRoot(ROUTES), CoreModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
