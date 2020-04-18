import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "searchHighlight",
})
export class SearchHighlightPipe implements PipeTransform {
  transform(text: String, search): String {
    if (search != "") {
      var pattern = search.replace(
        /[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,
        "\\$&"
      );
      pattern = pattern
        .split(" ")
        .filter((t) => {
          return t.length > 0;
        })
        .join("|");
      var regex = new RegExp(pattern, "gi");

      return search
        ? text.replace(
            regex,
            (match) => `<span class="highlight">${match}</span>`
          )
        : text;
    }else{
      return null;
    }
  }
}
