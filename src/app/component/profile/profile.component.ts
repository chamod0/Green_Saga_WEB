import { Component } from '@angular/core';
// import { MatDialog } from '@angular/material/dialog';
import { AddProjectComponent } from '../add-project/add-project.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ProjectService } from 'src/app/services/project.service';
import { UserStoreService } from 'src/app/services/user-store.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  projects: any = [];
  userId: any;
  projectCount: any;
  constructor(
    private _dialog: MatDialog,
    private project: ProjectService,
    private userStore: UserStoreService,
    private auth: AuthService
  ) {}
  openAddProject() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    this._dialog.open(AddProjectComponent, dialogConfig);
  }
  ngOnInit(): void {
    this.userStore.getUseIdFromStore().subscribe((val) => {
      let userIdFromToken = this.auth.getUserIDFromToken();
      this.userId = val || userIdFromToken;
    });
    this.lodeProjrct();
  }

  lodeProjrct() {
    this.project.getProject(this.userId, 0).subscribe((res) => {
      this.projects = res;
      this.projectCount = res.length;
    });
  }
}
