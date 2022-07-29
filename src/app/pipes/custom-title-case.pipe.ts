import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'customTitleCase',
})
export class CustomTitleCasePipe implements PipeTransform {
	transform(value: string): string {
		let words: Array<string> = value.split(' ');

		let newWords: Array<string> = [];

		words.forEach((word) => {
			newWords.push(word.charAt(0).toUpperCase() + word.slice(1));
		});

		let newString = newWords.join(' ');

		return newString;
	}
}
