import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../core/modules/shared.module';

import { FuseMainComponent } from './main.component';
import { FuseContentComponent } from './content/content.component';
import { FuseFooterComponent } from './footer/footer.component';
import { FuseNavbarVerticalComponent } from './navbar/vertical/navbar-vertical.component';
import { FuseToolbarComponent } from './toolbar/toolbar.component';
import { FuseNavigationModule } from '../core/components/navigation/navigation.module';
import { FuseNavbarVerticalToggleDirective } from './navbar/vertical/navbar-vertical-toggle.directive';
import { FuseNavbarHorizontalComponent } from './navbar/horizontal/navbar-horizontal.component';
import { FuseQuickPanelComponent } from './quick-panel/quick-panel.component';
import { FuseThemeOptionsComponent } from '../core/components/theme-options/theme-options.component';
import { FuseShortcutsModule } from '../core/components/shortcuts/shortcuts.module';
import { FuseSearchBarModule } from '../core/components/search-bar/search-bar.module';

import { AuthenticationService } from './services/authentication.service';
import { AuthGuardService } from './services/auth-guard.service';
import { RwService } from './services/rw.service';
import { RtService } from './services/rt.service';
import { CompanyService } from './services/company.service';
import { LogErrorHandleService } from './services/log-error-handle.service';
import { AppRoutingModule } from './content/app-routing.module';
import { PageRoutingModule } from './pages/page-routing.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DivisionService } from './services/division.service';
import { JobPositionService } from './services/job-position.service';
import { JobLevelService } from './services/job-level.service';
import { ProrateService } from './services/prorate.service';
import { PayrollComponentService } from './services/payroll-component.service';
import { TimeOffPolicyService } from './services/time-off-policy.service';
import { TimeOffSchemeService } from './services/time-off-scheme.service';
import { OvertimeService } from './services/overtime.service';
import { TaxSetupService } from './services/tax-setup.service'; 
import { AbsentPatternService } from './services/absent-pattern.service';

@NgModule({
    declarations: [
        FuseContentComponent,
        FuseFooterComponent,
        FuseMainComponent,
        FuseNavbarVerticalComponent,
        FuseNavbarHorizontalComponent,
        FuseToolbarComponent,
        FuseNavbarVerticalToggleDirective,
        FuseThemeOptionsComponent,
        FuseQuickPanelComponent
    ],
    imports     : [
        SharedModule,
        RouterModule,
        FuseNavigationModule,
        FuseShortcutsModule,
        FuseSearchBarModule,
        AppRoutingModule,
        PageRoutingModule,
        NgxDatatableModule
    ],
    exports     : [
        FuseMainComponent
    ],
    providers: [ 
        RwService, 
        RtService, 
        AuthenticationService, 
        AuthGuardService,        
        LogErrorHandleService,
        CompanyService,
        DivisionService,
        JobPositionService,
        JobLevelService,
        ProrateService,
        PayrollComponentService,
        TimeOffPolicyService,
        TimeOffSchemeService,
        OvertimeService,
        TaxSetupService,
        AbsentPatternService
    ],
})

export class FuseMainModule
{
}
