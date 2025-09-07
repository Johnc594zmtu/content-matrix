"use client";

import { useState } from 'react';
import { useContentMatrix } from '@/hooks/useContentMatrix';
import Modal from './Modal';

interface CreateCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateCategoryModal({ isOpen, onClose }: CreateCategoryModalProps) {
  const { createCategory, isCreatingCategory, isCategoryCreated } = useContentMatrix();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: 'General',
    icon: '📁',
    color: '#3B82F6',
    hash: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createCategory(formData);
      // Reset form
      setFormData({
        name: '',
        description: '',
        type: 'General',
        icon: '📁',
        color: '#3B82F6',
        hash: '',
      });
      onClose();
    } catch (error) {
      console.error('Error creating category:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const predefinedIcons = ['📁', '📝', '🎥', '🎵', '🖼️', '📊', '🔬', '💻', '🎨', '📚', '🌍', '⚡'];
  const predefinedColors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4', '#84CC16', '#F97316'];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Category" size="md">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
            Category Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="Enter category name"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
            Description *
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            rows={3}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="Enter category description"
          />
        </div>

        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-300 mb-2">
            Category Type *
          </label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
          >
            <option value="General">General</option>
            <option value="Technology">Technology</option>
            <option value="Education">Education</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Business">Business</option>
            <option value="Science">Science</option>
            <option value="Art">Art</option>
            <option value="Sports">Sports</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Icon *
          </label>
          <div className="grid grid-cols-6 gap-2 mb-3">
            {predefinedIcons.map((icon) => (
              <button
                key={icon}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, icon }))}
                className={`p-3 rounded-lg border-2 transition-all ${
                  formData.icon === icon
                    ? 'border-red-500 bg-red-500/20'
                    : 'border-gray-600 hover:border-gray-500'
                }`}
              >
                <span className="text-2xl">{icon}</span>
              </button>
            ))}
          </div>
          <input
            type="text"
            value={formData.icon}
            onChange={handleInputChange}
            name="icon"
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="Or enter custom icon"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Color *
          </label>
          <div className="grid grid-cols-4 gap-2 mb-3">
            {predefinedColors.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, color }))}
                className={`w-full h-10 rounded-lg border-2 transition-all ${
                  formData.color === color
                    ? 'border-white scale-110'
                    : 'border-gray-600 hover:border-gray-500'
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
          <input
            type="color"
            value={formData.color}
            onChange={handleInputChange}
            name="color"
            className="w-full h-10 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="hash" className="block text-sm font-medium text-gray-300 mb-2">
            Category Hash
          </label>
          <input
            type="text"
            id="hash"
            name="hash"
            value={formData.hash}
            onChange={handleInputChange}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="Enter category hash (optional)"
          />
        </div>

        {/* Success Message */}
        {isCategoryCreated && (
          <div className="p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
            <p className="text-green-400 text-sm">
              ✅ Category created successfully! The transaction has been confirmed on the blockchain.
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-700">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isCreatingCategory}
            className="px-6 py-2 bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 text-white font-semibold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isCreatingCategory ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Creating...
              </div>
            ) : (
              'Create Category'
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
}
