interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  align?: 'center' | 'left';
  className?: string;
}

export function SectionHeader({ 
  title, 
  subtitle, 
  align = 'center',
  className = ''
}: SectionHeaderProps) {
  const alignmentClass = align === 'center' ? 'text-center' : 'text-left';
  
  return (
    <div className={`${alignmentClass} mb-16 ${className}`}>
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}



