import { Injectable } from "@angular/core";
import { StorageService } from "src/app/core/services/storage.service";
import { Note } from "../interface/note";
import { AppDataService } from "./app-data.service";

@Injectable({
  providedIn: "root",
})
export class NotesService {
  public notes: Note[] = [];
  public loaded: boolean = false;
  public updateData: any;
  constructor(
    private storageService: StorageService,
    private appData: AppDataService
  ) {}

  // loadAllNotes() {
  //   let notes = this.storageService.getItem("notes");
  //   if (notes != null) {
  //     return (this.notes = notes);
  //   }
  // }

  // To create a note
  createNote(note) {
    this.notes.unshift(note);
    console.log("create Note", this, note);
    this.storageService.setItem("notes", this.notes);
    this.appData.updateNotes.next(this.notes);
  }

// to delete a particular note
  removeNote(index) {
    this.notes = this.storageService.getItem("notes");
    console.log("remove note before ", this.notes, index);
    if (this.notes.length != 0) {
      this.notes.forEach((data, i) => {
        if (index === i) {
          this.notes.splice(i, 1);
        }
        console.log("after note before ", this.notes);
        this.storageService.setItem("notes", this.notes);
        this.appData.updateNotes.next(this.notes);
      });
    } else {
      console.log("No elements are present in");
    }
  }

  // to update the note when changes are made in card
  updateNote(data, index) {
    console.log(index, data);
    this.updateData = this.storageService.getItem("notes");
    this.updateData[index] = data;
    this.storageService.setItem("notes", this.updateData);
    this.appData.updateNotes.next(this.updateData);
  }}
