import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopRatedShowsComponent } from './top-rated-shows.component';

describe('TopRatedShowsComponent', () => {
	let component: TopRatedShowsComponent;
	let fixture: ComponentFixture<TopRatedShowsComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [TopRatedShowsComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(TopRatedShowsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
