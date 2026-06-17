/* Lightweight inline icon component — Lucide-style strokes.
   Usage: <Icon name="search" size={16} /> */
const Icon = ({ name, size = 16, className = "", style = {} }) => {
  const s = { width: size, height: size, ...style };
  const common = {
    viewBox: "0 0 24 24", fill: "none", stroke: "currentColor",
    strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round",
    style: s, className,
  };
  const paths = {
    sparkles:  <><path d="M12 3l1.9 4.6L18.5 9.5l-4.6 1.9L12 16l-1.9-4.6L5.5 9.5l4.6-1.9z"/><path d="M18 14l.9 2.2L21 17l-2.1.8L18 20l-.9-2.2L15 17l2.1-.8z"/></>,
    cloud:     <><path d="M17 18a4 4 0 00.4-7.98A6 6 0 006 10.5 4 4 0 007 18h10z"/></>,
    compass:   <><circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/></>,
    home:      <><path d="M3 11l9-8 9 8v10a2 2 0 01-2 2h-4v-7h-6v7H5a2 2 0 01-2-2z"/></>,
    user:      <><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0116 0"/></>,
    file:      <><path d="M13 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V9z"/><path d="M13 3v6h6"/></>,
    folder:    <><path d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></>,
    book:      <><path d="M4 4a2 2 0 012-2h12v18H6a2 2 0 00-2 2z"/><path d="M18 2v18"/></>,
    heart:     <><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></>,
    mail:      <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></>,
    search:    <><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></>,
    arrow:     <><path d="M5 12h14M13 5l7 7-7 7"/></>,
    arrowDown: <><path d="M12 5v14M5 12l7 7 7-7"/></>,
    chevronDown: <><path d="M6 9l6 6 6-6"/></>,
    award:       <><circle cx="12" cy="8" r="6"/><path d="M8.21 13.89L7 22l5-3 5 3-1.21-8.12"/></>,
    chevronRight: <><path d="M9 6l6 6-6 6"/></>,
    chevronLeft: <><path d="M15 6l-6 6 6 6"/></>,
    download:  <><path d="M12 3v13M6 11l6 6 6-6"/><path d="M5 21h14"/></>,
    github:    <><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/></>,
    linkedin:  <><rect x="2" y="2" width="20" height="20" rx="2"/><path d="M8 10v7M8 7v.01M12 17v-7M16 17v-4a2 2 0 00-4 0"/></>,
    ext:       <><path d="M7 17L17 7M9 7h8v8"/></>,
    command:   <><path d="M15 6a3 3 0 113 3h-3V6zM9 18a3 3 0 11-3-3h3v3zM15 18v-3h3a3 3 0 11-3 3zM9 6v3H6a3 3 0 113-3z"/></>,
    shield:    <><path d="M12 3l8 3v6a9 9 0 01-8 9 9 9 0 01-8-9V6z"/></>,
    music:     <><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></>,
    tool:      <><path d="M14.7 6.3a4 4 0 005.7 5.7l1 1-8 8-7-7 8-8z"/></>,
    drone:     <><path d="M12 12l4-4M12 12l-4-4M12 12l4 4M12 12l-4 4"/><circle cx="5" cy="5" r="2"/><circle cx="19" cy="5" r="2"/><circle cx="5" cy="19" r="2"/><circle cx="19" cy="19" r="2"/></>,
    users:     <><circle cx="9" cy="8" r="4"/><path d="M2 21a7 7 0 0114 0M17 11a4 4 0 100-8M22 21a7 7 0 00-5-6.7"/></>,
    filter:    <><path d="M3 4h18l-7 9v6l-4 2v-8z"/></>,
    tag:       <><path d="M20 13l-7 7a2 2 0 01-2.8 0L3 12.8V4h8.8l8.2 8.2a2 2 0 010 2.8z"/><circle cx="8" cy="8" r="1.5"/></>,
    sun:       <><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></>,
    moon:      <><path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z"/></>,
    settings:  <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 00.3 1.8l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.8-.3 1.7 1.7 0 00-1 1.5V21a2 2 0 11-4 0v-.1a1.7 1.7 0 00-1.1-1.5 1.7 1.7 0 00-1.8.3l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.7 1.7 0 00.3-1.8 1.7 1.7 0 00-1.5-1H3a2 2 0 110-4h.1a1.7 1.7 0 001.5-1 1.7 1.7 0 00-.3-1.8l-.1-.1a2 2 0 112.8-2.8l.1.1a1.7 1.7 0 001.8.3h.1a1.7 1.7 0 001-1.5V3a2 2 0 114 0v.1a1.7 1.7 0 001 1.5 1.7 1.7 0 001.8-.3l.1-.1a2 2 0 112.8 2.8l-.1.1a1.7 1.7 0 00-.3 1.8v.1a1.7 1.7 0 001.5 1H21a2 2 0 110 4h-.1a1.7 1.7 0 00-1.5 1z"/></>,
    zap:       <><path d="M13 2L3 14h9l-1 8 10-12h-9z"/></>,
    check:     <><path d="M20 6L9 17l-5-5"/></>,
    x:         <><path d="M18 6L6 18M6 6l12 12"/></>,
    menu:      <><path d="M3 6h18M3 12h18M3 18h18"/></>,
    play:      <><path d="M5 3l14 9-14 9V3z"/></>,
    send:      <><path d="M22 2L11 13M22 2l-7 20-4-9-9-4z"/></>,
    clock:     <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    calendar:  <><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M3 10h18M8 2v4M16 2v4"/></>,
    dot:       <circle cx="12" cy="12" r="3"/>,
    server:    <><rect x="2" y="3" width="20" height="8" rx="2"/><rect x="2" y="13" width="20" height="8" rx="2"/><path d="M6 7h.01M6 17h.01"/></>,
    layers:    <><path d="M12 2l10 6-10 6L2 8z"/><path d="M2 16l10 6 10-6"/><path d="M2 12l10 6 10-6"/></>,
    list:      <><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></>,
    grid:      <><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></>,
    code:      <><path d="M16 18l6-6-6-6M8 6l-6 6 6 6"/></>,
    share:     <><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></>,
    sliders:   <><path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"/></>,
  };
  return (
    <svg {...common}>
      {paths[name] || paths.dot}
    </svg>
  );
};

window.Icon = Icon;
