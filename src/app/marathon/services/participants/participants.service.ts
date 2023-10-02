import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Participant } from '../../models/participant';

@Injectable({
  providedIn: 'root'
})
export class ParticipantsService {
  baseURL:string = environment.baseURL;
  constructor(private http: HttpClient ) { }

  getParticipants() {
    return this.http.get<Participant>(this.baseURL + 'participants');
  }
  //http://localhost:3000/api/v1/centers/:centerId/participants
  getParticipantCenter(centerId: any) {
    return this.http.get<Participant>(`${this.baseURL}centers/${centerId}/participants`);
  }
}
