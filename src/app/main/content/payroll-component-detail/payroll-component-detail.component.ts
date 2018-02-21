import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PayrollComponent } from '../../models/payroll-component';
import { PayrollComponentService } from '../../services/payroll-component.service';
import { ActivatedRoute } from '@angular/router';
import { ProrateService } from '../../services/prorate.service';
import { PayrollComponentDetail } from '../../models/payroll-component-detail';
import { FormControl } from '@angular/forms/src/model';
import { MatDialog } from '@angular/material';
import { PayrollComponentDetailFormComponent } from '../payroll-component-detail-form/payroll-component-detail-form.component';

@Component({
  selector: 'app-payroll-component-detail',
  templateUrl: './payroll-component-detail.component.html',
  styleUrls: ['./payroll-component-detail.component.scss']
})
export class PayrollComponentDetailComponent implements OnInit {

  form: FormGroup;
  formDetail: FormGroup;
  formErrors: any;
  formErrorsDetail: any;

  payCompt: PayrollComponent = {
    id: 0, componentCd: null, name: null, calcType: null, calcTypeDescs: null,
    tax: false, absentDeduct: false, payrollDeduct: false, compSubsidize: false, proRate: null, payrollComponentDtls: []
  };

  sub: any;
  loadingbar = true;

  calcTypeOption = [
    { value: 'D', display_name: 'Daily' },
    { value: 'W', display_name: 'Weekly' },
    { value: 'M', display_name: 'Monthly' },
  ];

  proRateOption = [];

  constructor(
    private payComptSvc: PayrollComponentService,
    private proRateSvc: ProrateService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private dialog: MatDialog
  ) {

    this.formErrors = {
      componentCd: {},
      name: {},
      calcType: {},
      dtl_descs: {}
    };

    this.proRateSvc.getProrates().subscribe(res => this.proRateOption = res);
  }

  ngOnInit() {

    this.form = this.formBuilder.group({
      id: [this.payCompt.id],
      componentCd: [this.payCompt.componentCd, [Validators.required, Validators.maxLength(10)]],
      name: [this.payCompt.name, Validators.required],
      calcType: [this.payCompt.calcType, Validators.required],
      tax: this.payCompt.tax,
      absentDeduct: this.payCompt.absentDeduct,
      payrollDeduct: this.payCompt.payrollDeduct,
      compSubsidize: this.payCompt.compSubsidize,
      proRate: this.payCompt.proRate
    });

    this.sub = this.route.params.subscribe(params => {
      const id = Number.parseInt(params['id']);
      if (id) {
        this.loadingbar = false;
        this.payComptSvc.getPayrollComponent(id)
          .subscribe(res => {
            this.payCompt = res;

            this.form.setValue({
              id: this.payCompt.id,
              componentCd: this.payCompt.componentCd,
              name: this.payCompt.name,
              calcType: this.payCompt.calcType,
              tax: this.payCompt.tax,
              absentDeduct: this.payCompt.absentDeduct,
              payrollDeduct: this.payCompt.payrollDeduct,
              compSubsidize: this.payCompt.compSubsidize,
              proRate: this.payCompt.proRate
            });

            this.loadingbar = true;
          });
        }
    });

    this.form.valueChanges.subscribe(() => {
      this.onFormValuesChanged();
    });

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onSubmit(payCompt: PayrollComponent) {
    if (this.form.valid) {
      if (this.payCompt.payrollComponentDtls.length > 0) {
        this.loadingbar = false;

        payCompt.payrollComponentDtls = this.payCompt.payrollComponentDtls;

        if (payCompt.id === 0) {
          this.payComptSvc.addPayrollComponent(payCompt).subscribe(res => { this.loadingbar = true; });
        } else {
          this.payComptSvc.updatePayrollComponent(payCompt).subscribe(res => { this.loadingbar = true; });
        }
      } else {
        alert('Please fill Component Detail');
      }
    }
  }

  editDetail(dtl: PayrollComponentDetail) {
    const dialogRef = this.dialog.open(PayrollComponentDetailFormComponent,
      {
        data: dtl
      }
    );

    dialogRef.afterClosed().subscribe(res => {
      let idx = this.payCompt.payrollComponentDtls.indexOf(dtl);

      for (var prop in this.payCompt.payrollComponentDtls[idx]) {
        this.payCompt.payrollComponentDtls[idx][prop] = res[prop];
      }
    });
  }

  deleteDetail(dtl: PayrollComponentDetail) {
    if (confirm('Are you sure want to delete?')) {
      this.payCompt.payrollComponentDtls.splice(this.payCompt.payrollComponentDtls.indexOf(dtl), 1);
    }
  }

  addDetail() {
    const dialogRef = this.dialog.open(PayrollComponentDetailFormComponent);

    dialogRef.afterClosed().subscribe(res => {
      this.payCompt.payrollComponentDtls.push(res);
    });
  }

  onFormValuesChanged() {
    for (const field in this.formErrors) {
      if (!this.formErrors.hasOwnProperty(field)) {
        continue;
      }

      // Clear previous errors
      this.formErrors[field] = {};

      // Get the control
      const control = this.form.get(field);

      if (control && control.dirty && !control.valid) {
        this.formErrors[field] = control.errors;
      }
    }
  }

}
