import { Component, OnInit } from '@angular/core';
import { TaxSetup } from '../../models/tax-setup';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TaxSetupService } from '../../services/tax-setup.service';
import { ActivatedRoute } from '@angular/router';
import { Company } from '../../models/company';
import { CompanyService } from '../../services/company.service';
import { TaxSetupDetail } from '../../models/tax-setup-detail';
import { MatDialog } from '@angular/material';
import { TaxSetupDetailFormComponent } from '../tax-setup-detail-form/tax-setup-detail-form.component';

@Component({
  selector: 'app-tax-setup-detail',
  templateUrl: './tax-setup-detail.component.html',
  styleUrls: ['./tax-setup-detail.component.scss']
})
export class TaxSetupDetailComponent implements OnInit {

  compOption: Company[] = [];
  taxSetDtl: TaxSetupDetail[] = [];
  taxSet: TaxSetup = {
    id: 0,
    company: null,
    ptkpPribadi: null,
    ptkpIstri: null,
    ptkpTanggungan: null,
    maxTanggungan: null,
    rounding: false,
    taxSetupDtls: null
  } ;  

  form: FormGroup;
  formErrors: any;  
  sub: any;
  loadingbar = true;

  constructor(
    private svc: TaxSetupService,
    private compSvc: CompanyService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private dialog: MatDialog
  ) {

    this.formErrors = {
      company: {},
      ptkpPribadi: {},
      ptkpIstri: {},
      ptkpTanggungan: {},
      maxTanggungan: {},            
    };

  }

  ngOnInit() {

    this.compSvc.getCompanies().subscribe(res => this.compOption = res );

    this.form = this.formBuilder.group({
      id: [this.taxSet.id],
      company: [this.taxSet.company, Validators.required],
      ptkpPribadi: [this.taxSet.ptkpPribadi, Validators.required],
      ptkpIstri: [this.taxSet.ptkpIstri, Validators.required],
      ptkpTanggungan: [this.taxSet.ptkpTanggungan, Validators.required],
      maxTanggungan: [this.taxSet.maxTanggungan, Validators.required],
      rounding: [this.taxSet.rounding, Validators.required]
    });

    this.sub = this.route.params.subscribe(params => {
      const id = Number.parseInt(params['id']);
      if (id) {
        this.loadingbar = false;

        this.svc.getData(id)
          .subscribe(res => {
            this.taxSet = res;

            this.form.setValue({
              id: this.taxSet.id,
              company: this.taxSet.company,
              ptkpPribadi: this.taxSet.ptkpPribadi,
              ptkpIstri: this.taxSet.ptkpIstri,
              ptkpTanggungan: this.taxSet.ptkpTanggungan,
              maxTanggungan: this.taxSet.maxTanggungan,
              rounding: this.taxSet.rounding
            });

            this.taxSetDtl = res.taxSetupDtls;

            this.loadingbar = true;
          });
      }
    });

    this.form.valueChanges.subscribe(() => {
      this.onFormValuesChanged();
    });

  }

  onSubmit(taxSet: TaxSetup) {
    if (this.form.valid) {
      if (this.taxSetDtl.length > 0) {
        this.loadingbar = false;

        taxSet.taxSetupDtls = this.taxSetDtl;

        if (taxSet.id === 0) {
          this.svc.addData(taxSet).subscribe(res => { this.loadingbar = true; });
        } else {
          this.svc.updateData(taxSet).subscribe(res => { this.loadingbar = true; });
        }
      } else {
        alert('Please fill Tax Detail');
      }
    }
  }

  editDetail(dtl: TaxSetupDetail) {
    const dialogRef = this.dialog.open(TaxSetupDetailFormComponent,
      {
        data: dtl
      }
    );

    dialogRef.afterClosed().subscribe(res => {
      const idx = this.taxSetDtl.indexOf(dtl);

      for (var prop in this.taxSetDtl[idx]) {
        this.taxSetDtl[idx][prop] = res[prop];
      }
    });
  }

  deleteDetail(dtl: TaxSetupDetail) {
    if (confirm('Are you sure want to delete?')) {
      this.taxSetDtl.splice(this.taxSetDtl.indexOf(dtl), 1);
    }
  }

  addDetail() {
    const dialogRef = this.dialog.open(TaxSetupDetailFormComponent);

    dialogRef.afterClosed().subscribe(res => {
      this.taxSetDtl.push(res);
    });
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
