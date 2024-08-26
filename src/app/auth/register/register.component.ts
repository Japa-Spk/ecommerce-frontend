import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
//Services
import { AuthService } from '../../shared/services/auth/auth.service'
import { AlertService } from '../../shared/services/base/alerts.service'
import { LocalStorageService } from '../../shared/services/storage/localstorage.service'
import { EcommerceService } from '../../shared/services/ecommerce.service'
//Custom Validators
import { matchValuesValidator } from '../../shared/validators/match-values.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [ReactiveFormsModule],
  standalone: true
})
export class RegisterComponent implements OnInit {
  //Formulario
  public registerForm!: FormGroup;
  public initform = false;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder, 
    private _authService: AuthService, 
    private _alertService: AlertService, 
    private _lsService: LocalStorageService, 
    public _ecommerceService: EcommerceService
    ) {
    //Inicializar Formulario
    this.buildForm();
  }

  ngOnInit() {

  }

  buildForm() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      address: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      role:['CLIENT']
    },{validators:matchValuesValidator('password','confirmPassword')})
    this.initform = true;
  }

  register() {
    this._authService.register(this.registerForm?.value).then(async (res) => {
      console.log('register result ->', res);
      await this._alertService.alertaOk('Registro', 'Se Registro a usuario correctamente');
      this.router.navigate(['/login']);
    }, (error) => {
      console.log('register result error->', error);
      this._alertService.alertaError('No se registro usuario', error.error.detail);
    })
  }

}
