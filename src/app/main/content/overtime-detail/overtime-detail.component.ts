import { Component, OnInit } from '@angular/core';
import { Overtime } from '../../models/overtime';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OvertimeDetail } from '../../models/overtime-detail';
import { OvertimeService } from '../../services/overtime.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { OvertimeDetailFormComponent } from '../overtime-detail-form/overtime-detail-form.component';

@Component({
  selector: 'app-overtime-detail',
  templateUrl: './overtime-detail.component.html',
  styleUrls: ['./overtime-detail.component.scss']
})
export class OvertimeDetailComponent implements OnInit {

  form: FormGroup;
  formErrors: any;  
  ovtDtlWeekday: OvertimeDetail[] = [];
  ovtDtlWeekend: OvertimeDetail[] = [];
  ovt: Overtime = { id: 0, overtimeCd: null, name: null, roundingMin: null, overtimeDtls: [] };  
  sub: any;
  loadingbar = true;

  constructor(
    private ovtSvc: OvertimeService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private dialog: MatDialog
  ) {

    this.formErrors = {
      overtimeCd: {},
      name: {},
      roundingMin: {}      
    };

  }

  ngOnInit() {

    this.form = this.formBuilder.group({
      id: [this.ovt.id],
      overtimeCd: [this.ovt.overtimeCd, [Validators.required, Validators.maxLength(10)]],
      name: [this.ovt.name, Validators.required],
      roundingMin: [this.ovt.roundingMin, Validators.required]
    });

    this.sub = this.route.params.subscribe(params => {
      const id = Number.parseInt(params['id']);
      if (id) {
        this.loadingbar = false;

        this.ovtSvc.getData(id)
          .subscribe(res => {
            this.ovt = res;

            this.form.setValue({
              id: this.ovt.id,
              overtimeCd: this.ovt.overtimeCd,
              name: this.ovt.name,
              roundingMin: this.ovt.roundingMin
            });

            this.regroupDetail();

            this.loadingbar = true;
          });
      }
    });

    this.form.valueChanges.subscribe(() => {
      this.onFormValuesChanged();
    });

  }

  onSubmit(ovt: Overtime) {
    if (this.form.valid) {
      this.loadingbar = false;    
      ovt.overtimeDtls = this.ovt.overtimeDtls;

      if (ovt.id === 0) {
        this.ovtSvc.addData(ovt).subscribe(res => { this.loadingbar = true; });
      } else {
        this.ovtSvc.updateData(ovt).subscribe(res => { this.loadingbar = true; });
      }
    }
  }

  regroupDetail() {
    this.ovtDtlWeekday = this.ovt.overtimeDtls.filter(x => x.type === 'N');
    this.ovtDtlWeekend = this.ovt.overtimeDtls.filter(x => x.type === 'H');
  }

  addDetail() {
    let dialogRef = this.dialog.open(OvertimeDetailFormComponent);

    dialogRef.afterClosed().subscribe(res => {      
      this.ovt.overtimeDtls.push(res);

      this.regroupDetail();
    });
  }

  editDetail(dtl: OvertimeDetail) {
    let dialogRef = this.dialog.open(OvertimeDetailFormComponent,
      {
        data: dtl
      }
    );

    dialogRef.afterClosed().subscribe(res => {
      let idx = this.ovt.overtimeDtls.indexOf(dtl);

      for (var prop in this.ovt.overtimeDtls[idx]) {
        this.ovt.overtimeDtls[idx][prop] = res[prop];
      }

      this.regroupDetail();
    });
  }

  deleteDetail(dtl: OvertimeDetail) {
    if (confirm('Are you sure want to delete?')) {
      this.ovt.overtimeDtls.splice(this.ovt.overtimeDtls.indexOf(dtl), 1);

      this.regroupDetail();
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
