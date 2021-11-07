import {ModuleWithProviders, NgModule} from '@angular/core';
import {FeatureFlagConfig, INITIAL_OPTIONS} from "./config";
import {FeatureFlagDirective} from "./feature-flag.directive";

@NgModule({
  declarations: [
    FeatureFlagDirective
  ]
})
export class FeatureFlagModule {
  static forRoot(options: FeatureFlagConfig): ModuleWithProviders<FeatureFlagModule> {
    return {
      ngModule: FeatureFlagModule,
      providers: [
        {
          provide: INITIAL_OPTIONS,
          useValue: options
        }
      ]
    }
  }
}
