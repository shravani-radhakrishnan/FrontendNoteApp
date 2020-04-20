import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { StorageService } from "src/app/core/services/storage.service";

@Injectable({
  providedIn: "root",
})
export class AppDataService {
  updateNotes = new BehaviorSubject([]);

  constructor(
    private storageService: StorageService
  ) {
    console.log("testing");
    console.log(this.storageService.getItem("notes"))

    // for getting user info from local  storage
    // if (this.storageService.getItem("userInfo") !== null) {
    //   this.updateNotes.next(this.storageService.getItem("userInfo"));
    // }
  }
}
