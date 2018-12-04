import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { TIMService } from '../../services/tim.service';
import { ContentService } from '../../services/content.service';

@Component({
  selector: 'app-tim-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {
  contents: any;
  content_oid: string;

  ticket_count: any;
  ticket_chart: any;
  gender_chart: any;
  revenue: any;
  total_forward: number;

  is_loading: boolean;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private timService: TIMService,
              private contentService: ContentService) { }

  ngOnInit() {
    this.is_loading = true;
    this.contents = [
      {
        _id: '',
        name: '컨텐츠',
        company: { name: '회사 이름' }
      }
    ];
    this.ticket_count = {
      pend: 0,
      send: 0,
      register: 0,
      pay: 0,
      use: 0,
      cancel: 0
    };
    this.total_forward = 0;
    this.revenue = {
      'cash': 0,
      'creditcard': 0
    };
    this.ticket_chart = {
      type: 'pie',
      data: {
        labels: ['등록완료', '결제', '입장완료', '취소'],
        datasets: [
          {
            data: [0, 0, 0, 0, 0],
            backgroundColor: [
              '#5CB85C',
              '#337AB7',
              '#5BC0DE',
              '#D9534F'
            ],
            hoverBackgroundColor: [
              '#5CB85C',
              '#337AB7',
              '#5BC0DE',
              '#D9534F'
            ]
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true
      }
    };

    this.gender_chart = {
      type: 'doughnut',
      data: {
        labels: ['여자', '남자'],
        datasets: [
          {
            data: [0, 0],
            backgroundColor: [
              '#FF6384',
              '#36A2EB'
            ],
            hoverBackgroundColor: [
              '#FF6384',
              '#36A2EB'
            ]
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true
      }
    };

    this.loadContents();
    const params: Params = this.route.snapshot.params;
    if ('id' in params) {
      this.content_oid = params['id'];
      this.loadAnalyticsContent(params['id']);
    } else {
      this.is_loading = false;
    }
  }

  loadAnalyticsContent(id: string) {
    this.is_loading = true;
    this.timService.getAnalyticsContent(id)
      .subscribe(
        response => {
          this.ticket_count = response['data']['ticket_count'];
          this.ticket_chart['data']['datasets'][0]['data'] = [
            response['data']['ticket_count']['register'],
            response['data']['ticket_count']['pay'],
            response['data']['ticket_count']['use'],
            response['data']['ticket_count']['cancel']
          ];
          this.gender_chart['data']['datasets'][0]['data'] = [
            response['data']['gender']['female'],
            response['data']['gender']['male']
          ];
          this.total_forward = response['data']['total_forward'];
          this.revenue = response['data']['revenue'];
          this.is_loading = false;
        },
        error => {
          console.log(error);
        }
      );
  }

  loadContents() {
    this.contentService.getContentList('', 0, 100)
      .subscribe(
        response => {
          this.contents = this.contents.concat(response['data']);
        },
        error => {
          console.log(error);
        }
      );
  }

  changeContent() {
    if (this.content_oid) {
      this.router.navigate(['/tim/analytics', this.content_oid]);
      this.loadAnalyticsContent(this.content_oid);
    } else {
      this.router.navigate(['/tim/analytics']);
    }
  }

}
