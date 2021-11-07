import {ComponentFixture, TestBed} from "@angular/core/testing";
import {FeatureFlagDirective} from "./feature-flag.directive";
import {Component, DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser";
import {IFeatureFlagService} from "./feature-flag.service";
import {of} from "rxjs";

@Component({
  template: `
    <div *featureFlag="'feature-1'" id="feature-1">Feature 1</div>
    <div *featureFlag="'feature-2'" id="feature-2">Feature 2</div>
  `
})
class TestComponent {}

describe('FeatureFlagDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let featureFlagSpy: jasmine.SpyObj<IFeatureFlagService> = jasmine.createSpyObj('IFeatureFlagService', [
    'all',
    'getFlags',
    'hasFeature'
  ]);
  let feature1Element: DebugElement;
  let feature2Element: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        FeatureFlagDirective,
        TestComponent
      ],
      providers: [
        { provide: IFeatureFlagService, useValue: featureFlagSpy }
      ]
    });

    fixture = TestBed.createComponent(TestComponent);
    feature1Element = fixture.debugElement.query(By.css("#feature-1"));
    feature2Element = fixture.debugElement.query(By.css("#feature-2"));

    featureFlagSpy.all.and.returnValue(of(true));
    featureFlagSpy.hasFeature.withArgs("feature-1").and.returnValue(false);
    featureFlagSpy.hasFeature.withArgs("feature-2").and.returnValue(true);
  });

  it("should hide features which are turned off by the feature flag", () => {
    fixture.detectChanges();
    const element = fixture.debugElement.query(By.css("#feature-1"));
    expect(element).toBeFalsy();
  });

  it("should show features which are turned on by the feature flag", () => {
    fixture.detectChanges();
    const element = fixture.debugElement.query(By.css("#feature-2"));
    expect(element).toBeTruthy();
  });
})
