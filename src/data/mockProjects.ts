import type { Project } from '../interfaces/Project'

export const mockProjects: Project[] = [
  {
    id: '1',
    name: 'FraudShieldAI',
    description: 'Machine learning based phishing URL detection system.',
    category: 'Machine Learning',
    status: 'In Progress',
    technologies: ['Python', 'Scikit-learn', 'NLP'],
    progress: 72,
    createdAt: '2026-10-01',
    updatedAt: '2026-10-10',
  },
  {
    id: '2',
    name: 'Green AI Tracker',
    description: 'Track energy usage and carbon emissions of AI workloads.',
    category: 'Data Science',
    status: 'Completed',
    technologies: ['FastAPI', 'PostgreSQL', 'Python'],
    progress: 100,
    createdAt: '2026-09-20',
    updatedAt: '2026-10-08',
  },
  {
    id: '3',
    name: 'Smart Home Digital Twin',
    description: '3D smart home simulation powered by computer vision.',
    category: 'Computer Vision',
    status: 'In Progress',
    technologies: ['YOLOv8', 'OpenCV', 'Python'],
    progress: 65,
    createdAt: '2026-08-01',
    updatedAt: '2026-10-09',
  },
]
