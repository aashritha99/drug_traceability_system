import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { QrReader } from "../../components/qr/QrReader";

export function ScanDrug() {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleScan = async (data) => {
    if (data) {
      try {
        const qrData = JSON.parse(data);
        if (qrData.drugId) {
          navigate(`/user/drug/${qrData.drugId}`);
        } else {
          setError("Invalid QR code format");
        }
      } catch (err) {
        setError("Failed to read QR code data");
      }
    }
  };

  const handleError = (err) => {
    console.error(err);
    setError("Failed to scan QR code");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Scan Drug QR Code
      </h1>

      <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 mb-4">
          <QrReader onResult={handleScan} onError={handleError} />
        </div>

        <p className="text-center text-gray-600 mb-6">
          Point your camera at the drug's QR code to scan
        </p>

        <div className="text-center">
          <button
            onClick={() => navigate("/user/track")}
            className="text-primary hover:text-primary-dark font-medium"
          >
            Or search by batch number instead
          </button>
        </div>
      </div>
    </div>
  );
}
