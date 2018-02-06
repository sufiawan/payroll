import { Component, OnInit } from '@angular/core';
import { fuseAnimations } from '../../../core/animations';
import { Division } from '../../models/division';
import { DivisionService } from '../../services/division.service';

@Component({
  selector: 'app-division-list',
  templateUrl: './division-list.component.html',
  styleUrls: ['./division-list.component.scss'],
  animations : fuseAnimations
})
export class DivisionListComponent implements OnInit {

  divisions: Division[];
  loadingIndicator: boolean = true;

  constructor(
    private divSvc: DivisionService
  ) { }

  ngOnInit() {
    this.retrieveDivisions();
  }

  retrieveDivisions() {
    this.divSvc.getDivisions().subscribe(res => {
      this.divisions = res;
      this.loadingIndicator = false;
    });
  }

  deleteRow(div: Division): void {
    this.divSvc.deleteDivision(div).subscribe();
    this.retrieveDivisions();
  }

}
