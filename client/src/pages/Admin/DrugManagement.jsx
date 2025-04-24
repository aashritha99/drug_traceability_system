import { useState, useEffect } from "react";
import { QRCode } from "react-qr-code";
import { Modal } from "../../components/common/Modal";
import { DrugForm } from "../../components/drugs/DrugForm";
import {
  FaQrcode,
  FaEdit,
  FaTrash,
  FaHistory,
  FaArrowLeft,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export function DrugManagement() {
  const navigate = useNavigate();
  const [drugs, setDrugs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDrug, setCurrentDrug] = useState(null);
  const [qrData, setQrData] = useState(null);
  const [historyData, setHistoryData] = useState(null);

  // ... [keep all your existing logic functions exactly the same] ...

  const fetchDrugs = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/drugs/all", {
        headers: {
          Authorization: `${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch drugs");
      }

      const data = await response.json();
      console.log(data.Drugs);
      setDrugs(data.Drugs || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createDrug = async (drugData) => {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:5000/api/drugs/addDrug", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify(drugData),
    });

    if (!response.ok) {
      throw new Error("Failed to create drug");
    }

    return await response.json();
  };

  const updateDrug = async (id, drugData) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:5000/api/drugs/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify(drugData),
    });

    if (!response.ok) {
      throw new Error("Failed to update drug");
    }

    return await response.json();
  };

  const deleteDrug = async (id) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:5000/api/drugs/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete drug");
    }
  };

  useEffect(() => {
    fetchDrugs();
  }, []);

  const handleCreate = async (drugData) => {
    try {
      const response = await createDrug(drugData);
      if (response.success) {
        setDrugs([...drugs, response.Drug]);
        setIsModalOpen(false);
      } else {
        setError(response.message || "Failed to create drug");
      }
    } catch (err) {
      setError(err.message || "Failed to create drug");
    }
  };

  const handleUpdate = async (id, drugData) => {
    try {
      const response = await updateDrug(id, drugData);
      if (response.success) {
        setDrugs(drugs.map((drug) => (drug._id === id ? response.Drug : drug)));
        setIsModalOpen(false);
        setCurrentDrug(null);
      } else {
        setError(response.message || "Failed to update drug");
      }
    } catch (err) {
      setError(err.message || "Failed to update drug");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDrug(id);
      setDrugs(drugs.filter((drug) => drug._id !== id));
    } catch (err) {
      setError(err.message || "Failed to delete drug");
    }
  };

  const handleViewQR = (drug) => {
    setQrData({
      id: drug._id,
      name: drug.name,
      batchNumber: drug.batchNumber,
      qrCode: drug.qrCode,
    });
  };

  const handleViewHistory = (drug) => {
    setHistoryData({
      name: drug.name,
      batchNumber: drug.batchNumber,
      history: drug.history || [],
    });
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <button
          onClick={() => navigate("/admin")}
          className="flex items-center space-x-2 text-gray-400 hover:text-primary transition-colors"
        >
          <FaArrowLeft />
          <span>Back to Admin</span>
        </button>
        <h1 className="text-3xl font-bold text-gray-800">Drug Management</h1>
        <button
          onClick={() => {
            setCurrentDrug(null);
            setIsModalOpen(true);
          }}
          className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg shadow-md transition-colors"
        >
          Add New Drug
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
          <p>{error}</p>
        </div>
      )}

      <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Batch
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Manufacturer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Expiry Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {drugs.map((drug) => (
              <tr key={drug._id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {drug.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {drug.batchNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {drug.manufacturer}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {new Date(drug.expiryDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleViewQR(drug)}
                      className="text-blue-500 hover:text-blue-700 p-1 transition-colors"
                      title="View QR Code"
                    >
                      <FaQrcode size={18} />
                    </button>
                    <button
                      onClick={() => {
                        setCurrentDrug(drug);
                        setIsModalOpen(true);
                      }}
                      className="text-green-500 hover:text-green-700 p-1 transition-colors"
                      title="Edit"
                    >
                      <FaEdit size={18} />
                    </button>
                    <button
                      onClick={() => handleViewHistory(drug)}
                      className="text-purple-500 hover:text-purple-700 p-1 transition-colors"
                      title="View History"
                    >
                      <FaHistory size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(drug._id)}
                      className="text-red-500 hover:text-red-700 p-1 transition-colors"
                      title="Delete"
                    >
                      <FaTrash size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Drug Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="bg-white p-6 rounded-lg max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {currentDrug ? "Edit Drug" : "Add New Drug"}
          </h2>
          <DrugForm
            drug={currentDrug}
            onSubmit={
              currentDrug
                ? (data) => handleUpdate(currentDrug._id, data)
                : handleCreate
            }
            onCancel={() => setIsModalOpen(false)}
          />
        </div>
      </Modal>

      {/* QR Code Modal */}
      {qrData && (
        <Modal isOpen={!!qrData} onClose={() => setQrData(null)}>
          <div className="bg-white p-6 rounded-lg max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              QR Code for {qrData.name}
            </h2>
            <div className="flex justify-center mb-6">
              {qrData.qrCode ? (
                <img
                  src={qrData.qrCode}
                  alt="QR Code"
                  className="w-64 h-64 border-4 border-white shadow-md"
                />
              ) : (
                <div className="border-4 border-white shadow-md">
                  <QRCode
                    value={JSON.stringify({
                      id: qrData.id,
                      name: qrData.name,
                      batchNumber: qrData.batchNumber,
                    })}
                    size={256}
                    level="H"
                  />
                </div>
              )}
            </div>
            <div className="space-y-3 mb-6">
              <p className="text-sm text-gray-700">
                <span className="font-medium">Batch:</span> {qrData.batchNumber}
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-medium">Drug ID:</span> {qrData.id}
              </p>
            </div>
            <button
              onClick={() => setQrData(null)}
              className="w-full bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg shadow transition-colors"
            >
              Close
            </button>
          </div>
        </Modal>
      )}

      {/* History Modal */}
      {historyData && (
        <Modal isOpen={!!historyData} onClose={() => setHistoryData(null)}>
          <div className="bg-white p-6 rounded-lg max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              History for {historyData.name}
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              Batch: {historyData.batchNumber}
            </p>

            {historyData.history.length > 0 ? (
              <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                {historyData.history.map((item, index) => (
                  <div key={index} className="border-b border-gray-200 pb-3">
                    <p className="font-medium text-gray-800">{item.status}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(item.changedAt).toLocaleString()}
                    </p>
                    {item.notes && (
                      <p className="text-sm text-gray-600 mt-1">{item.notes}</p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">
                No history available
              </p>
            )}

            <button
              onClick={() => setHistoryData(null)}
              className="w-full mt-6 bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg shadow transition-colors"
            >
              Close
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
