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
  loadAllNotes() {
    let notes = this.storageService.getItem("notes");
    if (notes != null) {
      return (this.notes = notes);
    }
  }
  createNote(note) {
    this.notes.push(note);
    this.storageService.setItem("notes", this.notes);
    this.appData.updateNotes.next(this.notes);
  }

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

  updateNote(data, index) {
    console.log(index,data);
    this.updateData = this.loadAllNotes();
    console.log(this.updateData[index]);
    this.updateData[index] = data;
    // this.updateData.splice(index,1,data);
    console.log("update data",this.updateData[index]);
    this.storageService.setItem("notes", this.updateData);
    this.appData.updateNotes.next(this.updateData);
  }
}
