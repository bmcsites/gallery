import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-large-image-modal',
  templateUrl: './large-image-modal.component.html',
  styleUrls: ['./large-image-modal.component.scss']
})

export class LargeImageModalComponent {
  @ViewChild('imageBox') imageBox: ElementRef;
  openedImage: any;
  modelWindow: NgbModalRef;

  constructor(private modalService: NgbModal) { }

// open modal
  openModal(image) {
    this.openedImage = image;
    this.modelWindow = this.modalService.open(this.imageBox, { backdrop : true, beforeDismiss: () => false });
  }

}
