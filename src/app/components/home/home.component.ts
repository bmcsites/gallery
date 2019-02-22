import { Component, OnInit } from '@angular/core';
import { HttpService } from '@services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.httpService.getimages(20, 20).subscribe(data => {
      console.log(data);
      // if(data.status === 'success') {
      //
      // }
      },
      err => {
        console.log('err:::', err);
      });
  }

}
