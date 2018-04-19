import { Injectable } from '@angular/core';
import { Http,Headers,Response } from '@angular/http';
import { Base } from './global-urls';
import { Observable } from 'rxjs';
import 'rxjs/Rx';
import { IdProof } from '../components/addid/idproof.interface';

@Injectable()
export class UserprofileService {

	constructor(private http: Http) { }

	getToken() {
		return localStorage.getItem('token');
	}

	public getuserInfo(): Observable<any> {
		const token = this.getToken();
		const headers = new Headers();
		headers.append("Authorization",token);

		return this.http.get(Base.url + 'user/profile',{headers: headers})
			.map( (response:Response) => {
				return response.json().profile
			});
	}

	public updateUserInfo(fullName: string,address: string,gender:string,dob:string) {	    
		const body = JSON.stringify({fullName: fullName, address: address, gender: gender, dob: dob});
		const token = this.getToken();
		const headers = new Headers();
		headers.append('Content-Type','application/json');
		headers.append("Authorization",token);
		return this.http.post(Base.url + 'user/profile',body,{
			headers: headers
		});
	}

	public addId(idproof:IdProof) {
		const body = JSON.stringify(idproof);
		const token = this.getToken();
		const headers = new Headers();
		headers.append('Content-Type','application/json');
		headers.append("Authorization",token);

		return this.http.post(Base.url + 'idProof',body,{
			headers: headers
		});
	}

	public uploadImage(images:any) {
		const body = images;
		const token = this.getToken();
		const headers = new Headers();	
		headers.append("Authorization",token);

		return this.http.post(Base.url + 'fileUpload/images',body,{
			headers: headers
		});
	}

	public getAllIds() {
		const token = this.getToken();
		const headers = new Headers();
		headers.append("Authorization",token);
		return this.http.get(Base.url +'idProof?fields=fullName,idType',{headers: headers})
			.map( (response:Response) => {
				return response.json().idProofs
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

	public updatePassword(currentPassword: string,newPassword: string) {
		const body = JSON.stringify({currentPassword:currentPassword,newPassword:newPassword});
		const token = this.getToken();
		const headers = new Headers();
		headers.append('Content-Type','application/json');
		headers.append("Authorization",token);
		return this.http.put(Base.url + 'user/password',body,{
			headers: headers
		});
	}
}
