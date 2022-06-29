import React from 'react';
import { useParams } from 'react-router-dom';
import { useState } from "react";
import useServiceDetail from '../../../hooks/useServiceDetail'
import {useAuthState} from 'react-firebase-hooks/auth'
import auth from '../../../firebase.init'
import axios from 'axios';

const Checkout = () => {
    const {serviceId} = useParams();
    const [service] = useServiceDetail(serviceId);
    const [user] = useAuthState(auth)
    // const [user, setUser] = useState({
    //     name:'Akbar Ali',
    //     email:'akbar@mamtaj.com',
    //     address:'mohammadpur',
    //     phone:'01852489652'
    // });
    // const handleAddressChange = e =>{
    //     const {address, ...rest} = user;
    //     const newAddress = e.target.value;
    //     const newUser = {address: newAddress, ...rest};
    //     setUser(newUser)
    //     console.log(newUser)
    // }

    const handlePlaceOrder = e =>{
        e.preventDefault();
        const order = {
            email: user.email,
            service: service.name,
            serviceId: serviceId,
            address : e.target.address.value,
            phone: e.target.phone.value
        }
        axios.post('http://localhost:5000/', order)
        .then(response =>{
            const {data} = response;
            if(data.insertedId){
                toast('Your order is booked')
            }
        })

    }

    return (
        <div className="w-50 mx-auto">
            <h2>Please Order: {service.name}</h2>

            <form onSubmit={handlePlaceOrder}>
                <input className='w-100 mb-2' type="text" 
                value={user.displayName}
                 name="name" placeholder="Name" required readOnly/>
                <br />
                <input className='w-100 mb-2' type="email" value={user.email} name="email" placeholder="Your email" required readOnly/>
                <br />
                <input className='w-100 mb-2' 
                value={service.name} type="text" name="service" placeholder="Your service name"  required readOnly/>
                <br />
                <input className='w-100 mb-2' type="text" name="address" autoComplete='off' placeholder="Address" required/>
                <br />
                <input className='w-100 mb-2' type="phone"  name="phone" placeholder="Phone Number" required/>
                <br />
                <input className='btn btn-primary' type="submit" value="Place Your Order" />
            </form>
        </div>
    );
};

export default Checkout;