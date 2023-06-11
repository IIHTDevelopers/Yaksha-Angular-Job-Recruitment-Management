import { Component, OnInit } from "@angular/core";
import { JobService } from "../../service/job.service";
import { Job } from "../../model/job.model";
import { Router } from "@angular/router";

@Component({
  selector: "app-job-list",
  templateUrl: "./job-list.component.html",
  styleUrls: ["./job-list.component.css"],
})
export class JobListComponent implements OnInit {
  jobs: Job[];

  constructor(private jobService: JobService, private router: Router) {}

  ngOnInit(): void {
    this.loadJobs();
  }

  loadJobs(): void {
    this.jobService.getAllJobs().subscribe(
      (jobs) => {
        this.jobs = jobs;
      },
      (error) => {
        console.log("Error retrieving jobs:", error);
      }
    );
  }

  onDeleteJob(id: number): void {
    if (confirm("Are you sure you want to delete this job?")) {
      this.jobService.deleteJob(id).subscribe(
        () => {
          console.log("Job deleted successfully");
          // Reload jobs after deletion
          this.loadJobs();
        },
        (error) => {
          console.log("Error deleting job:", error);
        }
      );
    }
  }

  onEditJob(id: number): void {
    this.router.navigate(["/jobs", id]);
  }
}
