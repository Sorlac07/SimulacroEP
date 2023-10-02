import { Component,OnInit, ViewChild } from '@angular/core';
import { ParticipantsService } from 'src/app/marathon/services/participants/participants.service';
import { CentersService } from 'src/app/marathon/services/centers/centers.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
/*La vista Home muestra un card con título “Marathon Winner”, incluyendo photo (la ruta de
la imagen para cada participant está disponible en photoUrl), first name, last name, record
time (en formato hh:mm:ss), marathon center name, para el participant con mejor tiempo
de entre todos los Marathon Centers (el cual tiene valor de ranking 1).*/

winner: any;
centers: any;
participants: any;

constructor(private participantsService: ParticipantsService,private centerServices: CentersService) { }

ngOnInit(): void {
  this.getMarathonWinner();
}

getMarathonWinner() {
  this.centerServices.getAllCenters().subscribe((data: any) => {
    this.centers = data;
    console.log(data);
    this.centers.forEach((center: any) => {
      this.participantsService.getParticipantCenter(center.id).subscribe((parts: any) => {
        parts.forEach((participant: any) => {
          if (participant.ranking === 1) {
            this.winner = participant;
          }
        });
      });
    }
    );
  });
}
  getCenterName(id: any) {
    return this.centers.find((center: any) => center.id === id).name;
  }
}
