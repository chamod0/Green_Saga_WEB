import { Component, EventEmitter, Input, Output } from '@angular/core';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  //Sidebar toggle show hide function

  status: boolean = false;

  //addToggle = () => this.toggleSidebar.emit(!this.status);
  addToggle() {
    this.status = !this.status;
  }
}
