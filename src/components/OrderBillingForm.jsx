import React, { useState, useEffect } from "react";

const OrderBillingForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    fullName: "",
    status: "Pending",
    tracking: `TRACK-${Date.now()}`,
    address: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    county: "",
  });

  const [errors, setErrors] = useState({});
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false); // NEW: To track submission
  const [submittedData, setSubmittedData] = useState({}); // NEW: To store submitted data

  // Toggle Dark Mode
  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  // Update <html> class for dark mode
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "firstName" || name === "lastName") {
      setFormData((prev) => ({
        ...prev,
        fullName: `${prev.firstName} ${prev.lastName}`.trim(),
      }));
    }
  };

  // Validate inputs
  const validate = () => {
    const newErrors = {};
    if (
      !formData.email ||
      !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(formData.email)
    ) {
      newErrors.email = "Enter a valid email.";
    }
    if (!formData.firstName) {
      newErrors.firstName = "First Name is required.";
    }
    if (!formData.lastName) {
      newErrors.lastName = "Last Name is required.";
    }
    if (!formData.address) {
      newErrors.address = "Address is required.";
    }
    if (!formData.city) {
      newErrors.city = "City is required.";
    }
    if (!formData.state) {
      newErrors.state = "State is required.";
    }
    if (!formData.zip || !/^\d{5}$/.test(formData.zip)) {
      newErrors.zip = "Enter a valid 5-digit Zip Code.";
    }
    if (!formData.county) {
      newErrors.county = "County is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitted(true); // Switch to confirmation page
      setSubmittedData(formData); // Store submitted data
    } else {
      alert("Please fill the form completely and try again.");
    }
  };

  // Render Confirmation Page
  if (isSubmitted) {
    return (
      <div className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900 dark:text-white transition duration-300">
        <h2 className="text-2xl font-bold mb-6 text-green-600 text-center">
          Order Confirmation
        </h2>
        <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Thank you for your order!</h3>
          <p className="mb-4">
            Below are the details of your order:
          </p>
          <ul className="mb-4">
            <li><strong>Email:</strong> {submittedData.email}</li>
            <li><strong>Full Name:</strong> {submittedData.fullName}</li>
            <li><strong>Address:</strong> {submittedData.address}</li>
            <li><strong>City:</strong> {submittedData.city}</li>
            <li><strong>State:</strong> {submittedData.state}</li>
            <li><strong>Zip Code:</strong> {submittedData.zip}</li>
            <li><strong>County:</strong> {submittedData.county}</li>
            <li><strong>Status:</strong> {submittedData.status}</li>
            <li><strong>Tracking ID:</strong> {submittedData.tracking}</li>
          </ul>
          <button
            onClick={() => setIsSubmitted(false)} // Reset to form
            className="bg-blue-600 text-white py-2 px-6 rounded-md shadow-lg hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Render Form
  return (
    <div className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900 dark:text-white transition duration-300">
      {/* Dark Mode Toggle */}
      <div className="flex justify-end mb-4">
        <label className="flex items-center space-x-2">
          <span>{isDarkMode ? "Dark Mode" : "Light Mode"}</span>
          <input
            type="checkbox"
            checked={isDarkMode}
            onChange={toggleDarkMode}
            className="h-5 w-5 rounded-md"
          />
        </label>
      </div>

      {/* Form */}
      <form
        className="max-w-5xl mx-auto p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6 text-blue-600 text-center">
          Order Billing Form
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Basic Information</h3>

            {/* Email */}
            <div className="mb-4">
              <label className="block text-sm font-semibold">Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full mt-2 p-2 border rounded-md"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>

            {/* First Name */}
            <div className="mb-4">
              <label className="block text-sm font-semibold">First Name *</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full mt-2 p-2 border rounded-md"
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm">{errors.firstName}</p>
              )}
            </div>

            {/* Last Name */}
            <div className="mb-4">
              <label className="block text-sm font-semibold">Last Name *</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full mt-2 p-2 border rounded-md"
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm">{errors.lastName}</p>
              )}
            </div>

            {/* Full Name */}
            <div className="mb-4">
              <label className="block text-sm font-semibold">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                readOnly
                className="w-full mt-2 p-2 border rounded-md bg-gray-100 dark:bg-gray-700"
              />
            </div>

            {/* Status */}
            <div className="mb-4">
              <label className="block text-sm font-semibold">Status</label>
              <input
                type="text"
                name="status"
                value={formData.status}
                readOnly
                className="w-full mt-2 p-2 border rounded-md bg-gray-100 dark:bg-gray-700"
              />
            </div>

            {/* Tracking */}
            <div className="mb-4">
              <label className="block text-sm font-semibold">Tracking</label>
              <input
                type="text"
                name="tracking"
                value={formData.tracking}
                readOnly
                className="w-full mt-2 p-2 border rounded-md bg-gray-100 dark:bg-gray-700"
              />
            </div>
          </div>

          {/* Right Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Address Information</h3>

            {/* Address */}
            <div className="mb-4">
              <label className="block text-sm font-semibold">Address *</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full mt-2 p-2 border rounded-md"
              />
              {errors.address && (
                <p className="text-red-500 text-sm">{errors.address}</p>
              )}
            </div>

            {/* Address 2 */}
            <div className="mb-4">
              <label className="block text-sm font-semibold">Address 2</label>
              <input
                type="text"
                name="address2"
                value={formData.address2}
                onChange={handleChange}
                className="w-full mt-2 p-2 border rounded-md"
              />
            </div>

            {/* City */}
            <div className="mb-4">
              <label className="block text-sm font-semibold">City *</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full mt-2 p-2 border rounded-md"
              />
              {errors.city && (
                <p className="text-red-500 text-sm">{errors.city}</p>
              )}
            </div>

            {/* State */}
            <div className="mb-4">
              <label className="block text-sm font-semibold">State *</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="w-full mt-2 p-2 border rounded-md"
              />
              {errors.state && (
                <p className="text-red-500 text-sm">{errors.state}</p>
              )}
            </div>

            {/* Zip */}
            <div className="mb-4">
              <label className="block text-sm font-semibold">Zip Code *</label>
              <input
                type="text"
                name="zip"
                value={formData.zip}
                onChange={handleChange}
                className="w-full mt-2 p-2 border rounded-md"
              />
              {errors.zip && <p className="text-red-500 text-sm">{errors.zip}</p>}
            </div>

            {/* County */}
            <div className="mb-4">
              <label className="block text-sm font-semibold">Country *</label>
              <input
                type="text"
                name="county"
                value={formData.county}
                onChange={handleChange}
                className="w-full mt-2 p-2 border rounded-md"
              />
              {errors.county && (
                <p className="text-red-500 text-sm">{errors.county}</p>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="mt-8 bg-blue-600 text-white py-2 px-6 rounded-md shadow-lg hover:bg-blue-700"
          >
            Order Now
          </button>
        </div>
      </form>
    </div>
  );
};

export default OrderBillingForm;
