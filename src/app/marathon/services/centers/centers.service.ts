import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Center } from '../../models/centers';


@Injectable({
  providedIn: 'root'
})
export class CentersService {
  baseURL:string = environment.baseURL;
  constructor(private http: HttpClient ) { };

  getAllCenters(){
    return this.http.get<Center>(`${this.baseURL}centers`);
  }

}
