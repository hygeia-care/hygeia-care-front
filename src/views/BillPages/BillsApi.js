class BillsApi{
    static API_BASE_URL ="/api/v1";



    static requestHeaders(){
        return{}
    }

    static async getAllBills(){
        const headers = this.requestHeaders();
        //const request = new Request(BillsApi.API_BASE_URL + "/bills", {
        const request = new Request("http://localhost:3337/api/v1/bills", {
            method:"GET",
            headers: headers
        });

        const response = await fetch(request);
                
        if (! response.ok){
            throw Error ("BillsApi:getAllBills - Response not valid " + response.status);
        }

        return response.json();
    }
    
    static async newBill(bill){
        //const headers = this.requestHeaders();        
        
        console.log ("BillsApi.newBill - bill:" + bill.name);
        //const request = new Request(BillsApi.API_BASE_URL + "/bills", {
        const request = new Request("http://localhost:3337/api/v1/bills", {
            method:"POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bill)       
            
        });

        const response = await fetch(request);
        
        
        if (! response.ok){
            throw Error ("BillsApi:newBills - Response not valid " + response.status);
        }

        return response.json();
    }

    static async updateBill(billId, updatedBill) {
        const headers = this.requestHeaders();
    
        const request = new Request("http://localhost:3337/api/v1/bills/" +billId, {
            method: "PUT",  // Usa el método PUT para actualizar
            headers: headers,
            body: JSON.stringify(updatedBill),
        });
    
        const response = await fetch(request);
    
        if (!response.ok) {
            throw new Error("BillsApi:updateBill - Response not valid " + response.status);
        }
    
        return response.json();
    }


    static async deleteBill(id) {
        const headers = this.requestHeaders();

        console.log ("BillsApi.deleteBill - id:" + id);
    
        const request = new Request("http://localhost:3337/api/v1/bills/" +id, {
            method: "DELETE",  // Usa el método DELETE para eliminar
            headers: headers            
        });
    
        const response = await fetch(request);
    
        if (!response.ok) {
            throw new Error("BillsApi:deleteBill - Response not valid " + response.status);
        }
    
        return response.json();
    }
    
    
}

export default BillsApi;