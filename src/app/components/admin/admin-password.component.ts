import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AdminService } from '../../services/admin.service';


@Component({
  selector: 'app-admin-password',
  templateUrl: './admin-password.component.html',
  styleUrls: ['./admin-password.component.css'],
  providers: []
})
export class AdminPasswordComponent implements OnInit {
  admin: any;
  error_msg = '';

  constructor(private adminService: AdminService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.admin = {
      new_password_1: '',
      new_password_2: '',
    }
  }

  changePassword() {
    this.adminService.updateAdminPassword(this.route.snapshot.params['id'], this.admin)
      .subscribe(
        response => {
          this.router.navigate(['/admin', this.route.snapshot.params['id']]);
        },
        error => {
          if (error.message === '400: new password 1 and 2 not matched') {
            this.error_msg = '비밀번호가 일치하지 않습니다. 다시 입력해주세요.';
          } else if (error.message === '400: invalid new_password_1' || error.message === '400: invalid new_password_2') {
            this.error_msg = '비밀번호 형식이 올바르지 않습니다 (8자리이상, 영어 대/소문자, 숫자, 특수기호 포함)';
          } else {
            this.error_msg = '서버통신 장애가 발생 하였습니다';
          }
          console.log(this.error_msg);
        }
      );
  }

  disabledSubmit() {
    return !(this.admin.new_password_1 && this.admin.new_password_2);
  }

}
