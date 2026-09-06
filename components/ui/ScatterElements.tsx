import React from 'react';

// ── 1. Basil Leaf (Fresh Organic Garden Herb) ──
export function ScatterBasil({ size = 48, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`drop-shadow-md select-none ${className}`}
    >
      <defs>
        <linearGradient id="basilGrad" x1="12" y1="8" x2="52" y2="56" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#5EA86B" />
          <stop offset="60%" stopColor="#2E5A36" />
          <stop offset="100%" stopColor="#1B3D24" />
        </linearGradient>
        <linearGradient id="basilHighlight" x1="18" y1="12" x2="38" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#8AD498" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#5EA86B" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M32 6C42 12 56 26 52 46C49 55 38 60 26 56C12 51 8 36 10 22C12 12 22 6 32 6Z"
        fill="url(#basilGrad)"
      />
      <path
        d="M28 10C35 15 45 25 42 38C40 44 32 46 22 43C15 40 13 30 14 20C15 13 22 10 28 10Z"
        fill="url(#basilHighlight)"
      />
      {/* Central vein */}
      <path
        d="M32 10C30 22 28 36 24 54"
        stroke="#8AD498"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeOpacity="0.65"
      />
      {/* Lateral veins */}
      <path d="M30 20C36 22 42 26 44 30" stroke="#8AD498" strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.45" />
      <path d="M28 30C34 32 38 38 40 42" stroke="#8AD498" strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.45" />
      <path d="M28 24C22 26 17 30 15 34" stroke="#8AD498" strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.45" />
      <path d="M26 34C20 37 17 42 16 46" stroke="#8AD498" strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.45" />
    </svg>
  );
}

// ── 2. Cherry Tomato (Sun-Ripened Vine Tomato) ──
export function ScatterTomato({ size = 44, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`drop-shadow-lg select-none ${className}`}
    >
      <defs>
        <radialGradient id="tomatoGrad" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#FF6B55" />
          <stop offset="45%" stopColor="#E2341D" />
          <stop offset="85%" stopColor="#B51B08" />
          <stop offset="100%" stopColor="#7E1004" />
        </radialGradient>
        <linearGradient id="stemGrad" x1="20" y1="6" x2="40" y2="24" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#66B874" />
          <stop offset="100%" stopColor="#2E5A36" />
        </linearGradient>
      </defs>
      {/* Tomato body */}
      <ellipse cx="30" cy="33" rx="22" ry="20" fill="url(#tomatoGrad)" />
      {/* Specular highlight */}
      <ellipse cx="23" cy="25" rx="7" ry="4" transform="rotate(-25 23 25)" fill="#FFFFFF" fillOpacity="0.42" />
      {/* Calyx stem */}
      <path
        d="M30 18C28 14 26 10 24 8M30 18C34 14 38 11 41 9M30 18C24 17 19 19 16 20M30 18C36 18 41 20 44 21M30 18C29 12 30 7 31 4"
        stroke="url(#stemGrad)"
        strokeWidth="2.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

// ── 3. Avocado Slice (Creamy Hass Avocado) ──
export function ScatterAvocado({ size = 56, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 70 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`drop-shadow-md select-none ${className}`}
    >
      <defs>
        <linearGradient id="avoSkin" x1="10" y1="10" x2="60" y2="60" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2A482A" />
          <stop offset="100%" stopColor="#142614" />
        </linearGradient>
        <linearGradient id="avoFlesh" x1="15" y1="15" x2="55" y2="55" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E9F7C2" />
          <stop offset="50%" stopColor="#CBE686" />
          <stop offset="85%" stopColor="#88B849" />
          <stop offset="100%" stopColor="#3E692D" />
        </linearGradient>
      </defs>
      {/* Outer dark skin rind */}
      <path
        d="M12 40C10 24 24 10 38 12C50 14 58 26 56 42C54 54 44 60 30 58C18 56 13 48 12 40Z"
        fill="url(#avoSkin)"
      />
      {/* Creamy green flesh */}
      <path
        d="M15 39C13 26 25 14 37 15C47 17 54 27 52 41C50 51 41 56 29 55C20 53 16 46 15 39Z"
        fill="url(#avoFlesh)"
      />
      {/* Seed cavity arc */}
      <path
        d="M26 30C28 25 36 26 40 31C43 36 41 44 35 46C29 48 24 42 24 37C24 34 25 32 26 30Z"
        fill="#A67B46"
        fillOpacity="0.45"
      />
    </svg>
  );
}

