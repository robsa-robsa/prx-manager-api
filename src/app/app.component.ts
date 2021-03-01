import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, switchMap, take, map, tap, catchError } from 'rxjs/operators';
import { DemoService, ProjectList, Project } from 'prx-client-lib';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'prx-app';
  projects$: Observable<ProjectList>;
  filter: string = "";
  selectedId = 0;
  newProject: boolean = false;
  reload$ = new BehaviorSubject(true);
  backendError = false;

  constructor(private demoService: DemoService) {
    // noop
  }
  ngOnInit(): void {
    this.projects$ = this.reload$.pipe(
      switchMap(() => this.demoService.listProjects()),
      map((pro) => {
        const filtered = pro.list.filter((p) => this.filter == null || p.name.includes(this.filter));
        console.log(filtered);
        return { list: filtered };
      }),
      catchError(() => {
        this.backendError = true;
        return of({list:[]});
      })
    );
  }

  initFilter(data) {
    this.filter = data.filter;
    this.reload$.next(true);
  }

  setSelected(id: number) {
    console.log("sd");
    this.selectedId = id;
  }

  addProject() {
    this.newProject = true;
  }

  deleteProject(project) {
    this.demoService.deleteProject(project.id).pipe(delay(500), take(1)).subscribe((ret) => {
        this.selectedId = 0;
        this.newProject = false;
        this.reload$.next(true);
        alert("delete successful!");
      });
  }

  

  finishAddProject(save: Project) {
    if (save == null) {
      this.newProject = false;
    } else {
      this.demoService.addProject(save).pipe(delay(500), take(1)).subscribe((ret) => {
        this.reload$.next(true);
        this.newProject = false;
      });
    }
  }


}
