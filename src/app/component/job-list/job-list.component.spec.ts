import { TestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { HttpClientModule } from "@angular/common/http";
import { RouterTestingModule } from "@angular/router/testing";
import { JobService } from "../../service/job.service";
import { Job } from "../../model/job.model";

describe("JobService", () => {
  let jobService: JobService;
  let httpMock: HttpTestingController;

  const mockJobs: Job[] = [
    {
      id: 1,
      jobTitle: "Software Developer",
      description: "Job description 1",
      company: "ABC Company",
      location: "City 1",
      employmentType: "Full-time",
      salaryRange: "50,000 - 70,000",
      skillsRequired: "Angular, TypeScript",
      qualifications: "Bachelor's degree in Computer Science",
      contactEmail: "test1@example.com",
    },
    {
      id: 2,
      jobTitle: "Frontend Developer",
      description: "Job description 2",
      company: "XYZ Company",
      location: "City 2",
      employmentType: "Part-time",
      salaryRange: "30,000 - 40,000",
      skillsRequired: "React, JavaScript",
      qualifications: "Bachelor's degree in Software Engineering",
      contactEmail: "test2@example.com",
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientModule, RouterTestingModule],
      providers: [JobService],
    });
    jobService = TestBed.inject(JobService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe("functional", () => {
    it("should be created", () => {
      expect(jobService).toBeTruthy();
    });

    it("should retrieve all jobs", () => {
      jobService.getAllJobs().subscribe((jobs: Job[]) => {
        expect(jobs).toEqual(mockJobs);
      });

      const req = httpMock.expectOne(
        "http://localhost:8081/jobrecruitplatform/jobs"
      );
      expect(req.request.method).toBe("GET");
      req.flush(mockJobs);
    });

    it("should retrieve a job by ID", () => {
      const jobId = 1;
      const expectedJob = mockJobs.find((job) => job.id === jobId);

      jobService.getJobById(jobId).subscribe((job: Job) => {
        expect(job).toEqual(expectedJob);
      });

      const req = httpMock.expectOne(
        `http://localhost:8081/jobrecruitplatform/jobs/${jobId}`
      );
      expect(req.request.method).toBe("GET");
      req.flush(expectedJob!);
    });

    it("should create a new job", () => {
      const newJob: Job = {
        jobTitle: "New Job",
        description: "Job description",
        company: "New Company",
        location: "New Location",
        employmentType: "Full-time",
        salaryRange: "50,000 - 70,000",
        skillsRequired: "Angular, TypeScript",
        qualifications: "Bachelor's degree in Computer Science",
        contactEmail: "new@example.com",
        id: 0,
      };

      jobService.createJob(newJob).subscribe((createdJob: Job) => {
        expect(createdJob).toEqual(newJob);
      });

      const req = httpMock.expectOne(
        "http://localhost:8081/jobrecruitplatform/jobs"
      );
      expect(req.request.method).toBe("POST");
      req.flush(newJob);
    });

    it("should update an existing job", () => {
      const jobId = 1;
      const updatedJob: Job = {
        id: jobId,
        jobTitle: "Updated Job",
        description: "Updated Job description",
        company: "Updated Company",
        location: "Updated Location",
        employmentType: "Full-time",
        salaryRange: "50,000 - 70,000",
        skillsRequired: "Angular, TypeScript",
        qualifications: "Bachelor's degree in Computer Science",
        contactEmail: "updated@example.com",
      };

      jobService.updateJob(updatedJob.id, updatedJob).subscribe((job: Job) => {
        expect(job).toEqual(updatedJob);
      });

      const req = httpMock.expectOne(
        `http://localhost:8081/jobrecruitplatform/jobs/${jobId}`
      );
      expect(req.request.method).toBe("PUT");
      req.flush(updatedJob);
    });

    it("should delete a job", () => {
      const jobId = 1;

      jobService.deleteJob(jobId).subscribe();

      const req = httpMock.expectOne(
        `http://localhost:8081/jobrecruitplatform/jobs/${jobId}`
      );
      expect(req.request.method).toBe("DELETE");
      req.flush({});
    });
  });
});
