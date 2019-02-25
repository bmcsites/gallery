import {Component, OnDestroy, OnInit} from '@angular/core';
import { HttpService } from '@services/http.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  data: any;
  loadedData: any;
  modelWindow: NgbModalRef;
  opendImage: any;

  constructor(private httpService: HttpService, private modalService: NgbModal) { }

  ngOnInit() {
    this.getImages();
    window.addEventListener('scroll', this.scroll, true);
  }

  getImages() {
    this.httpService.getimages().subscribe(data => {
        // @ts-ignore
        if (data.status === 'success') {
          // @ts-ignore
          this.data = data.data.result.items;
          console.log('this.data :::', this.data);
          this.getNextImages(0, 10);
        }
      },
      err => {
        console.log('err:::', err);
      });
  }

  getNextImages(count, offset) {
    if (!this.loadedData) {
      this.loadedData = [];
      count = 0;
      offset = 10;
    }
    const addedImages = this.data.slice(count, offset);
    this.loadedData = this.loadedData.concat(addedImages);
    console.log(addedImages, this.loadedData);
  }

  openModal(content, image) {
    this.opendImage = image;
    this.modelWindow = this.modalService.open(content, { backdrop : true, beforeDismiss: () => false });
  }

  scroll = (): void => {
    console.log('scroll', document.documentElement.clientHeight, window.pageYOffset, document.body.scrollHeight);
    if (document.documentElement.clientHeight <= window.pageYOffset) {
      this.getNextImages(11, 10);
    }
  };

  ngOnDestroy() {
    window.removeEventListener('scroll', this.scroll, true);
  }

}
