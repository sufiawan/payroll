import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { JobPosition } from '../../models/job-position';
import { JobPositionService } from '../../services/job-position.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-job-position-detail',
  templateUrl: './job-position-detail.component.html',
  styleUrls: ['./job-position-detail.component.scss']
})
export class JobPositionDetailComponent implements OnInit {

  form: FormGroup;
  formErrors: any;
  jobPos: JobPosition = { id: 0, positionCd: '', name: '' };
  sub: any;
  loadingbar: boolean = true;

  constructor(
    private jobPosSvc: JobPositionService,
    private route: ActivatedRoute,    
    private formBuilder: FormBuilder
  ) {
    // Reactive form errors
    this.formErrors = {
      positionCd: {},
      name: {}
    };
  }

  ngOnInit() {
    // Reactive Form
    this.form = this.formBuilder.group({
      id: [this.jobPos.id],
      positionCd: [this.jobPos.positionCd, [Validators.required, Validators.maxLength(10)]],
      name: [this.jobPos.name, [Validators.required, Validators.maxLength(100)]],
    });

    this.sub = this.route.params.subscribe(params => {
      let id = Number.parseInt(params['id']);
      if (id) {
        this.loadingbar = false;

        this.jobPosSvc.getJobPosition(id)
          .subscribe(res => {
            this.jobPos = res;

            this.form.setValue({
              id: this.jobPos.id,
              positionCd: this.jobPos.positionCd,
              name: this.jobPos.name
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

  onSubmit(jobPos: JobPosition) {
    if (this.form.valid) {
      this.loadingbar = false;

      if (jobPos.id == 0) {
        this.jobPosSvc.addJobPosition(jobPos).subscribe(res => { this.loadingbar = true; });
      } else {
        this.jobPosSvc.updateJobPosition(jobPos).subscribe(res => { this.loadingbar = true; });
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
