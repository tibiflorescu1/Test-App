import React, { useState } from 'react';
import { Plus, Search, Calendar, User, Flag } from 'lucide-react';

const TaskManagement: React.FC = () => {
  // Mock data inline to avoid import issues
  const mockTasks = [
    {
      id: '1',
      title: 'Implementare sistem autentificare',
      description: 'Dezvoltarea sistemului de login și înregistrare',
      status: 'in-progress',
      priority: 'high',
      assignedTo: '1',
      createdAt: '2024-01-15',
      dueDate: '2024-02-01'
    },
    {
      id: '2',
      title: 'Design interfață utilizator',
      description: 'Crearea mockup-urilor pentru aplicația web',
      status: 'completed',
      priority: 'medium',
      assignedTo: '2',
      createdAt: '2024-01-10',
      dueDate: '2024-01-25'
    }
  ];

  const mockUsers = [
    {
      id: '1',
      name: 'Ana Popescu',
      email: 'ana.popescu@company.ro',
      role: 'admin',
      status: 'active',
      createdAt: '2024-01-01'
    },
    {
      id: '2',
      name: 'Mihai Ionescu',
      email: 'mihai.ionescu@company.ro',
      role: 'manager',
      status: 'active',
      createdAt: '2024-01-05'
    }
  ];

  const [tasks, setTasks] = useState(mockTasks);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed': return 'Completată';
      case 'in-progress': return 'În progres';
      case 'pending': return 'În așteptare';
      default: return status;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'high': return 'Mare';
      case 'medium': return 'Medie';
      case 'low': return 'Mică';
      default: return priority;
    }
  };

  const getUserName = (userId: string) => {
    const user = mockUsers.find(u => u.id === userId);
    return user ? user.name : 'Necunoscut';
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestionare Sarcini</h1>
          <p className="text-gray-600 mt-1">Administrează sarcinile și proiectele</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
          <Plus className="w-4 h-4" />
          <span>Adaugă Sarcină</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Caută sarcini..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Toate statusurile</option>
            <option value="pending">În așteptare</option>
            <option value="in-progress">În progres</option>
            <option value="completed">Completate</option>
          </select>
        </div>
      </div>

      {/* Tasks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTasks.map((task) => (
          <div key={task.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{task.title}</h3>
              <Flag className={`w-5 h-5 ${getPriorityColor(task.priority)}`} />
            </div>
            
            <p className="text-gray-600 text-sm mb-4 line-clamp-3">{task.description}</p>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(task.status)}`}>
                  {getStatusLabel(task.status)}
                </span>
                <span className={`text-xs font-medium ${getPriorityColor(task.priority)}`}>
                  Prioritate {getPriorityLabel(task.priority)}
                </span>
              </div>
              
              <div className="flex items-center text-sm text-gray-500">
                <User className="w-4 h-4 mr-2" />
                <span>{getUserName(task.assignedTo)}</span>
              </div>
              
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="w-4 h-4 mr-2" />
                <span>Termen: {new Date(task.dueDate).toLocaleDateString('ro-RO')}</span>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
              <span className="text-xs text-gray-400">
                Creat: {new Date(task.createdAt).toLocaleDateString('ro-RO')}
              </span>
              <div className="flex items-center space-x-2">
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  Editează
                </button>
                <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                  Șterge
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredTasks.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">Nu au fost găsite sarcini.</p>
        </div>
      )}
    </div>
  );
};

export default TaskManagement;