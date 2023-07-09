import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Firework } from '../models/firework';

@Component({
  selector: 'app-firework',
  templateUrl: './add-firework.component.html',
  styleUrls: ['./add-firework.component.css']
})

export class AddFireworkComponent implements OnInit {
  fireworkForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<AddFireworkComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FormGroup
  
  ) {
    this.fireworkForm = this.fb.group({
      id: [0],
      name: [''],
      length: [0],
      description: ['']
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    const firework: Firework = this.fireworkForm.value;
    this.dialogRef.close(firework);
    console.log(firework);
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
