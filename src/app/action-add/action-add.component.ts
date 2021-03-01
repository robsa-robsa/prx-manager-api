import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Action } from 'prx-client-lib';

@Component({
  selector: 'action-add',
  templateUrl: './action-add.component.html',
  styleUrls: ['./action-add.component.css']
})
export class ActionAddComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public action: Action = { name: 'do something', time: new Date().toISOString() };
  public readonly = false;

  @Output()
  public choosen = new EventEmitter<Action>();


  clear() {
    this.choosen.next(null);
  }

  submit() {
    this.readonly = true;
    this.choosen.next(this.action);
  }
}
