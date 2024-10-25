import { Component } from '@angular/core';
interface User {
  name: string;
  contact: string;
  university: string;
  status: string;
}

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent {
  displayedColumns: string[] = ['name', 'contact', 'university', 'status', 'actions'];
  users: User[] = [
    { name: 'John Doe', contact: 'john.doe@example.com', university: 'University of XYZ', status: 'Active' },
    { name: 'Jane Smith', contact: '+1234567890', university: 'ABC University', status: 'Inactive' },
    { name: 'Alice Johnson', contact: 'alice.johnson@example.com', university: 'University of ABC', status: 'Active' },
    { name: 'Bob Williams', contact: '+9876543210', university: 'XYZ University', status: 'Inactive' },
    { name: 'John Doe', contact: 'john.doe@example.com', university: 'University of XYZ', status: 'Active' },
    { name: 'Jane Smith', contact: '+1234567890', university: 'ABC University', status: 'Inactive' },
    { name: 'Alice Johnson', contact: 'alice.johnson@example.com', university: 'University of ABC', status: 'Active' },
    { name: 'Bob Williams', contact: '+9876543210', university: 'XYZ University', status: 'Inactive' }
  ];

  editUser(user: any) {
    // Logic to handle user editing, such as navigating to an edit form
    console.log('Edit user:', user);
  }
  addUser() {
    // Logic to open a form for adding a new user
    console.log('Add user button clicked');
  }
  deleteUser(user: any) {
    // Logic to delete the user
    console.log('Delete user:', user);
  }
  
}
