import React, { useState, useEffect } from 'react';
import { AlertCircle, Globe, Shield, Eye, EyeOff } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Alert, AlertDescription } from './ui/alert';

const WebView = ({ url, onTitleChange, onFaviconChange, onLoadingChange }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showIframe, setShowIframe] = useState(true);
  const [iframeKey, setIframeKey] = useState(0);

  useEffect(() => {
    if (url && url !== 'about:blank') {
      setIsLoading(true);
      setError(null);
      onLoadingChange(true);
      
      // Simulate loading delay
      const timer = setTimeout(() => {
        setIsLoading(false);
        onLoadingChange(false);
        
        // Extract title and favicon from URL
        try {
          const urlObj = new URL(url);
          const domain = urlObj.hostname;
          onTitleChange(domain);
          onFaviconChange(`${urlObj.protocol}//${domain}/favicon.ico`);
        } catch (e) {
          onTitleChange(url);
          onFaviconChange(null);
        }
      }, 1000);

      return () => clearTimeout(timer);
    } else {
      setIsLoading(false);
      onLoadingChange(false);
    }
  }, [url, onTitleChange, onFaviconChange, onLoadingChange]);

  const handleIframeError = () => {
    setError(true);
    setIsLoading(false);
    onLoadingChange(false);
  };

  const handleIframeLoad = () => {
    setIsLoading(false);
    onLoadingChange(false);
    setError(null);
  };

  const refreshIframe = () => {
    setIframeKey(prev => prev + 1);
    setError(null);
    setIsLoading(true);
    onLoadingChange(true);
  };

  const toggleIframe = () => {
    setShowIframe(!showIframe);
  };

  if (!url || url === 'about:blank') {
    return null;
  }

  return (
    <div className="flex-1 bg-white dark:bg-gray-900 relative">
      {isLoading && (
        <div className="absolute inset-0 bg-white dark:bg-gray-900 flex items-center justify-center z-10">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-300">Loading {url}...</p>
          </div>
        </div>
      )}

      {error && (
        <div className="p-4">
          <Alert className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Unable to load this page. This might be due to security restrictions or the site may not allow embedding.
            </AlertDescription>
          </Alert>
          
          <Card>
            <CardContent className="p-6 text-center">
              <Globe className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                Page Cannot Be Displayed
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                The website {url} cannot be embedded due to security policies.
              </p>
              <div className="flex justify-center space-x-4">
                <Button onClick={refreshIframe} variant="outline">
                  Try Again
                </Button>
                <Button 
                  onClick={() => window.open(url, '_blank')}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Open in New Window
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {!error && url && url !== 'about:blank' && (
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-green-500" />
              <span className="text-sm text-gray-600 dark:text-gray-300">
                Secure Connection
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleIframe}
              className="h-8 w-8 p-0"
            >
              {showIframe ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </Button>
          </div>
          
          {showIframe && (
            <iframe
              key={iframeKey}
              src={url}
              className="w-full flex-1 border-0"
              onLoad={handleIframeLoad}
              onError={handleIframeError}
              sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
              title="Web Content"
            />
          )}
          
          {!showIframe && (
            <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-800">
              <div className="text-center">
                <Eye className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                  Content Hidden
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Click the eye icon to show the webpage content
                </p>
                <Button onClick={toggleIframe}>
                  Show Content
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default WebView;