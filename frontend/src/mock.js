// Mock data for Richa Browser
export const mockSearchResults = [
  {
    id: 1,
    title: "React - A JavaScript library for building user interfaces",
    url: "https://reactjs.org",
    description: "A JavaScript library for building user interfaces. React makes it painless to create interactive UIs.",
    favicon: "https://reactjs.org/favicon.ico"
  },
  {
    id: 2,
    title: "Stack Overflow - Where Developers Learn, Share, & Build Careers",
    url: "https://stackoverflow.com",
    description: "Stack Overflow is the largest, most trusted online community for developers to learn, share their programming knowledge, and build their careers.",
    favicon: "https://cdn.sstatic.net/Sites/stackoverflow/Img/favicon.ico"
  },
  {
    id: 3,
    title: "GitHub: Where the world builds software",
    url: "https://github.com",
    description: "GitHub is where over 100 million developers shape the future of software, together. Contribute to the open source community, manage your Git repositories, and review code like a pro.",
    favicon: "https://github.githubassets.com/favicons/favicon.svg"
  },
  {
    id: 4,
    title: "MDN Web Docs",
    url: "https://developer.mozilla.org",
    description: "The MDN Web Docs site provides information about Open Web technologies including HTML, CSS, and APIs for both Web sites and progressive web apps.",
    favicon: "https://developer.mozilla.org/favicon-48x48.png"
  },
  {
    id: 5,
    title: "JavaScript.info - The Modern JavaScript Tutorial",
    url: "https://javascript.info",
    description: "Modern JavaScript Tutorial: simple, but detailed explanations with examples and tasks, including: closures, document and events, object oriented programming and more.",
    favicon: "https://javascript.info/img/favicon/favicon.png"
  }
];

export const mockBookmarks = [
  {
    id: 1,
    title: "React Documentation",
    url: "https://reactjs.org/docs",
    favicon: "https://reactjs.org/favicon.ico",
    addedAt: new Date('2024-01-15T10:30:00').toISOString()
  },
  {
    id: 2,
    title: "CSS Tricks",
    url: "https://css-tricks.com",
    favicon: "https://css-tricks.com/favicon.ico",
    addedAt: new Date('2024-01-10T14:20:00').toISOString()
  },
  {
    id: 3,
    title: "CodePen",
    url: "https://codepen.io",
    favicon: "https://cpwebassets.codepen.io/assets/favicon/favicon-aec34940fbc1a6e787974dcd360f2c6b63348d4b1f4e06c77743096d55480f33.ico",
    addedAt: new Date('2024-01-08T09:15:00').toISOString()
  }
];

export const mockHistory = [
  {
    id: 1,
    title: "How to create a React app",
    url: "https://create-react-app.dev",
    favicon: "https://create-react-app.dev/img/favicon.ico",
    visitedAt: new Date('2024-01-20T16:45:00').toISOString()
  },
  {
    id: 2,
    title: "Tailwind CSS Framework",
    url: "https://tailwindcss.com",
    favicon: "https://tailwindcss.com/favicons/favicon-32x32.png",
    visitedAt: new Date('2024-01-20T15:30:00').toISOString()
  },
  {
    id: 3,
    title: "Node.js Runtime",
    url: "https://nodejs.org",
    favicon: "https://nodejs.org/static/images/favicons/favicon.png",
    visitedAt: new Date('2024-01-20T14:20:00').toISOString()
  },
  {
    id: 4,
    title: "Express.js Framework",
    url: "https://expressjs.com",
    favicon: "https://expressjs.com/images/favicon.png",
    visitedAt: new Date('2024-01-19T11:10:00').toISOString()
  },
  {
    id: 5,
    title: "MongoDB Database",
    url: "https://mongodb.com",
    favicon: "https://www.mongodb.com/assets/images/global/favicon.ico",
    visitedAt: new Date('2024-01-19T10:00:00').toISOString()
  }
];

export const mockTabs = [
  {
    id: 1,
    title: "New Tab",
    url: "about:blank",
    favicon: null,
    isActive: true,
    isLoading: false
  }
];

// Mock function to simulate search
export const mockSearch = (query) => {
  if (!query.trim()) return [];
  
  return mockSearchResults.filter(result => 
    result.title.toLowerCase().includes(query.toLowerCase()) ||
    result.description.toLowerCase().includes(query.toLowerCase())
  );
};

// Mock function to check if URL is valid
export const isValidUrl = (string) => {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
};

// Mock function to format URL
export const formatUrl = (input) => {
  if (!input) return '';
  
  if (isValidUrl(input)) {
    return input;
  }
  
  // If it looks like a domain, add https://
  if (input.includes('.') && !input.includes(' ')) {
    return `https://${input}`;
  }
  
  // Otherwise, treat as search query
  return `https://www.google.com/search?q=${encodeURIComponent(input)}`;
};

// Mock popular websites
export const mockPopularSites = [
  {
    name: "Google",
    url: "https://www.google.com",
    favicon: "https://www.google.com/favicon.ico",
    color: "bg-blue-500"
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com",
    favicon: "https://www.youtube.com/favicon.ico",
    color: "bg-red-500"
  },
  {
    name: "Facebook",
    url: "https://www.facebook.com",
    favicon: "https://www.facebook.com/favicon.ico",
    color: "bg-blue-600"
  },
  {
    name: "Twitter",
    url: "https://www.twitter.com",
    favicon: "https://www.twitter.com/favicon.ico",
    color: "bg-sky-500"
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com",
    favicon: "https://www.instagram.com/favicon.ico",
    color: "bg-pink-500"
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com",
    favicon: "https://www.linkedin.com/favicon.ico",
    color: "bg-blue-700"
  },
  {
    name: "GitHub",
    url: "https://www.github.com",
    favicon: "https://github.githubassets.com/favicons/favicon.svg",
    color: "bg-gray-800"
  },
  {
    name: "Stack Overflow",
    url: "https://stackoverflow.com",
    favicon: "https://cdn.sstatic.net/Sites/stackoverflow/Img/favicon.ico",
    color: "bg-orange-500"
  }
];