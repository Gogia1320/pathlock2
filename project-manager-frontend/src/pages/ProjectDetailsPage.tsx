import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import type { Project, TaskItem } from '../types';
import TaskForm from '../components/TaskForm';
import TaskCard from '../components/TaskCard.tsx';

interface ProjectDetails extends Project {
  tasks: TaskItem[];
}

const ProjectDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<ProjectDetails | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchProjectDetails = async () => {
    if (!id) return;
    try {
      const response = await axiosInstance.get<ProjectDetails>(`/projects/${id}`);
      setProject(response.data);
    } catch (err: any) {
      if (err.response?.status === 404) {
        setError("Project not found.");
      } else {
        setError(err.response?.data?.Message || 'Failed to fetch project details.');
      }
    }
  };

  useEffect(() => {
    fetchProjectDetails();
  }, [id]);

  const handleTaskAdded = () => {
    fetchProjectDetails();
  };

  const handleTaskUpdated = () => {
    fetchProjectDetails();
  };

  const handleTaskDeleted = () => {
    fetchProjectDetails();
  };

  if (error) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-100 text-red-500 text-lg font-bold">{error}</div>;
  }

  if (!project) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-700">Loading project details...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <button
        onClick={() => navigate('/dashboard')}
        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mb-6 focus:outline-none focus:shadow-outline"
      >
        Back to Dashboard
      </button>
      <h1 className="text-3xl font-bold mb-2">{project.title}</h1>
      <p className="text-gray-700 mb-4">{project.description}</p>
      <p className="text-sm text-gray-500 mb-6">Created: {new Date(project.createdAt).toLocaleDateString()}</p>

      <div className="mb-8">
        <TaskForm projectId={project.id} onTaskAdded={handleTaskAdded} />
      </div>

      <h2 className="text-2xl font-bold mb-4">Tasks</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {project.tasks.length === 0 ? (
          <p>No tasks for this project yet.</p>
        ) : (
          project.tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onTaskUpdated={handleTaskUpdated}
              onTaskDeleted={handleTaskDeleted}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ProjectDetailsPage;
