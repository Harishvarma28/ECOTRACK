import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DataFormService } from '../services/data-form.service';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-recycling-data',
  templateUrl: './recycling-data.component.html',
  styleUrls: ['./recycling-data.component.scss'],
  animations: [
    trigger('tableAnimation', [
      state('in', style({ opacity: 1, transform: 'translateX(0)' })),
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-100%)' }),
        animate('300ms ease-out')
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0, transform: 'translateX(100%)' }))
      ])
    ])
  ]
})
export class RecyclingDataComponent implements OnInit, OnDestroy {
  recyclingCollectionData: any[] = [];
  recyclingRevenueData: any[] = [];
  landfillExpenseData: any[] = [];

  currentDataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = [];
  totalRecords = 0;
  pageSize = 50;
  currentTable = 'recyclingCollection';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private subscriptions: Subscription = new Subscription();

  constructor(private recyclingDataService: DataFormService) {}

  ngOnInit() {
    this.showRecyclingCollection();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  showRecyclingCollection() {
    this.currentTable = 'recyclingCollection';
    this.fetchRecyclingCollection();
  }

  showRecyclingRevenue() {
    this.currentTable = 'recyclingRevenue';
    this.fetchRecyclingRevenue();
  }

  showLandfillExpense() {
    this.currentTable = 'landfillExpense';
    this.fetchLandfillExpense();
  }

  fetchRecyclingCollection() {
    const sub = this.recyclingDataService.getRecyclingCollection().subscribe(
      (response: any) => {
        this.recyclingCollectionData = response.data;
        this.updateDataSource(this.recyclingCollectionData, [
          'collection_date',
          'food_waste_weight',
          'aluminum_weight',
          'cardboard_weight',
          'glass_weight',
          'metal_weight',
          'metal_subcategory',
          'paper_weight',
          'paper_subcategory',
          'plastic_weight',
          'plastic_subcategory',
          'action'
        ]);
      },
      (error) => console.error('Error fetching recycling collection data', error)
    );
    this.subscriptions.add(sub);
  }

  fetchRecyclingRevenue() {
    const sub = this.recyclingDataService.getRecyclingRevenue().subscribe(
      (response: any) => {
        this.recyclingRevenueData = response.data;
        this.updateDataSource(this.recyclingRevenueData, [
          'sale_date',
          'material_type',
          'revenue_amount',
          'buyer',
          'weight',
          'action'
        ]);
      },
      (error) => console.error('Error fetching recycling revenue data', error)
    );
    this.subscriptions.add(sub);
  }

  fetchLandfillExpense() {
    const sub = this.recyclingDataService.getLandfillExpense().subscribe(
      (response: any) => {
        this.landfillExpenseData = response.data;
        this.updateDataSource(this.landfillExpenseData, [
          'landfill_date',
          'weight',
          'expense_amount',
          'landfill_hauler',
          'action'
        ]);
      },
      (error) => console.error('Error fetching landfill expense data', error)
    );
    this.subscriptions.add(sub);
  }

  updateDataSource(data: any[], columns: string[]) {
    console.log('Incoming data:', data); // Check what data is being passed
    this.totalRecords = data.length;
    this.currentDataSource.data = data; // Assign the data to the table
    this.displayedColumns = columns;
    // Reset pagination when switching data sources
  if (this.paginator) {
    this.paginator.pageIndex = 0; // Reset page index to 0
  }
    this.currentDataSource.paginator = this.paginator;
    
  
    // Check if the data is correctly assigned
    console.log('Current DataSource:', this.currentDataSource.data); 
  
    const pageEvent: PageEvent = {
      pageIndex: 0,
      pageSize: 50,
      length: this.totalRecords,
    };
  
    this.onPageChange(pageEvent); // Call onPageChange with the initial page
  }

  onPageChange(event: PageEvent) {
    // MatTableDataSource automatically handles paging when paginator is set
    const pageIndex = event.pageIndex;
    const pageSize = event.pageSize;

    // Adjusting pagination based on the page size and index
    this.currentDataSource.paginator!.pageIndex = pageIndex;
    this.currentDataSource.paginator!.pageSize = pageSize;

    console.log('Page changed:', pageIndex, pageSize);
  }


  deleteItem(id: number, table: string) {
    let deleteObservable;
  
    // Determine which service method to call based on the current table
    if (table === 'recyclingCollection') {
      deleteObservable = this.recyclingDataService.deleteRecyclingCollection(id);
    } else if (table === 'recyclingRevenue') {
      deleteObservable = this.recyclingDataService.deleteRecyclingRevenue(id);
    } else if (table === 'landfillExpense') {
      deleteObservable = this.recyclingDataService.deleteLandfillExpense(id);
    }
  
    // Perform the deletion and refresh data upon success
    if (deleteObservable) {
      deleteObservable.subscribe({
        next: () => {
          console.log(`Deleted item with ID ${id} from ${table}`);
          this.refreshCurrentTable();
        },
        error: (error) => console.error(`Error deleting item with ID ${id}`, error)
      });
    }
  }
  
  // Refresh the current table's data after deletion
  refreshCurrentTable() {
    if (this.currentTable === 'recyclingCollection') {
      this.fetchRecyclingCollection();
    } else if (this.currentTable === 'recyclingRevenue') {
      this.fetchRecyclingRevenue();
    } else if (this.currentTable === 'landfillExpense') {
      this.fetchLandfillExpense();
    }
  }
  
}
