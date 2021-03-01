import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DemoService, ActionList, Action } from 'prx-client-lib';
import { delay, map, switchMap, take, tap } from 'rxjs/operators';

@Component({
  selector: 'action-list',
  templateUrl: './action-list.component.html',
  styleUrls: ['./action-list.component.css']
})
export class ActionListComponent implements OnInit {

  _projectref = 0;
  newAction: boolean = false;
  

  @Input()
  public get projectref() {
    return this._projectref;
  }

  public set projectref(pid: number) {
    this._projectref = pid;
    this.reload$.next(true);
  }

  reload$ = new BehaviorSubject(true);
  actions$: Observable<ActionList>;

  constructor(private demoService: DemoService) {
    // noop
  }

  ngOnInit(): void {
    this.actions$ = this.reload$.pipe(
      switchMap(() => this.demoService.listActions(this._projectref)),
      tap(() => console.log)
    );
  }

  addAction(){
    this.newAction = true;
  }

  
  finishAddAction(save: Action) {
    if (save == null) {
      this.newAction = false;
    } else {
      this.demoService.addAction( this._projectref,save).pipe(delay(500), take(1)).subscribe((ret) => {
        this.reload$.next(true);
        this.newAction = false;
      });
    }
  }
}
