import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss'],
})
export class AddProjectComponent {
  afuConfig = {
    uploadAPI: {
      url: 'https://example-file-upload-api',
    },
  };
}
