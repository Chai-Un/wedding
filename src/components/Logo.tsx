interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  imageSrc?: string;
  variant?: 'text' | 'image';
}

export default function Logo({ size = 'md', className = '', imageSrc, variant = 'text' }: LogoProps) {
  const sizeClasses = {
    sm: 'w-16 h-14',
    md: 'w-32 h-28',
    lg: 'w-40 h-36'
  };

  const textSizeClasses = {
    sm: 'text-2xl',
    md: 'text-4xl',
    lg: 'text-5xl'
  };

  if (variant === 'image' && imageSrc) {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        <div className={`${sizeClasses[size]} relative`}>
          <img 
            src={imageSrc} 
            alt="HN Logo" 
            className="w-full h-full object-contain"
            draggable="false"
          />
        </div>
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <span 
        className={`${textSizeClasses[size]} text-white`}
        style={{ 
          fontFamily: 'CustomSerif, serif',
          fontSize: '1em',
          fontWeight: 400,
          fontStyle: 'normal',
          letterSpacing: '-0.002em',
          lineHeight: '40px'
        }}
      >
        HN
      </span>
    </div>
  );
}
