import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PayrollComponent } from '../../models/payroll-component';
import { PayrollComponentService } from '../../services/payroll-component.service';
import { ActivatedRoute } from '@angular/router';
import { ProrateService } from '../../services/prorate.service';
import { PayrollComponentDetail } from '../../models/payroll-component-detail';
import { FormControl } from '@angular/forms/src/model';

@Component({
  selector: 'app-payroll-component-detail',
  templateUrl: './payroll-component-detail.component.html',
  styleUrls: ['./payroll-component-detail.component.scss']
})
export class PayrollComponentDetailComponent implements OnInit {

  form: FormGroup;
  formDetail: FormGroup;
  formErrors: any;
  formErrorsDetail: any;

  payCompt: PayrollComponent = {
    id: 0, componentCd: '', name: '', calcType: '', calcTypeDescs: '',
    tax: false, absentDeduct: false, payrollDeduct: false, compSubsidize: false, proRate: null, payrollComponentDtls: null
  };

  sub: any;
  temp: any[] = [];
  loadingbar: boolean = true;

  addedDetail: PayrollComponentDetail[] = [];
  deletedDetail: PayrollComponentDetail[] = [];
    
  exDtl: PayrollComponentDetail[];
  dummyDtl: PayrollComponentDetail[] = [
    {
      id: 0,
      calcType: 'A',
      calcTypeDescs: '',
      companyVal: 1,
      descs: 'asdsad',
      employeeVAl: 1,
      maxSalaryCalc: 1      
    }
  ];
  
  calcTypeOption = [
    { value: 'D', display_name: 'Daily' },
    { value: 'W', display_name: 'Weekly' },
    { value: 'M', display_name: 'Monthly' },
  ];

  calcTypeDetailOption = [
    { value: 'A', display_name: 'Fixed Amount' },
    { value: 'P', display_name: 'Percentage (%)' },    
  ];

  columns = [    
    { prop: 'descs', name: 'Description' },
    { prop: 'calcTypeDescs', name: 'Calculation Type' },
    { prop: 'maxSalaryCalc', name: 'Max Calculated Salary' },
    { prop: 'employeeVAl', name: 'Employee Value' },
    { prop: 'companyVal', name: 'Company Value' }
  ];

  proRateOption = [];

  constructor(
    private payComptSvc: PayrollComponentService,
    private proRateSvc: ProrateService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {

    this.formErrors = {
      componentCd: {},
      name: {},
      calcType: {},
      dtl_descs: {}
    };

    this.formErrorsDetail = {
      descs: {},
      calcType: {},
      maxSalaryCalc: {},
      employeeVAl: {},
      companyVal: {}
    };

    this.proRateSvc.getProrates().subscribe(res => this.proRateOption = res);

    this.temp = [...this.addedDetail];
  }

  ngOnInit() {

    this.form = this.formBuilder.group({
      id: [this.payCompt.id],
      componentCd: [this.payCompt.componentCd, [Validators.required, Validators.maxLength(10)]],
      name: [this.payCompt.name, Validators.required],
      calcType: [this.payCompt.calcType, Validators.required],
      tax: this.payCompt.tax,
      absentDeduct: this.payCompt.absentDeduct,
      payrollDeduct: this.payCompt.payrollDeduct,
      compSubsidize: this.payCompt.compSubsidize,
      proRate: this.payCompt.proRate
    });

    this.formDetail = this.formBuilder.group({
      id: '',
      descs: ['', Validators.required],
      calcType: ['', Validators.required],
      maxSalaryCalc: ['', Validators.required],
      employeeVAl: ['', Validators.required],
      companyVal: ['', Validators.required],
    });

    this.sub = this.route.params.subscribe(params => {
      let id = Number.parseInt(params['id']);
      if (id) {
        this.loadingbar = false;
        this.payComptSvc.getPayrollComponent(id)
          .subscribe(res => {
            this.payCompt = res;

            this.form.setValue({
              id: this.payCompt.id,
              componentCd: this.payCompt.componentCd,
              name: this.payCompt.name,
              calcType: this.payCompt.calcType,
              tax: this.payCompt.tax,
              absentDeduct: this.payCompt.absentDeduct,
              payrollDeduct: this.payCompt.payrollDeduct,
              compSubsidize: this.payCompt.compSubsidize,
              proRate: this.payCompt.proRate
            });

            this.exDtl = res.payrollComponentDtls;

            this.loadingbar = true;
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

  onSubmit(payCompt: PayrollComponent) {
    if (this.form.valid) {      
      payCompt.payrollComponentDtls = this.exDtl;

      if (payCompt.id === 0) {
        payCompt.payrollComponentDtls = this.addedDetail;
        this.payComptSvc.addPayrollComponent(payCompt).subscribe();
      } else {
        this.payComptSvc.updatePayrollComponent(payCompt).subscribe();
      }
    }
  }

  onSubmitDetail(payComptDetail: PayrollComponentDetail) {
    payComptDetail.calcTypeDescs = this.calcTypeDetailOption.find(x => x.value == payComptDetail.calcType).display_name;
    //this.addedDetail.push(payComptDetail);
    this.addedDetail.splice(0, 0, payComptDetail);
    this.formDetail.reset();
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
