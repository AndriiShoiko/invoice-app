import axios from "axios";

const endpointInvoices = "https://634016bbe44b83bc73c8acd2.mockapi.io/invoices";
const endpointStatuses = "https://634016bbe44b83bc73c8acd2.mockapi.io/statuses";
//const endpointTerms    = "https://634016bbe44b83bc73c8acd2.mockapi.io/paymentsTerms";

//Invoices
export async function getInvoices() {
    const res = await axios(endpointInvoices);
    const data = await res.data;
    return data;
}

export async function getInvoiceById(id) {
    const res = await axios(endpointInvoices + "/" + id);
    const data = await res.data;
    return data;
}

//Statuses
export async function getStatuses() {
    const res = await axios(endpointStatuses);
    const data = await res.data;
    return data;
}