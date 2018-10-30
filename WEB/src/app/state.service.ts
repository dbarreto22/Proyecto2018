import { Injectable,Inject } from '@angular/core';
import { SESSION_STORAGE, StorageService } from 'angular-webstorage-service';

const STORAGE_KEY = 'local_todolist';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  anotherTodolist = [];

  constructor(@Inject(SESSION_STORAGE) private storage:StorageService) { }

  public storeOnLocalStorage(taskTitle: string): void {

    //get array of tasks from local storage
    const currentTodoList = this.storage.get(STORAGE_KEY) || [];

    // push new task to array
    currentTodoList.push({
       title: taskTitle,
       isChecked: false
    });

    // insert updated array to local storage
    this.storage.set(STORAGE_KEY, currentTodoList);

    console.log(this.storage
       .get(STORAGE_KEY) || 'LocaL storage is empty');

}
public grabarLocalStorage(){
  let nombre:string="fernando";
  let persona={
    nombre:"pablo",
    edad:"10"
  }
  localStorage.setItem
}

}
