import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({
    id: 'USR-001',
    name: 'John Doe',
    role: 'CIVILIAN',
    email: 'john.doe@email.com',
    location: { lat: 45.5579, lng: -94.1632, address: '720 4th Ave S, St. Cloud, MN 56301' }
  });

  const [helpRequests, setHelpRequests] = useState([
    {
      id: 'HLP-001',
      civilianId: 'USR-001',
      civilianName: 'John Doe',
      needType: 'SHELTER',
      description: 'Need temporary shelter for family of 4',
      location: { lat: 45.5579, lng: -94.1632, address: '720 4th Ave S, St. Cloud, MN 56301' },
      status: 'ASSIGNED',
      priority: 'HIGH',
      responderId: 'USR-101',
      responderName: 'Sarah Johnson',
      submittedAt: new Date(Date.now() - 3600000).toISOString(),
      assignedAt: new Date(Date.now() - 1800000).toISOString(),
      completedAt: null
    },
    {
      id: 'HLP-002',
      civilianId: 'USR-002',
      civilianName: 'Jane Smith',
      needType: 'MEDICAL',
      description: 'Elderly person needs medication refill',
      location: { lat: 45.5608, lng: -94.1656, address: '33 N 6th Ave, St. Cloud, MN 56303' },
      status: 'IN_PROGRESS',
      priority: 'CRITICAL',
      responderId: 'USR-101',
      responderName: 'Sarah Johnson',
      submittedAt: new Date(Date.now() - 7200000).toISOString(),
      assignedAt: new Date(Date.now() - 5400000).toISOString(),
      completedAt: null
    }
  ]);

  const [resources, setResources] = useState([
    {
      id: 'RES-001',
      name: 'St. Cloud Community Center',
      type: 'SHELTER',
      location: { lat: 45.5608, lng: -94.1656, address: '33 N 6th Ave, St. Cloud, MN 56303' },
      capacity: 100,
      currentOccupancy: 67,
      status: 'AVAILABLE',
      contactInfo: '(320) 255-7223',
      providerId: 'USR-201'
    },
    {
      id: 'RES-002',
      name: 'St. Cloud Hospital Emergency',
      type: 'MEDICAL',
      location: { lat: 45.5492, lng: -94.1619, address: '1406 6th Ave N, St. Cloud, MN 56303' },
      capacity: 50,
      currentOccupancy: 23,
      status: 'AVAILABLE',
      contactInfo: '(320) 251-2700',
      providerId: 'USR-202'
    },
    {
      id: 'RES-003',
      name: 'Red Cross Supply Distribution',
      type: 'SUPPLY',
      location: { lat: 45.5565, lng: -94.1685, address: '1600 Division St, St. Cloud, MN 56301' },
      capacity: 200,
      currentOccupancy: 145,
      status: 'LIMITED',
      contactInfo: '(320) 251-7641',
      providerId: 'USR-203'
    }
  ]);

  const [alerts, setAlerts] = useState([
    {
      id: 'ALT-001',
      type: 'EMERGENCY',
      message: 'Severe weather warning - Seek shelter immediately',
      urgency: 'CRITICAL',
      timestamp: new Date(Date.now() - 600000).toISOString(),
      issuedBy: 'USR-301',
      read: false
    },
    {
      id: 'ALT-002',
      type: 'WARNING',
      message: 'Road closure on Main St due to flooding',
      urgency: 'HIGH',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      issuedBy: 'USR-301',
      read: false
    },
    {
      id: 'ALT-003',
      type: 'INFORMATION',
      message: 'Emergency shelter now open at Community Center',
      urgency: 'MEDIUM',
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      issuedBy: 'USR-301',
      read: true
    }
  ]);

  // Generate unique ID
  const generateId = (prefix) => {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `${prefix}-${timestamp}-${random}`;
  };

  // Create new help request
  const createHelpRequest = (requestData) => {
    const newRequest = {
      id: generateId('HLP'),
      civilianId: currentUser.id,
      civilianName: currentUser.name,
      needType: requestData.needType,
      description: requestData.description,
      location: requestData.location || currentUser.location,
      status: 'SUBMITTED',
      priority: requestData.priority || 'MEDIUM',
      responderId: null,
      responderName: null,
      submittedAt: new Date().toISOString(),
      assignedAt: null,
      completedAt: null
    };

    setHelpRequests(prev => [newRequest, ...prev]);
    return newRequest;
  };

  // Assign request to responder
  const assignRequest = (requestId, responderId, responderName) => {
    setHelpRequests(prev =>
      prev.map(req =>
        req.id === requestId
          ? {
              ...req,
              status: 'ASSIGNED',
              responderId,
              responderName,
              assignedAt: new Date().toISOString()
            }
          : req
      )
    );
  };

  // Update request status
  const updateRequestStatus = (requestId, status, completionNotes = null) => {
    setHelpRequests(prev =>
      prev.map(req =>
        req.id === requestId
          ? {
              ...req,
              status,
              completedAt: status === 'COMPLETED' ? new Date().toISOString() : req.completedAt,
              completionNotes: completionNotes || req.completionNotes
            }
          : req
      )
    );
  };

  // Broadcast alert
  const broadcastAlert = (alertData) => {
    const newAlert = {
      id: generateId('ALT'),
      type: alertData.type,
      message: alertData.message,
      urgency: alertData.urgency,
      timestamp: new Date().toISOString(),
      issuedBy: currentUser.id,
      read: false
    };

    setAlerts(prev => [newAlert, ...prev]);
    return newAlert;
  };

  // Add resource
  const addResource = (resourceData) => {
    const newResource = {
      id: generateId('RES'),
      name: resourceData.name,
      type: resourceData.type,
      location: resourceData.location,
      capacity: resourceData.capacity,
      currentOccupancy: resourceData.currentOccupancy || 0,
      status: resourceData.status || 'AVAILABLE',
      contactInfo: resourceData.contactInfo,
      providerId: currentUser.id
    };

    setResources(prev => [newResource, ...prev]);
    return newResource;
  };

  // Update resource
  const updateResource = (resourceId, updates) => {
    setResources(prev =>
      prev.map(res =>
        res.id === resourceId ? { ...res, ...updates } : res
      )
    );
  };

  // Mark alert as read
  const markAlertAsRead = (alertId) => {
    setAlerts(prev =>
      prev.map(alert =>
        alert.id === alertId ? { ...alert, read: true } : alert
      )
    );
  };

  // Get statistics
  const getStatistics = () => {
    const myRequests = helpRequests.filter(req => req.civilianId === currentUser.id);
    const assignedToMe = helpRequests.filter(req => req.responderId === currentUser.id);
    const myResources = resources.filter(res => res.providerId === currentUser.id);
    const unreadAlerts = alerts.filter(alert => !alert.read);

    return {
      CIVILIAN: {
        activeRequests: myRequests.filter(req => 
          ['SUBMITTED', 'ASSIGNED', 'IN_PROGRESS'].includes(req.status)
        ).length,
        nearbyResources: resources.filter(res => 
          ['AVAILABLE', 'LIMITED'].includes(res.status)
        ).length,
        unreadAlerts: unreadAlerts.length
      },
      RESPONDER: {
        assignedRequests: assignedToMe.filter(req => 
          ['ASSIGNED', 'IN_PROGRESS'].includes(req.status)
        ).length,
        completedToday: assignedToMe.filter(req => {
          if (!req.completedAt) return false;
          const today = new Date().setHours(0, 0, 0, 0);
          const completedDate = new Date(req.completedAt).setHours(0, 0, 0, 0);
          return completedDate === today;
        }).length,
        activeAlerts: unreadAlerts.filter(a => ['CRITICAL', 'HIGH'].includes(a.urgency)).length
      },
      ADMINISTRATOR: {
        totalRequests: helpRequests.length,
        activeResponders: new Set(
          helpRequests.filter(req => req.responderId).map(req => req.responderId)
        ).size,
        resourcesAvailable: resources.filter(res => 
          ['AVAILABLE', 'LIMITED'].includes(res.status)
        ).length,
        alertsSent: alerts.length
      },
      RESOURCE_PROVIDER: {
        totalResources: myResources.length,
        activeResources: myResources.filter(res => 
          ['AVAILABLE', 'LIMITED'].includes(res.status)
        ).length,
        requestsServed: helpRequests.filter(req => {
          const nearbyResource = myResources.find(res => 
            res.type === req.needType && 
            Math.abs(res.location.lat - req.location.lat) < 0.01
          );
          return nearbyResource && req.status === 'COMPLETED';
        }).length
      }
    };
  };

  const value = {
    currentUser,
    setCurrentUser,
    helpRequests,
    resources,
    alerts,
    createHelpRequest,
    assignRequest,
    updateRequestStatus,
    broadcastAlert,
    addResource,
    updateResource,
    markAlertAsRead,
    getStatistics
  };
  

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};