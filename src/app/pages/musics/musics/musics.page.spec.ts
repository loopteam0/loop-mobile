import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicsPage } from './musics.page';

describe('MusicsPage', () => {
  let component: MusicsPage;
  let fixture: ComponentFixture<MusicsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MusicsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
