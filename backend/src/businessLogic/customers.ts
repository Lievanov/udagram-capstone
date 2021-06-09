import * as uuid from 'uuid'

import { Customer } from '../models/Customer'
import { CreateCustomerRequest } from '../requests/CreateCustomerRequest'
import { CustomerAccess } from '../dataLayer/customerAccess'
import { UpdateCustomerRequest } from 'src/requests/UpdateCustomerRequest';

const customerAccess = new CustomerAccess();

export async function getCustomersByUserId(userId: string): Promise<Customer[]> {
    return customerAccess.getCustomersByUserId(userId)
}

export async function createCustomer(createCustomerRequest: CreateCustomerRequest, userId: string): Promise<Customer> {
    const customerId = uuid.v4()
    return customerAccess.createCustomer({
        userId,
        customerId,
        createdAt: new Date().toISOString(),
        name: createCustomerRequest.name,
        age: createCustomerRequest.age
    })
}

export async function deleteCustomer(customerId: string): Promise<string> {
    return customerAccess.deleteCustomer(customerId)
}

export async function updateCustomer(updateCustomerRequest: UpdateCustomerRequest, customerId: string): Promise<UpdateCustomerRequest> {
    return customerAccess.updateCustomer(
        customerId, 
        updateCustomerRequest
    )
}