// Angular's
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class HttpService {

  constructor(private http: HttpClient) { }

  private readonly headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  getReqOptions() {
    return { headers: this.headers, withCredentials: true };
  }

  // getimages (count: number, offset: number) {
  //   return this.http.get('https://api.qwant.com/api/search/images?q=dogs&t=images&count=' + count + '&offset=' + offset + '&safesearch=1&locale=en_US&uiv=4', this.getReqOptions());
  // }

  getimages(count: number, offset: number) {
    return this.http.get('/assets/data/data.json', this.getReqOptions());
  }
}
