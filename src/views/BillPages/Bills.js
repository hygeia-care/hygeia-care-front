import { Fragment, useEffect, useState } from 'react';


import EditableBill from './EditableBill.js';
import NewBill from './NewBill.js';
import Alert from './Alert.js';
import BillsApi from './BillsApi.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getJwtToken } from '../../services/jwtService';

import httpService from '../../services/httpService';


function Bills() {

    const [message, setMessage] = useState(null);
    const [bills, setBills] = useState([]);

    const [user, setUser] = useState([]);

    //autenticacion usuario logado

    const [userName, setUserName] = useState('');
    const [userId, setUserId] = useState('');

    
      
    useEffect(() => {
        async function fetchBills() {
            try {               
                const c = await BillsApi.getAllBills();
                setBills(c);
            } catch (error) {
                setMessage("Could not bill with the server"+ error);                       
            }
        }        
                
        //autenticacion usuario logado
        const fetchUserData = async () => {
            try {
                const token = getJwtToken();            
                if (token) {                   
                  
                   const datosUser = await httpService().get("auth/users/"+token.id, {
                        method: "GET",  // Usa el método PUT para actualizar
                        headers: {
                            'Content-Type': 'application/json'
                        },                      
                        
                    });         
                      
                    
                    console.log("consola bills obtengo datos usuario logado: " + datosUser.data.nombre + " " + datosUser.data.apellidos + " id:" + datosUser.data._id);
        
                    setUserId(datosUser.data._id || ''); // Usa un valor predeterminado si _id es undefined
                    setUserName(`${datosUser.data.nombre} ${datosUser.data.apellidos}`);
                }
            } catch (error) {
                console.error('Error al obtener el ID del usuario:', error);
                // Agrega un manejo de errores más específico según tus necesidades
                setMessage('Error al obtener datos del usuario');
            }
        };
        


        fetchUserData();
        fetchBills();
        
    }, []);
    
    function onAlertClose() {
        setMessage(null);
    }

    async function onBillEdit(newBill, oldBill) {
        const validation = validateBillName(newBill);
        if (! validation) {
            return false;
        }

        /*if (newBill.name !== oldBill.name) {
            setMessage('Cannot change name of the bill');
            return false;
        }*/

        setBills((prevBills) => {
            const newBills = prevBills.map((c) => c.name === oldBill.name ? newBill : c);
            return newBills;
        })

        try {                           
            const c = await BillsApi.updateBill(newBill, oldBill._id);
            setBills(c.remainingBills);
        } catch (error) {
            setMessage("Could not bill with the server" + error);
            console.log("Could not bill with the server");                
        } 

        return true;
    }

    async function onBillDelete(bill) {
        //setMessage("factura a eliminar: " + bill);

        setBills((prevBills) => {            
            return prevBills.filter((c) => c.name !== bill.id);                                   
        });

        try {                           
            const c = await BillsApi.deleteBill(bill);         
            setBills(c.remainingBills);
            
            
        } catch (error) {
            setMessage("Could not bill with the server" + error);
            console.log("Could not bill with the server");                
        }              
        
    }    

    function validateBillName(bill) {
        if (bill.name === '') {
            setMessage('A name must be provided');
            return false;
        }

        return true;
    }

    async function  onAddBill(bill) {
        setMessage('onAddBill, bill.name ' +  bill.name);
        const validation = validateBillName(bill);
        if (! validation) {
            return false;
        }        

        if (bills.find(c => c.name === bill.name)) {
            setMessage('Duplicated bill');
            return false;
        }

        setBills((prevBills) => {
            if (! prevBills.find(c => c.name === bill.name)) {
                return [...prevBills, bill];
            } else {
                setMessage('Duplicated bill');
                return prevBills;
            }
        });
        
        try {                           
            setMessage("------Bills.onAddBills.bill " + bill.name);
            const c = await BillsApi.newBill(bill);
            setBills(c);
        } catch (error) {
            setMessage("Could not bill with the server" + error);
            console.log("Could not bill with the server");                
        }        

        return true;
    }

   return (
    
    <Fragment>
    <Alert message={message} onClose={onAlertClose}/>            
    <table id="table-bills" className="table table-striped table-bordered">
        <thead className="thead-dark">
            <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Total</th>
                <th>Services</th>
                <th>Issuedate</th>
                <th>Patient</th>
                <th>Appointment</th>

                <th>&nbsp;</th>
            </tr>
        </thead>
        <tbody>
            <NewBill onAddBill={onAddBill}/>
            {bills.map((bill) => 
                <EditableBill key={bill.name} bill={bill} onEdit={(newBill) => onBillEdit(newBill, bill)} onDelete={(bill) => onBillDelete(bill._id)}/>
            )}
        </tbody>
    </table>
    </Fragment>
   )
}

export default Bills;