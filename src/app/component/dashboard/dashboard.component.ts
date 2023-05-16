import { Component, OnInit, Input } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import ValidatorForm from 'src/app/helpers/validateForm';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  status: boolean = false;
  arrow: string = 'left';
  users: any = [];
  fullName: string = 'user';
  Role: string = 'user';
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private api: ApiService,
    private userStore: UserStoreService
  ) {}
  ngOnInit(): void {
    this.api.getUsers().subscribe((res) => {
      this.users = res;
    });

    this.userStore.getFullNameFromStore().subscribe((val) => {
      let fullNameFromToken = this.auth.getFullNameFromToken();
      this.fullName = val || fullNameFromToken;
    });
    this.userStore.getRoleFromStore().subscribe((val) => {
      let RoleFromToken = this.auth.getRoleFromToken();
      this.Role = val || RoleFromToken;
    });
  }
  //addToggle = () => this.toggleSidebar.emit(!this.status);
  addToggle() {
    this.status = !this.status;
    this.status == true ? (this.arrow = 'right') : (this.arrow = 'left');
  }

  logout() {
    this.auth.logout();
  }
}
