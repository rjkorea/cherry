import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { UtilService } from './../../services/util.service';

@Component({
  selector: 'app-signup-personal',
  templateUrl: './signup-personal.component.html',
  styleUrls: ['./signup-personal.component.css'],
  providers: []
})
export class SignupPersonalComponent implements OnInit {
  country_codes: any;
  signupForm = this.fb.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    last_name: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    mobile_country_code: new FormControl('', [Validators.required]),
    mobile_number: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(12)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    birthday_year: new FormControl('', [Validators.required]),
    birthday_month: new FormControl('', [Validators.required]),
    birthday_day: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    bank_name: new FormControl(''),
    bank_number: new FormControl('')
  });

  constructor(private router: Router,
              private fb: FormBuilder,
              private utilService: UtilService) { }

  ngOnInit() {
    this.loadCountryCodeList();
  }

  loadCountryCodeList() {
    this.utilService.getCountryList('', 0, 100)
      .subscribe(
        response => {
          this.country_codes = response['data'];
          this.signupForm.patchValue({
            mobile_country_code: this.country_codes[0]
          });
        },
        error => {
          console.log(error);
        }
      );
  }

  get email() { return this.signupForm.get('email'); }

  get last_name() { return this.signupForm.get('last_name'); }

  get name () { return this.signupForm.get('name'); }

  get mobile_country_code() { return this.signupForm.get('mobile_country_code'); }

  get mobile_number() { return this.signupForm.get('mobile_number'); }

  get password() { return this.signupForm.get('password'); }

  get birthday_year() { return this.signupForm.get('birthday_year'); }

  get birthday_month() { return this.signupForm.get('birthday_month'); }

  get birthday_day() { return this.signupForm.get('birthday_day'); }

  get gender() { return this.signupForm.get('gender'); }

  get bank_name() { return this.signupForm.get('bank_name'); }

  get bank_number() { return this.signupForm.get('bank_number'); }

}
