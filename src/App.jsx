import React, { useState } from 'react';
import { AlertCircle, MapPin, Users, Bell, Activity, LogOut } from 'lucide-react';

const CrisisResponseApp = () => {
  const [currentUser, setCurrentUser] = useState({
    id: 'USR-001',
    name: 'John Doe',
    role: 'CIVILIAN',
    email: 'john.doe@email.com'
  });

  // Mock data for dashboard
  const dashboardStats = {
    CIVILIAN: {
      activeRequests: 2,
      nearbyResources: 8,
      unreadAlerts: 3
    },
    RESPONDER: {
      assignedRequests: 5,
      completedToday: 12,
      activeAlerts: 2
    },
    ADMINISTRATOR: {
      totalRequests: 147,
      activeResponders: 23,
      resourcesAvailable: 45,
      alertsSent: 8
    },
    RESOURCE_PROVIDER: {
      totalResources: 4,
      activeResources: 3,
      requestsServed: 28
    }
  };

  const recentAlerts = [
    { id: 'ALT-001', type: 'EMERGENCY', message: 'Severe weather warning - Seek shelter immediately', time: '10 mins ago', urgency: 'CRITICAL' },
    { id: 'ALT-002', type: 'WARNING', message: 'Road closure on Main St due to flooding', time: '1 hour ago', urgency: 'HIGH' },
    { id: 'ALT-003', type: 'INFORMATION', message: 'Emergency shelter now open at Community Center', time: '2 hours ago', urgency: 'MEDIUM' }
  ];

  const getUrgencyColor = (urgency) => {
    const colors = {
      CRITICAL: 'bg-red-100 border-red-500 text-red-900',
      HIGH: 'bg-orange-100 border-orange-500 text-orange-900',
      MEDIUM: 'bg-yellow-100 border-yellow-500 text-yellow-900',
      LOW: 'bg-blue-100 border-blue-500 text-blue-900'
    };
    return colors[urgency] || colors['MEDIUM'];
  };

  const getRoleName = (role) => {
    const roleNames = {
      CIVILIAN: 'Civilian',
      RESPONDER: 'Emergency Responder',
      ADMINISTRATOR: 'Administrator',
      RESOURCE_PROVIDER: 'Resource Provider'
    };
    return roleNames[role] || role;
  };

  const getRoleColor = (role) => {
    const colors = {
      CIVILIAN: 'bg-green-600',
      RESPONDER: 'bg-orange-600',
      ADMINISTRATOR: 'bg-purple-600',
      RESOURCE_PROVIDER: 'bg-blue-600'
    };
    return colors[role] || 'bg-gray-600';
  };

  // Render dashboard based on role
  const renderDashboard = () => {
    const stats = dashboardStats[currentUser.role] || {};

    switch (currentUser.role) {
      case 'CIVILIAN':
        return (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Active Requests</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{stats.activeRequests}</p>
                  </div>
                  <div className="bg-green-100 p-3 rounded-full">
                    <AlertCircle className="w-8 h-8 text-green-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Nearby Resources</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{stats.nearbyResources}</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-full">
                    <MapPin className="w-8 h-8 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Unread Alerts</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{stats.unreadAlerts}</p>
                  </div>
                  <div className="bg-red-100 p-3 rounded-full">
                    <Bell className="w-8 h-8 text-red-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-4 px-6 rounded-lg flex items-center justify-center space-x-2 transition duration-200">
                  <AlertCircle className="w-5 h-5" />
                  <span>Request Help</span>
                </button>
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg flex items-center justify-center space-x-2 transition duration-200">
                  <MapPin className="w-5 h-5" />
                  <span>View Resources</span>
                </button>
                <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-lg flex items-center justify-center space-x-2 transition duration-200">
                  <Activity className="w-5 h-5" />
                  <span>Track My Requests</span>
                </button>
                <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 px-6 rounded-lg flex items-center justify-center space-x-2 transition duration-200">
                  <Bell className="w-5 h-5" />
                  <span>View All Alerts</span>
                </button>
              </div>
            </div>

            {/* Recent Alerts */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Alerts</h2>
              <div className="space-y-3">
                {recentAlerts.map(alert => (
                  <div key={alert.id} className={`border-l-4 p-4 rounded ${getUrgencyColor(alert.urgency)}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-xs font-semibold uppercase">{alert.type}</span>
                          <span className="text-xs text-gray-600">• {alert.time}</span>
                        </div>
                        <p className="text-sm font-medium">{alert.message}</p>
                      </div>
                      <Bell className="w-5 h-5 ml-4 flex-shrink-0" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'RESPONDER':
        return (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-orange-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Assigned Requests</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{stats.assignedRequests}</p>
                  </div>
                  <div className="bg-orange-100 p-3 rounded-full">
                    <AlertCircle className="w-8 h-8 text-orange-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Completed Today</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{stats.completedToday}</p>
                  </div>
                  <div className="bg-green-100 p-3 rounded-full">
                    <Activity className="w-8 h-8 text-green-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Active Alerts</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{stats.activeAlerts}</p>
                  </div>
                  <div className="bg-red-100 p-3 rounded-full">
                    <Bell className="w-8 h-8 text-red-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-4 px-6 rounded-lg flex items-center justify-center space-x-2 transition duration-200">
                  <AlertCircle className="w-5 h-5" />
                  <span>View Assigned Requests</span>
                </button>
                <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-lg flex items-center justify-center space-x-2 transition duration-200">
                  <Activity className="w-5 h-5" />
                  <span>Update Availability</span>
                </button>
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg flex items-center justify-center space-x-2 transition duration-200">
                  <MapPin className="w-5 h-5" />
                  <span>View Resource Map</span>
                </button>
                <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 px-6 rounded-lg flex items-center justify-center space-x-2 transition duration-200">
                  <Bell className="w-5 h-5" />
                  <span>View Alerts</span>
                </button>
              </div>
            </div>

            {/* Recent Alerts */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Active Alerts</h2>
              <div className="space-y-3">
                {recentAlerts.slice(0, 2).map(alert => (
                  <div key={alert.id} className={`border-l-4 p-4 rounded ${getUrgencyColor(alert.urgency)}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-xs font-semibold uppercase">{alert.type}</span>
                          <span className="text-xs text-gray-600">• {alert.time}</span>
                        </div>
                        <p className="text-sm font-medium">{alert.message}</p>
                      </div>
                      <Bell className="w-5 h-5 ml-4 flex-shrink-0" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'ADMINISTRATOR':
        return (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Total Requests</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalRequests}</p>
                  </div>
                  <div className="bg-purple-100 p-3 rounded-full">
                    <AlertCircle className="w-8 h-8 text-purple-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-orange-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Active Responders</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{stats.activeResponders}</p>
                  </div>
                  <div className="bg-orange-100 p-3 rounded-full">
                    <Users className="w-8 h-8 text-orange-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Resources Available</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{stats.resourcesAvailable}</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-full">
                    <MapPin className="w-8 h-8 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Alerts Sent</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{stats.alertsSent}</p>
                  </div>
                  <div className="bg-red-100 p-3 rounded-full">
                    <Bell className="w-8 h-8 text-red-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Administrative Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-4 px-6 rounded-lg flex items-center justify-center space-x-2 transition duration-200">
                  <Bell className="w-5 h-5" />
                  <span>Broadcast Alert</span>
                </button>
                <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 px-6 rounded-lg flex items-center justify-center space-x-2 transition duration-200">
                  <Activity className="w-5 h-5" />
                  <span>System Dashboard</span>
                </button>
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg flex items-center justify-center space-x-2 transition duration-200">
                  <Users className="w-5 h-5" />
                  <span>Manage Users</span>
                </button>
              </div>
            </div>

            {/* System Status */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">System Status</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded">
                  <span className="text-sm font-medium text-gray-700">Alert System</span>
                  <span className="text-sm font-semibold text-green-600">Operational</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded">
                  <span className="text-sm font-medium text-gray-700">Request Processing</span>
                  <span className="text-sm font-semibold text-green-600">Operational</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded">
                  <span className="text-sm font-medium text-gray-700">Resource Database</span>
                  <span className="text-sm font-semibold text-green-600">Operational</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'RESOURCE_PROVIDER':
        return (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Total Resources</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalResources}</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-full">
                    <MapPin className="w-8 h-8 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Active Resources</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{stats.activeResources}</p>
                  </div>
                  <div className="bg-green-100 p-3 rounded-full">
                    <Activity className="w-8 h-8 text-green-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Requests Served</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{stats.requestsServed}</p>
                  </div>
                  <div className="bg-purple-100 p-3 rounded-full">
                    <Users className="w-8 h-8 text-purple-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg flex items-center justify-center space-x-2 transition duration-200">
                  <MapPin className="w-5 h-5" />
                  <span>Add New Resource</span>
                </button>
                <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-lg flex items-center justify-center space-x-2 transition duration-200">
                  <Activity className="w-5 h-5" />
                  <span>Update Resources</span>
                </button>
                <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 px-6 rounded-lg flex items-center justify-center space-x-2 transition duration-200">
                  <Activity className="w-5 h-5" />
                  <span>View Statistics</span>
                </button>
                <button className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-4 px-6 rounded-lg flex items-center justify-center space-x-2 transition duration-200">
                  <Bell className="w-5 h-5" />
                  <span>View Alerts</span>
                </button>
              </div>
            </div>

            {/* Recent Alerts */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Alerts</h2>
              <div className="space-y-3">
                {recentAlerts.map(alert => (
                  <div key={alert.id} className={`border-l-4 p-4 rounded ${getUrgencyColor(alert.urgency)}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-xs font-semibold uppercase">{alert.type}</span>
                          <span className="text-xs text-gray-600">• {alert.time}</span>
                        </div>
                        <p className="text-sm font-medium">{alert.message}</p>
                      </div>
                      <Bell className="w-5 h-5 ml-4 flex-shrink-0" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return <div>Unknown role</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <AlertCircle className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Crisis Response Coordination</h1>
                <p className="text-sm text-gray-600">St. Cloud Emergency Management System</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-900">{currentUser.name}</p>
                <p className={`text-xs px-2 py-1 rounded text-white ${getRoleColor(currentUser.role)}`}>
                  {getRoleName(currentUser.role)}
                </p>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-full transition duration-200">
                <LogOut className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderDashboard()}
      </main>

      {/* Role Switcher (for demo purposes) */}
      <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4">
        <p className="text-xs font-semibold text-gray-600 mb-2">Demo: Switch Role</p>
        <div className="space-y-2">
          {['CIVILIAN', 'RESPONDER', 'ADMINISTRATOR', 'RESOURCE_PROVIDER'].map(role => (
            <button
              key={role}
              onClick={() => setCurrentUser({...currentUser, role})}
              className={`w-full text-left px-3 py-2 rounded text-sm font-medium transition duration-200 ${
                currentUser.role === role 
                  ? `${getRoleColor(role)} text-white` 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {getRoleName(role)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CrisisResponseApp;