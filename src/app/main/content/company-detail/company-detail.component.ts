import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Company } from '../../models/company';
import { ActivatedRoute } from '@angular/router';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.scss']
})

export class CompanyDetailComponent implements OnInit {
  form: FormGroup;
  formErrors: any;
  comp: Company = { id: 0, companyCd: '', name: '', location: '' };
  sub: any;
  loadingbar: boolean = true;

  constructor(
    private companySvc: CompanyService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    // Reactive form errors
    this.formErrors = {
      companyCd: {},
      name: {},
      location: {}
    };
  }

  ngOnInit() {
    // Reactive Form
    this.form = this.formBuilder.group({
      id: [this.comp.id],
      companyCd: [this.comp.companyCd, [Validators.required, Validators.maxLength(10)]],
      name: [this.comp.name, Validators.required],
      location: [this.comp.location, Validators.required]
    });

    this.sub = this.route.params.subscribe(params => {
      let id = Number.parseInt(params['id']);
      if (id) {
        this.loadingbar = false;

        this.companySvc.getCompany(id)
          .subscribe(res => {
            this.comp = res;

            this.form.setValue({
              id: this.comp.id,
              companyCd: this.comp.companyCd,
              name: this.comp.name,
              location: this.comp.location
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

  onSubmit(comp: Company) {
    if (this.form.valid) {
      if (comp.id === 0) {
        this.companySvc.addCompany(comp).subscribe();
      } else {
        this.companySvc.updateCompany(comp).subscribe();
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
