import { Component } from '@angular/core';
import { AddFireworkComponent } from '../add-firework/add-firework.component';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Firework } from '../models/firework';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-firework-list',
  templateUrl: './firework-list.component.html',
  styleUrls: ['./firework-list.component.css'] 
})
export class FireworkListComponent {
  fireworkForm: any;

  fireworks: Firework[] = [];

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
  ) {

    this.fireworkForm = this.fb.group({
      id: [0],
      name: [''],
      length: [0],
      description: ['']
    });
  }

  openDialog(): void {
    console.log("opening dialog")
    const dialogRef = this.dialog.open(AddFireworkComponent, {
      width: '600px',
      data: this.fireworkForm
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('The dialog was closed', result);
      this.fireworks.push(result);
      console.log(this.fireworks)
    });
  }

 

  drop(event: CdkDragDrop<Firework[]>) {
    moveItemInArray(this.fireworks, event.previousIndex, event.currentIndex);
  }

  
}
