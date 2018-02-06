import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material';

import { Rw } from '../../models/rw';
import { RwService } from '../../services/rw.service';

import { RwDetailComponent } from '../rw-detail/rw-detail.component';

@Component({
  selector: 'app-rws',
  templateUrl: './rws.component.html',
  styleUrls: ['./rws.component.scss']
})
export class RwsComponent implements OnInit {
  loadingIndicator = true;
  rows: Rw[];
  rw: Rw = {
    id : 1,
    rwNo : '001',
    rwDescs : 'RW 001'
  };
  
  selected = [];
  selectedData: Rw;  
  columns = [
    { name: 'currentIndex' },
    { prop: 'id', name: 'Id' },
    { prop: 'rwNo', name: 'RW No' },
    { prop: 'rwDescs', name: 'Keterangan' }
  ];

  constructor (
    private rwService: RwService,
    private toastr: ToastrService,
    private dialog: MatDialog
	) { }

  ngOnInit() {
    this.getRws();
    this.loadingIndicator = false;
  }

  getRws(): void {
    this.rwService.getRws()
      .subscribe(rows => this.rows = rows);
  }
  
  showToast() {
	  this.toastr.success('Hello world!', 'Toastr fun!');
  }

  openDialogDetail() {
    let dialogRef = this.dialog.open(RwDetailComponent, {
        height: '90%'
      });
    
    dialogRef.afterClosed().subscribe(result => {
      this.getRws();
    });
  }

  openDialogDetailEdit() {
    let dialogRef = this.dialog.open(RwDetailComponent, {
        height: '90%',
        data: { type: 'update', data: this.selectedData }
      });
    
    dialogRef.afterClosed().subscribe(result => {
      this.getRws();
    });
  }

  openDialogDetailDelete()
  {
    let dialogRef = this.dialog.open(RwDetailComponent, {
      height: '310px',
      data: { type: 'delete', data: this.selectedData }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      this.getRws();
    });
  }

  onSelect({ selected }) {
    this.selectedData = this.selected[0];
  }
}
