import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { SellerService } from '../../../services/seller.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-seller-stats',
  templateUrl: './seller-stats.component.html',
  styleUrls: ['./seller-stats.component.css']
})
export class SellerStatsComponent implements OnInit {
  content_oid: string;
  sellers: Array<any>;
  page: number;
  size: number;
  selected_seller: any;
  is_loading: boolean;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private sellerService: SellerService,
              private authService: AuthService) { }

  ngOnInit() {
    this.is_loading = true;
    this.page = 1;
    this.size = 50;
    const params: Params = this.route.snapshot.params;
    if ('id' in params) {
      this.content_oid = params['id'];
      if ('page' in params) {
        this.page = params['page'];
      }
      this.loadSellerStats(this.content_oid, (this.page - 1) * this.size);
    } else {
      this.is_loading = false;
    }
  }

  loadSellerStats(content_oid: string, page: number) {
    this.sellerService.getStats(content_oid, page, this.size).subscribe(
      response => {
        this.sellers = response['data'];
        for (const seller of this.sellers) {
          let used_count = 0;
          let amount = 0;
          for (const to of seller['ticket_orders']) {
            used_count = used_count + to['ticket_used_count'];
            amount = amount + (to['commission'] * to['ticket_used_count']);
          }
          seller['used_count'] = used_count;
          seller['amount'] = amount;
        }
        this.is_loading = false;
      }
    )
  }

  onSettleModal(seller: any) {
    this.selected_seller = seller;
  }

}
