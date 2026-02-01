import { useState } from 'react';
import { Eye, EyeOff, User, Mail, Key, Hash } from 'lucide-react';

export default function UserForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    id: '',
    password: ''
  });
  
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.id.trim()) {
      newErrors.id = 'ID is required';
    } else if (!/^\d+$/.test(formData.id)) {
      newErrors.id = 'ID must contain only numbers';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    
    if (Object.keys(validationErrors).length === 0) {
      setSubmittedData(formData);
      setFormData({ name: '', email: '', id: '', password: '' });
      setErrors({});
    } else {
      setErrors(validationErrors);
    }
  };

  const InputField = ({ icon: Icon, label, type, name, value, error, ...props }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4" />
          {label}
        </div>
      </label>
      <div className="relative">
        <input
          type={type}
          name={name}
          value={value}
          onChange={handleChange}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            error ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-transparent'
          } text-gray-700`}
          {...props}
        />
        {name === 'password' && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        )}
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-8">Form Handling & Validation</h2>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <InputField
              icon={User}
              label="Name"
              type="text"
              name="name"
              value={formData.name}
              error={errors.name}
              placeholder="Enter your full name"
            />
            
            <InputField
              icon={Mail}
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              error={errors.email}
              placeholder="Enter your email"
            />
            
            <InputField
              icon={Hash}
              label="ID"
              type="text"
              name="id"
              value={formData.id}
              error={errors.id}
              placeholder="Enter your ID (numbers only)"
            />
            
            <InputField
              icon={Key}
              label="Password"
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              error={errors.password}
              placeholder="Enter your password"
            />
            
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Submit Form
            </button>
          </form>
        </div>

        {submittedData && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-green-800 mb-4">Submitted Data</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-green-700">Name</p>
                <p className="text-green-900">{submittedData.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-green-700">Email</p>
                <p className="text-green-900">{submittedData.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-green-700">ID</p>
                <p className="text-green-900">{submittedData.id}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-green-700">Password</p>
                <p className="text-green-900 font-mono">••••••••</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}