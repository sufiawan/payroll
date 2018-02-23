import { Component, OnInit, Inject } from '@angular/core';
import { AbsentPatternDetail } from '../../models/absent-pattern-detail';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-absent-pattern-detail-form',
  templateUrl: './absent-pattern-detail-form.component.html',
  styleUrls: ['./absent-pattern-detail-form.component.scss']
})
export class AbsentPatternDetailFormComponent implements OnInit {

  dtl: AbsentPatternDetail;

  form: FormGroup;
  formErrors: any;
  sub: any;

  dayStatusOption = [
    { value: 'I', display_name: 'In' },
    { value: 'O', display_name: 'Off' },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AbsentPatternDetailFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    this.formErrors = {
      dayStatus: {},
      timeIn: {},
      timeOut: {},
      breakIn: {},
      breakOut: {}
    };

    if (data) {
      this.dtl = data;
    }

  }

  ngOnInit() {

    this.form = this.formBuilder.group({
      id: this.dtl.id,
      dayPeriod: this.dtl.dayPeriod,
      dayStatus: [this.dtl.dayStatus, Validators.required],
      timeIn: [this.dtl.timeIn, Validators.required],
      timeOut: [this.dtl.timeOut, Validators.required],
      breakIn: [this.dtl.breakIn, Validators.required],
      breakOut: [this.dtl.breakOut, Validators.required],
    });

  }

  onCancelClick() {
    this.dialogRef.close();
  }

  onSubmit(apDtl: AbsentPatternDetail) {
    if (this.form.valid) {
      apDtl.dayStatusDesc = this.dayStatusOption.find(x => x.value == apDtl.dayStatus).display_name;
      this.dialogRef.close(apDtl);
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
