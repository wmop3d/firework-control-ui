import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LauncherNodeCardComponent } from './launcher-node-card.component';

describe('LauncherNodeCardComponent', () => {
  let component: LauncherNodeCardComponent;
  let fixture: ComponentFixture<LauncherNodeCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LauncherNodeCardComponent]
    });
    fixture = TestBed.createComponent(LauncherNodeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