// ── 4. Star Anise (Warm Organic Botanical Spice) ──
export function ScatterStarAnise({ size = 48, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`drop-shadow-md select-none ${className}`}
    >
      <defs>
        <linearGradient id="aniseWood" x1="16" y1="16" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#8C532B" />
          <stop offset="60%" stopColor="#5E3214" />
          <stop offset="100%" stopColor="#3B1C08" />
        </linearGradient>
      </defs>
      {/* 8-pointed star anise carpels */}
      <g transform="translate(32 32)">
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
          <g key={angle} transform={`rotate(${angle})`}>
            <path
              d="M0 -5C3 -12 4 -22 0 -26C-4 -22 -3 -12 0 -5Z"
              fill="url(#aniseWood)"
            />
            {/* Seed shiny pocket */}
            <circle cx="0" cy="-17" r="2.2" fill="#E2A658" />
          </g>
        ))}
        {/* Center hub */}
        <circle cx="0" cy="0" r="5" fill="#42210C" />
      </g>
    </svg>
  );
}

// ── 5. Wooden Spice Spoon ──
export function ScatterSpiceSpoon({ size = 110, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size * 0.4}
      viewBox="0 0 160 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`drop-shadow-lg select-none ${className}`}
    >
      <defs>
        <linearGradient id="woodHandle" x1="0" y1="32" x2="160" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#875128" />
          <stop offset="40%" stopColor="#AF7545" />
          <stop offset="80%" stopColor="#875128" />
          <stop offset="100%" stopColor="#5E3414" />
        </linearGradient>
      </defs>
      {/* Long wooden handle */}
      <path
        d="M10 29C10 27 60 28 110 26C112 28 112 36 110 38C60 36 10 37 10 35C8 33 8 30 10 29Z"
        fill="url(#woodHandle)"
      />
      {/* Spoon head oval */}
      <ellipse cx="132" cy="32" rx="22" ry="16" fill="url(#woodHandle)" />
      {/* Bowl interior with roasted cumin seeds */}
      <ellipse cx="132" cy="32" rx="17" ry="12" fill="#5A3414" />
      <circle cx="128" cy="30" r="1.5" fill="#E5A910" />
      <circle cx="134" cy="32" r="1.8" fill="#F2B705" />
      <circle cx="137" cy="29" r="1.3" fill="#D49E00" />
      <circle cx="130" cy="35" r="1.4" fill="#C48800" />
      <circle cx="135" cy="36" r="1.6" fill="#F5C842" />
    </svg>
  );
}

// ── 6. Lime / Lemon Slice ──
export function ScatterLemon({ size = 46, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`drop-shadow-md select-none ${className}`}
    >
      <defs>
        <radialGradient id="limeRind" cx="50%" cy="50%" r="50%">
          <stop offset="80%" stopColor="#5DAA38" />
          <stop offset="100%" stopColor="#2E6814" />
        </radialGradient>
      </defs>
      <circle cx="30" cy="30" r="24" fill="url(#limeRind)" />
      <circle cx="30" cy="30" r="21" fill="#FFFFFF" fillOpacity="0.8" />
      <circle cx="30" cy="30" r="18" fill="#8CE04F" />
      {/* Segments */}
      <g stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.9">
        <line x1="30" y1="12" x2="30" y2="48" />
        <line x1="12" y1="30" x2="48" y2="30" />
        <line x1="17" y1="17" x2="43" y2="43" />
        <line x1="17" y1="43" x2="43" y2="17" />
      </g>
      <circle cx="30" cy="30" r="3.5" fill="#FFFFFF" />
    </svg>
  );
}

// ── 7. Tellicherry Peppercorn Scatter & Flaky Sea Salt ──
export function ScatterPeppercorns({ size = 52, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`drop-shadow-sm select-none ${className}`}
    >
      {/* Dark roasted peppercorns */}
      <circle cx="14" cy="20" r="4.5" fill="#1C1B18" />
      <circle cx="13" cy="19" r="1.2" fill="#6B685F" />

      <circle cx="38" cy="14" r="3.8" fill="#292823" />
      <circle cx="37" cy="13" r="1" fill="#8A867B" />

      <circle cx="48" cy="36" r="4.8" fill="#181714" />
      <circle cx="47" cy="35" r="1.4" fill="#59564E" />

      <circle cx="22" cy="46" r="4" fill="#262520" />
      <circle cx="21" cy="45" r="1.1" fill="#757167" />

      <circle cx="34" cy="32" r="3.5" fill="#1E1D19" />

      {/* Flaky sea salt crystals */}
      <rect x="25" y="18" width="3.2" height="3.2" transform="rotate(25 25 18)" fill="#FFFFFF" fillOpacity="0.85" />
      <rect x="42" y="24" width="2.5" height="2.5" transform="rotate(40 42 24)" fill="#FAF8F3" fillOpacity="0.9" />
      <rect x="18" y="32" width="2.8" height="2.8" transform="rotate(-15 18 32)" fill="#FFFFFF" fillOpacity="0.8" />
      <rect x="36" y="44" width="3" height="3" transform="rotate(10 36 44)" fill="#FFFFFF" fillOpacity="0.85" />
    </svg>
  );
}

