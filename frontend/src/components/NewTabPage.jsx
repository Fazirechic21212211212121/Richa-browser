import React, { useState } from 'react';
import { Search, Clock, Bookmark, Star } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { mockPopularSites, mockHistory, mockBookmarks } from '../mock';

const NewTabPage = ({ onNavigate, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
      setSearchQuery('');
    }
  };

  const handleSiteClick = (url) => {
    onNavigate(url);
  };

  const recentHistory = mockHistory.slice(0, 6);
  const recentBookmarks = mockBookmarks.slice(0, 6);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Richa Browser
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Discover the web with style
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <form onSubmit={handleSearchSubmit} className="relative">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search the web or enter a URL..."
                className="w-full pl-12 pr-4 py-4 text-lg rounded-full border-2 border-gray-200 dark:border-gray-600 focus:border-blue-500 focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl"
              />
            </div>
          </form>
        </div>

        {/* Popular Sites */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 flex items-center">
            <Star className="w-6 h-6 mr-2 text-yellow-500" />
            Popular Sites
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {mockPopularSites.map((site) => (
              <Card
                key={site.name}
                className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 group"
                onClick={() => handleSiteClick(site.url)}
              >
                <CardContent className="p-4 text-center">
                  <div className={`w-12 h-12 rounded-full ${site.color} mx-auto mb-3 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <img 
                      src={site.favicon} 
                      alt={site.name}
                      className="w-6 h-6 filter invert"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate">
                    {site.name}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Recent History */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 flex items-center">
              <Clock className="w-6 h-6 mr-2 text-blue-500" />
              Recent History
            </h2>
            <div className="space-y-2">
              {recentHistory.map((item) => (
                <Card
                  key={item.id}
                  className="cursor-pointer hover:shadow-md transition-all duration-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                  onClick={() => handleSiteClick(item.url)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 flex-shrink-0">
                        {item.favicon ? (
                          <img 
                            src={item.favicon} 
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
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 dark:text-white truncate">
                          {item.title}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                          {item.url}
                        </p>
                      </div>
                      <div className="text-xs text-gray-400 dark:text-gray-500">
                        {new Date(item.visitedAt).toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Recent Bookmarks */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 flex items-center">
              <Bookmark className="w-6 h-6 mr-2 text-purple-500" />
              Recent Bookmarks
            </h2>
            <div className="space-y-2">
              {recentBookmarks.map((item) => (
                <Card
                  key={item.id}
                  className="cursor-pointer hover:shadow-md transition-all duration-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                  onClick={() => handleSiteClick(item.url)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 flex-shrink-0">
                        {item.favicon ? (
                          <img 
                            src={item.favicon} 
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
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 dark:text-white truncate">
                          {item.title}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                          {item.url}
                        </p>
                      </div>
                      <div className="text-xs text-gray-400 dark:text-gray-500">
                        {new Date(item.addedAt).toLocaleDateString()}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewTabPage;