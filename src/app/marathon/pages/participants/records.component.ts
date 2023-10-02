import { Component,OnInit, ViewChild } from '@angular/core';

import { ParticipantsService } from 'src/app/marathon/services/participants/participants.service';
import { CentersService } from 'src/app/marathon/services/centers/centers.service';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Sort } from '@angular/material/sort';
import { MatSort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';

/* una vista de tabla de solo lectura (es decir que no se requiere
soporte de adición, modificación o eliminación de registros) con la información de los
participantes con mejor record time en cada Marathon Center. En cada fila debe apreciarse
el participant id, first name, last name, marathon center name, ranking y record time (en
formato hh:mm:ss). Debe presentarse solo una tabla con toda la información solicitada, no
una tabla por cada center. La tabla debe ofrecer pagination y sorting*/

@Component({
  selector: 'app-participants',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css']
})
export class RecordsComponent implements OnInit {

  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'marathonCenterName', 'ranking', 'recordTime'];
  dataSource = new MatTableDataSource();
  ceneters: any;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  //constructor(private participantsService: ParticipantsService, private router: Router, private _liveAnnouncer: LiveAnnouncer) { }
  constructor(private participantsService: ParticipantsService,private centerServices: CentersService ,private router: Router, private _liveAnnouncer: LiveAnnouncer) { }
  ngOnInit(): void {
    this.getRecords();
  }

  getRecords() {
    this.participantsService.getParticipants().subscribe((data: any) => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      console.log(data);
    });

    this.centerServices.getAllCenters().subscribe((data: any) => {
      this.ceneters = data;
      console.log(data);
    });
  }

  getCenterName(id: any) {
    return this.ceneters.find((center: any) => center.id === id).name;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


   /** Announce the change in sort state for assistive technology. */
   announceSortChange(sortState: Sort) {

    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }


}
