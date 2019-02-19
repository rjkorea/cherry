import { Component, OnInit, ViewContainerRef, ViewChild, ElementRef } from '@angular/core';
import { utils } from '../../../shared/utils';
import { PopupService } from '../../../services/popup.service';
import { SingleDateComponent } from '../../../components/common/calendar/single-date/single-date.component';
import { ModalCenterComponent } from '../../../components/common/popup/modal-center/modal-center.component';
import { ModalBottomComponent } from '../../../components/common/popup/modal-bottom/modal-bottom.component';
import { DateTimeFormatPipe } from '../../../pipes/datetime.pipe';
import { ContentCropperComponent } from './content-cropper/content-cropper.component';
import { ContentIsPrivateComponent } from './content-is-private/content-is-private.component';
import { ContentPlaceMapComponent } from './content-place-map/content-place-map.component';
import { ContentHostInfoComponent } from './content-host-info/content-host-info.component';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AdminService } from 'app/services/admin.service';
import { ContentService } from 'app/services/content.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-content-new2',
  templateUrl: './content-new2.component.html',
  styleUrls: ['./content-new2.component.css']
})
export class ContentNew2Component implements OnInit {
  @ViewChild('mFromDate') mFromDate: ElementRef;
  @ViewChild('pcFromDate') pcFromDate: ElementRef;
  @ViewChild('mToDate') mToDate: ElementRef;
  @ViewChild('pcToDate') pcToDate: ElementRef;

  contentsForm = this.formBuilder.group({
    isPrivate: new FormControl(''),
    contentsName: new FormControl('', [Validators.required]),
    fromHours: new FormControl('', [Validators.required]),
    fromMins: new FormControl('', [Validators.required]),
    toHours: new FormControl('', [Validators.required]),
    toMins: new FormControl('', [Validators.required]),
    exhibition: new FormControl(''),
    coupon: new FormControl(''),
    play: new FormControl(''),
    seminar: new FormControl(''),
    concert: new FormControl(''),
    invitation: new FormControl(''),
    festival: new FormControl(''),
    wedding: new FormControl(''),
    club: new FormControl(''),
    etc: new FormControl(''),
    siteUrl: new FormControl(''),
    videoUrl: new FormControl(''),
    notice: new FormControl(''),
    description: new FormControl(''),
    commentsPrivate: new FormControl('')
  });

  utils = utils;
  maxByte40 = 40;
  limitLength = 0;
  isCoverPopup = false;
  typeCoverPopup = '';
  cropTargetImgName = '';
  croppedImg = '';
  croppedImgSize = 0;
  cropeedImgFile = '';
  thumbnails = ['', '', '', '', '', ''];
  thumbnailFiles = ['', '', '', '', '', ''];

  placeObj: Object;
  placeX = 0;
  placeY = 0;

  hostObj = {};
  previewData = {
    name: '',
    tags: [],
    startDate: '',
    endDate: '',
    notice: '',
    desc: '',
    hostName: '',
    siteUrl: '',
    videoUrl: '',
    placeName: ''
  };

  companyContactInfo: Object;

  constructor(
    private formBuilder: FormBuilder,
    private popupService: PopupService,
    private viewContainerRef: ViewContainerRef,
    private dateFormat: DateTimeFormatPipe,
    private adminService: AdminService,
    private contentService: ContentService,
    private router: Router
  ) {
    this.popupService.subject.subscribe(res => {
      const date = this.dateFormat.transform(res.getTime(), 'date');
      const type = this.popupService.getData();

      if (type === 'from') {
        this.mFromDate.nativeElement.value = date;
        this.pcFromDate.nativeElement.value = date;
      } else {
        this.mToDate.nativeElement.value = date;
        this.pcToDate.nativeElement.value = date;
      }
    });

    this.popupService.nameSubject.subscribe(res => {
      if (res.name === 'cropper') {

        this.croppedImg = res.value['base64'];
        this.croppedImgSize = res.value['file']['size'];
        this.cropeedImgFile = res.value['file'];
      } else if (res.name === 'map') {
        this.placeObj = res.value;
        this.placeX = Number.parseFloat(this.placeObj['x']);
        this.placeY = Number.parseFloat(this.placeObj['y']);
      } else if(res.name === 'host') {
        this.hostObj = res.value;
      }
    });
  }

  ngOnInit() {
    this.getUserInfo();
  }

  getUserInfo(): void {
    this.adminService.getAdmin(localStorage.getItem('_id')).subscribe(res => {
      this.companyContactInfo = res['data']['company']['contact'];
    });
  }

