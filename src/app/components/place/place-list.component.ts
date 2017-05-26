import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { PlaceService } from '../../services/place.service';

@Component({
  selector: 'app-place-list',
  templateUrl: './place-list.component.html',
  styleUrls: ['./place-list.component.css'],
  providers: []
})
export class PlaceListComponent implements OnInit {
  private places: Array<Object>;
  private query: any = '';
  private page: any = 1;
  private size: any = 9;
  private count: any = 0;
  private stats: any;

  constructor(private placeService: PlaceService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    let params: Params = this.route.snapshot.params;
    if('query'in params) {
      this.query = params['query'];
    }
    if('page' in params) {
      this.page = +params['page'];
    }
    this.stats = {
      A: {
        checkin: 34,
        total: 180
      },
      B: {
        checkin: 3,
        total: 100
      },
      C: {
        checkin: 10,
        total: 30
      },
      D: {
        checkin: 154,
        total: 190
      },
      E: {
        checkin: 39,
        total: 100
      },
      F: {
        checkin: 530,
        total: 569
      },
      G: {
        checkin: 40,
        total: 225
      },
    };
    this.loadStats();
    this.loadPlaces(this.query, this.page);
  }

  loadPlaces(query:any, page: any) {
    this.placeService.getPlaceList(query, (page-1)*this.size, this.size)
      .subscribe(
        response => {
          this.count = response['count'];
          this.places = response['data'];
        },
        error => {
          console.log(error);
        }
      );
  }

  loadStats() {
    this.placeService.getStats()
      .subscribe(
        response => {
          this.stats.A.checkin = response['data']['A'];
          this.stats.B.checkin = response['data']['B'];
          this.stats.C.checkin = response['data']['C'];
          this.stats.D.checkin = response['data']['D'];
          this.stats.E.checkin = response['data']['E'];
          this.stats.F.checkin = response['data']['F'];
          this.stats.G.checkin = response['data']['G'];
        },
        error => {
          console.log(error);
        }
      );
  }

  onPrev() {
    let page = this.page - 1;
    this.page = page
    this.router.navigate(['/place', {query: this.query, page: page}]);
    this.loadPlaces(this.query, page);
  }

  onNext() {
    let page = this.page + 1;
    this.page = page;
    this.router.navigate(['/place', {query: this.query, page: page}]);
    this.loadPlaces(this.query, page);
  }

  search() {
    this.router.navigate(['/place', {query: this.query, page: this.page}]);
    this.loadPlaces(this.query, 1);
  }

}
