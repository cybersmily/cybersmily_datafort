import { faSkullCrossbones, faCogs, faFile, faLock } from '@fortawesome/free-solid-svg-icons';
import { CPRedNetArchNode } from './../models/net-arch-node';
import { Component, Input, OnInit, OnChanges, Output, EventEmitter } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'cs-net-arch-diagram',
  templateUrl: './net-arch-diagram.component.html',
  styleUrls: ['./net-arch-diagram.component.css']
})
export class NetArchDiagramComponent implements OnInit, OnChanges {
  faSkullCrossbones = faSkullCrossbones;
  faCogs = faCogs;
  faFile = faFile;
  faLock = faLock;

  @Input()
  arch: CPRedNetArchNode = new CPRedNetArchNode();

  @Output()
  updateSVG: EventEmitter<string> = new EventEmitter<string>();

  diagram: string = '';
  svg: SafeHtml = '';

  level = 3;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.createDiagram();
  }

  ngOnChanges(): void {
    this.createDiagram();
  }

  createDiagram() {
    if (this.arch && this.arch.branch.length > 0) {
      this.diagram = this.createNode(this.arch, 50, 25);
      const result = `
      <svg style="width:100%;" height="${this.level * 100}">
        <g>
        ${this.diagram}
        </g>
      </svg>`;
      this.svg = this.sanitizer.bypassSecurityTrustHtml(result);
      this.updateSVG.emit(result);
    };
  }

  createNode(node: CPRedNetArchNode, x: number, offset: number): string {
    this.level = (node.level < this.level) ? this.level : node.level;
    let circle = this.drawCircle(x, (node.level * 70), 16,  node.color);
    circle += this.drawCircle(x, (node.level * 70), 14, node.bgColor);

    circle += this.drawIcon(x, (node.level * 70), node.color, node.type);
    if (node.branch && node.branch.length === 1) {
      circle += `<line x1="${x}%" y1="${(node.level * 70) + 15}" x2="${x}%" y2="${(node.level * 70) + 55}" style="stroke: rgb(0, 0, 0);stroke-width: 2;"></line>`;
      circle += this.createNode(node.branch[0], x, offset);
    }
    if (node.branch && node.branch.length === 2) {
      circle += this.drawLine(x, (node.level * 70) + 15, x, (node.level * 70) + 30);
      circle += this.drawLine((x - offset), (node.level * 70) + 30, (x + offset), (node.level * 70) + 30);
      circle += this.drawLine((x - offset), (node.level * 70) + 30, (x - offset), (node.level * 70) + 55);
      circle += this.drawLine((x + offset), (node.level * 70) + 30, (x + offset), (node.level * 70) + 55);
      circle += this.createNode(node.branch[0], (x - offset), (offset / 2));
      circle += this.createNode(node.branch[1], (x + offset), (offset / 2));
    }
    circle += this.drawCircle(x, (node.level * 70) - 25, 9, '#ffffff', 'z-index:100');
    circle += this.drawText(x, (node.level * 70) - 21, node.id, 'smaller', 'z-index:101');
    return circle;
  }

  drawLine(x1: number, y1: number, x2: number, y2: number): string {
    return `<line x1="${x1}%" y1="${y1}" x2="${x2}%" y2="${y2}" style="stroke: rgb(0, 0, 0);stroke-width: 2;"></line>`;
  }

  drawCircle(x: number, y: number, r: number, fill: string, style?: string): string {
    return `<circle cx='${x}%' cy='${y}' r='${r}' fill='${fill}' ${style ? 'style=\'' + style + '\'' : ''}'></circle>`;
  }

  drawIcon(x: number, y: number, fill: string, type: string): string {
    return `<g transform='translate(-6,-8)'><svg x='${x}%' y='${y}'><g>
  <path transform='scale(0.03)'
   fill="${fill}"
   d="${this.getIcon(type)}"
   class="csd-net-icon"
   >
  </path>
  </g></svg></g>`;
  }

  drawText(x: number, y: number, text: string, size: string, style?: string) : string {
    return `<g transform='translate(-4,0)'>
      <text x='${x}%' y='${y}' font-size="${size}" ${style? 'style=\'' + style + '\'': ''}>${text}</text>
    </g>`;
  }

  private getIcon(type: string) {
    switch (type) {
      case 'file':
        return this.faFile.icon[4];
      case 'controller':
        return this.faCogs.icon[4];
      case 'program':
        return this.faSkullCrossbones.icon[4];
    }
    return this.faLock.icon[4];
  }

}
