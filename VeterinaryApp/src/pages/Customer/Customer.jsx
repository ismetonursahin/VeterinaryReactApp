import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoMdAdd } from "react-icons/io";

function Customer() {
  const [customer, setCustomer] = useState();
  const [update, setUpdate] = useState(false);
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
      .then((res) => setCustomer(res.data.content))
      .then(() => setUpdate(true));
  }, [update]);

  const handleNewCustomerInputChange = (e) => {
    const { name, value } = e.target;
    setNewCustomer((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddNewCustomer = () => {
    axios
      .post(
        import.meta.env.VITE_VET_API_BASEURL + "/api/v1/customers",
        newCustomer
      )
      .then(setUpdate(false));
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
      <div className="bg-slate-400 mt-2 ">
        <h2>Müşteri Ekle</h2>
        <div className="flex flex-col gap-2 w-44 items-center">
          <input
            type="text"
            name="name"
            value={newCustomer.name}
            placeholder="Müşteri Adı"
            onChange={handleNewCustomerInputChange}
          />{" "}
          <input
            type="text"
            name="phone"
            value={newCustomer.phone}
            placeholder="Müşteri Telefon"
            onChange={handleNewCustomerInputChange}
          />{" "}
          <input
            type="text"
            name="email"
            value={newCustomer.email}
            placeholder="Müşteri E-mail"
            onChange={handleNewCustomerInputChange}
          />{" "}
          <input
            type="text"
            name="address"
            value={newCustomer.address}
            placeholder="Müşteri Adres"
            onChange={handleNewCustomerInputChange}
          />{" "}
          <input
            type="text"
            name="city"
            value={newCustomer.city}
            placeholder="Şehir"
            onChange={handleNewCustomerInputChange}
          />
          <button
            onClick={handleAddNewCustomer}
            className="flex justify-center items-center w-24 p-1 bg-green-400 gap-2 rounded-lg"
          >
            <div>
              <IoMdAdd />
            </div>
            <div>Ekle</div>
          </button>
        </div>
      </div>
      {newCustomer.name}
    </div>
  );
}

export default Customer;
