import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'validation',
  standalone: true
})
export class ValidationPipe implements PipeTransform {

  transform(validationObject: any, formErrors: Object): string {
    return (formErrors) ? validationObject[Object.keys(formErrors)[0]] : '';
  }

}
