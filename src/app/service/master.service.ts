import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task, ITask, ApiResponseModel } from '../model/task';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  apiUrl: string = 'https://freeapi.gerasim.in/api/JWT/';

  constructor(private http: HttpClient) { }

  getTasks(): Observable<ApiResponseModel> {
    return this.http.get<ApiResponseModel>(this.apiUrl + 'GetAllTaskList');
  }

  addNewTask(obj: Task): Observable<ApiResponseModel> {
    return this.http.post<ApiResponseModel>(this.apiUrl + 'CreateNewTask',obj);
  }

  updateTask(obj: Task): Observable<ApiResponseModel> {
    return this.http.put<ApiResponseModel>(this.apiUrl + 'UpdateTask', obj);
  }

  deleteTask(id: number): Observable<ApiResponseModel> {
    return this.http.delete<ApiResponseModel>(this.apiUrl + 'DeleteTask?itemId='+ id);
  }
    
}


 