import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FeatureFlagConfig, INITIAL_OPTIONS} from "./config";
import {Observable, of} from "rxjs";
import {map, tap} from "rxjs/operators";

interface FeatureFlags { [flag: string]: boolean }

interface FeatureFlagsResponse {
  data: FeatureFlags;
}

@Injectable()
class FeatureFlagService implements IFeatureFlagService {
  private flags: FeatureFlags = {};

  constructor(
    private http: HttpClient,
    @Inject(INITIAL_OPTIONS) private options: FeatureFlagConfig
  ) {}

  public all(): Observable<boolean> {
    if (Object.keys(this.flags).length > 0) {
      return of(true);
    }

    let api = "";

    if (this.options.featureFlagApiUrl) {
      api = this.options.featureFlagApiUrl;
    }

    return this.http.get<FeatureFlagsResponse>(api).pipe(
      tap((response: FeatureFlagsResponse) => {
        this.flags = response.data;
      }),
      map(() => true)
    );
  }

  public hasFeature(feature: string): boolean {
    if (! this.getFlags()) {
      this.flags = {};
    }

    if (! this.getFlags().hasOwnProperty(feature)) {
      return true;
    }

    return this.getFlags()[feature];
  }

  public getFlags(): FeatureFlags {
    return this.flags;
  }
}

@Injectable({
  providedIn: "root",
  useClass: FeatureFlagService
})
export abstract class IFeatureFlagService {
  public abstract all(): Observable<boolean>;

  public abstract hasFeature(feature: string): boolean;

  public abstract getFlags(): FeatureFlags;
}
