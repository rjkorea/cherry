import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { DashboardService } from '../../services/dashboard.service';
import { AuthService } from '../../services/auth.service';
import { ContentService } from '../../services/content.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  contents: any;
  content_oid: string;

  total_ticket_count: any;
  total_ticket: any;
  total_company_count: number;
  total_user_count: number;
  total_content_count: number;
  total_gender_chart: any;
  monthly_new_users_chart: any;
  monthly_new_users_growth_rate: number;
  monthly_ticket_viral_chart: any;
  monthly_ticket_viral_growth_rate: number;
  monthly_active_users_chart: any;
  monthly_active_users_growth_rate: number;

  ticket_count: any;
  revenue: any;

  ticket_count_chart: any;

  is_loading: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dashboardService: DashboardService,
    private authService: AuthService,
    private contentService: ContentService
  ) {}

  ngOnInit() {
    this.is_loading = true;
    this.contents = [
      {
        _id: '',
        name: '컨텐츠',
        company: { name: '회사 이름' }
      }
    ];
    this.total_ticket_count = 0;
    this.ticket_count = {
      pend: 0,
      send: 0,
      register: 0,
      pay: 0,
      use: 0,
      cancel: 0
    };
    this.total_gender_chart = {
      type: 'doughnut',
      data: {
        labels: ['여자', '남자'],
        datasets: [
          {
            data: [0, 0],
            backgroundColor: ['#FF6384', '#36A2EB'],
            hoverBackgroundColor: ['#FF6384', '#36A2EB']
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true
      }
    };
    this.ticket_count = {
      use: 0,
      total: 0
    };
    this.revenue = {
      cash: 0,
      creditcard: 0
    };
    this.ticket_count_chart = {
      type: 'pie',
      data: {
        labels: ['전송준비', '전송중', '등록완료', '결제', '입장완료', '취소'],
        datasets: [
          {
            data: [0, 0, 0, 0, 0],
            backgroundColor: [
              '#777777',
              '#F0AD4E',
              '#5CB85C',
              '#337AB7',
              '#5BC0DE',
              '#D9534F'
            ],
            hoverBackgroundColor: [
              '#777777',
              '#F0AD4E',
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
    this.monthly_new_users_chart = {
      type: 'bar',
      data: {
        labels: [],
        datasets: [
          {
            label: 'MNU',
            data: [],
            backgroundColor: [
              '#62AAB8',
              '#62AAB8',
              '#62AAB8',
              '#62AAB8',
              '#62AAB8',
              '#62AAB8',
              '#62AAB8',
              '#62AAB8',
              '#62AAB8',
              '#62AAB8',
              '#62AAB8',
              '#ED7F81'
            ],
            borderColor: [
              '#59A2B0',
              '#59A2B0',
              '#59A2B0',
              '#59A2B0',
              '#59A2B0',
              '#59A2B0',
              '#59A2B0',
              '#59A2B0',
              '#59A2B0',
              '#59A2B0',
              '#59A2B0',
              '#D87072'
            ],
            borderWidth: 1.5
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          yAxes: [
            {
              gridLines: {
                offsetGridLines: true
              },
              ticks: {
                beginAtZero: true
              }
            }
          ],
          xAxes: [
            {
              gridLines: {
                offsetGridLines: true
              }
            }
          ]
        }
      }
    };
    this.monthly_ticket_viral_chart = {
      type: 'line',
      data: {
        labels: [],
        datasets: [
          {
            label: 'MTV',
            data: [],
            borderColor: '#D87072',
            backgroundColor: '#ED7F81',
            borderWidth: 1.5
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          yAxes: [
            {
              gridLines: {
                offsetGridLines: true
              },
              ticks: {
                beginAtZero: true
              }
            }
          ],
          xAxes: [
            {
              gridLines: {
                offsetGridLines: true
              }
            }
          ]
        }
      }
    };
    this.monthly_active_users_chart = {
      type: 'bar',
      data: {
        labels: [],
        datasets: [
          {
            label: 'MAU',
            data: [],
            backgroundColor: [
              '#8F6DAB',
              '#8F6DAB',
              '#8F6DAB',
              '#8F6DAB',
              '#8F6DAB',
              '#8F6DAB',
              '#8F6DAB',
              '#8F6DAB',
              '#8F6DAB',
              '#8F6DAB',
              '#8F6DAB',
              '#8F6DAB',
              '#ED7F81'
            ],
            borderColor: [
              '#5580B3',
              '#5580B3',
              '#5580B3',
              '#5580B3',
              '#5580B3',
              '#5580B3',
              '#5580B3',
              '#5580B3',
              '#5580B3',
              '#5580B3',
              '#5580B3',
              '#D87072'
            ],
            borderWidth: 1.5
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          yAxes: [
            {
              gridLines: {
                offsetGridLines: true
              },
              ticks: {
                beginAtZero: true
              }
            }
          ],
          xAxes: [
            {
              gridLines: {
                offsetGridLines: true
              }
            }
          ]
        }
      }
    };

    this.loadContents();
    const params: Params = this.route.snapshot.params;
    if ('id' in params) {
      this.content_oid = params['id'];
      this.loadDashboardContent(params['id']);
    } else {
      this.loadDashboard();
    }
  }

  loadDashboard() {
    this.is_loading = true;
    this.dashboardService.getDashboard().subscribe(
      response => {
        this.total_ticket_count = response['data']['total_ticket_count'];
        this.ticket_count_chart['data']['datasets'][0]['data'] = [
          response['data']['ticket_count']['pend'],
          response['data']['ticket_count']['send'],
          response['data']['ticket_count']['register'],
          response['data']['ticket_count']['pay'],
          response['data']['ticket_count']['use'],
          response['data']['ticket_count']['cancel']
        ];
        this.total_company_count = response['data']['total_company_count'];
        this.total_user_count = response['data']['total_user_count'];
        this.total_content_count = response['data']['total_content_count'];
        this.total_gender_chart['data']['datasets'][0]['data'] = [
          response['data']['gender_count']['female'],
          response['data']['gender_count']['male']
        ];
        response['data']['monthly_new_users'].forEach(element => {
          this.monthly_new_users_chart['data']['labels'].push(element['_id']);
          this.monthly_new_users_chart['data']['datasets'][0]['data'].push(
            element['count']
          );
        });
        this.monthly_new_users_growth_rate = ((this.monthly_new_users_chart.data.datasets[0].data[10] - this.monthly_new_users_chart.data.datasets[0].data[9]) / this.monthly_new_users_chart.data.datasets[0].data[9]) * 100;
        response['data']['monthly_ticket_viral'].forEach(element => {
          this.monthly_ticket_viral_chart['data']['labels'].push(
            element['_id']
          );
          this.monthly_ticket_viral_chart['data']['datasets'][0]['data'].push(
            element['count']
          );
        });
        this.monthly_ticket_viral_growth_rate = ((this.monthly_ticket_viral_chart.data.datasets[0].data[10] - this.monthly_ticket_viral_chart.data.datasets[0].data[9]) / this.monthly_ticket_viral_chart.data.datasets[0].data[9]) * 100;
        response['data']['monthly_active_users'].forEach(element => {
          this.monthly_active_users_chart['data']['labels'].push(
            element['_id']
          );
          this.monthly_active_users_chart['data']['datasets'][0]['data'].push(
            element['count']
          );
        });
        this.monthly_active_users_growth_rate = ((this.monthly_active_users_chart.data.datasets[0].data[10] - this.monthly_active_users_chart.data.datasets[0].data[9]) / this.monthly_active_users_chart.data.datasets[0].data[9]) * 100;
        this.is_loading = false;
      },
      error => {
        console.log(error);
      }
    );
  }

  loadDashboardContent(id: string) {
    this.is_loading = true;
    this.dashboardService.getDashboardContent(id).subscribe(
      response => {
        this.ticket_count = response['data']['ticket_count'];
        this.ticket_count_chart['data']['datasets'][0]['data'] = [
          response['data']['ticket_count']['pend'],
          response['data']['ticket_count']['send'],
          response['data']['ticket_count']['register'],
          response['data']['ticket_count']['pay'],
          response['data']['ticket_count']['use'],
          response['data']['ticket_count']['cancel']
        ];
        this.revenue = response['data']['revenue'];
        this.is_loading = false;
      },
      error => {
        console.log(error);
      }
    );
  }

  loadContents() {
    this.contentService.getContentList('', 0, 100).subscribe(
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
      this.router.navigate(['/dashboard', this.content_oid]);
      this.loadDashboardContent(this.content_oid);
    } else {
      this.router.navigate(['/dashboard', this.content_oid]);
      this.loadDashboard();
    }
  }

  onInfoAlert(msg: string) {
    alert(msg);
  }
}
