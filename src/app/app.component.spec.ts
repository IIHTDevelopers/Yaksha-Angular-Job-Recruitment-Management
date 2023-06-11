import { TestBed, async } from "@angular/core/testing";
import { AppComponent } from "./app.component";
import { RouterModule } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";

describe("AppComponent", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterModule, RouterTestingModule],
      declarations: [AppComponent],
    }).compileComponents();
  }));

  describe("boundary", () => {
    it("should create the app", () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      expect(app).toBeTruthy();
    });

    it(`should have as title 'Job Recruitment Platform'`, () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      expect(app.title).toEqual("Job Recruitment Platform");
    });

    it("should render the title in an h1 tag", () => {
      const fixture = TestBed.createComponent(AppComponent);
      fixture.detectChanges();
      const compiled = fixture.nativeElement;
      expect(compiled.querySelector("h1").textContent).toContain(
        "Job Recruitment Platform"
      );
    });
  });
});
