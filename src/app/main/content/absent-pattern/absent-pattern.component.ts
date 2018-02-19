import { Component, OnInit } from '@angular/core';
import { fuseAnimations } from '../../../core/animations';
import { AbsentPattern } from '../../models/absent-pattern';
import { AbsentPatternService } from '../../services/absent-pattern.service';

@Component({
  selector: 'app-absent-pattern',
  templateUrl: './absent-pattern.component.html',
  styleUrls: ['./absent-pattern.component.scss'],
  animations : fuseAnimations
})
export class AbsentPatternComponent implements OnInit {

  absentPatterns: AbsentPattern[];
  loadingIndicator = true;

  constructor(
    private svc: AbsentPatternService
  ) { }

  ngOnInit() {

    this.svc.getList().subscribe(res => {
      this.absentPatterns = res;
      this.loadingIndicator = false;
    });
    
  }

  deleteRow(absPattern: AbsentPattern): void {
    if (confirm('Are you sure want to delete?')) {
      this.svc.deleteData(absPattern).subscribe(res => {
        this.absentPatterns.splice(this.absentPatterns.indexOf(absPattern), 1);
      });            
    }      
  }

}
