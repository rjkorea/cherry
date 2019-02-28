import { Component, OnInit, ViewContainerRef, ViewChild, ElementRef, OnDestroy } from '@angular/core';
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
import { Router, ActivatedRoute } from '@angular/router';
import { PlaceDetailComponent } from 'app/components/place/place-detail.component';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-content-new2',
  templateUrl: './content-new2.component.html',
  styleUrls: ['./content-new2.component.css']
})
export class ContentNew2Component implements OnInit, OnDestroy {
  @ViewChild('name') name: ElementRef;
  @ViewChild('byte') byte: ElementRef;

  contentsForm = this.formBuilder.group({
    isPrivate: new FormControl(''),
    contentsName: new FormControl('', [Validators.required]),
    fromHours: new FormControl('', [Validators.required]),
    fromMins: new FormControl('', [Validators.required]),
    toHours: new FormControl('', [Validators.required]),
    toMins: new FormControl('', [Validators.required]),
    mFromDate: new FormControl(''),
    pcFromDate: new FormControl(''),
    mToDate: new FormControl(''),
    pcToDate: new FormControl(''),
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
  croppedImgFile = '';
  thumbnails = [''];
  thumbnailFiles = [];
  isThumbEnd = false;

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
  editContent: Object;
  contentId: string;
  isEdit = false;

  constructor(
    private formBuilder: FormBuilder,
    private popupService: PopupService,
    private viewContainerRef: ViewContainerRef,
    private dateFormat: DateTimeFormatPipe,
    private adminService: AdminService,
    private contentService: ContentService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.popupService.subject.subscribe(res => {
      const date = this.dateFormat.transform(res.getTime(), 'date');
      const type = this.popupService.getData();

      if (type === 'from') {
        this.contentsForm.controls['mFromDate'].setValue(date);
        this.contentsForm.controls['pcFromDate'].setValue(date);
      } else {
        this.contentsForm.controls['mToDate'].setValue(date);
        this.contentsForm.controls['pcToDate'].setValue(date);
      }
    });

    this.popupService.nameSubject.subscribe(res => {
      if (res.name === 'cropper') {
        this.croppedImg = res.value['base64'];
        this.croppedImgSize = res.value['file']['size'];
        this.croppedImgFile = res.value['file'];
        if (this.isEdit) this.updateThisImages('main', this.croppedImgFile);

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
    this.getEditStatus();
  }

  ngOnDestroy() {
    this.popupService.clearSubject();
    this.popupService.clearNameSubject();
  }

  getEditStatus(): void {
    const contentId = this.route.snapshot.paramMap.get('content_oid') || '';

    if (contentId) {
      this.isEdit = true;
      this.contentId = contentId;
      this.getThisContent(contentId);
    }
  }

  getThisContent(contentId): void {
    this.contentService.getThisContentV2(contentId).subscribe(res => {
      this.editContent = res['data'];
      this.setThisContent(res['data']);
    });
  }

  setThisContent(data): void {
    for (const key of data.tags) this.parseTags('split', key);

    if (data.when.hasOwnProperty('end')) {
      this.contentsForm.controls['mToDate'].setValue(this.dateFormat.transform(data.when.end * 1000, 'date'));
      this.contentsForm.controls['pcToDate'].setValue(this.dateFormat.transform(data.when.end * 1000, 'date'));
    }

    if (data.place.x && data.place.y) {
      this.placeObj = { place_name: data.place.name, place_url: data.place.url, x: data.place.x, y: data.place.y };
      this.placeX = parseFloat(data.place.x);
      this.placeY = parseFloat(data.place.y);
    }

    if (data.host.host_name) {
      this.hostObj = { hostName: data.host.host_name || '', hostEmail: data.host.host_email || '', hostTel: data.host.host_tel || '' };
      localStorage.setItem('temp', JSON.stringify(this.hostObj));
    }

    data.images.filter((img, i) => {
      if (i !== 0 && img.m !== null) {
        this.thumbnails.pop();
        this.thumbnails.push(img.m);
        if (this.thumbnails.length < 6) this.thumbnails.push('');

        // just mark length in edit mode
        this.thumbnailFiles.push(img.m);
      }
    });


    this.contentsForm.controls['isPrivate'].setValue(data.is_private);
    this.contentsForm.controls['contentsName'].setValue(data.name);
    this.contentsForm.controls['fromHours'].setValue(this.dateFormat.transform(data.when.start * 1000, 'hours'));
    this.contentsForm.controls['fromMins'].setValue(this.dateFormat.transform(data.when.start * 1000, 'mins'));
    this.contentsForm.controls['toHours'].setValue(this.dateFormat.transform(data.when.end * 1000, 'hours'));
    this.contentsForm.controls['toMins'].setValue(this.dateFormat.transform(data.when.end * 1000, 'mins'));
    this.contentsForm.controls['mFromDate'].setValue(this.dateFormat.transform(data.when.start * 1000, 'date'));
    this.contentsForm.controls['pcFromDate'].setValue(this.dateFormat.transform(data.when.start * 1000, 'date'));
    this.contentsForm.controls['siteUrl'].setValue(data.site_url);
    this.contentsForm.controls['videoUrl'].setValue(data.video_url);
    this.contentsForm.controls['notice'].setValue(data.notice.message);
    this.contentsForm.controls['description'].setValue(data.desc);
    this.contentsForm.controls['commentsPrivate'].setValue(data.comments.is_private);
    this.croppedImg = data.images[0].m;
    this.croppedImgSize = data.images[0].size || 0;

    this.checkBytes(this.name.nativeElement, this.byte.nativeElement);
    this.setPreview('');
  }

  updateThisImages(type, file): void {
    if (type === 'main') {
      const form = new FormData();
      form.append('image', file, this.cropTargetImgName);

      this.contentService.updateMainImg(this.contentId, form).subscribe(() => {
        alert('대표 이미지가 수정되었습니다.');
      });
    } else {
      const form = new FormData();
      form.append('image', file, file.name);

      this.contentService.updateExtraImg(this.contentId, form).subscribe(() => {
        alert('추가 이미지가 수정되었습니다.');
      });
    }
  }

  deleteThisExtraImg(idx): void {
    this.contentService.deleteExtraImg(this.contentId, idx).subscribe(() => {
      alert('추가 이미지가 삭제되었습니다');
    });
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
    this.previewData.tags = this.parseTags('combine', '');
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
 
  initFileInput(input): void {
    input.value = '';
  }

  changeExtraImg(o, idx): void {
    const file = o.srcElement.files[0];

    if (file) {
      if (file['type'].indexOf('image') !== -1) {
        const reader = new FileReader();
        this.thumbnailFiles.push(file);

        if (this.isEdit) this.updateThisImages('extra', file);

        reader.readAsDataURL(file);
        reader.onload = () => {
          this.thumbnails[idx] = reader.result.toString();
          if (idx < 5) this.thumbnails.push('');
        } 
      } else {
        alert('이미지는 JPEG, PNG, JPG 형식만 가능합니다.');
      }
    }
  }

  removeExtraImg(idx): void {
    this.thumbnails.splice(idx, 1);
    this.thumbnailFiles.splice(idx, 1);

    if (this.thumbnails.length === 5) {
      let flag = true;
      this.thumbnails.forEach(thum => { flag = (thum !== '') });
      if (flag) this.thumbnails.push('');
    }

    if (this.isEdit) this.deleteThisExtraImg(idx + 1);
  }

  parseTags(flag, key): Array<string | boolean> {
    let tags = [];

    if (flag === 'combine') {
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
    } else {
      if (key === '전시') this.contentsForm.controls['exhibition'].setValue(true);
      if (key === '쿠폰') this.contentsForm.controls['coupon'].setValue(true);
      if (key === '공연') this.contentsForm.controls['play'].setValue(true);
      if (key === '세미나') this.contentsForm.controls['seminar'].setValue(true);
      if (key === '콘서트') this.contentsForm.controls['concert'].setValue(true);
      if (key === '초대장') this.contentsForm.controls['invitation'].setValue(true);
      if (key === '페스티벌') this.contentsForm.controls['festival'].setValue(true);
      if (key === '청첩장') this.contentsForm.controls['wedding'].setValue(true);
      if (key === '클럽') this.contentsForm.controls['club'].setValue(true);
      if (key === '기타') this.contentsForm.controls['etc'].setValue(true);
    }

    return tags;
  }

  parseWhen(when): Date {
    let date: Date;

    if (when === 'start') {
      date = new Date(this.contentsForm.get('mFromDate').value || this.contentsForm.get('pcFromDate').value);
      date.setHours(this.contentsForm.get('fromHours').value);
      date.setMinutes(this.contentsForm.get('fromMins').value);
    } else {
      date = new Date(this.contentsForm.get('mToDate').value || this.contentsForm.get('pcToDate').value);
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
      tags: this.parseTags('combine', ''),
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
      host_name: this.hostObj['hostName'] || this.companyContactInfo['name'],
      host_email: this.hostObj['hostEmail'] || this.companyContactInfo['email'],
      host_tel: this.hostObj['hostTel'] || this.companyContactInfo['mobile_number'],
      site_url: this.contentsForm.get('siteUrl').value || '',
      video_url: this.contentsForm.get('videoUrl').value || '',
      notice: this.contentsForm.get('notice').value || '',
      desc: this.contentsForm.get('description').value || '',
      comments_private: this.contentsForm.get('commentsPrivate').value || false
    };

    if ((param.tags.length > 0) && this.croppedImg && param.place_name && param.place_x && param.place_y && param.when_start && param.when_end) {
      if (this.isEdit) {
        for (let i = 1; i <= 6; i++) delete param[`images_${i}`];
        this.contentService.updateThisContentV2(this.contentId, param).subscribe(() => {
          alert('수정되었습니다.');
          this.router.navigate(['/contents', { status: 'open' }]);
          localStorage.removeItem('temp');
        });
      } else {
        form.append('is_private', param.is_private);
        form.append('name', param.name);
        form.append('tags', JSON.stringify(param.tags));
        form.append('images_0', this.croppedImgFile, this.cropTargetImgName);
        form.append('images_1', param.images_1);
        form.append('images_2', param.images_2);
        form.append('images_3', param.images_3);
        form.append('images_4', param.images_4);
        form.append('images_5', param.images_5);
        form.append('images_6', param.images_6);
        form.append('place_name', param.place_name);
        form.append('place_url', param.place_url);
        form.append('place_x', param.place_x.toString());
        form.append('place_y', param.place_y.toString());
        form.append('when_start', param.when_start);
        form.append('when_end', param.when_end);
        form.append('host_name', param.host_name);
        form.append('host_email', param.host_email);
        form.append('host_tel', param.host_tel);
        form.append('site_url', param.site_url);
        form.append('video_url', param.video_url);
        form.append('notice', param.notice);
        form.append('desc', param.desc);
        form.append('comments_private', param.comments_private);

        this.contentService.createContentV2(form).subscribe(() => {
          alert('저장되었습니다.');
          this.router.navigate(['/contents', { status: 'open' }]);
          localStorage.removeItem('temp');
        });
      }
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
