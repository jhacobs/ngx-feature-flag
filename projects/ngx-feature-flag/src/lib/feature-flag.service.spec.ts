import { TestBed } from "@angular/core/testing";
import {IFeatureFlagService} from "./feature-flag.service";
import {HttpClient} from "@angular/common/http";
import {FeatureFlagConfig, INITIAL_OPTIONS} from "./config";
import {of} from "rxjs";

describe("FeatureFlagService", () => {
  let service: IFeatureFlagService;
  const httpSpy: jasmine.SpyObj<HttpClient> = jasmine.createSpyObj('HttpClient', ['post', 'get']);
  const options: FeatureFlagConfig = {
    featureFlagApiUrl: "http://localhost/api/feature-flags"
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useValue: httpSpy },
        { provide: INITIAL_OPTIONS, useValue: options }
      ]
    });

    service = TestBed.inject(IFeatureFlagService);
  });

  it("could get all feature flags", (done) => {
    httpSpy.get.withArgs("http://localhost/api/feature-flags")
      .and.returnValue(of({
        data: {
          "feature-1": true,
          "feature-2": false
        }
      })
    );

    const response = service.all();

    response.subscribe((res) => {
      expect(res).toBeTrue();

      expect(service.getFlags()).toEqual({
        "feature-1": true,
        "feature-2": false
      })

      done();
    });
  });

  it("could check if the app has a feature", () => {
    // This way we can set a private property for unit testing
    (service as any).flags = {
      "feature-1": true,
      "feature-2": false
    };

    expect(service.hasFeature("feature-1")).toBeTrue();
    expect(service.hasFeature("feature-2")).toBeFalse();
  });
})
