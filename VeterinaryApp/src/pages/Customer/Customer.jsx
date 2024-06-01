import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoMdAdd } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";

function Customer() {
  const [customer, setCustomer] = useState();
  const [update, setUpdate] = useState(false);
  const [updateCustomer, setUpdateCustomer] = useState({
    name: "",
    address: "",
    city: "",
    email: "",
    phone: "",
  });
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
      .then(setUpdate(false))
      .then(
        setNewCustomer({
          name: "",
          address: "",
          city: "",
          email: "",
          phone: "",
        })
      );
  };

  const handleUpdateCustomerInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateCustomer((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDeleteCustomer = (e) => {
    const id = e.target.id;
    axios
      .delete(import.meta.env.VITE_VET_API_BASEURL + `/api/v1/customers/${id}`)
      .then(() => setUpdate(false));
  };

  const handleUpdateCustomerBtn = (e) => {
    const index = e.target.id;
    setUpdateCustomer({ ...customer[index] });
  };

  const handleUpdateCustomer = () => {
    const { id } = updateCustomer;
    axios
      .put(
        import.meta.env.VITE_VET_API_BASEURL + `/api/v1/customers/${id}`,
        updateCustomer
      )
      .then(() => setUpdate(false))
      .then(
        setUpdateCustomer({
          name: "",
          address: "",
          city: "",
          email: "",
          phone: "",
        })
      );
  };

  useEffect(() => {
    console.log(customer);
  }, [customer]);

  return (
    <div>
      <div>
        <h1 className="text-center mt-6 text-[2rem] font-medium text-white ">
          Müşteriler
        </h1>
        <table className=" rounded-lg  py-2 bg-slate-50  w-11/12 mx-auto mt-8 table-fixed overflow-hidden">
          <thead className=" border h-14 font-extrabold text-slate-400  text-xl ">
            <tr className="">
              <th className=" border w-2/12">İsim</th>
              <th className="border w-2/12">E-posta</th>
              <th className="border w-2/12">Telefon</th>
              <th className="border w-2/12">Adres</th>
              <th className="border w-2/12">Şehir</th>
              <th className="border w-2/12">Sil / Düzenle</th>
            </tr>
          </thead>
          <tbody className="border h-14 font-light text-black  text-xl ">
            {customer?.map((custo, index) => {
              return (
                <tr key={index} className="text-xl bg-white h-10">
                  <td className="border"> {custo.name} </td>
                  <td className="border"> {custo.email} </td>
                  <td className="border"> {custo.phone} </td>
                  <td className="border"> {custo.address} </td>
                  <td className="border"> {custo.city} </td>
                  <td
                    className=" border flex justify-center items-center gap-2 py-3
                   "
                  >
                    <div
                      onClick={handleDeleteCustomer}
                      id={custo.id}
                      className="flex justify-center items-center text-center text-red-500 rounded-md text-xl px-2 bg-red-200 cursor-pointer"
                    >
                      <MdDelete />
                      Sil
                    </div>
                    <div
                      onClick={handleUpdateCustomerBtn}
                      id={index}
                      className="flex justify-center items-center text-center cursor-pointer text-blue-400 rounded-md px-2 text-xl bg-blue-100"
                    >
                      <MdModeEdit />
                      Düzenle
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center items-center gap-16 mt-6">
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
        <div className="bg-slate-400 mt-2 ">
          <h2>Müşteri Güncelle</h2>
          <div className="flex flex-col gap-2 w-44 items-center">
            <input
              type="text"
              name="name"
              value={updateCustomer.name}
              placeholder="Müşteri Adı"
              onChange={handleUpdateCustomerInputChange}
            />{" "}
            <input
              type="text"
              name="phone"
              value={updateCustomer.phone}
              placeholder="Müşteri Telefon"
              onChange={handleUpdateCustomerInputChange}
            />{" "}
            <input
              type="text"
              name="email"
              value={updateCustomer.email}
              placeholder="Müşteri E-mail"
              onChange={handleUpdateCustomerInputChange}
            />{" "}
            <input
              type="text"
              name="address"
              value={updateCustomer.address}
              placeholder="Müşteri Adres"
              onChange={handleUpdateCustomerInputChange}
            />{" "}
            <input
              type="text"
              name="city"
              value={updateCustomer.city}
              placeholder="Şehir"
              onChange={handleUpdateCustomerInputChange}
            />
            <button
              onClick={handleUpdateCustomer}
              className="flex justify-center items-center w-24 p-1 bg-blue-400 gap-2 rounded-lg"
            >
              <div>
                <MdModeEdit />
              </div>
              <div>Güncelle</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Customer;
