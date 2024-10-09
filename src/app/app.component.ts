import { Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MasterService} from './service/master.service';
import { inject } from '@angular/core';
import { ITask, Task, ApiResponseModel } from './model/task';
import { CommonModule,DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule,DatePipe,FormsModule,ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  taskObj: Task = new Task();

  taskList: ITask[] = [];
  masterService = inject(MasterService);

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks() {
    this.masterService.getTasks().subscribe((res: ApiResponseModel) => {
      this.taskList = res.data;
    });
  }
  updateTask() {
    this.masterService.updateTask(this.taskObj).subscribe((res: ApiResponseModel)=>{
    if(res.result)
  {
    alert('Task Updated Success');
    this.loadTasks();
    this.taskObj = new Task();
  }
    }, error=> {
    alert('API Call Error')
    })
  }
  onDelete(id: number)
  {
    const isConfirm = confirm("are you sure to delete");
    if(isConfirm)
    {
      this.masterService.deleteTask(id).subscribe((res: ApiResponseModel)=>{
        if(res.result)
        {
          alert('task delete success');
          this.loadTasks();
        }
      },error=>{
        alert("api call error")
      })
    }
  }
  addTask() {
    this.masterService.addNewTask(this.taskObj).subscribe((res: ApiResponseModel) =>  {
      if (res.result) {
        alert('task create success');
        this.loadTasks();
        this.taskObj = new Task();
      }
    },error=>{
      alert("api call error")
    })
  }
  onEdit(item: Task )
  {
     this.taskObj = item;
     setTimeout(() =>
    {
    const dat = new Date(this.taskObj.dueDate);
    const day = ('0' + dat.getDate()).slice(-2);
    const month = ('0' + (dat.getMonth() + 1)).slice(-2);
    const today = dat.getFullYear() + '-' + (month) + '-' + (day);
    (<HTMLInputElement>document.getElementById('dueDate')).value = today
     }, 1000);
  }
  }