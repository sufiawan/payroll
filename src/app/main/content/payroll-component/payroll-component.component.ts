import { Component, OnInit } from '@angular/core';
import { PayrollComponent } from '../../models/payroll-component';
import { fuseAnimations } from '../../../core/animations';
import { PayrollComponentService } from '../../services/payroll-component.service';

@Component({
  selector: 'app-payroll-component',
  templateUrl: './payroll-component.component.html',
  styleUrls: ['./payroll-component.component.scss'],
  animations : fuseAnimations
})
export class PayrollComponentComponent implements OnInit {

  payCompts: PayrollComponent[];
  loadingIndicator: boolean = true;

  constructor(
    private payComptSvc: PayrollComponentService
  ) { }

  ngOnInit() {
    this.retrieveComponents();
  }

  retrieveComponents() {
    this.payComptSvc.getPayrollComponents().subscribe(res => {
      this.payCompts = res;
      this.loadingIndicator = false;
    });
  }

}
