
import { normalHeader } from "../http-common";

const getPrices = () => { 
    return normalHeader.get("/business/account/prices");
}

const createPrices = (data) => { 
    return normalHeader.post("/business/account/prices", data);
}

const updatePrices = (id, data) => { 
    return normalHeader.patch(`/business/account/prices/${id}`, data);
}

const deletePrices = (id) => { 
    return normalHeader.delete(`/business/account/prices/${id}`);
}

const PricingService = {
    getPrices,
    createPrices,
    updatePrices,
    deletePrices
}

export default PricingService;