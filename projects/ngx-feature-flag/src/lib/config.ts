import {InjectionToken} from "@angular/core";

export interface FeatureFlagConfig {
  featureFlagApiUrl?: string
}

export const INITIAL_OPTIONS = new InjectionToken<FeatureFlagConfig>('ngx-feature-flag Initial Options');
