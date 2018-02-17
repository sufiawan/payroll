import { Component, OnInit, Inject } from '@angular/core';
import { TaxSetupDetail } from '../../models/tax-setup-detail';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-tax-setup-detail-form',
  templateUrl: './tax-setup-detail-form.component.html',
  styleUrls: ['./tax-setup-detail-form.component.scss']
})
export class TaxSetupDetailFormComponent implements OnInit {

  taxSetDtl: TaxSetupDetail = {
    id: 0,
    salaryBottom: null,
    salaryTop: null,
    taxNpwp: null,
    taxNonNpwp: null
  };

  form: FormGroup;
  formErrors: any;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<TaxSetupDetailFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    this.formErrors = {      
      salaryBottom: {},
      salaryTop: {},
      taxNpwp: {},
      taxNonNpwp: {}
    };

    if (data) {
      this.taxSetDtl = data;
    }

  }

  ngOnInit() {

    this.form = this.formBuilder.group({
      id: this.taxSetDtl.id,
      salaryBottom: [this.taxSetDtl.salaryBottom, Validators.required],
      salaryTop: [this.taxSetDtl.salaryTop, Validators.required],
      taxNpwp: [this.taxSetDtl.taxNpwp, Validators.required],
      taxNonNpwp: [this.taxSetDtl.taxNonNpwp, Validators.required]      
    });

  }

  onCancelClick() {
    this.dialogRef.close();
  }

  onSubmit(dtl: TaxSetupDetail) {
    if (this.form.valid) {      
      this.dialogRef.close(dtl);
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
