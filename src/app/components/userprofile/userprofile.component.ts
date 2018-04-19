import { Component, OnInit,ViewChild } from '@angular/core';
import { UserprofileService } from '../../services/userprofile.service';
import { UserProfile } from './userprofile.interface';
import { ModalDirective } from 'angular-bootstrap-md';
import { FormGroup,FormControl,Validators,AbstractControl } from '@angular/forms';
import swal from 'sweetalert2';

@Component({
	selector: 'app-userprofile',
	templateUrl: './userprofile.component.html',
	styleUrls: ['./userprofile.component.css']
})

export class UserprofileComponent implements OnInit {

@ViewChild('autoShownModal') public autoShownModal:ModalDirective;
	gender: string = '';
	public isModalShown:boolean = false;
	user: UserProfile  ;
	show: boolean = false;
	loadingg:boolean = false;
	userloadingError: boolean = false;

	userUpdateForm:     FormGroup;
	updatePasswordForm: FormGroup;

	constructor(private userprofileservice: UserprofileService) {
		this.userUpdateForm  = new FormGroup({
			'fullName'     : new FormControl('',Validators.required),
			'address'      : new FormControl('',Validators.required),
			'gender'       : new FormControl('',Validators.required),
			'dob'          : new FormControl('',Validators.required),
		}) ; 

		this.updatePasswordForm = new FormGroup({
			'oldpassword'   : new FormControl('',Validators.required),
			'newpassword'   : new FormControl('',Validators.required),
			'renewpassword' : new FormControl('',Validators.required)		
		});
	}

	ngOnInit() {
		this.getUserProfile();
		//console.log(this.user);
	}

	public getUserProfile() {
		this.userprofileservice.getuserInfo()
			.subscribe(
				(data: any ) => {
					this.user = data;
				}, 
				(error: Response) => this.userloadingError = true 
			);
	}

	public showModal():void {
		this.isModalShown = true;
	}

	public hideModal():void {
		this.autoShownModal.hide();
	}

	public onHidden():void {
		this.isModalShown = false;
	}

	public updateProfile(fullName,address,dob) {
		this.userprofileservice.updateUserInfo(fullName,address,this.gender,dob)
			.subscribe(
				response => {
					swal({
						title: 'Success',
						text: ('Your Changes has been Saved'),
						type: 'success',
						confirmButtonText: 'OK'
					}).then(function () { 
						this.getUserProfile();
					}.bind(this));
				},
				error => {
					swal("Oops!", "Please Try Again!", "error");
				}
			);
	}

	public changePassword(oldpassword,newpassword) {
		this.loadingg = true;
		this.userprofileservice.updatePassword(oldpassword,newpassword)
			.subscribe(
				response => {
					swal('Good job!','Your Password has changed','success');
					this.loadingg = false;
				},
				error => {
					swal('Oops!','Something went wrong,Please Try Again','error');
					this.loadingg = false;
				}
			);
	}

	public selectGender(value) {
		this.gender = value;
	}
}
