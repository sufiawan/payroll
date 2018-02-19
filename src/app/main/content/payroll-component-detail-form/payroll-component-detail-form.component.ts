import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PayrollComponentDetail } from '../../models/payroll-component-detail';

@Component({
  selector: 'app-payroll-component-detail-form',
  templateUrl: './payroll-component-detail-form.component.html',
  styleUrls: ['./payroll-component-detail-form.component.scss']
})
export class PayrollComponentDetailFormComponent implements OnInit {
  payComptDetail: PayrollComponentDetail = {
    id: 0, descs: null, calcType: null, calcTypeDescs: null, companyVal: null, employeeVAl: null, maxSalaryCalc: null
  };

  form: FormGroup;
  formErrors: any;
  sub: any;

  calcTypeOption = [
    { value: 'A', display_name: 'Fixed Amount' },
    { value: 'P', display_name: 'Percentage (%)' },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<PayrollComponentDetailFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.formErrors = {
      descs: {},
      calcType: {},
      maxSalaryCalc: {},
      employeeVAl: {},
      companyVal: {}
    };

    if (data) {
      this.payComptDetail = data;
    }
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      id: this.payComptDetail.id,
      descs: [this.payComptDetail.descs, Validators.required],
      calcType: [this.payComptDetail.calcType, Validators.required],
      maxSalaryCalc: [this.payComptDetail.maxSalaryCalc, Validators.required],
      employeeVAl: [this.payComptDetail.employeeVAl, Validators.required],
      companyVal: [this.payComptDetail.companyVal, Validators.required],
    });
  }

  onCancelClick() {
    this.dialogRef.close();
  }

  // ngOnDestroy() {
  //   this.sub.unsubscribe();
  // }

  onSubmit(payComptDtl: PayrollComponentDetail) {
    if (this.form.valid) {
      payComptDtl.calcTypeDescs = this.calcTypeOption.find(x => x.value == payComptDtl.calcType).display_name;
      this.dialogRef.close(payComptDtl);
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

}
