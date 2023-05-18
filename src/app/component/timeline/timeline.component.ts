import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';
import { AddTimeLineItemComponent } from '../add-time-line-item/add-time-line-item.component';
import { TimeLineService } from 'src/app/services/time-line.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
})
export class TimelineComponent {
  TimeLine: any = [];
  status: boolean = false;
  arrow: string = 'left';
  userId: any;
  projectCount!: number;
  Role: string = 'user';
  constructor(
    private _dialog: MatDialog,
    private timeLine: TimeLineService,
    private userStore: UserStoreService,
    private auth: AuthService
  ) {}
  dialogConfig = new MatDialogConfig();
  openAddTimelineItem() {
    // dialogConfig.disableClose = false;
    // dialogConfig.autoFocus = true;

    var _popup = this._dialog.open(AddTimeLineItemComponent, {
      data: {
        projectCode:
          'TIM_U' + this.userId + '_00' + Number(this.projectCount + 1),
        proID: localStorage.getItem('Pro_Id'),
      },
    });
    _popup.afterClosed().subscribe((item) => {
      //console.log(item);
      this.lodeTimeLine(localStorage.getItem('Pro_Id'));
    });
  }
  addToggle() {
    this.status = !this.status;
    this.status == true ? (this.arrow = 'right') : (this.arrow = 'left');
  }
  ngOnInit(): void {
    var ID = localStorage.getItem('Pro_Id');

    this.getUserData();
    this.lodeTimeLine(ID);
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
  Timeline() {}

  lodeTimeLine(ID: any) {
    if (this.Role == 'Farmer') {
      this.timeLine
        .getTimeLine(Number(this.userId), Number(ID))
        .subscribe((res) => {
          this.TimeLine = res;
          console.log(this.TimeLine);

          this.projectCount = res.length;
        });
    } else {
      this.timeLine
        .getTimeLine(Number(this.userId), Number(ID))
        .subscribe((res) => {
          this.TimeLine = res;
          this.projectCount = res.length;
        });
    }
  }
}
