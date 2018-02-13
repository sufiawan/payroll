import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Division } from '../../models/division';
import { DivisionService } from '../../services/division.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-division-detail',
  templateUrl: './division-detail.component.html',
  styleUrls: ['./division-detail.component.scss']
})
export class DivisionDetailComponent implements OnInit {

  form: FormGroup;
  formErrors: any;
  div: Division = { id: 0, divisionCd: '', name: '', descs: '' };
  sub: any;
  loadingbar: boolean = true;

  constructor(
    private divSvc: DivisionService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    // Reactive form errors
    this.formErrors = {
      divisionCd: {},
      name: {},
      descs: {}
    };
  }

  ngOnInit() {
    // Reactive Form
    this.form = this.formBuilder.group({
      id: [this.div.id],
      divisionCd: [this.div.divisionCd, [Validators.required, Validators.maxLength(10)]],
      name: [this.div.name, [Validators.required, Validators.maxLength(100)]],
      descs: [this.div.descs, [Validators.required, Validators.maxLength(150)]]
    });

    this.sub = this.route.params.subscribe(params => {
      let id = Number.parseInt(params['id']);
      if (id) {
        this.loadingbar = false;

        this.divSvc.getDivision(id)
          .subscribe(res => {
            this.div = res;

            this.form.setValue({
              id: this.div.id,
              divisionCd: this.div.divisionCd,
              name: this.div.name,
              descs: this.div.descs
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

  onSubmit(div: Division) {
    if (this.form.valid) {
      this.loadingbar = false;

      if (div.id == 0) {
        this.divSvc.addDivision(div).subscribe(res => { this.loadingbar = true; })
      } else {
        this.divSvc.updateDivision(div).subscribe(res => { this.loadingbar = true; });
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
