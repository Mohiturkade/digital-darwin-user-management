import { useEffect, useState } from "react";

const emptyForm = {
  firstName: "",
  lastName: "",
  email: "",
  age: "",
  gender: "male",
};

const UserForm = ({
  user,
  onSubmit,
  onCancel,
  loading,
}) => {
  const [formData, setFormData] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  // Populate form when editing
  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        age: user.age || "",
        gender: user.gender || "male",
      });
    } else {
      setFormData(emptyForm);
    }

    setErrors({});
  }, [user]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName =
        "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName =
        "Last name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email =
        "Email is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        formData.email
      )
    ) {
      newErrors.email =
        "Please enter a valid email";
    }

    if (!formData.age) {
      newErrors.age =
        "Age is required";
    } else if (
      Number(formData.age) < 1 ||
      Number(formData.age) > 120
    ) {
      newErrors.age =
        "Age must be between 1 and 120";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(
      "UserForm submit clicked"
    );

    const isValid = validateForm();

    if (!isValid) {
      console.log(
        "Form validation failed"
      );

      return;
    }

    const userData = {
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      email: formData.email.trim(),
      age: Number(formData.age),
      gender: formData.gender,
    };

    console.log(
      "Submitting user data:",
      userData
    );

    try {
      await onSubmit(userData);
    } catch (error) {
      console.error(
        "UserForm submit error:",
        error
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >

      {/* First Name */}
      <div>
        <label
          htmlFor="firstName"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          First Name
        </label>

        <input
          id="firstName"
          name="firstName"
          type="text"
          value={formData.firstName}
          onChange={handleChange}
          disabled={loading}
          placeholder="John"
          className={`w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.firstName
              ? "border-red-500"
              : "border-gray-300"
          }`}
        />

        {errors.firstName && (
          <p className="mt-1 text-sm text-red-500">
            {errors.firstName}
          </p>
        )}
      </div>

      {/* Last Name */}
      <div>
        <label
          htmlFor="lastName"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          Last Name
        </label>

        <input
          id="lastName"
          name="lastName"
          type="text"
          value={formData.lastName}
          onChange={handleChange}
          disabled={loading}
          placeholder="Doe"
          className={`w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.lastName
              ? "border-red-500"
              : "border-gray-300"
          }`}
        />

        {errors.lastName && (
          <p className="mt-1 text-sm text-red-500">
            {errors.lastName}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          Email
        </label>

        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          disabled={loading}
          placeholder="john@example.com"
          className={`w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.email
              ? "border-red-500"
              : "border-gray-300"
          }`}
        />

        {errors.email && (
          <p className="mt-1 text-sm text-red-500">
            {errors.email}
          </p>
        )}
      </div>

      {/* Age */}
      <div>
        <label
          htmlFor="age"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          Age
        </label>

        <input
          id="age"
          name="age"
          type="number"
          value={formData.age}
          onChange={handleChange}
          disabled={loading}
          placeholder="28"
          min="1"
          max="120"
          className={`w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.age
              ? "border-red-500"
              : "border-gray-300"
          }`}
        />

        {errors.age && (
          <p className="mt-1 text-sm text-red-500">
            {errors.age}
          </p>
        )}
      </div>

      {/* Gender */}
      <div>
        <label
          htmlFor="gender"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          Gender
        </label>

        <select
          id="gender"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          disabled={loading}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="male">
            Male
          </option>

          <option value="female">
            Female
          </option>

          <option value="other">
            Other
          </option>
        </select>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3 pt-4">

        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="px-5 py-2.5 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading
            ? "Saving..."
            : user
            ? "Update User"
            : "Add User"}
        </button>

      </div>
    </form>
  );
};

export default UserForm;