// ── 8. Quinoa & Grain Cluster ──
export function ScatterGrain({ size = 46, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none ${className}`}
    >
      <ellipse cx="14" cy="16" rx="2.5" ry="1.8" transform="rotate(35 14 16)" fill="#D4A76A" />
      <ellipse cx="22" cy="12" rx="2.8" ry="1.9" transform="rotate(-20 22 12)" fill="#F2C779" />
      <ellipse cx="32" cy="18" rx="2.4" ry="1.7" transform="rotate(45 32 18)" fill="#B5483C" />
      <ellipse cx="26" cy="24" rx="2.7" ry="1.8" transform="rotate(10 26 24)" fill="#E8B868" />
      <ellipse cx="16" cy="30" rx="2.5" ry="1.8" transform="rotate(-40 16 30)" fill="#7D261E" />
      <ellipse cx="36" cy="28" rx="2.8" ry="1.9" transform="rotate(25 36 28)" fill="#F2C779" />
      <ellipse cx="28" cy="36" rx="2.4" ry="1.7" transform="rotate(-15 28 36)" fill="#D4A76A" />
    </svg>
  );
}

// ── 9. Fresh Organic Strawberries with Leaves (Reference Art Asset) ──
export function ScatterStrawberry({ size = 56, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`drop-shadow-lg select-none ${className}`}
    >
      <defs>
        <radialGradient id="berryGrad" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#FF4A5A" />
          <stop offset="45%" stopColor="#E51E38" />
          <stop offset="85%" stopColor="#AD0A22" />
          <stop offset="100%" stopColor="#750214" />
        </radialGradient>
        <radialGradient id="smallBerryGrad" cx="40%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#FF6B7A" />
          <stop offset="60%" stopColor="#D91630" />
          <stop offset="100%" stopColor="#8A071A" />
        </radialGradient>
      </defs>

      {/* Main Strawberry Body */}
      <path
        d="M34 22 C44 23 52 32 48 44 C44 54 36 60 30 60 C24 60 16 54 14 44 C10 32 18 23 28 22 Z"
        fill="url(#berryGrad)"
      />
      {/* Specular Highlight */}
      <ellipse cx="24" cy="32" rx="4" ry="8" transform="rotate(-20 24 32)" fill="#FFFFFF" fillOpacity="0.25" />

      {/* Yellow Seeds */}
      <circle cx="28" cy="29" r="0.9" fill="#FFDC73" />
      <circle cx="35" cy="31" r="0.9" fill="#FFDC73" />
      <circle cx="23" cy="37" r="0.9" fill="#FFDC73" />
      <circle cx="31" cy="38" r="0.9" fill="#FFDC73" />
      <circle cx="39" cy="39" r="0.9" fill="#FFDC73" />
      <circle cx="27" cy="46" r="0.9" fill="#FFDC73" />
      <circle cx="34" cy="47" r="0.9" fill="#FFDC73" />
      <circle cx="30" cy="54" r="0.9" fill="#FFDC73" />

      {/* Leaves / Calyx on Main Berry */}
      <path
        d="M31 22 C34 16 40 14 43 15 C39 19 36 21 34 23 M31 22 C29 15 24 13 20 14 C23 18 26 21 28 23 M31 22 C32 14 31 10 31 7 C30 11 29 16 29 22 M31 22 C36 19 42 20 46 22 C41 23 37 23 33 24 M31 22 C26 19 20 20 16 22 C21 23 25 23 29 24"
        stroke="#4FA85D"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Smaller Secondary Strawberry tucked behind */}
      <path
        d="M19 14 C26 15 31 21 29 29 C26 35 21 39 17 39 C13 39 8 35 7 29 C5 21 11 15 17 14 Z"
        fill="url(#smallBerryGrad)"
        opacity="0.9"
      />
      {/* Leaves on Small Berry */}
      <path
        d="M17 14 C19 9 23 8 25 9 C22 12 20 13 19 15 M17 14 C15 9 12 8 9 9 C11 12 13 13 15 15 M17 14 C17 8 16 6 16 4"
        stroke="#3F8E4C"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
