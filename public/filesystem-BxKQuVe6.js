function f(t, e, i) {
  const r = [];
  for (const s of Object.keys(t))
    i && !i(s) || r.push(e(s, t[s]));
  return r;
}
function h(t) {
  let e;
  const i = new Promise((r, s) => {
    e = t(r, s);
  });
  return Object.assign(i, { kill: e });
}
function S(t, e) {
  let i, r;
  return (...s) => ({ now: n }) => h((o, a) => {
    let c;
    return (async () => {
      const l = async () => {
        r && (r(), r = null), c = e(...s), r = c.kill;
        try {
          o(await c);
        } catch (d) {
          a(d);
        } finally {
          r = null;
        }
      };
      i && (clearTimeout(i), i = null), n ? l() : i = window.setTimeout(l, t);
    })(), () => c?.kill();
  });
}
function y(t) {
  return t < 1024 ? `${Math.floor(t)} bytes` : (t /= 1024, t < 1024 ? `${Math.floor(t * 10) / 10} kB` : (t /= 1024, `${Math.floor(t * 10) / 10} MB`));
}
function C(t) {
  return t < 1e3 ? `${Math.floor(t)}ms` : `${Math.floor(t / 100) / 10}sec`;
}
function O() {
  const t = () => {
    document.documentElement.style.setProperty("--app-height", `${window.innerHeight}px`);
  };
  window.addEventListener("resize", t), t();
}
function w() {
  return !!("standalone" in window.navigator && window.navigator.standalone);
}
function A(t, e) {
  const i = document.createElement("a");
  i.href = t, i.setAttribute("download", e), document.body.appendChild(i), i.click(), i.parentNode?.removeChild(i);
}
async function D(t, { content: e, path: i, url: r }) {
  const s = i.endsWith(".scad") || i.endsWith(".json");
  if (e)
    return new TextEncoder().encode(e);
  if (r) {
    if (s)
      return e = await (await fetch(r)).text(), new TextEncoder().encode(e.replace(/\r\n/g, `
`));
    {
      const o = await (await fetch(r)).arrayBuffer();
      return new Uint8Array(o);
    }
  } else if (i) {
    const n = t.readFileSync(i);
    return new Uint8Array("buffer" in n ? n.buffer : n);
  } else
    throw new Error("Invalid source: " + JSON.stringify({ path: i, content: e, url: r }));
}
function E(t) {
  return new Promise((e, i) => {
    const r = new FileReader();
    r.onloadend = () => {
      e(r.result);
    }, r.onerror = i, r.readAsDataURL(t);
  });
}
const p = {
  fonts: {},
  openscad: {
    description: "OpenSCAD",
    gitOrigin: {
      branch: "master",
      repoUrl: "https://github.com/openscad/openscad",
      include: [{ glob: ["examples/*.scad", "LICENSE"] }]
    },
    docs: {
      CheatSheet: "https://openscad.org/cheatsheet/index.html",
      Documentation: "https://openscad.org/documentation.html"
    }
  },
  MCAD: {
    description: "OpenSCAD Parametric CAD Library",
    gitOrigin: {
      branch: "master",
      repoUrl: "https://github.com/openscad/MCAD",
      include: [{ glob: ["*.scad", "bitmap/*.scad", "LICENSE"] }]
    }
  },
  BOSL: {
    description: "The Belfry OpenScad Library",
    gitOrigin: {
      branch: "master",
      repoUrl: "https://github.com/revarbat/BOSL",
      include: [{ glob: ["**/*.scad", "LICENSE"] }]
    }
  },
  BOSL2: {
    description: "The Belfry OpenScad Library, v2.0",
    gitOrigin: {
      branch: "master",
      repoUrl: "https://github.com/BelfrySCAD/BOSL2",
      include: [{ glob: ["**/*.scad", "LICENSE"] }]
    },
    docs: {
      CheatSheet: "https://github.com/BelfrySCAD/BOSL2/wiki/CheatSheet",
      Wiki: "https://github.com/BelfrySCAD/BOSL2/wiki"
    }
  },
  NopSCADlib: {
    gitOrigin: {
      branch: "master",
      repoUrl: "https://github.com/nophead/NopSCADlib",
      include: [{
        glob: "**/*.scad",
        ignore: "test/**"
      }]
    }
  },
  boltsparts: {
    description: "OpenSCAD library for generating bolt/nut models",
    gitOrigin: {
      branch: "main",
      repoUrl: "https://github.com/boltsparts/boltsparts",
      include: [{
        glob: "openscad/**/*.scad",
        ignore: "test/**"
      }]
    },
    docs: {
      Usage: "https://boltsparts.github.io/en/docs/0.3/document/openscad/usage.html"
    }
  },
  brailleSCAD: {
    gitOrigin: {
      branch: "main",
      repoUrl: "https://github.com/BelfrySCAD/brailleSCAD",
      include: [{
        glob: ["**/*.scad", "LICENSE"],
        ignore: "test/**"
      }]
    },
    docs: {
      Documentation: "https://github.com/BelfrySCAD/brailleSCAD/wiki/TOC"
    }
  },
  FunctionalOpenSCAD: {
    description: "Implementing OpenSCAD in OpenSCAD",
    gitOrigin: {
      branch: "master",
      repoUrl: "https://github.com/thehans/FunctionalOpenSCAD",
      include: [{ glob: ["**/*.scad", "LICENSE"] }]
    }
  },
  "OpenSCAD-Snippet": {
    description: "OpenSCAD Snippet Library",
    gitOrigin: {
      branch: "main",
      repoUrl: "https://github.com/AngeloNicoli/OpenSCAD-Snippet",
      include: [{ glob: ["**/*.scad", "LICENSE"] }]
    },
    symlinks: {
      Asset_SCAD: "Asset_SCAD",
      "Import_Library.scad": "Import_Library.scad"
    }
  },
  funcutils: {
    description: "OpenSCAD collection of functional programming utilities, making use of function-literals.",
    gitOrigin: {
      branch: "master",
      repoUrl: "https://github.com/thehans/funcutils",
      include: [{ glob: "**/*.scad" }]
    }
  },
  "smooth-prim": {
    description: "OpenSCAD smooth primitives library",
    gitOrigin: {
      branch: "master",
      repoUrl: "https://github.com/rcolyer/smooth-prim",
      include: [{ glob: ["**/*.scad", "LICENSE.txt"] }]
    },
    symlinks: { "smooth_prim.scad": "smooth_prim.scad" }
  },
  closepoints: {
    description: "OpenSCAD ClosePoints Library",
    gitOrigin: {
      branch: "master",
      repoUrl: "https://github.com/rcolyer/closepoints",
      include: [{ glob: ["**/*.scad", "LICENSE.txt"] }]
    },
    symlinks: { "closepoints.scad": "closepoints.scad" }
  },
  "plot-function": {
    description: "OpenSCAD Function Plotting Library",
    gitOrigin: {
      branch: "master",
      repoUrl: "https://github.com/colyer/plot-function",
      include: [{ glob: ["**/*.scad", "LICENSE.txt"] }]
    },
    symlinks: { "plot_function.scad": "plot_function.scad" }
  },
  // 'threads': {
  //   deployed: false,
  //   gitOrigin: {
  //     branch: 'master',
  //     repoUrl: 'https://github.com/colyer/threads',
  //     include: [{glob: ['**/*.scad', 'LICENSE.txt']}],
  //   },
  // },
  "openscad-tray": {
    description: "OpenSCAD library to create rounded rectangular trays with optional subdividers.",
    gitOrigin: {
      branch: "main",
      repoUrl: "https://github.com/sofian/openscad-tray",
      include: [{ glob: ["**/*.scad", "LICENSE"] }]
    },
    symlinks: { "tray.scad": "tray.scad" }
  },
  lasercut: {
    description: "Module for OpenSCAD, allowing 3D models to be created from 2D lasercut parts.",
    gitOrigin: {
      branch: "master",
      repoUrl: "https://github.com/bmsleight/lasercut",
      include: [{ glob: ["**/*.scad", "LICENSE"] }]
    },
    symlinks: { "lasercut.scad": "lasercut.scad" }
  },
  YAPP_Box: {
    description: "Yet Another Parametric Projectbox Box",
    gitOrigin: {
      branch: "main",
      repoUrl: "https://github.com/mrWheel/YAPP_Box",
      include: [{ glob: ["**/*.scad", "LICENSE"] }]
    }
  },
  Stemfie_OpenSCAD: {
    description: "OpenSCAD Stemfie Library",
    gitOrigin: {
      branch: "main",
      repoUrl: "https://github.com/Cantareus/Stemfie_OpenSCAD",
      include: [{ glob: ["**/*.scad", "LICENSE"] }]
    }
  },
  "UB.scad": {
    gitOrigin: {
      branch: "main",
      repoUrl: "https://github.com/UBaer21/UB.scad",
      include: [{ glob: ["libraries/*.scad", "LICENSE", "examples/UBexamples/*.scad"], replacePrefix: {
        "libraries/": "",
        "examples/UBexamples/": "examples/"
      } }]
    },
    symlinks: { "ub.scad": "libraries/ub.scad" }
    // TODO change this after the replaces work
  },
  pathbuilder: {
    gitOrigin: {
      branch: "main",
      repoUrl: "https://github.com/dinther/pathbuilder.git",
      include: [{ glob: ["**/*.scad", "LICENSE"] }]
    }
  },
  openscad_attachable_text3d: {
    gitOrigin: {
      branch: "main",
      repoUrl: "https://github.com/jon-gilbert/openscad_attachable_text3d.git",
      include: [{ glob: ["**/*.scad", "LICENSE"] }]
    }
  }
}, u = Object.entries(p).filter(([t, { deployed: e }]) => e == null || e).map(([t]) => t), L = (t) => {
  let e = t.split("/").slice(0, -1).join("/");
  return e === "" ? t.startsWith("/") ? "/" : "." : e;
};
function m(t, e) {
  return t === "." ? e : t.endsWith("/") ? m(t.substring(0, t.length - 1), e) : e === "." ? t : `${t}/${e}`;
}
async function b(t) {
  const e = BrowserFS.BFSRequire("buffer").Buffer, i = async (n) => (await fetch(n)).arrayBuffer(), r = await Promise.all(t.map(async (n) => [n, await i(`/libraries/${n}.zip`)])), s = {};
  for (const [n, o] of r)
    s[n] = {
      fs: "ZipFS",
      options: {
        zipData: e.from(o)
      }
    };
  return s;
}
async function B(t, e, i = "/libraries", r = "/tmp") {
  const s = async (n, o) => {
    try {
      await e.symlink(n, o);
    } catch (a) {
      console.error(`symlink(${n}, ${o}) failed: `, a);
    }
  };
  await Promise.all(t.map((n) => (async () => {
    if (!(n in p)) throw new Error(`Archive named ${n} invalid (valid ones: ${u.join(", ")})`);
    const { symlinks: o } = p[n];
    if (o)
      for (const a in o) {
        const c = o[a], l = c === "." ? `${i}/${n}` : `${i}/${n}/${c}`, d = a.startsWith("/") ? a : `${r}/${a}`;
        await s(l, d);
      }
    else
      await s(`${i}/${n}`, `${r}/${n}`);
  })()));
}
function g(t, e) {
  return new Promise(async (i, r) => {
    BrowserFS.install(t);
    try {
      BrowserFS.configure(e, function(s) {
        s ? r(s) : i(null);
      });
    } catch (s) {
      console.error(s), r(s);
    }
  });
}
async function U({ prefix: t, allowPersistence: e }) {
  const r = await b(u), s = {};
  for (const o in r)
    s[`${t}${o}`] = r[o];
  await g(typeof window == "object" && window || self, {
    fs: "OverlayFS",
    options: {
      readable: {
        fs: "MountableFileSystem",
        options: {
          ...s
        }
      },
      writable: {
        fs: "InMemory"
      }
    }
  });
  var n = BrowserFS.BFSRequire("fs");
  return n;
}
export {
  h as A,
  y as a,
  C as b,
  O as c,
  A as d,
  U as e,
  D as f,
  L as g,
  u as h,
  w as i,
  m as j,
  f as m,
  E as r,
  B as s,
  S as t,
  p as z
};
//# sourceMappingURL=filesystem-BxKQuVe6.js.map
