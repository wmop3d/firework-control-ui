import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { FireworkListComponent } from './firework-list/firework-list.component'; // Add this line
import { AddFireworkComponent } from './add-firework/add-firework.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FireworkCardComponent } from './firework-card/firework-card.component'; // Add this line
import { MatCardModule } from '@angular/material/card'; // Add this line

@NgModule({
  declarations: [
    AppComponent,
    AddFireworkComponent,
    FireworkListComponent,
    FireworkCardComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatCardModule,
    DragDropModule // Add this line
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
