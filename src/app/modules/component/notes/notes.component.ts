import { Component, OnInit } from "@angular/core";
import { NotesService } from "../../../shared/services/notes.service";
import { ActivatedRoute } from "@angular/router";
import { Note } from "src/app/shared/interface/note";
import { StorageService } from "src/app/core/services/storage.service";
import { AppDataService } from "src/app/shared/services/app-data.service";
import { SearchHighlightPipe } from 'src/app/core/pipes/search-highlight.pipe';

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
  search: string;
  highlightText:String;
  constructor(
    public notesService: NotesService,
    private storageService: StorageService,
    private appData: AppDataService,
    // public searchHighlight:SearchHighlightPipe
  ) {
    this.appData.updateNotes.subscribe((data) => {
      if (data) {
        // this.noteStorage = data;
        this.notesList = data;
        if(this.notesList.length < 0){
          this.displayDescription = false;
        }
      } else {
        // this.noteStorage = this.storageService.getItem("notes");
        this.notesList = this.noteStorage;
      }
      // this.noteStorage
    });
  }
  ngOnInit(): void {
    this.notesList = this.notesService.loadAllNotes();
  }

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
    let copyNote = this.exchangeValues(
      data.noteId,
      data.title,
      data.content,
    );
    // need to check logic here
    this.notesService.updateNote(copyNote,this.activeIndex)
  }

  exchangeValues(id, title, content,) {
    let copyNotes = {
      noteId: id,
      title: title,
      content: content,
      time: new Date().toLocaleTimeString(),
    };
    return copyNotes;

  }

  searchChanged(){
    this.highlightText = this.search;
    console.log(this.highlightText);
  }
 }
