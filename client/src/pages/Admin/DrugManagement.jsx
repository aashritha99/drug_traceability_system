import { useState, useEffect } from "react";
import { QRCode } from "react-qr-code";
import { Modal } from "../../components/common/Modal";
import { DrugForm } from "../../components/drugs/DrugForm";
import { FaQrcode, FaEdit, FaTrash, FaHistory } from "react-icons/fa";

export function DrugManagement() {
  const [drugs, setDrugs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDrug, setCurrentDrug] = useState(null);
  const [qrData, setQrData] = useState(null);
  const [historyData, setHistoryData] = useState(null);

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

  if (loading) return <div className="text-center py-8">Loading drugs...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-300">Drug Management</h1>
        <button
          onClick={() => {
            setCurrentDrug(null);
            setIsModalOpen(true);
          }}
          className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded"
        >
          Add New Drug
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Batch
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Manufacturer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Expiry Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {drugs.map((drug) => (
              <tr key={drug._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {drug.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {drug.batchNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {drug.manufacturer}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(drug.expiryDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleViewQR(drug)}
                      className="text-blue-600 hover:text-blue-800 p-1"
                      title="View QR Code"
                    >
                      <FaQrcode size={18} />
                    </button>
                    <button
                      onClick={() => {
                        setCurrentDrug(drug);
                        setIsModalOpen(true);
                      }}
                      className="text-green-600 hover:text-green-800 p-1"
                      title="Edit"
                    >
                      <FaEdit size={18} />
                    </button>
                    <button
                      onClick={() => handleViewHistory(drug)}
                      className="text-purple-600 hover:text-purple-800 p-1"
                      title="View History"
                    >
                      <FaHistory size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(drug._id)}
                      className="text-red-600 hover:text-red-800 p-1"
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
        <DrugForm
          drug={currentDrug}
          onSubmit={
            currentDrug
              ? (data) => handleUpdate(currentDrug._id, data)
              : handleCreate
          }
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>

      {/* QR Code Modal */}
      {qrData && (
        <Modal isOpen={!!qrData} onClose={() => setQrData(null)}>
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">
              QR Code for {qrData.name}
            </h2>
            <div className="flex justify-center mb-4">
              {qrData.qrCode ? (
                <img src={qrData.qrCode} alt="QR Code" className="w-64 h-64" />
              ) : (
                <QRCode
                  value={JSON.stringify({
                    id: qrData.id,
                    name: qrData.name,
                    batchNumber: qrData.batchNumber,
                  })}
                  size={256}
                  level="H"
                />
              )}
            </div>
            <div className="space-y-2 mb-4">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Batch:</span> {qrData.batchNumber}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Drug ID:</span> {qrData.id}
              </p>
            </div>
            <button
              onClick={() => setQrData(null)}
              className="w-full mt-4 bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </Modal>
      )}

      {/* History Modal */}
      {historyData && (
        <Modal isOpen={!!historyData} onClose={() => setHistoryData(null)}>
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">
              History for {historyData.name}
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Batch: {historyData.batchNumber}
            </p>

            {historyData.history.length > 0 ? (
              <div className="space-y-4">
                {historyData.history.map((item, index) => (
                  <div key={index} className="border-b pb-2">
                    <p className="font-medium">{item.status}</p>
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
              <p className="text-gray-500">No history available</p>
            )}

            <button
              onClick={() => setHistoryData(null)}
              className="w-full mt-4 bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
