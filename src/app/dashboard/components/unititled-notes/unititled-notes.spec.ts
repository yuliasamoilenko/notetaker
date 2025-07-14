import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnititledNotes } from './unititled-notes';

describe('UnititledNotes', () => {
  let component: UnititledNotes;
  let fixture: ComponentFixture<UnititledNotes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnititledNotes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnititledNotes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
