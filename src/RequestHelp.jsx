import React, { useState } from 'react';
import { AlertCircle, MapPin, CheckCircle, ArrowLeft } from 'lucide-react';
import { useAppContext } from './AppContext';

const RequestHelp = ({ onBack }) => {
  const { currentUser, createHelpRequest } = useAppContext();
  
  const [formData, setFormData] = useState({
    needType: '',
    description: '',
    location: currentUser.location,
    priority: 'MEDIUM'
  });

  const [submitted, setSubmitted] = useState(false);
  const [createdRequest, setCreatedRequest] = useState(null);

  const needTypes = [
    { value: 'MEDICAL', label: 'Medical Assistance', icon: '🏥', priority: 'CRITICAL' },
    { value: 'SHELTER', label: 'Shelter', icon: '🏠', priority: 'HIGH' },
    { value: 'SUPPLY', label: 'Food/Water/Supplies', icon: '📦', priority: 'MEDIUM' },
    { value: 'RESCUE', label: 'Emergency Rescue', icon: '🚨', priority: 'CRITICAL' }
  ];

  const handleNeedTypeSelect = (type) => {
    const selectedType = needTypes.find(t => t.value === type);
    setFormData({
      ...formData,
      needType: type,
      priority: selectedType.priority
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.needType || !formData.description) {
      alert('Please fill in all required fields');
      return;
    }

    const newRequest = createHelpRequest(formData);
    setCreatedRequest(newRequest);
    setSubmitted(true);
  };

  const handleReset = () => {
    setFormData({
      needType: '',
      description: '',
      location: currentUser.location,
      priority: 'MEDIUM'
    });
    setSubmitted(false);
    setCreatedRequest(null);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Help Request Submitted Successfully
              </h2>
              
              <p className="text-gray-600 mb-6">
                Your request has been received and is being processed by our emergency response team.
              </p>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                <h3 className="font-semibold text-gray-900 mb-4">Request Details</h3>
                
                <div className="space-y-3 text-left">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Tracking ID:</span>
                    <span className="text-sm font-semibold text-blue-600">{createdRequest.id}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Request Type:</span>
                    <span className="text-sm font-semibold text-gray-900">
                      {needTypes.find(t => t.value === createdRequest.needType)?.label}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Priority:</span>
                    <span className={`text-sm font-semibold ${
                      createdRequest.priority === 'CRITICAL' ? 'text-red-600' :
                      createdRequest.priority === 'HIGH' ? 'text-orange-600' :
                      'text-yellow-600'
                    }`}>
                      {createdRequest.priority}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Status:</span>
                    <span className="text-sm font-semibold text-gray-900">{createdRequest.status}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Submitted:</span>
                    <span className="text-sm font-semibold text-gray-900">
                      {new Date(createdRequest.submittedAt).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-yellow-800">
                  <strong>Important:</strong> Save your tracking ID ({createdRequest.id}) to check the status of your request.
                  You will receive notifications as your request is processed.
                </p>
              </div>

              <div className="flex gap-4 justify-center">
                <button
                  onClick={handleReset}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
                >
                  Submit Another Request
                </button>
                
                <button
                  onClick={onBack}
                  className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
                >
                  Back to Dashboard
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-3xl mx-auto px-4">
        <div className="mb-6">
          <button
            onClick={onBack}
            className="flex items-center text-blue-600 hover:text-blue-700 font-medium"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Dashboard
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center mb-6">
            <div className="bg-red-100 p-3 rounded-full mr-4">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Request Help</h1>
              <p className="text-gray-600">Submit an emergency assistance request</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Step 1: Select Need Type */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                1. What type of help do you need? <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {needTypes.map(type => (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => handleNeedTypeSelect(type.value)}
                    className={`p-4 border-2 rounded-lg text-left transition duration-200 ${
                      formData.needType === type.value
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-300 hover:border-blue-300'
                    }`}
                  >
                    <div className="flex items-center">
                      <span className="text-3xl mr-3">{type.icon}</span>
                      <div>
                        <div className="font-semibold text-gray-900">{type.label}</div>
                        <div className="text-xs text-gray-500">Priority: {type.priority}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                2. Please describe your situation <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Provide details about your emergency situation..."
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Include important details such as number of people, medical conditions, or specific needs.
              </p>
            </div>

            {/* Step 3: Location Confirmation */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                3. Confirm your location
              </label>
              <div className="bg-gray-50 border border-gray-300 rounded-lg p-4">
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 mb-1">Current Location</p>
                    <p className="text-sm text-gray-600">{formData.location.address}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Coordinates: {formData.location.lat.toFixed(4)}, {formData.location.lng.toFixed(4)}
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                This location will be shared with emergency responders to help them reach you quickly.
              </p>
            </div>

            {/* Priority Indicator */}
            {formData.needType && (
              <div className={`p-4 rounded-lg border-l-4 ${
                formData.priority === 'CRITICAL' ? 'bg-red-50 border-red-500' :
                formData.priority === 'HIGH' ? 'bg-orange-50 border-orange-500' :
                'bg-yellow-50 border-yellow-500'
              }`}>
                <p className="text-sm font-semibold text-gray-900">
                  Request Priority: <span className={
                    formData.priority === 'CRITICAL' ? 'text-red-600' :
                    formData.priority === 'HIGH' ? 'text-orange-600' :
                    'text-yellow-600'
                  }>{formData.priority}</span>
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  Your request will be routed to the appropriate emergency response team.
                </p>
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={!formData.needType || !formData.description}
                className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition duration-200 flex items-center justify-center ${
                  formData.needType && formData.description
                    ? 'bg-red-600 hover:bg-red-700'
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
              >
                <AlertCircle className="w-5 h-5 mr-2" />
                Submit Help Request
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RequestHelp;