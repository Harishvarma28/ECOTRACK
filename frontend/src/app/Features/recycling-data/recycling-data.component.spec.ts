import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecyclingDataComponent } from './recycling-data.component';

describe('RecyclingDataComponent', () => {
  let component: RecyclingDataComponent;
  let fixture: ComponentFixture<RecyclingDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecyclingDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecyclingDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
