import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimeDownloadModalPage } from './anime-download-modal.page';

describe('AnimeDownloadModalPage', () => {
  let component: AnimeDownloadModalPage;
  let fixture: ComponentFixture<AnimeDownloadModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimeDownloadModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimeDownloadModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
