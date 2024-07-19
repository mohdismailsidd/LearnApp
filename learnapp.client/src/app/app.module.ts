import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CourseDetailComponent } from './components/course-detail/course-detail.component';
import { CourseListComponent } from './components/course-list/course-list.component';
import { MatSnackBarModule } from '@angular/material/snack-bar'
import {MatButtonModule} from '@angular/material/button';

@NgModule({ declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        CourseListComponent,
        NavbarComponent,
        CourseDetailComponent
    ],
  bootstrap: [AppComponent],
  imports: [BrowserModule,
        AppRoutingModule,
        NgbModule,
        MatIconModule,
        RouterLink,
        RouterOutlet,
    RouterLinkActive,
    FormsModule, ReactiveFormsModule,MatSnackBarModule, MatButtonModule ],
    providers: [
        provideAnimationsAsync(),
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class AppModule { }
