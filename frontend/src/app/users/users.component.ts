// import {Component, inject} from '@angular/core';
// import User from "../types/user";
// import {UserService} from "../services/user.service";
//
// @Component({
//   selector: 'app-users',
//   templateUrl: './users.component.html',
//   styleUrl: './users.component.scss'
// })
// export class UsersComponent {
//  users:User[] = [];
//  userService= inject(UserService);
//  ngOnInit(){
//    this.userService.getUsers().subscribe(result=>{
//      this.users = result;
//      console.log(this.users);
//    })
//  }
//
//  delete(id:string){
//    const ok = confirm("Are you sure you want to delete user")
//    if(ok){
//      this.userService.deleteUser(id).subscribe(result=>{
//        alert("User deleted successfully")
//        this.users = this.users.filter(u=>u._id!=id)
//      })
//    }
//  }
// }

import { Component, inject, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import User from '../types/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  paginatedUsers = new MatTableDataSource<User>();
  displayedColumns: string[] = ['name', 'email', 'age', 'address', 'operations']; // Columns to display
  userService = inject(UserService);

  // Pagination settings
  length = 0; // Total number of users
  pageSize = 5; // Number of items per page
  pageSizeOptions = [5, 10, 20];

  ngOnInit(): void {
    this.userService.getUsers().subscribe(result => {
      this.users = result;
      this.length = result.length; // Set total items for pagination
      this.updatePaginatedData(0, this.pageSize); // Initialize paginated data
    });
  }

  updatePaginatedData(startIndex: number, pageSize: number): void {
    const endIndex = startIndex + pageSize;
    this.paginatedUsers.data = this.users.slice(startIndex, endIndex);
  }

  onPageChange(event: PageEvent): void {
    this.updatePaginatedData(event.pageIndex * event.pageSize, event.pageSize);
  }

  delete(id: string): void {
    const ok = confirm('Are you sure you want to delete this user?');
    if (ok) {
      this.userService.deleteUser(id).subscribe(() => {
        alert('User deleted successfully');
        this.users = this.users.filter(u => u._id !== id);
        this.length = this.users.length; // Update pagination length
        this.updatePaginatedData(0, this.pageSize); // Reset paginated data
      });
    }
  }
}
