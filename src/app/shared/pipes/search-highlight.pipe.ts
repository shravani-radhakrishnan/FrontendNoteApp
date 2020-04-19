import { Pipe, PipeTransform } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

@Pipe({
  name: "searchHighlight",
})
export class SearchHighlightPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(items: any[], searchText: string, fieldName: string): any[] {
    if (!items) { return []; }

    // return the original array if search text is empty
    if (!searchText) { return items; }

    // convert the searchText to lower case
    searchText = searchText.toLowerCase();

    // retrun the filtered array
    return items.filter(item => {
      if (item && item[fieldName]) {
        return item[fieldName].toLowerCase().includes(searchText);
      }
      return false;
    });
  }

  // transform(value: any, args: any): any {
  //   console.log(value,args)
  //   if (!args) {
  //     return value;
  //   }
  //   const re = new RegExp(args, 'gi');
  //   const match = value.match(re);
  //   if (!match) {
  //     return value;
  //   }
  //   console.log(value);
  // return value
  //       ? value.replace(
  //           re,
  //           (match) => `${match}`
  //         )
  //       : value;
  // const replacedValue = value.replace(re, "<mark>" + match[0] + "</mark>")
  // return this.sanitizer.bypassSecurityTrustHtml(replacedValue)
  // }
}
