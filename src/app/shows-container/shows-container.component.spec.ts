import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowsContainerComponent } from './shows-container.component';

describe('ShowsContainerComponent', () => {
	let component: ShowsContainerComponent;
	let fixture: ComponentFixture<ShowsContainerComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ShowsContainerComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(ShowsContainerComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
