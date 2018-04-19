import { Component, OnInit,Input  } from '@angular/core';
import { FormGroup,FormControl,Validators,AbstractControl } from '@angular/forms';
import { CarsService } from '../../services/cars.service';
import swal from 'sweetalert2';
import { SignupService } from '../../services/signup.service';
import { Router } from '@angular/router';
import { SharedService  } from '../../services/shared.service';
import { CarDetails } from '../mycars/carsdetails.interface';

@Component({
  selector: 'app-cardetails',
  templateUrl: './cardetails.component.html',
  styleUrls: ['./cardetails.component.css']
})
export class CardetailsComponent implements OnInit {

	@Input() dcar: CarDetails;

	constructor(private shareddata:SharedService) { }

	ngOnInit() {
		this.dcar = this.shareddata.sharedDetails ;
		console.log(this.dcar);
	}
}
