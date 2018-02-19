import { Component, OnInit } from '@angular/core';
import { TimeOffPolicy } from '../../models/time-off-policy';
import { TimeOffPolicyService } from '../../services/time-off-policy.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TimeOffScheme } from '../../models/time-off-scheme';
import { ActivatedRoute } from '@angular/router';
import { TimeOffSchemeService } from '../../services/time-off-scheme.service';

@Component({
  selector: 'app-time-off-scheme-detail',
  templateUrl: './time-off-scheme-detail.component.html',
  styleUrls: ['./time-off-scheme-detail.component.scss']
})
export class TimeOffSchemeDetailComponent implements OnInit {

  form: FormGroup;
  formErrors: any;
  timeOffScheme: TimeOffScheme = { id: 0, schemeCd: null, name: null, timeOffPolicy: null };
  sub: any;
  loadingbar = true;

  timeOffPolicyOption = [];

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private timeOffSchemeSvc: TimeOffSchemeService,
    private timeOffPolicySvc: TimeOffPolicyService
  ) {
    this.formErrors = {
      schemeCd: {},
      name: {}      
    };

    timeOffPolicySvc.getList().subscribe(res => this.timeOffPolicyOption = res);
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      id: [this.timeOffScheme.id],
      schemeCd: [this.timeOffScheme.schemeCd, [Validators.required, Validators.maxLength(10)]],
      name: [this.timeOffScheme.name, Validators.required],
      timeOffPolicy: [this.timeOffScheme.timeOffPolicy, Validators.required]
    });

    this.sub = this.route.params.subscribe(params => {
      const id = Number.parseInt(params['id']);
      if (id) {
        this.loadingbar = false;

        this.timeOffSchemeSvc.getData(id)
          .subscribe(res => {
            this.timeOffScheme = res;

            this.form.setValue({
              id: this.timeOffScheme.id,
              schemeCd: this.timeOffScheme.schemeCd,
              name: this.timeOffScheme.name,
              timeOffPolicy: this.timeOffScheme.timeOffPolicy
            });

            this.loadingbar = true;
          });
      }
    });

    this.form.valueChanges.subscribe(() => {
      this.onFormValuesChanged();
    });
  }

  onSubmit(timeOffScheme: TimeOffScheme) {
    if (this.form.valid) {
      this.loadingbar = false;

      if (timeOffScheme.id === 0) {
        this.timeOffSchemeSvc.addData(timeOffScheme).subscribe(res => { this.loadingbar = true; });
      } else {
        this.timeOffSchemeSvc.updateData(timeOffScheme).subscribe(res => { this.loadingbar = true; });
      }
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
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
