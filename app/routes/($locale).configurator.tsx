import {useState, useEffect, lazy, Suspense, useRef} from 'react';
import type {MetaFunction, LinksFunction} from 'react-router';
import {Link} from 'react-router';
import openscadStyles from 'openscad-playground/styles?url';
import configuratorStyles from '~/styles/configurator.css?url';

export const links: LinksFunction = () => [
  {rel: 'stylesheet', href: openscadStyles},
  {rel: 'stylesheet', href: configuratorStyles},
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap',
  },
];

export const meta: MetaFunction = () => {
  return [
    {title: 'Gridfinity Kit Configurator'},
    {
      name: 'description',
      content: 'Design and customize your Gridfinity storage solutions',
    },
  ];
};

const GRIDFINITY_CODE = `// Gridfinity Kit Configurator
// Configure your custom Gridfinity storage solution

/* [Grid Size] */
// Number of units in X direction
grid_x = 2; // [1:1:6]
// Number of units in Y direction  
grid_y = 2; // [1:1:6]
// Number of units in Z direction (height)
grid_z = 3; // [1:1:6]

/* [Wall Options] */
// Wall thickness in mm
wall_thickness = 1.2; // [0.8:0.1:2.4]
// Enable magnetic holes
magnets = true;
// Enable screw holes
screw_holes = false;

/* [Dividers] */
// Number of X dividers
dividers_x = 0; // [0:1:5]
// Number of Y dividers
dividers_y = 0; // [0:1:5]

/* [Style] */
// Corner radius
corner_radius = 3.75; // [0:0.25:8]
// Lip style
lip_style = "normal"; // [normal, reduced, none]

/* [Advanced] */
// Base unit size (mm)
unit_size = 42;
// Base height (mm)
base_height = 5;
// Tolerance for fit
tolerance = 0.25; // [0:0.05:0.5]

// Constants
$fn = 32;
grid_unit = unit_size;
magnet_d = 6.5;
magnet_h = 2.4;
screw_d = 3;

module gridfinity_base(x, y) {
    base_w = x * grid_unit - tolerance * 2;
    base_d = y * grid_unit - tolerance * 2;
    
    difference() {
        // Main base with rounded corners
        hull() {
            for (dx = [corner_radius, base_w - corner_radius])
                for (dy = [corner_radius, base_d - corner_radius])
                    translate([dx, dy, 0])
                        cylinder(h = base_height, r = corner_radius);
        }
        
        // Magnet holes
        if (magnets) {
            for (dx = [4.8, base_w - 4.8])
                for (dy = [4.8, base_d - 4.8])
                    translate([dx, dy, base_height - magnet_h + 0.01])
                        cylinder(d = magnet_d, h = magnet_h + 0.1);
        }
        
        // Screw holes
        if (screw_holes) {
            for (dx = [4.8, base_w - 4.8])
                for (dy = [4.8, base_d - 4.8])
                    translate([dx, dy, -0.01])
                        cylinder(d = screw_d, h = base_height + 0.1);
        }
    }
}

module gridfinity_walls(x, y, z) {
    wall_w = x * grid_unit - tolerance * 2;
    wall_d = y * grid_unit - tolerance * 2;
    wall_h = z * 7; // 7mm per height unit
    
    lip_h = lip_style == "none" ? 0 : (lip_style == "reduced" ? 1.8 : 3.8);
    
    difference() {
        // Outer walls
        hull() {
            for (dx = [corner_radius, wall_w - corner_radius])
                for (dy = [corner_radius, wall_d - corner_radius])
                    translate([dx, dy, base_height])
                        cylinder(h = wall_h + lip_h, r = corner_radius);
        }
        
        // Inner cavity
        inner_offset = wall_thickness;
        translate([inner_offset, inner_offset, base_height + wall_thickness])
            hull() {
                for (dx = [corner_radius, wall_w - corner_radius - inner_offset * 2])
                    for (dy = [corner_radius, wall_d - corner_radius - inner_offset * 2])
                        translate([dx, dy, 0])
                            cylinder(h = wall_h + lip_h + 0.1, r = max(0.5, corner_radius - inner_offset));
            }
    }
}

module gridfinity_dividers(x, y, z) {
    wall_w = x * grid_unit - tolerance * 2;
    wall_d = y * grid_unit - tolerance * 2;
    wall_h = z * 7;
    inner_offset = wall_thickness;
    
    // X dividers
    if (dividers_x > 0) {
        spacing_x = (wall_w - inner_offset * 2) / (dividers_x + 1);
        for (i = [1:dividers_x]) {
            translate([inner_offset + i * spacing_x - wall_thickness/2, inner_offset, base_height + wall_thickness])
                cube([wall_thickness, wall_d - inner_offset * 2, wall_h - wall_thickness]);
        }
    }
    
    // Y dividers
    if (dividers_y > 0) {
        spacing_y = (wall_d - inner_offset * 2) / (dividers_y + 1);
        for (i = [1:dividers_y]) {
            translate([inner_offset, inner_offset + i * spacing_y - wall_thickness/2, base_height + wall_thickness])
                cube([wall_w - inner_offset * 2, wall_thickness, wall_h - wall_thickness]);
        }
    }
}

// Main assembly
color("#3b82f6")
union() {
    gridfinity_base(grid_x, grid_y);
    gridfinity_walls(grid_x, grid_y, grid_z);
    gridfinity_dividers(grid_x, grid_y, grid_z);
}
`;

