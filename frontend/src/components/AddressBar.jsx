import React, { useState, useEffect, useRef } from 'react';
import { Search, ArrowLeft, ArrowRight, RotateCcw, Lock, Star, StarOff, Home } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { mockSearch, formatUrl, isValidUrl } from '../mock';

const AddressBar = ({ 
  currentUrl, 
  isLoading, 
  canGoBack, 
  canGoForward, 
  onNavigate, 
  onBack, 
  onForward, 
  onRefresh, 
  onHome,
  isBookmarked,
  onToggleBookmark,
  onSearch 
}) => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (currentUrl && currentUrl !== 'about:blank') {
      setInputValue(currentUrl);
    } else {
      setInputValue('');
    }
  }, [currentUrl]);

  useEffect(() => {
    if (inputValue.trim() && showSuggestions) {
      const searchResults = mockSearch(inputValue);
      setSuggestions(searchResults.slice(0, 5));
    } else {
      setSuggestions([]);
    }
  }, [inputValue, showSuggestions]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setShowSuggestions(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      const formattedUrl = formatUrl(inputValue.trim());
      onNavigate(formattedUrl);
      setShowSuggestions(false);
      inputRef.current?.blur();
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion.url);
    onNavigate(suggestion.url);
    setShowSuggestions(false);
    inputRef.current?.blur();
  };

  const handleFocus = () => {
    if (inputValue.trim()) {
      setShowSuggestions(true);
    }
  };

  const handleBlur = () => {
    // Delay hiding suggestions to allow clicking on them
    setTimeout(() => setShowSuggestions(false), 200);
  };

  const isSecure = currentUrl && currentUrl.startsWith('https://');

  return (
    <div className="relative">
      <div className="flex items-center space-x-2 p-2 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={onBack}
            disabled={!canGoBack}
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={onForward}
            disabled={!canGoForward}
          >
            <ArrowRight className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={onRefresh}
          >
            <RotateCcw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={onHome}
          >
            <Home className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex-1 relative">
          <form onSubmit={handleSubmit} className="relative">
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center space-x-2">
                {isSecure && (
                  <Lock className="w-4 h-4 text-green-500" />
                )}
                <Search className="w-4 h-4 text-gray-400" />
              </div>
              <Input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                placeholder="Search or enter address..."
                className="w-full pl-12 pr-12 py-2 rounded-full border border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition-all duration-200"
              />
              {currentUrl && currentUrl !== 'about:blank' && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0"
                  onClick={onToggleBookmark}
                >
                  {isBookmarked ? (
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  ) : (
                    <StarOff className="w-4 h-4 text-gray-400" />
                  )}
                </Button>
              )}
            </div>
          </form>

          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
              {suggestions.map((suggestion) => (
                <div
                  key={suggestion.id}
                  className="flex items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer border-b border-gray-100 dark:border-gray-600 last:border-b-0 transition-colors duration-200"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <div className="w-4 h-4 mr-3 flex-shrink-0">
                    {suggestion.favicon ? (
                      <img 
                        src={suggestion.favicon} 
                        alt="" 
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    ) : (
                      <Search className="w-4 h-4 text-gray-400" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm text-gray-900 dark:text-white truncate">
                      {suggestion.title}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {suggestion.url}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddressBar;