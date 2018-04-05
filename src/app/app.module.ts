import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToasterModule, ToasterService } from 'angular5-toaster';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './modules/user/user.service';
import { TicketService } from './modules/ticket/ticket.service';
import { ServiceService } from './modules/service/service.service';
import { HeaderComponent } from './shared/layout/components/header/header.component';
import { FooterComponent } from './shared/layout/components/footer/footer.component';
import { HomeComponent } from './modules/misc/components/home/home.component';
import { AboutComponent } from './modules/misc/components/about/about.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/login/components/login.component';
import { CreateTicketComponent } from './modules/ticket/components/create-ticket/create-ticket.component';
import { ViewActiveTicketsComponent } from './modules/ticket/components/view-active-tickets/view-active-tickets.component';
import { MessageService } from './shared/services/messages/message.service';
import { CurrentTicketComponent } from './modules/ticket/components/current-ticket/current-ticket.component';
import { StudentService } from './modules/student/student.service';
import { StartShiftComponent } from './modules/service-provider/components/shift/shift.component';
import { ServiceProviderService } from './modules/service-provider/service-provider.service';
import { QueueService } from './modules/queue/queue.service';
import { CounterService } from './modules/counter/counter.service';

const appRoutes: Routes = [

  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'createTicket', component: CreateTicketComponent },
  { path: 'getCurrentTicket', component: CurrentTicketComponent },
  { path: 'viewActiveTickets', component: ViewActiveTicketsComponent },
  { path: 'shift', component: StartShiftComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home', pathMatch: 'full' }
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    LoginComponent,
    CreateTicketComponent,
    CurrentTicketComponent,
    ViewActiveTicketsComponent,
    StartShiftComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MDBBootstrapModule.forRoot(),
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    ToasterModule
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [
    UserService,
    TicketService,
    ServiceService,
    StudentService,
    ServiceProviderService,
    QueueService,
    CounterService,
    MessageService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }