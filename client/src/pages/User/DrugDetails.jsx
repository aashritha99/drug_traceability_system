import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaHistory } from "react-icons/fa";

export function DrugDetails() {
  const { drugId } = useParams();
  const navigate = useNavigate();
  const [drug, setDrug] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDrugDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `http://localhost:5000/api/drugs/qr/${drugId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Drug not found");
        }

        const data = await response.json();
        console.log(data.drug.manufacturer);
        setDrug(data.drug);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDrugDetails();
  }, [drugId]);

  console.log(drug);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          <p className="mt-4 text-gray-600">Loading drug details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
        <button
          onClick={() => navigate("/user")}
          className="text-primary hover:text-primary-dark font-medium"
        >
          Back to dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 hover:text-gray-800 mb-6"
      >
        <FaArrowLeft className="mr-2" />
        Back
      </button>

      <div className="bg-white rounded-xl text-black shadow-md overflow-hidden">
        <div className="p-6 bg-primary text-black">
          <h1 className="text-2xl font-bold">{drug.name}</h1>
          <p className="opacity-90">{drug.batchNumber}</p>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Drug Information</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Manufacturer</p>
                <p className="font-medium">{drug.manufacturer}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Manufacture Date</p>
                <p className="font-medium">
                  {new Date(drug.manufactureDate).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Expiry Date</p>
                <p className="font-medium">
                  {new Date(drug.expiryDate).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Composition</p>
                <p className="font-medium">{drug.composition}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Dosage</p>
                <p className="font-medium">{drug.dosage}</p>
              </div>
            </div>
          </div>

          <div>
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-2">Current Status</h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-lg font-medium capitalize">{drug.status}</p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <FaHistory className="mr-2" />
                Tracking History
              </h2>
              <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
                {drug.history.length > 0 ? (
                  drug.history.map((entry, index) => (
                    <div
                      key={index}
                      className="border-l-4 border-primary pl-4 py-2"
                    >
                      <p className="font-medium capitalize">{entry.status}</p>
                      <p className="text-sm text-gray-600">
                        {new Date(entry.changedAt).toLocaleString()}
                      </p>
                      {entry.notes && (
                        <p className="text-sm text-gray-500 mt-1">
                          Notes: {entry.notes}
                        </p>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No history available</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
