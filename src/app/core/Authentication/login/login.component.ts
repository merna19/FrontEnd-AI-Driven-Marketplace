import { Component } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { UserserviceService } from '../../services/userservice.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
  });

  constructor(private userService: UserserviceService) {}

  login() {
    console.log(this.loginForm);
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
    } else {
      const credentials = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      };

      this.userService.login(credentials).subscribe({
        next: (response) => {
          console.log('Login successful:', response);
          // Handle success (e.g., store token, navigate)
        },
        error: (error) => {
          console.log('Login failed:', error);
          // Handle error (e.g., show message)
        }
      });

      this.loginForm.reset();
    }
  }
}
