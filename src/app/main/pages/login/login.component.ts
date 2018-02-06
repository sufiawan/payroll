import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FuseConfigService } from '../../../core/services/config.service';
import { fuseAnimations } from '../../../core/animations';
import { SessionStorageService } from 'ngx-webstorage';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations : fuseAnimations
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginFormErrors: any;
  hide = true;
  token: any;

  constructor(
    private router: Router,
    private http: HttpClient,
    private fuseConfig: FuseConfigService,
    private formBuilder: FormBuilder,
    private storage: SessionStorageService,
    private authenticationService: AuthenticationService,
    private toastr: ToastrService
  )
  {
    this.fuseConfig.setSettings({
        layout: {
            navigation: 'none',
            toolbar   : 'none',
            footer    : 'none'
        }
    });

    this.loginFormErrors = {
        username   : {},
        password: {}
    };
  }

  ngOnInit()
  {
      this.loginForm = this.formBuilder.group({
          username   : ['', Validators.required],
          password: ['', Validators.required]
      });

      this.loginForm.valueChanges.subscribe(() => {
          this.onLoginFormValuesChanged();
      });
      this.authenticationService.logout();
  }

  onLoginFormValuesChanged()
  {
      for ( const field in this.loginFormErrors )
      {
          if ( !this.loginFormErrors.hasOwnProperty(field) )
          {
              continue;
          }

          // Clear previous errors
          this.loginFormErrors[field] = {};

          // Get the control
          const control = this.loginForm.get(field);

          if ( control && control.dirty && !control.valid )
          {
              this.loginFormErrors[field] = control.errors;
          }
      }
  }

  onSubmit() {
    this.authenticationService.login(this.loginForm.value["username"], this.loginForm.value["password"])
        .subscribe(result => {
            if (result === true) {
                // login successful
                this.router.navigate(['/']);
            } else {
                // login failed
                this.toastr.error('Login Failed!', 'Username or password is incorrect');
            }
        });
  }
}
