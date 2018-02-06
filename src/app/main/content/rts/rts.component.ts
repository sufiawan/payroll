import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material';

import { Rt } from '../../models/rt';
import { RtService } from '../../services/rt.service';

import { RtDetailComponent } from '../rt-detail/rt-detail.component';

@Component({
  selector: 'app-rts',
  templateUrl: './rts.component.html',
  styleUrls: ['./rts.component.scss']
})
export class RtsComponent implements OnInit {
  loadingIndicator = true;
  rows: Rt[];
  rt: Rt = {
    id : 1,
    rtNo: '001',
    rwNo : '001',
    rw : 1    
  };
  
  selected = [];
  selectedData: Rt;  
  columns = [
    { prop: 'id', name: 'Id' },
    { prop: 'rtNo', name: 'Rt No' },
    { prop: 'rwNo', name: 'RW No' }
  ];

  constructor (
    private rtService: RtService,
    private toastr: ToastrService,
    private dialog: MatDialog
	) { }

  ngOnInit() {
    this.getRows();
    this.loadingIndicator = false;
  }

  getRows(): void {
    this.rtService.getRows()
      .subscribe(rows => this.rows = rows);
  }

  openDialogDetail() {
    let dialogRef = this.dialog.open(RtDetailComponent, {
        height: '90%'
      });
    
    dialogRef.afterClosed().subscribe(result => {
      this.getRows();
    });
  }

  openDialogDetailEdit() {
    let dialogRef = this.dialog.open(RtDetailComponent, {
        height: '90%',
        data: { type: 'update', data: this.selectedData }
      });
    
    dialogRef.afterClosed().subscribe(result => {
      this.getRows();
    });
  }

  openDialogDetailDelete()
  {
    let dialogRef = this.dialog.open(RtDetailComponent, {
      height: '310px',
      data: { type: 'delete', data: this.selectedData }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      this.getRows();
    });
  }

  onSelect({ selected }) {
    this.selectedData = this.selected[0];
  }
}
