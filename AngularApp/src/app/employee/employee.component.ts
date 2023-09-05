import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../shared/employee.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Employee } from '../shared/employee.model';
declare var M: any;

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  providers: [EmployeeService]
})
export class EmployeeComponent implements OnInit {
  employeeForm = new FormGroup({
    name: new FormControl(''),
    position: new FormControl(''),
    office: new FormControl(''),
    salary: new FormControl(''),
  });

  constructor(public employeeService: EmployeeService) {}

  ngOnInit() {
    this.resetForm();
    this.refreshEmployeeList();
  }

  resetForm() {
    this.employeeForm.reset();
    this.employeeService.selectedEmployee = {
      _id: '',
      name: '',
      position: '',
      office: '',
      salary: 0
    };
  }

  onSubmit(employeeForm: FormGroup) {
    
    const salary: number = Number(employeeForm.value.salary);

    if (!isNaN(salary)) {
        const employeeData: Employee = {
            _id: '', // You can assign a value here if needed
            name: employeeForm.value.name || '',
            position: employeeForm.value.position || '',
            office: employeeForm.value.office || '',
            salary: salary
        };

        this.employeeService.postEmployee(employeeData).subscribe((res) => {
            this.resetForm();
            M.toast({ html: 'Successful', classes: 'rounded' });
        });
    } else {
        // Handle invalid salary input here, e.g., show an error message
        console.log("Invalid salary input");
    }
  }
  refreshEmployeeList(){
    this.employeeService.getEmployeeList().subscribe((res)=>{
      this.employeeService.employees=res as Employee[];
    });
  }
  onEdit(emp: Employee) {
    this.employeeService.selectedEmployee = emp;
    console.log('Selected Employee:', this.employeeService.selectedEmployee);
  }
  
  
}
