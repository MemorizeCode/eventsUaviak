import React, { Suspense } from 'react';

interface DynamicAntdProps {
  component: () => Promise<any>;
  fallback?: React.ReactNode;
  [key: string]: any;
}

export const DynamicAntd: React.FC<DynamicAntdProps> = ({ 
  component: Component, 
  fallback = <div>Loading...</div>,
  ...props 
}) => {
  const LazyComponent = React.lazy(() => Component());
  
  return (
    <Suspense fallback={fallback}>
      <LazyComponent {...props} />
    </Suspense>
  );
}; 