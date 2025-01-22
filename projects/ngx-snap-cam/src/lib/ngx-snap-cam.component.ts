import { NgTemplateOutlet } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ContentChild,
  ElementRef,
  input,
  OnDestroy,
  output,
  TemplateRef,
  viewChild,
} from '@angular/core';

@Component({
  selector: 'ngx-snap-cam',
  standalone: true,
  imports: [NgTemplateOutlet],
  template: `
    <div class="camera-container">
      <video #videoElement autoplay playsinline></video>
      <div class="toolbar">
        <ng-container
          *ngTemplateOutlet="
            customButton ? customButton : defaultButton;
            context: { $implicit: snapPhoto.bind(this) }
          "
        >
        </ng-container>
      </div>

      <ng-template #defaultButton>
        <button class="default-button" (click)="snapPhoto()">
          <svg
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 18V8a1 1 0 0 1 1-1h1.5l1.707-1.707A1 1 0 0 1 8.914 5h6.172a1 1 0 0 1 .707.293L17.5 7H19a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1Z"
            />
            <path
              stroke="currentColor"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        </button>
      </ng-template>
    </div>
  `,
  styles: `
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }
    .camera-container {
      position: relative;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .camera-container > video {
      width: 100%;
      height: auto;
      object-fit: cover;
      display: block;
    }
    .toolbar {
      position: absolute;
      bottom: 1rem;
    }
    .default-button {
      border-radius: 50%;
      background:rgba(65, 65, 65, 0.50);
      color: white;
      border: none;
      padding: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      transition: background 0.3s ease;
    }
    .default-button:hover {
      background:rgba(102, 102, 102, 0.50);
    }
    .default-button > svg {
      width: 24px;
      height: 24px;
    }
  `,
})
export class NgxSnapCamComponent implements AfterViewInit, OnDestroy {
  facingMode = input<'user' | 'environment'>('user');
  idealX = input<number>(1200);
  idealY = input<number>(700);
  snapTaken = output<string>();
  videoElement =
    viewChild.required<ElementRef<HTMLVideoElement>>('videoElement');
  videoNativeElement!: HTMLVideoElement;
  @ContentChild('customButton') customButton?: TemplateRef<any>;
  videoWidth = 0;
  videoHeight = 0;

  ngAfterViewInit(): void {
    this.videoNativeElement = this.videoElement().nativeElement;
    this.startCamera();
  }

  async startCamera(): Promise<void> {
    if (!navigator.mediaDevices?.getUserMedia) {
      alert('Camera access is not supported on this device.');
      return;
    }

    try {
      const constraints = {
        video: {
          facingMode: this.facingMode(),
          width: { ideal: this.idealX() },
          height: { ideal: this.idealY() },
        },
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);

      this.videoNativeElement.srcObject = stream;

      // Ensure video is ready
      await new Promise((resolve) => {
        this.videoNativeElement.onloadedmetadata = () => {
          this.videoWidth = this.videoNativeElement.videoWidth;
          this.videoHeight = this.videoNativeElement.videoHeight;
          resolve(true);
        };
      });

      await this.videoNativeElement.play();
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Unable to access camera. Please check permissions.');
    }
  }

  snapPhoto() {
    const canvas = document.createElement('canvas');

    canvas.width = this.videoWidth;
    canvas.height = this.videoHeight;

    const context = canvas.getContext('2d');
    if (!context) {
      alert('Unable to capture photo. Please try again.');
      return;
    }
    context.drawImage(
      this.videoNativeElement,
      0,
      0,
      canvas.width,
      canvas.height
    );

    const imageData = canvas.toDataURL('image/jpeg', 1.0);
    this.snapTaken.emit(imageData);
  }

  ngOnDestroy(): void {
    const videoSourceObject = this.videoNativeElement.srcObject;
    if (videoSourceObject instanceof MediaStream) {
      videoSourceObject.getTracks().forEach((track) => track.stop());
      this.videoNativeElement.srcObject = null;
    }
  }
}
