import { e as fo, s as co, h as lo, f as vo } from "./filesystem-BxKQuVe6.js";
var ho = (() => {
  var K = import.meta.url;
  return (function(rr = {}) {
    var c = typeof rr < "u" ? rr : {}, dr, ar;
    c.ready = new Promise(function(r, e) {
      dr = r, ar = e;
    });
    var $ = Object.assign({}, c), j = [], sr = "./this.program", G = (r, e) => {
      throw e;
    }, br = typeof window == "object", X = typeof importScripts == "function", Z = typeof process == "object" && typeof process.versions == "object" && typeof process.versions.node == "string", H = "";
    function F(r) {
      return c.locateFile ? c.locateFile(r, H) : H + r;
    }
    var U, Sr, Yr;
    (br || X) && (X ? H = self.location.href : typeof document < "u" && document.currentScript && (H = document.currentScript.src), K && (H = K), H.indexOf("blob:") !== 0 ? H = H.substr(0, H.replace(/[?#].*/, "").lastIndexOf("/") + 1) : H = "", U = (r) => {
      var e = new XMLHttpRequest();
      return e.open("GET", r, !1), e.send(null), e.responseText;
    }, X && (Yr = (r) => {
      var e = new XMLHttpRequest();
      return e.open("GET", r, !1), e.responseType = "arraybuffer", e.send(null), new Uint8Array(e.response);
    }), Sr = (r, e, t) => {
      var n = new XMLHttpRequest();
      n.open("GET", r, !0), n.responseType = "arraybuffer", n.onload = () => {
        if (n.status == 200 || n.status == 0 && n.response) {
          e(n.response);
          return;
        }
        t();
      }, n.onerror = t, n.send(null);
    });
    var Dr = c.print || console.log.bind(console), Q = c.printErr || console.warn.bind(console);
    Object.assign(c, $), $ = null, c.arguments && (j = c.arguments), c.thisProgram && (sr = c.thisProgram), c.quit && (G = c.quit);
    var vr;
    c.wasmBinary && (vr = c.wasmBinary);
    var qe = c.noExitRuntime || !1;
    typeof WebAssembly != "object" && Y("no native wasm support detected");
    var Ar, hr = !1, Or;
    function Wr(r, e) {
      r || Y(e);
    }
    var $r = typeof TextDecoder < "u" ? new TextDecoder("utf8") : void 0;
    function ur(r, e, t) {
      e >>>= 0;
      for (var n = e + t, i = e; r[i] && !(i >= n); ) ++i;
      if (i - e > 16 && r.buffer && $r)
        return $r.decode(r.subarray(e, i));
      for (var a = ""; e < i; ) {
        var s = r[e++];
        if (!(s & 128)) {
          a += String.fromCharCode(s);
          continue;
        }
        var u = r[e++] & 63;
        if ((s & 224) == 192) {
          a += String.fromCharCode((s & 31) << 6 | u);
          continue;
        }
        var f = r[e++] & 63;
        if ((s & 240) == 224 ? s = (s & 15) << 12 | u << 6 | f : s = (s & 7) << 18 | u << 12 | f << 6 | r[e++] & 63, s < 65536)
          a += String.fromCharCode(s);
        else {
          var l = s - 65536;
          a += String.fromCharCode(55296 | l >> 10, 56320 | l & 1023);
        }
      }
      return a;
    }
    function er(r, e) {
      return r >>>= 0, r ? ur(J, r, e) : "";
    }
    function _r(r, e, t, n) {
      if (t >>>= 0, !(n > 0)) return 0;
      for (var i = t, a = t + n - 1, s = 0; s < r.length; ++s) {
        var u = r.charCodeAt(s);
        if (u >= 55296 && u <= 57343) {
          var f = r.charCodeAt(++s);
          u = 65536 + ((u & 1023) << 10) | f & 1023;
        }
        if (u <= 127) {
          if (t >= a) break;
          e[t++ >>> 0] = u;
        } else if (u <= 2047) {
          if (t + 1 >= a) break;
          e[t++ >>> 0] = 192 | u >> 6, e[t++ >>> 0] = 128 | u & 63;
        } else if (u <= 65535) {
          if (t + 2 >= a) break;
          e[t++ >>> 0] = 224 | u >> 12, e[t++ >>> 0] = 128 | u >> 6 & 63, e[t++ >>> 0] = 128 | u & 63;
        } else {
          if (t + 3 >= a) break;
          e[t++ >>> 0] = 240 | u >> 18, e[t++ >>> 0] = 128 | u >> 12 & 63, e[t++ >>> 0] = 128 | u >> 6 & 63, e[t++ >>> 0] = 128 | u & 63;
        }
      }
      return e[t >>> 0] = 0, t - i;
    }
    function Nr(r, e, t) {
      return _r(r, J, e, t);
    }
    function fr(r) {
      for (var e = 0, t = 0; t < r.length; ++t) {
        var n = r.charCodeAt(t);
        n <= 127 ? e++ : n <= 2047 ? e += 2 : n >= 55296 && n <= 57343 ? (e += 4, ++t) : e += 3;
      }
      return e;
    }
    var L, J, q, Zr, v, O;
    function Qr() {
      var r = Ar.buffer;
      c.HEAP8 = L = new Int8Array(r), c.HEAP16 = q = new Int16Array(r), c.HEAP32 = v = new Int32Array(r), c.HEAPU8 = J = new Uint8Array(r), c.HEAPU16 = Zr = new Uint16Array(r), c.HEAPU32 = O = new Uint32Array(r), c.HEAPF32 = new Float32Array(r), c.HEAPF64 = new Float64Array(r);
    }
    var mr, Jr = [], re = [], Ve = [], Ke = [], ee = [], $e = 0;
    function te() {
      return qe || $e > 0;
    }
    function Ze() {
      if (c.preRun)
        for (typeof c.preRun == "function" && (c.preRun = [c.preRun]); c.preRun.length; )
          tt(c.preRun.shift());
      yr(Jr);
    }
    function Qe() {
      !c.noFSInit && !o.init.initialized && o.init(), o.ignorePermissions = !1, x.root = o.mount(x, {}, null), yr(re);
    }
    function Je() {
      yr(Ve);
    }
    function rt() {
      Ne(), yr(Ke), o.quit();
    }
    function et() {
      if (c.postRun)
        for (typeof c.postRun == "function" && (c.postRun = [c.postRun]); c.postRun.length; )
          it(c.postRun.shift());
      yr(ee);
    }
    function tt(r) {
      Jr.unshift(r);
    }
    function nt(r) {
      re.unshift(r);
    }
    function it(r) {
      ee.unshift(r);
    }
    var tr = 0, pr = null;
    function mo(r) {
      return r;
    }
    function Gr(r) {
      tr++, c.monitorRunDependencies && c.monitorRunDependencies(tr);
    }
    function Mr(r) {
      if (tr--, c.monitorRunDependencies && c.monitorRunDependencies(tr), tr == 0 && pr) {
        var e = pr;
        pr = null, e();
      }
    }
    function Y(r) {
      c.onAbort && c.onAbort(r), r = "Aborted(" + r + ")", Q(r), hr = !0, Or = 1, r += ". Build with -sASSERTIONS for more info.";
      var e = new WebAssembly.RuntimeError(r);
      throw ar(e), e;
    }
    var ot = "data:application/octet-stream;base64,";
    function ne(r) {
      return r.startsWith(ot);
    }
    var wr = 0;
    function ie(r) {
      return function() {
        if (hr)
          throw "program has already aborted!";
        wr += 1;
        try {
          return r.apply(null, arguments);
        } catch (e) {
          if (hr || wr > 1 || e === 1 / 0 || e === "unwind")
            throw e;
          Y("unhandled exception: " + [e, e.stack]);
        } finally {
          wr -= 1;
        }
      };
    }
    function at(r) {
      var e = {};
      for (var t in r) {
        var n = r[t];
        typeof n == "function" ? e[t] = ie(n) : e[t] = n;
      }
      return e;
    }
    function st() {
      var r = mr.get, e = {};
      mr.get = (t) => {
        var n = r.call(mr, t), i = e[t];
        return (!i || i.func !== n) && (i = e[t] = { func: n, wrapper: ie(n) }), i.wrapper;
      };
    }
    var nr;
    c.locateFile ? (nr = "openscad.wasm", ne(nr) || (nr = F(nr))) : nr = new URL("/wasm/openscad.wasm", import.meta.url).href;
    function oe(r) {
      try {
        if (r == nr && vr)
          return new Uint8Array(vr);
        if (Yr)
          return Yr(r);
        throw "both async and sync fetching of the wasm failed";
      } catch (e) {
        Y(e);
      }
    }
    function ut(r) {
      return !vr && (br || X) && typeof fetch == "function" ? fetch(r, { credentials: "same-origin" }).then(function(e) {
        if (!e.ok)
          throw "failed to load wasm binary file at '" + r + "'";
        return e.arrayBuffer();
      }).catch(function() {
        return oe(r);
      }) : Promise.resolve().then(function() {
        return oe(r);
      });
    }
    function ae(r, e, t) {
      return ut(r).then(function(n) {
        return WebAssembly.instantiate(n, e);
      }).then(function(n) {
        return n;
      }).then(t, function(n) {
        Q("failed to asynchronously prepare wasm: " + n), Y(n);
      });
    }
    function ft(r, e, t, n) {
      return !r && typeof WebAssembly.instantiateStreaming == "function" && !ne(e) && typeof fetch == "function" ? fetch(e, { credentials: "same-origin" }).then(function(i) {
        var a = WebAssembly.instantiateStreaming(i, t);
        return a.then(n, function(s) {
          return Q("wasm streaming compile failed: " + s), Q("falling back to ArrayBuffer instantiation"), ae(e, t, n);
        });
      }) : ae(e, t, n);
    }
    function ct() {
      var r = { a: qn };
      function e(n, i) {
        var a = n.exports;
        return a = at(a), c.asm = a, Ar = c.asm.Ab, Qr(), mr = c.asm.Db, nt(c.asm.Bb), st(), Mr(), a;
      }
      Gr();
      function t(n) {
        e(n.instance);
      }
      if (c.instantiateWasm)
        try {
          return c.instantiateWasm(r, e);
        } catch (n) {
          Q("Module.instantiateWasm callback failed with error: " + n), ar(n);
        }
      return ft(vr, nr, r, t).catch(ar), {};
    }
    var D, P;
    function se(r) {
      this.name = "ExitStatus", this.message = "Program terminated with exit(" + r + ")", this.status = r;
    }
    function yr(r) {
      for (; r.length > 0; )
        r.shift()(c);
    }
    function lt(r, e, t, n) {
      Y("Assertion failed: " + er(r) + ", at: " + [e ? er(e) : "unknown filename", t, n ? er(n) : "unknown function"]);
    }
    var Fr = [];
    function k(r) {
      var e = Fr[r];
      return e || (r >= Fr.length && (Fr.length = r + 1), Fr[r] = e = mr.get(r)), e;
    }
    function dt(r, e) {
      k(r)(e);
    }
    var ir = [];
    function ue(r) {
      r.add_ref();
    }
    var Tr = 0;
    function vt(r) {
      var e = new Rr(r);
      return e.get_caught() || (e.set_caught(!0), Tr--), e.set_rethrown(!1), ir.push(e), ue(e), e.get_exception_ptr();
    }
    function ht() {
      if (!ir.length)
        return 0;
      var r = ir[ir.length - 1];
      return ue(r), r.excPtr;
    }
    function fe(r) {
      if (r.release_ref() && !r.get_rethrown()) {
        var e = r.get_destructor();
        e && k(e)(r.excPtr), Se(r.excPtr);
      }
    }
    function Rr(r) {
      this.excPtr = r, this.ptr = r - 24, this.set_type = function(e) {
        O[this.ptr + 4 >>> 2] = e;
      }, this.get_type = function() {
        return O[this.ptr + 4 >>> 2];
      }, this.set_destructor = function(e) {
        O[this.ptr + 8 >>> 2] = e;
      }, this.get_destructor = function() {
        return O[this.ptr + 8 >>> 2];
      }, this.set_refcount = function(e) {
        v[this.ptr >>> 2] = e;
      }, this.set_caught = function(e) {
        e = e ? 1 : 0, L[this.ptr + 12 >>> 0] = e;
      }, this.get_caught = function() {
        return L[this.ptr + 12 >>> 0] != 0;
      }, this.set_rethrown = function(e) {
        e = e ? 1 : 0, L[this.ptr + 13 >>> 0] = e;
      }, this.get_rethrown = function() {
        return L[this.ptr + 13 >>> 0] != 0;
      }, this.init = function(e, t) {
        this.set_adjusted_ptr(0), this.set_type(e), this.set_destructor(t), this.set_refcount(0), this.set_caught(!1), this.set_rethrown(!1);
      }, this.add_ref = function() {
        var e = v[this.ptr >>> 2];
        v[this.ptr >>> 2] = e + 1;
      }, this.release_ref = function() {
        var e = v[this.ptr >>> 2];
        return v[this.ptr >>> 2] = e - 1, e === 1;
      }, this.set_adjusted_ptr = function(e) {
        O[this.ptr + 16 >>> 2] = e;
      }, this.get_adjusted_ptr = function() {
        return O[this.ptr + 16 >>> 2];
      }, this.get_exception_ptr = function() {
        var e = Te(this.get_type());
        if (e)
          return O[this.excPtr >>> 2];
        var t = this.get_adjusted_ptr();
        return t !== 0 ? t : this.excPtr;
      };
    }
    function _t(r) {
      r && fe(new Rr(r));
    }
    var cr = 0;
    function mt() {
      w(0);
      var r = ir.pop();
      fe(r), cr = 0;
    }
    function pt(r) {
      throw cr || (cr = r), r;
    }
    function Cr() {
      var r = cr;
      if (!r)
        return kr(0), 0;
      var e = new Rr(r);
      e.set_adjusted_ptr(r);
      var t = e.get_type();
      if (!t)
        return kr(0), r;
      for (var n = 0; n < arguments.length; n++) {
        var i = arguments[n];
        if (i === 0 || i === t)
          break;
        var a = e.ptr + 16;
        if (Fe(i, t, a))
          return kr(i), r;
      }
      return kr(t), r;
    }
    var wt = Cr, yt = Cr, Et = Cr, gt = Cr;
    function kt() {
      var r = ir.pop();
      r || Y("no exception to throw");
      var e = r.excPtr;
      throw r.get_rethrown() || (ir.push(r), r.set_rethrown(!0), r.set_caught(!1), Tr++), cr = e, e;
    }
    function bt(r, e, t) {
      var n = new Rr(r);
      throw n.init(e, t), cr = r, Tr++, r;
    }
    function St() {
      return Tr;
    }
    var M = { isAbs: (r) => r.charAt(0) === "/", splitPath: (r) => {
      var e = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
      return e.exec(r).slice(1);
    }, normalizeArray: (r, e) => {
      for (var t = 0, n = r.length - 1; n >= 0; n--) {
        var i = r[n];
        i === "." ? r.splice(n, 1) : i === ".." ? (r.splice(n, 1), t++) : t && (r.splice(n, 1), t--);
      }
      if (e)
        for (; t; t--)
          r.unshift("..");
      return r;
    }, normalize: (r) => {
      var e = M.isAbs(r), t = r.substr(-1) === "/";
      return r = M.normalizeArray(r.split("/").filter((n) => !!n), !e).join("/"), !r && !e && (r = "."), r && t && (r += "/"), (e ? "/" : "") + r;
    }, dirname: (r) => {
      var e = M.splitPath(r), t = e[0], n = e[1];
      return !t && !n ? "." : (n && (n = n.substr(0, n.length - 1)), t + n);
    }, basename: (r) => {
      if (r === "/") return "/";
      r = M.normalize(r), r = r.replace(/\/$/, "");
      var e = r.lastIndexOf("/");
      return e === -1 ? r : r.substr(e + 1);
    }, join: function() {
      var r = Array.prototype.slice.call(arguments);
      return M.normalize(r.join("/"));
    }, join2: (r, e) => M.normalize(r + "/" + e) };
    function Dt() {
      if (typeof crypto == "object" && typeof crypto.getRandomValues == "function") {
        var r = new Uint8Array(1);
        return () => (crypto.getRandomValues(r), r[0]);
      } else return () => Y("randomDevice");
    }
    var V = { resolve: function() {
      for (var r = "", e = !1, t = arguments.length - 1; t >= -1 && !e; t--) {
        var n = t >= 0 ? arguments[t] : o.cwd();
        if (typeof n != "string")
          throw new TypeError("Arguments to path.resolve must be strings");
        if (!n)
          return "";
        r = n + "/" + r, e = M.isAbs(n);
      }
      return r = M.normalizeArray(r.split("/").filter((i) => !!i), !e).join("/"), (e ? "/" : "") + r || ".";
    }, relative: (r, e) => {
      r = V.resolve(r).substr(1), e = V.resolve(e).substr(1);
      function t(l) {
        for (var d = 0; d < l.length && l[d] === ""; d++)
          ;
        for (var m = l.length - 1; m >= 0 && l[m] === ""; m--)
          ;
        return d > m ? [] : l.slice(d, m - d + 1);
      }
      for (var n = t(r.split("/")), i = t(e.split("/")), a = Math.min(n.length, i.length), s = a, u = 0; u < a; u++)
        if (n[u] !== i[u]) {
          s = u;
          break;
        }
      for (var f = [], u = s; u < n.length; u++)
        f.push("..");
      return f = f.concat(i.slice(s)), f.join("/");
    } };
    function Pr(r, e, t) {
      var n = fr(r) + 1, i = new Array(n), a = _r(r, i, 0, i.length);
      return e && (i.length = a), i;
    }
    var or = { ttys: [], init: function() {
    }, shutdown: function() {
    }, register: function(r, e) {
      or.ttys[r] = { input: [], output: [], ops: e }, o.registerDevice(r, or.stream_ops);
    }, stream_ops: { open: function(r) {
      var e = or.ttys[r.node.rdev];
      if (!e)
        throw new o.ErrnoError(43);
      r.tty = e, r.seekable = !1;
    }, close: function(r) {
      r.tty.ops.fsync(r.tty);
    }, fsync: function(r) {
      r.tty.ops.fsync(r.tty);
    }, read: function(r, e, t, n, i) {
      if (!r.tty || !r.tty.ops.get_char)
        throw new o.ErrnoError(60);
      for (var a = 0, s = 0; s < n; s++) {
        var u;
        try {
          u = r.tty.ops.get_char(r.tty);
        } catch {
          throw new o.ErrnoError(29);
        }
        if (u === void 0 && a === 0)
          throw new o.ErrnoError(6);
        if (u == null) break;
        a++, e[t + s] = u;
      }
      return a && (r.node.timestamp = Date.now()), a;
    }, write: function(r, e, t, n, i) {
      if (!r.tty || !r.tty.ops.put_char)
        throw new o.ErrnoError(60);
      try {
        for (var a = 0; a < n; a++)
          r.tty.ops.put_char(r.tty, e[t + a]);
      } catch {
        throw new o.ErrnoError(29);
      }
      return n && (r.node.timestamp = Date.now()), a;
    } }, default_tty_ops: { get_char: function(r) {
      if (!r.input.length) {
        var e = null;
        if (typeof window < "u" && typeof window.prompt == "function" ? (e = window.prompt("Input: "), e !== null && (e += `
`)) : typeof readline == "function" && (e = readline(), e !== null && (e += `
`)), !e)
          return null;
        r.input = Pr(e, !0);
      }
      return r.input.shift();
    }, put_char: function(r, e) {
      e === null || e === 10 ? (Dr(ur(r.output, 0)), r.output = []) : e != 0 && r.output.push(e);
    }, fsync: function(r) {
      r.output && r.output.length > 0 && (Dr(ur(r.output, 0)), r.output = []);
    } }, default_tty1_ops: { put_char: function(r, e) {
      e === null || e === 10 ? (Q(ur(r.output, 0)), r.output = []) : e != 0 && r.output.push(e);
    }, fsync: function(r) {
      r.output && r.output.length > 0 && (Q(ur(r.output, 0)), r.output = []);
    } } };
    function Xr(r, e) {
      return J.fill(0, r, r + e), r;
    }
    function At(r, e) {
      return Math.ceil(r / e) * e;
    }
    function ce(r) {
      r = At(r, 65536);
      var e = Me(65536, r);
      return e ? Xr(e, r) : 0;
    }
    var A = { ops_table: null, mount: function(r) {
      return A.createNode(null, "/", 16895, 0);
    }, createNode: function(r, e, t, n) {
      if (o.isBlkdev(t) || o.isFIFO(t))
        throw new o.ErrnoError(63);
      A.ops_table || (A.ops_table = { dir: { node: { getattr: A.node_ops.getattr, setattr: A.node_ops.setattr, lookup: A.node_ops.lookup, mknod: A.node_ops.mknod, rename: A.node_ops.rename, unlink: A.node_ops.unlink, rmdir: A.node_ops.rmdir, readdir: A.node_ops.readdir, symlink: A.node_ops.symlink }, stream: { llseek: A.stream_ops.llseek } }, file: { node: { getattr: A.node_ops.getattr, setattr: A.node_ops.setattr }, stream: { llseek: A.stream_ops.llseek, read: A.stream_ops.read, write: A.stream_ops.write, allocate: A.stream_ops.allocate, mmap: A.stream_ops.mmap, msync: A.stream_ops.msync } }, link: { node: { getattr: A.node_ops.getattr, setattr: A.node_ops.setattr, readlink: A.node_ops.readlink }, stream: {} }, chrdev: { node: { getattr: A.node_ops.getattr, setattr: A.node_ops.setattr }, stream: o.chrdev_stream_ops } });
      var i = o.createNode(r, e, t, n);
      return o.isDir(i.mode) ? (i.node_ops = A.ops_table.dir.node, i.stream_ops = A.ops_table.dir.stream, i.contents = {}) : o.isFile(i.mode) ? (i.node_ops = A.ops_table.file.node, i.stream_ops = A.ops_table.file.stream, i.usedBytes = 0, i.contents = null) : o.isLink(i.mode) ? (i.node_ops = A.ops_table.link.node, i.stream_ops = A.ops_table.link.stream) : o.isChrdev(i.mode) && (i.node_ops = A.ops_table.chrdev.node, i.stream_ops = A.ops_table.chrdev.stream), i.timestamp = Date.now(), r && (r.contents[e] = i, r.timestamp = i.timestamp), i;
    }, getFileDataAsTypedArray: function(r) {
      return r.contents ? r.contents.subarray ? r.contents.subarray(0, r.usedBytes) : new Uint8Array(r.contents) : new Uint8Array(0);
    }, expandFileStorage: function(r, e) {
      e >>>= 0;
      var t = r.contents ? r.contents.length : 0;
      if (!(t >= e)) {
        var n = 1024 * 1024;
        e = Math.max(e, t * (t < n ? 2 : 1.125) >>> 0), t != 0 && (e = Math.max(e, 256));
        var i = r.contents;
        r.contents = new Uint8Array(e), r.usedBytes > 0 && r.contents.set(i.subarray(0, r.usedBytes), 0);
      }
    }, resizeFileStorage: function(r, e) {
      if (e >>>= 0, r.usedBytes != e)
        if (e == 0)
          r.contents = null, r.usedBytes = 0;
        else {
          var t = r.contents;
          r.contents = new Uint8Array(e), t && r.contents.set(t.subarray(0, Math.min(e, r.usedBytes))), r.usedBytes = e;
        }
    }, node_ops: { getattr: function(r) {
      var e = {};
      return e.dev = o.isChrdev(r.mode) ? r.id : 1, e.ino = r.id, e.mode = r.mode, e.nlink = 1, e.uid = 0, e.gid = 0, e.rdev = r.rdev, o.isDir(r.mode) ? e.size = 4096 : o.isFile(r.mode) ? e.size = r.usedBytes : o.isLink(r.mode) ? e.size = r.link.length : e.size = 0, e.atime = new Date(r.timestamp), e.mtime = new Date(r.timestamp), e.ctime = new Date(r.timestamp), e.blksize = 4096, e.blocks = Math.ceil(e.size / e.blksize), e;
    }, setattr: function(r, e) {
      e.mode !== void 0 && (r.mode = e.mode), e.timestamp !== void 0 && (r.timestamp = e.timestamp), e.size !== void 0 && A.resizeFileStorage(r, e.size);
    }, lookup: function(r, e) {
      throw o.genericErrors[44];
    }, mknod: function(r, e, t, n) {
      return A.createNode(r, e, t, n);
    }, rename: function(r, e, t) {
      if (o.isDir(r.mode)) {
        var n;
        try {
          n = o.lookupNode(e, t);
        } catch {
        }
        if (n)
          for (var i in n.contents)
            throw new o.ErrnoError(55);
      }
      delete r.parent.contents[r.name], r.parent.timestamp = Date.now(), r.name = t, e.contents[t] = r, e.timestamp = r.parent.timestamp, r.parent = e;
    }, unlink: function(r, e) {
      delete r.contents[e], r.timestamp = Date.now();
    }, rmdir: function(r, e) {
      var t = o.lookupNode(r, e);
      for (var n in t.contents)
        throw new o.ErrnoError(55);
      delete r.contents[e], r.timestamp = Date.now();
    }, readdir: function(r) {
      var e = [".", ".."];
      for (var t in r.contents)
        r.contents.hasOwnProperty(t) && e.push(t);
      return e;
    }, symlink: function(r, e, t) {
      var n = A.createNode(r, e, 41471, 0);
      return n.link = t, n;
    }, readlink: function(r) {
      if (!o.isLink(r.mode))
        throw new o.ErrnoError(28);
      return r.link;
    } }, stream_ops: { read: function(r, e, t, n, i) {
      var a = r.node.contents;
      if (i >= r.node.usedBytes) return 0;
      var s = Math.min(r.node.usedBytes - i, n);
      if (s > 8 && a.subarray)
        e.set(a.subarray(i, i + s), t);
      else
        for (var u = 0; u < s; u++) e[t + u] = a[i + u];
      return s;
    }, write: function(r, e, t, n, i, a) {
      if (e.buffer === L.buffer && (a = !1), !n) return 0;
      var s = r.node;
      if (s.timestamp = Date.now(), e.subarray && (!s.contents || s.contents.subarray)) {
        if (a)
          return s.contents = e.subarray(t, t + n), s.usedBytes = n, n;
        if (s.usedBytes === 0 && i === 0)
          return s.contents = e.slice(t, t + n), s.usedBytes = n, n;
        if (i + n <= s.usedBytes)
          return s.contents.set(e.subarray(t, t + n), i), n;
      }
      if (A.expandFileStorage(s, i + n), s.contents.subarray && e.subarray)
        s.contents.set(e.subarray(t, t + n), i);
      else
        for (var u = 0; u < n; u++)
          s.contents[i + u] = e[t + u];
      return s.usedBytes = Math.max(s.usedBytes, i + n), n;
    }, llseek: function(r, e, t) {
      var n = e;
      if (t === 1 ? n += r.position : t === 2 && o.isFile(r.node.mode) && (n += r.node.usedBytes), n < 0)
        throw new o.ErrnoError(28);
      return n;
    }, allocate: function(r, e, t) {
      A.expandFileStorage(r.node, e + t), r.node.usedBytes = Math.max(r.node.usedBytes, e + t);
    }, mmap: function(r, e, t, n, i) {
      if (!o.isFile(r.node.mode))
        throw new o.ErrnoError(43);
      var a, s, u = r.node.contents;
      if (!(i & 2) && u.buffer === L.buffer)
        s = !1, a = u.byteOffset;
      else {
        if ((t > 0 || t + e < u.length) && (u.subarray ? u = u.subarray(t, t + e) : u = Array.prototype.slice.call(u, t, t + e)), s = !0, a = ce(e), !a)
          throw new o.ErrnoError(48);
        a >>>= 0, L.set(u, a >>> 0);
      }
      return { ptr: a, allocated: s };
    }, msync: function(r, e, t, n, i) {
      return A.stream_ops.write(r, e, 0, n, t, !1), 0;
    } } };
    function Ot(r, e, t, n) {
      var i = "al " + r;
      Sr(r, (a) => {
        Wr(a, 'Loading data file "' + r + '" failed (no arrayBuffer).'), e(new Uint8Array(a)), i && Mr();
      }, (a) => {
        if (t)
          t();
        else
          throw 'Loading data file "' + r + '" failed.';
      }), i && Gr();
    }
    var o = { root: null, mounts: [], devices: {}, streams: [], nextInode: 1, nameTable: null, currentPath: "/", initialized: !1, ignorePermissions: !0, ErrnoError: null, genericErrors: {}, filesystems: null, syncFSRequests: 0, lookupPath: (r, e = {}) => {
      if (r = V.resolve(r), !r) return { path: "", node: null };
      var t = { follow_mount: !0, recurse_count: 0 };
      if (e = Object.assign(t, e), e.recurse_count > 8)
        throw new o.ErrnoError(32);
      for (var n = r.split("/").filter((m) => !!m), i = o.root, a = "/", s = 0; s < n.length; s++) {
        var u = s === n.length - 1;
        if (u && e.parent)
          break;
        if (i = o.lookupNode(i, n[s]), a = M.join2(a, n[s]), o.isMountpoint(i) && (!u || u && e.follow_mount) && (i = i.mounted.root), !u || e.follow)
          for (var f = 0; o.isLink(i.mode); ) {
            var l = o.readlink(a);
            a = V.resolve(M.dirname(a), l);
            var d = o.lookupPath(a, { recurse_count: e.recurse_count + 1 });
            if (i = d.node, f++ > 40)
              throw new o.ErrnoError(32);
          }
      }
      return { path: a, node: i };
    }, getPath: (r) => {
      for (var e; ; ) {
        if (o.isRoot(r)) {
          var t = r.mount.mountpoint;
          return e ? t[t.length - 1] !== "/" ? t + "/" + e : t + e : t;
        }
        e = e ? r.name + "/" + e : r.name, r = r.parent;
      }
    }, hashName: (r, e) => {
      for (var t = 0, n = 0; n < e.length; n++)
        t = (t << 5) - t + e.charCodeAt(n) | 0;
      return (r + t >>> 0) % o.nameTable.length;
    }, hashAddNode: (r) => {
      var e = o.hashName(r.parent.id, r.name);
      r.name_next = o.nameTable[e], o.nameTable[e] = r;
    }, hashRemoveNode: (r) => {
      var e = o.hashName(r.parent.id, r.name);
      if (o.nameTable[e] === r)
        o.nameTable[e] = r.name_next;
      else
        for (var t = o.nameTable[e]; t; ) {
          if (t.name_next === r) {
            t.name_next = r.name_next;
            break;
          }
          t = t.name_next;
        }
    }, lookupNode: (r, e) => {
      var t = o.mayLookup(r);
      if (t)
        throw new o.ErrnoError(t, r);
      for (var n = o.hashName(r.id, e), i = o.nameTable[n]; i; i = i.name_next) {
        var a = i.name;
        if (i.parent.id === r.id && a === e)
          return i;
      }
      return o.lookup(r, e);
    }, createNode: (r, e, t, n) => {
      var i = new o.FSNode(r, e, t, n);
      return o.hashAddNode(i), i;
    }, destroyNode: (r) => {
      o.hashRemoveNode(r);
    }, isRoot: (r) => r === r.parent, isMountpoint: (r) => !!r.mounted, isFile: (r) => (r & 61440) === 32768, isDir: (r) => (r & 61440) === 16384, isLink: (r) => (r & 61440) === 40960, isChrdev: (r) => (r & 61440) === 8192, isBlkdev: (r) => (r & 61440) === 24576, isFIFO: (r) => (r & 61440) === 4096, isSocket: (r) => (r & 49152) === 49152, flagModes: { r: 0, "r+": 2, w: 577, "w+": 578, a: 1089, "a+": 1090 }, modeStringToFlags: (r) => {
      var e = o.flagModes[r];
      if (typeof e > "u")
        throw new Error("Unknown file open mode: " + r);
      return e;
    }, flagsToPermissionString: (r) => {
      var e = ["r", "w", "rw"][r & 3];
      return r & 512 && (e += "w"), e;
    }, nodePermissions: (r, e) => o.ignorePermissions ? 0 : e.includes("r") && !(r.mode & 292) || e.includes("w") && !(r.mode & 146) || e.includes("x") && !(r.mode & 73) ? 2 : 0, mayLookup: (r) => {
      var e = o.nodePermissions(r, "x");
      return e || (r.node_ops.lookup ? 0 : 2);
    }, mayCreate: (r, e) => {
      try {
        var t = o.lookupNode(r, e);
        return 20;
      } catch {
      }
      return o.nodePermissions(r, "wx");
    }, mayDelete: (r, e, t) => {
      var n;
      try {
        n = o.lookupNode(r, e);
      } catch (a) {
        return a.errno;
      }
      var i = o.nodePermissions(r, "wx");
      if (i)
        return i;
      if (t) {
        if (!o.isDir(n.mode))
          return 54;
        if (o.isRoot(n) || o.getPath(n) === o.cwd())
          return 10;
      } else if (o.isDir(n.mode))
        return 31;
      return 0;
    }, mayOpen: (r, e) => r ? o.isLink(r.mode) ? 32 : o.isDir(r.mode) && (o.flagsToPermissionString(e) !== "r" || e & 512) ? 31 : o.nodePermissions(r, o.flagsToPermissionString(e)) : 44, MAX_OPEN_FDS: 4096, nextfd: (r = 0, e = o.MAX_OPEN_FDS) => {
      for (var t = r; t <= e; t++)
        if (!o.streams[t])
          return t;
      throw new o.ErrnoError(33);
    }, getStream: (r) => o.streams[r], createStream: (r, e, t) => {
      o.FSStream || (o.FSStream = function() {
        this.shared = {};
      }, o.FSStream.prototype = {}, Object.defineProperties(o.FSStream.prototype, { object: { get: function() {
        return this.node;
      }, set: function(i) {
        this.node = i;
      } }, isRead: { get: function() {
        return (this.flags & 2097155) !== 1;
      } }, isWrite: { get: function() {
        return (this.flags & 2097155) !== 0;
      } }, isAppend: { get: function() {
        return this.flags & 1024;
      } }, flags: { get: function() {
        return this.shared.flags;
      }, set: function(i) {
        this.shared.flags = i;
      } }, position: { get: function() {
        return this.shared.position;
      }, set: function(i) {
        this.shared.position = i;
      } } })), r = Object.assign(new o.FSStream(), r);
      var n = o.nextfd(e, t);
      return r.fd = n, o.streams[n] = r, r;
    }, closeStream: (r) => {
      o.streams[r] = null;
    }, chrdev_stream_ops: { open: (r) => {
      var e = o.getDevice(r.node.rdev);
      r.stream_ops = e.stream_ops, r.stream_ops.open && r.stream_ops.open(r);
    }, llseek: () => {
      throw new o.ErrnoError(70);
    } }, major: (r) => r >> 8, minor: (r) => r & 255, makedev: (r, e) => r << 8 | e, registerDevice: (r, e) => {
      o.devices[r] = { stream_ops: e };
    }, getDevice: (r) => o.devices[r], getMounts: (r) => {
      for (var e = [], t = [r]; t.length; ) {
        var n = t.pop();
        e.push(n), t.push.apply(t, n.mounts);
      }
      return e;
    }, syncfs: (r, e) => {
      typeof r == "function" && (e = r, r = !1), o.syncFSRequests++, o.syncFSRequests > 1 && Q("warning: " + o.syncFSRequests + " FS.syncfs operations in flight at once, probably just doing extra work");
      var t = o.getMounts(o.root.mount), n = 0;
      function i(s) {
        return o.syncFSRequests--, e(s);
      }
      function a(s) {
        if (s)
          return a.errored ? void 0 : (a.errored = !0, i(s));
        ++n >= t.length && i(null);
      }
      t.forEach((s) => {
        if (!s.type.syncfs)
          return a(null);
        s.type.syncfs(s, r, a);
      });
    }, mount: (r, e, t) => {
      var n = t === "/", i = !t, a;
      if (n && o.root)
        throw new o.ErrnoError(10);
      if (!n && !i) {
        var s = o.lookupPath(t, { follow_mount: !1 });
        if (t = s.path, a = s.node, o.isMountpoint(a))
          throw new o.ErrnoError(10);
        if (!o.isDir(a.mode))
          throw new o.ErrnoError(54);
      }
      var u = { type: r, opts: e, mountpoint: t, mounts: [] }, f = r.mount(u);
      return f.mount = u, u.root = f, n ? o.root = f : a && (a.mounted = u, a.mount && a.mount.mounts.push(u)), f;
    }, unmount: (r) => {
      var e = o.lookupPath(r, { follow_mount: !1 });
      if (!o.isMountpoint(e.node))
        throw new o.ErrnoError(28);
      var t = e.node, n = t.mounted, i = o.getMounts(n);
      Object.keys(o.nameTable).forEach((s) => {
        for (var u = o.nameTable[s]; u; ) {
          var f = u.name_next;
          i.includes(u.mount) && o.destroyNode(u), u = f;
        }
      }), t.mounted = null;
      var a = t.mount.mounts.indexOf(n);
      t.mount.mounts.splice(a, 1);
    }, lookup: (r, e) => r.node_ops.lookup(r, e), mknod: (r, e, t) => {
      var n = o.lookupPath(r, { parent: !0 }), i = n.node, a = M.basename(r);
      if (!a || a === "." || a === "..")
        throw new o.ErrnoError(28);
      var s = o.mayCreate(i, a);
      if (s)
        throw new o.ErrnoError(s);
      if (!i.node_ops.mknod)
        throw new o.ErrnoError(63);
      return i.node_ops.mknod(i, a, e, t);
    }, create: (r, e) => (e = e !== void 0 ? e : 438, e &= 4095, e |= 32768, o.mknod(r, e, 0)), mkdir: (r, e) => (e = e !== void 0 ? e : 511, e &= 1023, e |= 16384, o.mknod(r, e, 0)), mkdirTree: (r, e) => {
      for (var t = r.split("/"), n = "", i = 0; i < t.length; ++i)
        if (t[i]) {
          n += "/" + t[i];
          try {
            o.mkdir(n, e);
          } catch (a) {
            if (a.errno != 20) throw a;
          }
        }
    }, mkdev: (r, e, t) => (typeof t > "u" && (t = e, e = 438), e |= 8192, o.mknod(r, e, t)), symlink: (r, e) => {
      if (!V.resolve(r))
        throw new o.ErrnoError(44);
      var t = o.lookupPath(e, { parent: !0 }), n = t.node;
      if (!n)
        throw new o.ErrnoError(44);
      var i = M.basename(e), a = o.mayCreate(n, i);
      if (a)
        throw new o.ErrnoError(a);
      if (!n.node_ops.symlink)
        throw new o.ErrnoError(63);
      return n.node_ops.symlink(n, i, r);
    }, rename: (r, e) => {
      var t = M.dirname(r), n = M.dirname(e), i = M.basename(r), a = M.basename(e), s, u, f;
      if (s = o.lookupPath(r, { parent: !0 }), u = s.node, s = o.lookupPath(e, { parent: !0 }), f = s.node, !u || !f) throw new o.ErrnoError(44);
      if (u.mount !== f.mount)
        throw new o.ErrnoError(75);
      var l = o.lookupNode(u, i), d = V.relative(r, n);
      if (d.charAt(0) !== ".")
        throw new o.ErrnoError(28);
      if (d = V.relative(e, t), d.charAt(0) !== ".")
        throw new o.ErrnoError(55);
      var m;
      try {
        m = o.lookupNode(f, a);
      } catch {
      }
      if (l !== m) {
        var _ = o.isDir(l.mode), p = o.mayDelete(u, i, _);
        if (p)
          throw new o.ErrnoError(p);
        if (p = m ? o.mayDelete(f, a, _) : o.mayCreate(f, a), p)
          throw new o.ErrnoError(p);
        if (!u.node_ops.rename)
          throw new o.ErrnoError(63);
        if (o.isMountpoint(l) || m && o.isMountpoint(m))
          throw new o.ErrnoError(10);
        if (f !== u && (p = o.nodePermissions(u, "w"), p))
          throw new o.ErrnoError(p);
        o.hashRemoveNode(l);
        try {
          u.node_ops.rename(l, f, a);
        } catch (g) {
          throw g;
        } finally {
          o.hashAddNode(l);
        }
      }
    }, rmdir: (r) => {
      var e = o.lookupPath(r, { parent: !0 }), t = e.node, n = M.basename(r), i = o.lookupNode(t, n), a = o.mayDelete(t, n, !0);
      if (a)
        throw new o.ErrnoError(a);
      if (!t.node_ops.rmdir)
        throw new o.ErrnoError(63);
      if (o.isMountpoint(i))
        throw new o.ErrnoError(10);
      t.node_ops.rmdir(t, n), o.destroyNode(i);
    }, readdir: (r) => {
      var e = o.lookupPath(r, { follow: !0 }), t = e.node;
      if (!t.node_ops.readdir)
        throw new o.ErrnoError(54);
      return t.node_ops.readdir(t);
    }, unlink: (r) => {
      var e = o.lookupPath(r, { parent: !0 }), t = e.node;
      if (!t)
        throw new o.ErrnoError(44);
      var n = M.basename(r), i = o.lookupNode(t, n), a = o.mayDelete(t, n, !1);
      if (a)
        throw new o.ErrnoError(a);
      if (!t.node_ops.unlink)
        throw new o.ErrnoError(63);
      if (o.isMountpoint(i))
        throw new o.ErrnoError(10);
      t.node_ops.unlink(t, n), o.destroyNode(i);
    }, readlink: (r) => {
      var e = o.lookupPath(r), t = e.node;
      if (!t)
        throw new o.ErrnoError(44);
      if (!t.node_ops.readlink)
        throw new o.ErrnoError(28);
      return V.resolve(o.getPath(t.parent), t.node_ops.readlink(t));
    }, stat: (r, e) => {
      var t = o.lookupPath(r, { follow: !e }), n = t.node;
      if (!n)
        throw new o.ErrnoError(44);
      if (!n.node_ops.getattr)
        throw new o.ErrnoError(63);
      return n.node_ops.getattr(n);
    }, lstat: (r) => o.stat(r, !0), chmod: (r, e, t) => {
      var n;
      if (typeof r == "string") {
        var i = o.lookupPath(r, { follow: !t });
        n = i.node;
      } else
        n = r;
      if (!n.node_ops.setattr)
        throw new o.ErrnoError(63);
      n.node_ops.setattr(n, { mode: e & 4095 | n.mode & -4096, timestamp: Date.now() });
    }, lchmod: (r, e) => {
      o.chmod(r, e, !0);
    }, fchmod: (r, e) => {
      var t = o.getStream(r);
      if (!t)
        throw new o.ErrnoError(8);
      o.chmod(t.node, e);
    }, chown: (r, e, t, n) => {
      var i;
      if (typeof r == "string") {
        var a = o.lookupPath(r, { follow: !n });
        i = a.node;
      } else
        i = r;
      if (!i.node_ops.setattr)
        throw new o.ErrnoError(63);
      i.node_ops.setattr(i, { timestamp: Date.now() });
    }, lchown: (r, e, t) => {
      o.chown(r, e, t, !0);
    }, fchown: (r, e, t) => {
      var n = o.getStream(r);
      if (!n)
        throw new o.ErrnoError(8);
      o.chown(n.node, e, t);
    }, truncate: (r, e) => {
      if (e < 0)
        throw new o.ErrnoError(28);
      var t;
      if (typeof r == "string") {
        var n = o.lookupPath(r, { follow: !0 });
        t = n.node;
      } else
        t = r;
      if (!t.node_ops.setattr)
        throw new o.ErrnoError(63);
      if (o.isDir(t.mode))
        throw new o.ErrnoError(31);
      if (!o.isFile(t.mode))
        throw new o.ErrnoError(28);
      var i = o.nodePermissions(t, "w");
      if (i)
        throw new o.ErrnoError(i);
      t.node_ops.setattr(t, { size: e, timestamp: Date.now() });
    }, ftruncate: (r, e) => {
      var t = o.getStream(r);
      if (!t)
        throw new o.ErrnoError(8);
      if ((t.flags & 2097155) === 0)
        throw new o.ErrnoError(28);
      o.truncate(t.node, e);
    }, utime: (r, e, t) => {
      var n = o.lookupPath(r, { follow: !0 }), i = n.node;
      i.node_ops.setattr(i, { timestamp: Math.max(e, t) });
    }, open: (r, e, t) => {
      if (r === "")
        throw new o.ErrnoError(44);
      e = typeof e == "string" ? o.modeStringToFlags(e) : e, t = typeof t > "u" ? 438 : t, e & 64 ? t = t & 4095 | 32768 : t = 0;
      var n;
      if (typeof r == "object")
        n = r;
      else {
        r = M.normalize(r);
        try {
          var i = o.lookupPath(r, { follow: !(e & 131072) });
          n = i.node;
        } catch {
        }
      }
      var a = !1;
      if (e & 64)
        if (n) {
          if (e & 128)
            throw new o.ErrnoError(20);
        } else
          n = o.mknod(r, t, 0), a = !0;
      if (!n)
        throw new o.ErrnoError(44);
      if (o.isChrdev(n.mode) && (e &= -513), e & 65536 && !o.isDir(n.mode))
        throw new o.ErrnoError(54);
      if (!a) {
        var s = o.mayOpen(n, e);
        if (s)
          throw new o.ErrnoError(s);
      }
      e & 512 && !a && o.truncate(n, 0), e &= -131713;
      var u = o.createStream({ node: n, path: o.getPath(n), flags: e, seekable: !0, position: 0, stream_ops: n.stream_ops, ungotten: [], error: !1 });
      return u.stream_ops.open && u.stream_ops.open(u), c.logReadFiles && !(e & 1) && (o.readFiles || (o.readFiles = {}), r in o.readFiles || (o.readFiles[r] = 1)), u;
    }, close: (r) => {
      if (o.isClosed(r))
        throw new o.ErrnoError(8);
      r.getdents && (r.getdents = null);
      try {
        r.stream_ops.close && r.stream_ops.close(r);
      } catch (e) {
        throw e;
      } finally {
        o.closeStream(r.fd);
      }
      r.fd = null;
    }, isClosed: (r) => r.fd === null, llseek: (r, e, t) => {
      if (o.isClosed(r))
        throw new o.ErrnoError(8);
      if (!r.seekable || !r.stream_ops.llseek)
        throw new o.ErrnoError(70);
      if (t != 0 && t != 1 && t != 2)
        throw new o.ErrnoError(28);
      return r.position = r.stream_ops.llseek(r, e, t), r.ungotten = [], r.position;
    }, read: (r, e, t, n, i) => {
      if (t >>>= 0, n < 0 || i < 0)
        throw new o.ErrnoError(28);
      if (o.isClosed(r))
        throw new o.ErrnoError(8);
      if ((r.flags & 2097155) === 1)
        throw new o.ErrnoError(8);
      if (o.isDir(r.node.mode))
        throw new o.ErrnoError(31);
      if (!r.stream_ops.read)
        throw new o.ErrnoError(28);
      var a = typeof i < "u";
      if (!a)
        i = r.position;
      else if (!r.seekable)
        throw new o.ErrnoError(70);
      var s = r.stream_ops.read(r, e, t, n, i);
      return a || (r.position += s), s;
    }, write: (r, e, t, n, i, a) => {
      if (t >>>= 0, n < 0 || i < 0)
        throw new o.ErrnoError(28);
      if (o.isClosed(r))
        throw new o.ErrnoError(8);
      if ((r.flags & 2097155) === 0)
        throw new o.ErrnoError(8);
      if (o.isDir(r.node.mode))
        throw new o.ErrnoError(31);
      if (!r.stream_ops.write)
        throw new o.ErrnoError(28);
      r.seekable && r.flags & 1024 && o.llseek(r, 0, 2);
      var s = typeof i < "u";
      if (!s)
        i = r.position;
      else if (!r.seekable)
        throw new o.ErrnoError(70);
      var u = r.stream_ops.write(r, e, t, n, i, a);
      return s || (r.position += u), u;
    }, allocate: (r, e, t) => {
      if (o.isClosed(r))
        throw new o.ErrnoError(8);
      if (e < 0 || t <= 0)
        throw new o.ErrnoError(28);
      if ((r.flags & 2097155) === 0)
        throw new o.ErrnoError(8);
      if (!o.isFile(r.node.mode) && !o.isDir(r.node.mode))
        throw new o.ErrnoError(43);
      if (!r.stream_ops.allocate)
        throw new o.ErrnoError(138);
      r.stream_ops.allocate(r, e, t);
    }, mmap: (r, e, t, n, i) => {
      if ((n & 2) !== 0 && (i & 2) === 0 && (r.flags & 2097155) !== 2)
        throw new o.ErrnoError(2);
      if ((r.flags & 2097155) === 1)
        throw new o.ErrnoError(2);
      if (!r.stream_ops.mmap)
        throw new o.ErrnoError(43);
      return r.stream_ops.mmap(r, e, t, n, i);
    }, msync: (r, e, t, n, i) => (t >>>= 0, r.stream_ops.msync ? r.stream_ops.msync(r, e, t, n, i) : 0), munmap: (r) => 0, ioctl: (r, e, t) => {
      if (!r.stream_ops.ioctl)
        throw new o.ErrnoError(59);
      return r.stream_ops.ioctl(r, e, t);
    }, readFile: (r, e = {}) => {
      if (e.flags = e.flags || 0, e.encoding = e.encoding || "binary", e.encoding !== "utf8" && e.encoding !== "binary")
        throw new Error('Invalid encoding type "' + e.encoding + '"');
      var t, n = o.open(r, e.flags), i = o.stat(r), a = i.size, s = new Uint8Array(a);
      return o.read(n, s, 0, a, 0), e.encoding === "utf8" ? t = ur(s, 0) : e.encoding === "binary" && (t = s), o.close(n), t;
    }, writeFile: (r, e, t = {}) => {
      t.flags = t.flags || 577;
      var n = o.open(r, t.flags, t.mode);
      if (typeof e == "string") {
        var i = new Uint8Array(fr(e) + 1), a = _r(e, i, 0, i.length);
        o.write(n, i, 0, a, void 0, t.canOwn);
      } else if (ArrayBuffer.isView(e))
        o.write(n, e, 0, e.byteLength, void 0, t.canOwn);
      else
        throw new Error("Unsupported data type");
      o.close(n);
    }, cwd: () => o.currentPath, chdir: (r) => {
      var e = o.lookupPath(r, { follow: !0 });
      if (e.node === null)
        throw new o.ErrnoError(44);
      if (!o.isDir(e.node.mode))
        throw new o.ErrnoError(54);
      var t = o.nodePermissions(e.node, "x");
      if (t)
        throw new o.ErrnoError(t);
      o.currentPath = e.path;
    }, createDefaultDirectories: () => {
      o.mkdir("/tmp"), o.mkdir("/home"), o.mkdir("/home/web_user");
    }, createDefaultDevices: () => {
      o.mkdir("/dev"), o.registerDevice(o.makedev(1, 3), { read: () => 0, write: (e, t, n, i, a) => i }), o.mkdev("/dev/null", o.makedev(1, 3)), or.register(o.makedev(5, 0), or.default_tty_ops), or.register(o.makedev(6, 0), or.default_tty1_ops), o.mkdev("/dev/tty", o.makedev(5, 0)), o.mkdev("/dev/tty1", o.makedev(6, 0));
      var r = Dt();
      o.createDevice("/dev", "random", r), o.createDevice("/dev", "urandom", r), o.mkdir("/dev/shm"), o.mkdir("/dev/shm/tmp");
    }, createSpecialDirectories: () => {
      o.mkdir("/proc");
      var r = o.mkdir("/proc/self");
      o.mkdir("/proc/self/fd"), o.mount({ mount: () => {
        var e = o.createNode(r, "fd", 16895, 73);
        return e.node_ops = { lookup: (t, n) => {
          var i = +n, a = o.getStream(i);
          if (!a) throw new o.ErrnoError(8);
          var s = { parent: null, mount: { mountpoint: "fake" }, node_ops: { readlink: () => a.path } };
          return s.parent = s, s;
        } }, e;
      } }, {}, "/proc/self/fd");
    }, createStandardStreams: () => {
      c.stdin ? o.createDevice("/dev", "stdin", c.stdin) : o.symlink("/dev/tty", "/dev/stdin"), c.stdout ? o.createDevice("/dev", "stdout", null, c.stdout) : o.symlink("/dev/tty", "/dev/stdout"), c.stderr ? o.createDevice("/dev", "stderr", null, c.stderr) : o.symlink("/dev/tty1", "/dev/stderr"), o.open("/dev/stdin", 0), o.open("/dev/stdout", 1), o.open("/dev/stderr", 1);
    }, ensureErrnoError: () => {
      o.ErrnoError || (o.ErrnoError = function(e, t) {
        this.name = "ErrnoError", this.node = t, this.setErrno = function(n) {
          this.errno = n;
        }, this.setErrno(e), this.message = "FS error";
      }, o.ErrnoError.prototype = new Error(), o.ErrnoError.prototype.constructor = o.ErrnoError, [44].forEach((r) => {
        o.genericErrors[r] = new o.ErrnoError(r), o.genericErrors[r].stack = "<generic error, no stack>";
      }));
    }, staticInit: () => {
      o.ensureErrnoError(), o.nameTable = new Array(4096), o.mount(A, {}, "/"), o.createDefaultDirectories(), o.createDefaultDevices(), o.createSpecialDirectories(), o.filesystems = { MEMFS: A };
    }, init: (r, e, t) => {
      o.init.initialized = !0, o.ensureErrnoError(), c.stdin = r || c.stdin, c.stdout = e || c.stdout, c.stderr = t || c.stderr, o.createStandardStreams();
    }, quit: () => {
      o.init.initialized = !1, Oe(0);
      for (var r = 0; r < o.streams.length; r++) {
        var e = o.streams[r];
        e && o.close(e);
      }
    }, getMode: (r, e) => {
      var t = 0;
      return r && (t |= 365), e && (t |= 146), t;
    }, findObject: (r, e) => {
      var t = o.analyzePath(r, e);
      return t.exists ? t.object : null;
    }, analyzePath: (r, e) => {
      try {
        var t = o.lookupPath(r, { follow: !e });
        r = t.path;
      } catch {
      }
      var n = { isRoot: !1, exists: !1, error: 0, name: null, path: null, object: null, parentExists: !1, parentPath: null, parentObject: null };
      try {
        var t = o.lookupPath(r, { parent: !0 });
        n.parentExists = !0, n.parentPath = t.path, n.parentObject = t.node, n.name = M.basename(r), t = o.lookupPath(r, { follow: !e }), n.exists = !0, n.path = t.path, n.object = t.node, n.name = t.node.name, n.isRoot = t.path === "/";
      } catch (i) {
        n.error = i.errno;
      }
      return n;
    }, createPath: (r, e, t, n) => {
      r = typeof r == "string" ? r : o.getPath(r);
      for (var i = e.split("/").reverse(); i.length; ) {
        var a = i.pop();
        if (a) {
          var s = M.join2(r, a);
          try {
            o.mkdir(s);
          } catch {
          }
          r = s;
        }
      }
      return s;
    }, createFile: (r, e, t, n, i) => {
      var a = M.join2(typeof r == "string" ? r : o.getPath(r), e), s = o.getMode(n, i);
      return o.create(a, s);
    }, createDataFile: (r, e, t, n, i, a) => {
      var s = e;
      r && (r = typeof r == "string" ? r : o.getPath(r), s = e ? M.join2(r, e) : r);
      var u = o.getMode(n, i), f = o.create(s, u);
      if (t) {
        if (typeof t == "string") {
          for (var l = new Array(t.length), d = 0, m = t.length; d < m; ++d) l[d] = t.charCodeAt(d);
          t = l;
        }
        o.chmod(f, u | 146);
        var _ = o.open(f, 577);
        o.write(_, t, 0, t.length, 0, a), o.close(_), o.chmod(f, u);
      }
      return f;
    }, createDevice: (r, e, t, n) => {
      var i = M.join2(typeof r == "string" ? r : o.getPath(r), e), a = o.getMode(!!t, !!n);
      o.createDevice.major || (o.createDevice.major = 64);
      var s = o.makedev(o.createDevice.major++, 0);
      return o.registerDevice(s, { open: (u) => {
        u.seekable = !1;
      }, close: (u) => {
        n && n.buffer && n.buffer.length && n(10);
      }, read: (u, f, l, d, m) => {
        for (var _ = 0, p = 0; p < d; p++) {
          var g;
          try {
            g = t();
          } catch {
            throw new o.ErrnoError(29);
          }
          if (g === void 0 && _ === 0)
            throw new o.ErrnoError(6);
          if (g == null) break;
          _++, f[l + p] = g;
        }
        return _ && (u.node.timestamp = Date.now()), _;
      }, write: (u, f, l, d, m) => {
        for (var _ = 0; _ < d; _++)
          try {
            n(f[l + _]);
          } catch {
            throw new o.ErrnoError(29);
          }
        return d && (u.node.timestamp = Date.now()), _;
      } }), o.mkdev(i, a, s);
    }, forceLoadFile: (r) => {
      if (r.isDevice || r.isFolder || r.link || r.contents) return !0;
      if (typeof XMLHttpRequest < "u")
        throw new Error("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.");
      if (U)
        try {
          r.contents = Pr(U(r.url), !0), r.usedBytes = r.contents.length;
        } catch {
          throw new o.ErrnoError(29);
        }
      else
        throw new Error("Cannot load without read() or XMLHttpRequest.");
    }, createLazyFile: (r, e, t, n, i) => {
      function a() {
        this.lengthKnown = !1, this.chunks = [];
      }
      if (a.prototype.get = function(p) {
        if (!(p > this.length - 1 || p < 0)) {
          var g = p % this.chunkSize, N = p / this.chunkSize | 0;
          return this.getter(N)[g];
        }
      }, a.prototype.setDataGetter = function(p) {
        this.getter = p;
      }, a.prototype.cacheLength = function() {
        var p = new XMLHttpRequest();
        if (p.open("HEAD", t, !1), p.send(null), !(p.status >= 200 && p.status < 300 || p.status === 304)) throw new Error("Couldn't load " + t + ". Status: " + p.status);
        var g = Number(p.getResponseHeader("Content-length")), N, T = (N = p.getResponseHeader("Accept-Ranges")) && N === "bytes", R = (N = p.getResponseHeader("Content-Encoding")) && N === "gzip", h = 1024 * 1024;
        T || (h = g);
        var b = (C, z) => {
          if (C > z) throw new Error("invalid range (" + C + ", " + z + ") or no bytes requested!");
          if (z > g - 1) throw new Error("only " + g + " bytes available! programmer error!");
          var I = new XMLHttpRequest();
          if (I.open("GET", t, !1), g !== h && I.setRequestHeader("Range", "bytes=" + C + "-" + z), I.responseType = "arraybuffer", I.overrideMimeType && I.overrideMimeType("text/plain; charset=x-user-defined"), I.send(null), !(I.status >= 200 && I.status < 300 || I.status === 304)) throw new Error("Couldn't load " + t + ". Status: " + I.status);
          return I.response !== void 0 ? new Uint8Array(I.response || []) : Pr(I.responseText || "", !0);
        }, B = this;
        B.setDataGetter((C) => {
          var z = C * h, I = (C + 1) * h - 1;
          if (I = Math.min(I, g - 1), typeof B.chunks[C] > "u" && (B.chunks[C] = b(z, I)), typeof B.chunks[C] > "u") throw new Error("doXHR failed!");
          return B.chunks[C];
        }), (R || !g) && (h = g = 1, g = this.getter(0).length, h = g, Dr("LazyFiles on gzip forces download of the whole file when length is accessed")), this._length = g, this._chunkSize = h, this.lengthKnown = !0;
      }, typeof XMLHttpRequest < "u") {
        if (!X) throw "Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc";
        var s = new a();
        Object.defineProperties(s, { length: { get: function() {
          return this.lengthKnown || this.cacheLength(), this._length;
        } }, chunkSize: { get: function() {
          return this.lengthKnown || this.cacheLength(), this._chunkSize;
        } } });
        var u = { isDevice: !1, contents: s };
      } else
        var u = { isDevice: !1, url: t };
      var f = o.createFile(r, e, u, n, i);
      u.contents ? f.contents = u.contents : u.url && (f.contents = null, f.url = u.url), Object.defineProperties(f, { usedBytes: { get: function() {
        return this.contents.length;
      } } });
      var l = {}, d = Object.keys(f.stream_ops);
      d.forEach((_) => {
        var p = f.stream_ops[_];
        l[_] = function() {
          return o.forceLoadFile(f), p.apply(null, arguments);
        };
      });
      function m(_, p, g, N, T) {
        var R = _.node.contents;
        if (T >= R.length) return 0;
        var h = Math.min(R.length - T, N);
        if (R.slice)
          for (var b = 0; b < h; b++)
            p[g + b] = R[T + b];
        else
          for (var b = 0; b < h; b++)
            p[g + b] = R.get(T + b);
        return h;
      }
      return l.read = (_, p, g, N, T) => (o.forceLoadFile(f), m(_, p, g, N, T)), l.mmap = (_, p, g, N, T) => {
        o.forceLoadFile(f);
        var R = ce(p);
        if (!R)
          throw new o.ErrnoError(48);
        return m(_, L, R, p, g), { ptr: R, allocated: !0 };
      }, f.stream_ops = l, f;
    }, createPreloadedFile: (r, e, t, n, i, a, s, u, f, l) => {
      var d = e ? V.resolve(M.join2(r, e)) : r;
      function m(_) {
        function p(g) {
          l && l(), u || o.createDataFile(r, e, g, n, i, f), a && a(), Mr();
        }
        Browser.handledByPreloadPlugin(_, d, p, () => {
          s && s(), Mr();
        }) || p(_);
      }
      Gr(), typeof t == "string" ? Ot(t, (_) => m(_), s) : m(t);
    }, indexedDB: () => window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB, DB_NAME: () => "EM_FS_" + window.location.pathname, DB_VERSION: 20, DB_STORE_NAME: "FILE_DATA", saveFilesToDB: (r, e = (() => {
    }), t = (() => {
    })) => {
      var n = o.indexedDB();
      try {
        var i = n.open(o.DB_NAME(), o.DB_VERSION);
      } catch (a) {
        return t(a);
      }
      i.onupgradeneeded = () => {
        Dr("creating db");
        var a = i.result;
        a.createObjectStore(o.DB_STORE_NAME);
      }, i.onsuccess = () => {
        var a = i.result, s = a.transaction([o.DB_STORE_NAME], "readwrite"), u = s.objectStore(o.DB_STORE_NAME), f = 0, l = 0, d = r.length;
        function m() {
          l == 0 ? e() : t();
        }
        r.forEach((_) => {
          var p = u.put(o.analyzePath(_).object.contents, _);
          p.onsuccess = () => {
            f++, f + l == d && m();
          }, p.onerror = () => {
            l++, f + l == d && m();
          };
        }), s.onerror = t;
      }, i.onerror = t;
    }, loadFilesFromDB: (r, e = (() => {
    }), t = (() => {
    })) => {
      var n = o.indexedDB();
      try {
        var i = n.open(o.DB_NAME(), o.DB_VERSION);
      } catch (a) {
        return t(a);
      }
      i.onupgradeneeded = t, i.onsuccess = () => {
        var a = i.result;
        try {
          var s = a.transaction([o.DB_STORE_NAME], "readonly");
        } catch (_) {
          t(_);
          return;
        }
        var u = s.objectStore(o.DB_STORE_NAME), f = 0, l = 0, d = r.length;
        function m() {
          l == 0 ? e() : t();
        }
        r.forEach((_) => {
          var p = u.get(_);
          p.onsuccess = () => {
            o.analyzePath(_).exists && o.unlink(_), o.createDataFile(M.dirname(_), M.basename(_), p.result, !0, !0, !0), f++, f + l == d && m();
          }, p.onerror = () => {
            l++, f + l == d && m();
          };
        }), s.onerror = t;
      }, i.onerror = t;
    } }, S = { DEFAULT_POLLMASK: 5, calculateAt: function(r, e, t) {
      if (M.isAbs(e))
        return e;
      var n;
      if (r === -100)
        n = o.cwd();
      else {
        var i = S.getStreamFromFD(r);
        n = i.path;
      }
      if (e.length == 0) {
        if (!t)
          throw new o.ErrnoError(44);
        return n;
      }
      return M.join2(n, e);
    }, doStat: function(r, e, t) {
      try {
        var n = r(e);
      } catch (u) {
        if (u && u.node && M.normalize(e) !== M.normalize(o.getPath(u.node)))
          return -54;
        throw u;
      }
      v[t >>> 2] = n.dev, v[t + 8 >>> 2] = n.ino, v[t + 12 >>> 2] = n.mode, O[t + 16 >>> 2] = n.nlink, v[t + 20 >>> 2] = n.uid, v[t + 24 >>> 2] = n.gid, v[t + 28 >>> 2] = n.rdev, P = [n.size >>> 0, (D = n.size, +Math.abs(D) >= 1 ? D > 0 ? (Math.min(+Math.floor(D / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math.ceil((D - +(~~D >>> 0)) / 4294967296) >>> 0 : 0)], v[t + 40 >>> 2] = P[0], v[t + 44 >>> 2] = P[1], v[t + 48 >>> 2] = 4096, v[t + 52 >>> 2] = n.blocks;
      var i = n.atime.getTime(), a = n.mtime.getTime(), s = n.ctime.getTime();
      return P = [Math.floor(i / 1e3) >>> 0, (D = Math.floor(i / 1e3), +Math.abs(D) >= 1 ? D > 0 ? (Math.min(+Math.floor(D / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math.ceil((D - +(~~D >>> 0)) / 4294967296) >>> 0 : 0)], v[t + 56 >>> 2] = P[0], v[t + 60 >>> 2] = P[1], O[t + 64 >>> 2] = i % 1e3 * 1e3, P = [Math.floor(a / 1e3) >>> 0, (D = Math.floor(a / 1e3), +Math.abs(D) >= 1 ? D > 0 ? (Math.min(+Math.floor(D / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math.ceil((D - +(~~D >>> 0)) / 4294967296) >>> 0 : 0)], v[t + 72 >>> 2] = P[0], v[t + 76 >>> 2] = P[1], O[t + 80 >>> 2] = a % 1e3 * 1e3, P = [Math.floor(s / 1e3) >>> 0, (D = Math.floor(s / 1e3), +Math.abs(D) >= 1 ? D > 0 ? (Math.min(+Math.floor(D / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math.ceil((D - +(~~D >>> 0)) / 4294967296) >>> 0 : 0)], v[t + 88 >>> 2] = P[0], v[t + 92 >>> 2] = P[1], O[t + 96 >>> 2] = s % 1e3 * 1e3, P = [n.ino >>> 0, (D = n.ino, +Math.abs(D) >= 1 ? D > 0 ? (Math.min(+Math.floor(D / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math.ceil((D - +(~~D >>> 0)) / 4294967296) >>> 0 : 0)], v[t + 104 >>> 2] = P[0], v[t + 108 >>> 2] = P[1], 0;
    }, doMsync: function(r, e, t, n, i) {
      if (!o.isFile(e.node.mode))
        throw new o.ErrnoError(43);
      if (n & 2)
        return 0;
      r >>>= 0;
      var a = J.slice(r, r + t);
      o.msync(e, a, i, t, n);
    }, varargs: void 0, get: function() {
      S.varargs += 4;
      var r = v[S.varargs - 4 >>> 2];
      return r;
    }, getStr: function(r) {
      var e = er(r);
      return e;
    }, getStreamFromFD: function(r) {
      var e = o.getStream(r);
      if (!e) throw new o.ErrnoError(8);
      return e;
    } };
    function Nt(r) {
      try {
        return r = S.getStr(r), o.chdir(r), 0;
      } catch (e) {
        if (typeof o > "u" || e.name !== "ErrnoError") throw e;
        return -e.errno;
      }
    }
    function Mt(r, e) {
      try {
        return r = S.getStr(r), o.chmod(r, e), 0;
      } catch (t) {
        if (typeof o > "u" || t.name !== "ErrnoError") throw t;
        return -t.errno;
      }
    }
    var x = { mount: function(r) {
      return c.websocket = c.websocket && typeof c.websocket == "object" ? c.websocket : {}, c.websocket._callbacks = {}, c.websocket.on = function(e, t) {
        return typeof t == "function" && (this._callbacks[e] = t), this;
      }, c.websocket.emit = function(e, t) {
        typeof this._callbacks[e] == "function" && this._callbacks[e].call(this, t);
      }, o.createNode(null, "/", 16895, 0);
    }, createSocket: function(r, e, t) {
      e &= -526337;
      var n = e == 1;
      if (n && t && t != 6)
        throw new o.ErrnoError(66);
      var i = { family: r, type: e, protocol: t, server: null, error: null, peers: {}, pending: [], recv_queue: [], sock_ops: x.websocket_sock_ops }, a = x.nextname(), s = o.createNode(x.root, a, 49152, 0);
      s.sock = i;
      var u = o.createStream({ path: a, node: s, flags: 2, seekable: !1, stream_ops: x.stream_ops });
      return i.stream = u, i;
    }, getSocket: function(r) {
      var e = o.getStream(r);
      return !e || !o.isSocket(e.node.mode) ? null : e.node.sock;
    }, stream_ops: { poll: function(r) {
      var e = r.node.sock;
      return e.sock_ops.poll(e);
    }, ioctl: function(r, e, t) {
      var n = r.node.sock;
      return n.sock_ops.ioctl(n, e, t);
    }, read: function(r, e, t, n, i) {
      var a = r.node.sock, s = a.sock_ops.recvmsg(a, n);
      return s ? (e.set(s.buffer, t), s.buffer.length) : 0;
    }, write: function(r, e, t, n, i) {
      var a = r.node.sock;
      return a.sock_ops.sendmsg(a, e, t, n);
    }, close: function(r) {
      var e = r.node.sock;
      e.sock_ops.close(e);
    } }, nextname: function() {
      return x.nextname.current || (x.nextname.current = 0), "socket[" + x.nextname.current++ + "]";
    }, websocket_sock_ops: { createPeer: function(r, e, t) {
      var n;
      if (typeof e == "object" && (n = e, e = null, t = null), n)
        if (n._socket)
          e = n._socket.remoteAddress, t = n._socket.remotePort;
        else {
          var i = /ws[s]?:\/\/([^:]+):(\d+)/.exec(n.url);
          if (!i)
            throw new Error("WebSocket URL must be in the format ws(s)://address:port");
          e = i[1], t = parseInt(i[2], 10);
        }
      else
        try {
          var a = c.websocket && typeof c.websocket == "object", s = "ws:#".replace("#", "//");
          if (a && typeof c.websocket.url == "string" && (s = c.websocket.url), s === "ws://" || s === "wss://") {
            var u = e.split("/");
            s = s + u[0] + ":" + t + "/" + u.slice(1).join("/");
          }
          var f = "binary";
          a && typeof c.websocket.subprotocol == "string" && (f = c.websocket.subprotocol);
          var l = void 0;
          f !== "null" && (f = f.replace(/^ +| +$/g, "").split(/ *, */), l = f), a && c.websocket.subprotocol === null && (f = "null", l = void 0);
          var d;
          d = WebSocket, n = new d(s, l), n.binaryType = "arraybuffer";
        } catch {
          throw new o.ErrnoError(23);
        }
      var m = { addr: e, port: t, socket: n, dgram_send_queue: [] };
      return x.websocket_sock_ops.addPeer(r, m), x.websocket_sock_ops.handlePeerEvents(r, m), r.type === 2 && typeof r.sport < "u" && m.dgram_send_queue.push(new Uint8Array([255, 255, 255, 255, 112, 111, 114, 116, (r.sport & 65280) >> 8, r.sport & 255])), m;
    }, getPeer: function(r, e, t) {
      return r.peers[e + ":" + t];
    }, addPeer: function(r, e) {
      r.peers[e.addr + ":" + e.port] = e;
    }, removePeer: function(r, e) {
      delete r.peers[e.addr + ":" + e.port];
    }, handlePeerEvents: function(r, e) {
      var t = !0, n = function() {
        c.websocket.emit("open", r.stream.fd);
        try {
          for (var a = e.dgram_send_queue.shift(); a; )
            e.socket.send(a), a = e.dgram_send_queue.shift();
        } catch {
          e.socket.close();
        }
      };
      function i(a) {
        if (typeof a == "string") {
          var s = new TextEncoder();
          a = s.encode(a);
        } else {
          if (Wr(a.byteLength !== void 0), a.byteLength == 0)
            return;
          a = new Uint8Array(a);
        }
        var u = t;
        if (t = !1, u && a.length === 10 && a[0] === 255 && a[1] === 255 && a[2] === 255 && a[3] === 255 && a[4] === 112 && a[5] === 111 && a[6] === 114 && a[7] === 116) {
          var f = a[8] << 8 | a[9];
          x.websocket_sock_ops.removePeer(r, e), e.port = f, x.websocket_sock_ops.addPeer(r, e);
          return;
        }
        r.recv_queue.push({ addr: e.addr, port: e.port, data: a }), c.websocket.emit("message", r.stream.fd);
      }
      Z ? (e.socket.on("open", n), e.socket.on("message", function(a, s) {
        s && i(new Uint8Array(a).buffer);
      }), e.socket.on("close", function() {
        c.websocket.emit("close", r.stream.fd);
      }), e.socket.on("error", function(a) {
        r.error = 14, c.websocket.emit("error", [r.stream.fd, r.error, "ECONNREFUSED: Connection refused"]);
      })) : (e.socket.onopen = n, e.socket.onclose = function() {
        c.websocket.emit("close", r.stream.fd);
      }, e.socket.onmessage = function(s) {
        i(s.data);
      }, e.socket.onerror = function(a) {
        r.error = 14, c.websocket.emit("error", [r.stream.fd, r.error, "ECONNREFUSED: Connection refused"]);
      });
    }, poll: function(r) {
      if (r.type === 1 && r.server)
        return r.pending.length ? 65 : 0;
      var e = 0, t = r.type === 1 ? x.websocket_sock_ops.getPeer(r, r.daddr, r.dport) : null;
      return (r.recv_queue.length || !t || t && t.socket.readyState === t.socket.CLOSING || t && t.socket.readyState === t.socket.CLOSED) && (e |= 65), (!t || t && t.socket.readyState === t.socket.OPEN) && (e |= 4), (t && t.socket.readyState === t.socket.CLOSING || t && t.socket.readyState === t.socket.CLOSED) && (e |= 16), e;
    }, ioctl: function(r, e, t) {
      switch (e) {
        case 21531:
          var n = 0;
          return r.recv_queue.length && (n = r.recv_queue[0].data.length), v[t >>> 2] = n, 0;
        default:
          return 28;
      }
    }, close: function(r) {
      if (r.server) {
        try {
          r.server.close();
        } catch {
        }
        r.server = null;
      }
      for (var e = Object.keys(r.peers), t = 0; t < e.length; t++) {
        var n = r.peers[e[t]];
        try {
          n.socket.close();
        } catch {
        }
        x.websocket_sock_ops.removePeer(r, n);
      }
      return 0;
    }, bind: function(r, e, t) {
      if (typeof r.saddr < "u" || typeof r.sport < "u")
        throw new o.ErrnoError(28);
      if (r.saddr = e, r.sport = t, r.type === 2) {
        r.server && (r.server.close(), r.server = null);
        try {
          r.sock_ops.listen(r, 0);
        } catch (n) {
          if (n.name !== "ErrnoError" || n.errno !== 138) throw n;
        }
      }
    }, connect: function(r, e, t) {
      if (r.server)
        throw new o.ErrnoError(138);
      if (typeof r.daddr < "u" && typeof r.dport < "u") {
        var n = x.websocket_sock_ops.getPeer(r, r.daddr, r.dport);
        if (n)
          throw n.socket.readyState === n.socket.CONNECTING ? new o.ErrnoError(7) : new o.ErrnoError(30);
      }
      var i = x.websocket_sock_ops.createPeer(r, e, t);
      throw r.daddr = i.addr, r.dport = i.port, new o.ErrnoError(26);
    }, listen: function(r, e) {
      if (!Z)
        throw new o.ErrnoError(138);
    }, accept: function(r) {
      if (!r.server || !r.pending.length)
        throw new o.ErrnoError(28);
      var e = r.pending.shift();
      return e.stream.flags = r.stream.flags, e;
    }, getname: function(r, e) {
      var t, n;
      if (e) {
        if (r.daddr === void 0 || r.dport === void 0)
          throw new o.ErrnoError(53);
        t = r.daddr, n = r.dport;
      } else
        t = r.saddr || 0, n = r.sport || 0;
      return { addr: t, port: n };
    }, sendmsg: function(r, e, t, n, i, a) {
      if (r.type === 2) {
        if ((i === void 0 || a === void 0) && (i = r.daddr, a = r.dport), i === void 0 || a === void 0)
          throw new o.ErrnoError(17);
      } else
        i = r.daddr, a = r.dport;
      var s = x.websocket_sock_ops.getPeer(r, i, a);
      if (r.type === 1) {
        if (!s || s.socket.readyState === s.socket.CLOSING || s.socket.readyState === s.socket.CLOSED)
          throw new o.ErrnoError(53);
        if (s.socket.readyState === s.socket.CONNECTING)
          throw new o.ErrnoError(6);
      }
      ArrayBuffer.isView(e) && (t += e.byteOffset, e = e.buffer);
      var u;
      if (u = e.slice(t, t + n), r.type === 2 && (!s || s.socket.readyState !== s.socket.OPEN))
        return (!s || s.socket.readyState === s.socket.CLOSING || s.socket.readyState === s.socket.CLOSED) && (s = x.websocket_sock_ops.createPeer(r, i, a)), s.dgram_send_queue.push(u), n;
      try {
        return s.socket.send(u), n;
      } catch {
        throw new o.ErrnoError(28);
      }
    }, recvmsg: function(r, e) {
      if (r.type === 1 && r.server)
        throw new o.ErrnoError(53);
      var t = r.recv_queue.shift();
      if (!t) {
        if (r.type === 1) {
          var n = x.websocket_sock_ops.getPeer(r, r.daddr, r.dport);
          if (!n)
            throw new o.ErrnoError(53);
          if (n.socket.readyState === n.socket.CLOSING || n.socket.readyState === n.socket.CLOSED)
            return null;
          throw new o.ErrnoError(6);
        }
        throw new o.ErrnoError(6);
      }
      var i = t.data.byteLength || t.data.length, a = t.data.byteOffset || 0, s = t.data.buffer || t.data, u = Math.min(e, i), f = { buffer: new Uint8Array(s, a, u), addr: t.addr, port: t.port };
      if (r.type === 1 && u < i) {
        var l = i - u;
        t.data = new Uint8Array(s, a + u, l), r.recv_queue.unshift(t);
      }
      return f;
    } } };
    function Lr(r) {
      var e = x.getSocket(r);
      if (!e) throw new o.ErrnoError(8);
      return e;
    }
    function le(r) {
      return v[Ae() >>> 2] = r, r;
    }
    function de(r) {
      return (r & 255) + "." + (r >> 8 & 255) + "." + (r >> 16 & 255) + "." + (r >> 24 & 255);
    }
    function Ft(r) {
      var e = "", t = 0, n = 0, i = 0, a = 0, s = 0, u = 0, f = [r[0] & 65535, r[0] >> 16, r[1] & 65535, r[1] >> 16, r[2] & 65535, r[2] >> 16, r[3] & 65535, r[3] >> 16], l = !0, d = "";
      for (u = 0; u < 5; u++)
        if (f[u] !== 0) {
          l = !1;
          break;
        }
      if (l) {
        if (d = de(f[6] | f[7] << 16), f[5] === -1)
          return e = "::ffff:", e += d, e;
        if (f[5] === 0)
          return e = "::", d === "0.0.0.0" && (d = ""), d === "0.0.0.1" && (d = "1"), e += d, e;
      }
      for (t = 0; t < 8; t++)
        f[t] === 0 && (t - i > 1 && (s = 0), i = t, s++), s > n && (n = s, a = t - n + 1);
      for (t = 0; t < 8; t++) {
        if (n > 1 && f[t] === 0 && t >= a && t < a + n) {
          t === a && (e += ":", a === 0 && (e += ":"));
          continue;
        }
        e += Number(Vr(f[t] & 65535)).toString(16), e += t < 7 ? ":" : "";
      }
      return e;
    }
    function Tt(r, e) {
      var t = q[r >>> 1], n = Vr(Zr[r + 2 >>> 1]), i;
      switch (t) {
        case 2:
          if (e !== 16)
            return { errno: 28 };
          i = v[r + 4 >>> 2], i = de(i);
          break;
        case 10:
          if (e !== 28)
            return { errno: 28 };
          i = [v[r + 8 >>> 2], v[r + 12 >>> 2], v[r + 16 >>> 2], v[r + 20 >>> 2]], i = Ft(i);
          break;
        default:
          return { errno: 5 };
      }
      return { family: t, addr: i, port: n };
    }
    function qr(r) {
      for (var e = r.split("."), t = 0; t < 4; t++) {
        var n = Number(e[t]);
        if (isNaN(n)) return null;
        e[t] = n;
      }
      return (e[0] | e[1] << 8 | e[2] << 16 | e[3] << 24) >>> 0;
    }
    function xr(r) {
      return parseInt(r);
    }
    function ve(r) {
      var e, t, n, i, a = /^((?=.*::)(?!.*::.+::)(::)?([\dA-F]{1,4}:(:|\b)|){5}|([\dA-F]{1,4}:){6})((([\dA-F]{1,4}((?!\3)::|:\b|$))|(?!\2\3)){2}|(((2[0-4]|1\d|[1-9])?\d|25[0-5])\.?\b){4})$/i, s = [];
      if (!a.test(r))
        return null;
      if (r === "::")
        return [0, 0, 0, 0, 0, 0, 0, 0];
      for (r.startsWith("::") ? r = r.replace("::", "Z:") : r = r.replace("::", ":Z:"), r.indexOf(".") > 0 ? (r = r.replace(new RegExp("[.]", "g"), ":"), e = r.split(":"), e[e.length - 4] = xr(e[e.length - 4]) + xr(e[e.length - 3]) * 256, e[e.length - 3] = xr(e[e.length - 2]) + xr(e[e.length - 1]) * 256, e = e.slice(0, e.length - 2)) : e = r.split(":"), n = 0, i = 0, t = 0; t < e.length; t++)
        if (typeof e[t] == "string")
          if (e[t] === "Z") {
            for (i = 0; i < 8 - e.length + 1; i++)
              s[t + i] = 0;
            n = i - 1;
          } else
            s[t + n] = Ur(parseInt(e[t], 16));
        else
          s[t + n] = e[t];
      return [s[1] << 16 | s[0], s[3] << 16 | s[2], s[5] << 16 | s[4], s[7] << 16 | s[6]];
    }
    var W = { address_map: { id: 1, addrs: {}, names: {} }, lookup_name: function(r) {
      var e = qr(r);
      if (e !== null || (e = ve(r), e !== null))
        return r;
      var t;
      if (W.address_map.addrs[r])
        t = W.address_map.addrs[r];
      else {
        var n = W.address_map.id++;
        Wr(n < 65535, "exceeded max address mappings of 65535"), t = "172.29." + (n & 255) + "." + (n & 65280), W.address_map.names[t] = r, W.address_map.addrs[r] = t;
      }
      return t;
    }, lookup_addr: function(r) {
      return W.address_map.names[r] ? W.address_map.names[r] : null;
    } };
    function he(r, e, t) {
      if (t && r === 0) return null;
      var n = Tt(r, e);
      if (n.errno) throw new o.ErrnoError(n.errno);
      return n.addr = W.lookup_addr(n.addr) || n.addr, n;
    }
    function Rt(r, e, t) {
      try {
        var n = Lr(r), i = he(e, t);
        return n.sock_ops.connect(n, i.addr, i.port), 0;
      } catch (a) {
        if (typeof o > "u" || a.name !== "ErrnoError") throw a;
        return -a.errno;
      }
    }
    function Ct(r, e, t, n) {
      try {
        if (e = S.getStr(e), e = S.calculateAt(r, e), t & -8)
          return -28;
        var i = o.lookupPath(e, { follow: !0 }), a = i.node;
        if (!a)
          return -44;
        var s = "";
        return t & 4 && (s += "r"), t & 2 && (s += "w"), t & 1 && (s += "x"), s && o.nodePermissions(a, s) ? -2 : 0;
      } catch (u) {
        if (typeof o > "u" || u.name !== "ErrnoError") throw u;
        return -u.errno;
      }
    }
    function Pt(r, e) {
      try {
        return o.fchmod(r, e), 0;
      } catch (t) {
        if (typeof o > "u" || t.name !== "ErrnoError") throw t;
        return -t.errno;
      }
    }
    function Lt(r, e, t) {
      S.varargs = t;
      try {
        var n = S.getStreamFromFD(r);
        switch (e) {
          case 0: {
            var i = S.get();
            if (i < 0)
              return -28;
            var a;
            return a = o.createStream(n, i), a.fd;
          }
          case 1:
          case 2:
            return 0;
          case 3:
            return n.flags;
          case 4: {
            var i = S.get();
            return n.flags |= i, 0;
          }
          case 5: {
            var i = S.get(), s = 0;
            return q[i + s >>> 1] = 2, 0;
          }
          case 6:
          case 7:
            return 0;
          case 16:
          case 8:
            return -28;
          case 9:
            return le(28), -1;
          default:
            return -28;
        }
      } catch (u) {
        if (typeof o > "u" || u.name !== "ErrnoError") throw u;
        return -u.errno;
      }
    }
    function xt(r, e) {
      try {
        var t = S.getStreamFromFD(r);
        return S.doStat(o.stat, t.path, e);
      } catch (n) {
        if (typeof o > "u" || n.name !== "ErrnoError") throw n;
        return -n.errno;
      }
    }
    function jt(r, e, t) {
      try {
        return r = S.getStr(r), v[t + 4 >>> 2] = 4096, v[t + 40 >>> 2] = 4096, v[t + 8 >>> 2] = 1e6, v[t + 12 >>> 2] = 5e5, v[t + 16 >>> 2] = 5e5, v[t + 20 >>> 2] = o.nextInode, v[t + 24 >>> 2] = 1e6, v[t + 28 >>> 2] = 42, v[t + 44 >>> 2] = 2, v[t + 36 >>> 2] = 255, 0;
      } catch (n) {
        if (typeof o > "u" || n.name !== "ErrnoError") throw n;
        return -n.errno;
      }
    }
    function It(r, e, t) {
      try {
        var n = S.getStreamFromFD(r);
        return jt(0, e, t);
      } catch (i) {
        if (typeof o > "u" || i.name !== "ErrnoError") throw i;
        return -i.errno;
      }
    }
    function Bt(r, e) {
      try {
        if (e === 0) return -28;
        var t = o.cwd(), n = fr(t) + 1;
        return e < n ? -68 : (Nr(t, r, e), n);
      } catch (i) {
        if (typeof o > "u" || i.name !== "ErrnoError") throw i;
        return -i.errno;
      }
    }
    function Ut(r, e, t) {
      try {
        var n = S.getStreamFromFD(r);
        n.getdents || (n.getdents = o.readdir(n.path));
        for (var i = 280, a = 0, s = o.llseek(n, 0, 1), u = Math.floor(s / i); u < n.getdents.length && a + i <= t; ) {
          var f, l, d = n.getdents[u];
          if (d === ".")
            f = n.node.id, l = 4;
          else if (d === "..") {
            var m = o.lookupPath(n.path, { parent: !0 });
            f = m.node.id, l = 4;
          } else {
            var _ = o.lookupNode(n.node, d);
            f = _.id, l = o.isChrdev(_.mode) ? 2 : o.isDir(_.mode) ? 4 : o.isLink(_.mode) ? 10 : 8;
          }
          P = [f >>> 0, (D = f, +Math.abs(D) >= 1 ? D > 0 ? (Math.min(+Math.floor(D / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math.ceil((D - +(~~D >>> 0)) / 4294967296) >>> 0 : 0)], v[e + a >>> 2] = P[0], v[e + a + 4 >>> 2] = P[1], P = [(u + 1) * i >>> 0, (D = (u + 1) * i, +Math.abs(D) >= 1 ? D > 0 ? (Math.min(+Math.floor(D / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math.ceil((D - +(~~D >>> 0)) / 4294967296) >>> 0 : 0)], v[e + a + 8 >>> 2] = P[0], v[e + a + 12 >>> 2] = P[1], q[e + a + 16 >>> 1] = 280, L[e + a + 18 >>> 0] = l, Nr(d, e + a + 19, 256), a += i, u += 1;
        }
        return o.llseek(n, u * i, 0), a;
      } catch (p) {
        if (typeof o > "u" || p.name !== "ErrnoError") throw p;
        return -p.errno;
      }
    }
    function Ht(r, e, t, n, i) {
      try {
        var a = Lr(r);
        return e === 1 && t === 4 ? (v[n >>> 2] = a.error, v[i >>> 2] = 4, a.error = null, 0) : -50;
      } catch (s) {
        if (typeof o > "u" || s.name !== "ErrnoError") throw s;
        return -s.errno;
      }
    }
    function zt(r, e, t) {
      S.varargs = t;
      try {
        var n = S.getStreamFromFD(r);
        switch (e) {
          case 21509:
          case 21505:
            return n.tty ? 0 : -59;
          case 21510:
          case 21511:
          case 21512:
          case 21506:
          case 21507:
          case 21508:
            return n.tty ? 0 : -59;
          case 21519: {
            if (!n.tty) return -59;
            var i = S.get();
            return v[i >>> 2] = 0, 0;
          }
          case 21520:
            return n.tty ? -28 : -59;
          case 21531: {
            var i = S.get();
            return o.ioctl(n, e, i);
          }
          case 21523:
            return n.tty ? 0 : -59;
          case 21524:
            return n.tty ? 0 : -59;
          default:
            return -28;
        }
      } catch (a) {
        if (typeof o > "u" || a.name !== "ErrnoError") throw a;
        return -a.errno;
      }
    }
    function Yt(r, e) {
      try {
        return r = S.getStr(r), S.doStat(o.lstat, r, e);
      } catch (t) {
        if (typeof o > "u" || t.name !== "ErrnoError") throw t;
        return -t.errno;
      }
    }
    function Wt(r, e, t) {
      try {
        return e = S.getStr(e), e = S.calculateAt(r, e), e = M.normalize(e), e[e.length - 1] === "/" && (e = e.substr(0, e.length - 1)), o.mkdir(e, t, 0), 0;
      } catch (n) {
        if (typeof o > "u" || n.name !== "ErrnoError") throw n;
        return -n.errno;
      }
    }
    function Gt(r, e, t, n) {
      try {
        e = S.getStr(e);
        var i = n & 256, a = n & 4096;
        return n = n & -6401, e = S.calculateAt(r, e, a), S.doStat(i ? o.lstat : o.stat, e, t);
      } catch (s) {
        if (typeof o > "u" || s.name !== "ErrnoError") throw s;
        return -s.errno;
      }
    }
    function Xt(r, e, t, n) {
      S.varargs = n;
      try {
        e = S.getStr(e), e = S.calculateAt(r, e);
        var i = n ? S.get() : 0;
        return o.open(e, t, i).fd;
      } catch (a) {
        if (typeof o > "u" || a.name !== "ErrnoError") throw a;
        return -a.errno;
      }
    }
    function qt(r, e, t) {
      try {
        for (var n = 0, i = 0; i < e; i++) {
          var a = r + 8 * i, s = v[a >>> 2], u = q[a + 4 >>> 1], f = 32, l = o.getStream(s);
          l && (f = S.DEFAULT_POLLMASK, l.stream_ops.poll && (f = l.stream_ops.poll(l))), f &= u | 8 | 16, f && n++, q[a + 6 >>> 1] = f;
        }
        return n;
      } catch (d) {
        if (typeof o > "u" || d.name !== "ErrnoError") throw d;
        return -d.errno;
      }
    }
    function Vt(r, e, t, n) {
      try {
        if (e = S.getStr(e), e = S.calculateAt(r, e), n <= 0) return -28;
        var i = o.readlink(e), a = Math.min(n, fr(i)), s = L[t + a >>> 0];
        return Nr(i, t, n + 1), L[t + a >>> 0] = s, a;
      } catch (u) {
        if (typeof o > "u" || u.name !== "ErrnoError") throw u;
        return -u.errno;
      }
    }
    function Kt(r, e, t, n, i) {
      switch (e) {
        case 2:
          t = qr(t), Xr(r, 16), i && (v[i >>> 2] = 16), q[r >>> 1] = e, v[r + 4 >>> 2] = t, q[r + 2 >>> 1] = Ur(n);
          break;
        case 10:
          t = ve(t), Xr(r, 28), i && (v[i >>> 2] = 28), v[r >>> 2] = e, v[r + 8 >>> 2] = t[0], v[r + 12 >>> 2] = t[1], v[r + 16 >>> 2] = t[2], v[r + 20 >>> 2] = t[3], q[r + 2 >>> 1] = Ur(n);
          break;
        default:
          return 5;
      }
      return 0;
    }
    function $t(r, e, t, n, i, a) {
      try {
        var s = Lr(r), u = s.sock_ops.recvmsg(s, t);
        if (!u) return 0;
        if (i)
          var f = Kt(i, s.family, W.lookup_name(u.addr), u.port, a);
        return J.set(u.buffer, e >>> 0), u.buffer.byteLength;
      } catch (l) {
        if (typeof o > "u" || l.name !== "ErrnoError") throw l;
        return -l.errno;
      }
    }
    function Zt(r, e, t, n) {
      try {
        return e = S.getStr(e), n = S.getStr(n), e = S.calculateAt(r, e), n = S.calculateAt(t, n), o.rename(e, n), 0;
      } catch (i) {
        if (typeof o > "u" || i.name !== "ErrnoError") throw i;
        return -i.errno;
      }
    }
    function Qt(r) {
      try {
        return r = S.getStr(r), o.rmdir(r), 0;
      } catch (e) {
        if (typeof o > "u" || e.name !== "ErrnoError") throw e;
        return -e.errno;
      }
    }
    function Jt(r, e, t, n, i, a) {
      try {
        var s = Lr(r), u = he(i, a, !0);
        return u ? s.sock_ops.sendmsg(s, L, e, t, u.addr, u.port) : o.write(s.stream, L, e, t);
      } catch (f) {
        if (typeof o > "u" || f.name !== "ErrnoError") throw f;
        return -f.errno;
      }
    }
    function rn(r, e, t) {
      try {
        var n = x.createSocket(r, e, t);
        return n.stream.fd;
      } catch (i) {
        if (typeof o > "u" || i.name !== "ErrnoError") throw i;
        return -i.errno;
      }
    }
    function en(r, e) {
      try {
        return r = S.getStr(r), S.doStat(o.stat, r, e);
      } catch (t) {
        if (typeof o > "u" || t.name !== "ErrnoError") throw t;
        return -t.errno;
      }
    }
    function tn(r, e) {
      try {
        return r = S.getStr(r), e = S.getStr(e), o.symlink(r, e), 0;
      } catch (t) {
        if (typeof o > "u" || t.name !== "ErrnoError") throw t;
        return -t.errno;
      }
    }
    function nn(r, e, t) {
      try {
        return e = S.getStr(e), e = S.calculateAt(r, e), t === 0 ? o.unlink(e) : t === 512 ? o.rmdir(e) : Y("Invalid flags passed to unlinkat"), 0;
      } catch (n) {
        if (typeof o > "u" || n.name !== "ErrnoError") throw n;
        return -n.errno;
      }
    }
    var on = !0;
    function an() {
      return on;
    }
    function sn() {
      throw 1 / 0;
    }
    function un(r) {
      return O[r >>> 2] + v[r + 4 >>> 2] * 4294967296;
    }
    function Er(r) {
      return r % 4 === 0 && (r % 100 !== 0 || r % 400 === 0);
    }
    var fn = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335], cn = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
    function _e(r) {
      var e = Er(r.getFullYear()), t = e ? fn : cn, n = t[r.getMonth()] + r.getDate() - 1;
      return n;
    }
    function ln(r, e) {
      var t = new Date(un(r) * 1e3);
      v[e >>> 2] = t.getSeconds(), v[e + 4 >>> 2] = t.getMinutes(), v[e + 8 >>> 2] = t.getHours(), v[e + 12 >>> 2] = t.getDate(), v[e + 16 >>> 2] = t.getMonth(), v[e + 20 >>> 2] = t.getFullYear() - 1900, v[e + 24 >>> 2] = t.getDay();
      var n = _e(t) | 0;
      v[e + 28 >>> 2] = n, v[e + 36 >>> 2] = -(t.getTimezoneOffset() * 60);
      var i = new Date(t.getFullYear(), 0, 1), a = new Date(t.getFullYear(), 6, 1).getTimezoneOffset(), s = i.getTimezoneOffset(), u = (a != s && t.getTimezoneOffset() == Math.min(s, a)) | 0;
      v[e + 32 >>> 2] = u;
    }
    function dn(r) {
      var e = new Date(v[r + 20 >>> 2] + 1900, v[r + 16 >>> 2], v[r + 12 >>> 2], v[r + 8 >>> 2], v[r + 4 >>> 2], v[r >>> 2], 0), t = v[r + 32 >>> 2], n = e.getTimezoneOffset(), i = new Date(e.getFullYear(), 0, 1), a = new Date(e.getFullYear(), 6, 1).getTimezoneOffset(), s = i.getTimezoneOffset(), u = Math.min(s, a);
      if (t < 0)
        v[r + 32 >>> 2] = +(a != s && u == n);
      else if (t > 0 != (u == n)) {
        var f = Math.max(s, a), l = t > 0 ? u : f;
        e.setTime(e.getTime() + (l - n) * 6e4);
      }
      v[r + 24 >>> 2] = e.getDay();
      var d = _e(e) | 0;
      return v[r + 28 >>> 2] = d, v[r >>> 2] = e.getSeconds(), v[r + 4 >>> 2] = e.getMinutes(), v[r + 8 >>> 2] = e.getHours(), v[r + 12 >>> 2] = e.getDate(), v[r + 16 >>> 2] = e.getMonth(), v[r + 20 >>> 2] = e.getYear(), e.getTime() / 1e3 | 0;
    }
    function vn(r, e, t, n, i, a, s) {
      try {
        var u = S.getStreamFromFD(n), f = o.mmap(u, r, i, e, t), l = f.ptr;
        return v[a >>> 2] = f.allocated, l >>>= 0, O[s >>> 2] = l, 0;
      } catch (d) {
        if (typeof o > "u" || d.name !== "ErrnoError") throw d;
        return -d.errno;
      }
    }
    function hn(r, e, t, n, i, a) {
      try {
        var s = S.getStreamFromFD(i);
        t & 2 && S.doMsync(r, s, e, n, a), o.munmap(s);
      } catch (u) {
        if (typeof o > "u" || u.name !== "ErrnoError") throw u;
        return -u.errno;
      }
    }
    function _n(r) {
      if (r instanceof se || r == "unwind")
        return Or;
      G(1, r);
    }
    function mn(r) {
      Or = r, te() || (c.onExit && c.onExit(r), hr = !0), G(r, new se(r));
    }
    function me(r, e) {
      Or = r, te() || rt(), mn(r);
    }
    var pn = me, pe;
    pe = () => performance.now();
    function we(r) {
      var e = fr(r) + 1, t = lr(e);
      return t && _r(r, L, t, e), t;
    }
    function wn(r, e, t) {
      var n = (/* @__PURE__ */ new Date()).getFullYear(), i = new Date(n, 0, 1), a = new Date(n, 6, 1), s = i.getTimezoneOffset(), u = a.getTimezoneOffset(), f = Math.max(s, u);
      O[r >>> 2] = f * 60, v[e >>> 2] = +(s != u);
      function l(g) {
        var N = g.toTimeString().match(/\(([A-Za-z ]+)\)$/);
        return N ? N[1] : "GMT";
      }
      var d = l(i), m = l(a), _ = we(d), p = we(m);
      u < s ? (O[t >>> 2] = _, O[t + 4 >>> 2] = p) : (O[t >>> 2] = p, O[t + 4 >>> 2] = _);
    }
    function yn() {
      Y("");
    }
    function En() {
      return Date.now();
    }
    function ye() {
      return 4294901760;
    }
    function gn() {
      return ye();
    }
    function kn(r, e, t) {
      J.copyWithin(r >>> 0, e >>> 0, e + t >>> 0);
    }
    function bn(r) {
      var e = Ar.buffer;
      try {
        return Ar.grow(r - e.byteLength + 65535 >>> 16), Qr(), 1;
      } catch {
      }
    }
    function Sn(r) {
      var e = J.length;
      r = r >>> 0;
      var t = ye();
      if (r > t)
        return !1;
      let n = (f, l) => f + (l - f % l) % l;
      for (var i = 1; i <= 4; i *= 2) {
        var a = e * (1 + 0.2 / i);
        a = Math.min(a, r + 100663296);
        var s = Math.min(t, n(Math.max(r, a), 65536)), u = bn(s);
        if (u)
          return !0;
      }
      return !1;
    }
    var jr = {};
    function Dn() {
      return sr || "./this.program";
    }
    function gr() {
      if (!gr.strings) {
        var r = (typeof navigator == "object" && navigator.languages && navigator.languages[0] || "C").replace("-", "_") + ".UTF-8", e = { USER: "web_user", LOGNAME: "web_user", PATH: "/", PWD: "/", HOME: "/home/web_user", LANG: r, _: Dn() };
        for (var t in jr)
          jr[t] === void 0 ? delete e[t] : e[t] = jr[t];
        var n = [];
        for (var t in e)
          n.push(t + "=" + e[t]);
        gr.strings = n;
      }
      return gr.strings;
    }
    function An(r, e, t) {
      for (var n = 0; n < r.length; ++n)
        L[e++ >>> 0] = r.charCodeAt(n);
      L[e >>> 0] = 0;
    }
    function On(r, e) {
      var t = 0;
      return gr().forEach(function(n, i) {
        var a = e + t;
        O[r + i * 4 >>> 2] = a, An(n, a), t += n.length + 1;
      }), 0;
    }
    function Nn(r, e) {
      var t = gr();
      O[r >>> 2] = t.length;
      var n = 0;
      return t.forEach(function(i) {
        n += i.length + 1;
      }), O[e >>> 2] = n, 0;
    }
    function Mn(r) {
      try {
        var e = S.getStreamFromFD(r);
        return o.close(e), 0;
      } catch (t) {
        if (typeof o > "u" || t.name !== "ErrnoError") throw t;
        return t.errno;
      }
    }
    function Fn(r, e) {
      try {
        var t = S.getStreamFromFD(r), n = t.tty ? 2 : o.isDir(t.mode) ? 3 : o.isLink(t.mode) ? 7 : 4;
        return L[e >>> 0] = n, 0;
      } catch (i) {
        if (typeof o > "u" || i.name !== "ErrnoError") throw i;
        return i.errno;
      }
    }
    function Tn(r, e, t, n) {
      for (var i = 0, a = 0; a < t; a++) {
        var s = O[e >>> 2], u = O[e + 4 >>> 2];
        e += 8;
        var f = o.read(r, L, s, u, n);
        if (f < 0) return -1;
        if (i += f, f < u) break;
      }
      return i;
    }
    function Rn(r, e, t, n) {
      try {
        var i = S.getStreamFromFD(r), a = Tn(i, e, t);
        return O[n >>> 2] = a, 0;
      } catch (s) {
        if (typeof o > "u" || s.name !== "ErrnoError") throw s;
        return s.errno;
      }
    }
    function Cn(r, e) {
      return e + 2097152 >>> 0 < 4194305 - !!r ? (r >>> 0) + e * 4294967296 : NaN;
    }
    function Pn(r, e, t, n, i) {
      try {
        var a = Cn(e, t);
        if (isNaN(a)) return 61;
        var s = S.getStreamFromFD(r);
        return o.llseek(s, a, n), P = [s.position >>> 0, (D = s.position, +Math.abs(D) >= 1 ? D > 0 ? (Math.min(+Math.floor(D / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math.ceil((D - +(~~D >>> 0)) / 4294967296) >>> 0 : 0)], v[i >>> 2] = P[0], v[i + 4 >>> 2] = P[1], s.getdents && a === 0 && n === 0 && (s.getdents = null), 0;
      } catch (u) {
        if (typeof o > "u" || u.name !== "ErrnoError") throw u;
        return u.errno;
      }
    }
    function Ln(r, e, t, n) {
      for (var i = 0, a = 0; a < t; a++) {
        var s = O[e >>> 2], u = O[e + 4 >>> 2];
        e += 8;
        var f = o.write(r, L, s, u, n);
        if (f < 0) return -1;
        i += f;
      }
      return i;
    }
    function xn(r, e, t, n) {
      try {
        var i = S.getStreamFromFD(r), a = Ln(i, e, t);
        return O[n >>> 2] = a, 0;
      } catch (s) {
        if (typeof o > "u" || s.name !== "ErrnoError") throw s;
        return s.errno;
      }
    }
    function jn(r) {
      var e = lr(20), t = lr(r.length + 1);
      Nr(r, t, r.length + 1), O[e >>> 2] = t;
      var n = lr(4);
      O[n >>> 2] = 0, O[e + 4 >>> 2] = n;
      var i = 2;
      v[e + 8 >>> 2] = i, v[e + 12 >>> 2] = 4;
      var a = lr(12);
      return O[a >>> 2] = a + 8, O[a + 4 >>> 2] = 0, v[a + 8 >>> 2] = qr(W.lookup_name(r)), O[e + 16 >>> 2] = a, e;
    }
    function In(r) {
      return jn(er(r));
    }
    function Bn(r) {
      return r;
    }
    function Un(r, e) {
      for (var t = 0, n = 0; n <= e; t += r[n++])
        ;
      return t;
    }
    var Ee = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], ge = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    function Hn(r, e) {
      for (var t = new Date(r.getTime()); e > 0; ) {
        var n = Er(t.getFullYear()), i = t.getMonth(), a = (n ? Ee : ge)[i];
        if (e > a - t.getDate())
          e -= a - t.getDate() + 1, t.setDate(1), i < 11 ? t.setMonth(i + 1) : (t.setMonth(0), t.setFullYear(t.getFullYear() + 1));
        else
          return t.setDate(t.getDate() + e), t;
      }
      return t;
    }
    function zn(r, e) {
      L.set(r, e >>> 0);
    }
    function Yn(r, e, t, n) {
      var i = v[n + 40 >>> 2], a = { tm_sec: v[n >>> 2], tm_min: v[n + 4 >>> 2], tm_hour: v[n + 8 >>> 2], tm_mday: v[n + 12 >>> 2], tm_mon: v[n + 16 >>> 2], tm_year: v[n + 20 >>> 2], tm_wday: v[n + 24 >>> 2], tm_yday: v[n + 28 >>> 2], tm_isdst: v[n + 32 >>> 2], tm_gmtoff: v[n + 36 >>> 2], tm_zone: i ? er(i) : "" }, s = er(t), u = { "%c": "%a %b %d %H:%M:%S %Y", "%D": "%m/%d/%y", "%F": "%Y-%m-%d", "%h": "%b", "%r": "%I:%M:%S %p", "%R": "%H:%M", "%T": "%H:%M:%S", "%x": "%m/%d/%y", "%X": "%H:%M:%S", "%Ec": "%c", "%EC": "%C", "%Ex": "%m/%d/%y", "%EX": "%H:%M:%S", "%Ey": "%y", "%EY": "%Y", "%Od": "%d", "%Oe": "%e", "%OH": "%H", "%OI": "%I", "%Om": "%m", "%OM": "%M", "%OS": "%S", "%Ou": "%u", "%OU": "%U", "%OV": "%V", "%Ow": "%w", "%OW": "%W", "%Oy": "%y" };
      for (var f in u)
        s = s.replace(new RegExp(f, "g"), u[f]);
      var l = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], d = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      function m(h, b, B) {
        for (var C = typeof h == "number" ? h.toString() : h || ""; C.length < b; )
          C = B[0] + C;
        return C;
      }
      function _(h, b) {
        return m(h, b, "0");
      }
      function p(h, b) {
        function B(z) {
          return z < 0 ? -1 : z > 0 ? 1 : 0;
        }
        var C;
        return (C = B(h.getFullYear() - b.getFullYear())) === 0 && (C = B(h.getMonth() - b.getMonth())) === 0 && (C = B(h.getDate() - b.getDate())), C;
      }
      function g(h) {
        switch (h.getDay()) {
          case 0:
            return new Date(h.getFullYear() - 1, 11, 29);
          case 1:
            return h;
          case 2:
            return new Date(h.getFullYear(), 0, 3);
          case 3:
            return new Date(h.getFullYear(), 0, 2);
          case 4:
            return new Date(h.getFullYear(), 0, 1);
          case 5:
            return new Date(h.getFullYear() - 1, 11, 31);
          case 6:
            return new Date(h.getFullYear() - 1, 11, 30);
        }
      }
      function N(h) {
        var b = Hn(new Date(h.tm_year + 1900, 0, 1), h.tm_yday), B = new Date(b.getFullYear(), 0, 4), C = new Date(b.getFullYear() + 1, 0, 4), z = g(B), I = g(C);
        return p(z, b) <= 0 ? p(I, b) <= 0 ? b.getFullYear() + 1 : b.getFullYear() : b.getFullYear() - 1;
      }
      var T = { "%a": function(h) {
        return l[h.tm_wday].substring(0, 3);
      }, "%A": function(h) {
        return l[h.tm_wday];
      }, "%b": function(h) {
        return d[h.tm_mon].substring(0, 3);
      }, "%B": function(h) {
        return d[h.tm_mon];
      }, "%C": function(h) {
        var b = h.tm_year + 1900;
        return _(b / 100 | 0, 2);
      }, "%d": function(h) {
        return _(h.tm_mday, 2);
      }, "%e": function(h) {
        return m(h.tm_mday, 2, " ");
      }, "%g": function(h) {
        return N(h).toString().substring(2);
      }, "%G": function(h) {
        return N(h);
      }, "%H": function(h) {
        return _(h.tm_hour, 2);
      }, "%I": function(h) {
        var b = h.tm_hour;
        return b == 0 ? b = 12 : b > 12 && (b -= 12), _(b, 2);
      }, "%j": function(h) {
        return _(h.tm_mday + Un(Er(h.tm_year + 1900) ? Ee : ge, h.tm_mon - 1), 3);
      }, "%m": function(h) {
        return _(h.tm_mon + 1, 2);
      }, "%M": function(h) {
        return _(h.tm_min, 2);
      }, "%n": function() {
        return `
`;
      }, "%p": function(h) {
        return h.tm_hour >= 0 && h.tm_hour < 12 ? "AM" : "PM";
      }, "%S": function(h) {
        return _(h.tm_sec, 2);
      }, "%t": function() {
        return "	";
      }, "%u": function(h) {
        return h.tm_wday || 7;
      }, "%U": function(h) {
        var b = h.tm_yday + 7 - h.tm_wday;
        return _(Math.floor(b / 7), 2);
      }, "%V": function(h) {
        var b = Math.floor((h.tm_yday + 7 - (h.tm_wday + 6) % 7) / 7);
        if ((h.tm_wday + 371 - h.tm_yday - 2) % 7 <= 2 && b++, b) {
          if (b == 53) {
            var C = (h.tm_wday + 371 - h.tm_yday) % 7;
            C != 4 && (C != 3 || !Er(h.tm_year)) && (b = 1);
          }
        } else {
          b = 52;
          var B = (h.tm_wday + 7 - h.tm_yday - 1) % 7;
          (B == 4 || B == 5 && Er(h.tm_year % 400 - 1)) && b++;
        }
        return _(b, 2);
      }, "%w": function(h) {
        return h.tm_wday;
      }, "%W": function(h) {
        var b = h.tm_yday + 7 - (h.tm_wday + 6) % 7;
        return _(Math.floor(b / 7), 2);
      }, "%y": function(h) {
        return (h.tm_year + 1900).toString().substring(2);
      }, "%Y": function(h) {
        return h.tm_year + 1900;
      }, "%z": function(h) {
        var b = h.tm_gmtoff, B = b >= 0;
        return b = Math.abs(b) / 60, b = b / 60 * 100 + b % 60, (B ? "+" : "-") + ("0000" + b).slice(-4);
      }, "%Z": function(h) {
        return h.tm_zone;
      }, "%%": function() {
        return "%";
      } };
      s = s.replace(/%%/g, "\0\0");
      for (var f in T)
        s.includes(f) && (s = s.replace(new RegExp(f, "g"), T[f](a)));
      s = s.replace(/\0\0/g, "%");
      var R = Pr(s, !1);
      return R.length > e ? 0 : (zn(R, r), R.length - 1);
    }
    function Wn(r, e, t, n, i) {
      return Yn(r, e, t, n);
    }
    function Gn(r) {
      return r ? (le(52), -1) : 0;
    }
    function Xn(r) {
      var e = fr(r) + 1, t = Kr(e);
      return _r(r, L, t, e), t;
    }
    var ke = {}, be = function(r, e, t, n) {
      r || (r = this), this.parent = r, this.mount = r.mount, this.mounted = null, this.id = o.nextInode++, this.name = e, this.mode = t, this.node_ops = {}, this.stream_ops = {}, this.rdev = n;
    }, Ir = 365, Br = 146;
    Object.defineProperties(be.prototype, { read: { get: function() {
      return (this.mode & Ir) === Ir;
    }, set: function(r) {
      r ? this.mode |= Ir : this.mode &= ~Ir;
    } }, write: { get: function() {
      return (this.mode & Br) === Br;
    }, set: function(r) {
      r ? this.mode |= Br : this.mode &= ~Br;
    } }, isFolder: { get: function() {
      return o.isDir(this.mode);
    } }, isDevice: { get: function() {
      return o.isChrdev(this.mode);
    } } }), o.FSNode = be, o.staticInit(), ke = { EPERM: 63, ENOENT: 44, ESRCH: 71, EINTR: 27, EIO: 29, ENXIO: 60, E2BIG: 1, ENOEXEC: 45, EBADF: 8, ECHILD: 12, EAGAIN: 6, EWOULDBLOCK: 6, ENOMEM: 48, EACCES: 2, EFAULT: 21, ENOTBLK: 105, EBUSY: 10, EEXIST: 20, EXDEV: 75, ENODEV: 43, ENOTDIR: 54, EISDIR: 31, EINVAL: 28, ENFILE: 41, EMFILE: 33, ENOTTY: 59, ETXTBSY: 74, EFBIG: 22, ENOSPC: 51, ESPIPE: 70, EROFS: 69, EMLINK: 34, EPIPE: 64, EDOM: 18, ERANGE: 68, ENOMSG: 49, EIDRM: 24, ECHRNG: 106, EL2NSYNC: 156, EL3HLT: 107, EL3RST: 108, ELNRNG: 109, EUNATCH: 110, ENOCSI: 111, EL2HLT: 112, EDEADLK: 16, ENOLCK: 46, EBADE: 113, EBADR: 114, EXFULL: 115, ENOANO: 104, EBADRQC: 103, EBADSLT: 102, EDEADLOCK: 16, EBFONT: 101, ENOSTR: 100, ENODATA: 116, ETIME: 117, ENOSR: 118, ENONET: 119, ENOPKG: 120, EREMOTE: 121, ENOLINK: 47, EADV: 122, ESRMNT: 123, ECOMM: 124, EPROTO: 65, EMULTIHOP: 36, EDOTDOT: 125, EBADMSG: 9, ENOTUNIQ: 126, EBADFD: 127, EREMCHG: 128, ELIBACC: 129, ELIBBAD: 130, ELIBSCN: 131, ELIBMAX: 132, ELIBEXEC: 133, ENOSYS: 52, ENOTEMPTY: 55, ENAMETOOLONG: 37, ELOOP: 32, EOPNOTSUPP: 138, EPFNOSUPPORT: 139, ECONNRESET: 15, ENOBUFS: 42, EAFNOSUPPORT: 5, EPROTOTYPE: 67, ENOTSOCK: 57, ENOPROTOOPT: 50, ESHUTDOWN: 140, ECONNREFUSED: 14, EADDRINUSE: 3, ECONNABORTED: 13, ENETUNREACH: 40, ENETDOWN: 38, ETIMEDOUT: 73, EHOSTDOWN: 142, EHOSTUNREACH: 23, EINPROGRESS: 26, EALREADY: 7, EDESTADDRREQ: 17, EMSGSIZE: 35, EPROTONOSUPPORT: 66, ESOCKTNOSUPPORT: 137, EADDRNOTAVAIL: 4, ENETRESET: 39, EISCONN: 30, ENOTCONN: 53, ETOOMANYREFS: 141, EUSERS: 136, EDQUOT: 19, ESTALE: 72, ENOTSUP: 138, ENOMEDIUM: 148, EILSEQ: 25, EOVERFLOW: 61, ECANCELED: 11, ENOTRECOVERABLE: 56, EOWNERDEAD: 62, ESTRPIPE: 135 };
    var qn = { R: lt, za: dt, o: vt, qb: ht, rb: _t, w: mt, a: wt, j: yt, p: Et, D: gt, ga: kt, v: bt, L: St, e: pt, Oa: Nt, ka: Mt, pb: Rt, Pa: Ct, Ka: Pt, Q: Lt, ja: xt, xb: It, Ga: Bt, ya: Ut, ob: Ht, Qa: zt, Ha: Yt, Fa: Wt, Ia: Gt, $: Xt, Aa: qt, zb: Vt, nb: $t, yb: Zt, wa: Qt, mb: Jt, lb: rn, Ja: en, wb: tn, xa: nn, Ma: an, sb: sn, Da: ln, Ea: dn, Ba: vn, Ca: hn, ub: wn, H: yn, ia: En, vb: gn, La: pe, Na: kn, tb: Sn, Ra: On, Sa: Nn, P: pn, T: Mn, ha: Fn, la: Rn, bb: Pn, aa: xn, Ta: In, B: Mi, U: Fi, ua: $i, va: Ki, z: ai, Za: Ti, c: Zn, q: fi, G: Bi, ea: Ri, Ya: Ii, ba: Yi, O: Wi, f: Kn, pa: Ci, h: Qn, k: ei, S: Pi, r: oi, t: si, u: ui, F: ki, M: Jn, ra: bi, W: Ei, I: wi, V: gi, sa: mi, $a: uo, kb: Qi, db: oo, ab: so, ib: ro, jb: Ji, fb: no, gb: to, l: ni, da: xi, b: ri, A: ci, na: ji, oa: Li, d: $n, ca: Hi, Va: Xi, X: Ui, ta: di, g: Vn, Ua: Vi, Z: Gi, i: ti, K: Di, n: ii, ma: qi, m: vi, _a: Oi, x: _i, y: li, Y: Ai, J: hi, E: yi, C: pi, Wa: zi, _: Zi, qa: Ni, fa: Si, eb: io, hb: eo, cb: ao, s: Bn, N: Wn, Xa: Gn };
    ct();
    var Se = function() {
      return (Se = c.asm.Cb).apply(null, arguments);
    }, De = c._main = function() {
      return (De = c._main = c.asm.Eb).apply(null, arguments);
    }, Ae = function() {
      return (Ae = c.asm.Fb).apply(null, arguments);
    }, lr = function() {
      return (lr = c.asm.Gb).apply(null, arguments);
    }, kr = function() {
      return (kr = c.asm.Hb).apply(null, arguments);
    }, Oe = c._fflush = function() {
      return (Oe = c._fflush = c.asm.Ib).apply(null, arguments);
    }, Ur = function() {
      return (Ur = c.asm.Jb).apply(null, arguments);
    }, Ne = function() {
      return (Ne = c.asm.Kb).apply(null, arguments);
    }, Me = function() {
      return (Me = c.asm.Lb).apply(null, arguments);
    }, Vr = function() {
      return (Vr = c.asm.Mb).apply(null, arguments);
    }, w = function() {
      return (w = c.asm.Nb).apply(null, arguments);
    }, y = function() {
      return (y = c.asm.Ob).apply(null, arguments);
    }, E = function() {
      return (E = c.asm.Pb).apply(null, arguments);
    }, Kr = function() {
      return (Kr = c.asm.Qb).apply(null, arguments);
    }, Fe = function() {
      return (Fe = c.asm.Rb).apply(null, arguments);
    }, Te = function() {
      return (Te = c.asm.Sb).apply(null, arguments);
    }, Re = c.dynCall_iij = function() {
      return (Re = c.dynCall_iij = c.asm.Tb).apply(null, arguments);
    }, Ce = c.dynCall_viijii = function() {
      return (Ce = c.dynCall_viijii = c.asm.Ub).apply(null, arguments);
    }, Pe = c.dynCall_jii = function() {
      return (Pe = c.dynCall_jii = c.asm.Vb).apply(null, arguments);
    }, Le = c.dynCall_ji = function() {
      return (Le = c.dynCall_ji = c.asm.Wb).apply(null, arguments);
    }, xe = c.dynCall_vij = function() {
      return (xe = c.dynCall_vij = c.asm.Xb).apply(null, arguments);
    }, je = c.dynCall_jiiii = function() {
      return (je = c.dynCall_jiiii = c.asm.Yb).apply(null, arguments);
    }, Ie = c.dynCall_jiii = function() {
      return (Ie = c.dynCall_jiii = c.asm.Zb).apply(null, arguments);
    }, Be = c.dynCall_iiji = function() {
      return (Be = c.dynCall_iiji = c.asm._b).apply(null, arguments);
    }, Ue = c.dynCall_viji = function() {
      return (Ue = c.dynCall_viji = c.asm.$b).apply(null, arguments);
    }, He = c.dynCall_j = function() {
      return (He = c.dynCall_j = c.asm.ac).apply(null, arguments);
    }, ze = c.dynCall_iiiiij = function() {
      return (ze = c.dynCall_iiiiij = c.asm.bc).apply(null, arguments);
    };
    function Vn(r, e, t, n) {
      var i = y();
      try {
        k(r)(e, t, n);
      } catch (a) {
        if (E(i), a !== a + 0) throw a;
        w(1, 0);
      }
    }
    function Kn(r, e, t) {
      var n = y();
      try {
        return k(r)(e, t);
      } catch (i) {
        if (E(n), i !== i + 0) throw i;
        w(1, 0);
      }
    }
    function $n(r, e, t) {
      var n = y();
      try {
        k(r)(e, t);
      } catch (i) {
        if (E(n), i !== i + 0) throw i;
        w(1, 0);
      }
    }
    function Zn(r, e) {
      var t = y();
      try {
        return k(r)(e);
      } catch (n) {
        if (E(t), n !== n + 0) throw n;
        w(1, 0);
      }
    }
    function Qn(r, e, t, n) {
      var i = y();
      try {
        return k(r)(e, t, n);
      } catch (a) {
        if (E(i), a !== a + 0) throw a;
        w(1, 0);
      }
    }
    function Jn(r, e, t, n, i, a, s, u, f, l) {
      var d = y();
      try {
        return k(r)(e, t, n, i, a, s, u, f, l);
      } catch (m) {
        if (E(d), m !== m + 0) throw m;
        w(1, 0);
      }
    }
    function ri(r, e) {
      var t = y();
      try {
        k(r)(e);
      } catch (n) {
        if (E(t), n !== n + 0) throw n;
        w(1, 0);
      }
    }
    function ei(r, e, t, n, i) {
      var a = y();
      try {
        return k(r)(e, t, n, i);
      } catch (s) {
        if (E(a), s !== s + 0) throw s;
        w(1, 0);
      }
    }
    function ti(r, e, t, n, i) {
      var a = y();
      try {
        k(r)(e, t, n, i);
      } catch (s) {
        if (E(a), s !== s + 0) throw s;
        w(1, 0);
      }
    }
    function ni(r) {
      var e = y();
      try {
        k(r)();
      } catch (t) {
        if (E(e), t !== t + 0) throw t;
        w(1, 0);
      }
    }
    function ii(r, e, t, n, i, a) {
      var s = y();
      try {
        k(r)(e, t, n, i, a);
      } catch (u) {
        if (E(s), u !== u + 0) throw u;
        w(1, 0);
      }
    }
    function oi(r, e, t, n, i, a) {
      var s = y();
      try {
        return k(r)(e, t, n, i, a);
      } catch (u) {
        if (E(s), u !== u + 0) throw u;
        w(1, 0);
      }
    }
    function ai(r) {
      var e = y();
      try {
        return k(r)();
      } catch (t) {
        if (E(e), t !== t + 0) throw t;
        w(1, 0);
      }
    }
    function si(r, e, t, n, i, a, s) {
      var u = y();
      try {
        return k(r)(e, t, n, i, a, s);
      } catch (f) {
        if (E(u), f !== f + 0) throw f;
        w(1, 0);
      }
    }
    function ui(r, e, t, n, i, a, s, u) {
      var f = y();
      try {
        return k(r)(e, t, n, i, a, s, u);
      } catch (l) {
        if (E(f), l !== l + 0) throw l;
        w(1, 0);
      }
    }
    function fi(r, e, t) {
      var n = y();
      try {
        return k(r)(e, t);
      } catch (i) {
        if (E(n), i !== i + 0) throw i;
        w(1, 0);
      }
    }
    function ci(r, e, t) {
      var n = y();
      try {
        k(r)(e, t);
      } catch (i) {
        if (E(n), i !== i + 0) throw i;
        w(1, 0);
      }
    }
    function li(r, e, t, n, i, a, s, u, f) {
      var l = y();
      try {
        k(r)(e, t, n, i, a, s, u, f);
      } catch (d) {
        if (E(l), d !== d + 0) throw d;
        w(1, 0);
      }
    }
    function di(r, e, t, n, i) {
      var a = y();
      try {
        k(r)(e, t, n, i);
      } catch (s) {
        if (E(a), s !== s + 0) throw s;
        w(1, 0);
      }
    }
    function vi(r, e, t, n, i, a, s) {
      var u = y();
      try {
        k(r)(e, t, n, i, a, s);
      } catch (f) {
        if (E(u), f !== f + 0) throw f;
        w(1, 0);
      }
    }
    function hi(r, e, t, n, i, a, s, u, f, l, d) {
      var m = y();
      try {
        k(r)(e, t, n, i, a, s, u, f, l, d);
      } catch (_) {
        if (E(m), _ !== _ + 0) throw _;
        w(1, 0);
      }
    }
    function _i(r, e, t, n, i, a, s, u) {
      var f = y();
      try {
        k(r)(e, t, n, i, a, s, u);
      } catch (l) {
        if (E(f), l !== l + 0) throw l;
        w(1, 0);
      }
    }
    function mi(r, e, t, n, i, a, s, u, f, l, d, m, _, p, g, N) {
      var T = y();
      try {
        return k(r)(e, t, n, i, a, s, u, f, l, d, m, _, p, g, N);
      } catch (R) {
        if (E(T), R !== R + 0) throw R;
        w(1, 0);
      }
    }
    function pi(r, e, t, n, i, a, s, u, f, l, d, m, _, p) {
      var g = y();
      try {
        k(r)(e, t, n, i, a, s, u, f, l, d, m, _, p);
      } catch (N) {
        if (E(g), N !== N + 0) throw N;
        w(1, 0);
      }
    }
    function wi(r, e, t, n, i, a, s, u, f, l, d, m, _) {
      var p = y();
      try {
        return k(r)(e, t, n, i, a, s, u, f, l, d, m, _);
      } catch (g) {
        if (E(p), g !== g + 0) throw g;
        w(1, 0);
      }
    }
    function yi(r, e, t, n, i, a, s, u, f, l, d, m, _) {
      var p = y();
      try {
        k(r)(e, t, n, i, a, s, u, f, l, d, m, _);
      } catch (g) {
        if (E(p), g !== g + 0) throw g;
        w(1, 0);
      }
    }
    function Ei(r, e, t, n, i, a, s, u, f, l, d, m) {
      var _ = y();
      try {
        return k(r)(e, t, n, i, a, s, u, f, l, d, m);
      } catch (p) {
        if (E(_), p !== p + 0) throw p;
        w(1, 0);
      }
    }
    function gi(r, e, t, n, i, a, s, u, f, l, d, m, _, p, g) {
      var N = y();
      try {
        return k(r)(e, t, n, i, a, s, u, f, l, d, m, _, p, g);
      } catch (T) {
        if (E(N), T !== T + 0) throw T;
        w(1, 0);
      }
    }
    function ki(r, e, t, n, i, a, s, u, f) {
      var l = y();
      try {
        return k(r)(e, t, n, i, a, s, u, f);
      } catch (d) {
        if (E(l), d !== d + 0) throw d;
        w(1, 0);
      }
    }
    function bi(r, e, t, n, i, a, s, u, f, l, d) {
      var m = y();
      try {
        return k(r)(e, t, n, i, a, s, u, f, l, d);
      } catch (_) {
        if (E(m), _ !== _ + 0) throw _;
        w(1, 0);
      }
    }
    function Si(r, e, t, n, i, a, s, u, f, l, d, m, _, p, g, N, T, R) {
      var h = y();
      try {
        k(r)(e, t, n, i, a, s, u, f, l, d, m, _, p, g, N, T, R);
      } catch (b) {
        if (E(h), b !== b + 0) throw b;
        w(1, 0);
      }
    }
    function Di(r, e, t, n, i, a, s, u, f, l, d) {
      var m = y();
      try {
        k(r)(e, t, n, i, a, s, u, f, l, d);
      } catch (_) {
        if (E(m), _ !== _ + 0) throw _;
        w(1, 0);
      }
    }
    function Ai(r, e, t, n, i, a, s, u, f, l) {
      var d = y();
      try {
        k(r)(e, t, n, i, a, s, u, f, l);
      } catch (m) {
        if (E(d), m !== m + 0) throw m;
        w(1, 0);
      }
    }
    function Oi(r, e, t, n, i, a, s, u) {
      var f = y();
      try {
        k(r)(e, t, n, i, a, s, u);
      } catch (l) {
        if (E(f), l !== l + 0) throw l;
        w(1, 0);
      }
    }
    function Ni(r, e, t, n, i, a, s, u, f, l, d, m, _, p, g, N, T) {
      var R = y();
      try {
        k(r)(e, t, n, i, a, s, u, f, l, d, m, _, p, g, N, T);
      } catch (h) {
        if (E(R), h !== h + 0) throw h;
        w(1, 0);
      }
    }
    function Mi(r, e) {
      var t = y();
      try {
        return k(r)(e);
      } catch (n) {
        if (E(t), n !== n + 0) throw n;
        w(1, 0);
      }
    }
    function Fi(r, e, t, n) {
      var i = y();
      try {
        return k(r)(e, t, n);
      } catch (a) {
        if (E(i), a !== a + 0) throw a;
        w(1, 0);
      }
    }
    function Ti(r, e, t, n, i, a, s, u, f, l) {
      var d = y();
      try {
        return k(r)(e, t, n, i, a, s, u, f, l);
      } catch (m) {
        if (E(d), m !== m + 0) throw m;
        w(1, 0);
      }
    }
    function Ri(r, e, t, n, i, a, s, u, f, l) {
      var d = y();
      try {
        return k(r)(e, t, n, i, a, s, u, f, l);
      } catch (m) {
        if (E(d), m !== m + 0) throw m;
        w(1, 0);
      }
    }
    function Ci(r, e, t, n, i, a) {
      var s = y();
      try {
        return k(r)(e, t, n, i, a);
      } catch (u) {
        if (E(s), u !== u + 0) throw u;
        w(1, 0);
      }
    }
    function Pi(r, e, t, n, i, a) {
      var s = y();
      try {
        return k(r)(e, t, n, i, a);
      } catch (u) {
        if (E(s), u !== u + 0) throw u;
        w(1, 0);
      }
    }
    function Li(r, e, t, n) {
      var i = y();
      try {
        k(r)(e, t, n);
      } catch (a) {
        if (E(i), a !== a + 0) throw a;
        w(1, 0);
      }
    }
    function xi(r, e) {
      var t = y();
      try {
        k(r)(e);
      } catch (n) {
        if (E(t), n !== n + 0) throw n;
        w(1, 0);
      }
    }
    function ji(r, e, t, n, i) {
      var a = y();
      try {
        k(r)(e, t, n, i);
      } catch (s) {
        if (E(a), s !== s + 0) throw s;
        w(1, 0);
      }
    }
    function Ii(r, e, t, n, i, a) {
      var s = y();
      try {
        return k(r)(e, t, n, i, a);
      } catch (u) {
        if (E(s), u !== u + 0) throw u;
        w(1, 0);
      }
    }
    function Bi(r, e, t, n) {
      var i = y();
      try {
        return k(r)(e, t, n);
      } catch (a) {
        if (E(i), a !== a + 0) throw a;
        w(1, 0);
      }
    }
    function Ui(r, e, t, n, i, a, s, u) {
      var f = y();
      try {
        k(r)(e, t, n, i, a, s, u);
      } catch (l) {
        if (E(f), l !== l + 0) throw l;
        w(1, 0);
      }
    }
    function Hi(r, e, t, n) {
      var i = y();
      try {
        k(r)(e, t, n);
      } catch (a) {
        if (E(i), a !== a + 0) throw a;
        w(1, 0);
      }
    }
    function zi(r, e, t, n, i, a, s, u, f, l, d, m, _, p, g) {
      var N = y();
      try {
        k(r)(e, t, n, i, a, s, u, f, l, d, m, _, p, g);
      } catch (T) {
        if (E(N), T !== T + 0) throw T;
        w(1, 0);
      }
    }
    function Yi(r, e, t, n, i) {
      var a = y();
      try {
        return k(r)(e, t, n, i);
      } catch (s) {
        if (E(a), s !== s + 0) throw s;
        w(1, 0);
      }
    }
    function Wi(r, e, t) {
      var n = y();
      try {
        return k(r)(e, t);
      } catch (i) {
        if (E(n), i !== i + 0) throw i;
        w(1, 0);
      }
    }
    function Gi(r, e, t, n, i, a) {
      var s = y();
      try {
        k(r)(e, t, n, i, a);
      } catch (u) {
        if (E(s), u !== u + 0) throw u;
        w(1, 0);
      }
    }
    function Xi(r, e, t, n, i, a, s, u, f, l, d, m, _) {
      var p = y();
      try {
        k(r)(e, t, n, i, a, s, u, f, l, d, m, _);
      } catch (g) {
        if (E(p), g !== g + 0) throw g;
        w(1, 0);
      }
    }
    function qi(r, e, t, n, i, a, s, u) {
      var f = y();
      try {
        k(r)(e, t, n, i, a, s, u);
      } catch (l) {
        if (E(f), l !== l + 0) throw l;
        w(1, 0);
      }
    }
    function Vi(r, e, t, n, i, a) {
      var s = y();
      try {
        k(r)(e, t, n, i, a);
      } catch (u) {
        if (E(s), u !== u + 0) throw u;
        w(1, 0);
      }
    }
    function Ki(r, e, t, n) {
      var i = y();
      try {
        return k(r)(e, t, n);
      } catch (a) {
        if (E(i), a !== a + 0) throw a;
        w(1, 0);
      }
    }
    function $i(r, e, t, n) {
      var i = y();
      try {
        return k(r)(e, t, n);
      } catch (a) {
        if (E(i), a !== a + 0) throw a;
        w(1, 0);
      }
    }
    function Zi(r, e, t, n, i, a, s, u, f, l, d, m, _, p, g, N) {
      var T = y();
      try {
        k(r)(e, t, n, i, a, s, u, f, l, d, m, _, p, g, N);
      } catch (R) {
        if (E(T), R !== R + 0) throw R;
        w(1, 0);
      }
    }
    function Qi(r, e, t, n) {
      var i = y();
      try {
        return Re(r, e, t, n);
      } catch (a) {
        if (E(i), a !== a + 0) throw a;
        w(1, 0);
      }
    }
    function Ji(r, e, t) {
      var n = y();
      try {
        return Pe(r, e, t);
      } catch (i) {
        if (E(n), i !== i + 0) throw i;
        w(1, 0);
      }
    }
    function ro(r, e) {
      var t = y();
      try {
        return Le(r, e);
      } catch (n) {
        if (E(t), n !== n + 0) throw n;
        w(1, 0);
      }
    }
    function eo(r, e, t, n) {
      var i = y();
      try {
        xe(r, e, t, n);
      } catch (a) {
        if (E(i), a !== a + 0) throw a;
        w(1, 0);
      }
    }
    function to(r, e, t, n, i) {
      var a = y();
      try {
        return je(r, e, t, n, i);
      } catch (s) {
        if (E(a), s !== s + 0) throw s;
        w(1, 0);
      }
    }
    function no(r, e, t, n) {
      var i = y();
      try {
        return Ie(r, e, t, n);
      } catch (a) {
        if (E(i), a !== a + 0) throw a;
        w(1, 0);
      }
    }
    function io(r, e, t, n, i, a, s) {
      var u = y();
      try {
        Ce(r, e, t, n, i, a, s);
      } catch (f) {
        if (E(u), f !== f + 0) throw f;
        w(1, 0);
      }
    }
    function oo(r, e, t, n, i) {
      var a = y();
      try {
        return Be(r, e, t, n, i);
      } catch (s) {
        if (E(a), s !== s + 0) throw s;
        w(1, 0);
      }
    }
    function ao(r, e, t, n, i) {
      var a = y();
      try {
        Ue(r, e, t, n, i);
      } catch (s) {
        if (E(a), s !== s + 0) throw s;
        w(1, 0);
      }
    }
    function so(r) {
      var e = y();
      try {
        return He(r);
      } catch (t) {
        if (E(e), t !== t + 0) throw t;
        w(1, 0);
      }
    }
    function uo(r, e, t, n, i, a, s) {
      var u = y();
      try {
        return ze(r, e, t, n, i, a, s);
      } catch (f) {
        if (E(u), f !== f + 0) throw f;
        w(1, 0);
      }
    }
    c.callMain = Ye, c.ENV = jr, c.ERRNO_CODES = ke, c.PATH = M, c.FS = o;
    var Hr;
    pr = function r() {
      Hr || We(), Hr || (pr = r);
    };
    function Ye(r = []) {
      var e = De;
      r.unshift(sr);
      var t = r.length, n = Kr((t + 1) * 4), i = n >> 2;
      r.forEach((s) => {
        v[i++ >>> 0] = Xn(s);
      }), v[i >>> 0] = 0;
      try {
        wr += 1;
        var a = e(t, n);
        return me(a, !0), a;
      } catch (s) {
        return _n(s);
      } finally {
        wr -= 1;
      }
    }
    function We(r = j) {
      if (tr > 0 || (Ze(), tr > 0))
        return;
      function e() {
        Hr || (Hr = !0, c.calledRun = !0, !hr && (Qe(), Je(), dr(c), c.onRuntimeInitialized && c.onRuntimeInitialized(), Ge && Ye(r), et()));
      }
      c.setStatus ? (c.setStatus("Running..."), setTimeout(function() {
        setTimeout(function() {
          c.setStatus("");
        }, 1), e();
      }, 1)) : e();
    }
    if (c.preInit)
      for (typeof c.preInit == "function" && (c.preInit = [c.preInit]); c.preInit.length > 0; )
        c.preInit.pop()();
    var Ge = !0;
    return c.noInitialRun && (Ge = !1), We(), rr.ready;
  });
})();
let Xe = !1;
async function _o() {
  if (Xe) return;
  const K = await fetch("/browserfs.min.js").then((rr) => rr.text());
  (0, eval)(K), Xe = !0;
}
function zr(K) {
  self.postMessage(K);
}
self.addEventListener("message", async (K) => {
  await _o();
  const {
    mountArchives: rr,
    inputs: c,
    args: dr,
    outputPaths: ar
  } = K.data, $ = [];
  let j;
  const sr = performance.now();
  try {
    if (j = await ho({
      noInitialRun: !0,
      print: (F) => {
        console.debug("stdout: " + F), zr({ stdout: F }), $.push({ stdout: F });
      },
      printErr: (F) => {
        console.debug("stderr: " + F), zr({ stderr: F }), $.push({ stderr: F });
      }
    }), rr) {
      await fo({ prefix: "", allowPersistence: !1 }), j.FS.mkdir("/libraries");
      const F = new BrowserFS.EmscriptenFS(
        j.FS,
        j.PATH ?? {
          join2: (U, Sr) => `${U}/${Sr}`,
          join: (...U) => U.join("/")
        },
        j.ERRNO_CODES ?? {}
      );
      j.FS.mount(F, { root: "/" }, "/libraries"), await co(lo, j.FS, "/libraries", "/");
    }
    if (j.FS.chdir("/"), j.FS.mkdir("/locale"), c)
      for (const F of c)
        try {
          console.log(`Writing ${F.path}`), F.content == null && F.path != null && F.url == null ? j.FS.isFile(F.path) || console.error(`File ${F.path} does not exist!`) : j.FS.writeFile(F.path, await vo(j.FS, F));
        } catch (U) {
          throw console.trace(U), new Error(`Error while trying to write ${F.path}: ${U}`);
        }
    console.log("Invoking OpenSCAD with: ", dr);
    let G;
    try {
      G = j.callMain(dr);
    } catch (F) {
      throw typeof F == "number" && j.formatException && (F = j.formatException(F)), new Error(`OpenSCAD invocation failed: ${F}`);
    }
    const X = performance.now() - sr, Z = [];
    for (const F of ar ?? [])
      try {
        const U = j.FS.readFile(F);
        Z.push([F, U]);
      } catch (U) {
        throw console.trace(U), new Error(`Failed to read output file ${F}: ${U}`);
      }
    const H = {
      outputs: Z,
      mergedOutputs: $,
      exitCode: G,
      elapsedMillis: X
    };
    console.debug(H), zr({ result: H });
  } catch (G) {
    const X = performance.now() - sr;
    console.trace(G);
    const Z = `${G}`;
    $.push({ error: Z }), zr({
      result: {
        exitCode: void 0,
        error: Z,
        mergedOutputs: $,
        elapsedMillis: X
      }
    });
  }
});
//# sourceMappingURL=openscad-worker.js.map