  changeMainImg(o, type): void {
    const file = o.srcElement.files;

    if (file.length > 0) {
      this.popupService.setData(o);
      this.cropTargetImgName = file[0].name;

      if (type === 'm') {
        this.controlCoverPopup(true, 'cropper');
      } else {
        this.popupService.setView(this.viewContainerRef);
        this.popupService.add(ModalCenterComponent, ContentCropperComponent);
      }
    }
  }

  checkBytes(input, output): void {
    const byte = utils.getByteSize(input.value, 0, 0);

    if (byte > this.maxByte40) {
      input.value = input.value.slice(0, this.limitLength);
    } else {
      this.limitLength = input.value.length;
      output.innerText = byte;
    }
  }

  openDescriptionPopup(name): void {
    this.popupService.setView(this.viewContainerRef);

    if (name === 'isPrivate') {
      this.popupService.add(ModalCenterComponent, ContentIsPrivateComponent);
    }
  }

  openCalendar(type, when, input): void {
    this.popupService.setData(when);
    this.popupService.setView(this.viewContainerRef);

    if (type === 'm') {
      this.popupService.add(ModalBottomComponent, SingleDateComponent);
    } else {
      this.popupService.add(ModalCenterComponent, SingleDateComponent);
    }

    input.blur();
  }

  openPlaceMap(type): void {
    if (type === 'm') {
      this.controlCoverPopup(true, 'map');
    } else {
      this.popupService.setView(this.viewContainerRef);
      this.popupService.add(ModalCenterComponent, ContentPlaceMapComponent);
    }
  }

  openHostInfo(type): void {
    if (type === 'm') {
      this.controlCoverPopup(true, 'host');
    } else {
      this.popupService.setView(this.viewContainerRef);
      this.popupService.add(ModalCenterComponent, ContentHostInfoComponent);
    }
  }

  setPreview(type): void {
    this.previewData.name = this.contentsForm.get('contentsName').value;
    this.previewData.startDate = this.dateFormat.transform(this.parseWhen('start').getTime(), 'datetime');
    this.previewData.endDate = this.dateFormat.transform(this.parseWhen('end').getTime(), 'datetime');
    this.previewData.hostName = this.hostObj ? this.hostObj['hostName'] : this.companyContactInfo['name'];
    this.previewData.tags = this.parseTags();
    this.previewData.notice = this.contentsForm.get('notice').value;
    this.previewData.desc = this.contentsForm.get('description').value;
    this.previewData.siteUrl = this.contentsForm.get('siteUrl').value;
    this.previewData.videoUrl = this.contentsForm.get('videoUrl').value;
    this.previewData.placeName = this.placeObj !== undefined ? this.placeObj['place_name'] : '행사 장소가 표시되는 부분입니다';

    if (type === 'm') {
      this.controlCoverPopup(true, 'preview');
    }
  }

  controlCoverPopup(isOpen: boolean, type: string): void {
    this.isCoverPopup = isOpen;
    this.typeCoverPopup = type;
  }
 
  changeExtraImg(o, idx): void {
    const file = o.srcElement.files[0];

    if (file) {
      const reader = new FileReader();

      this.thumbnailFiles.push(file);

      reader.readAsDataURL(file);
      reader.onload = () => {
        this.thumbnails[idx] = reader.result.toString();
      }
    }
  }

  removeExtraImg(idx): void {
    this.thumbnails[idx] = '';
  }

  parseTags(): Array<string> {
    let tags = [];

    if (this.contentsForm.get('exhibition').value === true) tags.push('전시');
    if (this.contentsForm.get('coupon').value === true) tags.push('쿠폰');
    if (this.contentsForm.get('play').value === true) tags.push('공연');
    if (this.contentsForm.get('seminar').value === true) tags.push('세미나');
    if (this.contentsForm.get('concert').value === true) tags.push('콘서트');
    if (this.contentsForm.get('invitation').value === true) tags.push('초대장');
    if (this.contentsForm.get('festival').value === true) tags.push('페스티벌');
    if (this.contentsForm.get('wedding').value === true) tags.push('청첩장');
    if (this.contentsForm.get('club').value === true) tags.push('클럽');
    if (this.contentsForm.get('etc').value === true) tags.push('기타');

    return tags;
  }

  parseWhen(when): Date {
    let date: Date;

    if (when === 'start') {
      date = new Date(this.mFromDate.nativeElement.value || this.pcFromDate.nativeElement.value);
      date.setHours(this.contentsForm.get('fromHours').value);
      date.setMinutes(this.contentsForm.get('fromMins').value);
    } else {
      date = new Date(this.mToDate.nativeElement.value || this.pcToDate.nativeElement.value);
      date.setHours(this.contentsForm.get('toHours').value);
      date.setMinutes(this.contentsForm.get('toMins').value);
    }

    return date;
  }

