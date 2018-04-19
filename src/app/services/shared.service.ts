import { Injectable } from '@angular/core';
import { CarDetails } from '../components/mycars/carsdetails.interface';

@Injectable()
export class SharedService {

	constructor() { }

	sharedDetails: CarDetails;
}
