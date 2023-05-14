import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'GreenSaga';
  hideLogo = false;
  isMobile = false;

  constructor(
    private breakpointService: BreakpointObserver,
    public auth: AuthService
  ) {}
  ngOnInit() {
    this.breakpointService
      .observe([Breakpoints.Small, Breakpoints.XSmall])
      .subscribe((result) => {
        this.hideLogo = false;
        this.isMobile = false;

        if (result.breakpoints[Breakpoints.Small]) {
          this.hideLogo = true;
        }

        if (result.breakpoints[Breakpoints.XSmall]) {
          this.hideLogo = true;
          this.isMobile = true;
        }
      });
  }
}
