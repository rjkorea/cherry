import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params} from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
  providers: []
})
export class UserDetailComponent implements OnInit {
  user: any;
  user_form: any;
  edit_mode: boolean;

  constructor(private route: ActivatedRoute,
              private userService: UserService) { }

  ngOnInit() {
    const params: Params = this.route.snapshot.params;
    this.loadUser(params['id']);
    this.edit_mode = false;
  }

  loadUser(id: string) {
    this.userService.getUser(id)
      .subscribe(
        response => {
          this.user = response['data'];
        },
        error => {
          console.log(error);
        }
      );
  }

  onEdit() {
    this.edit_mode = true;
  }

  onInit() {
    this.userService.initUser(this.user._id)
      .subscribe(
        response => {
          alert('유저의 암호와 약관동의 사항을 초기화 하였습니다.');
        },
        error => {
          console.log(error);
        }
      );
  }

  onSave() {
    this.user_form = {
      name: this.user.name,
      email: this.user.email,
      mobile_number: this.user.mobile_number,
      birthday: this.user.birthday,
      gender: this.user.gender,
      enabled: this.user.enabled
    };
    this.userService.updateUser(this.user._id, this.user_form)
      .subscribe(
        response => {
          this.loadUser(this.user._id);
          this.edit_mode = false;
        },
        error => {
          console.log(error);
        }
      );
  }

  onCancel() {
    this.loadUser(this.user._id);
    this.edit_mode = false;
  }

}
