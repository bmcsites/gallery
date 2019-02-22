import { Component, OnInit } from '@angular/core';
import { HttpService } from '@services/http.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  data: any;
  modelWindow: NgbModalRef;
  opendImage: any;
  constructor(private httpService: HttpService, private modalService: NgbModal) { }

  ngOnInit() {
    this.getNextImages(20, 20);
  }

  getNextImages(count, offset) {
    this.httpService.getimages(count, offset).subscribe(data => {
        // @ts-ignore
        if (data.status === 'success') {
          // @ts-ignore
          this.data = data.data.result.items;
          console.log('this.data :::', this.data);
        }
      },
      err => {
        console.log('err:::', err);
      });
  }

  openModal(content, image) {
    this.opendImage = image;
    this.modelWindow = this.modalService.open(content, { backdrop : true, beforeDismiss: () => false });
  }

}
