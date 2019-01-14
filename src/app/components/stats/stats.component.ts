import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { StatsService } from '../../services/stats.service';
import { ContentService } from '../../services/content.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit, AfterViewInit {
  contents: any;
  select_content: any;
  revenue: any;
  ticket_count: any;
  daily_ticket_viral_chart: any;
  total_viral: number;
  is_loading: boolean;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private statsService: StatsService,
              private contentService: ContentService) { }

  ngOnInit() {
    this.is_loading = false;
    this.contents = [];
    this.select_content = '';
    this.daily_ticket_viral_chart = {
      type: 'line',
      data: {
        labels: [],
        datasets: [
          {
            label: 'DTV',
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
  }

  ngAfterViewInit() {
    this.loadContents();
  }

  loadContents() {
    this.contentService.getContentList('', 0, 100)
      .subscribe(
        response => {
          this.contents = response['data'];
          if (this.contents) {
            this.select_content = this.contents[0];
            this.loadStatsContent();
          }
        },
        error => {
          console.log(error);
        }
      );
  }

  loadStatsContent() {
    this.is_loading = true;
    if (this.select_content) {
      this.statsService.getStatsContent(this.select_content._id)
        .subscribe(
          response => {
            this.total_viral = response['data']['total_viral'];
            this.revenue = response['data']['revenue'];
            this.ticket_count = response['data']['ticket_count'];
            this.daily_ticket_viral_chart['data']['labels'] = [];
            this.daily_ticket_viral_chart['data']['datasets'][0]['data'] = [];
            response['data']['daily_ticket_viral'].forEach(element => {
              this.daily_ticket_viral_chart['data']['labels'].push(element['_id']);
              this.daily_ticket_viral_chart['data']['datasets'][0]['data'].push(element['count']);
            });
            this.router.navigate(['/stats', this.select_content._id]);
            this.is_loading = false;
          },
          error => {
            this.is_loading = false;
            console.log(error);
          }
        );
    } else {
      this.is_loading = false;
    }

  }

  onChangeContent() {
    this.loadStatsContent();
  }

}
