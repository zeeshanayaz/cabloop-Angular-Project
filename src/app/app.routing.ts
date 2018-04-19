import { Routes,RouterModule } from '@angular/router';

import { SignupComponent } from './components/signup/signup.component';
import { UserprofileComponent } from './components/userprofile/userprofile.component';
import { HomeComponent } from './components/home/home.component';
import { AddidComponent } from './components/addid/addid.component';
import { MycarsComponent } from './components/mycars/mycars.component';
import { AddcarComponent } from './components/addcar/addcar.component';
import { CardetailsComponent } from './components/cardetails/cardetails.component';
import { ContactusComponent } from './components/contactus/contactus.component';
import { TermscondComponent } from './components/termscond/termscond.component';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { CareerComponent } from './components/career/career.component';
import { AuthGuard } from './auth.guard';
import { ServicesComponent } from './components/services/services.component';

const APP_ROUTES: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'contact-us', component: ContactusComponent },
	{ path: 'termscond', component: TermscondComponent },
	{ path: 'services', component: ServicesComponent },
	{ path: 'privacy', component: PrivacyComponent },
	{ path: 'career', component: CareerComponent },
	{ path: 'sign-up', component: SignupComponent },
	{ path: 'user-profile', component: UserprofileComponent,canActivate: [AuthGuard] },
	{ path: 'add-id', component: AddidComponent ,canActivate: [AuthGuard] },
	{ path: 'my-car', component: MycarsComponent,canActivate: [AuthGuard] },
	{ path: 'add-car', component: AddcarComponent,canActivate: [AuthGuard] },
	{ path: 'car-details', component: CardetailsComponent,canActivate: [AuthGuard] },
];

export const Routing = RouterModule.forRoot(APP_ROUTES);
