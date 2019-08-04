import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { TargetService } from '../../services/target.service';

enum State {
  Init, Loading, Done
}

@Component({
  selector: 'app-target',
  templateUrl: './target.component.html',
  styleUrls: ['./target.component.css'],
  providers: []
})
export class TargetComponent implements OnInit {
  StateEnum = State;
  state: State;
  targets: Array<any>;
  query: any = '';
  page: any = 1;
  size: any = 10;
  count: any = 0;

  constructor(private targetService: TargetService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.state = this.StateEnum.Init;
    const params: Params = this.route.snapshot.params;
    if ('page' in params) {
      this.page = +params['page'];
    }
    this.getTargetList(this.page);
  }

  getTargetList(page: any) {
    this.state = this.StateEnum.Loading;
    this.targetService.getTargetList((page - 1) * this.size, this.size)
      .subscribe(
        response => {
          this.count = response['count'];
          this.targets = response['data'];
          window.scrollTo(0, 0);
          this.state = this.StateEnum.Done;
        },
        error => {
          console.log(error);
          this.state = this.StateEnum.Done;
        }
      );
  }

  onFirstPage() {
    this.page = 1;
    this.router.navigate(['/target', {page: this.page}]);
    this.getTargetList(this.page);
  }

  onPrevPage() {
    const page = this.page - 1;
    this.page = page;
    this.router.navigate(['/target', {page: page}]);
    this.getTargetList(page);
  }

  onNextPage() {
    const page = this.page + 1;
    this.page = page;
    this.router.navigate(['/target', {page: page}]);
    this.getTargetList(page);
  }

  onEndPage() {
    this.page = Math.floor(this.count / this.size) + 1;
    this.router.navigate(['/target', {page: this.page}]);
    this.getTargetList(this.page);
  }

  onNew() {
    this.router.navigate(['/target/new']);
  }

}
