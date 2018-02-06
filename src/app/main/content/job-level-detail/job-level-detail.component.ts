import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { JobLevel } from '../../models/job-level';
import { JobLevelService } from '../../services/job-level.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-job-level-detail',
  templateUrl: './job-level-detail.component.html',
  styleUrls: ['./job-level-detail.component.scss']
})
export class JobLevelDetailComponent implements OnInit {

  form: FormGroup;
  formErrors: any;
  jobLvl: JobLevel = { id: 0, levelCd: '', name: '' };
  sub: any;

  constructor(
    private jobLvlSvc: JobLevelService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    // Reactive form errors
    this.formErrors = {
      levelCd: {},
      name: {}
    };
  }

  ngOnInit() {
    // Reactive Form
    this.form = this.formBuilder.group({
      id: [this.jobLvl.id],
      levelCd: [this.jobLvl.levelCd, [Validators.required, Validators.maxLength(10)]],
      name: [this.jobLvl.name, [Validators.required, Validators.maxLength(100)]],
    });

    this.sub = this.route.params.subscribe(params => {
      let id = Number.parseInt(params['id']);
      if (id) {
        this.jobLvlSvc.getJobLevel(id)
          .subscribe(res => {
            this.jobLvl = res;

            this.form.setValue({
              id: this.jobLvl.id,
              levelCd: this.jobLvl.levelCd,
              name: this.jobLvl.name
            })
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

  onSubmit(jobLvl: JobLevel) {
    if (this.form.valid) {
      if (jobLvl.id == 0)
        this.jobLvlSvc.addJobLevel(jobLvl).subscribe();
      else
        this.jobLvlSvc.updateJobLevel(jobLvl).subscribe();
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
