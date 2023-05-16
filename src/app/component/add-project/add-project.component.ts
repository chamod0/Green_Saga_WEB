import {
  Component,
  OnInit,
  HostListener,
  ViewChild,
  Input,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import ValidatorForm from 'src/app/helpers/validateForm';
import { AuthService } from 'src/app/services/auth.service';
import { ProjectService } from 'src/app/services/project.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss'],
})
export class AddProjectComponent implements OnInit {
  @Input() childName: string | undefined;
  projectForm!: FormGroup;
  currentDate = new Date();
  userId!: Number;
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private project: ProjectService,
    private router: Router,

    private userStore: UserStoreService,
    private toast: NgToastService
  ) {}
  afuConfig = {
    uploadAPI: {
      url: 'https://example-file-upload-api',
    },
  };

  ngOnInit(): void {
    this.userStore.getUseIdFromStore().subscribe((val) => {
      let userIdFromToken = this.auth.getUserIDFromToken();
      this.userId = val || userIdFromToken;
    });

    this.projectForm = this.fb.group({
      projectCode: ['', Validators.required],
      projectName: ['', Validators.required],
      description: ['', Validators.required],
      cutivationType: ['', Validators.required],
      createby: [this.userId, Validators.required],
      userID: [this.userId, Validators.required],
    });
  }

  onSubmit() {
    debugger;
    if (this.projectForm.valid) {
      debugger;
      this.project.createProject(this.projectForm.value).subscribe({
        next: (res) => {
          this.projectForm.reset();
          this.router.navigate(['timeline']);
          this.toast.success({
            detail: 'SUCCESS',
            summary: res.message,
            duration: 5000,
          });
          this.childName = 'childetest';
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
