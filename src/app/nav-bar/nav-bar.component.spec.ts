import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MaterialModule } from '../shared/material.module';

import { NavBarComponent } from './nav-bar.component';

describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavBarComponent],
      imports: [MaterialModule],
    }).compileComponents();

    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check menuItems array is initialized', () => {
    expect(component.menuItems).toEqual([
      { name: 'Home' },
      { name: 'Gallery' },
      { name: 'About Us' },
      { name: 'Contact Us' },
    ]);
  });

  it('should check menuItem is rendered', () => {
    const menuItems = fixture.debugElement.queryAll(By.css('.menu-item'));
    expect(menuItems.length).toBe(0);
  });
});
