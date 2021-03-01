import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Project } from 'prx-client-lib';

@Component({
  selector: 'project-add',
  templateUrl: './project-add.component.html',
  styles: ['./project-add.component.less']
})
export class ProjectAddComponent {

  public project: Project = { name: 'new Project' };
  public readonly = false;

  @Output()
  public choosen = new EventEmitter<Project>();


  clear() {
    this.choosen.next(null);
  }

  submit() {
    this.readonly = true;
    this.choosen.next(this.project);
  }
}
