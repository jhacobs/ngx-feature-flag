import {FeatureFlagGuard} from "./feature-flag.guard";
import {TestBed} from "@angular/core/testing";
import {ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {IFeatureFlagService} from "./feature-flag.service";
import {of} from "rxjs";

describe("FeatureFlagGuard", () => {
  let guard: FeatureFlagGuard;
  let routeState: RouterStateSnapshot;
  let featureFlagSpy: jasmine.SpyObj<IFeatureFlagService> = jasmine.createSpyObj('IFeatureFlagService', [
    'hasFeature',
    'all'
  ]);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: IFeatureFlagService, useValue: featureFlagSpy }
      ]
    });

    guard = TestBed.inject(FeatureFlagGuard);

    routeState = {
      url: ""
    } as RouterStateSnapshot;

    featureFlagSpy.all.and.returnValue(of(true));
    featureFlagSpy.hasFeature.withArgs("feature-1").and.returnValue(true);
    featureFlagSpy.hasFeature.withArgs("feature-2").and.returnValue(false);
  });

  it("will allow navigating to routes which feature flag is turned on", (done) => {
    const route = {
      data: {
        feature: "feature-1"
      }
    } as unknown as ActivatedRouteSnapshot;

    guard.canActivate(route, routeState).subscribe((result) => {
      expect(result).toBeTrue();
      done();
    });
  });

  it("will protect routes which feature flag is turned on", (done) => {
    const route = {
      data: {
        feature: "feature-2"
      }
    } as unknown as ActivatedRouteSnapshot;

    guard.canActivate(route, routeState).subscribe((result) => {
      expect(result).toBeFalse();
      done();
    });
  })
});
