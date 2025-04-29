// client/src/pages/User/TrackDrug.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDrugByBatch, trackDrug } from '../../services/api';
import { QrReader } from '../../components/qr/QrReader';

export function TrackDrug() {
  const [batchNumber, setBatchNumber] = useState('');
  const [drug, setDrug] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');
  const [location, setLocation] = useState('');
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!batchNumber.trim()) {
      setError('Please enter a batch number');
      return;
    }

    try {
      setLoading(true);
      setError('');
      const data = await getDrugByBatch(batchNumber);
      setDrug(data);
    } catch (err) {
      setError('Drug not found. Please check the batch number.');
      setDrug(null);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async () => {
    if (!status || !location) {
      setError('Please fill all fields');
      return;
    }

    try {
      setLoading(true);
      const updatedDrug = await trackDrug(drug._id, {
        status,
        location,
        handledBy: 'User' // In a real app, you'd use the user's name
      });
      setDrug(updatedDrug);
      setStatus('');
      setLocation('');
    } catch (err) {
      setError('Failed to update drug status');
    } finally {
      setLoading(false);
    }
  };

  const handleScan = (data) => {
    if (data) {
      try {
        const qrData = JSON.parse(data);
        setBatchNumber(qrData.batchNumber);
        handleSearch();
      } catch (err) {
        setError('Invalid QR code data');
      }
    }
  };

  const handleError = (err) => {
    console.error(err);
    setError('Failed to scan QR code');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Track Drug</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Scan QR Code</h2>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
            <QrReader 
              onResult={handleScan}
              onError={handleError}
            />
          </div>
          <p className="mt-4 text-sm text-gray-600">
            Or enter the batch number manually below
          </p>
          <div className="mt-4 flex">
            <input
              type="text"
              value={batchNumber}
              onChange={(e) => setBatchNumber(e.target.value)}
              placeholder="Enter batch number"
              className="flex-grow px-4 py-2 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-primary bg-gray-200 "
            />
            <button
              onClick={handleSearch}
              disabled={loading}
              className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-r disabled:opacity-50"
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {drug ? (
            <div>
              <h2 className="text-xl font-semibold mb-2">Drug Information</h2>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="font-medium">{drug.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Batch Number</p>
                  <p className="font-medium">{drug.batchNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Manufacturer</p>
                  <p className="font-medium">{drug.manufacturer}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Expiry Date</p>
                  <p className="font-medium">
                    {new Date(drug.expiryDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Current Status</p>
                  <p className="font-medium capitalize">{drug.status}</p>
                </div>
              </div>

              <h3 className="text-lg font-semibold mb-2">Update Status</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    New Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Select status</option>
                    <option value="manufactured">Manufactured</option>
                    <option value="distributed">Distributed</option>
                    <option value="dispensed">Dispensed</option>
                    <option value="consumed">Consumed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Enter location"
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <button
                  onClick={handleUpdateStatus}
                  disabled={loading}
                  className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded disabled:opacity-50"
                >
                  {loading ? 'Updating...' : 'Update Status'}
                </button>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-2">Tracking History</h3>
                <div className="space-y-2">
                  {drug.history.map((entry, index) => (
                    <div key={index} className="border-l-4 border-primary pl-4 py-2">
                      <p className="font-medium capitalize">{entry.status}</p>
                      <p className="text-sm text-gray-600">
                        {new Date(entry.date).toLocaleString()} • {entry.location}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">
                {loading ? 'Loading drug information...' : 'Scan a QR code or enter a batch number to track a drug'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}