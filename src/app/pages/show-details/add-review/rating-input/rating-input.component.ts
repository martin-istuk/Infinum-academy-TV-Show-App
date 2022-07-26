import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
	selector: 'app-rating-input',
	templateUrl: './rating-input.component.html',
	styleUrls: ['./rating-input.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => RatingInputComponent),
			multi: true,
		},
	],
})
export class RatingInputComponent implements ControlValueAccessor {
	public rating: number = 0;
	public hoverIndex: number = 0;

	get value(): number {
		return this.rating;
	}

	writeValue(addedRating: number): void {
		this.onChange(addedRating);
		this.rating = Number(addedRating);
		this.stopHover();
	}

	onChange = (rating: number) => {};
	registerOnChange(fn: (rating: number) => void): void {
		this.onChange = fn;
	}

	onTouched = () => {};
	registerOnTouched(fn: () => void): void {
		this.onTouched = fn;
	}

	onHover(index: number): void {
		this.hoverIndex = index;
		console.log(this.hoverIndex);
	}

	stopHover(): void {
		this.hoverIndex = 0;
		console.log(this.hoverIndex);
	}
}
