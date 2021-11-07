# ngx-feature-flag

Feature flags for an Angular application

## Installation

This package can be installed with npm

```bash
  npm install ngx-feature-flags
```

## Usage/Examples

### Import module

```typescript
import {NgModule} from '@angular/core';
import {FeatureFlagModule} from 'ngx-feature-flag';

@NgModule({
  imports: [
      FeatureFlagModule.forRoot({
        featureFlagApiUrl: 'http://api.example/api/feature-flags'
      })
  ]
})
export class Module {}
```

### Hide elements based on a feature flag

You can hide elements bases on a feature flag using the feature-flag directive.

```angular2html
<div *featureFlag="'profile-banner'">
  <h1>Profile banner</h1>
</div>
```

### Protect routes with feature flags

You can protect routes bases on a feature-flag using the feature flag guard.

```
  {
    path: "profile-banner",
    component: ProfileBannerComponent,
    canActivate: [FeatureFlagGuard],
    data: {
      feature: "profile-banner"    
    }
  },
```

## Run Locally

Clone the project

```bash
  git clone https://github.com/jhacobs/ngx-feature-flag
```

Go to the project directory

```bash
  cd ngx-feature-flag
```

Install dependencies

```bash
  npm install
```

## Running Tests

To run tests, run the following command

```bash
  npm run test
```

## License

[MIT](https://choosealicense.com/licenses/mit/)

