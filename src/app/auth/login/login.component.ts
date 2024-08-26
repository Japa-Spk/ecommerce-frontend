import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, AbstractControl, ReactiveFormsModule } from '@angular/forms';
//Services
import { AuthService } from '../../shared/services/auth/auth.service'
import { AlertService } from '../../shared/services/base/alerts.service'
import { LocalStorageService } from '../../shared/services/storage/localstorage.service'
//Interfaces
interface Usuario {
  email: string,
  password: string
};

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [ReactiveFormsModule],
  standalone: true
})

export class LoginComponent implements OnInit {
  //Formulario
  public loginForm!: FormGroup;
  public initform = false;
  constructor(private formBuilder: FormBuilder, private _authService: AuthService, private _alertService: AlertService, private _lsService: LocalStorageService) {
    //Inicializar Formulario
    this.buildForm();
  }


  ngOnInit() {

  }

  buildForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
    this.initform = true;
  }

  login() {
    this._authService.getLogin(this.loginForm?.value).then(res => {
      console.log('login result ->', res);
      //Crear localStorage Usuario
      var Usuario = {
        email: this.loginForm.value.email,
        token: res.token,
        expiresin: res.expiresIn,
        dateLogin: new Date()
      }
      this._lsService.set('user', Usuario);
    }, (error) => {
      console.log('login result error->', error);
      this._alertService.alertaError('No se inicio sesion', error.error.description);
    })
  }

}
