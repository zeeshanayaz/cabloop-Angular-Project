import { Injectable } from '@angular/core';
import { Http,Headers,Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/Rx';
import { User } from '../components/signup/user.interface';
import { Base } from './global-urls';

@Injectable()
export class SignupService {

	constructor(private http: Http) { }

	public isSignedIn() {
		return (localStorage.token) ? true : false;
	}

	public signUpUser(user:User) {
		const body = JSON.stringify(user);
		const headers = new Headers();
		headers.append('Content-Type','application/json');
			return this.http.post(Base.url +'user/signup',body,{
			headers: headers
		});
	}

	public signInUser(userName:string,password:string) {
		const headers = new Headers();
		headers.append('Content-Type','application/json');

		return this.http.post(Base.url +'user/signin',
			{userName: userName, password: password},
			{headers: headers})
			.map( (response: Response) => {
				const token = response.json().token;
				const base64Url = token.split('.')[1];
				const base64 = base64Url.replace('-','+').replace('_','/');
				return {
					token: token,decoded: JSON.parse(window.atob(base64))
				};
			})
			.do( tokenData => {
				localStorage.setItem('token',tokenData.token);
			});
	}

	public logout() {
		localStorage.removeItem('token');
	}
}
