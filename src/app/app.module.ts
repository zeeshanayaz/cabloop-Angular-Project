import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthGuard } from './auth.guard';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { SignupService } from './services/signup.service';
import { UserprofileService } from './services/userprofile.service';
import { CarsService } from './services/cars.service';
import { SharedService } from './services/shared.service';

import { HttpModule } from '@angular/http';
import { UserprofileComponent } from './components/userprofile/userprofile.component';

import { Routing } from './app.routing';
import { HomeComponent } from './components/home/home.component';
import { AddidComponent } from './components/addid/addid.component';

//import {MyDatePicker} from 'MyDatePicker/src/my-date-picker';
import { MycarsComponent } from './components/mycars/mycars.component';
import { AddcarComponent } from './components/addcar/addcar.component';
import { CardetailsComponent } from './components/cardetails/cardetails.component';
import { ContactusComponent } from './components/contactus/contactus.component';
import { TermscondComponent } from './components/termscond/termscond.component';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { CareerComponent } from './components/career/career.component';
import { ServicesComponent } from './components/services/services.component';
import { VendormenuComponent } from './components/vendormenu/vendormenu.component';

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		FooterComponent,
		SignupComponent,
		UserprofileComponent,
		HomeComponent,
		AddidComponent,
		MycarsComponent,
		AddcarComponent,
		CardetailsComponent,
		ContactusComponent,
		TermscondComponent,
		PrivacyComponent,
		CareerComponent,
		ServicesComponent,
		VendormenuComponent
	],
	imports: [
		BrowserModule,
		Routing,
		HttpModule,
		FormsModule,
		ReactiveFormsModule,
		MDBBootstrapModule.forRoot()
	],
	schemas: [ NO_ERRORS_SCHEMA ],
	providers: [SignupService,UserprofileService,CarsService,SharedService,AuthGuard ],
	bootstrap: [AppComponent]
})
export class AppModule { }
