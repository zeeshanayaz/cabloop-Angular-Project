import { Component, OnInit, Inject, ElementRef, HostListener  } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { SignupService } from '../../services/signup.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

	constructor(private signupservice: SignupService, @Inject(DOCUMENT) private document: Document,private el: ElementRef) { }

	shouldStick: boolean = false;
	isSignedIn: boolean = false;

	ngOnInit() {
		this.onWindowScroll();
		this.bingScrollEvent();
		this.isSignedIn = this.signupservice.isSignedIn();
	}

	public fixed: boolean = false; 

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
