import React, { useState, useEffect } from 'react';
import { Plus, X, RotateCcw } from 'lucide-react';
import { Button } from './ui/button';

const TabManager = ({ tabs, activeTab, onTabChange, onTabClose, onNewTab, onTabUpdate }) => {
  const [draggedTab, setDraggedTab] = useState(null);

  const handleDragStart = (e, tabId) => {
    setDraggedTab(tabId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, dropTabId) => {
    e.preventDefault();
    if (draggedTab && draggedTab !== dropTabId) {
      // Handle tab reordering logic here
      console.log(`Move tab ${draggedTab} to position of ${dropTabId}`);
    }
    setDraggedTab(null);
  };

  const getTruncatedTitle = (title, maxLength = 20) => {
    if (!title || title === 'about:blank') return 'New Tab';
    return title.length > maxLength ? `${title.substring(0, maxLength)}...` : title;
  };

  return (
    <div className="flex items-center bg-gray-100 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 min-h-[40px]">
      <div className="flex-1 flex items-center overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`flex items-center min-w-[200px] max-w-[240px] h-10 px-3 cursor-pointer group transition-all duration-200 border-r border-gray-200 dark:border-gray-700 ${
              activeTab === tab.id
                ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white'
                : 'bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
            }`}
            onClick={() => onTabChange(tab.id)}
            draggable
            onDragStart={(e) => handleDragStart(e, tab.id)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, tab.id)}
          >
            <div className="flex items-center flex-1 min-w-0">
              {tab.isLoading ? (
                <RotateCcw className="w-4 h-4 mr-2 animate-spin flex-shrink-0" />
              ) : (
                <div className="w-4 h-4 mr-2 flex-shrink-0">
                  {tab.favicon ? (
                    <img 
                      src={tab.favicon} 
                      alt="" 
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-300 dark:bg-gray-600 rounded-sm" />
                  )}
                </div>
              )}
              <span className="truncate text-sm font-medium">
                {getTruncatedTitle(tab.title)}
              </span>
            </div>
            {tabs.length > 1 && (
              <Button
                variant="ghost"
                size="sm"
                className="ml-2 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-gray-200 dark:hover:bg-gray-700"
                onClick={(e) => {
                  e.stopPropagation();
                  onTabClose(tab.id);
                }}
              >
                <X className="w-3 h-3" />
              </Button>
            )}
          </div>
        ))}
      </div>
      <Button
        variant="ghost"
        size="sm"
        className="ml-2 mr-2 h-8 w-8 p-0 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
        onClick={onNewTab}
      >
        <Plus className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default TabManager;