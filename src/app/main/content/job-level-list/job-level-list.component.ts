import { Component, OnInit } from '@angular/core';
import { fuseAnimations } from '../../../core/animations';
import { JobLevel } from '../../models/job-level';
import { JobLevelService } from '../../services/job-level.service';

@Component({
  selector: 'app-job-level-list',
  templateUrl: './job-level-list.component.html',
  styleUrls: ['./job-level-list.component.scss'],
  animations : fuseAnimations
})
export class JobLevelListComponent implements OnInit {

  joblevels: JobLevel[];
  loadingIndicator: boolean = true;

  constructor(
    private joblevelSvc: JobLevelService
  ) { }

  ngOnInit() {
    this.retrieveJobLevels();
  }

  retrieveJobLevels() {
    this.joblevelSvc.getJobLevels().subscribe(res => {
      this.joblevels = res;
      this.loadingIndicator = false;
    });
  }

  deleteRow(joblevel: JobLevel): void {
    this.joblevelSvc.deleteJobLevel(joblevel).subscribe();
    this.retrieveJobLevels();
  }

}
