import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {IFeatureFlagService} from "./feature-flag.service";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({providedIn: "root"})
export class FeatureFlagGuard implements CanActivate {
  constructor(
    private featureFlagService: IFeatureFlagService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.featureFlagService.all().pipe(
      map(() => {
        return this.featureFlagService.hasFeature(route.data.feature);
      })
    );
  }
}
