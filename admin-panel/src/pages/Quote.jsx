import axios from "axios";
import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";

function AdminQuotes() {
  const [quotes, setQuotes] = useState([]);
  const [editingRemarkId, setEditingRemarkId] = useState(null);
  const [newRemark, setNewRemark] = useState("");
  const Save = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/quotes", {
        remark: newRemark,
      });
      console.log("Saved remark:", response.data);
      alert("Remark saved successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to save remark");
    }
  };

  const fetchQuotes = async () => {
    const res = await axios.get("http://localhost:5000/api/quotes");
    setQuotes(res.data);
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/quotes")
      .then((res) => setQuotes(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleEditRemark = (quote) => {
    setEditingRemarkId(quote._id);
    setNewRemark(quote.remark || "");
  };

  const handleSaveRemark = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/quotes/${id}/remark`, {
        remark: newRemark,
      });
      setEditingRemarkId(null);
      fetchQuotes();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/api/quotes/${id}`)
      .then(() => {
        setQuotes(quotes.filter((q) => q._id !== id));
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Sidebar />
      <div className="p-5 pt-10 lg:ml-70 bg-[#1E1E1E] overflow-x-auto text-white min-h-screen">
        <h2 className="text-xl mb-4">All Quotes</h2>

        <table className="md:w-full border   bg-[#1E1E1E] text-white">
          <thead>
            <tr className=" bg-[#1E1E1E] text-white">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Service</th>
              <th className="p-2 border">Phone No</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Message</th>
              <th className="p-2 border">Remark</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>

          <tbody>
            {quotes.map((q) => (
              <tr key={q._id}>
                <td className="p-2 border">{q.name}</td>
                <td className="p-2 border">{q.service}</td>
                <td className="p-2 border">{q.phone}</td>
                <td className="p-2 border">{q.email}</td>

                <td className="p-2 border">{q.message}</td>
                <td className="p-2 border w-55 ">
                  {editingRemarkId === q._id ? (
                    <>
                      <input
                        type="text"
                        className="bg-white text-black p-3"
                        placeholder="Remark"
                        value={newRemark}
                        onChange={(e) => setNewRemark(e.target.value)}
                      />

                      <button
                        onClick={() => handleSaveRemark(q._id)}
                        className="p-2 mr-2 mt-2 bg-blue-600 rounded-md"
                      >
                        Save
                      </button>
                    </>
                  ) : (
                    <>
                      <p>{q.remark || "No remark"}</p>

                      <button
                        onClick={() => handleEditRemark(q)}
                        className="p-2 bg-blue-600 rounded-md"
                      >
                        Edit
                      </button>
                    </>
                  )}
                </td>

                <td className="p-2 border ">
                  <button
                    onClick={() => {
                      if (
                        window.confirm("Are you sure you want to delete this?")
                      ) {
                        handleDelete(q._id);
                      }
                    }}
                    className="p-2 bg-amber-600 rounded-md mr-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default AdminQuotes;
