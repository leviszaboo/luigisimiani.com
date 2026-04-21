interface IconProps {
  size?: number;
  className?: string;
}

export function PixelMail({ size = 20, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" className={className}>
      <rect x="1" y="3" width="14" height="10" fill="none" stroke="currentColor" strokeWidth="1"/>
      <rect x="2" y="4" width="1" height="1"/>
      <rect x="3" y="5" width="1" height="1"/>
      <rect x="4" y="6" width="1" height="1"/>
      <rect x="5" y="7" width="1" height="1"/>
      <rect x="6" y="8" width="1" height="1"/>
      <rect x="7" y="8" width="2" height="1"/>
      <rect x="9" y="8" width="1" height="1"/>
      <rect x="10" y="7" width="1" height="1"/>
      <rect x="11" y="6" width="1" height="1"/>
      <rect x="12" y="5" width="1" height="1"/>
      <rect x="13" y="4" width="1" height="1"/>
    </svg>
  );
}

export function PixelMapPin({ size = 20, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" className={className}>
      <rect x="6" y="1" width="4" height="1"/>
      <rect x="5" y="2" width="1" height="1"/>
      <rect x="10" y="2" width="1" height="1"/>
      <rect x="4" y="3" width="1" height="3"/>
      <rect x="11" y="3" width="1" height="3"/>
      <rect x="6" y="4" width="4" height="2"/>
      <rect x="5" y="6" width="1" height="1"/>
      <rect x="10" y="6" width="1" height="1"/>
      <rect x="6" y="7" width="1" height="1"/>
      <rect x="9" y="7" width="1" height="1"/>
      <rect x="7" y="8" width="2" height="1"/>
      <rect x="7" y="9" width="2" height="1"/>
      <rect x="7" y="10" width="2" height="1"/>
      <rect x="7" y="11" width="2" height="1"/>
      <rect x="7" y="12" width="2" height="1"/>
      <rect x="7" y="13" width="2" height="1"/>
    </svg>
  );
}

export function PixelInstagram({ size = 20, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" className={className}>
      <rect x="2" y="2" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2"/>
      <rect x="6" y="6" width="4" height="4"/>
      <rect x="11" y="3" width="2" height="2"/>
    </svg>
  );
}

export function PixelLinkedin({ size = 20, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" className={className}>
      <rect x="2" y="2" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2"/>
      <rect x="4" y="5" width="2" height="1"/>
      <rect x="4" y="7" width="2" height="4"/>
      <rect x="7" y="7" width="2" height="4"/>
      <rect x="7" y="6" width="2" height="1"/>
      <rect x="9" y="7" width="1" height="1"/>
      <rect x="10" y="8" width="2" height="3"/>
    </svg>
  );
}
