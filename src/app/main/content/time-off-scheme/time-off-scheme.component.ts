import { Component, OnInit } from '@angular/core';
import { fuseAnimations } from '../../../core/animations';
import { TimeOffScheme } from '../../models/time-off-scheme';
import { TimeOffSchemeService } from '../../services/time-off-scheme.service';

@Component({
  selector: 'app-time-off-scheme',
  templateUrl: './time-off-scheme.component.html',
  styleUrls: ['./time-off-scheme.component.scss'],
  animations : fuseAnimations
})
export class TimeOffSchemeComponent implements OnInit {

  timeOffSchemes: TimeOffScheme[] = []
  loadingIndicator: boolean = true;

  constructor(
    private timeOffSchemeSvc: TimeOffSchemeService
  ) { }

  ngOnInit() {
    this.timeOffSchemeSvc.getList().subscribe(res => {
      this.timeOffSchemes = res;
      this.loadingIndicator = false;
    });
  }

  deleteRow(timeOffSch: TimeOffScheme): void {
    if (confirm('Are you sure want to delete?')) {
      this.timeOffSchemeSvc.deleteData(timeOffSch).subscribe(res => {
        this.timeOffSchemes.splice(this.timeOffSchemes.indexOf(timeOffSch), 1);
      });            
    }      
  }

}
