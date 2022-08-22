import { NrNodeDisplayNamePipe } from '../../pipes/nr-node-display-name/nr-node-display-name.pipe';
import { NrDatafortDefense } from '../../models/nr-datafort-defense';
import { NrNodeType } from '../../enums/nr-node-type';
import { NrDatafortRemote } from '../../models/nr-datafort-remote';
import { NrDatafortMu } from '../../models/nr-datafort-mu';
import { NrDatafortCodegate } from '../../models/nr-datafort-codegate';
import { NrNodeIcons } from '../../enums/nr-node-icons';
import { Coord } from '../../../../models/coord';
import { Cp2020NrDatafort } from '../../models/cp2020-nr-datafort';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Cp2020DatafortSvgBuilderService {
  constructor() {}

  private generateGrid(
    rows: number,
    columns: number,
    gridSize: number
  ): string {
    let grid = ``;
    for (let row = 0; row < rows; row++) {
      grid += `<g>`;
      for (let col = 0; col < columns; col++) {
        const x = col * gridSize;
        const y = row * gridSize;
        grid += this.createRect(
          x,
          y,
          gridSize,
          gridSize,
          'white',
          'black',
          1,
          1
        );
      }
      grid += `</g>`;
    }
    return grid;
  }

  private generateDatawalls(datawalls: Array<Coord>, gridSize: number): string {
    let result = ``;
    datawalls.forEach((datawall) => {
      result += `<g><svg x="${datawall.x * gridSize}" y="${
        datawall.y * gridSize
      }" height="${gridSize}"
          width="${gridSize}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          ${NrNodeIcons.DATAWALL}
        </svg></g>`;
    });
    return result;
  }

  private generateCodegates(
    codegates: Array<NrDatafortCodegate>,
    gridSize: number
  ): string {
    let result = ``;
    codegates.forEach((codegate) => {
      const x = codegate.coord.x * gridSize;
      const y = codegate.coord.y * gridSize;
      const textX = x + gridSize / 2;
      const textY = y + gridSize / 1.7;
      const fontSize = gridSize * 0.3;
      result += `<g><svg x="${x}" y="${y}" height="${gridSize}"
          width="${gridSize}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          ${NrNodeIcons.CODEGATE}
        </svg>
        ${this.createText(
          textX,
          textY,
          fontSize,
          'black',
          'bottom',
          'middle',
          codegate.str.toString()
        )}
        </g>`;
    });
    return result;
  }

  private generateCPUs(cpus: Array<Coord>, gridSize: number): string {
    let result = ``;
    cpus.forEach((cpu) => {
      result += `<g><svg x="${cpu.x * gridSize}" y="${
        cpu.y * gridSize
      }" height="${gridSize}"
          width="${gridSize}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          ${NrNodeIcons.CPU}
        </svg></g>`;
    });
    return result;
  }

  private generateMemory(mus: Array<Coord>, gridSize: number): string {
    let result = ``;
    mus.forEach((mu, index) => {
      const x = mu.x * gridSize;
      const y = mu.y * gridSize;
      const textX = x + gridSize / 2;
      const textY = y + gridSize / 2;
      const fontSize = gridSize * 0.5;
      result += `<g><svg x="${x}" y="${y}" height="${gridSize}"
          width="${gridSize}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          ${NrNodeIcons.MU}
        </svg>
        ${this.createText(
          textX,
          textY,
          fontSize,
          'black',
          'middle',
          'middle',
          (index + 1).toString()
        )}
        </g>`;
    });
    return result;
  }

  private generateRemotes(
    remotes: Array<NrDatafortRemote>,
    gridSize: number
  ): string {
    let result = ``;
    remotes.forEach((remote, index) => {
      const x = remote.coord.x * gridSize;
      const y = remote.coord.y * gridSize;
      const textX = x + gridSize / 2;
      const textY = y + gridSize - 2;
      const fontSize = gridSize * 0.3;
      result += `<g><svg x="${x}" y="${y}" height="${gridSize * 0.75}"
          width="${gridSize}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          ${this.getRemoteIcon(remote.type)}
        </svg>
        ${this.createText(
          textX,
          textY,
          fontSize,
          'black',
          'bottom',
          'middle',
          (index + 1).toString()
        )}
        </g>`;
    });
    return result;
  }

  private generateDefenses(
    defenses: Array<NrDatafortDefense>,
    gridSize: number
  ): string {
    let result = ``;
    defenses.forEach((defense, index) => {
      const x = defense.coord.x * gridSize;
      const y = defense.coord.y * gridSize;
      const textX = x + gridSize / 2;
      const textY = y + gridSize - 2;
      const fontSize = gridSize * 0.3;
      result += `<svg x="${x}" y="${y}" height="${gridSize * 0.75}"
          width="${gridSize}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          ${NrNodeIcons.PROGRAM}
        </svg>
        ${this.createText(
          textX,
          textY,
          fontSize,
          'black',
          'bottom',
          'middle',
          (index + 1).toString()
        )}`;
    });
    return result;
  }

  private generateDataLine(x: number, y: number, text: string): string {
    const fontSize = 14;
    return this.createText(x, y, fontSize, 'black', 'bottom', 'left', text);
  }

  generate(
    datafort: Cp2020NrDatafort,
    gridSize: number,
    includeData?: boolean
  ): string {
    const width = datafort.columns * gridSize;
    const height = datafort.rows * gridSize;
    let contents = this.generateGrid(datafort.rows, datafort.columns, gridSize);
    contents += this.generateDatawalls(datafort.datawallNodes, gridSize);
    contents += this.generateCodegates(datafort.codegates, gridSize);
    contents += this.generateCPUs(datafort.cpuNodes, gridSize);
    contents += this.generateMemory(datafort.muNodes, gridSize);
    contents += this.generateRemotes(datafort.remotes, gridSize);
    contents += this.generateDefenses(datafort.defenses, gridSize);
    const lineSize = 20;
    let line = height + lineSize;
    if (includeData) {
      contents += this.generateDataLine(
        gridSize,
        line,
        `NAME: ${datafort.name}`
      );
      line += lineSize;
      contents += this.generateDataLine(
        gridSize,
        line,
        `CPUs: ${datafort.cpu}    INT: ${datafort.int}    MUs: ${datafort.muUsed}/${datafort.muAvailable}`
      );
      line += lineSize;
      contents += this.generateDataLine(
        gridSize,
        line,
        `DATAWALL STR: ${datafort.datawallStr}    CODEGATE STR are marked on icon`
      );
      line += lineSize;
      contents += this.generateDataLine(gridSize, line, `SKILLS:`);
      line += lineSize;
      datafort.skills.forEach((skill) => {
        contents += this.generateDataLine(
          gridSize * 2,
          line,
          `${skill.key}  +${skill.value}`
        );
        line += lineSize;
      });
      contents += this.generateDataLine(gridSize, line, `REMOTES:`);
      line += lineSize;
      datafort.remotes.forEach((remote, index) => {
        const displayName = new NrNodeDisplayNamePipe();
        contents += this.generateDataLine(
          gridSize * 2,
          line,
          `${index + 1}.  ${remote.name}  (${displayName.transform(
            remote.type
          )})`
        );
        line += lineSize;
      });
      contents += this.generateDataLine(gridSize, line, `DEFENSES:`);
      line += lineSize;
      datafort.defenses.forEach((defense, index) => {
        contents += this.generateDataLine(
          gridSize * 2,
          line,
          `${index + 1}.  ${defense.program.name}  (${
            defense.program.class.name
          }  STR: ${defense.program.strength})`
        );
        line += lineSize;
      });

      contents += this.generateDataLine(gridSize, line, `NOTES:`);
      line += lineSize;
      const wrapwidth = Math.floor((width - 2 * gridSize) / 6);
      const wrap = (s, width) =>
        s.replace(
          new RegExp(`(?![^\\n]{1,${width}}$)([^\\n]{1,${width}})\\s`, 'g'),
          '$1???'
        );
      const temp = wrap(datafort.notes, wrapwidth);
      const note: Array<string> = temp.split('???');
      note.forEach((n) => {
        contents += this.generateDataLine(gridSize, line, `${n}`);
        line += lineSize;
      });
      line += lineSize;
    }

    let svg = `<svg id="datafort-cp2020" width="${width}" height="${line}" viewBox="'0 0 ${width} ${line}" enable-background="new 0 0 ${width} ${line}" xmlns="http://www.w3.org/2000/svg">
                <rect x="0" y="0" fill="white" width="${width}" height="${line}"/>
                ${contents}
              </svg>`;
    return svg;
  }

  private createRect(
    x: number,
    y: number,
    height: number,
    width: number,
    fill: string,
    stroke: string,
    strokeWidth: number,
    fillOpacity: number
  ): string {
    return `<rect x="${x}" y="${y}" height="${height}" width="${width}" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}" fill-opacity="${fillOpacity}" ></rect>`;
  }

  private createText(
    x: number,
    y: number,
    fontSize: number,
    fill: string,
    baseline: string,
    anchor: string,
    text: string
  ): string {
    return ` <text x="${x}" y="${y}" style="font-size: ${fontSize}px;" fill="${fill}" dominant-baseline="${baseline}"
    text-anchor="${anchor}">${text}</text>`;
  }

  private getRemoteIcon(type: NrNodeType): string {
    switch (type) {
      case NrNodeType.ALARM:
        return NrNodeIcons.ALARM;
      case NrNodeType.AUTOFACTORY:
        return NrNodeIcons.AUTOFACTORY;
      case NrNodeType.DOOR:
        return NrNodeIcons.DOOR;
      case NrNodeType.ELEVATOR:
        return NrNodeIcons.ELEVATOR;
      case NrNodeType.TERMINAL:
        return NrNodeIcons.TERMINAL;
      case NrNodeType.LDL:
        return NrNodeIcons.LDL;
      case NrNodeType.CAMERA:
        return NrNodeIcons.CAMERA;
      case NrNodeType.MICROPHONE:
        return NrNodeIcons.MICROPHONE;
      case NrNodeType.VIDEO:
        return NrNodeIcons.VIDEO;
      case NrNodeType.HOLODISPLAY:
        return NrNodeIcons.HOLODISPLAY;
      case NrNodeType.PRINTER:
        return NrNodeIcons.PRINTER;
      case NrNodeType.MANIPULATOR:
        return NrNodeIcons.MANIPULATOR;
      case NrNodeType.VEHICLE:
        return NrNodeIcons.VEHICLE;
      default:
        return '';
    }
  }
}
