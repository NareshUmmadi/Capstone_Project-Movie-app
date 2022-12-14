import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { MovieService } from 'src/app/service/movie.service';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent{
  youtube_key: SafeResourceUrl = "https://www.youtube.com/embed/";

  constructor(public dialogRef: MatDialogRef<PlayComponent>, @Inject(MAT_DIALOG_DATA) public data: string, private _sanitizer: DomSanitizer) {
    this.youtube_key = this._sanitizer.bypassSecurityTrustResourceUrl(this.youtube_key + data);
  }
 
}
