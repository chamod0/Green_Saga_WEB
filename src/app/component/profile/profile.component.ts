import { Component, OnInit } from '@angular/core';
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
export class ProfileComponent implements OnInit {
  projects: any = [];
  userId: any;
  projectCount!: number;
  Role: string = 'user';
  constructor(
    private _dialog: MatDialog,
    private project: ProjectService,
    private userStore: UserStoreService,
    private auth: AuthService
  ) {}
  openAddProject() {
    const dialogConfig = new MatDialogConfig();

    // dialogConfig.disableClose = false;
    // dialogConfig.autoFocus = true;
    var _popup = this._dialog.open(AddProjectComponent, {
      data: {
        projectCode:
          'PRO_U' + this.userId + '_00' + Number(this.projectCount + 1),
      },
    });
    _popup.afterClosed().subscribe((item) => {
      //console.log(item);
      this.lodeProjrct();
    });
  }
  ngOnInit(): void {
    this.getUserData();
    this.lodeProjrct();
  }
  getUserData() {
    this.userStore.getRoleFromStore().subscribe((Role) => {
      let RoleFromToken = this.auth.getRoleFromToken();
      this.Role = Role || RoleFromToken;
    });
    this.userStore.getUserIdFromStore().subscribe((val) => {
      let userIdFromToken = this.auth.getUserIDFromToken();
      this.userId = val || userIdFromToken;
    });
  }

  lodeProjrct() {
    this.project.getProject(Number(this.userId), 0).subscribe((res) => {
      this.projects = res;
      this.projectCount = res.length;
    });
  }
}
