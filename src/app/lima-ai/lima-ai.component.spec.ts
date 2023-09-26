import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LimaAiComponent } from './lima-ai.component';

describe('LimaAiComponent', () => {
  let component: LimaAiComponent;
  let fixture: ComponentFixture<LimaAiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LimaAiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LimaAiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
