import React, { useEffect, useState } from "react";
import axios from "axios";

function Customer() {
  const [customer, setCustomer] = useState();
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    address: "",
    city: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_VET_API_BASEURL + "/api/v1/customers")
      .then((res) => setCustomer(res.data.content));
  }, []);

  const handleNewCustomerInputChange = (e) => {
    const { name, value } = e.target;
    setNewCustomer((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    console.log(customer);
  }, [customer]);

  return (
    <div>
      <div>
        <h1>Müşteriler</h1>
        <div className="bg-slate-500">
          {customer?.map((custo, index) => (
            <p key={index}>{custo.name}</p>
          ))}
        </div>
      </div>
      <div>
        <h2>Müşteri Ekle</h2>
        <input
          type="text"
          name="name"
          value={newCustomer.name}
          placeholder="Müşteri Adı"
          onChange={handleNewCustomerInputChange}
        />
      </div>
    </div>
  );
}

export default Customer;
