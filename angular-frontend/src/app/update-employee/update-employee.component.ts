import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {

  employee: Employee = new Employee();
  id!: number;

  constructor(private employeeService: EmployeeService,
    private acticatedRoute: ActivatedRoute,  private router: Router) { }

  ngOnInit(): void {
    this.id = this.acticatedRoute.snapshot.params['id'];
    this.employeeService.getEmployeeById(this.id).subscribe(data => {
      this.employee = data;
    }, error => console.log(error));
  }

  goToEmployeeList() {
    this.router.navigate(['/employees']);
  }

  onSubmit() {
    this.employeeService.updateEmployee(this.id, this.employee).subscribe( data => {
      this.goToEmployeeList();
    }, error => console.log(error));
  }

}
