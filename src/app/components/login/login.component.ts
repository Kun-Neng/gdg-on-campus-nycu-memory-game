import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  get account() {
    return this.loginForm.controls['account'];
  }

  get password() {
    return this.loginForm.controls['password'];
  }

  isFormChanged: boolean = false;
  isSubmitted: boolean = false;

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      account: new FormControl<string>('', { validators: [Validators.required, Validators.email] }),
      password: new FormControl<string>('', { validators: [Validators.required, Validators.minLength(6)] })
    });

    this.loginForm.valueChanges.subscribe(() => {
      this.isFormChanged = true;
      this.isSubmitted = false;
    });
  }

  logIn(): void {
    this.isSubmitted = true;

    if (this.password.errors?.['required']) {
      this.isFormChanged = false;
    }

    if (this.loginForm.invalid) {
      return;
    }

    this.router.navigate(['/playground']);
  }

  signUp(): void {
    this.router.navigate(['/signup']);
  }
}
