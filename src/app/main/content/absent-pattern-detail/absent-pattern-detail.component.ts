import { Component, OnInit, Pipe } from '@angular/core';
import { AbsentPattern } from '../../models/absent-pattern';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AbsentPatternService } from '../../services/absent-pattern.service';
import { ActivatedRoute } from '@angular/router';
import { Time } from '@angular/common';
import { MatDialog } from '@angular/material';
import { AbsentPatternDetailFormComponent } from '../absent-pattern-detail-form/absent-pattern-detail-form.component';
import { AbsentPatternDetail } from '../../models/absent-pattern-detail';

@Component({
  selector: 'app-absent-pattern-detail',
  templateUrl: './absent-pattern-detail.component.html',
  styleUrls: ['./absent-pattern-detail.component.scss']
})

export class AbsentPatternDetailComponent implements OnInit {

  absentPattern: AbsentPattern = {
    id: 0, patternCd: null, name: null, absentPatternDtls: [
      { id: 0, dayPeriod: 1, dayStatus: 'I', dayStatusDesc: 'In', timeIn: '00:00', timeOut: '00:00', breakIn: '00:00', breakOut: '00:00' },
      { id: 0, dayPeriod: 2, dayStatus: 'I', dayStatusDesc: 'In', timeIn: '00:00', timeOut: '00:00', breakIn: '00:00', breakOut: '00:00' },
      { id: 0, dayPeriod: 3, dayStatus: 'I', dayStatusDesc: 'In', timeIn: '00:00', timeOut: '00:00', breakIn: '00:00', breakOut: '00:00' },
      { id: 0, dayPeriod: 4, dayStatus: 'I', dayStatusDesc: 'In', timeIn: '00:00', timeOut: '00:00', breakIn: '00:00', breakOut: '00:00' },
      { id: 0, dayPeriod: 5, dayStatus: 'I', dayStatusDesc: 'In', timeIn: '00:00', timeOut: '00:00', breakIn: '00:00', breakOut: '00:00' },
      { id: 0, dayPeriod: 6, dayStatus: 'O', dayStatusDesc: 'Out', timeIn: '00:00', timeOut: '00:00', breakIn: '00:00', breakOut: '00:00' },
      { id: 0, dayPeriod: 7, dayStatus: 'O', dayStatusDesc: 'Out', timeIn: '00:00', timeOut: '00:00', breakIn: '00:00', breakOut: '00:00' },
    ]
  };

  form: FormGroup;
  formErrors: any;
  sub: any;
  loadingbar = true;
  editing = {};

  constructor(
    private svc: AbsentPatternService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private dialog: MatDialog
  ) {

    this.formErrors = {
      patternCd: {},
      name: {},
    };

  }

  ngOnInit() {

    this.form = this.formBuilder.group({
      id: [this.absentPattern.id],
      patternCd: [this.absentPattern.patternCd, [Validators.required, Validators.maxLength(10)]],
      name: [this.absentPattern.name, [Validators.required, Validators.maxLength(100)]]
    });

    this.sub = this.route.params.subscribe(params => {
      const id = Number.parseInt(params['id']);
      if (id) {
        this.loadingbar = false;

        this.svc.getData(id)
          .subscribe(res => {
            this.absentPattern = res;

            this.form.setValue({
              id: this.absentPattern.id,
              patternCd: this.absentPattern.patternCd,
              name: this.absentPattern.name
            });

            this.loadingbar = true;
          }
        );
      }      
    });

    this.form.valueChanges.subscribe(() => {
      this.onFormValuesChanged();
    });

  }

  onSubmit(absentPattern: AbsentPattern) {
    if (this.form.valid) {
      if (this.absentPattern.absentPatternDtls.length != 0) {

        this.loadingbar = false;
        absentPattern.absentPatternDtls = this.absentPattern.absentPatternDtls;

        if (absentPattern.id === 0) {
          this.svc.addData(absentPattern).subscribe(res => { this.loadingbar = true; });
        } else {
          this.svc.updateData(absentPattern).subscribe(res => { this.loadingbar = true; });
        }
      } else {
        alert('Please fill Absent Pattern Detail');
      }
    }
  }

  updateValue(event, cell, rowIndex) {
    this.editing[rowIndex + '-' + cell] = false;
    this.absentPattern.absentPatternDtls[rowIndex][cell] = event.target.value;
    this.absentPattern.absentPatternDtls = [...this.absentPattern.absentPatternDtls];
  }

  editDetail(dtl: AbsentPatternDetail) {
    let dialogRef = this.dialog.open(AbsentPatternDetailFormComponent,
      {
        data: dtl
      }
    );

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        let idx = this.absentPattern.absentPatternDtls.indexOf(dtl);

        for (var prop in this.absentPattern.absentPatternDtls[idx]) {          
          this.absentPattern.absentPatternDtls[idx][prop] = res[prop];
        }
      }
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