import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { JobFormComponent } from "./job-form.component";
import { HttpClientModule } from "@angular/common/http";
import { RouterTestingModule } from "@angular/router/testing";

describe("JobFormComponent", () => {
  let component: JobFormComponent;
  let fixture: ComponentFixture<JobFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule, ReactiveFormsModule],
      declarations: [JobFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe("exception", () => {
    it("should create the component", () => {
      expect(component).toBeTruthy();
    });

    it("should be invalid when form is empty", () => {
      expect(component.jobForm.valid).toBeFalsy();
    });

    it("should be invalid when job title is less than 3 characters", () => {
      const jobTitle = component.jobForm.controls["jobTitle"];
      jobTitle.setValue("Jo");
      expect(jobTitle.valid).toBeFalsy();
    });

    it("should be invalid when job title is more than 50 characters", () => {
      const jobTitle = component.jobForm.controls["jobTitle"];
      jobTitle.setValue(
        "Job Title that exceeds the maximum character limit of 50 characters"
      );
      expect(jobTitle.valid).toBeFalsy();
    });

    it("should be invalid when description is empty", () => {
      const description = component.jobForm.controls["description"];
      description.setValue("");
      expect(description.valid).toBeFalsy();
    });

    it("should be invalid when company is empty", () => {
      const company = component.jobForm.controls["company"];
      company.setValue("");
      expect(company.valid).toBeFalsy();
    });

    it("should be invalid when location is empty", () => {
      const location = component.jobForm.controls["location"];
      location.setValue("");
      expect(location.valid).toBeFalsy();
    });

    it("should be invalid when employment type is empty", () => {
      const employmentType = component.jobForm.controls["employmentType"];
      employmentType.setValue("");
      expect(employmentType.valid).toBeFalsy();
    });

    it("should be invalid when contact email is empty", () => {
      const contactEmail = component.jobForm.controls["contactEmail"];
      contactEmail.setValue("");
      expect(contactEmail.valid).toBeFalsy();
    });

    it("should be invalid when contact email is not in a valid format", () => {
      const contactEmail = component.jobForm.controls["contactEmail"];
      contactEmail.setValue("invalidEmail");
      expect(contactEmail.valid).toBeFalsy();
    });

    it("should be valid when all fields are filled correctly", () => {
      component.jobForm.controls["jobTitle"].setValue("Software Developer");
      component.jobForm.controls["description"].setValue("Job description");
      component.jobForm.controls["company"].setValue("ABC Company");
      component.jobForm.controls["location"].setValue("City");
      component.jobForm.controls["employmentType"].setValue("Full-time");
      component.jobForm.controls["salaryRange"].setValue("50,000 - 70,000");
      component.jobForm.controls["skillsRequired"].setValue(
        "Angular, TypeScript"
      );
      component.jobForm.controls["qualifications"].setValue(
        "Bachelor's degree in Computer Science"
      );
      component.jobForm.controls["contactEmail"].setValue("test@example.com");
      expect(component.jobForm.valid).toBeTruthy();
    });
  });
});
