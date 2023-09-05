import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Employee } from './employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  selectedEmployee: Employee = new Employee(); // Initialize selectedEmployee
  employees: Employee[] = []; 
  readonly baseURL= 'http://localhost:3000/employees';

  constructor(private http: HttpClient) { }
  postEmployee(emp:Employee){
    return this.http.post(this.baseURL,emp);
  }
  getEmployeeList(){
    return this.http.get(this.baseURL);
  }
  // Your service methods go here
}
