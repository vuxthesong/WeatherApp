import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/demo/interfaces/customer';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { CustomerService } from 'src/app/demo/service/customer.service';

@Component({
    templateUrl: './customer.component.html',
    providers: [MessageService],
})
export class CustomerComponent implements OnInit {
    customerDialog: boolean = false;

    deleteCustomersDialog: boolean = false;

    deleteCustomerDialog: boolean = false;

    customer: Customer = {};

    customers: Customer[] = [];

    selectedCustomers: Customer[] = [];

    submitted: boolean = false;

    rowsPerPageOptions = [5, 10, 20];

    constructor(
        private customerService: CustomerService,
        private messageService: MessageService
    ) {}

    ngOnInit() {
        this.customers = this.customerService.getCustomerList();
    }

    openNew() {
        this.customer = {};
        this.submitted = false;
        this.customerDialog = true;
    }

    deleteSelectedCustomers() {
        this.deleteCustomersDialog = true;
    }

    editCustomer(customer: Customer) {
        this.customer = { ...customer };
        this.customerDialog = true;
    }

    deleteCustomer(customer: Customer) {
        this.deleteCustomerDialog = true;
        this.customer = { ...customer };
    }

    confirmDeleteSelected() {
        this.deleteCustomersDialog = false;
        this.selectedCustomers.map((customer) =>
            this.customerService.deleteCustomer(customer)
        );
        this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Customers Deleted',
            life: 3000,
        });
        this.selectedCustomers = [];
        this.customers = this.customerService.getCustomerList();
    }

    confirmDelete() {
        this.deleteCustomerDialog = false;
        this.customerService.deleteCustomer(this.customer);
        this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Customer Deleted',
            life: 3000,
        });
        this.customer = {};
        this.customers = this.customerService.getCustomerList();
    }

    hideDialog() {
        this.customerDialog = false;
        this.submitted = false;
    }

    saveCustomer() {
        this.submitted = true;
        if (this.customer.name?.trim()) {
            if (this.customer.id) {
                let updateCustomer = this.customerService.getCustomerById(
                    this.customer.id
                );
                this.customerService.updateCustomer(
                    updateCustomer,
                    this.customer
                );
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Customer Updated',
                    life: 3000,
                });
            } else {
                let newCustomer: Customer = {
                    id: this.createId(),
                    ...this.customer,
                };
                this.customerService.addCustomer(newCustomer);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Customer Created',
                    life: 3000,
                });
            }

            this.customers = [...this.customers];
            this.customerDialog = false;
        }
        this.customers = this.customerService.getCustomerList();
    }

    createId(): string {
        let id = '';
        const chars =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }
}
