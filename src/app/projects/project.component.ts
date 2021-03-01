import { Component,EventEmitter, Input, Output } from '@angular/core';
import { Project } from 'prx-client-lib';

@Component({
  selector: 'project-list',
  templateUrl: './project.component.html',
  styles: ['./project.component.less']
})
export class ProjectComponent {
  @Input() 
  public project: Project;

  @Output()
  public delete = new EventEmitter<Project>();


  @Input() 
  public active: boolean;

  deleteProject(){
    this.delete.next(this.project);
  }
}
