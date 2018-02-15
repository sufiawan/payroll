import { Component, OnInit } from '@angular/core';
import { Overtime } from '../../models/overtime';
import { OvertimeService } from '../../services/overtime.service';
import { fuseAnimations } from '../../../core/animations';

@Component({
  selector: 'app-overtime',
  templateUrl: './overtime.component.html',
  styleUrls: ['./overtime.component.scss'],
  animations : fuseAnimations
})
export class OvertimeComponent implements OnInit {

  overtimes: Overtime[];
  loadingIndicator: boolean = true;

  constructor(
    private ovtSvc: OvertimeService
  ) { }

  ngOnInit() {

    this.ovtSvc.getList().subscribe(res => {
      this.overtimes = res;
      this.loadingIndicator = false;
    });

  }

  deleteRow(ovt: Overtime): void {
    if (confirm('Are you sure want to delete?')) {
      this.ovtSvc.deleteData(ovt).subscribe(res => {
        this.overtimes.splice(this.overtimes.indexOf(ovt), 1);
      });            
    }      
  }

}
