import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';
import {IFeatureFlagService} from "./feature-flag.service";

@Directive({selector: "[featureFlag]"})
export class FeatureFlagDirective {
  private _feature: string = "";
  private hasView: boolean = false;

  @Input("featureFlag")
  set featureFlag(feature: string) {
    this._feature = feature;
    this.handleFeatureFlag();
  }

  constructor(
    private featureFlagService: IFeatureFlagService,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}

  private handleFeatureFlag(): void {
    this.featureFlagService.all().subscribe(() => {
      if (! this._feature) {
        this.createView();
      }

      const hasFeature = this.featureFlagService.hasFeature(this._feature);

      if (hasFeature) {
        this.createView();
      } else {
        this.destroyView();
      }
    });
  }

  private createView(): void {
    if (! this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    }
  }

  private destroyView(): void {
    if (this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }
}
