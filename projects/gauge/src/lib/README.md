# Angular Gauge Component Library

## Overview

This Angular library provides a customizable gauge component that visualizes temperature data. It accepts minimum, maximum, and target temperature values as inputs and comes with optional styling.

## Installation

To install this library, run:

(in fact it is not published to npm)

```bash
npm install gauge
```

## Usage

Import the GaugeComponent module in your Angular application:

```typescript
import { GaugeModule } from 'gauge';

@NgModule({
  imports: [GaugeModule],
  ...
})
export class AppModule {}
```

Include the gauge component in your Angular templates like this:

```html
<app-gauge [minimumTemperature]="-20" [maximumTemperature]="50" [targetTemperature]="22"> </app-gauge>
```

### Inputs

- `minimumTemperature` : The minimum temperature value (required)
- `maximumTemperature`: The maximum temperature value (required)
- `targetTemperature` : The target temperature value (required)
- `width` : The width of the gauge (default is 200)
- `customClass` : Custom CSS class for additional styling (optional)

## Customization

The component supports customization through CSS by providing your own `customClass`.

## Development

This project was generated with [Angular CLI](https://github.com/angular/angular-cli).

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Further Help

For more information or support, please refer to our [Documentation](#) or open an [Issue](#).
