import { Component } from '@angular/core';
// import { MatDialog } from '@angular/material/dialog';
import { AddProjectComponent } from '../add-project/add-project.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  constructor(private _dialog: MatDialog) {}
  openAddProject() {
    this._dialog.open(AddProjectComponent);
  }
}
