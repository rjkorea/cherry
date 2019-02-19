import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { UtilService } from './../../services/util.service';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-signup-business',
  templateUrl: './signup-business.component.html',
  styleUrls: ['./signup-business.component.css'],
  providers: []
})
export class SignupBusinessComponent implements OnInit {
  country_codes: any;
  banks: any;
  body: any;
  signupForm = this.fb.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    manager_last_name: new FormControl('', [Validators.required]),
    manager_name: new FormControl('', [Validators.required]),
    mobile_country_code: new FormControl('', [Validators.required]),
    mobile_number: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(12)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    company_name: new FormControl('', [Validators.required]),
    business_license_number: new FormControl('', [Validators.required]),
    president_last_name: new FormControl('', [Validators.required]),
    president_name: new FormControl('', [Validators.required]),
    business_license_category1: new FormControl('', [Validators.required]),
    business_license_category2: new FormControl('', [Validators.required]),
    fax: new FormControl('', [Validators.required]),
    tel: new FormControl('', [Validators.required]),
    bank_name: new FormControl('', [Validators.required]),
    bank_number: new FormControl('', [Validators.required]),
    is_term: new FormControl(false, [Validators.requiredTrue])
  });

  constructor(private router: Router,
              private fb: FormBuilder,
              private authService: AuthService,
              private utilService: UtilService) { }

  ngOnInit() {
    this.loadCountryCodeList();
    this.banks = this.utilService.getBanks();
    this.signupForm.patchValue({
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
      manager: {
        name: this.signupForm.get('manager_name').value,
        last_name: this.signupForm.get('manager_last_name').value
      },
      name: this.signupForm.get('company_name').value,
      business_license: {
        number: this.signupForm.get('business_license_number').value,
        category1: this.signupForm.get('business_license_category1').value,
        category2: this.signupForm.get('business_license_category2').value
      },
      president: {
        last_name: this.signupForm.get('president_last_name').value,
        name: this.signupForm.get('president_name').value
      },
      fax: this.signupForm.get('fax').value,
      tel: this.signupForm.get('tel').value,
      bank: {
        name: this.signupForm.get('bank_name').value,
        number: this.signupForm.get('bank_number').value,
        owner: `${this.signupForm.get('manager_last_name').value}${this.signupForm.get('manager_name').value}`
      }
    }
    this.authService.signupBusiness(this.body)
      .subscribe(
        response => {
          this.router.navigate(['/signup/done']);
        },
        error => {
          alert(error);
          console.log(error);
        }
      );
  }

  get email() { return this.signupForm.get('email'); }

  get manager_last_name() { return this.signupForm.get('manager_last_name'); }

  get manager_name () { return this.signupForm.get('manager_name'); }

  get mobile_country_code() { return this.signupForm.get('mobile_country_code'); }

  get mobile_number() { return this.signupForm.get('mobile_number'); }

  get password() { return this.signupForm.get('password'); }

  get company_name() { return this.signupForm.get('company_name'); }

  get business_license_number() { return this.signupForm.get('business_license_number'); }

  get president_last_name() { return this.signupForm.get('president_last_name'); }

  get president_name () { return this.signupForm.get('president_name'); }

  get business_license_category1() { return this.signupForm.get('business_license_category1'); }

  get business_license_category2() { return this.signupForm.get('business_license_category2'); }

  get fax() { return this.signupForm.get('fax'); }

  get tel() { return this.signupForm.get('tel'); }

  get bank_name() { return this.signupForm.get('bank_name'); }

  get bank_number() { return this.signupForm.get('bank_number'); }

}
