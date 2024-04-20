import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FireworkManagerComponent } from './firework-manager.component';

describe('FireworkManagerComponent', () => {
  let component: FireworkManagerComponent;
  let fixture: ComponentFixture<FireworkManagerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FireworkManagerComponent]
    });
    fixture = TestBed.createComponent(FireworkManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
