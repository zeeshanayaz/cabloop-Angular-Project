import { Injectable } from '@angular/core';
import { Router,CanActivate,RouterStateSnapshot,ActivatedRouteSnapshot } from '@angular/router';
import { SignupService } from './services/signup.service';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class AuthGuard implements CanActivate{
	constructor(private router: Router) {}
	canActivate(route: ActivatedRouteSnapshot,state:RouterStateSnapshot): Observable<boolean> | boolean{
		if( localStorage.getItem('token')) {
			return true;
		} 
		this.router.navigate(['/sign-up']);
		return false ;
	}
}