import React from 'react';
import * as LucideIcons from 'lucide-react';

interface IconWrapperProps {
  name: string;
  className?: string;
  [key: string]: any;
}

const IconWrapper: React.FC<IconWrapperProps> = ({ name, className = '', ...props }) => {
  // Get the icon component from Lucide
  const IconComponent = (LucideIcons as any)[name];

  // If the icon doesn't exist, return a fallback
  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in lucide-react`);
    return <span className={`inline-block ${className}`}>?</span>;
  }

  return (
    <IconComponent
      className={`inline-block ${className}`}
      {...props}
    />
  );
};

export default IconWrapper;
