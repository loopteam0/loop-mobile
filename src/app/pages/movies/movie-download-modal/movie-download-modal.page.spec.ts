import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDownloadModalPage } from './movie-download-modal.page';

describe('MovieDownloadModalPage', () => {
  let component: MovieDownloadModalPage;
  let fixture: ComponentFixture<MovieDownloadModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieDownloadModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieDownloadModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
