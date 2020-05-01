import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FashionSelectorComponent } from './fashion-selector.component';
import { FormsModule } from '@angular/forms';
import { FashionInputComponent } from '../fashion-input/fashion-input.component';

describe('FashionSelectorComponent', () => {
  let component: FashionSelectorComponent;
  let fixture: ComponentFixture<FashionSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FashionSelectorComponent
      ],
      imports: [
        FormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FashionSelectorComponent);
    component = fixture.componentInstance;
    component.label = 'test';
    component.data = [
      {name: 'test1', mod: 2},
      {name: 'test2', mod: 1}
    ];
    component.isRequired = false;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should emit selected Option', (done) => {
    component.currSelection = { name: 'test', mod: 1};
    component.selectOption.subscribe( g => {
      expect(g.name).toEqual('test');
      expect(g.mod).toEqual(1);
      done();
    });
    component.onChange(null);
  });
});
