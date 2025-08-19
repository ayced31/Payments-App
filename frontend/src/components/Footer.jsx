const Footer = () => {
  return (
    <footer className="bg-white border-t border-primary-100 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          {/* Left side - Brand */}
          <div className="flex items-center">
            <div className="text-lg sm:text-xl font-bold text-primary-800 font-brand">
              Payments App
            </div>
          </div>

          {/* Right side - Copyright */}
          <div className="text-sm text-brand-muted">
            © 2025 Project By Ayush Kumar
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
