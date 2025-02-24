import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { NGXLogger } from 'ngx-logger';
import { Title } from '@angular/platform-browser';
import { NotificationService } from '../../../core/services/notification.service';
import { ElementDialogComponent } from '../element-dialog/element-dialog.component';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

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
    'actions',
  ];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  loading = true;

  @ViewChild(MatSort, { static: true })
  sort: MatSort = new MatSort();

  @ViewChild(MatPaginator, { static: true })
  paginator: MatPaginator = new MatPaginator();

  constructor(
    private logger: NGXLogger,
    private notificationService: NotificationService,
    private titleService: Title,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.titleService.setTitle('angular-material-template - Customers');
    this.logger.log('Customers loaded');
    this.notificationService.openSnackBar('Customers loaded');
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

    setTimeout(() => {
      this.loading = false;
    }, 2000);
  }

  openDialog(element?: PeriodicElement): void {
    const dialogRef = this.dialog.open(ElementDialogComponent, {
      width: '250px',
      data: element
        ? { ...element }
        : { position: null, name: '', weight: null, symbol: '' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (element) {
          this.updateElement(result);
        } else {
          this.addElement(result);
        }
      }
    });
  }

  addElement(element: PeriodicElement) {
    this.dataSource.data = [...this.dataSource.data, element];
    this.notificationService.openSnackBar('Element added');
  }

  updateElement(element: PeriodicElement) {
    const index = this.dataSource.data.findIndex(
      (e) => e.position === element.position
    );
    if (index !== -1) {
      this.dataSource.data[index] = element;
      this.dataSource.data = [...this.dataSource.data]; // Refresh the data source
      this.notificationService.openSnackBar('Element updated');
    }
  }

  deleteElement(position: number) {
    this.dataSource.data = this.dataSource.data.filter(
      (e) => e.position !== position
    );
    this.notificationService.openSnackBar('Element deleted');
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
