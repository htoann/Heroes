import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyHeroesComponent } from './my-heroes.component';

describe('MyHeroesComponent', () => {
  let component: MyHeroesComponent;
  let fixture: ComponentFixture<MyHeroesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyHeroesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyHeroesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
