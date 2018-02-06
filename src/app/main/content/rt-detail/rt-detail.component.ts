import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Rt } from '../../models/rt';
import { RtService } from '../../services/rt.service';
import { Rw } from '../../models/rw';
import { RwService } from '../../services/rw.service';

@Component({
  selector: 'app-rt-detail',
  templateUrl: './rt-detail.component.html',
  styleUrls: ['./rt-detail.component.scss']
})
export class RtDetailComponent implements OnInit {
  form: FormGroup;
  formErrors: any;
  rt: Rt;
  rws: Rw[];
  type: string;
  isDelete: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private rtService: RtService,
    private rwService: RwService,
    public dialogRef: MatDialogRef<RtDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
      this.formErrors = {
        rtNo   : {},
        rw : {}
      };

      if (data) {
        this.rt = data.data;
        this.type = data.type;
        if (this.type == 'delete')
          this.isDelete = true;
        else
          this.isDelete = false;
      }
      else
        this.rt = { id: 0, rtNo: '', rw: 0, rwNo: '' }
  }

  ngOnInit() {
    this.getRws();
    this.form = this.formBuilder.group({      
      rtNo : [this.rt.rwNo, Validators.required],
      rw  : [this.rt.rw, Validators.required]
    });

    this.form.valueChanges.subscribe(() => {
      this.onFormValuesChanged();
    });
  }

  onFormValuesChanged()
  {
      for ( const field in this.formErrors )
      {
          if ( !this.formErrors.hasOwnProperty(field) )
          {
              continue;
          }

          // Clear previous errors
          this.formErrors[field] = {};

          // Get the control
          const control = this.form.get(field);

          if ( control && control.dirty && !control.valid )
          {
              this.formErrors[field] = control.errors;
          }
      }
  }

  onSubmit() {
    let rt = {
      id : this.rt.id,
      rtNo : this.form.value["rtNo"],
      rw : this.form.value["rw"],
      rwNo : ''
    };
    if (rt.id == 0) {
      this.rtService.add(rt)
        .subscribe(result => {
          this.dialogRef.close();
      });
    } else if (this.type == 'update') {
      this.rtService.update(rt)
        .subscribe(result => {
          this.dialogRef.close();
      });
    } else if (this.type == 'delete') {
      this.rtService.delete(rt)
        .subscribe(result => {
          this.dialogRef.close();
      });
    } 
  }

  onCancel() {
    this.dialogRef.close();
  }

  getRws(): void {
    this.rwService.getRws()
      .subscribe(rws => this.rws = rws);
  }
}
