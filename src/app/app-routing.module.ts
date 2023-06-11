import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { JobListComponent } from "./component/job-list/job-list.component";
import { JobFormComponent } from "./component/job-form/job-form.component";

const routes: Routes = [
  { path: "", redirectTo: "/jobs", pathMatch: "full" },
  { path: "jobs", component: JobListComponent },
  { path: "jobs/new", component: JobFormComponent },
  { path: "jobs/:id", component: JobFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
