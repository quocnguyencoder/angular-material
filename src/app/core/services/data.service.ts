import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { PeriodicElement } from '../models/data.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private readonly localStorageKey = 'periodicElements';

  constructor() {}

  // Simulate API call to get all elements
  getElements(): Observable<PeriodicElement[]> {
    const elements = this.getElementsFromStorage();
    return of(elements).pipe(delay(1000)); // Simulate a 1-second delay
  }

  // Simulate API call to filter elements
  filterElements(filters: {
    name?: string;
    date?: string;
    time?: string;
    status?: string;
  }): Observable<PeriodicElement[]> {
    const elements = this.getElementsFromStorage();
    const filteredElements = elements.filter((element) => {
      const matchesName = filters.name
        ? element.name.toLowerCase().includes(filters.name.toLowerCase())
        : true;
      const matchesDate = filters.date
        ? element.date.toDateString() === new Date(filters.date).toDateString()
        : true;
      const matchesTime = filters.time
        ? element.time.toLowerCase().includes(filters.time.toLowerCase())
        : true;
      const matchesStatus = filters.status
        ? element.status === filters.status
        : true;

      return matchesName && matchesDate && matchesTime && matchesStatus;
    });

    return of(filteredElements).pipe(delay(1000)); // Simulate a 1-second delay
  }

  // Simulate API call to add an element
  addElement(element: PeriodicElement): Observable<void> {
    const elements = this.getElementsFromStorage();
    elements.push(element);
    this.saveElementsToStorage(elements);
    return of(undefined).pipe(delay(1000)); // Simulate a 1-second delay
  }

  // Simulate API call to update an element
  updateElement(element: PeriodicElement): Observable<void> {
    const elements = this.getElementsFromStorage();
    const index = elements.findIndex((e) => e.position === element.position);
    if (index !== -1) {
      elements[index] = element;
      this.saveElementsToStorage(elements);
    }
    return of(undefined).pipe(delay(1000)); // Simulate a 1-second delay
  }

  // Simulate API call to delete an element
  deleteElement(position: number): Observable<void> {
    const elements = this.getElementsFromStorage();
    const updatedElements = elements.filter((e) => e.position !== position);
    this.saveElementsToStorage(updatedElements);
    return of(undefined).pipe(delay(1000)); // Simulate a 1-second delay
  }

  // Initialize default data if local storage is empty
  initializeDefaultData(): void {
    const elements = this.getElementsFromStorage();
    if (elements.length === 0) {
      const defaultData: PeriodicElement[] = [
        {
          position: 1,
          name: 'Hydrogen',
          weight: 1.0079,
          symbol: 'H',
          date: new Date('2023-10-01'),
          time: '10:00 AM',
          status: 'Active',
        },
        {
          position: 2,
          name: 'Helium',
          weight: 4.0026,
          symbol: 'He',
          date: new Date('2023-10-02'),
          time: '11:30 AM',
          status: 'Inactive',
        },
        {
          position: 3,
          name: 'Lithium',
          weight: 6.941,
          symbol: 'Li',
          date: new Date('2023-10-03'),
          time: '09:15 AM',
          status: 'Pending',
        },
        {
          position: 4,
          name: 'Beryllium',
          weight: 9.0122,
          symbol: 'Be',
          date: new Date('2023-10-04'),
          time: '02:45 PM',
          status: 'Active',
        },
        {
          position: 5,
          name: 'Boron',
          weight: 10.811,
          symbol: 'B',
          date: new Date('2023-10-05'),
          time: '04:00 PM',
          status: 'Inactive',
        },
        {
          position: 6,
          name: 'Carbon',
          weight: 12.0107,
          symbol: 'C',
          date: new Date('2023-10-06'),
          time: '01:20 PM',
          status: 'Pending',
        },
        {
          position: 7,
          name: 'Nitrogen',
          weight: 14.0067,
          symbol: 'N',
          date: new Date('2023-10-07'),
          time: '03:10 PM',
          status: 'Active',
        },
        {
          position: 8,
          name: 'Oxygen',
          weight: 15.9994,
          symbol: 'O',
          date: new Date('2023-10-08'),
          time: '12:00 PM',
          status: 'Inactive',
        },
        {
          position: 9,
          name: 'Fluorine',
          weight: 18.9984,
          symbol: 'F',
          date: new Date('2023-10-09'),
          time: '08:30 AM',
          status: 'Pending',
        },
        {
          position: 10,
          name: 'Neon',
          weight: 20.1797,
          symbol: 'Ne',
          date: new Date('2023-10-10'),
          time: '05:45 PM',
          status: 'Active',
        },
      ];
      this.saveElementsToStorage(defaultData);
    }
  }

  private getElementsFromStorage(): PeriodicElement[] {
    const data = localStorage.getItem(this.localStorageKey);
    if (!data) return [];

    const elements = JSON.parse(data);

    // Convert date strings to Date objects
    return elements.map((element: PeriodicElement) => ({
      ...element,
      date: new Date(element.date), // Convert string to Date
    }));
  }

  // Helper method to save elements to local storage
  private saveElementsToStorage(elements: PeriodicElement[]): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(elements));
  }
}
