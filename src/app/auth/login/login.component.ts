import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Login Data:', this.loginForm.value);

      // Перевірка логіну/пароля
      const { username, password } = this.loginForm.value;
      if (username === 'admin' && password === '1234') {
        this.router.navigate(['/dashboard']);
      } else {
        alert('Невірний логін або пароль');
      }

    } else {
      this.loginForm.markAllAsTouched();
      console.log('Форма не валідна');
    }
  }
}
