import {
  Component,
  OnInit,
  HostListener,
  ViewChild,
  Input,
  Inject,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import ValidatorForm from 'src/app/helpers/validateForm';
import { AuthService } from 'src/app/services/auth.service';
import { ProjectService } from 'src/app/services/project.service';
import { UserStoreService } from 'src/app/services/user-store.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { AddProjectComponent } from '../add-project/add-project.component';
import { TimeLineService } from 'src/app/services/time-line.service';

@Component({
  selector: 'app-add-time-line-item',
  templateUrl: './add-time-line-item.component.html',
  styleUrls: ['./add-time-line-item.component.scss'],
})
export class AddTimeLineItemComponent {
  timeLineForm!: FormGroup;
  userId!: Number;
  projectCode: any;
  projectId: any;
  Supervisors: any = [];
  Role: string = 'user';

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private timeLine: TimeLineService,
    private router: Router,
    private users: ApiService,
    private userStore: UserStoreService,
    private toast: NgToastService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<AddProjectComponent>
  ) {}
  currentDate = new Date();

  ngOnInit(): void {
    this.projectCode = this.data.projectCode;
    this.getUserData();

    var farmrerID = 0;
    var supervisorID = 0;
    if (this.Role == 'Farmer') {
      farmrerID = 1;
    } else {
      supervisorID = 1;
    }

    this.timeLineForm = this.fb.group({
      projectId: [this.projectId, Validators.required],
      title: ['', Validators.required],
      farmerId: [farmrerID],
      description: ['', Validators.required],
      supervisorID: [supervisorID],
      isActive: [true],
      createby: [this.userId, Validators.required],
      userID: [this.userId, Validators.required],
      createAt: [this.currentDate],
      timeLineStatus: [0, Validators.required],
    });
  }
  afuConfig = {
    uploadAPI: {
      url: 'https://example-file-upload-api',
    },
  };
  onSubmit() {
    debugger;
    if (this.timeLineForm.valid) {
      this.timeLine.addToTimeLine(this.timeLineForm.value).subscribe({
        next: (res) => {
          this.timeLineForm.reset();
          this.router.navigate(['timeline']);
          this.toast.success({
            detail: 'SUCCESS',
            summary: res.message,
            duration: 5000,
          });
          this.ref.close('Check');
        },
        error: (err) => {
          this.toast.error({
            detail: 'Error',
            summary: err.error.message,
            duration: 5000,
          });
        },
      });
    } else {
      ValidatorForm.validateAllFormFildes(this.timeLineForm);
    }
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
}
