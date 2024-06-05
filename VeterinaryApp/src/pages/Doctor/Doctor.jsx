import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";

function Doctor() {
  const initState = {
    workDate: "",
    doctorId: "",
  };
  const [doctor, setDoctor] = useState([]);
  const [update, setUpdate] = useState(false);
  const [updateDoctor, setUpdateDoctor] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
  });
  const [newDoctor, setNewDoctor] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
  });

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_VET_API_BASEURL + "/api/v1/doctors")
      .then((res) => setDoctor(res.data.content))
      .then(() => setUpdate(true));
    axios
      .get(import.meta.env.VITE_VET_API_BASEURL + "/api/v1/available-dates")
      .then((res) => setAvailableDate(res.data.content))
      .then(() => setUpdate(true));
  }, [update]);

  const handleNewDoctorInputChange = (e) => {
    const { name, value } = e.target;
    setNewDoctor((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddNewDoctor = () => {
    axios
      .post(import.meta.env.VITE_VET_API_BASEURL + "/api/v1/doctors", newDoctor)
      .then(setUpdate(false))
      .then(
        setNewDoctor({
          name: "",
          phone: "",
          email: "",
          address: "",
          city: "",
        })
      );
  };

  const handleUpdateDoctor = () => {
    const { id } = updateDoctor;
    axios
      .put(
        import.meta.env.VITE_VET_API_BASEURL + `/api/v1/doctors/${id}`,
        updateDoctor
      )
      .then(() => setUpdate(false))
      .then(
        setUpdateDoctor({
          name: "",
          address: "",
          city: "",
          email: "",
          phone: "",
        })
      );
  };

  const handleUpdateDoctorInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateDoctor((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDeleteDoctor = (e) => {
    const id = e.target.id;
    console.log(id);
    axios
      .delete(import.meta.env.VITE_VET_API_BASEURL + `/api/v1/doctors/${id}`)
      .then(() => setUpdate(false));
  };

  const handleUpdateDoctorBtn = (e) => {
    const index = e.target.id;
    setUpdateDoctor({ ...doctor[index] });
  };

  const [availableDate, setAvailableDate] = useState([]);
  const [newAvailableDate, setNewAvailableDate] = useState({
    ...initState,
  });
  const [updateAvailableDate, setUpdateAvailableDate] = useState({
    ...initState,
  });

  const handleNewAvailableDateInputChange = (e) => {
    const { name, value } = e.target;
    setNewAvailableDate((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDoctorSelectChange = (e) => {
    const id = e.target.value;
    const newdoctor = doctor.find((d) => d.id === +id);
    setNewAvailableDate((prev) => ({
      ...prev,
      doctorId: newdoctor.id,
    }));
    console.log(newdoctor.id);
  };

  const handleNewAvailableDate = () => {
    axios
      .post(
        import.meta.env.VITE_VET_API_BASEURL + "/api/v1/available-dates",
        newAvailableDate
      )
      .then(() => setUpdate(false))
      .then(() => setNewAvailableDate({ ...initState }));
  };

  const handleDeleteAvailableDate = (e) => {
    const id = e.target.id;
    axios
      .delete(
        import.meta.env.VITE_VET_API_BASEURL + `/api/v1/available-dates/${id}`
      )
      .then(() => setUpdate(false));
  };

  const handleUpdateAvailableDateBtn = (e) => {
    const index = e.target.id;
    setUpdateAvailableDate({
      id: availableDate[index].id,
      workDate: availableDate[index].workDay,
      doctorId: availableDate[index].doctor.id,
    });
    console.log(updateAvailableDate);
  };

  const handleUpdateAvailableDate = () => {
    const { id } = updateAvailableDate;
    axios
      .put(
        import.meta.env.VITE_VET_API_BASEURL + `/api/v1/available-dates/${id}`,
        updateAvailableDate
      )
      .then(() => setUpdate(false));
  };

  const handleUpdateAvailableDateInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateAvailableDate((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateDoctorSelectChange = (e) => {
    const id = e.target.value;
    setUpdateAvailableDate((prev) => ({
      ...prev,
      doctorId: parseInt(id),
    }));
  };

  return (
    <div>
      <h1 className="text-white text-2xl text-center mt-4">Doktorlar</h1>
      <div>
        <div className="flex text-right justify-end mr-24 mt-2 gap-1">
          <label htmlFor="" className="flex justify-center items-center gap-2">
            <h2 className="text-white text-xl">Doktor ID</h2>
            <input
              type="text"
              placeholder="Doktor ID"
              className="py-1 rounded-md pl-2"
            />
          </label>
          <button className="bg-yellow-400 rounded-md px-2 ">Ara</button>
        </div>
      </div>
      <div>
        <table className=" rounded-lg  py-5 bg-slate-50  w-11/12 mx-auto mt-8 table-fixed overflow-hidden">
          <thead className=" border h-14 font-extrabold text-slate-400  text-xl ">
            <tr className="">
              <th className=" border w-12">ID</th>
              <th className=" border w-2/12">İsim</th>
              <th className="border w-2/12">E-posta</th>
              <th className="border w-2/12">Telefon</th>
              <th className="border w-2/12">Adres</th>
              <th className="border w-2/12">Şehir</th>
              <th className="border w-2/12">Sil / Düzenle</th>
            </tr>
          </thead>
          <tbody className="border h-14 font-light text-black  text-xl ">
            {doctor?.map((doc, index) => {
              return (
                <tr key={index} className="text-xl bg-white h-10">
                  <td className="border"> {doc.id} </td>
                  <td className="border"> {doc.name} </td>
                  <td className="border"> {doc.email} </td>
                  <td className="border"> {doc.phone} </td>
                  <td className="border"> {doc.address} </td>
                  <td className="border"> {doc.city} </td>
                  <td
                    className=" border flex justify-center items-center gap-2 py-3
                   "
                  >
                    <div
                      onClick={handleDeleteDoctor}
                      id={doc.id}
                      className="flex justify-center items-center text-center text-red-500 rounded-md text-xl px-2 bg-red-200 cursor-pointer"
                    >
                      <MdDelete />
                      Sil
                    </div>
                    <div
                      onClick={handleUpdateDoctorBtn}
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
      <div className="flex justify-evenly mt-4 py-3 w-10/12 mx-auto backdrop-blur-[6px] bg-white/15 rounded-md ">
        <div className=" mt-2 py-2 px-2 rounded-lg  ">
          <h2 className="text-center mb-1 text-white text-xl">Doktor Ekle</h2>
          <div className=" flex flex-col gap-2 w-44 items-center">
            <input
              className="rounded-sm px-1 py-1"
              type="text"
              name="name"
              value={newDoctor.name}
              placeholder="Doktor Adı"
              onChange={handleNewDoctorInputChange}
            />{" "}
            <input
              className="rounded-sm px-1 py-1"
              type="text"
              name="phone"
              value={newDoctor.phone}
              placeholder="Doktor Telefon"
              onChange={handleNewDoctorInputChange}
            />{" "}
            <input
              className="rounded-sm px-1 py-1"
              type="text"
              name="email"
              value={newDoctor.email}
              placeholder="Doktor E-mail"
              onChange={handleNewDoctorInputChange}
            />{" "}
            <input
              className="rounded-sm px-1 py-1"
              type="text"
              name="address"
              value={newDoctor.address}
              placeholder="Doktor Adres"
              onChange={handleNewDoctorInputChange}
            />{" "}
            <input
              className="rounded-sm px-1 py-1"
              type="text"
              name="city"
              newDoctor
              value={newDoctor.city}
              placeholder="Şehir"
              onChange={handleNewDoctorInputChange}
            />
            <button
              onClick={handleAddNewDoctor}
              className="flex justify-center items-center w-24 p-1 bg-green-400 gap-2 rounded-lg"
            >
              <div>
                <IoMdAdd />
              </div>
              <div>Ekle</div>
            </button>
          </div>
        </div>
        <div className="rounded-lg mt-2   py-2 px-2   ">
          <h2 className="text-center mb-1 text-white text-xl">
            Doktor Güncelle
          </h2>
          <div className="flex flex-col gap-2 w-44 items-center">
            <input
              className="rounded-sm px-1 py-1"
              type="text"
              name="name"
              value={updateDoctor.name}
              updateDoctor
              placeholder="Doktor Adı"
              onChange={handleUpdateDoctorInputChange}
            />{" "}
            <input
              className="rounded-sm px-1 py-1"
              type="text"
              name="phone"
              value={updateDoctor.phone}
              placeholder="Doktor Telefon"
              onChange={handleUpdateDoctorInputChange}
            />{" "}
            <input
              className="rounded-sm px-1 py-1"
              type="text"
              name="email"
              value={updateDoctor.email}
              placeholder="Doktor E-mail"
              onChange={handleUpdateDoctorInputChange}
            />{" "}
            <input
              className="rounded-sm px-1 py-1"
              type="text"
              name="address"
              value={updateDoctor.address}
              placeholder="Doktor Adres"
              onChange={handleUpdateDoctorInputChange}
            />{" "}
            <input
              className="rounded-sm px-1 py-1"
              type="text"
              name="city"
              newDoctor
              value={updateDoctor.city}
              placeholder="Şehir"
              onChange={handleUpdateDoctorInputChange}
            />
            <button
              onClick={handleUpdateDoctor}
              className="flex justify-center items-center w-24 p-1 bg-green-400 gap-2 rounded-lg"
            >
              <div>
                <MdModeEdit />
              </div>
              <div>Güncelle</div>
            </button>
          </div>
        </div>
      </div>
      <div>
        <h1 className="text-white text-center text-2xl mt-5">
          Müsait Gün Yönetimi
        </h1>
        <div className="flex text-right justify-end mr-24 mt-2 gap-1">
          <label htmlFor="" className="flex justify-center items-center gap-2">
            <h2 className="text-white text-xl">Gün ID</h2>
            <input
              type="text"
              placeholder="Gün ID"
              className="py-1 rounded-md pl-2"
            />
          </label>
          <button className="bg-yellow-400 rounded-md px-2 ">Ara</button>
        </div>

        <div>
          <table className=" rounded-lg  py-5 bg-slate-50  w-11/12 mx-auto mt-8 table-fixed overflow-hidden">
            <thead className=" border h-14 font-extrabold text-slate-400  text-xl ">
              <tr className="">
                <th className=" border w-2/12">İsim</th>
                <th className="border w-2/12">Tarih</th>
                <th className="border w-2/12">E-posta</th>
                <th className="border w-2/12">Telefon</th>
                <th className="border w-2/12">Sil / Düzenle</th>
              </tr>
            </thead>
            <tbody className="border h-14 font-light text-black  text-xl ">
              {availableDate?.map((available, index) => {
                return (
                  <tr key={index} className="text-xl bg-white h-10">
                    <td className="border"> {available.doctor.name} </td>
                    <td className="border"> {available.workDay} </td>
                    <td className="border"> {available.doctor.email} </td>
                    <td className="border"> {available.doctor.phone} </td>
                    <td
                      className=" border flex justify-center items-center gap-2 py-3
                   "
                    >
                      <div
                        onClick={handleDeleteAvailableDate}
                        id={available.id}
                        className="flex justify-center items-center text-center text-red-500 rounded-md text-xl px-2 bg-red-200 cursor-pointer"
                      >
                        <MdDelete />
                        Sil
                      </div>
                      <div
                        onClick={handleUpdateAvailableDateBtn}
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
        <div className="backdrop-blur-[6px] bg-white/15 flex justify-evenly rounded-md w-10/12 mx-auto mb-8 mt-4 ">
          <div className="flex gap-3 backdrop-blur-[6px] bg-white/10 rounded-md items-center px-4 py-5">
            <h1 className="text-white text-xl">Tarih Ekle</h1>
            <div className="">
              <input
                className="rounded-sm px-1 py-1"
                type="date"
                name="workDate"
                value={newAvailableDate.workDate}
                placeholder="Tarih"
                onChange={handleNewAvailableDateInputChange}
              />{" "}
              <select
                name="doctorId"
                id="doctorSelect"
                className="py-1 rounded-sm"
                value={newAvailableDate.doctorId || ""}
                onChange={handleDoctorSelectChange}
              >
                {doctor?.map((doc) => (
                  <option value={doc.id} key={doc.id}>
                    {doc.name}
                  </option>
                ))}
              </select>
              <button
                className=" bg-green-500 rounded-md px-2 py-[6px] ml-1"
                onClick={handleNewAvailableDate}
              >
                Tarih Ekle
              </button>
            </div>
          </div>
          <div className="flex gap-3 backdrop-blur-[6px] bg-white/10 rounded-md items-center px-4 py-5">
            <h1 className="text-white text-xl">Tarih Güncelle</h1>
            <div className="">
              <input
                className="rounded-sm px-1 py-1"
                type="date"
                name="workDate"
                value={updateAvailableDate.workDate}
                placeholder="Tarih"
                onChange={handleUpdateAvailableDateInputChange}
              />{" "}
              <select
                name="doctorId"
                id="doctorSelect"
                className="py-1 rounded-sm"
                value={updateAvailableDate?.doctorId || ""}
                onChange={handleUpdateDoctorSelectChange}
              >
                {doctor?.map((doc, index) => (
                  <option value={doc.id} key={doc.id} id={index}>
                    {doc.name}
                  </option>
                ))}
              </select>
              <button
                onClick={handleUpdateAvailableDate}
                className=" bg-blue-400 rounded-md px-2 py-[6px] ml-1"
              >
                Tarih Güncelle
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Doctor;
