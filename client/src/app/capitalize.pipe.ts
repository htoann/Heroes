import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {

  transform(value: string): string {
    if (!value) {
      return value;
    }

    // Create a function to capitalize the first letter of each word
    const capitalizeWord = (word: string) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }

    // Split the input text into words and capitalize each word
    const words = value.split(' ');
    const capitalizedWords = words.map(capitalizeWord);

    // Join the capitalized words back together into a single string
    return capitalizedWords.join(' ');
  }

}
