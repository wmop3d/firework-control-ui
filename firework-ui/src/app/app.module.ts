import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatCardModule } from '@angular/material/card'; // Add this line
import { TimerProgressBarComponent } from './timer-progress-bar/timer-progress-bar.component';
import { FireworkCountdownCardComponent } from './firework-card/firework-countdown-card.component';
import { FireworkManagerComponent } from './firework-manager/firework-manager.component'; // Add this line

@NgModule({
  declarations: [
    AppComponent,
    TimerProgressBarComponent,
    FireworkCountdownCardComponent,
    FireworkManagerComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatCardModule,
    DragDropModule // Add this line,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
