// client/src/components/common/Footer.jsx
export function Footer() {
    return (
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold">DrugTrace</h3>
              <p className="text-gray-400 mt-1">QR Code-Based Drug Lifecycle Traceability System</p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-primary transition">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition">Terms of Service</a>
              <a href="#" className="hover:text-primary transition">Contact Us</a>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-gray-700 text-center text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} DrugTrace. All rights reserved.
          </div>
        </div>
      </footer>
    );
  }