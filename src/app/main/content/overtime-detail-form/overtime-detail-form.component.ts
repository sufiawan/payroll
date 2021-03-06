import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { OvertimeDetail } from '../../models/overtime-detail';

@Component({
  selector: 'app-overtime-detail-form',
  templateUrl: './overtime-detail-form.component.html',
  styleUrls: ['./overtime-detail-form.component.scss']
})
export class OvertimeDetailFormComponent implements OnInit {
  
  form: FormGroup;
  formErrors: any;

  ovtDtl: OvertimeDetail = { id: 0, type: '', multiplyFrom: 0, multiplyTo: 0, multiplyBy: 0 };

  typeOption = [
    { value: 'N', display_name: 'Weekday' },
    { value: 'H', display_name: 'Weekend / Holiday' },    
  ];

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<OvertimeDetailFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.formErrors = {
      type: {},
      multiplyFrom: {},
      multiplyTo: {},
      multiplyBy: {}      
    };

    if (data) {
      this.ovtDtl = data;
    }
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      id: this.ovtDtl.id,
      type: [this.ovtDtl.type, Validators.required],
      multiplyFrom: [this.ovtDtl.multiplyFrom, Validators.required],
      multiplyTo: [this.ovtDtl.multiplyTo, Validators.required],
      multiplyBy: [this.ovtDtl.multiplyBy, Validators.required]
    });    
  }

  onCancelClick() {
    this.dialogRef.close();
  }

  onSubmit(ovtDtl: OvertimeDetail) {
    if (this.form.valid) {
      this.dialogRef.close(ovtDtl);
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
