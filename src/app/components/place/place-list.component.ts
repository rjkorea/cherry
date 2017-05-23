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