// Lazy load the OpenSCAD component (client-only)
const OpenSCADPlayground = lazy(() =>
  import('openscad-playground').then((mod) => ({
    default: mod.OpenSCADPlayground,
  })),
);

function loadScript(src: string, isModule = false): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = src;
    if (isModule) {
      script.type = 'module';
    }
    script.onload = () => resolve();
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

function loadStylesheet(href: string, id: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.getElementById(id)) {
      resolve();
      return;
    }
    const link = document.createElement('link');
    link.id = id;
    link.rel = 'stylesheet';
    link.href = href;
    link.onload = () => resolve();
    link.onerror = reject;
    document.head.appendChild(link);
  });
}

function ConfiguratorClient() {
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;

    async function init() {
      try {
        // Load BrowserFS (required for virtual filesystem)
        await loadScript('/browserfs.min.js');
        // Load model-viewer as ES module (required for 3D preview)
        await loadScript('https://ajax.googleapis.com/ajax/libs/model-viewer/3.5.0/model-viewer.min.js', true);
        // OpenSCAD styles loaded via route links function

        if (!cancelled) {
          setReady(true);
        }
      } catch (err) {
        if (!cancelled) {
          setError('Failed to load required scripts');
          console.error('Script load error:', err);
        }
      }
    }

    init();
    return () => {
      cancelled = true;
      // Remove styles when component unmounts
      const styleEl = document.getElementById('openscad-styles');
      if (styleEl) {
        styleEl.remove();
      }
    };
  }, []);

  if (error) {
    return (
      <div className="configurator-loading">
        <div className="loading-content">
          <h2 style={{color: '#ef4444'}}>Failed to Load</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!ready) {
    return <ConfiguratorLoading />;
  }

  return (
    <Suspense fallback={<ConfiguratorLoading />}>
      <OpenSCADPlayground
        initialFiles={{
          'gridfinity-bin.scad': GRIDFINITY_CODE,
        }}
        initialState={{
          view: {
            layout: {
              mode: 'multi',
              editor: false,
              viewer: true,
              customizer: true,
            },
            color: '#3b82f6',
            showAxes: true,
            showBuildPlate: true,
          },
        }}
        layout="multi"
        theme="dark"
        features={{
          filePicker: false,
          export: true,
          syntaxCheck: true,
          customizer: true,
        }}
        style={{
          width: '100%',
          height: '100%',
        }}
        onError={(err) => {
          console.error('OpenSCAD Error:', err);
        }}
      />
    </Suspense>
  );
}

function ConfiguratorLoading() {
  return (
    <div className="configurator-loading">
      <div className="loading-content">
        <div className="loading-spinner" />
        <h2>Loading OpenSCAD Engine</h2>
        <p>Initializing WebAssembly runtime...</p>
      </div>
    </div>
  );
}

export default function GridfinityConfigurator() {
  return (
    <div className="configurator-wrapper">
      <header className="configurator-header">
        <div className="header-left">
          <Link to="/" className="back-link">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Store
          </Link>
        </div>
        <div className="header-center">
          <h1>Gridfinity Kit Configurator</h1>
        </div>
        <div className="header-right">
          <span className="badge">Beta</span>
        </div>
      </header>
      <main className="configurator-main">
        <ConfiguratorClient />
      </main>
    </div>
  );
}
