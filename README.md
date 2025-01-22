# SnapCam

Angular camera component for capturing photos directly from the browser.

## Features

- Easy to integrate web camera functionality
- Capture photos with a single click
- Customizable camera settings
- Responsive design
- Cross-browser support

## Demo

Check out the [Live Demo](https://sidiqovabbos.github.io/snap-cam)

## Installation

```bash
npm install ngx-snap-cam
```

## Usage

1. Import the NgxSnapCamComponent in your app.module.ts:
```typescript
import { NgxSnapCamComponent } from 'ngx-snap-cam';

@NgModule({
  imports: [NgxSnapCamComponent]
})
```

2. Use the component in your template:
```html
<ngx-snap-cam (snapTaken)="onPhotoCaptured($event)"></ngx-snap-cam>
```

## Development

This project contains:
- Main demo application
- `ngx-snap-cam` library package

### Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build library
npm run build:lib

# Build demo app
npm run build
```

### API Documentation

For detailed API documentation, please visit the [library documentation](./projects/ngx-snap-cam/README.md).

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT
