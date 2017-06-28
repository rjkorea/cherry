import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params} from '@angular/router';
import { QnaService } from '../../services/qna.service';

@Component({
  selector: 'app-qna-detail',
  templateUrl: './qna-detail.component.html',
  styleUrls: ['./qna-detail.component.css'],
  providers: []
})
export class QnaDetailComponent implements OnInit {
  qna: any;
  qna_form: any;
  edit_mode: boolean;
  is_loading: boolean;

  constructor(private route: ActivatedRoute,
              private qnaService: QnaService) { }

  ngOnInit() {
    this.is_loading = true;
    const params: Params = this.route.snapshot.params;
    this.loadQna(params['id']);
    this.edit_mode = false;
  }

  loadQna(id: string) {
    this.is_loading = true;
    this.qnaService.getQna(id)
      .subscribe(
        response => {
          this.qna = response['data'];
          this.is_loading = false;
        },
        error => {
          console.log(error);
          this.is_loading = false;
        }
      );
  }

  onEdit() {
    this.edit_mode = true;
  }

  onSave() {
    this.qna_form = {
      question: this.qna.question.trim(),
      answer: this.qna.answer.trim(),
      is_mytkit: this.qna.is_mytkit
    };
    this.qnaService.updateQna(this.qna._id, this.qna_form)
      .subscribe(
        response => {
          this.loadQna(this.qna._id);
          this.edit_mode = false;
        },
        error => {
          console.log(error);
          this.is_loading = false;
        }
      );
  }

  onCancel() {
    this.loadQna(this.qna._id);
    this.edit_mode = false;
  }

}