  done(): void {
    const form = new FormData();
    const param = {
      is_private: this.contentsForm.get('isPrivate').value || false,
      name: this.contentsForm.get('contentsName').value,
      tags: this.parseTags(),
      images_1: this.thumbnailFiles[0] || '',
      images_2: this.thumbnailFiles[1] || '',
      images_3: this.thumbnailFiles[2] || '',
      images_4: this.thumbnailFiles[3] || '',
      images_5: this.thumbnailFiles[4] || '',
      images_6: this.thumbnailFiles[5] || '',
      place_name: this.placeObj !== undefined ? this.placeObj['place_name'] : '',
      place_url: this.placeObj !== undefined ? this.placeObj['place_url'] : '',
      place_x: this.placeObj !== undefined ? this.placeX : 0,
      place_y: this.placeObj !== undefined ? this.placeY : 0,
      when_start: this.dateFormat.transform(this.parseWhen('start').getTime(), 'apiDate'),
      when_end: this.dateFormat.transform(this.parseWhen('end').getTime(), 'apiDate'),
      host_name: this.hostObj !== undefined ? this.hostObj['hostName'] : this.companyContactInfo['name'],
      host_email: this.hostObj !== undefined ? this.hostObj['hostEmail'] : this.companyContactInfo['email'],
      host_tel: this.hostObj !== undefined ? this.hostObj['hostTel'] : this.companyContactInfo['tel'],
      site_url: this.contentsForm.get('siteUrl').value || '',
      video_url: this.contentsForm.get('videoUrl').value || '',
      notice: this.contentsForm.get('notice').value || '',
      desc: this.contentsForm.get('description').value || '',
      comments_private: this.contentsForm.get('commentsPrivate').value || ''
    };

    form.append('is_private', param.is_private);
    form.append('name', param.name);
    form.append('tags', JSON.stringify(param.tags));
    form.append('images_0', this.cropeedImgFile, this.cropTargetImgName);
    form.append('images_1', param.images_1)
    form.append('images_2', param.images_2)
    form.append('images_3', param.images_3)
    form.append('images_4', param.images_4)
    form.append('images_5', param.images_5)
    form.append('images_6', param.images_6)
    form.append('place_name', param.place_name)
    form.append('place_url', param.place_url)
    form.append('place_x', param.place_x.toString());
    form.append('place_y', param.place_y.toString());
    form.append('when_start', param.when_start);
    form.append('when_end', param.when_end);
    form.append('host_name', param.host_name),
    form.append('host_email', param.host_email),
    form.append('host_tel', param.host_tel),
    form.append('site_url', param.site_url),
    form.append('video_url', param.video_url),
    form.append('notice', param.notice),
    form.append('desc', param.desc),
    form.append('comments_private', param.comments_private)

    if ((param.tags.length > 0) && this.cropeedImgFile && param.place_name && param.place_x && param.place_y && param.when_start && param.when_end) {
      this.contentService.addContentV2(form).subscribe(res => {
        this.router.navigate(['/content']);
        localStorage.removeItem('temp');
      });
    } else {
      alert('필수정보를 모두 입력해주세요');
    }
  }

  get isPrivate() { return this.contentsForm.get('isPrivate'); }
  get contentsName() { return this.contentsForm.get('contentsName'); }
  get fromHours() { return this.contentsForm.get('fromHours'); }
  get fromMins() { return this.contentsForm.get('fromMins'); }
  get toHours() { return this.contentsForm.get('toHours'); }
  get toMins() { return this.contentsForm.get('toMins'); }
  get exhibition() { return this.contentsForm.get('exhibition'); }
  get coupon() { return this.contentsForm.get('coupon'); }
  get play() { return this.contentsForm.get('play'); }
  get seminar() { return this.contentsForm.get('seminar'); }
  get concert() { return this.contentsForm.get('concert'); }
  get invitation() { return this.contentsForm.get('invitation'); }
  get festival() { return this.contentsForm.get('festival'); }
  get wedding() { return this.contentsForm.get('wedding'); }
  get club() { return this.contentsForm.get('club'); }
  get siteUrl() { return this.contentsForm.get('siteUrl'); }
  get videoUrl() { return this.contentsForm.get('videoUrl'); }
  get notice() { return this.contentsForm.get('notice'); }
  get description() { return this.contentsForm.get('description'); }
  get commentsPrivate() { return this.contentsForm.get('commentsPrivate'); }
}
