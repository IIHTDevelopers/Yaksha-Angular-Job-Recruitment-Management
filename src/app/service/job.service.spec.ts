import { TestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { JobService } from "./job.service";
import { Job } from "../model/job.model";

describe("JobService", () => {
  let service: JobService;
  let httpMock: HttpTestingController;

  const apiUrl = "http://localhost:8081/jobrecruitplatform/jobs";

  const mockJob: Job = {
    id: 1,
    jobTitle: "Software Developer",
    description: "Job description",
    company: "ABC Company",
    location: "City 1",
    employmentType: "Full-time",
    salaryRange: "50,000 - 70,000",
    skillsRequired: "Angular, TypeScript",
    qualifications: "Bachelor's degree in Computer Science",
    contactEmail: "test@example.com",
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [JobService],
    });

    service = TestBed.inject(JobService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe("business", () => {
    it("should be created", () => {
      expect(service).toBeTruthy();
    });

    it("should retrieve all jobs", () => {
      const mockJobs: Job[] = [mockJob];

      service.getAllJobs().subscribe((jobs) => {
        expect(jobs).toEqual(mockJobs);
      });

      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe("GET");
      req.flush(mockJobs);
    });

    it("should retrieve a job by ID", () => {
      const jobId = 1;

      service.getJobById(jobId).subscribe((job) => {
        expect(job).toEqual(mockJob);
      });

      const req = httpMock.expectOne(`${apiUrl}/${jobId}`);
      expect(req.request.method).toBe("GET");
      req.flush(mockJob);
    });

    it("should create a new job", () => {
      const newJob: Job = {
        jobTitle: "New Job",
        description: "New job description",
        company: "XYZ Company",
        location: "City 2",
        employmentType: "Full-time",
        contactEmail: "newjob@example.com",
        id: 0,
        salaryRange: "",
        skillsRequired: "",
        qualifications: "",
      };

      service.createJob(newJob).subscribe((job) => {
        expect(job).toEqual(mockJob);
      });

      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe("POST");
      expect(req.request.body).toEqual(newJob);
      req.flush(mockJob);
    });

    it("should update an existing job", () => {
      const updatedJob: Job = {
        id: 1,
        jobTitle: "Updated Job",
        description: "Updated job description",
        company: "Updated Company",
        location: "Updated Location",
        employmentType: "Part-time",
        contactEmail: "updatedjob@example.com",
        salaryRange: "",
        skillsRequired: "",
        qualifications: "",
      };

      service.updateJob(updatedJob.id, updatedJob).subscribe((job) => {
        expect(job).toEqual(updatedJob);
      });

      const req = httpMock.expectOne(`${apiUrl}/${updatedJob.id}`);
      expect(req.request.method).toBe("PUT");
      expect(req.request.body).toEqual(updatedJob);
      req.flush(updatedJob);
    });

    it("should delete an existing job", () => {
      const jobIdToDelete = 1;

      service.deleteJob(jobIdToDelete).subscribe(() => {
        expect(true).toBeTruthy();
      });

      const req = httpMock.expectOne(`${apiUrl}/${jobIdToDelete}`);
      expect(req.request.method).toBe("DELETE");
      req.flush({});
    });
  });
});
