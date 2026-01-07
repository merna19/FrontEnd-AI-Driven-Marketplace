import { Component } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { UserserviceService } from '../../services/userservice.service';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup = new FormGroup({
    firstName: new FormControl(null, [Validators.required]),
    lastName: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
    confirmPassword: new FormControl(null, [Validators.required]),
    mobileNumber: new FormControl(null, [Validators.required]),
    companyName: new FormControl(null, [Validators.required]),
    country: new FormControl(null, [Validators.required]),
    city: new FormControl(null, [Validators.required]),
    nationality: new FormControl(null, [Validators.required])
  }, { validators: this.validateConfirmPassword });

  constructor(private userService: UserserviceService) {}

  register() {
    console.log(this.registerForm);
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
    } else {
      const formValue = this.registerForm.value;
      const credentials = {
        name: `${formValue.firstName} ${formValue.lastName}`,
        email: formValue.email,
        password: formValue.password,
        confirmPassword: formValue.confirmPassword
      };

      this.userService.register(credentials).subscribe({
        next: (response) => {
          console.log('Registration successful:', response);
          // Handle success (e.g., navigate to login)
        },
        error: (error) => {
          console.log('Registration failed:', error);
          // Handle error (e.g., show message)
        }
      });

      this.registerForm.reset();
    }
  }

  validateConfirmPassword(form: AbstractControl) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    if (password == confirmPassword) {
      return null;
    } else {
      return { passwordMismatch: true };
    }
  }
}
