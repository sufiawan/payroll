import { NgModule } from '@angular/core';
import { RouterModule, CanActivate } from '@angular/router';

import { SharedModule } from '../../core/modules/shared.module';

import { FuseSampleComponent } from './sample/sample.component';
import { RwsComponent } from './rws/rws.component';
import { RwDetailComponent } from './rw-detail/rw-detail.component';
import { RtsComponent } from './rts/rts.component';
import { AuthGuardService as AuthGuard } from '../services/auth-guard.service';
import { RtDetailComponent } from './rt-detail/rt-detail.component';
import { CompanyListComponent } from './company-list/company-list.component';
import { CompanyDetailComponent } from './company-detail/company-detail.component';
import { JobLevelListComponent } from './job-level-list/job-level-list.component';
import { JobLevelDetailComponent } from './job-level-detail/job-level-detail.component';
import { JobPositionDetailComponent } from './job-position-detail/job-position-detail.component';
import { JobPositionListComponent } from './job-position-list/job-position-list.component';
import { DivisionDetailComponent } from './division-detail/division-detail.component';
import { DivisionListComponent } from './division-list/division-list.component';
import { ProrateListComponent } from './prorate-list/prorate-list.component';
import { ProrateDetailComponent } from './prorate-detail/prorate-detail.component';
import { PayrollComponentComponent } from './payroll-component/payroll-component.component';
import { PayrollComponentDetailComponent } from './payroll-component-detail/payroll-component-detail.component';
import { TimeOffPolicyComponent } from './time-off-policy/time-off-policy.component';
import { TimeOffPolicyDetailComponent } from './time-off-policy-detail/time-off-policy-detail.component';

const routes = [
  {
    path: 'sample',
    component: FuseSampleComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'rws',
    component: RwsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'rw-detail',
    component: RwDetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'rts',
    component: RtsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'rt-detail',
    component: RtDetailComponent,
    canActivate: [AuthGuard]
  },
  // Company
  {
    path: 'master/company',
    component: CompanyListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'master/company/add',
    component: CompanyDetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'master/company/edit/:id',
    component: CompanyDetailComponent,
    canActivate: [AuthGuard]
  },
  // Division
  {
    path: 'master/division',
    component: DivisionListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'master/division/add',
    component: DivisionDetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'master/division/edit/:id',
    component: DivisionDetailComponent,
    canActivate: [AuthGuard]
  },
  // Job Position
  {
    path: 'master/jobposition',
    component: JobPositionListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'master/jobposition/add',
    component: JobPositionDetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'master/jobposition/edit/:id',
    component: JobPositionDetailComponent,
    canActivate: [AuthGuard]
  },
  // Job Level
  {
    path: 'master/joblevel',
    component: JobLevelListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'master/joblevel/add',
    component: JobLevelDetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'master/joblevel/edit/:id',
    component: JobLevelDetailComponent,
    canActivate: [AuthGuard]
  },
  // Pro Rate
  {
    path: 'master/prorate',
    component: ProrateListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'master/prorate/add',
    component: ProrateDetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'master/prorate/edit/:id',
    component: ProrateDetailComponent,
    canActivate: [AuthGuard]
  },
  // Payroll Component
  {
    path: 'master/component',
    component: PayrollComponentComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'master/component/add',
    component: PayrollComponentDetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'master/component/edit/:id',
    component: PayrollComponentDetailComponent,
    canActivate: [AuthGuard]
  },
  // Time Off
  {
    path: 'master/timeoffpolicy',
    component: TimeOffPolicyComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'master/timeoffpolicy/add',
    component: TimeOffPolicyDetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'master/timeoffpolicy/edit/:id',
    component: TimeOffPolicyDetailComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  declarations: [
    FuseSampleComponent,
    RwsComponent,
    RwDetailComponent,
    RtsComponent,
    RtDetailComponent,
    CompanyListComponent,
    CompanyDetailComponent,
    DivisionListComponent,
    DivisionDetailComponent,
    JobPositionListComponent,
    JobPositionDetailComponent,
    JobLevelListComponent,
    JobLevelDetailComponent,
    ProrateListComponent,
    ProrateDetailComponent,
    PayrollComponentComponent,
    PayrollComponentDetailComponent,
    TimeOffPolicyComponent,
    TimeOffPolicyDetailComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    FuseSampleComponent
  ]
})
export class AppRoutingModule { }
