import { NRMap } from './../models/nr-map';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { NrMapGridService } from './nr-map-grid.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('NrMapGridService', () => {
  let service: NrMapGridService;
  let nrMap: NRMap;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [NrMapGridService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    service = new NrMapGridService();
    nrMap = new NRMap();
    nrMap.ny = 5; // rows
    nrMap.nx = 5; // columns
    nrMap.gridsize = 5;
    nrMap.offsety = 1;
    nrMap.offsetx = 1;
    nrMap.ly = 2;
    nrMap.lx = 2;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize', () => {
    service.initialize(nrMap);
    expect(service['dimensions'].rows).toEqual(nrMap.ny);
    expect(service['dimensions'].columns).toEqual(nrMap.nx);
    expect(service['dimensions'].gridsize).toEqual(nrMap.gridsize);
    expect(service['dimensions'].rowOffset).toEqual(nrMap.offsety);
    expect(service['dimensions'].columnOffset).toEqual(nrMap.offsetx);
    expect(service['dimensions'].rowLast).toEqual(nrMap.ly);
    expect(service['dimensions'].columnLast).toEqual(nrMap.lx);
  });

  it('should create grid', (done) => {
    service.initialize(nrMap);
    service.currGrid.subscribe( grid => {
      expect(grid).toBeTruthy();
      expect(grid.length).toEqual(5);
      expect(grid[3].cells.length).toEqual(5);
      done();
    });
  });

  describe('VisitCell', () => {
    beforeEach(() => {
      service.initialize(nrMap);
      service.visitCell(3, 2, true, false, 0);
    });

    it('should visit cell', (done) => {
      service.selectedCell.subscribe( cell => {
        expect(cell).toBeTruthy();
        expect(cell.column).toEqual(2);
        expect(cell.row).toEqual(3);
        expect(cell.hasVisited).toEqual(true);
        expect(cell.selectable).toEqual(true);
        expect(cell.selected).toEqual(true);
        expect(cell.height).toEqual(5);
        expect(cell.width).toEqual(5);
        done();
      });
    });

    it('should reset map if first visit cell is selected', (done) => {
      service.visitCell(3, 2, true, false, 0);
      service.selectedCell.subscribe( cell => {
        expect(cell).toBeTruthy();
        expect(cell.column).toEqual(-1);
        expect(cell.row).toEqual(-1);
        expect(cell.hasVisited).toEqual(false);
        expect(cell.selectable).toBeUndefined();
        expect(cell.selected).toBeUndefined();
        expect(cell.height).toEqual(0);
        expect(cell.width).toEqual(0);
        done();
      });
    });

    it('should unmark visit cell', (done) => {
      service.visitCell(3, 3, true, false, 0);
      service.visitCell(3, 4, true, false, 0);
      service.visitCell(3, 4, true, false, 0);
      service.selectedCell.subscribe( cell => {
        expect(cell).toBeTruthy();
        expect(cell.column).toEqual(3);
        expect(cell.row).toEqual(3);
        expect(cell.selected).toEqual(true);
        expect(cell.hasVisited).toEqual(true);
        expect(cell.selectable).toEqual(true);
        done();
      });
    });
  });

  it('should set selectables', (done) => {
    service.initialize(nrMap);
    service.currGrid.subscribe( grid => {
      const result = service.setSelectables(grid, 2, 2, true);
      expect(result[1].cells[2].selectable).toEqual(true);
      expect(result[2].cells[1].selectable).toEqual(true);
      expect(result[2].cells[3].selectable).toEqual(true);
      expect(result[3].cells[2].selectable).toEqual(true);
      done();
    });
  });

  it('should check if grid is selected', () => {
    service.initialize(nrMap);
    expect(service.isGridSelected()).toEqual(false);
    service.visitCell(3, 2, true, false, 0);
    expect(service.isGridSelected()).toEqual(true);
  });

  it('should reset map clear grid', (done) => {
    service.initialize(nrMap);
    service.resetMaps();
    service.currGrid.subscribe( grid => {
      expect(grid.length).toEqual(0);
      done();
    });
  });

  it('should reset map clear selected cell', (done) => {
    service.initialize(nrMap);
    service.resetMaps();
    service.selectedCell.subscribe( cell => {
      expect(cell.hasVisited).toEqual(false);
      expect(cell.row).toEqual(-1);
      expect(cell.column).toEqual(-1);
      expect(cell.width).toEqual(0);
      expect(cell.height).toEqual(0);
      done();
    });
  });

});
