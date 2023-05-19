import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { SignupComponent } from './component/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { NgToastModule } from 'ng-angular-popup';
import { TokenInterceptor } from './component/interceptor/token.interceptor';
import { NavbarComponent } from './component/dashboard/navbar/navbar.component';
import { SidebarComponent } from './component/dashboard/sidebar/sidebar.component';
import { ProfileComponent } from './component/profile/profile.component';
import { TimelineComponent } from './component/timeline/timeline.component';
import { CultivationComponent } from './component/cultivation/cultivation.component';
import { AddProjectComponent } from './component/add-project/add-project.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { AngularFileUploaderModule } from 'angular-file-uploader';
import { DateAsAgoPipe } from './component/shared/date-as-ago.pipe';
import { AddTimeLineItemComponent } from './component/add-time-line-item/add-time-line-item.component';
import { MatIconModule } from '@angular/material/icon';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    NavbarComponent,
    SidebarComponent,
    ProfileComponent,
    TimelineComponent,
    CultivationComponent,
    AddProjectComponent,
    DateAsAgoPipe,
    AddTimeLineItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgToastModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatInputModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatDividerModule,
    AngularFileUploaderModule,
    MatIconModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    MatProgressBarModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
  exports: [DateAsAgoPipe],
})
export class AppModule {}
