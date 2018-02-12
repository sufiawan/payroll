import { Component, OnInit } from '@angular/core';
import { fuseAnimations } from '../../../core/animations';
import { TimeOffPolicy } from '../../models/time-off-policy';
import { TimeOffPolicyService } from '../../services/time-off-policy.service';

@Component({
  selector: 'app-time-off-policy',
  templateUrl: './time-off-policy.component.html',
  styleUrls: ['./time-off-policy.component.scss'],
  animations : fuseAnimations
})
export class TimeOffPolicyComponent implements OnInit {
  rowsData: TimeOffPolicy[];

  constructor(
    private timeOffSvc: TimeOffPolicyService
  ) { }

  ngOnInit() {
    this.timeOffSvc.getList().subscribe(res => this.rowsData = res );
  }

  deleteRow(timeOff: TimeOffPolicy): void {
    if (confirm('Are you sure want to delete?')) {
      this.timeOffSvc.deleteData(timeOff).subscribe(res => {
        this.rowsData.splice(this.rowsData.indexOf(timeOff), 1);
      });            
    }      
  }

}
