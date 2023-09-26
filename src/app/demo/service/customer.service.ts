import { Injectable } from '@angular/core';
import { Customer } from '../interfaces/customer';
import { StorageService } from './storage.service';

const customerListStorageKey = 'customerList';

const defaultCustomerListStorageKey: Customer[] = [];

@Injectable({
    providedIn: 'root',
})
export class CustomerService {
    customerList: Customer[];
    constructor(private storageService: StorageService) {
        this.customerList =
            storageService.getData(customerListStorageKey) ||
            defaultCustomerListStorageKey;
        this.saveList();
    }

    saveList(): void {
        this.storageService.setData(customerListStorageKey, this.customerList);
    }

    getCustomerList(): Customer[] {
        return this.customerList;
    }

    getCustomerById(customerId): Customer {
        return this.customerList.find((customer) => customer.id === customerId);
    }

    checkCustomer(userName, password): Customer {
        return this.customerList.find(
            (customer) =>
                customer.userName === userName && customer.password === password
        );
    }

    addCustomer(customer: Customer): void {
        this.customerList.push(customer);
        this.saveList();
    }

    updateCustomer(customer: Customer, changes: Customer): void {
        const index = this.customerList.indexOf(customer);
        this.customerList[index] = { ...customer, ...changes };
        this.saveList();
    }

    deleteCustomer(customer: Customer): void {
        const index = this.customerList.indexOf(customer);
        this.customerList.splice(index, 1);
        this.saveList();
    }
}
