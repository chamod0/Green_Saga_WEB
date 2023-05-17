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

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss'],
})
export class AddProjectComponent implements OnInit {
  projectForm!: FormGroup;
  userId!: Number;
  projectCode: any;
  Supervisors: any = [];
  todayDate: Date = new Date();
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private project: ProjectService,
    private router: Router,
    private users: ApiService,
    private userStore: UserStoreService,
    private toast: NgToastService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<AddProjectComponent>
  ) {}
  afuConfig = {
    uploadAPI: {
      url: 'https://example-file-upload-api',
    },
  };

  ngOnInit(): void {
    this.getSupervisors();
    this.projectCode = this.data.projectCode;
    this.userStore.getUserIdFromStore().subscribe((val) => {
      let userIdFromToken = this.auth.getUserIDFromToken();
      this.userId = val || userIdFromToken;
    });
    var myDate = new Date();

    debugger;
    this.projectForm = this.fb.group({
      projectCode: [this.projectCode, Validators.required],
      projectName: ['', Validators.required],
      description: ['', Validators.required],
      cutivationType: ['', Validators.required],
      createby: [this.userId, Validators.required],
      userID: [this.userId, Validators.required],
      createAt: [myDate],
    });
  }
  getSupervisors() {
    this.users.getSupervisor().subscribe((res) => {
      debugger;
      this.Supervisors = res;
    });
  }

  onSubmit() {
    debugger;
    if (this.projectForm.valid) {
      this.project.createProject(this.projectForm.value).subscribe({
        next: (res) => {
          this.projectForm.reset();
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
      ValidatorForm.validateAllFormFildes(this.projectForm);
    }
  }
}
