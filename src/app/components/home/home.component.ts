import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { HttpService } from '@services/http.service';
import { LargeImageModalComponent } from '@components/large-image-modal/large-image-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  data: any;
  loadedData: any;
  imageIndex: number;
  imageDataLoad: boolean;
  @ViewChild( 'largeModal' ) child: LargeImageModalComponent ;

  constructor(private httpService: HttpService) {
    // reset imageIndex and imageDataLoad
    this.imageIndex = 0;
    this.imageDataLoad = false;
  }

  ngOnInit() {
    // load images from server and add the scroll listener
    this.getImages();
    window.addEventListener('scroll', this.scroll, true);
  }

  getImages() {
    // call server (json) to load images
    this.httpService.getimages().subscribe(data => {
        // @ts-ignore
        if (data.status === 'success') {
          // @ts-ignore
          this.data = data.data.result.items;
          // call getNextImages to load only 10 images.
          this.getNextImages(10);
        }
      },
      err => {
        console.log('err:::', err);
      });
  }

  // load 10 images or add them.
  getNextImages(offset) {
    // reset parameters if not was set before.
    if (!this.loadedData) {
      this.loadedData = [];
      this.imageIndex = 0;
      offset = 10;
    }
    // check index and offset and then load images into loaded data.
    const addedImages = this.data.slice(this.imageIndex, this.imageIndex + offset);
    this.loadedData = this.loadedData.concat(addedImages);
    // update index
    this.imageIndex = this.imageIndex + 10;
    // update imageDataLoad
    this.imageDataLoad = false;
  }

  // click on image calls child openModal function to view the image modal
  openModal(image) {
    this.child.openModal(image);
  }

  // scroll function that being called when scrolling.
  scroll = (): void => {
    // check if we get to the end of the scroll bar
    if ((window.innerHeight + window.scrollY >= document.documentElement.offsetHeight) && !this.imageDataLoad) {
      // update imageDataLoad to avoid duplicate calls.
      this.imageDataLoad = true;
      // call getNextImages with the 10 as offset.
      this.getNextImages(10);
    }
  };

  ngOnDestroy() {
    // remove Listener when component is being Destroy'd
    window.removeEventListener('scroll', this.scroll, true);
  }

}
