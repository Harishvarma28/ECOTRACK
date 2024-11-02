import { Component } from '@angular/core';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../services/user.service';

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
  users: User[] = [];

  selectedUser: User | null = null;
  showAddDialog = false;
  showEditDialog = false;
  showDeleteDialog = false;


  constructor(private dialog: MatDialog, private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers(); // Load users on component init
  }
  loadUsers(): void {
    this.userService.getUsers().subscribe((data: { users: User[] }) => {
        this.users = data.users; // Correctly access the users array
    }, error => {
        console.error('Error fetching users:', error); // Log any errors
    });
}


  openDialog(action: string, user?: User): void {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '500px', // Increase dialog width
      enterAnimationDuration: '300ms', // Animation duration for entry
      exitAnimationDuration: '200ms', // Animation duration for exit
      data: { action, user: user ? { ...user } : { name: '', contact: '', university: '', status: 'Active' } }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (action === 'add') {
          this.users.push(result); // Add new user to the list
          this.loadUsers(); 
        } else if (action === 'edit') {
          const index = this.users.findIndex(u => u.name === result.name);
          if (index !== -1) {
            this.users[index] = result; // Update user details
          }
          this.loadUsers(); 
        } else if (action === 'delete') {
          this.users = this.users.filter(u => u.name !== result.name); // Delete user from the list
          this.loadUsers(); 
        }
      }
    });
  }
  
}
