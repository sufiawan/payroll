import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../services/company.service';
import { Company } from '../../models/company';
import { fuseAnimations } from '../../../core/animations';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss'],
  animations : fuseAnimations
})
export class CompanyListComponent implements OnInit {
  companies: Company[];
  loadingIndicator: boolean = true;

  constructor(
    private companySvc: CompanyService    
  ) { }

  ngOnInit() {    
    this.retrieveCompanies();
  }

  retrieveCompanies() {
    this.companySvc.getCompanies().subscribe(res => {
      this.companies = res;
      this.loadingIndicator = false;
    });
  }

  deleteRow(comp: Company): void {
    if (confirm('Are you sure want to delete?')) {
      this.companySvc.deleteCompany(comp).subscribe(res => {
        this.companies.splice(this.companies.indexOf(comp), 1);
      });            
    }      
  }
}
