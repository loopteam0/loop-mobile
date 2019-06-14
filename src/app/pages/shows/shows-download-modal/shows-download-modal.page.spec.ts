import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowsDownloadModalPage } from './shows-download-modal.page';

describe('ShowsDownloadModalPage', () => {
  let component: ShowsDownloadModalPage;
  let fixture: ComponentFixture<ShowsDownloadModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowsDownloadModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowsDownloadModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
