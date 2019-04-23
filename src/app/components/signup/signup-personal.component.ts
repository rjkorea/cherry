import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { UtilService } from './../../services/util.service';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-signup-personal',
  templateUrl: './signup-personal.component.html',
  styleUrls: ['./signup-personal.component.css'],
  providers: []
})
export class SignupPersonalComponent implements OnInit {
  country_codes: any;
  months: any;
  days: any;
  genders: any;
  banks: any;
  body: any;
  signupForm = this.fb.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    last_name: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    mobile_country_code: new FormControl('', [Validators.required]),
    mobile_number: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(12)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    birthday_year: new FormControl('', [Validators.required, Validators.minLength(4)]),
    birthday_month: new FormControl('', [Validators.required]),
    birthday_day: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    is_term: new FormControl(false, [Validators.requiredTrue]),
    bank_name: new FormControl(''),
    bank_number: new FormControl('')
  });

  constructor(private router: Router,
              private fb: FormBuilder,
              private authService: AuthService,
              private utilService: UtilService) { }

  ngOnInit() {
    this.loadCountryCodeList();
    this.months = this.utilService.getMonths();
    this.days = this.utilService.getDays();
    this.genders = this.utilService.getGenders();
    this.banks = this.utilService.getBanks();
    this.signupForm.patchValue({
      birthday_month: this.months[0],
      birthday_day: this.days[0],
      gender: this.genders[0],
      bank_name: this.banks[0]
    });
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

  done() {
    const mobile_number = `${this.signupForm.get('mobile_country_code').value.code}${this.signupForm.get('mobile_number').value.substr(1)}`;
    this.body = {
      email: this.signupForm.get('email').value,
      password: this.signupForm.get('password').value,
      mobile_number: mobile_number,
      name: this.signupForm.get('name').value,
      last_name: this.signupForm.get('last_name').value,
      birthday: `${this.signupForm.get('birthday_year').value}${this.signupForm.get('birthday_month').value}${this.signupForm.get('birthday_day').value}`,
      gender: this.signupForm.get('gender').value.value,
      bank: {
        name: this.signupForm.get('bank_name').value,
        number: this.signupForm.get('bank_number').value,
        owner: `${this.signupForm.get('last_name').value}${this.signupForm.get('name').value}`
      }
    }
    this.authService.signupPersonal(this.body)
      .subscribe(
        response => {
          this.router.navigate(['/signup/done']);
        },
        error => {
          if (error['message'] === '400: duplicated email') {
            alert('이미 입력하신 이메일로 회원가입이 완료되어 있습니다.')
          } else {
            alert(error['message']);
          }
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
