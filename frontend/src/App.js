import React, { useState, useEffect } from 'react';
import './App.css';
import TabManager from './components/TabManager';
import AddressBar from './components/AddressBar';
import NewTabPage from './components/NewTabPage';
import WebView from './components/WebView';
import { mockTabs, mockBookmarks, mockHistory, formatUrl, isValidUrl } from './mock';

function App() {
  const [tabs, setTabs] = useState([...mockTabs]);
  const [activeTabId, setActiveTabId] = useState(1);
  const [bookmarks, setBookmarks] = useState([...mockBookmarks]);
  const [history, setHistory] = useState([...mockHistory]);
  const [searchResults, setSearchResults] = useState([]);

  const activeTab = tabs.find(tab => tab.id === activeTabId);

  const generateTabId = () => {
    return Math.max(...tabs.map(t => t.id)) + 1;
  };

  const addToHistory = (url, title) => {
    if (url && url !== 'about:blank') {
      const newHistoryItem = {
        id: Date.now(),
        title: title || url,
        url: url,
        favicon: `${new URL(url).protocol}//${new URL(url).hostname}/favicon.ico`,
        visitedAt: new Date().toISOString()
      };
      setHistory(prev => [newHistoryItem, ...prev.filter(h => h.url !== url)]);
    }
  };

  const handleTabChange = (tabId) => {
    setActiveTabId(tabId);
  };

  const handleTabClose = (tabId) => {
    if (tabs.length > 1) {
      const newTabs = tabs.filter(tab => tab.id !== tabId);
      setTabs(newTabs);
      
      if (activeTabId === tabId) {
        const currentIndex = tabs.findIndex(tab => tab.id === tabId);
        const nextTab = newTabs[currentIndex] || newTabs[currentIndex - 1] || newTabs[0];
        setActiveTabId(nextTab.id);
      }
    }
  };

  const handleNewTab = () => {
    const newTab = {
      id: generateTabId(),
      title: 'New Tab',
      url: 'about:blank',
      favicon: null,
      isActive: false,
      isLoading: false
    };
    setTabs(prev => [...prev, newTab]);
    setActiveTabId(newTab.id);
  };

  const handleNavigate = (url) => {
    const formattedUrl = formatUrl(url);
    
    setTabs(prev => prev.map(tab => 
      tab.id === activeTabId 
        ? { ...tab, url: formattedUrl, isLoading: true }
        : tab
    ));
    
    addToHistory(formattedUrl, formattedUrl);
  };

  const handleSearch = (query) => {
    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    handleNavigate(searchUrl);
  };

  const handleBack = () => {
    console.log('Navigate back');
  };

  const handleForward = () => {
    console.log('Navigate forward');
  };

  const handleRefresh = () => {
    if (activeTab) {
      setTabs(prev => prev.map(tab => 
        tab.id === activeTabId 
          ? { ...tab, isLoading: true }
          : tab
      ));
      
      // Simulate refresh
      setTimeout(() => {
        setTabs(prev => prev.map(tab => 
          tab.id === activeTabId 
            ? { ...tab, isLoading: false }
            : tab
        ));
      }, 1000);
    }
  };

  const handleHome = () => {
    setTabs(prev => prev.map(tab => 
      tab.id === activeTabId 
        ? { ...tab, url: 'about:blank', title: 'New Tab', favicon: null }
        : tab
    ));
  };

  const handleToggleBookmark = () => {
    if (activeTab && activeTab.url && activeTab.url !== 'about:blank') {
      const isBookmarked = bookmarks.some(b => b.url === activeTab.url);
      
      if (isBookmarked) {
        setBookmarks(prev => prev.filter(b => b.url !== activeTab.url));
      } else {
        const newBookmark = {
          id: Date.now(),
          title: activeTab.title,
          url: activeTab.url,
          favicon: activeTab.favicon,
          addedAt: new Date().toISOString()
        };
        setBookmarks(prev => [newBookmark, ...prev]);
      }
    }
  };

  const handleTitleChange = (title) => {
    setTabs(prev => prev.map(tab => 
      tab.id === activeTabId 
        ? { ...tab, title }
        : tab
    ));
  };

  const handleFaviconChange = (favicon) => {
    setTabs(prev => prev.map(tab => 
      tab.id === activeTabId 
        ? { ...tab, favicon }
        : tab
    ));
  };

  const handleLoadingChange = (isLoading) => {
    setTabs(prev => prev.map(tab => 
      tab.id === activeTabId 
        ? { ...tab, isLoading }
        : tab
    ));
  };

  const isBookmarked = activeTab && bookmarks.some(b => b.url === activeTab.url);

  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900">
      <TabManager
        tabs={tabs}
        activeTab={activeTabId}
        onTabChange={handleTabChange}
        onTabClose={handleTabClose}
        onNewTab={handleNewTab}
      />
      
      <AddressBar
        currentUrl={activeTab?.url}
        isLoading={activeTab?.isLoading}
        canGoBack={false}
        canGoForward={false}
        onNavigate={handleNavigate}
        onBack={handleBack}
        onForward={handleForward}
        onRefresh={handleRefresh}
        onHome={handleHome}
        isBookmarked={isBookmarked}
        onToggleBookmark={handleToggleBookmark}
        onSearch={handleSearch}
      />
      
      <div className="flex-1 overflow-hidden">
        {activeTab?.url === 'about:blank' || !activeTab?.url ? (
          <NewTabPage
            onNavigate={handleNavigate}
            onSearch={handleSearch}
          />
        ) : (
          <WebView
            url={activeTab.url}
            onTitleChange={handleTitleChange}
            onFaviconChange={handleFaviconChange}
            onLoadingChange={handleLoadingChange}
          />
        )}
      </div>
    </div>
  );
}

export default App;