import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'cs-cp-red-role-editor',
  templateUrl: './cp-red-role-editor.component.html',
  styleUrls: ['./cp-red-role-editor.component.css'],
})
export class CpRedRoleEditorComponent implements OnInit {
  @Input()
  role: any;

  constructor() {}

  ngOnInit(): void {}
}
