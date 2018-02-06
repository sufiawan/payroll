import { Component, OnInit } from '@angular/core';
import { Prorate } from '../../models/prorate';
import { ProrateService } from '../../services/prorate.service';
import { fuseAnimations } from '../../../core/animations';

@Component({
  selector: 'app-prorate-list',
  templateUrl: './prorate-list.component.html',
  styleUrls: ['./prorate-list.component.scss'],
  animations : fuseAnimations
})
export class ProrateListComponent implements OnInit {

  proRates: Prorate[];
  loadingIndicator: boolean = true;

  constructor(
    private prorateSvc: ProrateService    
  ) { }

  ngOnInit() {    
    this.retrieveList();
  }

  retrieveList() {
    this.prorateSvc.getProrates().subscribe(res => {
      this.proRates = res;
      this.loadingIndicator = false;
    });
  }

  deleteRow(proRate: Prorate): void {
    this.prorateSvc.deleteProrate(proRate).subscribe();
    this.retrieveList();
  }

}
