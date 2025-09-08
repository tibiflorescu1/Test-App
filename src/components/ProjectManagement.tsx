import React, { useState } from 'react';
import { Plus, Search, Calendar, Users, TrendingUp } from 'lucide-react';

const ProjectManagement: React.FC = () => {
  // Mock data inline to avoid import issues
  const mockProjects = [
    {
      id: '1',
      name: 'Aplicație Web Management',
      description: 'Dezvoltarea unei aplicații complete de management',
      status: 'active',
      progress: 75,
      startDate: '2024-01-01',
      endDate: '2024-03-01',
      teamMembers: ['1', '2', '3']
    },
    {
      id: '2',
      name: 'Sistem CRM',
      description: 'Implementarea unui sistem de gestionare clienți',
      status: 'active',
      progress: 45,
      startDate: '2024-01-15',
      endDate: '2024-04-15',
      teamMembers: ['2', '4']
    }
  ];

  const mockUsers = [
    {
      id: '1',
      name: 'Ana Popescu'
    },
    {
      id: '2',
      name: 'Mihai Ionescu'
    }
  ];

  const [projects, setProjects] = useState(mockProjects);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'active': return 'bg-blue-100 text-blue-800';
      case 'planning': return 'bg-yellow-100 text-yellow-800';
      case 'on-hold': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed': return 'Completat';
      case 'active': return 'Activ';
      case 'planning': return 'Planificare';
      case 'on-hold': return 'Suspendat';
      default: return status;
    }
  };

  const getTeamMemberNames = (memberIds: string[]) => {
    return memberIds.map(id => {
      const user = mockUsers.find(u => u.id === id);
      return user ? user.name : 'Necunoscut';
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestionare Proiecte</h1>
          <p className="text-gray-600 mt-1">Administrează proiectele companiei</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
          <Plus className="w-4 h-4" />
          <span>Adaugă Proiect</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Caută proiecte..."
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
            <option value="planning">Planificare</option>
            <option value="active">Active</option>
            <option value="completed">Completate</option>
            <option value="on-hold">Suspendate</option>
          </select>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredProjects.map((project) => (
          <div key={project.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.name}</h3>
                <p className="text-gray-600 text-sm line-clamp-2">{project.description}</p>
              </div>
              <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(project.status)}`}>
                {getStatusLabel(project.status)}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Progres</span>
                <span className="text-sm font-medium text-blue-600">{project.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
            </div>

            {/* Team Members */}
            <div className="mb-4">
              <div className="flex items-center mb-2">
                <Users className="w-4 h-4 text-gray-500 mr-2" />
                <span className="text-sm font-medium text-gray-700">Echipa</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {getTeamMemberNames(project.teamMembers).map((name, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                    {name}
                  </span>
                ))}
              </div>
            </div>

            {/* Dates */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="w-4 h-4 mr-2" />
                <span>Început: {new Date(project.startDate).toLocaleDateString('ro-RO')}</span>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="w-4 h-4 mr-2" />
                <span>Sfârșit: {new Date(project.endDate).toLocaleDateString('ro-RO')}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-gray-200 flex items-center justify-between">
              <div className="flex items-center text-sm text-gray-500">
                <TrendingUp className="w-4 h-4 mr-1" />
                <span>În dezvoltare</span>
              </div>
              <div className="flex items-center space-x-2">
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  Vizualizează
                </button>
                <button className="text-gray-600 hover:text-gray-800 text-sm font-medium">
                  Editează
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">Nu au fost găsite proiecte.</p>
        </div>
      )}
    </div>
  );
};

export default ProjectManagement;