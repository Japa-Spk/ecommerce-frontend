import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
//Services
import { AuthService } from '../../shared/services/auth/auth.service'
//Interfaces
interface Usuario {
  email: string,
  password: string
};

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true
})

export class LoginComponent implements OnInit {
  //Formulario
  public loginForm: FormGroup | undefined;
  public initform = false;
  constructor(private formBuilder: FormBuilder, private _authService: AuthService) {
    //Inicializar Formulario
    this.buildForm();
  }


  ngOnInit() {

  }

  buildForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required]
    })
    this.initform = true;
  }

  login() {
    this._authService.getLogin(this.loginForm?.value).then(res => {
      console.log('login result ->', res);

    })
  }

}
