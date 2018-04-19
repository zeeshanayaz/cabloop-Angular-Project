import { Component, OnInit,ElementRef } from '@angular/core';
import { FormGroup,FormControl,Validators,AbstractControl } from '@angular/forms';
import { IdProof } from './idproof.interface';
import { UserprofileService } from '../../services/userprofile.service';
import swal from 'sweetalert2';

@Component({
	selector: 'app-addid',
	templateUrl: './addid.component.html',
	styleUrls: ['./addid.component.css']
})

export class AddidComponent implements OnInit {

	addIdForm: FormGroup;
	idcat:string;
	imagee:any;
	loadingg:boolean = false;
	fieldId: any;
	getIdProofs: any[] = [];

	constructor(private userprofileservice:UserprofileService,private elem: ElementRef) { 
		this.addIdForm  = new FormGroup({
			'idNumber'   : new FormControl('',Validators.required),
			'idType'     : new FormControl('',Validators.required),
			'idCategory' : new FormControl('',Validators.required),
			'fullName'   : new FormControl('',Validators.required),
			'imageId'    : new FormControl('',Validators.required),
		});
	}

	ngOnInit() {
		this.showallIds();
	}

	public addIdProof(value1,value2,value3) {
		this.loadingg = true;
		this.userprofileservice.addId({
			idNumber: value1,
			idType: value2,
			idCategory: this.idcat,
			fullName: value3,
			imageId: this.fieldId
		})
		.subscribe(
			response =>  {
				this.loadingg = false;
				this.showallIds();
				swal('Good job!','Id has been added','success');
			},
			error => {
				this.loadingg = false;
				swal('Error!','Please Try again','error');
			}
		);
	}

	/*
	public uploadImage() {
		let files = this.elem.nativeElement.querySelector('#uploadBtn1').files;

		let formData = new FormData();
		let file = files[0];
		formData.append('images',file,file.name);
		//  console.log(formData.get('images'));
		this.userprofileservice.uploadImage(formData)
			.subscribe(
				response =>  {
					//	console.log(response.json().fileIds);
					this.showIds(response.json().fileIds) ;
				},
				error => {
					console.log(error)
				}
			);
	}
	*/

	public uploadImage(event) {
		let files: FileList = event.target.files;

		if(files.length > 0) {
			let file = files[0];
			let formData = new FormData();
			formData.append('images',file,file.name);

			this.userprofileservice.uploadImage(formData)
				.subscribe(
					response => {
						this.showIds(response.json().fileIds);
					},
					error => {
						swal('Error!','Image could not uploaded.Try Again','error');
					}
				);
		}
	}

	public showIds(any) {
		this.fieldId = any[0];
	}

	public showallIds() {
		this.userprofileservice.getAllIds()
			.subscribe(
				(data: any ) => this.getIdProofs = data,
				(error: Response) => console.log(error)
			);
	}

	public selectCat(value) {
		this.idcat = value;
	}
}
