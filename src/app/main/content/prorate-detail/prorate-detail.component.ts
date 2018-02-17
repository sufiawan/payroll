import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProrateService } from '../../services/prorate.service';
import { ActivatedRoute } from '@angular/router';
import { Prorate } from '../../models/prorate';

@Component({
  selector: 'app-prorate-detail',
  templateUrl: './prorate-detail.component.html',
  styleUrls: ['./prorate-detail.component.scss']
})
export class ProrateDetailComponent implements OnInit {

  form: FormGroup;
  formErrors: any;
  proRate: Prorate = { id: 0, name: null, proRateCd: null, proRateDivider: null, proRateDivCus: null, proRateVal: null };
  sub: any;
  divVal = true;
  loadingbar = true;
  
  proRateValueOption = [
    {value: 'W', display_name: 'Working Days'},
    {value: 'C', display_name: 'Calendar Days'},
  ];

  proRateDividerOption = [
    {value: 'W', display_name: 'Working Days'},
    {value: 'C', display_name: 'Calendar Days'},
    {value: 'X', display_name: 'Custom'},
  ];

  constructor(
    private prorateSvc: ProrateService,
    private route: ActivatedRoute,    
    private formBuilder: FormBuilder    
  ) {
    // Reactive form errors
    this.formErrors = {
      proRateCd: {},
      name: {},
      proRateDivider: {},
      proRateDividerCus: {},
      proRateVal: {},
      proRateDivCus: {}
    };
  }

  ngOnInit() {
    // Reactive Form
    this.form = this.formBuilder.group({
      id: [this.proRate.id],
      proRateCd: [this.proRate.proRateCd, [Validators.required, Validators.maxLength(10)]],
      name: [this.proRate.name, Validators.required],
      proRateDivider: [this.proRate.proRateDivider, Validators.required],
      proRateDivCus: [this.proRate.proRateDivCus],
      proRateVal: [this.proRate.proRateVal, Validators.required]
    });

    this.sub = this.route.params.subscribe(params => {
      const id = Number.parseInt(params['id']);
      if (id) {
        this.loadingbar = false;

        this.prorateSvc.getProrate(id)
          .subscribe(res => {
            this.proRate = res;

            if (this.proRate.proRateDivider === 'X') {
              this.divVal = false;
            }

            this.form.setValue({
              id: this.proRate.id,
              proRateCd: this.proRate.proRateCd,
              name: this.proRate.name,
              proRateDivider: this.proRate.proRateDivider,
              proRateDivCus: this.proRate.proRateDivCus,
              proRateVal: this.proRate.proRateVal
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

  onSubmit(proRate: Prorate) {
    if (this.form.valid) {
      this.loadingbar = false;

      // ubah nilai custom ke 0 jika divider bukan opsi Custom
      if (proRate.proRateDivider !== 'X') {
        proRate.proRateDivCus = 0;
      }

      if (proRate.id === 0) {
        this.prorateSvc.addProrate(proRate).subscribe(res => { this.loadingbar = true; });
      }
      else {
        this.prorateSvc.updateProrate(proRate).subscribe(res => { this.loadingbar = true; });
      }
    }
  }

  onDividerChange(dividerVal: string) {
    this.divVal = true;
    
    if (dividerVal === 'X') {
      this.divVal = false;
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
