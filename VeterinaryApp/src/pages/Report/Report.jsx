import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoMdAdd } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";

function Report() {
  const [report, setReport] = useState([]);
  const [appointment, setAppointment] = useState([]);
  const [update, setUpdate] = useState(false);
  const [newReport, setNewReport] = useState({
    title: "",
    diagnosis: "",
    price: 0,
    appointmentId: "",
  });
  const [updateReport, setUpdateReport] = useState({
    title: "",
    diagnosis: "",
    price: 0,
    appointmentId: "",
  });

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_VET_API_BASEURL + "/api/v1/reports")
      .then((res) => setReport(res.data.content))
      .then(() => setUpdate(true));
    axios
      .get(import.meta.env.VITE_VET_API_BASEURL + "/api/v1/appointments")
      .then((res) => setAppointment(res.data.content))
      .then(() => setUpdate(true));
  }, [update]);

  const handleNewReportInputChange = (e) => {
    const { name, value } = e.target;
    setNewReport((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNewAppointmentSelectChange = (e) => {
    const value = e.target.value;
    const newappo = appointment.find((d) => d.id === +value);
    setNewReport((prev) => ({
      ...prev,
      appointmentId: newappo.id,
    }));
    console.log(newReport);
  };
  const handleNewReport = () => {
    axios
      .post(import.meta.env.VITE_VET_API_BASEURL + "/api/v1/reports", newReport)
      .then(setUpdate(false))
      .then(
        setNewReport({
          title: "",
          diagnosis: "",
          price: 0,
          appointment: {},
        })
      );
  };

  // delete işlemleri
  const handleDeleteReport = () => {};

  // update işelmleri
  const handleUpdateBtn = () => {};

  return (
    <div>
      <h1 className="text-white text-center text-2xl mt-2">Rapor Yönetimi</h1>
      <div className="flex text-right justify-end mr-24 mt-2 gap-1">
        <label htmlFor="" className="flex justify-center items-center gap-2">
          <h2 className="text-white text-xl">Rapor ID</h2>
          <input
            type="text"
            placeholder="Rapor ID"
            className="py-1 rounded-md pl-2"
          />
        </label>
        <button className="bg-yellow-400 rounded-md px-2 ">Ara</button>
      </div>

      <div className="  backdrop-blur-[6px] bg-white/15 flex justify-evenly rounded-md w-10/12 mx-auto mb-8 mt-4">
        <div className="ml-2 mb-2">
          <div className="px-12  backdrop-blu-[px] bg-white/10 rounded-md pb-3 ">
            <h2 className="mt-2 text-center text-white text-lg mb-1">
              Rapor Ekle
            </h2>
            <div className="flex flex-col gap-2 w-44 items-center">
              <label htmlFor="">
                <h2 className="text-white">Rapor Başlığı</h2>
                <input
                  className="rounded-sm px-1 py-1"
                  type="text"
                  name="title"
                  value={newReport.title}
                  placeholder="Rapor Başlığı"
                  onChange={handleNewReportInputChange}
                />
              </label>
              <label htmlFor="">
                <h2 className="text-white">Teşhis</h2>
                <input
                  className="rounded-sm px-1 py-1"
                  type="text"
                  name="diagnosis"
                  value={newReport.diagnosis}
                  placeholder="Teşhis"
                  onChange={handleNewReportInputChange}
                />
              </label>
              <label htmlFor="">
                <h2 className="text-white">Ücret</h2>
                <input
                  className="rounded-sm px-1 py-1"
                  type="text"
                  name="price"
                  value={newReport.price}
                  placeholder="Ücreti"
                  onChange={handleNewReportInputChange}
                />
              </label>
              <div className=" w-12/12">
                <h2 className="text-white">Randevu</h2>
                <select
                  name="appointmentId"
                  className="rounded-sm px-8 py-1"
                  onChange={handleNewAppointmentSelectChange}
                  value={newReport?.appointmentId || ""}
                >
                  <option value="">Randevu Seç</option>
                  {appointment.map((app, index) => (
                    <option value={app.id} key={app.id} id={index}>
                      ID : {app.id}
                    </option>
                  ))}
                </select>
              </div>

              <button
                className="flex justify-center items-center w-24 p-1 bg-green-400 gap-2 rounded-lg"
                onClick={handleNewReport}
              >
                <div>
                  <IoMdAdd />
                </div>
                <div>Ekle</div>
              </button>
            </div>
          </div>
          {/* <div className="px-12  backdrop-blu-[px] bg-white/10 rounded-md pb-3 ">
            <h2 className="mt-2 text-center text-white text-lg mb-1">
              Randevu Güncelle
            </h2>
            <div className="flex flex-col gap-2 w-44 items-center">
              <label htmlFor="">
                <h2 className="text-white">Tarih</h2>
                <input
                  className="rounded-sm px-1 py-1 w-12/12"
                  type="datetime-local"
                  name="appointmentDate"
                  placeholder="Tarih"
                  value={updateAppointment.appointmentDate}
                  onChange={handleUpdateDateChange}
                />
              </label>
              <div className=" w-12/12">
                <h2 className="text-white">Doktor </h2>
                <select
                  name="doctor"
                  className="rounded-sm px-8 py-1
                "
                  value={updateAppointment.doctor.id || ""}
                  onChange={handleUpdateDoctorSelectChange}
                >
                  <option value="">Doktor Seç</option>
                  {doctor.map((doc, index) => (
                    <option key={doc.id} value={doc.id}>
                      {doc.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className=" w-12/12">
                <h2 className="text-white">Hayvan </h2>
                <select
                  value={updateAppointment.animal.id || ""}
                  name="doctor"
                  className="rounded-sm px-8 py-1"
                  onChange={handleUpdateAnimalSelectChange}
                >
                  <option value="">Hayvan Seç</option>
                  {animal.map((ani, index) => (
                    <option value={ani.id} key={ani.id}>
                      {ani.name}
                    </option>
                  ))}
                </select>
              </div>
              <button
                onClick={handleUpdateAppointment}
                className="flex justify-center items-center w-24 p-1 bg-blue-400 gap-2 rounded-lg"
              >
                <div>
                  <MdModeEdit />
                </div>
                <div>Güncelle</div>
              </button>
            </div>
          </div> */}
        </div>

        <div>
          <table className=" rounded-lg  py-5 bg-slate-50  w-11/12 mx-auto mt-8 table-fixed overflow-hidden">
            <thead className=" border h-14 font-extrabold text-slate-400  text-xl ">
              <tr className="">
                <th className=" border w-2/12">Rapor Başlık</th>
                <th className=" border w-2/12">Hayvan Adı</th>
                <th className=" border w-2/12">Teşhis</th>
                <th className="border w-2/12">Doktor Adı</th>
                <th className="border w-2/12">Müşteri</th>
                <th className="border w-2/12">Aşı</th>
                <th className="border w-2/12">Ücret</th>
                <th className="border w-3/12">Sil / Düzenle</th>
              </tr>
            </thead>
            <tbody className="border h-14 font-light text-black  text-xl ">
              {report?.map((rep, index) => {
                return (
                  <tr key={index} className="text-xl bg-white h-10">
                    <td className="border"> {rep.title} </td>

                    <td
                      className=" border flex justify-center items-center gap-2 py-3
                   "
                    >
                      <div
                        onClick={handleDeleteReport}
                        id={rep.id}
                        className="flex justify-center items-center text-center text-red-500 rounded-md text-xl px-2 bg-red-200 cursor-pointer"
                      >
                        <MdDelete />
                        Sil
                      </div>
                      <div
                        onClick={handleUpdateBtn}
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
      </div>
    </div>
  );
}

export default Report;
