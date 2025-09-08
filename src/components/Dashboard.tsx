import React from 'react';
import { Users, CheckSquare, FolderOpen, TrendingUp, Calendar, Clock } from 'lucide-react';

const Dashboard: React.FC = () => {
  // Mock data inline to avoid import issues
  const mockStats = {
    totalUsers: 24,
    activeTasks: 12,
    completedTasks: 48,
    activeProjects: 6
  };

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
    },
    {
      id: '3',
      title: 'Testare funcționalități',
      description: 'Testarea tuturor funcționalităților implementate',
      status: 'pending',
      priority: 'low',
      assignedTo: '3',
      createdAt: '2024-01-20',
      dueDate: '2024-02-10'
    }
  ];

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

  const stats = [
    {
      title: 'Total Utilizatori',
      value: mockStats.totalUsers,
      icon: Users,
      color: 'bg-blue-500',
      change: '+12%'
    },
    {
      title: 'Sarcini Active',
      value: mockStats.activeTasks,
      icon: CheckSquare,
      color: 'bg-green-500',
      change: '+8%'
    },
    {
      title: 'Sarcini Completate',
      value: mockStats.completedTasks,
      icon: Clock,
      color: 'bg-purple-500',
      change: '+15%'
    },
    {
      title: 'Proiecte Active',
      value: mockStats.activeProjects,
      icon: FolderOpen,
      color: 'bg-orange-500',
      change: '+5%'
    }
  ];

  const recentTasks = mockTasks.slice(0, 3);
  const activeProjects = mockProjects.filter(p => p.status === 'active');

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Bun venit în sistemul de management</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Calendar className="w-4 h-4" />
          <span>{new Date().toLocaleDateString('ro-RO', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="flex items-center mt-4">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className="text-sm text-green-600 ml-1">{stat.change}</span>
                <span className="text-sm text-gray-500 ml-1">față de luna trecută</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Tasks */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Sarcini Recente</h2>
          <div className="space-y-4">
            {recentTasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{task.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                  <div className="flex items-center mt-2 space-x-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      task.status === 'completed' ? 'bg-green-100 text-green-800' :
                      task.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {task.status === 'completed' ? 'Completată' :
                       task.status === 'in-progress' ? 'În progres' : 'În așteptare'}
                    </span>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      task.priority === 'high' ? 'bg-red-100 text-red-800' :
                      task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {task.priority === 'high' ? 'Prioritate mare' :
                       task.priority === 'medium' ? 'Prioritate medie' : 'Prioritate mică'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Projects */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Proiecte Active</h2>
          <div className="space-y-4">
            {activeProjects.map((project) => (
              <div key={project.id} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900">{project.name}</h3>
                  <span className="text-sm font-medium text-blue-600">{project.progress}%</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{project.description}</p>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
                <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                  <span>Echipă: {project.teamMembers.length} membri</span>
                  <span>Termen: {new Date(project.endDate).toLocaleDateString('ro-RO')}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;