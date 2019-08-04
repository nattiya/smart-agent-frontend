import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortDescription'
})
export class ShortDescriptionPipe implements PipeTransform {

  transform(url: string, args?: any): any {
    if (url) {
      const len = url.length;
      if (len > 30) // only shorten if greater than 30
        // change value 21 and 9 as per requirement
        return url.substr(0, 400) + '...';
      return url;
    }
    return url;
  }

}
