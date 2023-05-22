import {
  Component,
  OnInit,
  HostListener,
  ViewChild,
  Input,
  Inject,
  OnDestroy,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

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
import {
  Storage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from '@angular/fire/storage';

@Component({
  selector: 'app-add-time-line-item',
  templateUrl: './add-time-line-item.component.html',
  styleUrls: ['./add-time-line-item.component.scss'],
})
export class AddTimeLineItemComponent implements OnInit {
  timeLineForm!: FormGroup;
  userId!: Number;
  projectCode: any;
  projectId: any;
  Supervisors: any = [];
  Role: string = 'user';
  public datePikerActive: boolean = false;
  public selectctedFile: any = {};
  fileName = '';
  public imgUrl = '';
  public imgProgres: number = 0;
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private timeLine: TimeLineService,
    private router: Router,
    private users: ApiService,
    private userStore: UserStoreService,
    private toast: NgToastService,
    public storage: Storage,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<AddProjectComponent>
  ) {}
  currentDate = new Date();
  timeLineStatus = new FormControl();
  ngOnInit(): void {
    this.projectCode = this.data.projectCode;
    this.projectId = this.data.proID;
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
      startDate: [],
      endDate: [],
      image: [''],
      timeLineStatus: [0, Validators.required],
    });
  }
  afuConfig = {
    uploadAPI: {
      url: 'https://firebasestorage.googleapis.com/v0/b/greensagaweb.appspot.com',
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

  onFileselecter(event: any) {
    this.selectctedFile = event.target.files[0];
    this.fileName = this.selectctedFile.name;
  }
  onUpload() {
    const storageRef = ref(this.storage, this.selectctedFile.name);
    const uploadTask = uploadBytesResumable(storageRef, this.selectctedFile);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        this.imgProgres =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        //this.imgUrl = error.message;
        // console.log(error.message);
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          this.imgUrl = downloadURL;
          debugger;
          this.timeLineForm.patchValue({
            image: this.imgUrl,
          });
        });
      }
    );
  }

  selectStatus(event: any) {
    debugger;
    if (event == 1 || event == 5) {
      this.datePikerActive = true;
    } else {
      this.datePikerActive = false;
    }
  }
}
