import { Component, OnInit } from '@angular/core';
import { TaxSetup } from '../../models/tax-setup';
import { TaxSetupService } from '../../services/tax-setup.service';
import { fuseAnimations } from '../../../core/animations';

@Component({
  selector: 'app-tax-setup',
  templateUrl: './tax-setup.component.html',
  styleUrls: ['./tax-setup.component.scss'],
  animations : fuseAnimations
})
export class TaxSetupComponent implements OnInit {

  taxSetups: TaxSetup[];
  loadingIndicator = true;

  constructor(
    private svc: TaxSetupService
  ) { }

  ngOnInit() {

    this.svc.getList().subscribe(res => {
      this.taxSetups = res;
      this.loadingIndicator = false;
    });

  }

  deleteRow(taxSet: TaxSetup): void {
    if (confirm('Are you sure want to delete?')) {
      this.svc.deleteData(taxSet).subscribe(res => {
        this.taxSetups.splice(this.taxSetups.indexOf(taxSet), 1);
      });
    }
  }

}
