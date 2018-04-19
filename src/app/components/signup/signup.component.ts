import { Component, OnInit, Inject, ElementRef, HostListener } from '@angular/core';
import { FormGroup,FormControl,Validators,AbstractControl } from '@angular/forms';
import { User } from './user.interface';
import { SignupService } from '../../services/signup.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {
	userSignUpForm: FormGroup;
	userSignInForm: FormGroup;

	shouldStick: boolean = false;
	public fixed: boolean = false;
	public error: boolean = false;
	emessage1: string = '';
	emessage2: string = '';
	emessage3: string = '';
	emessage4: string = '';
	emessage5: string = '';

	loadingg:boolean = false;

	constructor(private signupservice:SignupService,private router: Router,@Inject(DOCUMENT) private document: Document,private el: ElementRef) {
		this.userSignUpForm = new FormGroup({
			'emailId'        : new FormControl('',Validators.required),
			'mobileNumber'   : new FormControl('',Validators.required),
			'fullName'       : new FormControl('',Validators.required),
			'alias'          : new FormControl('',Validators.required),
			'password'       : new FormControl('',[Validators.required,Validators.minLength(8)])
		});

		this.userSignInForm = new FormGroup({
			'userName'       : new FormControl('',Validators.required),
			'password'       : new FormControl('',Validators.required)
		});
	}

	ngOnInit() {
		this.onWindowScroll();
		this.bingScrollEvent();
	}

	onSignUp(value1,value2,value3,value4,value5) {
		this.loadingg = true;
		this.signupservice.signUpUser({
			emailId      : value4,
			mobileNumber : value1,
			fullName     : value2,
			alias        : value3,
			password     : value5
		})
		.subscribe(
			response =>  {
				this.loadingg = false;
				swal('Good job!','Your Account has been Created! Please Log In to Continue','success');
			},
			error => {
				this.error = true;
				this.loadingg = false;
				//console.log(error.json().message);
				this.showError(error.json().message) ;
			}
		);
	}

	public showError(any) {
		if(any === Array ) {
			this.emessage1 = any[0];
			this.emessage2 = any[1];
			this.emessage3 = any[2];
			this.emessage4 = any[3];
			this.emessage5 = any[4];
		} else {
			this.emessage1 = any;
		}
	}

	onLogIn(value1,value2) {
		this.loadingg = true;
		this.signupservice.signInUser(value1,value2)
			.subscribe(
				response => {
					this.loadingg = false;
					this.router.navigate(['/user-profile']);
					},
				error  => {
					this.loadingg = false;
					swal('Error!','Please Try Again!','error')
				}
			)
	}

	bingScrollEvent() {
		window.addEventListener('scroll', (e) => {
			if (window.pageYOffset > 100) {
				this.shouldStick = true;
			} else {
				this.shouldStick = false;
			}
		});
	}

	@HostListener('window:scroll', [])
	onWindowScroll() {
		let number = window.pageYOffset || document.documentElement.scrollTop || window.scrollY || 0;
		if (number > 100) {
			this.fixed = true;
		} else if (this.fixed && number < 10) {
			this.fixed = false;
		}
	}
}
