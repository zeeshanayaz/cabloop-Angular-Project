import { Component, OnInit,ElementRef } from '@angular/core';
import { FormGroup,FormControl,Validators,AbstractControl } from '@angular/forms';
import { CarsService } from '../../services/cars.service';
import swal from 'sweetalert2';
import { UserprofileService } from '../../services/userprofile.service';
import { AddCar } from './addcar.interface';
import { States } from './states.interface';
import { SelectedStates } from './selectedstates.model';
import { UserProfile } from '../userprofile/userprofile.interface';

@Component({
  selector: 'app-addcar',
  templateUrl: './addcar.component.html',
  styleUrls: ['./addcar.component.css']
})
export class AddcarComponent implements OnInit {

	ffieldIds: string[] = [];
	IdProofs: any[] = [];
	fieldIds: string[] = [];
	states: States[] = [];
	sstates: States[] = [];
	selectedStates: SelectedStates[] = [];

	/*
	sselectedStates = [
			{ countryCode: 'IN', stateCode: 'WB'},
			{ countryCode: 'IN', stateCode: 'MP'},
	];
	*/


	userId:any[] = [];
	loadingg: boolean = false;
	profileId: any;
	proofId: any = '';
	user: UserProfile ;
	carId: any;
	showPermitbutton: boolean = false;
	showRoadPermit: boolean = false;

	showairport: boolean = false;
	hourly: boolean = false;
	monthly: boolean = false;
	daily: boolean = false;
	dailylong: boolean = false;
	holiday: boolean = false;

	emessage1: string = '';
	emessage2: string = '';
	emessage3: string = '';
	emessage4: string = '';
	emessage5: string = '';
	error: boolean = false;

	addcarForm: FormGroup;

	constructor(private carservice:CarsService,private userprofileservice:UserprofileService,private elem: ElementRef) { 

		this.addcarForm  = new FormGroup({
			'regNumber'       : new FormControl('',Validators.required),
			'brand'           : new FormControl('',Validators.required),
			'model'           : new FormControl('',Validators.required),
			'mfgDate'         : new FormControl('',Validators.required),
			'insuranceUpto'   : new FormControl('',Validators.required),
			'polutionCertUpto': new FormControl('',Validators.required),
			'seatingCapacity' : new FormControl('',Validators.required),
			'fuelType'        : new FormControl('',Validators.required),
			'kmsRan'          : new FormControl('',Validators.required),
			'mileage'         : new FormControl('',Validators.required),
			'idProofId'       : new FormControl('',Validators.required),
			'imageIds'        : new FormControl('',Validators.required),
		});
	}

	ngOnInit() {
		this.showAllStates();
		this.showallIds();
		this.getCars();
		this.getUserProfile();
		console.log(this.fieldIds);
	}

	public uploadImage(event) {
		let files: FileList = event.target.files;

		if(files.length > 0) {
			let file = files[0];
			let formData = new FormData();
			formData.append('images',file,file.name);

			this.carservice.uploadImages(formData)
				.subscribe(
					response => {
						this.getfileIds(response.json().fileIds) ;
					},
					error => console.log(error)
				);
		}
	}

	public addCar(value1,value2,value3,value4,value5,value6,value7,value8,value9,value10) {
		this.loadingg = true;
		this.carservice.addcar({
			regNumber:         value1,
			brand:             value2,
			model:             value3,
			mfgDate:           value4,
			insuranceUpto:     value5,
			pollutionCertUpto: value6,
			seatingCapacity:   value7,
			fuelType:          value8,
			kmsRan:            value9,
			mileage:           value10,
			idProofId:   this.user.id,
			imageIds:    this.fieldIds
		})
		.subscribe(
			response => {
				this.loadingg = false;
				console.log(response);
				this.carId = response.json().carId;
				console.log(this.carId);
				this.showRoadPermit = true;
				swal('Good job!','Your Car has been added,You can add your car permit now','success');
			},
			error => {
				this.error = true;
				this.loadingg = false;
				this.showError(error.json().message) ;
			}
		)
	}

	public getfileIds(any) {
		this.ffieldIds.push(any);
		console.log(this.ffieldIds);

		if(this.ffieldIds.length === 1) {
			this.fieldIds.push(this.ffieldIds[0][0]);
			console.log(this.fieldIds);
		}
		else if (this.ffieldIds.length === 2) {
			this.fieldIds.push(this.ffieldIds[1][0] );
			console.log(this.fieldIds);
		}
		else {

			this.fieldIds.push(this.ffieldIds[2][0] );
			console.log(this.fieldIds);
		}
	}

	public showallIds() {
		this.userprofileservice.getOnlyIds()
			.subscribe(
				(data: any ) =>  this.userId = data,
				(error: Response) => console.log(error)
			);
	}

	public getUserProfile() {
		this.userprofileservice.getuserInfo()
			.subscribe(
				(data: any ) =>  {
					this.user = data;
					console.log(this.user);
				}, 
				(error: Response) => console.log(error)
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

	public showAllStates() {
		this.carservice.getStates()
			.subscribe(
				(data:any)  =>	this.states = data,
				(error: Response) => console.log(error)
			);
	}

	public selectstates(state) {
		this.selectedStates.push(
			{ countryCode: 'IN', stateCode: state}
		);
		this.sstates.push(state);
		this.showPermitbutton = true;
		console.log(this.selectedStates) ;
	}

	public getCars() {
		this.carservice.getAllCars()
			.subscribe(
				(data:any)  =>	console.log(data),
				(error: Response) => console.log(error)
			);
	}

	public addRoadPermit() {
		this.carservice.addRoadpermit(this.selectedStates,6)
			.subscribe(
				response => console.log(response),
				error    => console.log(error)
			)
	}

	/*
	public addAirportRebtal(value1,value2,value3,value4,value5,value6) {
		this.loadingg = true;
		this.carservice.addRental({
			serviceType      :  "APD",
			rentalType       :  value1,
			fuelCharges      :  value2,
			freeCancellation :  value3,
			rentPerHour      :  value4,
			excessKmRent     :  value5,
			otherCharges     :  value6,
		})
		.subscribe(
			response =>  {
				this.loadingg = false;
				console.log(response);
				swal('Good job!','Your Car has been added,You can add your car permit now','success');
			},
			error => {
				this.error = true;
				this.loadingg = false;
			//	console.log(error.json().message);
				this.showError(error.json().message) ;
			}
		)
	}
	*/

	public showAirportPickup() {
		this.showairport = !this.showairport;
	}

	public showHourly() {
		this.hourly = !this.hourly;
	}

	public showMonthly() {
		this.monthly = !this.monthly;
	}

	public showDaily() {
		this.daily = !this.daily;
	}

	public dailyLong() {
		this.dailylong = !this.dailylong;
	}

	public showHoliday() {
		this.holiday = !this.holiday;
	}
}
