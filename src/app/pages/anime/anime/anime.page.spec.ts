import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimePage } from './anime.page';

describe('AnimePage', () => {
  let component: AnimePage;
  let fixture: ComponentFixture<AnimePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
