import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { StatsService } from '../../services/stats.service';
import { ContentService } from '../../services/content.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
  content_oid: string;
  content: string;
  revenue: any;
  ticket_count: any;
  daily_ticket_viral_chart: any;
  total_viral: number;
  is_loading: boolean;

  constructor(private route: ActivatedRoute,
              private contentService: ContentService,
              private statsService: StatsService) { }

  ngOnInit() {
    this.is_loading = false;
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
    const params: Params = this.route.snapshot.params;
    if ('id' in params) {
      this.content_oid = params['id'];
      this.loadStatsContent(this.content_oid);
    } else {
      this.content_oid = null;
    }
  }

  loadStatsContent(id: string) {
    if (id) {
      this.is_loading = true;
      this.statsService.getStatsContent(id)
        .subscribe(
          response => {
            this.content = response['data']['content'];
            this.total_viral = response['data']['total_viral'];
            this.revenue = response['data']['revenue'];
            this.ticket_count = response['data']['ticket_count'];
            this.daily_ticket_viral_chart['data']['labels'] = [];
            this.daily_ticket_viral_chart['data']['datasets'][0]['data'] = [];
            response['data']['daily_ticket_viral'].forEach(element => {
              this.daily_ticket_viral_chart['data']['labels'].push(element['_id']);
              this.daily_ticket_viral_chart['data']['datasets'][0]['data'].push(element['count']);
            });
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

}
