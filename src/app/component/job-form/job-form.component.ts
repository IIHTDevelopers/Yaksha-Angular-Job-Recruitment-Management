import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { JobService } from "../../service/job.service";
import { Job } from "../../model/job.model";

@Component({
  selector: "app-job-form",
  templateUrl: "./job-form.component.html",
  styleUrls: ["./job-form.component.css"],
})
export class JobFormComponent implements OnInit {
  jobForm!: FormGroup;
  isEditMode: boolean = false;
  jobId!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private jobService: JobService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initJobForm();
    this.route.paramMap.subscribe((params) => {
      if (params.has("id")) {
        this.isEditMode = true;
        this.jobId = +params.get("id")!;
        this.loadJob(this.jobId);
      }
    });
  }

  initJobForm(): void {
    this.jobForm = this.fb.group({
      jobTitle: [
        "",
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      description: ["", Validators.required],
      company: ["", Validators.required],
      location: ["", Validators.required],
      employmentType: ["", Validators.required],
      salaryRange: [""],
      skillsRequired: [""],
      qualifications: [""],
      contactEmail: ["", [Validators.required, Validators.email]],
    });
  }

  loadJob(id: number): void {
    this.jobService.getJobById(id).subscribe(
      (job) => {
        this.jobForm.patchValue(job);
      },
      (error) => {
        console.log("Error retrieving job:", error);
      }
    );
  }

  onSubmit(): void {
    if (this.jobForm.invalid) {
      return;
    }

    const job: Job = this.jobForm.value;

    if (this.isEditMode) {
      this.jobService.updateJob(this.jobId, job).subscribe(
        (updatedJob) => {
          console.log("Job updated successfully:", updatedJob);
          // Reset form after successful update
          this.jobForm.reset();
        },
        (error) => {
          console.log("Error updating job:", error);
        }
      );
    } else {
      this.jobService.createJob(job).subscribe(
        (createdJob) => {
          console.log("Job created successfully:", createdJob);
          // Reset form after successful creation
          this.jobForm.reset();
        },
        (error) => {
          console.log("Error creating job:", error);
        }
      );
    }
    this.router.navigate(["/jobs"]);
  }
}
