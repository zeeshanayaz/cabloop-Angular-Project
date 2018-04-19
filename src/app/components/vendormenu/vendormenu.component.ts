import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignupService } from '../../services/signup.service';

@Component({
	selector: 'app-vendormenu',
	templateUrl: './vendormenu.component.html',
	styleUrls: ['./vendormenu.component.css']
})
export class VendormenuComponent implements OnInit {

	constructor(private signupservice: SignupService, private router: Router) {
	}

	ngOnInit() {
	}

	public logOut() {
		this.signupservice.logout();
		this.router.navigate(['']);
	}
}
