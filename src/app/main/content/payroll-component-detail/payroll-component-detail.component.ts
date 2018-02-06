import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PayrollComponent } from '../../models/payroll-component';
import { PayrollComponentService } from '../../services/payroll-component.service';
import { ActivatedRoute } from '@angular/router';
import { ProrateService } from '../../services/prorate.service';
import { PayrollComponentDetail } from '../../models/payroll-component-detail';

@Component({
  selector: 'app-payroll-component-detail',
  templateUrl: './payroll-component-detail.component.html',
  styleUrls: ['./payroll-component-detail.component.scss']
})
export class PayrollComponentDetailComponent implements OnInit {

  form: FormGroup;
  formErrors: any;
  payCompt: PayrollComponent = {
    id: 0, componentCd: '', name: '', intervalType: '', intervalTypeDescs: '',
    tax: false, absentDeduct: false, payrollDeduct: false, compSubsidize: false, proRate: null, payrollComponentDtls: null
  };
  sub: any;
  isProRate: boolean = false;
  exDtl: PayrollComponentDetail[];

  intervalTypeOption = [
    { value: 'D', display_name: 'Daily' },
    { value: 'W', display_name: 'Weekly' },
    { value: 'M', display_name: 'Monthly' },
  ];

  proRateOption = [];

  constructor(
    private payComptSvc: PayrollComponentService,
    private proRateSvc: ProrateService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.formErrors = {
      componentCd: {},
      name: {},
      intervalType: {},
    };

    this.proRateSvc.getProrates().subscribe(res => this.proRateOption = res);
  }

  ngOnInit() {

    this.form = this.formBuilder.group({
      id: [this.payCompt.id],
      componentCd: [this.payCompt.componentCd, [Validators.required, Validators.maxLength(10)]],
      name: [this.payCompt.name, Validators.required],
      intervalType: [this.payCompt.intervalType, Validators.required],
      tax: this.payCompt.tax,
      absentDeduct: this.payCompt.absentDeduct,
      payrollDeduct: this.payCompt.payrollDeduct,
      compSubsidize: this.payCompt.compSubsidize,
      proRate: [{ value: this.payCompt.proRate, disabled: true }]
    });

    this.sub = this.route.params.subscribe(params => {
      let id = Number.parseInt(params['id']);
      if (id) {
        this.payComptSvc.getPayrollComponent(id)
          .subscribe(res => {
            this.payCompt = res;

            this.form.setValue({
              id: this.payCompt.id,
              componentCd: this.payCompt.componentCd,
              name: this.payCompt.name,
              intervalType: this.payCompt.intervalType,
              tax: this.payCompt.tax,
              absentDeduct: this.payCompt.absentDeduct,
              payrollDeduct: this.payCompt.payrollDeduct,
              compSubsidize: this.payCompt.compSubsidize,
              proRate: this.payCompt.proRate
            });

            this.exDtl = res.payrollComponentDtls;

            if (this.payCompt.proRate != null) {
              this.isProRate = true;
              this.onChecked(true);
            }
          }
          );
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
      if (!this.isProRate)
        payCompt.proRate = null;

      payCompt.payrollComponentDtls = this.exDtl;
      
      if (payCompt.id === 0) {
        this.payComptSvc.addPayrollComponent(payCompt).subscribe();
      } else {
        this.payComptSvc.updatePayrollComponent(payCompt).subscribe();
      }
    }
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

  onChecked(val: boolean) {
    if (val)
      this.form.get('proRate').enable();
    else
      this.form.get('proRate').disable();
  }

}
