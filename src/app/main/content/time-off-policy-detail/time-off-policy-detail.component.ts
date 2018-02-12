import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TimeOffPolicy } from '../../models/time-off-policy';
import { TimeOffPolicyService } from '../../services/time-off-policy.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-time-off-policy-detail',
  templateUrl: './time-off-policy-detail.component.html',
  styleUrls: ['./time-off-policy-detail.component.scss']
})
export class TimeOffPolicyDetailComponent implements OnInit {

  form: FormGroup;
  formErrors: any;
  timeOff: TimeOffPolicy = { id: 0, timeOffCd: '', name: '', resetBy: '', resetByDescs: '', customDate: new Date(new Date().toDateString()), timeOffVal: 0 };
  sub: any;
  loadingbar: boolean = true;

  resetByOption = [
    { value: 'J', display_name: 'Join Date' },
    { value: 'E', display_name: 'Expiry Date' },
    { value: 'F', display_name: 'First Day of Year' },
    { value: 'C', display_name: 'Custom Day' }
  ];

  constructor(
    private timeOffSvc: TimeOffPolicyService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.formErrors = {
      timeOffCd: {},
      name: {},
      resetBy: {},
      timeOffVal: {}
    };
  }

  ngOnInit() {

    this.form = this.formBuilder.group({
      id: [this.timeOff.id],
      timeOffCd: [this.timeOff.timeOffCd, [Validators.required, Validators.maxLength(10)]],
      name: [this.timeOff.name, Validators.required],
      resetBy: [this.timeOff.resetBy, Validators.required],
      customDate: this.timeOff.customDate,
      timeOffVal: [this.timeOff.timeOffVal, Validators.required]
    });

    this.sub = this.route.params.subscribe(params => {
      let id = Number.parseInt(params['id']);
      if (id) {
        this.loadingbar = false;

        this.timeOffSvc.getData(id)
          .subscribe(res => {
            this.timeOff = res;

            this.form.setValue({
              id: this.timeOff.id,
              timeOffCd: this.timeOff.timeOffCd,
              name: this.timeOff.name,
              resetBy: this.timeOff.resetBy,
              timeOffVal: this.timeOff.timeOffVal,
              customDate: this.timeOff.customDate
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

  onSubmit(timeOff: TimeOffPolicy) {
    if (this.form.valid) {
      if (timeOff.id === 0) {
        this.timeOffSvc.addData(timeOff).subscribe();
      } else {
        this.timeOffSvc.updateData(timeOff).subscribe();
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

}
