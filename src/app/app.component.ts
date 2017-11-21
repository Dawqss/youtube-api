import {Component, ViewChild} from '@angular/core';
import {ConnectApiService} from "./connect-api.service";
import {Response} from "@angular/http";
import { NgForm} from "@angular/forms";
import {DomSanitizer} from "@angular/platform-browser";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private connect: ConnectApiService,
              private sanitize: DomSanitizer) {

  }

  @ViewChild('f') searchForm: NgForm;

  private firstRun: boolean = false;

  private response: object;

  private items: Array<{}>;

  private query: string;


  onNextPage() {
    if (this.firstRun) {
      this.connect.getResponse(this.getParams(this.response['nextPageToken']))
        .subscribe(
          (response: Response) => {
            this.response = JSON.parse(response.text());
            this.items = this.response['items'];
            console.log(this.items)
          },
          (error) => console.log(error),
          () => {
            this.firstRun = true;
          }
        );
    }

  }

  getUrl(item: string) {
    const start: string = 'https://www.youtube.com/embed/';
    return this.sanitize.bypassSecurityTrustResourceUrl((start + item));
  }

  getParams(token?: string) {
    let paramString: string = '';
    if (token) {
      paramString = '&pageToken=' + token;
    }
    for (let key in this.searchForm.value) {
      if (this.searchForm.value[key] !== '') {
        paramString += '&?' + key + '=' + this.searchForm.value[key];
      }
    }
    this.query = paramString;
    return paramString;
  }

  onSubmit() {
    this.connect.getResponse(this.getParams())
      .subscribe(
        (response: Response) => {
          this.response = JSON.parse(response.text());
          this.items = this.response['items'];
          console.log(this.items)
        },
        (error) => console.log(error),
        () => {
          this.firstRun = true;
        }
      );
  }
}
