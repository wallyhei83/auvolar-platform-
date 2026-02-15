'use client'

import Link from 'next/link'
import { Folder, Plus, Calendar, MapPin, DollarSign, Clock } from 'lucide-react'

// Mock projects data
const projects = [
  {
    id: '1',
    name: 'Warehouse LED Retrofit',
    location: 'Houston, TX',
    status: 'In Progress',
    budget: '$45,000',
    createdAt: '2026-01-15',
    productsCount: 12,
  },
  {
    id: '2', 
    name: 'Office Building Upgrade',
    location: 'Dallas, TX',
    status: 'Quoted',
    budget: '$28,500',
    createdAt: '2026-02-01',
    productsCount: 8,
  },
  {
    id: '3',
    name: 'Parking Lot Lighting',
    location: 'Austin, TX',
    status: 'Completed',
    budget: '$18,200',
    createdAt: '2025-12-10',
    productsCount: 24,
  },
]

const statusColors: Record<string, string> = {
  'In Progress': 'bg-blue-100 text-blue-800',
  'Quoted': 'bg-yellow-100 text-yellow-800',
  'Completed': 'bg-green-100 text-green-800',
  'Draft': 'bg-gray-100 text-gray-800',
}

export default function PortalProjectsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">My Projects</h1>
          <p className="text-gray-600">Manage your lighting projects and quotes</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-brand text-black rounded-lg hover:bg-yellow-400 transition-colors">
          <Plus className="w-4 h-4" />
          New Project
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-lg">
          <Folder className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-medium mb-2">No projects yet</h3>
          <p className="text-gray-600 mb-4">Create your first project to start organizing your lighting orders.</p>
          <button className="px-6 py-2 bg-brand text-black rounded-lg hover:bg-yellow-400 transition-colors">
            Create Project
          </button>
        </div>
      ) : (
        <div className="grid gap-4">
          {projects.map((project) => (
            <div key={project.id} className="bg-white border rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{project.name}</h3>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {project.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {project.createdAt}
                    </span>
                    <span className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      {project.budget}
                    </span>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[project.status]}`}>
                  {project.status}
                </span>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm text-gray-500">{project.productsCount} products</span>
                <div className="flex gap-2">
                  <button className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-50">View Details</button>
                  <button className="px-4 py-2 text-sm bg-gray-900 text-white rounded-lg hover:bg-gray-800">Order Products</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
