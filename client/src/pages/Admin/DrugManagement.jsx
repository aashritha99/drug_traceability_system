// client/src/pages/Admin/DrugManagement.jsx
import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getDrugs, createDrug, updateDrug, deleteDrug } from '../../services/api';
import { QRCode } from 'react-qr-code';
import { Modal } from '../../components/common/Modal';
import { DrugForm } from '../../components/drugs/DrugForm';

export function DrugManagement() {
  const { currentUser } = useAuth();
  const [drugs, setDrugs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDrug, setCurrentDrug] = useState(null);
  const [qrData, setQrData] = useState(null);

  useEffect(() => {
    const fetchDrugs = async () => {
      try {
        const data = await getDrugs();
        setDrugs(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch drugs');
        setLoading(false);
      }
    };

    fetchDrugs();
  }, []);

  const handleCreate = async (drugData) => {
    try {
      const newDrug = await createDrug(drugData);
      setDrugs([...drugs, newDrug]);
      setIsModalOpen(false);
    } catch (err) {
      setError('Failed to create drug');
    }
  };

  const handleUpdate = async (id, drugData) => {
    try {
      const updatedDrug = await updateDrug(id, drugData);
      setDrugs(drugs.map(drug => drug._id === id ? updatedDrug : drug));
      setIsModalOpen(false);
      setCurrentDrug(null);
    } catch (err) {
      setError('Failed to update drug');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDrug(id);
      setDrugs(drugs.filter(drug => drug._id !== id));
    } catch (err) {
      setError('Failed to delete drug');
    }
  };

  const generateQR = (drug) => {
    setQrData({
      id: drug._id,
      name: drug.name,
      batchNumber: drug.batchNumber
    });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Drug Management</h1>
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Batch</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Manufacturer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiry</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {drugs.map((drug) => (
              <tr key={drug._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{drug.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{drug.batchNumber}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{drug.manufacturer}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(drug.expiryDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => generateQR(drug)}
                    className="text-blue-600 hover:text-blue-900 mr-3"
                  >
                    QR Code
                  </button>
                  <button
                    onClick={() => {
                      setCurrentDrug(drug);
                      setIsModalOpen(true);
                    }}
                    className="text-green-600 hover:text-green-900 mr-3"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(drug._id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <DrugForm
          drug={currentDrug}
          onSubmit={currentDrug ? (data) => handleUpdate(currentDrug._id, data) : handleCreate}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>

      {qrData && (
        <Modal isOpen={!!qrData} onClose={() => setQrData(null)}>
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">QR Code for {qrData.name}</h2>
            <div className="flex justify-center mb-4">
              <QRCode 
                value={JSON.stringify(qrData)} 
                size={256} 
                level="H" 
              />
            </div>
            <p className="text-sm text-gray-600 mb-2">Batch: {qrData.batchNumber}</p>
            <button
              onClick={() => setQrData(null)}
              className="mt-4 bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}