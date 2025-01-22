import { Component } from '@angular/core';
import { NgxSnapCamComponent } from '../../projects/ngx-snap-cam/src/public-api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgxSnapCamComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'snap-cam';
  capturedImage = '';

  onCapture(img: string) {
    this.capturedImage = img;
  }
}
