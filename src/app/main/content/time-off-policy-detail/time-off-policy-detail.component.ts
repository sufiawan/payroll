import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TimeOffPolicy } from '../../models/time-off-policy';
import { TimeOffPolicyService } from '../../services/time-off-policy.service';
import { ActivatedRoute } from '@angular/router';
import { timeout } from 'rxjs/operators/timeout';

@Component({
  selector: 'app-time-off-policy-detail',
  templateUrl: './time-off-policy-detail.component.html',
  styleUrls: ['./time-off-policy-detail.component.scss']
})
export class TimeOffPolicyDetailComponent implements OnInit {

  form: FormGroup;
  formErrors: any;
  timeOff: TimeOffPolicy = { id: 0, timeOffCd: null, name: null, resetBy: null, resetByDescs: null, customDate: null, timeOffVal: null };
  sub: any;
  loadingbar = true;
  resetByVal = true;

  resetByOption = [
    { value: 'J', display_name: 'Join Date' },
    { value: 'E', display_name: 'Expiry Date' },
    { value: 'F', display_name: 'First Day of Year' },
    { value: 'C', display_name: 'Custom Day' }
  ];

  monthOption = [
    {value: 1, text: 'January'},
    {value: 2, text: 'February'},
    {value: 3, text: 'March'},
    {value: 4, text: 'April'},
    {value: 5, text: 'May'},
    {value: 6, text: 'June'},
    {value: 7, text: 'July'},
    {value: 8, text: 'August'},
    {value: 9, text: 'September'},
    {value: 10, text: 'October'},
    {value: 11, text: 'November'},
    {value: 12, text: 'December'}
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
      customDateDay: this.timeOff.customDate.split('-')[2],
      customDateMonth: this.timeOff.customDate.split('-')[1],
      timeOffVal: [this.timeOff.timeOffVal, Validators.required]
    });

    this.sub = this.route.params.subscribe(params => {
      const id = Number.parseInt(params['id']);
      if (id) {
        this.loadingbar = false;

        this.timeOffSvc.getData(id)
          .subscribe(res => {
            this.timeOff = res;

            if (this.timeOff.resetBy === 'C') {
              this.resetByVal = false;
            }

            const custDate = this.timeOff.customDate.split('-');            

            this.form.setValue({
              id: this.timeOff.id,
              timeOffCd: this.timeOff.timeOffCd,
              name: this.timeOff.name,
              resetBy: this.timeOff.resetBy,
              timeOffVal: this.timeOff.timeOffVal,
              customDateDay: parseInt(custDate[2]),
              customDateMonth: parseInt(custDate[1])
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
      this.loadingbar = false;

      if (timeOff.resetBy !== 'C') {
        timeOff.customDate = new Date().toDateString();
      } else {        
        let custDate: number = this.form.controls['customDateDay'].value;
        let custMonth: number = this.form.controls['customDateMonth'].value;

        // validate date
        if (custMonth === 2 && custDate > 28) {
          custDate = 28;
        } else if ([4, 6, 9, 11].indexOf(custMonth) !== -1 && custDate > 30) {
          custDate = 30;
        };        

        timeOff.customDate = '1900-' + custMonth + '-' + custDate;
      }

      if (timeOff.id === 0) {
        this.timeOffSvc.addData(timeOff).subscribe(res => { this.loadingbar = true; });
      } else {
        this.timeOffSvc.updateData(timeOff).subscribe(res => { this.loadingbar = true; });
      }
    }
  }

  onResetByChange(val: string) {
    if (val === 'C') {
      this.resetByVal = false;
    } else {
      this.resetByVal = true;
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
