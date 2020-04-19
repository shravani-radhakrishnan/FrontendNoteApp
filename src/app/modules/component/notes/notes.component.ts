import { Component, OnInit } from "@angular/core";
import { NotesService } from "../../../shared/services/notes.service";
import { ActivatedRoute } from "@angular/router";
import { Note } from "src/app/shared/interface/note";
import { StorageService } from "src/app/core/services/storage.service";
import { AppDataService } from "src/app/shared/services/app-data.service";
import { SearchHighlightPipe } from 'src/app/shared/pipes/search-highlight.pipe';

@Component({
  selector: "app-notes",
  templateUrl: "./notes.component.html",
  styleUrls: ["./notes.component.scss"],
})
export class NotesComponent implements OnInit {
  note: Note;
  activeIndex :number;
  displayDescription: boolean = false;
  noteStorage;
  notesList: any;
  searchText:string;
  checked:boolean;
  constructor(
    public notesService: NotesService,
    private storageService: StorageService,
    private appData: AppDataService,
  ) {
    this.appData.updateNotes.subscribe((data) => {
      if (data) {
        this.notesList = data;
        if(this.notesList.length < 0){
          this.displayDescription = false;
        }
      } else {
        this.noteStorage = this.storageService.getItem("notes");
        this.notesList = this.noteStorage;
      }
    });
  }
  ngOnInit(): void {
    this.notesList = this.storageService.getItem("notes");
  }

  // loadAllNotes() {
  //   let notes = this.storageService.getItem("notes");
  //   if (notes != null) {
  //     return (this.notes = notes);
  //   }
  // }

  addNote() {
    this.noteStorage = this.storageService.getItem("notes");
    this.note = {
      noteId: this.noteStorage.length != 0 ? this.noteStorage.length : 0,
      title: "New Note",
      content: "Description",
      time: new Date().toLocaleTimeString(),
    };
    console.log("in addNote", this.note);
    this.notesService.createNote(this.note);
  }

  deleteNote() {
    this.notesService.removeNote(this.activeIndex);
  }

  activeNote(index) {
    this.activeIndex = index;
    // console.log(this.activeIndex);
    // let activeData = this.notesService.loadAllNotes();
    // activeData = activeData[index];
    // console.log(activeData);
    // this.note.title = activeData.title
    this.displayDescription = true;
  }

  noteChanged() {
    this.noteStorage = this.storageService.getItem("notes");
    let data = this.noteStorage[this.activeIndex];
    data.noteId = this.note.noteId;
    data.title = this.note.title;
    data.content = this.note.content;
    data.time = new Date().toLocaleTimeString();
    console.log("copyNote--->",data);
    this.notesService.updateNote(data,this.activeIndex)
  }

  searchContent(e){
    this.searchText = e.target.value;
    console.log(this.searchText);
  }

  toggleCheck(e){
    this.checked = e.target.checked;
  }
 }
