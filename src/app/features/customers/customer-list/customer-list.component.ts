import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { NGXLogger } from 'ngx-logger';
import { Title } from '@angular/platform-browser';
import { NotificationService } from '../../../core/services/notification.service';
import { ElementDialogComponent } from '../element-dialog/element-dialog.component';
import { FormControl } from '@angular/forms';
import { PeriodicElement } from '../../../core/models/data.model';
import { DataService } from '../../../core/services/data.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
  standalone: false,
})
export class CustomerListComponent implements OnInit {
  displayedColumns: string[] = [
    'position',
    'name',
    'weight',
    'symbol',
    'date',
    'time',
    'status',
    'actions',
  ];

  // Use MatTableDataSource for pagination and sorting
  tableDataSource = new MatTableDataSource<PeriodicElement>([]);
  loading = false; // Loading state

  // Filter controls
  nameFilter = new FormControl('');
  dateFilter = new FormControl('');
  timeFilter = new FormControl('');
  statusFilter = new FormControl('');

  // Status options for the select filter
  statusOptions = ['Active', 'Inactive', 'Pending'];

  @ViewChild(MatSort, { static: true })
  sort: MatSort = new MatSort();

  @ViewChild(MatPaginator, { static: true })
  paginator: MatPaginator = new MatPaginator();

  constructor(
    private logger: NGXLogger,
    private notificationService: NotificationService,
    private titleService: Title,
    public dialog: MatDialog,
    private dataService: DataService // Inject the DataService
  ) {}

  ngOnInit() {
    this.titleService.setTitle('angular-material-template - Customers');
    this.logger.log('Customers loaded');
    this.notificationService.openSnackBar('Customers loaded');

    // Initialize default data if local storage is empty
    this.dataService.initializeDefaultData();

    // Load data from the service
    this.loadData();

    // Initialize sorting and pagination
    this.tableDataSource.sort = this.sort;
    this.tableDataSource.paginator = this.paginator;

    // Listen to pagination changes
    this.tableDataSource.paginator?.page.subscribe((pageEvent: PageEvent) => {
      this.handlePageChange(pageEvent);
    });
  }

  // Load data from the service
  loadData() {
    this.loading = true;
    this.dataService.getElements().subscribe({
      next: (elements) => {
        this.tableDataSource.data = elements;
        this.loading = false;
      },
      error: (error) => {
        this.notificationService.openSnackBar('Failed to load data');
        this.loading = false;
      },
    });
  }

  // Apply filters
  applyFilter() {
    this.loading = true;
    const filters = {
      name: this.nameFilter.value || '',
      date: this.dateFilter.value || '',
      time: this.timeFilter.value || '',
      status: this.statusFilter.value || '',
    };

    this.dataService.filterElements(filters).subscribe({
      next: (filteredElements) => {
        this.tableDataSource.data = filteredElements;
        this.loading = false;
      },
      error: (error) => {
        this.notificationService.openSnackBar('Failed to apply filters');
        this.loading = false;
      },
    });
  }

  // Clear filters
  clearFilters() {
    this.nameFilter.setValue('');
    this.dateFilter.setValue('');
    this.timeFilter.setValue('');
    this.statusFilter.setValue('');
    this.loadData(); // Reload data without filters
  }

  // Handle pagination changes
  handlePageChange(pageEvent: PageEvent) {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 1000); // Simulate a delay for pagination
  }

  // Open dialog for adding/editing an element
  openDialog(element?: PeriodicElement): void {
    const dialogRef = this.dialog.open(ElementDialogComponent, {
      width: '450px',
      data: element
        ? { ...element }
        : {
            position: null,
            name: '',
            weight: null,
            symbol: '',
            date: null,
            time: '',
            status: '',
          },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loading = true;
        if (element) {
          this.dataService.updateElement(result).subscribe({
            next: () => {
              this.loadData(); // Reload data after update
              this.loading = false;
            },
            error: (error) => {
              this.notificationService.openSnackBar('Failed to update element');
              this.loading = false;
            },
          });
        } else {
          this.dataService.addElement(result).subscribe({
            next: () => {
              this.loadData(); // Reload data after add
              this.loading = false;
            },
            error: (error) => {
              this.notificationService.openSnackBar('Failed to add element');
              this.loading = false;
            },
          });
        }
      }
    });
  }

  // Delete an element
  deleteElement(position: number) {
    this.loading = true;
    this.dataService.deleteElement(position).subscribe({
      next: () => {
        this.loadData(); // Reload data after delete
        this.loading = false;
      },
      error: (error) => {
        this.notificationService.openSnackBar('Failed to delete element');
        this.loading = false;
      },
    });
  }
}
