# ngx-snap-cam

A lightweight, customizable Angular camera component for capturing photos directly from the browser.

[![npm version](https://badge.fury.io/js/ngx-snap-cam.svg)](https://www.npmjs.com/package/ngx-snap-cam)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- 📸 Easy photo capture
- 🎨 Customizable snap button
- 📱 Front/rear camera support
- 🖼️ Configurable resolution
- 🎯 Standalone component
- 💪 TypeScript support

## Installation

```bash
npm install ngx-snap-cam
```

## Usage

```typescript
import { NgxSnapCamComponent } from 'ngx-snap-cam';

@Component({
  // ...
  imports: [NgxSnapCamComponent],
  // ...
})
```

### Basic Usage

```html
<ngx-snap-cam 
  [facingMode]="'user'"
  [idealX]="1200"
  [idealY]="700"
  (snapTaken)="onPhotoTaken($event)">
</ngx-snap-cam>
```

### Custom Snap Button

```html
<ngx-snap-cam (snapTaken)="onPhotoTaken($event)">
  <ng-template #customButton let-snap>
    <button (click)="snap()">Custom Snap Button</button>
  </ng-template>
</ngx-snap-cam>
```

## API Reference

### Inputs

| Input      | Type                | Default    | Description                        |
|------------|---------------------|------------|------------------------------------|
| facingMode | 'user'/'environment'| 'user'     | Camera facing mode                 |
| idealX     | number              | 1200       | Ideal width of the camera output   |
| idealY     | number              | 700        | Ideal height of the camera output  |

### Outputs

| Output     | Type                | Description                          |
|------------|---------------------|--------------------------------------|
| snapTaken  | string              | Emits base64 encoded image when snap is taken |

## Example

```typescript
export class AppComponent {
  onPhotoTaken(photoData: string) {
    console.log('Photo taken:', photoData);
    // Handle the photo data (base64 string)
  }
}
```

## Browser Support

Works in all modern browsers that support the WebRTC API:
- Chrome
- Firefox
- Safari
- Edge

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
