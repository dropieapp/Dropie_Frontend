import { fileHeader, normalHeader } from "../http-common";

const getInvoices = () => {
   return normalHeader.get("/business/account/invoice");
};

const createInvoice = (invoice) => {
    return fileHeader.post("/business/account/invoice", invoice);
};

const getInvoice = (id) => {
    return normalHeader.get(`/business/account/invoice/${id}`);
}

const updateInvoice = (id, invoice) => {
    return fileHeader.post(`/business/account/invoice/${id}`, invoice);
}

const FinanceService = {
    getInvoices,
    createInvoice,
    getInvoice,
    updateInvoice
};

export default FinanceService;
