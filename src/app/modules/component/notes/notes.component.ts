import { Component, OnInit, HostListener, OnDestroy } from "@angular/core";
import { NotesService } from "../../../shared/services/notes.service";
import { ActivatedRoute } from "@angular/router";
import { Note } from "src/app/shared/interface/note";
import { StorageService } from "src/app/core/services/storage.service";
import { AppDataService } from "src/app/shared/services/app-data.service";
import { SearchHighlightPipe } from "src/app/shared/pipes/search-highlight.pipe";

@Component({
  selector: "app-notes",
  templateUrl: "./notes.component.html",
  styleUrls: ["./notes.component.scss"],
})
export class NotesComponent implements OnInit, OnDestroy {
  note: Note;
  activeIndex: number;
  displayDescription: boolean = false;
  noteStorage;
  notesList: any;
  searchText: string;
  checked: boolean;
  mobileView: boolean;
  public hideRuleContent: boolean[] = [];

  public notes: Note[] = [];
  public loaded: boolean = false;
  public updateData: any;
  // public buttonName: any = "Collapse";

  toggle(index) {
    // toggle based on index
    this.hideRuleContent[index] = !this.hideRuleContent[index];
  }
  constructor(
    public notesService: NotesService,
    private storageService: StorageService,
    private appData: AppDataService
  ) {
    console.log("componet")
    this.appData.updateNotes.subscribe((data) => {
      console.log(this.storageService.getItem('notes'))
      if (data) {
        this.notesList = data;
        if (this.notesList.length < 0) {
          this.displayDescription = false;
        }
      } else {
        this.notes = this.storageService.getItem("notes");
        this.notesList = this.notes;
      }
    });
  }
  ngOnDestroy(): void {
    let data = this.storageService.getItem("notes");
    console.log(data)
  }

  ngOnInit(): void {
    this.notesList = this.storageService.getItem("notes");
  }
  // adding note
  addNote() {
    this.notes = this.storageService.getItem("notes");
    this.note = {
      noteId: this.notes.length != 0 ? this.notes.length : 0,
      title: "New Note",
      content: "Description",
      time: new Date().toString(),
    };
    console.log("in addNote", this.note);
    this.notesService.createNote(this.note);
  }

  // delete note
  deleteNote() {
    this.notesService.removeNote(this.activeIndex);
    this.displayDescription = false;
  }

  // to show the active note
  activeNote(index) {
    this.activeIndex = index;
    console.log(this.activeIndex);
    let data = this.storageService.getItem("notes");
    this.note.time = data[index].time;
    this.note.title = data[index].title;
    this.note.content = data[index].content;
    this.note.noteId = data[index].noteId;
    this.displayDescription = true;
  }

  // when note data is changes
  noteChanged() {
    this.notes = this.storageService.getItem("notes");
    let data = this.notes[this.activeIndex];
    data.noteId = this.note.noteId;
    data.title = this.note.title;
    data.content = this.note.content;
    data.time = new Date().toString();
    console.log("copyNote--->", data);
    this.notesService.updateNote(data, this.activeIndex);
  }

  // to format the time of card creation
  getTime(time) {
    let currentTime = new Date();
    if (currentTime < new Date(time)) {
      let date = new Date(time);
      return (date + "").slice(0, 3);
    } else {
      return new Date(time).toLocaleTimeString();
    }
  }

  // to get the window size for doing some styling for cards
  @HostListener("window:resize", ["$event"])
  onResize(event) {
    event.target.innerWidth;
    console.log(event.target.innerWidth);
    if (event.target.innerWidth < 576) {
      this.mobileView = true;
    } else {
      this.mobileView = false;
    }
  }
}
