// Performance monitoring utility
export const performanceMonitor = {
  // Track page load time
  trackPageLoad: (pageName) => {
    if (typeof window !== 'undefined') {
      const loadTime = performance.now();
      console.log(`${pageName} loaded in ${loadTime.toFixed(2)}ms`);
      
      // Send to analytics if available
      if (window.gtag) {
        window.gtag('event', 'page_load', {
          page_name: pageName,
          load_time: loadTime
        });
      }
    }
  },

  // Track component render time
  trackComponentRender: (componentName, startTime) => {
    const renderTime = performance.now() - startTime;
    console.log(`${componentName} rendered in ${renderTime.toFixed(2)}ms`);
  },

  // Track user interactions
  trackInteraction: (action, details = {}) => {
    if (typeof window !== 'undefined') {
      console.log(`User interaction: ${action}`, details);
      
      if (window.gtag) {
        window.gtag('event', 'user_interaction', {
          action,
          ...details
        });
      }
    }
  },

  // Measure time for async operations
  measureAsync: async (operationName, operation) => {
    const startTime = performance.now();
    try {
      const result = await operation();
      const duration = performance.now() - startTime;
      console.log(`${operationName} completed in ${duration.toFixed(2)}ms`);
      return result;
    } catch (error) {
      const duration = performance.now() - startTime;
      console.error(`${operationName} failed after ${duration.toFixed(2)}ms:`, error);
      throw error;
    }
  }
};

// Performance hook for React components
export const usePerformanceTracking = (componentName) => {
  const startTimeRef = React.useRef(performance.now());
  
  React.useEffect(() => {
    const startTime = startTimeRef.current;
    performanceMonitor.trackComponentRender(componentName, startTime);
  }, [componentName]);
}; 