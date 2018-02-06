import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Rw } from '../../models/rw';
import { RwService } from '../../services/rw.service';

@Component({
  selector: 'app-rw-detail',
  templateUrl: './rw-detail.component.html',
  styleUrls: ['./rw-detail.component.scss']
})
export class RwDetailComponent implements OnInit {
  form: FormGroup;
  formErrors: any;
  rw: Rw;
  type: string;
  isDelete: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private rwService: RwService,
    public dialogRef: MatDialogRef<RwDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
      this.formErrors = {
        rwNo   : {},
        rwDescs : {}
      };

      if (data) {
        this.rw = data.data;
        this.type = data.type;
        if (this.type == 'delete')
          this.isDelete = true;
        else
          this.isDelete = false;
      }
      else
        this.rw = { id: 0, rwNo: '', rwDescs: '' }
  }

  ngOnInit() {
    this.form = this.formBuilder.group({      
      rwNo : [this.rw.rwNo, Validators.required],
      rwDescs  : [this.rw.rwDescs]
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
    let rw = {
      id : this.rw.id,
      rwNo : this.form.value["rwNo"],
      rwDescs : this.form.value["rwDescs"]
    };
    if (rw.id == 0) {
      this.rwService.add(rw)
        .subscribe(result => {
          this.dialogRef.close();
      });
    } else if (this.type == 'update') {
      this.rwService.update(rw)
        .subscribe(result => {
          this.dialogRef.close();
      });
    } else if (this.type == 'delete') {
      this.rwService.delete(rw)
        .subscribe(result => {
          this.dialogRef.close();
      });
    } 
  }

  onCancel() {
    this.dialogRef.close();
  }
}
