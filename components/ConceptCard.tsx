'use client';

import { Play, FileImage, Clock, Star } from 'lucide-react';
import { ConceptCardProps } from '@/lib/types';

export function ConceptCard({ 
  concept, 
  isCompleted, 
  onSelect, 
  variant 
}: ConceptCardProps) {
  const handleClick = () => {
    onSelect(concept);
  };

  const getIcon = () => {
    if (variant === 'video' || concept.contentType === 'video') {
      return <Play className="h-6 w-6" />;
    }
    return <FileImage className="h-6 w-6" />;
  };

  const getDifficultyColor = () => {
    switch (concept.difficulty) {
      case 'beginner':
        return 'text-green-400';
      case 'intermediate':
        return 'text-yellow-400';
      case 'advanced':
        return 'text-red-400';
      default:
        return 'text-blue-400';
    }
  };

  return (
    <div 
      onClick={handleClick}
      className="concept-card group relative overflow-hidden"
    >
      {/* Completion indicator */}
      {isCompleted && (
        <div className="absolute top-3 right-3 z-10">
          <div className="bg-green-500 rounded-full p-1">
            <Star className="h-4 w-4 text-white fill-current" />
          </div>
        </div>
      )}

      {/* Content type indicator */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2 text-accent">
          {getIcon()}
          <span className="text-sm font-medium capitalize">
            {concept.contentType}
          </span>
        </div>
        <div className="flex items-center space-x-1 text-text-secondary text-sm">
          <Clock className="h-4 w-4" />
          <span>{concept.estimatedTime}m</span>
        </div>
      </div>

      {/* Title and description */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-text-primary mb-2 group-hover:text-accent transition-colors duration-200">
          {concept.title}
        </h3>
        <p className="text-text-secondary text-sm leading-relaxed">
          {concept.description}
        </p>
      </div>

      {/* Metadata */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-xs px-2 py-1 bg-surface/60 rounded-full text-text-secondary">
            {concept.category}
          </span>
          <span className={`text-xs font-medium ${getDifficultyColor()}`}>
            {concept.difficulty}
          </span>
        </div>
        
        {!isCompleted && (
          <div className="text-xs text-text-secondary">
            Click to start
          </div>
        )}
      </div>

      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />
    </div>
  );
}
