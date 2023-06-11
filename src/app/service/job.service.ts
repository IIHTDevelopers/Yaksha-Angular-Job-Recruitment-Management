import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Job } from "../model/job.model";

@Injectable({
  providedIn: "root",
})
export class JobService {
  private baseUrl = "http://localhost:8081/jobrecruitplatform/jobs";

  constructor(private http: HttpClient) {}

  createJob(job: Job): Observable<Job> {
    return this.http.post<Job>(this.baseUrl, job);
  }

  getJobById(id: number): Observable<Job> {
    return this.http.get<Job>(`${this.baseUrl}/${id}`);
  }

  searchJobsByTitle(jobTitle: string): Observable<Job[]> {
    return this.http.get<Job[]>(
      `${this.baseUrl}/search/title?jobTitle=${jobTitle}`
    );
  }

  searchJobsByCompany(company: string): Observable<Job[]> {
    return this.http.get<Job[]>(
      `${this.baseUrl}/search/company?company=${company}`
    );
  }

  searchJobsByLocation(location: string): Observable<Job[]> {
    return this.http.get<Job[]>(
      `${this.baseUrl}/search/location?location=${location}`
    );
  }

  getAllJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(this.baseUrl);
  }

  updateJob(id: number, job: Job): Observable<Job> {
    return this.http.put<Job>(`${this.baseUrl}/${id}`, job);
  }

  deleteJob(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
