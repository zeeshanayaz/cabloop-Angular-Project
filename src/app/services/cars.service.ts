import { Injectable } from '@angular/core';
import { Http,Headers,Response } from '@angular/http';
import { Base } from './global-urls';
import { Observable } from 'rxjs';
import 'rxjs/Rx';
import { AddCar } from '../components/addcar/addcar.interface';
import { AddRentals } from '../components/addcar/addrental.interface';
import { SelectedStates } from '../components/addcar/selectedstates.model';

@Injectable()
export class CarsService {

	constructor(private http: Http) { }

	getToken() {
		return localStorage.getItem('token');
	}

	public uploadImages(images:any) {
		const body = images;
		const token = this.getToken();
		const headers = new Headers();
		headers.append("Authorization",token);
		return this.http.post(Base.url +'fileUpload/images',body,{
			headers: headers
		});
	}

	public addcar(car:AddCar) {
		const token = this.getToken();
		const body = car ;
		const headers = new Headers();
		headers.append('Content-Type','application/json');
		headers.append("Authorization",token);
		return this.http.post(Base.url + 'car',body,{
			headers: headers
		});
	}

	public getStates() {
		const token = this.getToken();
		const headers = new Headers();
		headers.append("Authorization",token);
		return this.http.get(Base.url +'country/IN/getStates',{headers: headers})
			.map( (response:Response) => {
				return response.json().states
			});
	}

	public getOnlyIds() {
		const token = this.getToken();
		const headers = new Headers();
		headers.append("Authorization",token);
		return this.http.get(Base.url +'idProof?fields=id',{headers: headers})
			.map( (response:Response) => {
				return response.json().idProofs
			});
	}

	public getAllCars() {
		const token = this.getToken();
		const headers = new Headers();
		headers.append("Authorization",token);
		return this.http.get(Base.url +'car?fields=all',{headers: headers})
			.map( (response:Response) => {
				return response.json().cars
			});
	}

	public addRoadpermit(roadPermits,id) {
		const token = this.getToken();
		const body =  roadPermits ;
		const headers = new Headers();
		headers.append('Content-Type','application/json');
		headers.append("Authorization",token);
		return this.http.post(Base.url + 'car/' + id + '/roadPermits',body,{
			headers: headers
		});
	}

	/*	
	public addRental(rentals: AddRentals,id) {
		const token = this.getToken();
		const body = car ;
		const headers = new Headers();
		headers.append('Content-Type','application/json');
		headers.append("Authorization",token);
		return this.http.post(Base.url + 'car', + id + 'rentals',body,{
			headers: headers
		});
	}
	*/
}
