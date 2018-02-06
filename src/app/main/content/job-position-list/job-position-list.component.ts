import { Component, OnInit } from '@angular/core';
import { fuseAnimations } from '../../../core/animations';
import { JobPosition } from '../../models/job-position';
import { JobPositionService } from '../../services/job-position.service';

@Component({
  selector: 'app-job-position-list',
  templateUrl: './job-position-list.component.html',
  styleUrls: ['./job-position-list.component.scss'],
  animations : fuseAnimations
})
export class JobPositionListComponent implements OnInit {

  jobpositions: JobPosition[];
  loadingIndicator: boolean = true;

  constructor(
    private jobposSvc: JobPositionService
  ) { }

  ngOnInit() {
    this.retrieveJobPositions();
  }

  retrieveJobPositions() {
    this.jobposSvc.getJobPositions().subscribe(res => {
      this.jobpositions = res;
      this.loadingIndicator = false;
    });
  }

  deleteRow(jobpos: JobPosition): void {
    this.jobposSvc.deleteJobPosition(jobpos).subscribe();
    this.retrieveJobPositions();
  }

}