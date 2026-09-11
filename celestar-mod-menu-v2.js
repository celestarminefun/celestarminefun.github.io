/* 
  * Celestar Mod Menu v2 created by thetalkingcat (@thetalkingcat8089)
  * Website: https://celestar.pages.dev
  * Youtube: https://youtube.com/@thetalkingcat8089
  * Discord: https://dsc.gg/celestar
  * GitHub: https://github.com/celestarminefun
  * By a MineFunner, for a MineFunner.
*/

/*
  * Copyright © 2026 Celestar / thetalkingcat
  * ALL RIGHTS RESERVED

  * This source code is proprietary. Copying, reusing, modifying, redistributing with or without AI without explicit
  * permission from the creator (thetalkingcat) is strictly prohibited.

  * Permission is REQUIRED for any reuse.
*/

(function () {
  "use strict";

  const Ticker = (() => {
    let rafId = 0;
    let last = 0;
    const subs = new Set();
    let nextId = 1;

    function loop(t) {
      rafId = requestAnimationFrame(loop);
      const now = t || performance.now();
      for (const s of subs) {
        if (now - s.last >= s.interval) {
          s.last = now;
          try {
            s.fn(now);
          } catch (e) {}
        }
      }
      last = now;
    }

    return {
      start() {
        if (!rafId) rafId = requestAnimationFrame(loop);
      },
      add(fn, interval) {
        const sub = { id: nextId++, fn, interval: interval || 0, last: 0 };
        subs.add(sub);
        if (!rafId) rafId = requestAnimationFrame(loop);
        return sub;
      },
      remove(sub) {
        if (sub) subs.delete(sub);
      },
    };
  })();

  // -- DEFAULTS
  const DEFAULTS = {
    "zoom.enabled": false,
    "zoom.level": 0.35,
    "zoom.keybind": "KeyV",
    "zoom.smoothness": false,
    "zoom.scrollable": false,
    "crosshair.enabled": false,
    "crosshair.url": "",
    "crosshair.size": 32,
    "crosshair.opacity": 1.0,
    "keystrokes.enabled": true,
    "keystrokes.showLeftCPS": false,
    "keystrokes.showRightCPS": false,
    "keystrokes.onlyInGame": false,
    "keystrokes.rainbow": false,
    "keystrokes.pressAnimation": false,
    "keystrokes.shadow": false,
    "keystrokes.border": false,
    "keystrokes.borderWidth": 1,
    "keystrokes.borderRadius": 4,
    "keystrokes.scale": 1,
    "keystrokes.keyColor": "#00000088",
    "keystrokes.pressedColor": "#ffffff",
    "keystrokes.textColor": "#ffffff",
    "keystrokes.pressedTextColor": "#000000",
    "keystrokes.borderColor": "#ffffff",
    "keystrokes.x": 20,
    "keystrokes.y": 200,
    "textures.enabled": false,
    "textures.pack": {},
    "directionhud.enabled": false,
    "directionhud.size": 1.0,
    "autogg.enabled": false,
    "hidearm.enabled": false,
    "fps.enabled": false,
    "fps.x": 20,
    "fps.y": 20,
    "fps.scale": 1.0,
    "cps.enabled": false,
    "cps.x": 20,
    "cps.y": 50,
    "cps.scale": 1.0,
    "fps.backgroundColor": "#00000088",
    "fps.border": true,
    "fps.borderColor": "#ffffff",
    "fps.borderWidth": 1,
    "fps.borderRadius": 6,
    "fps.shadow": true,
    "fps.labelColor": "#e6f1ff",
    "fps.highColor": "#23bd61",
    "fps.mediumColor": "#f0a500",
    "fps.lowColor": "#e05252",
    "cps.backgroundColor": "#00000088",
    "cps.border": true,
    "cps.borderColor": "#ffffff",
    "cps.borderWidth": 1,
    "cps.borderRadius": 6,
    "cps.shadow": true,
    "cps.labelColor": "#e6f1ff",
    "cps.numberColor": "#ffffff",
    "cps.showBothMouses": false,
    "translator.enabled": false,
    "translator.language": "en",
    "kdrindicator.enabled": false,
    "damagevignette.enabled": false,
    "damagevignette.color": "#ff0000",
    "clearscreen.enabled": true,
    "clearscreen.keybind": "KeyH",
    "armorhud.enabled": true,
    "blockoutline.enabled": false,
    "blockoutline.color": "#81e1ff",
    "nofog.enabled": false,
    "hidenametag.enabled": false,
    "hurtcam.enabled": false,
    "togglecrouch.enabled": false,
    "hideparticles.enabled": false,
    "hideparticles.blood": false,
    "hideparticles.smoke": false,
    "hideparticles.blocks": false,
    "hideparticles.effect.hit": false,
    "hideparticles.effect.arrow": false,
    "hideparticles.effect.brokenHeart": false,
    "hideparticles.effect.death": false,
    "hideparticles.effect.brokenShield": false,
    "hideparticles.effect.energy": false,
    "hideparticles.effect.flame": false,
    "hideparticles.effect.gem": false,
    "hideparticles.effect.goldCoin": false,
    "hideparticles.effect.heart": false,
    "hideparticles.effect.impactBurst": false,
    "hideparticles.effect.medCross": false,
    "hideparticles.effect.poison": false,
    "hideparticles.effect.shield": false,
    "hideparticles.effect.slashCross": false,
    "hideparticles.effect.star": false,
    "hideparticles.effect.waterBubbles": false,
    "hideparticles.effect.waterDrop": false,
    "hideparticles.effect.slowness": false,
    "hideparticles.effect.strength": false,
    "hideparticles.effect.weakness": false,
    "hideparticles.effect.jumpBoost": false,
    "hideparticles.effect.miningSpeed": false,
    "hideparticles.effect.miningFatigue": false,
    "hideparticles.effect.invisibility": false,
    "hideparticles.effect.nightVision": false,
    "hideparticles.effect.skull": false,
    "hideclouds.enabled": false,
    "bedwarsnotif.enabled": true,
    "bedwarsnotif.bedDestroy": true,
    "bedwarsnotif.teamEliminated": true,
    "armoffset.enabled": false,
    "armoffset.y": 0,
    "scoreboard.enabled": false,
    "scoreboard.x": 92,
    "scoreboard.y": 20,
    "scoreboard.backgroundColor": "#0000008c",
    "scoreboard.borderColor": "#121212",
    "chatemojis.enabled": true,
    "guiscale.enabled": true,
    "guiscale.hotbar": 100,
    "guiscale.inventory": 100,
    "actionbar.enabled": false,
    "actionbar.x": 50,
    "actionbar.y": 80,
    "actionbar.backgroundColor": "#00000080",
    "actionbar.borderColor": "#121212",
    "customui.enabled": false,
    "customui.css": "",
    "customui.name": "",
    "client.keybind": "KeyG",
    "client.theme": "dark",
    "client.compact": false,
  };

  // -- CONFIG
  const _cfg = Object.create(null);

  function cfg(key) {
    const v = _cfg[key];
    if (v !== undefined) return v;
    const saved = GM_getValue(key, DEFAULTS[key]);
    const val = saved !== null && saved !== undefined ? saved : DEFAULTS[key];
    _cfg[key] = val;
    return val;
  }

  const _cfgListeners = new Set();

  function cfgSet(key, value) {
    if (_cfg[key] === value) return;
    _cfg[key] = value;
    GM_setValue(key, value);
    for (const fn of _cfgListeners) {
      try {
        fn(key, value);
      } catch (e) {}
    }
  }

  function onCfgChange(fn) {
    _cfgListeners.add(fn);
  }

  // -- STATE
  const G = {
    yaw: 0,
    keys: Object.create(null),
    lmbClicks: [],
    rmbClicks: [],
  };

  window.__celestarCleared = false;

  // -- HOOKS
  const GameHooks = {
    _stores: null,
    _storesMisses: 0,

    get stores() {
      if (this._stores) return this._stores;
      try {
        const provides = app._vnode.component.appContext.provides;
        const sym = Object.getOwnPropertySymbols(provides).find(
          (s) => provides[s] && provides[s]._s,
        );
        if (!sym) return null;
        this._stores = provides[sym]._s;
        return this._stores;
      } catch (e) {
        return null;
      }
    },

    get gameWorld() {
      try {
        return this.stores.get("gameState").gameWorld || null;
      } catch (e) {
        return null;
      }
    },

    get player() {
      try {
        return this.gameWorld.player || null;
      } catch (e) {
        return null;
      }
    },

    get systems() {
      try {
        return this.gameWorld.systemsManager.activeSystems || null;
      } catch (e) {
        return null;
      }
    },

    findSystem(prop) {
      try {
        return this.systems.find((s) => s[prop] !== undefined) || null;
      } catch (e) {
        return null;
      }
    },

    get playerModel() {
      try {
        return this.systems.find((s) => s.model).model || null;
      } catch (e) {
        return null;
      }
    },

    get selectedBlock() {
      try {
        return this.findSystem("currBlockPos");
      } catch (e) {
        return null;
      }
    },
  };

  // -- PACKETS
  const Packets = {
    toServer: {
      TIME_STEP_INFO: 1,
      REQUEST_RESPAWN: 4,
      CHAT: 9,
      GOT_DAMAGE: 27,
    },

    toClient: {
      SET_HEALTH: 24,
      PLAYER_DEAD: 6,
      PLAYER_GOT_DAMAGE: 524,
      GAME_END: 14,
      SET_WALK_MODE: 41,
      SET_INVISIBLE_MODE: 42,
      GOT_DAMAGE: 512,
      PLAYER_DAMAGE_DEALT: 558,
      BED_WARS_BED_WAS_DESTROYED: 1502,
      BED_WARS_TEAM_WAS_ELIMINATED: 1510,
    },

    listeners: Object.create(null),
    incomingListeners: Object.create(null),

    packetListener(packetID, data) {
      for (const key in this.listeners) {
        try {
          const result = this.listeners[key](packetID, data);
          if (result !== null && result !== undefined) data = result;
        } catch (e) {}
      }
      const server = GameHooks.gameWorld.server;
      if (server) server.msgsToSend.push(packetID, data);
    },

    incomingPacketListener(packetID, data) {
      if (packetID === 3 && Array.isArray(data)) {
        for (let i = 2; i < data.length; i += 2) {
          const innerPacketID = data[i];
          const innerData = data[i + 1];
          if (innerPacketID === undefined) continue;
          const listener = this.incomingListeners[innerPacketID];
          if (listener) {
            try {
              listener(innerData);
            } catch (e) {}
          }
        }
        return;
      }
      const listener = this.incomingListeners[packetID];
      if (listener) {
        try {
          listener(data);
        } catch (e) {}
      }
    },

    init() {
      const install = () => {
        const server = GameHooks.gameWorld.server;
        if (!server.sendData) return;
        if (server.sendData !== this._boundListener) {
          if (this._originalSendData == null) {
            this._originalSendData = server.sendData;
          }
          this._boundListener = this.packetListener.bind(this);
          server.sendData = this._boundListener;
        }
        const room = server.room;
        if (room.onMessage && this._hookedRoom !== room) {
          this._hookedRoom = room;
          room.onMessage("*", (packetID, data) => {
            this.incomingPacketListener(packetID, data);
          });
        }
      };
      Ticker.add(install, 100);
    },

    addListener(id, callback) {
      this.listeners[id] = callback;
      return {
        off: () => {
          delete this.listeners[id];
        },
      };
    },
    addIncomingListener(id, callback) {
      this.incomingListeners[id] = callback;
      return {
        off: () => {
          delete this.incomingListeners[id];
        },
      };
    },

    send(packetId, data) {
      try {
        const gw = GameHooks.gameWorld;
        if (!gw.server.sendData) return false;
        gw.server.sendData(packetId, data);
        return true;
      } catch (e) {
        return false;
      }
    },

    triggerClient(packetId) {
      try {
        const gw = GameHooks.gameWorld;
        if (!gw.server.msgsListeners[packetId]) return false;
        gw.server.msgsListeners[packetId]();
        return true;
      } catch (e) {
        return false;
      }
    },

    destroy() {
      const server = GameHooks.gameWorld.server;
      if (server && this._originalSendData)
        server.sendData = this._originalSendData;
      this.listeners = Object.create(null);
      this.incomingListeners = Object.create(null);
      this._hookedRoom = null;
      this._boundListener = null;
      this._originalSendData = null;
    },
  };

  Packets.init();

  // -- GL
  let zoomCurrentLevel = 1.0;
  let zoomTargetLevel = 1.0;
  let zoomActive = false;
  let zoomDirty = false;

  const _getContext = HTMLCanvasElement.prototype.getContext;
  HTMLCanvasElement.prototype.getContext = function (type, attribs) {
    const ctx = _getContext.call(this, type, attribs);
    if ((type === "webgl2" || type === "webgl") && this.id === "game") {
      window.__mfGL = ctx;
      _patchGL(ctx);
    }
    return ctx;
  };

  function _patchGL(gl) {
    let currentProgram = null;
    const projectionState = new Map();
    let frameMatrixIndex = 0;
    let lastGoodYaw = 0;

    const _useProgram = gl.useProgram.bind(gl);
    const uniformNames = new Map();
    const _getUniformLocation = gl.getUniformLocation.bind(gl);

    gl.getUniformLocation = function (program, name) {
      const location = _getUniformLocation(program, name);
      if (location) uniformNames.set(location, String(name));
      return location;
    };

    const _uniform1f = gl.uniform1f.bind(gl);
    let nofogEnabled = false;

    gl.uniform1f = function (location, value) {
      if (nofogEnabled && location) {
        const name = uniformNames.get(location);
        if (name) {
          const lower = name.toLowerCase();
          if (lower.includes("fog")) {
            if (lower.includes("fogdensity")) return _uniform1f(location, 0);
            if (lower.includes("fognear")) return _uniform1f(location, 999999);
            if (lower.includes("fogfar")) return _uniform1f(location, 999999);
          }
        }
      }
      return _uniform1f(location, value);
    };

    const _uniform1fv = gl.uniform1fv.bind(gl);
    gl.uniform1fv = function (location, value) {
      if (nofogEnabled && location) {
        const name = uniformNames.get(location);
        if (name && name.toLowerCase().includes("fog")) {
          return _uniform1fv(
            location,
            new Float32Array(Array.from(value).map(() => 0)),
          );
        }
      }
      return _uniform1fv(location, value);
    };

    gl.useProgram = function (program) {
      currentProgram = program;
      return _useProgram(program);
    };

    const _raf = window.requestAnimationFrame.bind(window);
    window.requestAnimationFrame = function (cb) {
      return _raf(function (t) {
        frameMatrixIndex = 0;
        return cb(t);
      });
    };

    const _u4fv = gl.uniformMatrix4fv.bind(gl);

    gl.uniformMatrix4fv = function (location, transpose, value) {
      if (
        value instanceof Float32Array &&
        value.length === 16 &&
        value[15] === 0 &&
        value[11] === -1 &&
        value[0] > 0.1 &&
        value[5] > 0.1 &&
        currentProgram
      ) {
        frameMatrixIndex++;
        if (frameMatrixIndex === 1) {
          const raw =
            ((Math.atan2(-value[8], -value[10]) * 180) / Math.PI + 360) % 360;
          const delta = Math.abs(raw - lastGoodYaw);
          if (!(Math.abs(raw - 180.0) < 0.5 && delta > 10)) lastGoodYaw = raw;
          G.yaw = lastGoodYaw;
        }
        projectionState.set(currentProgram, {
          location,
          transpose,
          original: new Float32Array(value),
        });
        if (zoomActive) {
          return _u4fv(location, transpose, _applyZoom(value));
        }
      }
      return _u4fv(location, transpose, value);
    };

    function _applyZoom(m) {
      const out = new Float32Array(m);
      const f = 1 / zoomCurrentLevel;
      out[0] *= f;
      out[5] *= f;
      return out;
    }

    function updateZoomProjections() {
      const saved = currentProgram;
      for (const [prog, state] of projectionState) {
        _useProgram(prog);
        if (zoomCurrentLevel !== 1.0) {
          _u4fv(state.location, state.transpose, _applyZoom(state.original));
        } else {
          _u4fv(state.location, state.transpose, state.original);
        }
      }
      if (saved) _useProgram(saved);
    }

    Ticker.add(() => {
      const active = zoomActive;
      const sliderLevel = cfg("zoom.level") || 1 / 3;

      if (active) {
        if (!cfg("zoom.scrollable")) zoomTargetLevel = sliderLevel;
      } else {
        zoomTargetLevel = 1.0;
      }

      let changed = false;
      if (cfg("zoom.smoothness")) {
        const speed = 0.15;
        const next =
          zoomCurrentLevel + (zoomTargetLevel - zoomCurrentLevel) * speed;
        const clamped =
          Math.abs(next - zoomTargetLevel) < 0.0005 ? zoomTargetLevel : next;
        if (clamped !== zoomCurrentLevel) {
          zoomCurrentLevel = clamped;
          changed = true;
        }
      } else {
        if (zoomCurrentLevel !== zoomTargetLevel) {
          zoomCurrentLevel = zoomTargetLevel;
          changed = true;
        }
      }

      if (changed || zoomDirty) {
        updateZoomProjections();
        zoomDirty = false;
      }
    });

    onCfgChange((key, value) => {
      if (key === "nofog.enabled") nofogEnabled = !!value;
    });
    nofogEnabled = !!cfg("nofog.enabled");

    const _texImage2D = gl.texImage2D.bind(gl);
    gl.texImage2D = function (target, level, internalFormat, ...rest) {
      if (cfg("textures.enabled")) {
        const pack = cfg("textures.pack") || {};
        const source = rest[rest.length - 1];
        if (source && source instanceof HTMLImageElement && source.src) {
          const filename = source.src.split("/").pop().split("?")[0];
          const override = pack[filename];
          if (override) {
            const img = new Image();
            img.crossOrigin = "anonymous";
            img.onload = () =>
              _texImage2D(
                target,
                level,
                internalFormat,
                ...rest.slice(0, rest.length - 1),
                img,
              );
            img.src = override;
          }
        }
      }
      return _texImage2D(target, level, internalFormat, ...rest);
    };
  }

  (function () {
    function isGameActive() {
      return !document.querySelector(".home");
    }

    function overrideURL(url) {
      if (!cfg("textures.enabled")) return url;
      const pack = cfg("textures.pack") || {};
      for (const key in pack) {
        if (url.includes(key)) return pack[key];
      }
      return url;
    }

    const imgSrcDesc = Object.getOwnPropertyDescriptor(
      HTMLImageElement.prototype,
      "src",
    );
    Object.defineProperty(HTMLImageElement.prototype, "src", {
      set(value) {
        if (typeof value === "string" && isGameActive())
          value = overrideURL(value);
        return imgSrcDesc.set.call(this, value);
      },
      get() {
        return imgSrcDesc.get.call(this);
      },
      configurable: true,
    });

    const _origSetAttr = Element.prototype.setAttribute;
    Element.prototype.setAttribute = function (name, value) {
      if (name === "src" && typeof value === "string" && isGameActive()) {
        value = overrideURL(value);
      }
      return _origSetAttr.call(this, name, value);
    };

    const _origSetProp = CSSStyleDeclaration.prototype.setProperty;
    CSSStyleDeclaration.prototype.setProperty = function (
      name,
      value,
      priority,
    ) {
      if (
        typeof value === "string" &&
        value &&
        value.includes("url(") &&
        isGameActive()
      ) {
        const pack = cfg("textures.pack") || {};
        if (cfg("textures.enabled")) {
          for (const key in pack) {
            if (value.includes(key)) {
              value = `url("${pack[key]}")`;
              break;
            }
          }
        }
      }
      return _origSetProp.call(this, name, value, priority);
    };
  })();

  // -- INPUT
  document.addEventListener("keydown", (e) => {
    if (e.code === cfg("zoom.keybind")) {
      if (!G.keys["zoom_held"]) {
        if (!cfg("zoom.scrollable")) {
          zoomTargetLevel = cfg("zoom.level") || 1 / 3;
        }
      }
      G.keys["zoom_held"] = true;
      zoomActive = true;
    }
    G.keys[e.code] = true;
  });

  document.addEventListener("keyup", (e) => {
    if (e.code === cfg("zoom.keybind")) {
      G.keys["zoom_held"] = false;
      zoomActive = false;
    }
    G.keys[e.code] = false;
  });

  document.addEventListener(
    "wheel",
    (e) => {
      if (!cfg("zoom.enabled")) return;
      if (!cfg("zoom.scrollable")) return;
      if (!G.keys["zoom_held"]) return;
      e.preventDefault();
      let currentZoom = 1 / zoomTargetLevel;
      const step = 0.25;
      if (e.deltaY < 0) currentZoom += step;
      else currentZoom -= step;
      currentZoom = Math.max(2, Math.min(5, currentZoom));
      zoomTargetLevel = 1 / currentZoom;
      if (!cfg("zoom.smoothness")) {
        zoomCurrentLevel = zoomTargetLevel;
        zoomDirty = true;
      }
    },
    { passive: false },
  );

  document.addEventListener("mousedown", (e) => {
    const now = performance.now();
    if (e.button === 0) {
      G.lmbClicks.push(now);
      G.keys["LMB"] = true;
    }
    if (e.button === 2) {
      G.rmbClicks.push(now);
      G.keys["RMB"] = true;
    }
  });

  document.addEventListener("mouseup", (e) => {
    if (e.button === 0) G.keys["LMB"] = false;
    if (e.button === 2) G.keys["RMB"] = false;
  });

  onCfgChange((key, value) => {
    if (key === "zoom.keybind") {
      G.keys["zoom_held"] = false;
      zoomActive = false;
    }
    if (key === "zoom.enabled" && !value) zoomActive = false;
  });

  /*
    * Copyright © 2026 Celestar / thetalkingcat
    * ALL RIGHTS RESERVED

    * This source code is proprietary. Copying, reusing, modifying, redistributing with or without AI without explicit
    * permission from the creator (thetalkingcat) is strictly prohibited.

    * Permission is REQUIRED for any reuse.
  */

  // -- MODS
  const MODS = [];
  const MODS_BY_ID = new Map();
  function registerMod(mod) {
    MODS.push(mod);
    MODS_BY_ID.set(mod.id, mod);
  }

  registerMod({
    id: "zoom",
    name: "Zoom",
    category: ["utilities"],
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-zoom">
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M3 10a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
    <path d="M21 21l-6 -6" />
  </svg>`,
    hasOptions: true,
    init() {},
    apply() {},
    options: {
      render() {
        const level = cfg("zoom.level") || 1 / 3;
        const display = parseFloat((1 / level).toFixed(1));
        const kb = cfg("zoom.keybind");
        return `
        <div class="mod-description">
          Zooms the camera when keybind is held
        </div>

        <div class="settings-section-title">
          <span>General</span>
          <div></div>
        </div>

        <div class="setting-row">
          <label>Distance</label>
          <div class="setting-inline">
            <input
              type="range"
              id="copt-zoom-level"
              min="2"
              max="5"
              step="0.1"
              value="${display}"
            >
            <div class="range-val" id="copt-zoom-level-val">
              ${display.toFixed(1)}x
            </div>
          </div>
        </div>

        <div class="setting-row">
  <label>Smoothness</label>
  ${optToggle("zoom-smoothness", cfg("zoom.smoothness"))}
</div>

<div class="setting-row">
  <label>Scrollable</label>
  ${optToggle("zoom-scrollable", cfg("zoom.scrollable"))}
</div>

        <div class="setting-row">
          <label>Keybind</label>
          <div class="keybind-box" id="copt-zoom-kb">
            ${fmtKey(kb)}
          </div>
        </div>
      `;
      },
      bind() {
        const slider = byId("copt-zoom-level");
        const valEl = byId("copt-zoom-level-val");
        const kbEl = byId("copt-zoom-kb");

        if (slider && valEl) {
          slider.oninput = () => {
            const v = parseFloat(slider.value);
            valEl.textContent = v.toFixed(1) + "x";
            cfgSet("zoom.level", parseFloat((1 / v).toFixed(3)));
            if (!cfg("zoom.scrollable")) {
              zoomTargetLevel = 1 / v;
            }
          };
        }

        bindToggle("zoom-smoothness", "zoom.smoothness");
        bindToggle("zoom-scrollable", "zoom.scrollable");

        if (kbEl) bindKeybind(kbEl, "zoom.keybind");
      },
    },
  });

  registerMod({
    id: "crosshair",
    name: "Crosshair",
    category: ["visuals"],
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-crosshair">
	<path stroke="none" d="M0 0h24v24H0z" fill="none" />
	<path d="M4 8v-2a2 2 0 0 1 2 -2h2" />
	<path d="M4 16v2a2 2 0 0 0 2 2h2" />
	<path d="M16 4h2a2 2 0 0 1 2 2v2" />
	<path d="M16 20h2a2 2 0 0 0 2 -2v-2" />
	<path d="M9 12l6 0" />
	<path d="M12 9l0 6" />
</svg>`,
    hasOptions: true,
    _styleEl: null,
    init() {
      this._styleEl = injectStyle("", "__cs_crosshair");
      this.apply();
      const obs = new MutationObserver((muts) => {
        for (const m of muts) {
          for (const node of m.addedNodes) {
            if (node.nodeType !== 1) continue;
            if (
              (node.classList && node.classList.contains("aim")) ||
              (node.querySelector && node.querySelector(".aim"))
            ) {
              this.apply();
              return;
            }
          }
        }
      });
      waitForBody(() =>
        obs.observe(document.body, { childList: true, subtree: true }),
      );
    },
    apply() {
      if (!this._styleEl) return;
      const enabled = cfg("crosshair.enabled");
      const url = cfg("crosshair.url").trim();
      const size = cfg("crosshair.size");
      const opacity = cfg("crosshair.opacity");
      const cleared = !!window.__celestarCleared;

      const sig = `${enabled}|${url}|${size}|${opacity}|${cleared}`;
      if (this._lastSig === sig) return;
      this._lastSig = sig;

      if (!enabled || cleared) {
        this._styleEl.textContent = "";
        return;
      }

      const common = `
            .aim { visibility: hidden !important; }
            .aim::after {
                content: "" !important; display: block !important;
                position: absolute !important; visibility: visible !important;
                top: 50% !important; left: 50% !important;
                transform: translate(-50%, -50%) !important;
                width: ${size}px !important; height: ${size}px !important;
                opacity: ${opacity} !important; pointer-events: none !important;
        `;

      if (!url) {
        this._styleEl.textContent =
          common +
          `
                background:
                    linear-gradient(rgba(255,255,255,.95),rgba(255,255,255,.95))
                        center / 1.5px ${Math.round(size * 0.55)}px no-repeat,
                    linear-gradient(rgba(255,255,255,.95),rgba(255,255,255,.95))
                        center / ${Math.round(size * 0.55)}px 1.5px no-repeat !important;
                filter: drop-shadow(0 0 1px rgba(0,0,0,.9)) !important; }`;
      } else {
        this._styleEl.textContent =
          common +
          `
                background-image: url('${url.replace(/'/g, "\\'")}') !important;
                background-size: contain !important; background-repeat: no-repeat !important;
                background-position: center !important; image-rendering: pixelated !important;
                border: none !important; border-radius: 0 !important; }`;
      }
    },
    _lastSig: "",
    options: {
      render() {
        const url = cfg("crosshair.url");
        const size = cfg("crosshair.size");
        const opacity = cfg("crosshair.opacity");
        return `
         <div class="mod-description">
                Change your crosshair to whatever you want
            </div>
            <div class="settings-section-title">
                <span>General</span>
                <div></div>
            </div>
                <div class="setting-row">
                    <label>Image URL</label>
                    <input type="text" id="copt-xhair-url"
                        placeholder="Leave empty for default"
                        value="${escHtml(url)}"
                        style="width:35%;background:var(--background-1);border:1px solid var(--border-1);
                        color:var(--white);border-radius:4px;padding:6px 8px;font-size:11px;
                        outline:none;font-family:sans-serif;">
                </div>
                <div class="setting-row">
                    <label>Size</label>
                    <div class="setting-inline">
                        <input type="range" id="copt-xhair-size" min="8" max="128" step="1" value="${size}">
                        <div class="range-val" id="copt-xhair-size-val">${size}px</div>
                    </div>
                </div>
                <div class="setting-row">
                    <label>Opacity</label>
                    <div class="setting-inline">
                        <input type="range" id="copt-xhair-opacity" min="0.1" max="1" step="0.05" value="${opacity}">
                        <div class="range-val" id="copt-xhair-opacity-val">${Math.round(opacity * 100)}%</div>
                    </div>
                </div>
                <div class="settings-section-title">
                <span>Preview</span>
                <div></div>
            </div>
                <div class="setting-row">

                    <div style="width:120px;height:120px;background:var(--background-1);border:1px solid var(--border-1);
                        border-radius:4px;position:relative;display:flex;align-items:center;justify-content:center;">
                        <canvas id="copt-xhair-canvas" width="120" height="120" style="position:absolute;top:0;left:0;"></canvas>
                    </div>
                </div>`;
      },
      bind() {
        const urlEl = byId("copt-xhair-url");
        const sizeEl = byId("copt-xhair-size");
        const sizeVal = byId("copt-xhair-size-val");
        const opEl = byId("copt-xhair-opacity");
        const opVal = byId("copt-xhair-opacity-val");

        const canvas = byId("copt-xhair-canvas");
        const ctx = canvas.getContext("2d");

        let previewRaf = 0;
        const schedulePreview = () => {
          if (previewRaf) return;
          previewRaf = requestAnimationFrame(() => {
            previewRaf = 0;
            drawPreview();
          });
        };

        function drawPreview() {
          if (!ctx) return;

          ctx.clearRect(0, 0, 120, 120);
          const url = urlEl.value.trim() || "";
          const size = parseInt(sizeEl.value) || 32;
          const op = parseFloat(opEl.value) || 1;
          const previewMax = 110;

          const s2 = Math.min(size, 128) * (previewMax / 128);
          const cx = 60;
          const cy = 60;

          ctx.save();
          ctx.globalAlpha = op;

          if (!url) {
            const arm = s2 / 2;
            const t = Math.max(1, s2 / 20);
            const gap = s2 / 8;

            ctx.strokeStyle = "rgba(0,0,0,.8)";
            ctx.lineWidth = t + 2;
            ctx.lineCap = "round";
            ctx.beginPath();
            ctx.moveTo(cx - arm, cy);
            ctx.lineTo(cx - gap, cy);
            ctx.moveTo(cx + gap, cy);
            ctx.lineTo(cx + arm, cy);
            ctx.moveTo(cx, cy - arm);
            ctx.lineTo(cx, cy - gap);
            ctx.moveTo(cx, cy + gap);
            ctx.lineTo(cx, cy + arm);
            ctx.stroke();

            ctx.strokeStyle = "rgba(255,255,255,.95)";
            ctx.lineWidth = t;
            ctx.beginPath();
            ctx.moveTo(cx - arm, cy);
            ctx.lineTo(cx - gap, cy);
            ctx.moveTo(cx + gap, cy);
            ctx.lineTo(cx + arm, cy);
            ctx.moveTo(cx, cy - arm);
            ctx.lineTo(cx, cy - gap);
            ctx.moveTo(cx, cy + gap);
            ctx.lineTo(cx, cy + arm);
            ctx.stroke();
          } else {
            const img = new Image();
            img.crossOrigin = "anonymous";
            img.onload = () => {
              ctx.clearRect(0, 0, 120, 120);
              ctx.save();
              ctx.globalAlpha = op;
              ctx.imageSmoothingEnabled = false;
              ctx.drawImage(img, cx - s2 / 2, cy - s2 / 2, s2, s2);
              ctx.restore();
            };
            img.onerror = () => {
              ctx.clearRect(0, 0, 120, 120);
              ctx.save();
              ctx.globalAlpha = 1;
              ctx.fillStyle = "#e05252";
              ctx.font = "10px sans-serif";
              ctx.textAlign = "center";
              ctx.textBaseline = "middle";
              ctx.fillText("Invalid URL", cx, cy);
              ctx.restore();
            };
            img.src = url;
          }

          ctx.restore();
        }

        if (urlEl) {
          urlEl.oninput = schedulePreview;
          urlEl.onchange = () => {
            cfgSet("crosshair.url", urlEl.value.trim());
          };
        }

        bindSlider(
          "copt-xhair-size",
          "copt-xhair-size-val",
          "crosshair.size",
          (v) => v + "px",
          (v) => parseInt(v),
          schedulePreview,
        );

        bindSlider(
          "copt-xhair-opacity",
          "copt-xhair-opacity-val",
          "crosshair.opacity",
          (v) => Math.round(parseFloat(v) * 100) + "%",
          parseFloat,
          schedulePreview,
        );

        drawPreview();
      },
    },
  });

  registerMod({
    id: "keystrokes",
    name: "Keystrokes",
    category: ["hud"],
    hasOptions: true,
    icon: `
<svg xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round">
    <rect x="3" y="4" width="18" height="16" rx="2"/>
    <path d="M7 8h.01"/>
    <path d="M11 8h.01"/>
    <path d="M15 8h.01"/>
    <path d="M7 12h.01"/>
    <path d="M11 12h.01"/>
    <path d="M15 12h.01"/>
    <path d="M7 16h10"/>
</svg>
    `,

    _el: null,
    _editMode: false,
    _tick: null,

    _mouseDown: false,
    _rightMouseDown: false,

    _keys: [
      { id: "c", label: "C", code: "KeyC", type: "key" },
      { id: "w", label: "W", code: "KeyW", type: "key" },
      { id: "shift", label: "SHIFT", code: "ShiftLeft", type: "key" },
      { id: "a", label: "A", code: "KeyA", type: "key" },
      { id: "s", label: "S", code: "KeyS", type: "key" },
      { id: "d", label: "D", code: "KeyD", type: "key" },
      { id: "space", label: "SPACE", code: "Space", type: "key" },
      { id: "lmb", label: "LMB", code: "MouseLeft", type: "mouse" },
      { id: "rmb", label: "RMB", code: "MouseRight", type: "mouse" },
    ],

    _styleCache: {
      bg: null,
      radius: null,
      border: null,
      shadow: null,
    },

    _buildDOM() {
      if (this._el) this._el.remove();

      const hud = document.createElement("div");
      hud.id = "__cs_keystrokes";
      hud.style.cssText = `
            position: fixed;
            left: ${cfg("keystrokes.x")}px;
            top: ${cfg("keystrokes.y")}px;

            display: flex;
            flex-direction: column;
            gap: 4px;

            z-index: 99999;

            user-select: none;
            pointer-events: auto;

            transform-origin: top left;
        `;

      const makeRow = () => {
        const row = document.createElement("div");
        row.style.cssText = `
                display: flex;
                justify-content: center;
                gap: 4px;
            `;
        hud.appendChild(row);
        return row;
      };

      const row1 = makeRow();
      const row2 = makeRow();
      const row3 = makeRow();
      const row4 = makeRow();

      const makeKey = (def) => {
        const key = document.createElement("div");
        const isSpace = def.id === "space";
        const isMouse = def.type === "mouse";

        key.style.cssText = `
                width: ${isSpace ? 140 : isMouse ? 68 : 44}px;
                height: ${isMouse ? 50 : 44}px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                box-sizing: border-box;
                background: ${cfg("keystrokes.keyColor")};
                border: ${
                  cfg("keystrokes.border")
                    ? `${cfg("keystrokes.borderWidth")}px solid ${cfg("keystrokes.borderColor")}`
                    : "none"
                };
                border-radius: ${Math.min(12, parseFloat(cfg("keystrokes.borderRadius")) || 4)}px;
                color: ${cfg("keystrokes.textColor")};
                font-family: Inter, Arial, sans-serif;
                font-size: ${isSpace || isMouse ? "11px" : "13px"};
                font-weight: 600;
                cursor: default;
                box-shadow: ${cfg("keystrokes.shadow") ? "0 2px 5px rgba(0,0,0,0.25)" : "none"};
                transform: scale(1);
                transform-origin: center center;
                will-change: transform, background-color;
            `;

        const label = document.createElement("span");
        label.textContent = def.label;
        label.style.cssText = `
                pointer-events: none;
                line-height: 1;
                color: ${cfg("keystrokes.textColor")};
            `;
        key.appendChild(label);

        def.el = key;
        def.labelEl = label;

        if (def.id === "lmb" || def.id === "rmb") {
          const cps = document.createElement("span");
          cps.textContent = "0";
          cps.style.cssText = `
                    margin-top: 3px;
                    font-size: 9px;
                    font-weight: 600;
                    line-height: 1;
                    opacity: 0.65;
                    pointer-events: none;
                    color: ${cfg("keystrokes.textColor")};
                `;
          key.appendChild(cps);
          def.cpsEl = cps;
        }

        return key;
      };

      row1.appendChild(makeKey(this._keys[0]));
      row1.appendChild(makeKey(this._keys[1]));
      row1.appendChild(makeKey(this._keys[2]));
      row2.appendChild(makeKey(this._keys[3]));
      row2.appendChild(makeKey(this._keys[4]));
      row2.appendChild(makeKey(this._keys[5]));
      row3.appendChild(makeKey(this._keys[6]));
      row4.appendChild(makeKey(this._keys[7]));
      row4.appendChild(makeKey(this._keys[8]));

      this._keyC = this._keys[0];
      this._keyW = this._keys[1];
      this._keyShift = this._keys[2];
      this._keyA = this._keys[3];
      this._keyS = this._keys[4];
      this._keyD = this._keys[5];
      this._keySpace = this._keys[6];
      this._keyLmb = this._keys[7];
      this._keyRmb = this._keys[8];

      let dragging = false;
      let dragOffsetX = 0;
      let dragOffsetY = 0;

      hud.addEventListener("mousedown", (e) => {
        if (!this._editMode) return;
        if (e.button !== 0) return;
        dragging = true;
        const rect = hud.getBoundingClientRect();
        dragOffsetX = e.clientX - rect.left;
        dragOffsetY = e.clientY - rect.top;
        e.preventDefault();
      });

      this._dragMove = (e) => {
        if (!dragging) return;
        const x = e.clientX - dragOffsetX;
        const y = e.clientY - dragOffsetY;
        hud.style.left = x + "px";
        hud.style.top = y + "px";
        cfgSet("keystrokes.x", Math.round(x));
        cfgSet("keystrokes.y", Math.round(y));
      };

      this._dragUp = () => {
        dragging = false;
      };

      document.addEventListener("mousemove", this._dragMove);
      document.addEventListener("mouseup", this._dragUp);

      this._el = hud;
      document.body.appendChild(hud);
      this.setEditMode(this._editMode);
    },

    setEditMode(on) {
      this._editMode = on;
      if (!this._el) return;
      this._el.style.outline = on ? "2px dashed #7b2fe6" : "none";
      this._el.style.cursor = on ? "move" : "default";
      this.apply();
    },

    _rainbowColor(index) {
      const hue = (performance.now() / 5 + index * 45) % 360;
      return `hsl(${hue}, 100%, 60%)`;
    },

    _isInGame() {
      const game = document.querySelector(".game");
      const home = document.querySelector(".home");
      return !!game && !home;
    },

    _getCPS(button) {
      try {
        const now = Date.now();
        const arr =
          button === "left"
            ? window.__csLeftClicks || []
            : window.__csRightClicks || [];
        const filtered = arr.filter((t) => now - t < 1000);
        if (button === "left") window.__csLeftClicks = filtered;
        else window.__csRightClicks = filtered;
        return filtered.length;
      } catch (e) {
        return 0;
      }
    },

    apply() {
      if (!this._el) return;

      this._el.style.left = `${cfg("keystrokes.x")}px`;
      this._el.style.top = `${cfg("keystrokes.y")}px`;
      this._el.style.transform = `scale(${parseFloat(cfg("keystrokes.scale")) || 1})`;

      const radius = Math.min(
        12,
        Math.max(0, parseFloat(cfg("keystrokes.borderRadius")) || 4),
      );
      const borderWidth = parseFloat(cfg("keystrokes.borderWidth")) || 1;
      const normalText = cfg("keystrokes.textColor");
      const keyColor = cfg("keystrokes.keyColor");
      const borderColor = cfg("keystrokes.borderColor");
      const borderOn = cfg("keystrokes.border");
      const shadowOn = cfg("keystrokes.shadow");

      const borderStr = borderOn
        ? `${borderWidth}px solid ${borderColor}`
        : "none";
      const shadowStr = shadowOn ? "0 2px 5px rgba(0,0,0,0.25)" : "none";

      const c = this._styleCache;
      const keyStylesDirty =
        c.bg !== keyColor ||
        c.radius !== radius ||
        c.border !== borderStr ||
        c.shadow !== shadowStr ||
        c.text !== normalText;

      if (keyStylesDirty) {
        c.bg = keyColor;
        c.radius = radius;
        c.border = borderStr;
        c.shadow = shadowStr;
        c.text = normalText;

        for (const k of this._keys) {
          if (!k.el) continue;
          k.el.style.borderRadius = radius + "px";
          k.el.style.background = keyColor;
          k.el.style.color = normalText;
          k.el.style.boxShadow = shadowStr;
          k.el.style.border = borderStr;
          if (k.labelEl) k.labelEl.style.color = normalText;
          if (k.cpsEl) k.cpsEl.style.color = normalText;
        }
      }
    },

    _loop() {
      const el = this._el;
      if (!el) return;

      const enabled = !!cfg("keystrokes.enabled");
      const onlyInGame = !!cfg("keystrokes.onlyInGame");
      const cleared = !!window.__celestarCleared;

      const shouldShow =
        !cleared &&
        enabled &&
        (this._editMode || !onlyInGame || this._isInGame());

      const display = shouldShow ? "flex" : "none";
      if (el.style.display !== display) el.style.display = display;

      if (!shouldShow) return;

      const leftCPS = this._getCPS("left");
      const rightCPS = this._getCPS("right");

      const lmb = this._keyLmb;
      const rmb = this._keyRmb;

      const showLeft = cfg("keystrokes.showLeftCPS");
      const showRight = cfg("keystrokes.showRightCPS");

      if (lmb.cpsEl) {
        const d = showLeft ? "block" : "none";
        if (lmb.cpsEl.style.display !== d) lmb.cpsEl.style.display = d;
        const txt = String(leftCPS);
        if (lmb.cpsEl.textContent !== txt) lmb.cpsEl.textContent = txt;
      }

      if (rmb.cpsEl) {
        const d = showRight ? "block" : "none";
        if (rmb.cpsEl.style.display !== d) rmb.cpsEl.style.display = d;
        const txt = String(rightCPS);
        if (rmb.cpsEl.textContent !== txt) rmb.cpsEl.textContent = txt;
      }

      const animOn = cfg("keystrokes.pressAnimation");
      const rainbowOn = cfg("keystrokes.rainbow");
      const pressedColor = cfg("keystrokes.pressedColor");
      const keyColor = cfg("keystrokes.keyColor");
      const textColor = cfg("keystrokes.textColor");
      const pressedTextColor = cfg("keystrokes.pressedTextColor");

      const keys = this._keys;
      const len = keys.length;

      for (let i = 0; i < len; i++) {
        const k = keys[i];
        if (!k.el) continue;

        let pressed = false;
        if (k.type === "mouse") {
          pressed = k.id === "lmb" ? !!this._mouseDown : !!this._rightMouseDown;
        } else {
          pressed = !!window.__csKeys[k.code];
        }

        const target = pressed && animOn ? 0.92 : 1;
        const cur = k.scale !== null && k.scale !== undefined ? k.scale : 1;

        if (animOn) {
          const next = cur + (target - cur) * 0.25;
          if (Math.abs(next - cur) > 0.001) {
            k.scale = next;
            k.el.style.transform = `scale(${next})`;
          } else if (cur !== target) {
            k.scale = target;
            k.el.style.transform = `scale(${target})`;
          }
        } else if (cur !== 1) {
          k.scale = 1;
          k.el.style.transform = "scale(1)";
        }

        const textClr = pressed ? pressedTextColor : textColor;
        const bgClr = pressed
          ? rainbowOn
            ? this._rainbowColor(i)
            : pressedColor
          : keyColor;

        if (k._lastBg !== bgClr) {
          k.el.style.background = bgClr;
          k._lastBg = bgClr;
        }
        if (k._lastText !== textClr) {
          k.el.style.color = textClr;
          if (k.labelEl) k.labelEl.style.color = textClr;
          if (k.cpsEl) k.cpsEl.style.color = textClr;
          k._lastText = textClr;
        }
      }
    },

    init() {
      waitForBody(() => {
        window.__csKeys = window.__csKeys || {};
        window.__csLeftClicks = window.__csLeftClicks || [];
        window.__csRightClicks = window.__csRightClicks || [];

        this._keydown = (e) => {
          window.__csKeys[e.code] = true;
        };
        this._keyup = (e) => {
          window.__csKeys[e.code] = false;
        };
        window.addEventListener("keydown", this._keydown);
        window.addEventListener("keyup", this._keyup);

        this._mousedown = (e) => {
          const now = Date.now();
          if (e.button === 0) {
            this._mouseDown = true;
            window.__csLeftClicks.push(now);
          }
          if (e.button === 2) {
            this._rightMouseDown = true;
            window.__csRightClicks.push(now);
          }
        };
        this._mouseup = (e) => {
          if (e.button === 0) this._mouseDown = false;
          if (e.button === 2) this._rightMouseDown = false;
        };
        window.addEventListener("mousedown", this._mousedown);
        window.addEventListener("mouseup", this._mouseup);

        this._buildDOM();
        this.apply();
        this._tick = Ticker.add(() => this._loop(), 0);
      });
    },

    options: {
      render() {
        return `
                <div class="mod-description">
                    Displays when you interact with movement keys or mouse
                </div>

                <div class="settings-section-title">
                    <span>General</span>
                    <div></div>
                </div>

                <div class="setting-row">
                    <label>Show Left CPS</label>
                    ${optToggle("ks-left-cps", cfg("keystrokes.showLeftCPS"))}
                </div>

                <div class="setting-row">
                    <label>Show Right CPS</label>
                    ${optToggle("ks-right-cps", cfg("keystrokes.showRightCPS"))}
                </div>

                <div class="setting-row">
                    <label>Show Only In Game</label>
                    ${optToggle("ks-game", cfg("keystrokes.onlyInGame"))}
                </div>

                <div class="setting-row">
                    <label>Rainbow Mode</label>
                    ${optToggle("ks-rainbow", cfg("keystrokes.rainbow"))}
                </div>

                <div class="setting-row">
                    <label>Animation</label>
                    ${optToggle("ks-animation", cfg("keystrokes.pressAnimation"))}
                </div>

                <div class="setting-row">
                    <label>Shadow</label>
                    ${optToggle("ks-shadow", cfg("keystrokes.shadow"))}
                </div>

                <div class="setting-row">
                    <label>Border</label>
                    ${optToggle("ks-border", cfg("keystrokes.border"))}
                </div>

                <div class="setting-row">
                    <label>Border Width</label>

                    <div class="setting-inline">
                        <input
                            type="range"
                            id="copt-ks-border-width"
                            min="0.5"
                            max="4"
                            step="0.5"
                            value="${cfg("keystrokes.borderWidth")}"
                        >

                        <div
                            class="range-val"
                            id="copt-ks-border-width-val"
                        >
                            ${parseFloat(cfg("keystrokes.borderWidth")).toFixed(1)}px
                        </div>
                    </div>
                </div>

                <div class="setting-row">
                    <label>Border Radius</label>

                    <div class="setting-inline">
                        <input
                            type="range"
                            id="copt-ks-radius"
                            min="0"
                            max="12"
                            step="1"
                            value="${cfg("keystrokes.borderRadius")}"
                        >

                        <div
                            class="range-val"
                            id="copt-ks-radius-val"
                        >
                            ${parseFloat(cfg("keystrokes.borderRadius"))}px
                        </div>
                    </div>
                </div>

                <div class="setting-row">
                    <label>Size</label>

                    <div class="setting-inline">
                        <input
                            type="range"
                            id="copt-ks-scale"
                            min=".5"
                            max="2"
                            step=".05"
                            value="${cfg("keystrokes.scale")}"
                        >

                        <div
                            class="range-val"
                            id="copt-ks-scale-val"
                        >
                            ${parseFloat(cfg("keystrokes.scale")).toFixed(2)}x
                        </div>
                    </div>
                </div>

                <div class="setting-row">
    <label>Position</label>

    <div style="display:flex;gap:6px;">
        <button class="opt-btn" id="ks-edit-btn">
            Edit Mode
        </button>

        <button
            class="opt-btn"
            id="ks-edit-done"
            style="display:none;"
        >
            Save
        </button>
    </div>
</div>

                <div class="settings-section-title">
                    <span>Colors</span>
                    <div></div>
                </div>

                <div class="setting-row">
                    <label>Background</label>

                    <div class="setting-inline">
                        <input
                            type="color"
                            id="copt-ks-key-color"
                            value="${cfg("keystrokes.keyColor")}"
                        >

                        <input class="cs-textbox"
                            type="text"
                            id="copt-ks-key-color-text"
                            value="${cfg("keystrokes.keyColor")}"
                        >
                    </div>
                </div>

                <div class="setting-row">
                    <label>Background (Pressed)</label>

                    <div class="setting-inline">
                        <input
                            type="color"
                            id="copt-ks-pressed-color"
                            value="${cfg("keystrokes.pressedColor")}"
                        >

                        <input class="cs-textbox"
                            type="text"
                            id="copt-ks-pressed-color-text"
                            value="${cfg("keystrokes.pressedColor")}"
                        >
                    </div>
                </div>

                <div class="setting-row">
                    <label>Text</label>

                    <div class="setting-inline">
                        <input
                            type="color"
                            id="copt-ks-text-color"
                            value="${cfg("keystrokes.textColor")}"
                        >

                        <input
                            type="text" class="cs-textbox"
                            id="copt-ks-text-color-text"
                            value="${cfg("keystrokes.textColor")}"
                        >
                    </div>
                </div>

                <div class="setting-row">
                    <label>Text (Pressed)</label>

                    <div class="setting-inline">
                        <input
                            type="color"
                            id="copt-ks-pressed-text-color"
                            value="${cfg("keystrokes.pressedTextColor")}"
                        >

                        <input
                            type="text" class="cs-textbox"
                            id="copt-ks-pressed-text-color-text"
                            value="${cfg("keystrokes.pressedTextColor")}"
                        >
                    </div>
                </div>

                <div class="setting-row">
                    <label>Border</label>

                    <div class="setting-inline">
                        <input
                            type="color"
                            id="copt-ks-border-color"
                            value="${cfg("keystrokes.borderColor")}"
                        >

                        <input
                            type="text" class="cs-textbox"
                            id="copt-ks-border-color-text"
                            value="${cfg("keystrokes.borderColor")}"
                        >
                    </div>
                </div>
            `;
      },

      bind() {
        const mod = MODS_BY_ID.get("keystrokes");

        bindToggle("ks-left-cps", "keystrokes.showLeftCPS", () => mod.apply());
        bindToggle("ks-right-cps", "keystrokes.showRightCPS", () =>
          mod.apply(),
        );
        bindToggle("ks-game", "keystrokes.onlyInGame", () => mod.apply());
        bindToggle("ks-rainbow", "keystrokes.rainbow", () => mod.apply());
        bindToggle("ks-animation", "keystrokes.pressAnimation", () =>
          mod.apply(),
        );
        bindToggle("ks-shadow", "keystrokes.shadow", () => mod.apply());
        bindToggle("ks-border", "keystrokes.border", () => mod.apply());

        const editBtn = document.getElementById("ks-edit-btn");
        const doneBtn = document.getElementById("ks-edit-done");

        editBtn.addEventListener("click", () => {
          mod.setEditMode(true);
          editBtn.style.display = "none";
          doneBtn.style.display = "";
        });

        doneBtn.addEventListener("click", () => {
          mod.setEditMode(false);
          editBtn.style.display = "";
          doneBtn.style.display = "none";
        });

        bindSlider(
          "copt-ks-border-width",
          "copt-ks-border-width-val",
          "keystrokes.borderWidth",
          (v) => parseFloat(v).toFixed(1) + "px",
          parseFloat,
          () => mod.apply(),
        );

        bindSlider(
          "copt-ks-radius",
          "copt-ks-radius-val",
          "keystrokes.borderRadius",
          (v) => Math.min(12, parseFloat(v)) + "px",
          (v) => Math.min(12, parseFloat(v)),
          () => mod.apply(),
        );

        bindSlider(
          "copt-ks-scale",
          "copt-ks-scale-val",
          "keystrokes.scale",
          (v) => parseFloat(v).toFixed(2) + "x",
          parseFloat,
          () => mod.apply(),
        );

        const colors = [
          [
            "copt-ks-key-color",
            "copt-ks-key-color-text",
            "keystrokes.keyColor",
          ],
          [
            "copt-ks-pressed-color",
            "copt-ks-pressed-color-text",
            "keystrokes.pressedColor",
          ],
          [
            "copt-ks-text-color",
            "copt-ks-text-color-text",
            "keystrokes.textColor",
          ],
          [
            "copt-ks-pressed-text-color",
            "copt-ks-pressed-text-color-text",
            "keystrokes.pressedTextColor",
          ],
          [
            "copt-ks-border-color",
            "copt-ks-border-color-text",
            "keystrokes.borderColor",
          ],
        ];

        colors.forEach(([pickerId, textId, key]) => {
          const picker = document.getElementById(pickerId);
          const text = document.getElementById(textId);
          if (!picker || !text) return;

          picker.addEventListener("input", (e) => {
            const value = e.target.value;
            text.value = value;
            cfgSet(key, value);
            mod.apply();
          });

          text.addEventListener("change", (e) => {
            let value = e.target.value.trim();
            if (!/^#[0-9a-fA-F]{6}$/.test(value)) {
              text.value = cfg(key);
              return;
            }
            value = value.toLowerCase();
            picker.value = value;
            cfgSet(key, value);
            mod.apply();
          });

          text.addEventListener("keydown", (e) => {
            if (e.key !== "Enter") return;
            e.target.blur();
          });
        });
      },
    },

    destroy() {
      if (this._tick) {
        Ticker.remove(this._tick);
        this._tick = null;
      }
      if (this._keydown) {
        window.removeEventListener("keydown", this._keydown);
        this._keydown = null;
      }
      if (this._keyup) {
        window.removeEventListener("keyup", this._keyup);
        this._keyup = null;
      }
      if (this._mousedown) {
        window.removeEventListener("mousedown", this._mousedown);
        this._mousedown = null;
      }
      if (this._mouseup) {
        window.removeEventListener("mouseup", this._mouseup);
        this._mouseup = null;
      }
      if (this._dragMove) {
        document.removeEventListener("mousemove", this._dragMove);
        this._dragMove = null;
      }
      if (this._dragUp) {
        document.removeEventListener("mouseup", this._dragUp);
        this._dragUp = null;
      }
      if (this._el) {
        this._el.remove();
        this._el = null;
      }
      this._mouseDown = false;
      this._rightMouseDown = false;
    },
  });

  registerMod({
    id: "directionhud",
    name: "Direction HUD",
    category: ["hud", "new"],
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-brand-safari"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M8 16l2 -6l6 -2l-2 6l-6 2" /><path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /></svg>`,
    hasOptions: true,

    _canvas: null,
    _ctx: null,
    _tick: null,
    _lastYaw: -1,
    _lastSize: -1,
    _lastVisible: null,
    _lastW: 0,
    _lastH: 0,

    init() {
      waitForBody(() => {
        const canvas = document.createElement("canvas");
        canvas.id = "__cs_dirhud";
        canvas.style.cssText =
          "position:fixed;" +
          "top:0;" +
          "left:0;" +
          "width:100vw;" +
          "height:100vh;" +
          "pointer-events:none;" +
          "z-index:99998;" +
          "display:none;";
        document.body.appendChild(canvas);

        this._canvas = canvas;
        this._ctx = canvas.getContext("2d");

        const c = this._ctx;
        if (!c) return;

        const DIRS = [
          { label: "N", deg: 0, major: true },
          { label: "NE", deg: 45, major: true },
          { label: "E", deg: 90, major: true },
          { label: "SE", deg: 135, major: true },
          { label: "S", deg: 180, major: true },
          { label: "SW", deg: 225, major: true },
          { label: "W", deg: 270, major: true },
          { label: "NW", deg: 315, major: true },
          { label: "15", deg: 15, major: false },
          { label: "30", deg: 30, major: false },
          { label: "60", deg: 60, major: false },
          { label: "75", deg: 75, major: false },
          { label: "105", deg: 105, major: false },
          { label: "120", deg: 120, major: false },
          { label: "150", deg: 150, major: false },
          { label: "165", deg: 165, major: false },
          { label: "195", deg: 195, major: false },
          { label: "210", deg: 210, major: false },
          { label: "240", deg: 240, major: false },
          { label: "255", deg: 255, major: false },
          { label: "285", deg: 285, major: false },
          { label: "300", deg: 300, major: false },
          { label: "330", deg: 330, major: false },
          { label: "345", deg: 345, major: false },
        ];

        const normalizeYaw = (deg) => {
          deg %= 360;
          if (deg < 0) deg += 360;
          return deg;
        };

        const getPlayerYaw = (player) => {
          if (!player) return 0;
          const rotation = player.rotation;
          if (rotation == null) return 0;
          let value = null;
          if (typeof rotation === "number") value = rotation;
          else if (typeof rotation === "object") {
            if (typeof rotation.y === "number") value = rotation.y;
            else if (typeof rotation.x === "number") value = rotation.x;
            else if (typeof rotation.z === "number") value = rotation.z;
          }
          if (typeof value !== "number" || !Number.isFinite(value)) return 0;
          if (Math.abs(value) <= Math.PI * 2 + 0.5)
            value = (value * 180) / Math.PI;
          return normalizeYaw(value);
        };

        const roundedRect = (c, x, y, w, h, r) => {
          r = Math.min(r, w / 2, h / 2);
          c.beginPath();
          c.moveTo(x + r, y);
          c.lineTo(x + w - r, y);
          c.quadraticCurveTo(x + w, y, x + w, y + r);
          c.lineTo(x + w, y + h - r);
          c.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
          c.lineTo(x + r, y + h);
          c.quadraticCurveTo(x, y + h, x, y + h - r);
          c.lineTo(x, y + r);
          c.quadraticCurveTo(x, y, x + r, y);
          c.closePath();
        };

        const resize = () => {
          const dpr = window.devicePixelRatio || 1;
          const width = window.innerWidth;
          const height = window.innerHeight;
          canvas.width = Math.round(width * dpr);
          canvas.height = Math.round(height * dpr);
          canvas.style.width = width + "px";
          canvas.style.height = height + "px";
          c.setTransform(dpr, 0, 0, dpr, 0, 0);
          this._lastYaw = -1;
        };

        resize();
        window.addEventListener("resize", resize);

        this._tick = Ticker.add(() => {
          const home = document.querySelector(".home");
          if (home) {
            if (this._lastVisible !== false) {
              canvas.style.display = "none";
              c.clearRect(0, 0, window.innerWidth, window.innerHeight);
              this._lastVisible = false;
            }
            return;
          }

          if (!cfg("directionhud.enabled")) {
            if (this._lastVisible !== false) {
              canvas.style.display = "none";
              c.clearRect(0, 0, window.innerWidth, window.innerHeight);
              this._lastVisible = false;
            }
            return;
          }

          if (this._lastVisible !== true) {
            canvas.style.display = "block";
            this._lastVisible = true;
          }

          const player = GameHooks.player;
          const yaw = getPlayerYaw(player);
          const size = parseFloat(cfg("directionhud.size")) || 1;

          const yawKey = Math.round(yaw * 10) / 10;
          if (yawKey === this._lastYaw && size === this._lastSize) return;

          this._lastYaw = yawKey;
          this._lastSize = size;

          const W = Math.round(300 * size);
          const H = Math.round(30 * size);
          const X = (window.innerWidth - W) / 2;
          const Y = 4;
          const centerX = X + W / 2;
          const range = 110;

          if (W !== this._lastW || H !== this._lastH) {
            this._lastW = W;
            this._lastH = H;
          }

          c.clearRect(0, 0, window.innerWidth, window.innerHeight);
          c.save();

          c.fillStyle = "rgba(15, 15, 18, 0.5)";
          roundedRect(c, X, Y, W, H, 0);
          c.fill();

          c.strokeStyle = "rgba(255,255,255,0.08)";
          c.lineWidth = 1;
          roundedRect(c, X, Y, W, H, 0);
          c.stroke();

          c.save();
          roundedRect(c, X, Y, W, H, 0);
          c.clip();

          DIRS.forEach((dir) => {
            let diff = dir.deg - yaw;
            while (diff > 180) diff -= 360;
            while (diff < -180) diff += 360;
            if (Math.abs(diff) > range / 2 + 20) return;

            const px = centerX + (diff / (range / 2)) * (W / 2);
            const isCardinal = dir.major;
            const fontSize = Math.round(isCardinal ? 12 * size : 9 * size);

            c.beginPath();
            c.moveTo(px, Y + H - (isCardinal ? 10 * size : 6 * size));
            c.lineTo(px, Y + H);
            c.strokeStyle = isCardinal
              ? "rgba(255,255,255,0.85)"
              : "rgba(255,255,255,0.35)";
            c.lineWidth = isCardinal ? 1.5 * size : 1 * size;
            c.stroke();

            c.font = `600 ${fontSize}px Inter, Arial, sans-serif`;
            c.textAlign = "center";
            c.textBaseline = "middle";
            c.fillStyle = isCardinal
              ? "rgba(255,255,255,0.95)"
              : "rgba(255,255,255,0.45)";
            c.fillText(dir.label, px, Y + H * 0.38);
          });

          c.restore();

          c.fillStyle = "#ffffff";
          const arrowW = 4 * size;
          const arrowH = 7 * size;

          c.beginPath();
          c.moveTo(centerX - arrowW, Y + H + 9 * size);
          c.lineTo(centerX + arrowW, Y + H + 9 * size);
          c.lineTo(centerX, Y + H + 9 * size - arrowH);
          c.closePath();
          c.fill();

          c.font = `600 ${Math.round(12 * size)}px Inter, Arial, sans-serif`;
          c.textAlign = "center";
          c.textBaseline = "top";
          c.fillStyle = "#fff";
          c.fillText(`${Math.round(yaw)}`, centerX, Y + H + 12 * size);

          c.restore();
        }, 0);
      });
    },

    apply() {
      this._lastYaw = -1;
    },

    options: {
      render() {
        return `
         <div class="mod-description">
                Compass that shows the direction you are facing
            </div>
            <div class="settings-section-title">
                <span>General</span>
                <div></div>
            </div>
                <div class="setting-row">
                    <label>Size</label>
                    <div class="setting-inline">
                        <input
                            type="range"
                            id="copt-dh-size"
                            min=".5"
                            max="2"
                            step=".05"
                            value="${cfg("directionhud.size")}"
                        >
                        <div
                            class="range-val"
                            id="copt-dh-size-val"
                        >
                            ${parseFloat(cfg("directionhud.size")).toFixed(2)}x
                        </div>
                    </div>
                </div>
            `;
      },
      bind() {
        bindSlider(
          "copt-dh-size",
          "copt-dh-size-val",
          "directionhud.size",
          (v) => parseFloat(v).toFixed(2) + "x",
          parseFloat,
        );
      },
    },
  });

  registerMod({
    id: "autogg",
    name: "Auto GG",
    category: ["utilities", "new"],
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-heart"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" /></svg>`,
    hasOptions: true,

    lastGG: 0,
    currentServer: null,
    originalListener: null,
    wrappedListener: null,
    checkTick: null,

    init() {
      this.checkTick = Ticker.add(() => {
        this.checkServer();
      }, 250);
      this.checkServer();
    },

    checkServer() {
      const world = GameHooks.gameWorld;
      if (!world) return;
      const server = world.server;
      if (!server || !server.msgsListeners) return;
      if (server === this.currentServer) return;
      this.restoreListener();
      this.currentServer = server;
      this.installListener(server);
    },

    installListener(server) {
      const packetId = Packets.toClient.GAME_END;
      const original = server.msgsListeners[packetId];

      this.originalListener = original;

      this.wrappedListener = (...args) => {
        original(...args);

        if (Date.now() - this.lastGG < 3000) return;
        this.lastGG = Date.now();

        setTimeout(() => {
          const world = GameHooks.gameWorld;
          const currentServer = world ? world.server : null;
          if (!currentServer) return;
          currentServer.sendData(Packets.toServer.CHAT, "gg");
        }, 500);
      };

      server.msgsListeners[packetId] = this.wrappedListener;
    },

    restoreListener() {
      if (
        this.currentServer &&
        this.currentServer.msgsListeners &&
        this.originalListener &&
        this.wrappedListener
      ) {
        const packetId = Packets.toClient.GAME_END;
        if (
          this.currentServer.msgsListeners[packetId] === this.wrappedListener
        ) {
          this.currentServer.msgsListeners[packetId] = this.originalListener;
        }
      }

      this.originalListener = null;
      this.wrappedListener = null;
      this.currentServer = null;
    },

    options: {
      render() {
        return `
          <div class="mod-description">
            Automatically sends "gg" in chat when a game ends
          </div>
        `;
      },
      bind() {},
    },

    destroy() {
      if (this.checkTick) {
        Ticker.remove(this.checkTick);
        this.checkTick = null;
      }
      this.restoreListener();
    },
  });

  registerMod({
    id: "textures",
    name: "Texture Pack",
    category: ["visuals"],
    icon: `<rect x="3" y="3" width="18" height="18" rx="2"/>
           <circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>`,
    hasOptions: true,
    init() {},
    apply() {},
    options: {
      render() {
        const pack = cfg("textures.pack") || {};
        const count = Object.keys(pack).length;
        return `
        <div class="mod-description">
                Changes the textures of blocks and images of items
            </div>
            <div class="settings-section-title">
                <span>General</span>
                <div></div>
            </div>
                <div class="setting-row">
                    <label>Status</label>
                    <span id="tex-status" style="font-size:12px;color:${count > 0 ? "var(--enabled)" : "var(--grey-2)"};">
                        ${count > 0 ? count + " textures loaded" : "No pack loaded"}
                    </span>
                </div>
                <div class="setting-row">
                    <label>Upload</label>
                    <div style="display:flex;gap:6px;">
                        <button class="opt-btn" id="tex-upload">Upload .txt</button>
                        <button class="opt-btn" id="tex-browse">Browse</button>
                        <button class="opt-btn" id="tex-reset" style="color:#e05252;border-color:#e05252;">Reset</button>
                    </div>
                </div>
                <div id="tex-browse-panel" style="display:none;flex-direction:column;gap:8px;margin-top:4px;">
                    <div style="display:flex;align-items:center;justify-content:space-between;">
                        <span style="font-size:13px;color:var(--grey-1);font-weight:600;">Browse Packs</span>
                    </div>
                    <div id="tex-browse-list" style="display:grid;grid-template-columns:repeat(2, 1fr);gap:8px;max-height:260px;overflow-y:auto;"></div>
                </div>`;
      },
      bind() {
        const statusEl = byId("tex-status");
        const mainRows = document.querySelectorAll(
          "#__cs_options_body .setting-row, " +
            "#__cs_options_body .mod-description, " +
            "#__cs_options_body .settings-section-title",
        );
        const browsePanel = byId("tex-browse-panel");
        const browseList = byId("tex-browse-list");

        function updateStatus(count) {
          if (!statusEl) return;
          statusEl.textContent =
            count > 0 ? count + " textures loaded" : "No pack loaded";
          statusEl.style.color = count > 0 ? "var(--enabled)" : "var(--grey-2)";
        }

        function showMain() {
          mainRows.forEach((r) => (r.style.display = ""));
          if (browsePanel) browsePanel.style.display = "none";
        }

        function showBrowse() {
          mainRows.forEach((r) => (r.style.display = "none"));
          if (browsePanel) browsePanel.style.display = "flex";
        }

        byId("tex-upload").addEventListener("click", () => {
          const inp = document.createElement("input");
          inp.type = "file";
          inp.accept = ".txt";
          inp.onchange = (e) => {
            const file = e.target.files[0];
            if (!file) return;
            file.text().then((text) => {
              const pack = {};
              let loaded = 0;
              for (const line of text.split("\n")) {
                const idx = line.indexOf(">");
                if (idx === -1) continue;
                const k = line.slice(0, idx).trim();
                const v = line.slice(idx + 1).trim();
                if (k && v) {
                  pack[k] = v;
                  loaded++;
                }
              }
              cfgSet("textures.pack", pack);
              updateStatus(loaded);
            });
          };
          inp.click();
        });

        byId("tex-reset").addEventListener("click", () => {
          cfgSet("textures.pack", {});
          updateStatus(0);
        });

        byId("tex-browse").addEventListener("click", async () => {
          showBrowse();
          browseList.innerHTML =
            '<div style="font-size:11px;color:var(--grey-2);text-align:center;padding:16px;">Loading…</div>';
          try {
            const res = await fetch(
              `https://celestarminefun.github.io/client/texturepacks.json?t=${Date.now()}`,
            );
            const packs = await res.json();
            browseList.innerHTML = "";
            if (!packs.length) {
              browseList.innerHTML =
                '<div style="font-size:11px;color:var(--grey-2);text-align:center;padding:16px;">No packs yet</div>';
              return;
            }
            packs.forEach((p) => {
              const card = document.createElement("div");
              card.style.cssText =
                "background:var(--background-4);border:1px solid var(--border-2);border-radius:6px;overflow:hidden;width:100%;";
              card.innerHTML = `
                            <div style="width:100%;height:80px;background:var(--background-1);overflow:hidden;">
                                <img src="${p.preview}" style="width:100%;height:100%;object-fit:cover;" onerror="this.style.display='none'">
                            </div>
                            <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 10px;">
                                <div>
                                    <div style="font-size:12px;font-weight:600;color:var(--white);">${escHtml(p.name)}</div>
                                    <div style="font-size:10px;color:var(--grey-2);margin-top:2px;">by ${escHtml(p.creator)}</div>
                                </div>
                                <button class="opt-btn tex-install"
                                    style="font-size:11px;padding:4px 10px;background:var(--enabled);border-color:var(--enabled-hover);">
                                    Install
                                </button>
                            </div>`;
              const btn = card.querySelector(".tex-install");
              btn.addEventListener("click", async () => {
                btn.textContent = "Installing…";
                btn.disabled = true;
                try {
                  const r = await fetch(p.file);
                  const text = await r.text();
                  const pack = {};
                  let loaded = 0;
                  for (const line of text.split("\n")) {
                    const idx = line.indexOf(">");
                    if (idx === -1) continue;
                    const k = line.slice(0, idx).trim();
                    const v = line.slice(idx + 1).trim();
                    if (k && v) {
                      pack[k] = v;
                      loaded++;
                    }
                  }
                  cfgSet("textures.pack", pack);
                  cfgSet("textures.enabled", true);
                  updateStatus(loaded);
                  const card = document.querySelector(
                    `#__cs_menu .card[data-mod="textures"]`,
                  );
                  if (card) {
                    card.classList.add("enabled");
                    const tb = card.querySelector(".toggle-btn");
                    if (tb) tb.textContent = "Enabled";
                  }
                  btn.textContent = "Installed ✓";
                  showMain();
                } catch (err) {
                  btn.textContent = "Failed";
                  btn.disabled = false;
                }
              });
              browseList.appendChild(card);
            });
          } catch (err) {
            browseList.innerHTML =
              '<div style="font-size:11px;color:#e05252;text-align:center;padding:16px;">Failed to load</div>';
          }
        });

        byId("tex-browse-back").addEventListener("click", showMain);
      },
    },
  });

  registerMod({
    id: "hidearm",
    name: "Hide Arm",
    category: ["visuals", "new"],
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-device-watch-off"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M10 6h5a3 3 0 0 1 3 3v5m-.89 3.132a2.99 2.99 0 0 1 -2.11 .868h-6a3 3 0 0 1 -3 -3v-6c0 -.817 .327 -1.559 .857 -2.1" /><path d="M9 18v3h6v-3" /><path d="M9 5v-2h6v3" /><path d="M3 3l18 18" /></svg>`,
    hasOptions: true,
    _arms: null,
    _tick: null,

    _fetchArms() {
      try {
        const systems = GameHooks.systems;
        if (!systems) return false;
        const sys = systems.find((s) => s.arms && s.rightArmDown);
        if (!sys.arms) return false;
        this._arms = sys.arms;
        return true;
      } catch (e) {
        return false;
      }
    },

    init() {
      this._tick = Ticker.add(() => {
        if (!this._arms || !this._arms.parent) {
          this._arms = null;
          this._fetchArms();
        }
        if (this._arms) {
          const shouldBeVisible = !cfg("hidearm.enabled");
          if (this._arms.visible !== shouldBeVisible) {
            this._arms.visible = shouldBeVisible;
          }
        }
      }, 0);
    },

    apply() {
      if (!cfg("hidearm.enabled") && this._arms) {
        this._arms.visible = true;
        this._arms = null;
      }
    },

    options: {
      render() {
        return `
      <div class="mod-description">
        Hides your first-person arm from view
      </div>
    `;
      },
      bind() {},
    },

    destroy() {
      if (this._tick) {
        Ticker.remove(this._tick);
        this._tick = null;
      }
      this._arms = null;
    },
  });

  registerMod({
    id: "fps",
    name: "FPS",
    category: ["hud"],
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-device-laptop"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 19l18 0" /><path d="M5 7a1 1 0 0 1 1 -1h12a1 1 0 0 1 1 1v8a1 1 0 0 1 -1 1h-12a1 1 0 0 1 -1 -1l0 -8" /></svg>`,
    hasOptions: true,

    _el: null,
    _editMode: false,
    _fps: 0,
    _frames: 0,
    _lastSecond: 0,
    _tick: null,
    _valEl: null,
    _labelEl: null,
    _lastColor: null,
    _lastDisplay: null,

    _inGame() {
      return !!document.querySelector(
        ".game-canvas, #game, canvas[data-engine]",
      );
    },

    _buildDOM() {
      if (this._el) return;

      const el = document.createElement("div");
      el.id = "__cs_fps";
      el.style.cssText = `
      position: fixed;
      z-index: 99990;
      display: none;
      align-items: center;
      gap: 5px;
      transform-origin: top left;
      user-select: none;
      background: #00000088;
      border-radius: 6px;
      padding: 4px 9px;
      font-family: sans-serif;
      font-size: 13px;
      font-weight: 700;
      color: #e6f1ff;
      white-space: nowrap;
      border: 1px solid transparent;
      box-sizing: border-box;
    `;

      el.innerHTML = `
      <span
        id="__cs_fps_label"
        style="
          font-size:10px;
          font-weight:600;
          text-transform:uppercase;
          letter-spacing:.5px;
        "
      >FPS</span>

      <span id="__cs_fps_val">0</span>
    `;

      document.body.appendChild(el);
      this._el = el;
      this._labelEl = el.querySelector("#__cs_fps_label");
      this._valEl = el.querySelector("#__cs_fps_val");

      this._setupDrag();
    },

    _setupDrag() {
      let dragging = false;
      let dragStart = {};

      this._el.addEventListener("mousedown", (e) => {
        if (!this._editMode) return;
        e.preventDefault();
        dragging = true;
        dragStart = {
          mx: e.clientX,
          my: e.clientY,
          ex: parseInt(this._el.style.left) || 0,
          ey: parseInt(this._el.style.top) || 0,
        };
      });

      document.addEventListener("mousemove", (e) => {
        if (!dragging) return;
        this._el.style.left = dragStart.ex + e.clientX - dragStart.mx + "px";
        this._el.style.top = dragStart.ey + e.clientY - dragStart.my + "px";
      });

      document.addEventListener("mouseup", () => {
        if (!dragging) return;
        dragging = false;
        cfgSet("fps.x", parseInt(this._el.style.left) || 0);
        cfgSet("fps.y", parseInt(this._el.style.top) || 0);
      });
    },

    setEditMode(on) {
      this._editMode = on;
      if (!this._el) return;
      this._el.style.outline = on ? "2px dashed #7b2fe6" : "none";
      this._el.style.cursor = on ? "move" : "default";
      this.apply();
    },

    init() {
      waitForBody(() => {
        this._buildDOM();
        this.apply();
        this._lastSecond = performance.now();

        this._tick = Ticker.add(() => {
          this._frames++;
          const now = performance.now();

          if (now - this._lastSecond >= 1000) {
            this._fps = Math.round(
              (this._frames * 1000) / (now - this._lastSecond),
            );
            this._frames = 0;
            this._lastSecond = now;

            if (this._valEl) {
              this._valEl.textContent = this._fps;

              let color;
              if (this._fps > 50) color = cfg("fps.highColor");
              else if (this._fps > 30) color = cfg("fps.mediumColor");
              else color = cfg("fps.lowColor");

              if (this._lastColor !== color) {
                this._valEl.style.color = color;
                this._lastColor = color;
              }
            }
          }

          if (this._el) {
            const shouldShow =
              !window.__celestarCleared &&
              cfg("fps.enabled") &&
              (this._inGame() || this._editMode);
            const d = shouldShow ? "flex" : "none";
            if (this._lastDisplay !== d) {
              this._el.style.display = d;
              this._lastDisplay = d;
            }
          }
        }, 0);
      });
    },

    apply() {
      if (!this._el) return;

      const scale = cfg("fps.scale") || 1.0;
      const borderEnabled = cfg("fps.border");
      const borderWidth = cfg("fps.borderWidth") || 1;
      const borderRadius =
        cfg("fps.borderRadius") == null ? 6 : cfg("fps.borderRadius");
      const background = cfg("fps.backgroundColor") || "#00000088";
      const borderColor = cfg("fps.borderColor") || "#ffffff";
      const labelColor = cfg("fps.labelColor") || "#e6f1ff";

      this._el.style.left = (cfg("fps.x") || 20) + "px";
      this._el.style.top = (cfg("fps.y") || 20) + "px";
      this._el.style.transform = `scale(${scale})`;
      this._el.style.background = background;
      this._el.style.border = borderEnabled
        ? `${borderWidth}px solid ${borderColor}`
        : "none";
      this._el.style.borderRadius = `${borderRadius}px`;
      this._el.style.boxShadow = cfg("fps.shadow")
        ? "0 2px 8px #00000066"
        : "none";

      if (this._labelEl) this._labelEl.style.color = labelColor;

      this._lastColor = null;
    },

    options: {
      render() {
        const scale = cfg("fps.scale") || 1.0;

        const colorInput = (id, key) => `
        <div class="setting-inline">
          <input
            type="color"
            id="${id}-picker"
            value="${cfg(key)}"
          >
          <input
            type="text"
            id="${id}"
            class="cs-textbox"
            value="${cfg(key)}"
          >
        </div>
      `;

        return `
        <div class="mod-description">
          Displays your frames per second on the HUD
        </div>

        <div class="settings-section-title">
          <span>General</span>
          <div></div>
        </div>

         <div class="setting-row">
          <label>Shadow</label>
          ${optToggle("fps-shadow", cfg("fps.shadow"))}
        </div>

        <div class="setting-row">
          <label>Border</label>
          ${optToggle("fps-border", cfg("fps.border"))}
        </div>

        <div class="setting-row">
          <label>Border Width</label>
          <div class="setting-inline">
            <input
              type="range"
              id="fps-border-width"
              min="0"
              max="5"
              step="1"
              value="${cfg("fps.borderWidth")}"
            >
            <div
              class="range-val"
              id="fps-border-width-val"
            >
              ${cfg("fps.borderWidth")}px
            </div>
          </div>
        </div>

        <div class="setting-row">
          <label>Border Radius</label>
          <div class="setting-inline">
            <input
              type="range"
              id="fps-border-radius"
              min="0"
              max="16"
              step="1"
              value="${cfg("fps.borderRadius")}"
            >
            <div
              class="range-val"
              id="fps-border-radius-val"
            >
              ${cfg("fps.borderRadius")}px
            </div>
          </div>
        </div>

        <div class="setting-row">
          <label>Size</label>
          <div class="setting-inline">
            <input
              type="range"
              id="fps-scale"
              min=".5"
              max="3"
              step=".05"
              value="${scale}"
            >
            <div
              class="range-val"
              id="fps-scale-val"
            >
              ${parseFloat(scale).toFixed(2)}x
            </div>
          </div>
        </div>

        <div class="setting-row">
          <label>Position</label>
          <div style="display:flex;gap:6px;">
            <button
              class="opt-btn"
              id="fps-edit-btn"
            >
              Edit Mode
            </button>

            <button
              class="opt-btn"
              id="fps-edit-done"
              style="display:none;"
            >
              Save
            </button>
          </div>
        </div>

        <div class="settings-section-title">
          <span>Colors</span>
          <div></div>
        </div>

         <div class="setting-row">
          <label>Background</label>
          ${colorInput("fps-background", "fps.backgroundColor")}
        </div>

        <div class="setting-row">
          <label>Border</label>
          ${colorInput("fps-border-color", "fps.borderColor")}
        </div>

        <div class="setting-row">
          <label>Text ("FPS")</label>
          ${colorInput("fps-label-color", "fps.labelColor")}
        </div>

        <div class="setting-row">
          <label>Text (High FPS)</label>
          ${colorInput("fps-high-color", "fps.highColor")}
        </div>

        <div class="setting-row">
          <label>Text (Medium FPS)</label>
          ${colorInput("fps-medium-color", "fps.mediumColor")}
        </div>

        <div class="setting-row">
          <label>Text (Low FPS)</label>
          ${colorInput("fps-low-color", "fps.lowColor")}
        </div>
      `;
      },

      bind() {
        const mod = MODS_BY_ID.get("fps");

        bindSlider(
          "fps-scale",
          "fps-scale-val",
          "fps.scale",
          (v) => parseFloat(v).toFixed(2) + "x",
          parseFloat,
          () => mod.apply(),
        );

        bindSlider(
          "fps-border-width",
          "fps-border-width-val",
          "fps.borderWidth",
          (v) => `${parseInt(v)}px`,
          parseInt,
          () => mod.apply(),
        );

        bindSlider(
          "fps-border-radius",
          "fps-border-radius-val",
          "fps.borderRadius",
          (v) => `${parseInt(v)}px`,
          parseInt,
          () => mod.apply(),
        );

        bindToggle("fps-border", "fps.border", () => mod.apply());
        bindToggle("fps-shadow", "fps.shadow", () => mod.apply());

        const colors = [
          ["fps-background", "fps.backgroundColor"],
          ["fps-border-color", "fps.borderColor"],
          ["fps-label-color", "fps.labelColor"],
          ["fps-high-color", "fps.highColor"],
          ["fps-medium-color", "fps.mediumColor"],
          ["fps-low-color", "fps.lowColor"],
        ];

        colors.forEach(([id, key]) => {
          const text = byId(id);
          const picker = byId(`${id}-picker`);

          picker.addEventListener("input", () => {
            const value = picker.value.toUpperCase();
            text.value = value;
            cfgSet(key, value);
            mod.apply();
          });

          text.addEventListener("change", () => {
            let value = text.value.trim();
            if (!/^#[0-9A-Fa-f]{6}$/.test(value)) return;
            value = value.toUpperCase();
            text.value = value;
            if (picker) picker.value = value;
            cfgSet(key, value);
            mod.apply();
          });
        });

        const editBtn = byId("fps-edit-btn");
        const doneBtn = byId("fps-edit-done");

        editBtn.addEventListener("click", () => {
          mod.setEditMode(true);
          editBtn.style.display = "none";
          doneBtn.style.display = "";
        });

        doneBtn.addEventListener("click", () => {
          mod.setEditMode(false);
          editBtn.style.display = "";
          doneBtn.style.display = "none";
        });
      },
    },

    destroy() {
      if (this._tick) {
        Ticker.remove(this._tick);
        this._tick = null;
      }
      if (this._el) {
        this._el.remove();
        this._el = null;
      }
      this._valEl = null;
      this._labelEl = null;
    },
  });

  registerMod({
    id: "cps",
    name: "CPS",
    category: ["hud"],
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-mouse-2"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M6 7a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v10a4 4 0 0 1 -4 4h-4a4 4 0 0 1 -4 -4l0 -10" /><path d="M12 3v7" /><path d="M6 10h12" /></svg>`,
    hasOptions: true,

    _el: null,
    _editMode: false,
    _tick: null,
    _valEl: null,
    _labelEl: null,
    _lastText: null,
    _lastColor: null,
    _lastDisplay: null,

    _inGame() {
      return !!document.querySelector(
        ".game-canvas, #game, canvas[data-engine]",
      );
    },

    _buildDOM() {
      if (this._el) return;

      const el = document.createElement("div");
      el.id = "__cs_cps";
      el.style.cssText = `
      position: fixed;
      z-index: 99990;
      display: none;
      align-items: center;
      gap: 5px;
      transform-origin: top left;
      user-select: none;
      background: #00000088;
      border-radius: 6px;
      padding: 4px 9px;
      font-family: sans-serif;
      font-size: 13px;
      font-weight: 700;
      color: #e6f1ff;
      white-space: nowrap;
      border: 1px solid transparent;
      box-sizing: border-box;
    `;

      el.innerHTML = `
      <span
        id="__cs_cps_label"
        style="
          font-size:10px;
          font-weight:600;
          text-transform:uppercase;
          letter-spacing:.5px;
        "
      >CPS</span>

      <span id="__cs_cps_count">0</span>
    `;

      document.body.appendChild(el);
      this._el = el;
      this._labelEl = el.querySelector("#__cs_cps_label");
      this._valEl = el.querySelector("#__cs_cps_count");

      this._setupDrag();
    },

    _setupDrag() {
      let dragging = false;
      let dragStart = {};

      this._el.addEventListener("mousedown", (e) => {
        if (!this._editMode) return;
        e.preventDefault();
        dragging = true;
        dragStart = {
          mx: e.clientX,
          my: e.clientY,
          ex: parseInt(this._el.style.left) || 0,
          ey: parseInt(this._el.style.top) || 0,
        };
      });

      document.addEventListener("mousemove", (e) => {
        if (!dragging) return;
        this._el.style.left = dragStart.ex + e.clientX - dragStart.mx + "px";
        this._el.style.top = dragStart.ey + e.clientY - dragStart.my + "px";
      });

      document.addEventListener("mouseup", () => {
        if (!dragging) return;
        dragging = false;
        cfgSet("cps.x", parseInt(this._el.style.left) || 0);
        cfgSet("cps.y", parseInt(this._el.style.top) || 0);
      });
    },

    setEditMode(on) {
      this._editMode = on;
      if (!this._el) return;
      this._el.style.outline = on ? "2px dashed #7b2fe6" : "none";
      this._el.style.cursor = on ? "move" : "default";
      this.apply();
    },

    init() {
      waitForBody(() => {
        this._buildDOM();
        this.apply();

        this._tick = Ticker.add(() => {
          const now = performance.now();
          const win = 1000;

          while (G.lmbClicks.length && G.lmbClicks[0] < now - win) {
            G.lmbClicks.shift();
          }
          while (G.rmbClicks.length && G.rmbClicks[0] < now - win) {
            G.rmbClicks.shift();
          }

          const shouldShow =
            !window.__celestarCleared &&
            cfg("cps.enabled") &&
            (this._inGame() || this._editMode);

          if (this._el) {
            const d = shouldShow ? "flex" : "none";
            if (this._lastDisplay !== d) {
              this._el.style.display = d;
              this._lastDisplay = d;
            }
          }

          if (!shouldShow) return;

          const leftCPS = G.lmbClicks.length;
          const rightCPS = G.rmbClicks.length;

          if (this._valEl) {
            const txt = cfg("cps.showBothMouses")
              ? `${leftCPS} | ${rightCPS}`
              : String(leftCPS + rightCPS);

            if (this._lastText !== txt) {
              this._valEl.textContent = txt;
              this._lastText = txt;
            }

            const color = cfg("cps.numberColor");
            if (this._lastColor !== color) {
              this._valEl.style.color = color;
              this._lastColor = color;
            }
          }
        }, 0);
      });
    },

    apply() {
      if (!this._el) return;

      const scale = cfg("cps.scale") || 1.0;
      const borderEnabled = cfg("cps.border");
      const borderWidth = cfg("cps.borderWidth") || 1;
      const borderRadius =
        cfg("fps.borderRadius") == null ? 6 : cfg("fps.borderRadius");

      this._el.style.left = (cfg("cps.x") || 20) + "px";
      this._el.style.top = (cfg("cps.y") || 50) + "px";
      this._el.style.transform = `scale(${scale})`;
      this._el.style.background = cfg("cps.backgroundColor") || "#00000088";
      this._el.style.border = borderEnabled
        ? `${borderWidth}px solid ${cfg("cps.borderColor")}`
        : "none";
      this._el.style.borderRadius = `${borderRadius}px`;
      this._el.style.boxShadow = cfg("cps.shadow")
        ? "0 2px 8px #00000066"
        : "none";

      if (this._labelEl) {
        this._labelEl.style.color = cfg("cps.labelColor");
      }

      this._lastColor = null;
    },

    options: {
      render() {
        const scale = cfg("cps.scale") || 1.0;

        const colorInput = (id, key) => `
        <div class="setting-inline">
          <input
            type="color"
            id="${id}-picker"
            value="${cfg(key)}"
          >
          <input
            type="text"
            id="${id}"
            class="cs-textbox"
            value="${cfg(key)}"
          >
        </div>
      `;

        return `
        <div class="mod-description">
          Displays your clicks per second on the HUD
        </div>

        <div class="settings-section-title">
          <span>General</span>
          <div></div>
        </div>

        <div class="setting-row">
          <label>Separate LMB/RMB</label>
          ${optToggle("cps-both-mouses", cfg("cps.showBothMouses"))}
        </div>

        <div class="setting-row">
          <label>Shadow</label>
          ${optToggle("cps-shadow", cfg("cps.shadow"))}
        </div>

        <div class="setting-row">
          <label>Border</label>
          ${optToggle("cps-border", cfg("cps.border"))}
        </div>
        <div class="setting-row">
          <label>Border Width</label>
          <div class="setting-inline">
            <input
              type="range"
              id="cps-border-width"
              min="0"
              max="5"
              step="1"
              value="${cfg("cps.borderWidth")}"
            >

            <div
              class="range-val"
              id="cps-border-width-val"
            >
              ${cfg("cps.borderWidth")}px
            </div>
          </div>
        </div>

        <div class="setting-row">
          <label>Border Radius</label>
          <div class="setting-inline">
            <input
              type="range"
              id="cps-border-radius"
              min="0"
              max="16"
              step="1"
              value="${cfg("cps.borderRadius")}"
            >

            <div
              class="range-val"
              id="cps-border-radius-val"
            >
              ${cfg("cps.borderRadius")}px
            </div>
          </div>
        </div>

        <div class="setting-row">
          <label>Size</label>
          <div class="setting-inline">
            <input
              type="range"
              id="cps-scale"
              min=".5"
              max="3"
              step=".05"
              value="${scale}"
            >

            <div
              class="range-val"
              id="cps-scale-val"
            >
              ${parseFloat(scale).toFixed(2)}x
            </div>
          </div>
        </div>

        <div class="setting-row">
          <label>Position</label>
          <div style="display:flex;gap:6px;">
            <button
              class="opt-btn"
              id="cps-edit-btn"
            >
              Edit Mode
            </button>

            <button
              class="opt-btn"
              id="cps-edit-done"
              style="display:none;"
            >
              Save
            </button>
          </div>
        </div>

        <div class="settings-section-title">
          <span>Colors</span>
          <div></div>
        </div>

         <div class="setting-row">
          <label>Background</label>
          ${colorInput("cps-background", "cps.backgroundColor")}
        </div>

        <div class="setting-row">
          <label>Border</label>
          ${colorInput("cps-border-color", "cps.borderColor")}
        </div>

        <div class="setting-row">
          <label>Text ("CPS")</label>
          ${colorInput("cps-label-color", "cps.labelColor")}
        </div>

        <div class="setting-row">
          <label>Text (Value)</label>
          ${colorInput("cps-number-color", "cps.numberColor")}
        </div>

      `;
      },

      bind() {
        const mod = MODS_BY_ID.get("cps");

        bindSlider(
          "cps-scale",
          "cps-scale-val",
          "cps.scale",
          (v) => parseFloat(v).toFixed(2) + "x",
          parseFloat,
          () => mod.apply(),
        );

        bindSlider(
          "cps-border-width",
          "cps-border-width-val",
          "cps.borderWidth",
          (v) => `${parseInt(v)}px`,
          parseInt,
          () => mod.apply(),
        );

        bindSlider(
          "cps-border-radius",
          "cps-border-radius-val",
          "cps.borderRadius",
          (v) => `${parseInt(v)}px`,
          parseInt,
          () => mod.apply(),
        );

        bindToggle("cps-border", "cps.border", () => mod.apply());
        bindToggle("cps-shadow", "cps.shadow", () => mod.apply());
        bindToggle("cps-both-mouses", "cps.showBothMouses", () => mod.apply());

        const colors = [
          ["cps-background", "cps.backgroundColor"],
          ["cps-border-color", "cps.borderColor"],
          ["cps-label-color", "cps.labelColor"],
          ["cps-number-color", "cps.numberColor"],
        ];

        colors.forEach(([id, key]) => {
          const text = byId(id);
          const picker = byId(`${id}-picker`);

          picker.addEventListener("input", () => {
            const value = picker.value.toUpperCase();
            text.value = value;
            cfgSet(key, value);
            mod.apply();
          });

          text.addEventListener("change", () => {
            let value = text.value.trim();
            if (!/^#[0-9A-Fa-f]{6}$/.test(value)) return;
            value = value.toUpperCase();
            text.value = value;
            if (picker) picker.value = value;
            cfgSet(key, value);
            mod.apply();
          });
        });

        const editBtn = byId("cps-edit-btn");
        const doneBtn = byId("cps-edit-done");

        editBtn.addEventListener("click", () => {
          mod.setEditMode(true);
          editBtn.style.display = "none";
          doneBtn.style.display = "";
        });

        doneBtn.addEventListener("click", () => {
          mod.setEditMode(false);
          editBtn.style.display = "";
          doneBtn.style.display = "none";
        });
      },
    },

    destroy() {
      if (this._tick) {
        Ticker.remove(this._tick);
        this._tick = null;
      }
      if (this._el) {
        this._el.remove();
        this._el = null;
      }
      this._valEl = null;
      this._labelEl = null;
    },
  });

  registerMod({
    id: "clearscreen",
    name: "Clear Screen",
    category: ["visuals", "new"],
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-wash-dry"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 6a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v12a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3v-12" /></svg>`,
    hasOptions: true,

    _clean: false,
    _hidden: [],
    _style: null,
    _observer: null,
    _keyHandler: null,
    _enforceTick: null,

    _inGame() {
      return !!document.querySelector(
        ".game-canvas, #game, canvas[data-engine], canvas",
      );
    },

    _customUI: [
      "__cs_cps",
      "__cs_fps",
      "__cs_dirhud",
      "__cs_crosshair",
      "__cs_keystrokes",
    ],

    _hideElement(el) {
      if (!el || !el.isConnected) return;
      if (this._hidden.includes(el)) return;

      el.style.removeProperty("display");
      el.style.display = el.dataset.csDisplay || "";
      el.style.display = "none";

      this._hidden.push(el);
    },

    _shouldHide(el) {
      if (!el || el.nodeType !== 1) return false;
      if (el.tagName === "CANVAS") return false;
      if (el.closest("#__cs_menu")) return false;
      if (el.id === "minefun-fps-counter") return false;

      const s = getComputedStyle(el);

      return (
        (s.position === "fixed" || s.position === "absolute") &&
        s.display !== "none" &&
        s.visibility !== "hidden" &&
        parseFloat(s.opacity) > 0 &&
        !el.querySelector("canvas")
      );
    },

    _hideCustomUI() {
      this._customUI.forEach((id) => {
        const el = document.getElementById(id);
        if (!el || !el.isConnected) return;
        if (!this._hidden.includes(el)) {
          el.dataset.csDisplay = el.style.display || "";
          this._hidden.push(el);
        }
        el.style.setProperty("display", "none", "important");
      });
    },

    _hide() {
      this._hidden = [];
      document.querySelectorAll("body *").forEach((el) => {
        if (this._shouldHide(el)) this._hideElement(el);
      });
      this._hideCustomUI();
      this._style = document.createElement("style");
      this._style.id = "__cs_clear_screen";

      this._style.textContent = `
            img[src*="crosshair"],
            img[alt*="crosshair"],
            [class*="crosshair"],
            [id*="crosshair"] {
                display: none !important;
                visibility: hidden !important;
                opacity: 0 !important;
            }
        `;

      document.head.appendChild(this._style);
      window.__celestarCleared = true;
      this._clean = true;
    },

    _show() {
      this._hidden.forEach((el) => {
        if (!el.isConnected) return;
        el.style.display = el.dataset.csDisplay || "";
        delete el.dataset.csDisplay;
      });

      this._hidden = [];

      this._style.remove();
      this._style = null;

      window.__celestarCleared = false;
      this._clean = false;
    },

    toggle() {
      if (!this._inGame()) return;
      if (this._clean) this._show();
      else this._hide();
    },

    init() {
      this._keyHandler = (e) => {
        if (!cfg("clearscreen.enabled")) return;
        const keybind = cfg("clearscreen.keybind") || "KeyH";
        if (e.code !== keybind) return;

        if (
          e.ctrlKey ||
          e.altKey ||
          e.metaKey ||
          ["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)
        ) {
          return;
        }

        e.preventDefault();
        e.stopPropagation();
        this.toggle();
      };

      document.addEventListener("keydown", this._keyHandler);

      this._observer = new MutationObserver(() => {
        if (!this._clean) return;
        this._hideCustomUI();
        document.querySelectorAll("body *").forEach((el) => {
          if (this._shouldHide(el)) this._hideElement(el);
        });
      });

      this._observer.observe(document.body, {
        childList: true,
        subtree: true,
      });

      this._enforceTick = Ticker.add(() => {
        if (!this._clean) return;
        this._hideCustomUI();
      }, 50);
    },

    apply() {
      if (!cfg("clearscreen.enabled") && this._clean) {
        this._show();
      }
    },

    destroy() {
      this._observer.disconnect();
      this._observer = null;

      if (this._keyHandler) {
        document.removeEventListener("keydown", this._keyHandler);
        this._keyHandler = null;
      }

      if (this._enforceTick) {
        Ticker.remove(this._enforceTick);
        this._enforceTick = null;
      }

      this._show();
    },

    options: {
      render() {
        const keybind = cfg("clearscreen.keybind") || "KeyH";
        const displayKey = keybind
          .replace(/^Key/, "")
          .replace(/^Digit/, "")
          .replace("Space", "Space")
          .replace("ArrowUp", "↑")
          .replace("ArrowDown", "↓")
          .replace("ArrowLeft", "←")
          .replace("ArrowRight", "→");

        return `
        <div class="mod-description">
                Hides the HUD when keybind is held
            </div>
            <div class="settings-section-title">
                <span>General</span>
                <div></div>
            </div>
                <div class="setting-row">
                    <label>Keybind</label>

                    <div
                        class="keybind-box"
                        id="clearscreen-keybind"
                        tabindex="0"
                    >${displayKey}</div>
                </div>
            `;
      },

      bind() {
        const box = byId("clearscreen-keybind");
        if (!box) return;

        box.addEventListener("click", () => {
          if (box.classList.contains("listening")) return;

          box.textContent = "Press A Key";
          box.classList.add("listening");

          const handler = (e) => {
            e.preventDefault();
            e.stopPropagation();

            const key = e.code;

            cfgSet("clearscreen.keybind", key);
            const displayKey = key
              .replace(/^Key/, "")
              .replace(/^Digit/, "")
              .replace("ArrowUp", "↑")
              .replace("ArrowDown", "↓")
              .replace("ArrowLeft", "←")
              .replace("ArrowRight", "→");

            box.textContent = displayKey;
            box.classList.remove("listening");

            document.removeEventListener("keydown", handler, true);
          };

          document.addEventListener("keydown", handler, true);
        });
      },
    },
  });

  registerMod({
    id: "translator",
    name: "Chat Translator",
    category: ["utilities", "new"],
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-language-hiragana"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 5h7" /><path d="M7 4c0 4.846 0 7 .5 8" /><path d="M10 8.5c0 2.286 -2 4.5 -3.5 4.5s-2.5 -1.135 -2.5 -2c0 -2 1 -3 3 -3s5 .57 5 2.857c0 1.524 -.667 2.571 -2 3.143" /><path d="M12 20l4 -9l4 9" /><path d="M19.1 18h-6.2" /></svg>`,
    hasOptions: true,

    _observer: null,
    _cache: new Map(),
    _processing: new WeakSet(),

    _languages: {
      en: "English",
      es: "Spanish",
      fr: "French",
      de: "German",
      it: "Italian",
      pt: "Portuguese",
      ru: "Russian",
      ja: "Japanese",
      ko: "Korean",
      zh: "Chinese",
      ar: "Arabic",
      hi: "Hindi",
      tr: "Turkish",
      pl: "Polish",
      nl: "Dutch",
      sv: "Swedish",
      no: "Norwegian",
      da: "Danish",
      fi: "Finnish",
      cs: "Czech",
      ro: "Romanian",
      hu: "Hungarian",
      th: "Thai",
      vi: "Vietnamese",
      id: "Indonesian",
    },

    _inGame() {
      return !!document.querySelector("canvas");
    },

    _translateURL(text, language) {
      return (
        "https://translate.googleapis.com/translate_a/single" +
        "?client=gtx" +
        "&sl=auto" +
        "&tl=" +
        encodeURIComponent(language) +
        "&dt=t" +
        "&q=" +
        encodeURIComponent(text)
      );
    },

    async _translate(text) {
      const language = cfg("translator.language") || "en";
      const cacheKey = language + ":" + text;

      if (this._cache.has(cacheKey)) return this._cache.get(cacheKey);

      try {
        const response = await fetch(this._translateURL(text, language));
        if (!response.ok) throw new Error("HTTP " + response.status);

        const data = await response.json();
        if (!data[0]) return null;

        let translated = "";
        for (const part of data[0]) {
          if (part[0]) translated += part[0];
        }

        if (!translated) return null;

        const result = { translated, sourceLang: data[2] || "unknown" };
        this._cache.set(cacheKey, result);
        return result;
      } catch (err) {
        console.warn("[Celestar] Translation failed:", err);
        return null;
      }
    },

    _addBadge(textEl) {
      if (textEl.querySelector(".cs-translation-badge")) return;

      const badge = document.createElement("span");
      badge.className = "cs-translation-badge";
      badge.textContent = "Translated";

      badge.style.cssText = `
            display: inline-block;
            margin-left: 5px;
            padding: 1px 4px;
            border-radius: 3px;
            border: 1px solid rgba(123,47,230,.45);
            background: rgba(123,47,230,.15);
            color: #b98cff;
            font-size: 9px;
            font-weight: 700;
            line-height: 1.4;
            user-select: none;
            vertical-align: middle;
            pointer-events: none;
        `;

      textEl.appendChild(document.createTextNode(" "));
      textEl.appendChild(badge);
    },

    async _processMessage(message) {
      if (!cfg("translator.enabled")) return;
      if (!message || !message.isConnected) return;

      const nameEl = message.querySelector(":scope > .name");
      const textEl = message.querySelector(":scope > .text");

      if (!nameEl || !textEl) return;
      if (message.dataset.csTranslated) return;
      if (this._processing.has(message)) return;

      const original = textEl.textContent.trim();
      if (!original || original.length < 2) {
        message.dataset.csTranslated = "skip";
        return;
      }

      this._processing.add(message);
      const result = await this._translate(original);
      this._processing.delete(message);

      if (!result) {
        message.dataset.csTranslated = "error";
        return;
      }

      const targetLanguage = (cfg("translator.language") || "en").toLowerCase();
      const sourceLanguage = (result.sourceLang || "unknown").toLowerCase();

      if (sourceLanguage === targetLanguage) {
        message.dataset.csTranslated = "same";
        return;
      }

      const translated = result.translated.trim();
      if (!translated || translated.toLowerCase() === original.toLowerCase()) {
        message.dataset.csTranslated = "same";
        return;
      }

      textEl.textContent = translated;
      this._addBadge(textEl);
      message.dataset.csTranslated = "done";
    },

    _scan() {
      if (!cfg("translator.enabled")) return;
      if (!this._inGame()) return;

      document
        .querySelectorAll(".chat .messages .message")
        .forEach((message) => {
          this._processMessage(message);
        });
    },

    _clearTranslations() {
      document
        .querySelectorAll(".chat .messages .message[data-cs-translated]")
        .forEach((message) => {
          const textEl = message.querySelector(":scope > .text");
          const original = message.dataset.csOriginal;

          if (textEl && original) textEl.textContent = original;

          message.querySelector(".cs-translation-badge").remove();

          delete message.dataset.csTranslated;
          delete message.dataset.csOriginal;
          delete message.dataset.csTranslation;
          delete message.dataset.csSourceLang;
        });

      this._cache.clear();
    },

    init() {
      this._observer = new MutationObserver((mutations) => {
        if (!cfg("translator.enabled")) return;

        for (const mutation of mutations) {
          if (mutation.type !== "childList") continue;

          for (const node of mutation.addedNodes) {
            if (node.nodeType !== Node.ELEMENT_NODE) continue;

            if (node.matches(".chat .messages .message")) {
              this._processMessage(node);
            }

            node
              .querySelectorAll(".chat .messages .message")
              .forEach((message) => {
                this._processMessage(message);
              });
          }
        }
      });

      this._observer.observe(document.body, {
        childList: true,
        subtree: true,
      });

      this._scan();
    },

    apply() {
      if (!cfg("translator.enabled")) {
        this._clearTranslations();
        return;
      }
      this._clearTranslations();
      this._scan();
    },

    destroy() {
      this._observer.disconnect();
      this._observer = null;
      this._clearTranslations();
      this._cache.clear();
    },

    options: {
      render() {
        const mod = MODS_BY_ID.get("translator");
        const language = cfg("translator.language") || "en";

        let options = "";
        for (const [code, name] of Object.entries(mod._languages || {})) {
          options += `
                    <option
                        value="${code}"
                        ${code === language ? "selected" : ""}
                    >
                        ${name}
                    </option>
                `;
        }

        return `
        <div class="mod-description">
                Translates chat messages to your preferred language
            </div>
            <div class="settings-section-title">
                <span>General</span>
                <div></div>
            </div>
                <div class="setting-row">
                    <label>Language</label>

                    <select
                        id="translator-language"
                        style="
                            background:var(--background-1);
                            border:1px solid var(--border-1);
                            border-radius:4px;
                            color:var(--white);
                            padding:5px 8px;
                            font-size:12px;
                            outline:none;
                            cursor:pointer;
                        "
                    >
                        ${options}
                    </select>
                </div>
            `;
      },

      bind() {
        const mod = MODS_BY_ID.get("translator");
        const select = byId("translator-language");

        select.addEventListener("change", (e) => {
          cfgSet("translator.language", e.target.value);
          mod._clearTranslations();
          mod._scan();
        });
      },
    },
  });

  registerMod({
    id: "kdr",
    name: "KDR Indicator",
    category: ["hud"],
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-chart-bar"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 13a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1l0 -6" /><path d="M15 9a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v10a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1l0 -10" /><path d="M9 5a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1l0 -14" /><path d="M4 20h14" /></svg>`,
    hasOptions: true,

    _interval: null,

    _inGame() {
      return !!document.querySelector(".game .stats");
    },

    _remove() {
      const kdDiv = document.querySelector(".game .stats .kd-display");
      kdDiv?.remove();
    },

    _update() {
      if (!cfg("kdr.enabled")) {
        this._remove();
        return;
      }

      const stats = document.querySelector(".game .stats");
      if (!stats) return;

      const killSection = stats.querySelector(
        ".stat-section .kill-icon",
      )?.parentElement;

      const deathSection = stats.querySelector(
        ".stat-section .death-icon",
      )?.parentElement;

      if (!killSection || !deathSection) return;

      const kills = parseInt(killSection.textContent.trim()) || 0;

      const deaths = parseInt(deathSection.textContent.trim()) || 0;

      let kdDiv = stats.querySelector(".kd-display");

      if (!kdDiv) {
        kdDiv = document.createElement("div");
        kdDiv.className = "kd-display";

        kdDiv.style.cssText = `
                background-color: #b422bd;
                border-color: #d81de3;
                border-radius: 10px;
                border-width: 4px;
                min-width: 130px;
                margin-left: 23px;
                border-style: solid;
                padding: 0.5vh 1vh;
                color: white;
                font-family: Lilita One;
                font-size: 5vh !important;
                text-align: center;
                box-shadow:
                    0 0 0 6px #00000040,
                    0 0 0 3px #0b0914;
            `;

        stats.appendChild(kdDiv);
      }

      const kdr = deaths === 0 ? kills : (kills / deaths).toFixed(1);

      kdDiv.textContent = `KDR ${kdr}`;
    },

    init() {
      this._interval = setInterval(() => {
        this._update();
      }, 300);

      this._update();
    },

    apply() {
      if (!cfg("kdrindicator.enabled")) {
        this._remove();
        return;
      }

      this._update();
    },

    options: {
      render() {
        return `
          <div class="mod-description">
            Displays your kill death ratio for The War match
          </div>
        `;
      },
      bind() {},
    },

    destroy() {
      clearInterval(this._interval);
      this._interval = null;

      this._remove();
    },
  });
  registerMod({
    id: "damagevignette",
    name: "Damage Color",
    category: ["visuals"],
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-fall"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M11 21l1 -5l-1 -4l-3 -4h4l3 -3" /><path d="M6 16l-1 -4l3 -4" /><path d="M5 5a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M13.5 12h2.5l4 2" /></svg>`,
    hasOptions: true,

    _styleEl: null,
    _lastSig: null,

    init() {
      this._styleEl = document.createElement("style");
      this._styleEl.id = "__cs_damage_vignette";
      document.head.appendChild(this._styleEl);
      this.apply();
    },

    apply() {
      if (!this._styleEl) return;

      if (!cfg("damagevignette.enabled")) {
        if (this._lastSig !== "off") {
          this._styleEl.textContent = "";
          this._lastSig = "off";
        }
        return;
      }

      let color = cfg("damagevignette.color") || "#ff0000";
      if (!/^#[0-9A-Fa-f]{6}$/.test(color)) color = "#ff0000";

      if (this._lastSig === color) return;
      this._lastSig = color;

      const r = parseInt(color.slice(1, 3), 16);
      const g = parseInt(color.slice(3, 5), 16);
      const b = parseInt(color.slice(5, 7), 16);

      const edge = `rgba(${r}, ${g}, ${b}, 0.20)`;
      const inner = `rgba(${r}, ${g}, ${b}, 0.02)`;

      this._styleEl.textContent = `
            .hp-hit {
                background:
                    radial-gradient(
                        49.99% 49.99% at 50.01% 50.01%,
                        ${inner} 0%,
                        ${inner} 66.66%,
                        ${inner} 89.23%,
                        ${edge} 100%
                    ) !important;
            }
        `;
    },

    destroy() {
      this._styleEl.remove();
      this._styleEl = null;
    },

    options: {
      render() {
        const col = (id, key) => {
          const value = cfg(key) || "#ff0000";
          const pickerValue = /^#[0-9A-Fa-f]{6}$/.test(value)
            ? value
            : "#ff0000";

          return `
                <div
                    style="
                        display:flex;
                        align-items:center;
                        gap:8px;
                    "
                >
                    <input
                        type="color"
                        id="${id}-picker"
                        value="${pickerValue}"
                        style="
                            appearance:none;
                            -webkit-appearance:none;
                            width:32px;
                            height:28px;
                            padding:0;
                            margin:0;
                            border:1px solid var(--border-1);
                            outline:none;
                            border-radius:5px;
                            background:transparent;
                            cursor:pointer;
                            overflow:hidden;
                        "
                    >
                    <input
                        type="text"
                        id="${id}"
                        value="${value}"
                        style="
                            width:72px;
                            height:28px;
                            box-sizing:border-box;
                            background:var(--background-1);
                            border:1px solid var(--border-1);
                            color:var(--white);
                            border-radius:4px;
                            padding:4px 6px;
                            font-size:11px;
                            outline:none;
                            font-family:sans-serif;
                        "
                    >
                </div>
            `;
        };

        return `
            <div class="mod-description">
                Changes the color of the damage vignette
            </div>

            <div class="settings-section-title">
                <span>Colors</span>
                <div></div>
            </div>

            <div class="setting-row">
                <label>Color</label>
                ${col("damagevignette-color", "damagevignette.color")}
            </div>
        `;
      },

      bind() {
        const mod = MODS_BY_ID.get("damagevignette");
        const input = byId("damagevignette-color");
        const picker = byId("damagevignette-color-picker");

        if (!input || !picker) return;

        input.addEventListener("input", () => {
          let value = input.value.trim();
          if (!/^#[0-9A-Fa-f]{6}$/.test(value)) return;
          value = value.toLowerCase();
          cfgSet("damagevignette.color", value);
          picker.value = value;
          mod.apply();
        });

        picker.addEventListener("input", () => {
          const value = picker.value.toLowerCase();
          input.value = value;
          cfgSet("damagevignette.color", value);
          mod.apply();
        });
      },
    },
  });

  registerMod({
    id: "armorhud",
    name: "Armor HUD",
    category: ["hud", "new"],
    hasOptions: true,
    icon: `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-shield"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 3a12 12 0 0 0 8.5 3a12 12 0 0 1 -8.5 15a12 12 0 0 1 -8.5 -15a12 12 0 0 0 8.5 -3" /></svg>
    `,

    _el: null,
    _slots: null,
    _armorImages: {},
    _lastArmorJSON: "",
    _tick: null,
    _lastDisplay: null,

    init() {
      waitForBody(() => {
        this._buildDOM();
        this._loadArmorImages();
        this.apply();

        this._tick = Ticker.add(() => {
          if (!cfg("armorhud.enabled")) return;
          this._readAndRender();
        }, 150);
      });
    },

    async _loadArmorImages() {
      const url = "https://celestarminefun.github.io/client/armor/armor.json";

      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const json = await response.json();
        this._armorImages = json || {};
        this._lastArmorJSON = "";
        this._readAndRender();
      } catch (err) {
        console.error("[Celestar:ArmorHUD] Failed to load armor JSON:", err);
        this._armorImages = {};
      }
    },

    _buildDOM() {
      if (this._el) return;

      const el = document.createElement("div");
      el.id = "__cs_armorhud";
      el.style.cssText = `
            position:fixed !important;
            left:clamp(8px, 1.5vw, 24px) !important;
            bottom:clamp(8px, 1.5vh, 24px) !important;
            top:auto !important;
            right:auto !important;
            z-index:99990 !important;
            display:none !important;
            flex-direction:row !important;
            flex-wrap:nowrap !important;
            align-items:center !important;
            justify-content:flex-start !important;
            gap:clamp(3px, 0.35vw, 7px) !important;
            width:max-content !important;
            min-width:0 !important;
            max-width:none !important;
            padding:clamp(4px, 0.45vw, 8px) !important;
            margin:0 !important;
            box-sizing:border-box !important;
            user-select:none !important;
            pointer-events:auto;
        `;

      el.innerHTML = `
            <div
                id="__cs_armor_slots"
                style="
                    display:flex !important;
                    flex-direction:column !important;
                    flex-wrap:nowrap !important;
                    align-items:center !important;
                    justify-content:flex-start !important;
                    gap:clamp(3px, 0.35vw, 7px) !important;
                    width:max-content !important;
                    min-width:0 !important;
                    min-height:0 !important;
                    margin:0 !important;
                    padding:0 !important;
                "
            ></div>
        `;

      document.body.appendChild(el);
      this._el = el;
      this._slots = el.querySelector("#__cs_armor_slots");
    },

    _getArmorID(piece) {
      if (!piece) return 0;

      if (Array.isArray(piece)) {
        const id = Number(piece[0]);
        return Number.isFinite(id) ? id : 0;
      }

      if (typeof piece === "object") {
        const id =
          piece.id != null
            ? piece.id
            : piece.itemId != null
              ? piece.itemId
              : piece.itemID != null
                ? piece.itemID
                : piece.type != null
                  ? piece.type
                  : 0;
        const num = Number(id);
        return Number.isFinite(num) ? num : 0;
      }

      const num = Number(piece);
      return Number.isFinite(num) ? num : 0;
    },

    _getImageURL(id) {
      if (!id || id === 0) return null;
      const url = this._armorImages[String(id)];
      if (typeof url === "string" && url.length) return url;
      return null;
    },

    _readAndRender() {
      const player = GameHooks.player;
      const home = document.querySelector(".home");

      if (home) {
        if (this._el && this._lastDisplay !== "none") {
          this._el.style.setProperty("display", "none", "important");
          this._lastDisplay = "none";
        }
        return;
      }

      if (!player) return;

      const armor = player.armor;
      if (!armor) return;

      let armorJSON;
      try {
        armorJSON = JSON.stringify(Array.from(armor));
      } catch (e) {
        armorJSON = String(armor);
      }

      if (armorJSON === this._lastArmorJSON) return;
      this._lastArmorJSON = armorJSON;

      const slots = this._slots;
      if (!slots) return;

      const frag = document.createDocumentFragment();

      const armorArray = Array.from(armor);
      const orderedArmor = [
        armorArray[2],
        armorArray[0],
        armorArray[1],
        armorArray[3],
      ];

      orderedArmor.forEach((piece) => {
        const id = this._getArmorID(piece);
        const imageURL = this._getImageURL(id);

        const wrapper = document.createElement("div");
        wrapper.style.cssText = `
                width:clamp(28px, 3vw, 48px) !important;
                height:clamp(28px, 3vw, 48px) !important;
                flex:0 0 clamp(28px, 3vw, 48px) !important;
                display:flex !important;
                flex-direction:row !important;
                align-items:center !important;
                justify-content:center !important;
                position:relative !important;
                margin:0 !important;
                padding:0 !important;
                box-sizing:border-box !important;
            `;

        if (!id || id === 0) {
          wrapper.style.opacity = "0.25";
        } else if (imageURL) {
          const img = document.createElement("img");
          img.src = imageURL;
          img.alt = `Armor ${id}`;
          img.title = `Armor ID: ${id}`;
          img.draggable = false;
          img.loading = "lazy";
          img.decoding = "async";
          img.style.cssText = `
                    width:100% !important;
                    height:100% !important;
                    max-width:none !important;
                    max-height:none !important;
                    object-fit:contain !important;
                    image-rendering:auto;
                    display:block !important;
                    margin:0 !important;
                    padding:0 !important;
                `;

          img.onerror = () => {
            console.warn("[Celestar:ArmorHUD] Failed to load:", imageURL);
            img.remove();
            const label = document.createElement("span");
            label.textContent = String(id);
            label.style.cssText = `
                        font-size:clamp(7px, .7vw, 11px);
                        color:white;
                        font-family:sans-serif;
                        text-align:center;
                    `;
            wrapper.appendChild(label);
          };

          wrapper.appendChild(img);
        } else {
          const label = document.createElement("span");
          label.textContent = String(id);
          label.title = `Armor ID: ${id}`;
          label.style.cssText = `
                    max-width:100%;
                    max-height:100%;
                    overflow:hidden;
                    font-size:clamp(7px, .7vw, 11px);
                    line-height:1;
                    text-align:center;
                    color:#e6f1ff;
                    font-family:sans-serif;
                    word-break:break-all;
                `;
          wrapper.appendChild(label);
        }

        frag.appendChild(wrapper);
      });

      slots.replaceChildren(frag);

      if (cfg("armorhud.enabled") && this._lastDisplay !== "flex") {
        this._el.style.setProperty("display", "flex", "important");
        this._lastDisplay = "flex";
      }
    },

    apply() {
      if (!this._el) return;

      const enabled = cfg("armorhud.enabled");
      const d = enabled ? "flex" : "none";

      if (this._lastDisplay !== d) {
        this._el.style.setProperty("display", d, "important");
        this._lastDisplay = d;
      }

      this._el.style.setProperty("flex-direction", "row", "important");
      this._el.style.setProperty("flex-wrap", "nowrap", "important");
      this._el.style.setProperty("align-items", "center", "important");
      this._el.style.setProperty("justify-content", "flex-start", "important");
      this._el.style.setProperty(
        "left",
        "clamp(8px, 1.5vw, 24px)",
        "important",
      );
      this._el.style.setProperty(
        "bottom",
        "clamp(8px, 1.5vh, 24px)",
        "important",
      );
      this._el.style.setProperty("top", "auto", "important");
      this._el.style.setProperty("right", "auto", "important");
    },

    destroy() {
      if (this._tick) {
        Ticker.remove(this._tick);
        this._tick = null;
      }
      this._el.remove();
      this._el = null;
      this._slots = null;
      this._armorImages = {};
      this._lastArmorJSON = "";
    },

    options: {
      render() {
        return `
      <div class="mod-description">
        Displays your equipped armor pieces on the bottom left
      </div>
    `;
      },
      bind() {},
    },
  });

  registerMod({
    id: "blockoutline",
    name: "Block Outline",
    category: ["visuals", "new"],

    icon: `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-cube"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M21 16.008v-8.018a1.98 1.98 0 0 0 -1 -1.717l-7 -4.008a2.016 2.016 0 0 0 -2 0l-7 4.008c-.619 .355 -1 1.01 -1 1.718v8.018c0 .709 .381 1.363 1 1.717l7 4.008a2.016 2.016 0 0 0 2 0l7 -4.008c.619 -.355 1 -1.01 1 -1.718" /><path d="M12 22v-10" /><path d="M12 12l8.73 -5.04" /><path d="M3.27 6.96l8.73 5.04" /></svg>
    `,

    hasOptions: true,

    _sys: null,
    _mesh: null,
    _material: null,
    _tick: null,
    _lastColor: null,

    _findSystem() {
      try {
        const systems = GameHooks.systems;
        if (!systems) return null;

        const sys = systems.find(
          (s) =>
            s &&
            s.currBlockPos !== undefined &&
            s.mesh &&
            s.mesh.name === "Blocks Highlighting",
        );

        if (!sys) return null;

        if (sys !== this._sys) {
          this._sys = sys;
          this._mesh = null;
          this._material = null;
          this._lastColor = null;
        }

        return sys;
      } catch (e) {
        return null;
      }
    },

    _hexToRGB(hex) {
      if (typeof hex !== "string" || !/^#[0-9A-Fa-f]{6}$/.test(hex)) {
        hex = "#81e1ff";
      }
      return {
        r: parseInt(hex.slice(1, 3), 16),
        g: parseInt(hex.slice(3, 5), 16),
        b: parseInt(hex.slice(5, 7), 16),
      };
    },

    _applyColor() {
      if (!cfg("blockoutline.enabled")) return;

      try {
        const sys = this._findSystem();
        if (!sys) return;

        const mesh = sys.mesh;
        if (!mesh) return;

        if (mesh !== this._mesh) {
          this._mesh = mesh;
          this._material = null;
        }

        const material = mesh.material;
        if (!material) return;

        if (material !== this._material) {
          this._material = material;
          this._lastColor = null;
        }

        if (!material.color) return;

        const hex = cfg("blockoutline.color");
        if (this._lastColor === hex) return;
        this._lastColor = hex;

        const rgb = this._hexToRGB(hex);
        material.color.r = rgb.r;
        material.color.g = rgb.g;
        material.color.b = rgb.b;

        if (typeof material.color.setRGB === "function") {
          material.color.setRGB(rgb.r, rgb.g, rgb.b);
        }

        material.needsUpdate = true;
      } catch (e) {}
    },

    init() {
      this._tick = Ticker.add(() => {
        if (cfg("blockoutline.enabled")) {
          this._applyColor();
        } else {
          this._sys = null;
          this._mesh = null;
          this._material = null;
          this._lastColor = null;
        }
      }, 0);
    },

    apply() {
      if (cfg("blockoutline.enabled")) {
        this._findSystem();
        this._lastColor = null;
        this._applyColor();
      } else {
        this._sys = null;
        this._mesh = null;
        this._material = null;
        this._lastColor = null;
      }
    },

    options: {
      render() {
        const color = cfg("blockoutline.color") || "#81e1ff";

        return `
            <div class="mod-description">
                Changes the color of the block outline
            </div>
            <div class="settings-section-title">
                <span>Colors</span>
                <div></div>
            </div>
                <div class="setting-row">
                    <label>
                        Color
                    </label>

                    <div
                        style="
                            display:flex;
                            align-items:center;
                            gap:8px;
                        "
                    >
                        <input
                            type="color"
                            id="bo-color-picker"
                            value="${color}"
                            style="
                                width:32px;
                                height:28px;
                                border:none;
                                background:none;
                                cursor:pointer;
                                padding:0;
                            "
                        >
                        <input
                            type="text"
                            id="bo-color-text"
                            value="${color}"
                            style="
                                width:72px;
                                background:var(--background-1);
                                border:1px solid var(--border-1);
                                color:var(--white);
                                border-radius:4px;
                                padding:4px 6px;
                                font-size:11px;
                                outline:none;
                                font-family:sans-serif;
                            "
                        >
                    </div>
                </div>
            `;
      },

      bind() {
        const picker = byId("bo-color-picker");
        const text = byId("bo-color-text");
        const mod = MODS_BY_ID.get("blockoutline");

        const update = (hex) => {
          if (!/^#[0-9A-Fa-f]{6}$/.test(hex)) return;
          cfgSet("blockoutline.color", hex);
          mod._applyColor();
        };

        picker.addEventListener("input", () => {
          if (text) text.value = picker.value;
          update(picker.value);
        });

        text.addEventListener("change", () => {
          const value = text.value.trim();
          if (!/^#[0-9A-Fa-f]{6}$/.test(value)) return;
          if (picker) picker.value = value;
          update(value);
        });
      },
    },

    destroy() {
      if (this._tick) {
        Ticker.remove(this._tick);
        this._tick = null;
      }
      this._sys = null;
      this._mesh = null;
      this._material = null;
      this._lastColor = null;
    },
  });

  registerMod({
    id: "nofog",
    name: "Hide Fog",
    category: ["visuals", "new"],
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-wind-off"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 8h3m4 0h1.5a2.5 2.5 0 1 0 -2.34 -3.24" /><path d="M3 12h9" /><path d="M16 12h2.5a2.5 2.5 0 0 1 1.801 4.282" /><path d="M4 16h5.5a2.5 2.5 0 1 1 -2.34 3.24" /><path d="M3 3l18 18" /></svg>`,
    hasOptions: true,
    options: {
      render() {
        return `
      <div class="mod-description">
        Removes the distance fog
      </div>
    `;
      },
      bind() {},
    },
    init() {},
    apply() {},
  });

  registerMod({
    id: "hidenametag",
    name: "Hide Nametags",
    category: ["visuals", "new"],
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-user-off"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M8.18 8.189a4.01 4.01 0 0 0 2.616 2.627m3.507 -.545a4 4 0 1 0 -5.59 -5.552" /><path d="M6 21v-2a4 4 0 0 1 4 -4h4c.412 0 .81 .062 1.183 .178m2.633 2.618c.12 .38 .184 .785 .184 1.204v2" /><path d="M3 3l18 18" /></svg>`,
    hasOptions: true,

    _hidden: new Set(),
    _tick: null,
    _wasEnabled: false,

    init() {
      this._tick = Ticker.add(() => {
        const enabled = cfg("hidenametag.enabled");

        if (!enabled) {
          if (this._wasEnabled) {
            for (const obj of this._hidden) {
              if (obj) obj.visible = true;
            }
            this._hidden.clear();
            this._wasEnabled = false;
          }
          return;
        }

        this._wasEnabled = true;

        const world = GameHooks.gameWorld;
        if (!world) return;

        const server = world.server;
        const players = server.players;
        if (!players) return;

        try {
          players.forEach((player) => {
            const model = player.model;
            if (!model.traverse) return;

            model.traverse((obj) => {
              if (obj.name === "playerNameSprite") {
                if (!obj.userData.celestarDamage) {
                  if (obj.visible) obj.visible = false;
                  this._hidden.add(obj);
                }
              }
              if (
                obj.name === "CelestarDamageIndicator" ||
                obj.userData.celestarDamage
              ) {
                obj.visible = true;
              }
            });
          });
        } catch (e) {}
      }, 0);
    },

    apply() {
      if (cfg("hidenametag.enabled")) return;

      for (const obj of this._hidden) {
        if (obj) obj.visible = true;
      }
      this._hidden.clear();
      this._wasEnabled = false;
    },

    options: {
      render() {
        return `
      <div class="mod-description">
        Hides the floating nametags above other players
      </div>
    `;
      },
      bind() {},
    },

    destroy() {
      if (this._tick) {
        Ticker.remove(this._tick);
        this._tick = null;
      }
      for (const obj of this._hidden) {
        if (obj) obj.visible = true;
      }
      this._hidden.clear();
    },
  });

  registerMod({
    id: "hurtcam",
    name: "Hurt Cam",
    category: ["visuals", "new"],
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-camera-off"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M8.297 4.289a.997 .997 0 0 1 .703 -.289h6a1 1 0 0 1 1 1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v8m-1.187 2.828c-.249 .11 -.524 .172 -.813 .172h-14a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2h1c.298 0 .58 -.065 .834 -.181" /><path d="M10.422 10.448a3 3 0 1 0 4.15 4.098" /><path d="M3 3l18 18" /></svg>`,
    hasOptions: true,
    _origFn: null,
    _patched: false,
    _checkTick: null,

    _getPlayer() {
      try {
        const provides =
          document.querySelector("#app").__vue_app__._context.provides;
        const sym = Object.getOwnPropertySymbols(provides).find(
          (s) => provides[s]._s,
        );
        return provides[sym]._s.get("gameState").gameWorld.player || null;
      } catch (e) {
        return null;
      }
    },

    init() {
      this._checkTick = Ticker.add(() => {
        if (cfg("hurtcam.enabled")) this._applyPatch();
      }, 2000);
    },

    _applyPatch() {
      if (this._patched) return;
      const player = this._getPlayer();
      if (!player) return;

      try {
        this._origFn = player.playDmgAnimation;
        player.playDmgAnimation = function () {};
        this._patched = true;
      } catch (e) {}
    },

    _removePatch() {
      if (!this._patched) return;
      const player = this._getPlayer();
      if (!player) return;

      try {
        if (this._origFn) player.playDmgAnimation = this._origFn;
        this._patched = false;
        this._origFn = null;
      } catch (e) {}
    },

    apply() {
      if (cfg("hurtcam.enabled")) this._applyPatch();
      else this._removePatch();
    },

    options: {
      render() {
        return `
      <div class="mod-description">
        Disables the camera shake when you take damage
      </div>
    `;
      },
      bind() {},
    },

    destroy() {
      if (this._checkTick) {
        Ticker.remove(this._checkTick);
        this._checkTick = null;
      }
      this._removePatch();
    },
  });

  registerMod({
    id: "togglecrouch",
    name: "Toggle Crouch",
    category: ["utilities", "new"],
    icon: `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-shoe"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 6h5.426a1 1 0 0 1 .863 .496l1.064 1.823a3 3 0 0 0 1.896 1.407l4.677 1.114a4 4 0 0 1 3.074 3.89v2.27a1 1 0 0 1 -1 1h-16a1 1 0 0 1 -1 -1v-10a1 1 0 0 1 1 -1" /><path d="M14 13l1 -2" /><path d="M8 18v-1a4 4 0 0 0 -4 -4h-1" /><path d="M10 12l1.5 -3" /></svg>
    `,
    hasOptions: true,

    _toggled: false,
    _keydownHandler: null,
    _tick: null,

    init() {
      this._keydownHandler = (e) => {
        if (e.code !== "KeyC") return;
        if (e.repeat) return;

        const target = e.target;
        if (
          target instanceof HTMLInputElement ||
          target instanceof HTMLTextAreaElement ||
          target instanceof HTMLSelectElement ||
          target.isContentEditable
        ) {
          return;
        }

        if (!cfg("togglecrouch.enabled")) return;
        this._toggled = !this._toggled;
      };

      window.addEventListener("keydown", this._keydownHandler);

      this._tick = Ticker.add(() => {
        if (!cfg("togglecrouch.enabled")) {
          if (this._toggled) this._toggled = false;
          return;
        }

        try {
          const player = GameHooks.gameWorld.player;
          if (player.inputs) {
            player.inputs.crouch = this._toggled;
          }
        } catch (e) {}
      }, 0);
    },

    apply() {
      if (!cfg("togglecrouch.enabled")) {
        this._toggled = false;

        try {
          const player = GameHooks.gameWorld.player;
          if (player.inputs) player.inputs.crouch = false;
        } catch (e) {}
      }
    },

    options: {
      render() {
        return `
      <div class="mod-description">
        Crouch with one key press, no need to hold
      </div>
    `;
      },
      bind() {},
    },

    destroy() {
      if (this._keydownHandler) {
        window.removeEventListener("keydown", this._keydownHandler);
        this._keydownHandler = null;
      }
      if (this._tick) {
        Ticker.remove(this._tick);
        this._tick = null;
      }
      this._toggled = false;
      try {
        const player = GameHooks.gameWorld.player;
        if (player.inputs) player.inputs.crouch = false;
      } catch (e) {}
    },
  });

  registerMod({
    id: "hideparticles",
    name: "Hide Particles",
    category: ["visuals", "new"],
    hasOptions: true,
    icon: `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-wand">
	<path stroke="none" d="M0 0h24v24H0z" fill="none" />
	<path d="M6 21l15 -15l-3 -3l-15 15l3 3" />
	<path d="M15 6l3 3" />
	<path d="M9 3a2 2 0 0 0 2 2a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2a2 2 0 0 0 2 -2" />
	<path d="M19 13a2 2 0 0 0 2 2a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2a2 2 0 0 0 2 -2" />
</svg>
    `,

    _sr: null,
    _bp: null,
    _blockPoint: null,
    _tick: null,
    _blockApplied: null,

    _find() {
      try {
        const s = GameHooks.systems.find(
          (x) => x.blockParticles && x.spriteRenderer,
        );
        if (!s) return null;

        let blockPoint = null;
        const scene = GameHooks.gameWorld.threeScene.scene;

        if (scene.traverse) {
          scene.traverse((obj) => {
            if (
              obj.type === "Points" &&
              obj.name === "BlockParticles" &&
              obj.visible
            ) {
              blockPoint = obj;
            }
          });
        }

        return {
          sr: s.spriteRenderer,
          bp: s.blockParticles,
          blockPoint,
        };
      } catch (e) {
        return null;
      }
    },

    _hideSprite(id) {
      if (cfg("hideparticles.blood") && id === "greenBlood") return true;
      if (
        cfg("hideparticles.smoke") &&
        (id === "smoke" || id === "smokeStatic")
      ) {
        return true;
      }
      return cfg(`hideparticles.effect.${id}`);
    },

    _hookSprite(sr) {
      if (!sr || typeof sr.spawn !== "function") return;
      if (sr.__hpHooked) {
        this._sr = sr;
        return;
      }

      const original = sr.spawn;
      sr.__hpOriginal = original;

      sr.spawn = function (effect, textureId, position, velocity) {
        const mod = MODS_BY_ID.get("hideparticles");
        if (mod && cfg("hideparticles.enabled") && mod._hideSprite(textureId)) {
          return;
        }
        return original.call(this, effect, textureId, position, velocity);
      };

      sr.__hpHooked = true;
      this._sr = sr;
    },

    _hook() {
      const s = this._find();
      if (!s) return;
      this._hookSprite(s.sr);
      this._bp = s.bp;
      if (s.blockPoint) {
        this._blockPoint = s.blockPoint;
        if (this._blockPoint.__hpOriginalVisible === undefined) {
          this._blockPoint.__hpOriginalVisible = this._blockPoint.visible;
        }
      }
    },

    _applyBlockVisibility() {
      const p = this._blockPoint;
      if (!p) return;

      const shouldHide =
        cfg("hideparticles.enabled") && cfg("hideparticles.blocks");
      const target = shouldHide
        ? false
        : p.__hpOriginalVisible !== undefined
          ? p.__hpOriginalVisible
          : true;

      if (this._blockApplied !== target) {
        p.visible = target;
        this._blockApplied = target;
      }
    },

    init() {
      this._tick = Ticker.add(() => {
        this._hook();
        this._applyBlockVisibility();
      }, 50);
    },

    apply() {
      this._hook();
      this._applyBlockVisibility();
    },

    options: {
      render() {
        const t = (id, key) => optToggle(id, cfg(key));

        const basic = [
          ["Blood", "hp-blood", "hideparticles.blood"],
          ["Wall Smoke", "hp-smoke", "hideparticles.smoke"],
          ["Blocks", "hp-blocks", "hideparticles.blocks"],
        ];

        const effects = [
          ["Hit", "hit"],
          ["Arrow", "arrow"],
          ["Broken Heart", "brokenHeart"],
          ["Death", "death"],
          ["Broken Shield", "brokenShield"],
          ["Energy", "energy"],
          ["Flame", "flame"],
          ["Gem", "gem"],
          ["Gold Coin", "goldCoin"],
          ["Heart", "heart"],
          ["Impact Burst", "impactBurst"],
          ["Med Cross", "medCross"],
          ["Poison", "poison"],
          ["Shield", "shield"],
          ["Slash Cross", "slashCross"],
          ["Star", "star"],
          ["Water Bubbles", "waterBubbles"],
          ["Water Drop", "waterDrop"],
          ["Slowness", "slowness"],
          ["Strength", "strength"],
          ["Weakness", "weakness"],
          ["Jump Boost", "jumpBoost"],
          ["Mining Speed", "miningSpeed"],
          ["Mining Fatigue", "miningFatigue"],
          ["Invisibility", "invisibility"],
          ["Night Vision", "nightVision"],
          ["Skull", "skull"],
        ];

        return (
          `<div class="mod-description">
                Hide specific particles from emitting
            </div>
            <div class="settings-section-title">
                <span>General</span>
                <div></div>
            </div>
` +
          basic
            .map(
              ([name, id, key]) => `
                    <div class="setting-row">
                        <label>${name}</label>
                        ${t(id, key)}
                    </div>
                `,
            )
            .join("") +
          `<div class="settings-section-title">
                <span>Effect Particles</span>
                <div></div>
            </div>` +
          effects
            .map(
              ([name, key]) => `
                    <div class="setting-row">
                        <label>${name}</label>
                        ${t(`hp-effect-${key}`, `hideparticles.effect.${key}`)}
                    </div>
                `,
            )
            .join("")
        );
      },

      bind() {
        const mod = MODS_BY_ID.get("hideparticles");

        const keys = [
          ["hp-enabled", "hideparticles.enabled"],
          ["hp-blood", "hideparticles.blood"],
          ["hp-smoke", "hideparticles.smoke"],
          ["hp-blocks", "hideparticles.blocks"],
          "hit",
          "arrow",
          "brokenHeart",
          "death",
          "brokenShield",
          "energy",
          "flame",
          "gem",
          "goldCoin",
          "heart",
          "impactBurst",
          "medCross",
          "poison",
          "shield",
          "slashCross",
          "star",
          "waterBubbles",
          "waterDrop",
          "slowness",
          "strength",
          "weakness",
          "jumpBoost",
          "miningSpeed",
          "miningFatigue",
          "invisibility",
          "nightVision",
          "skull",
        ].map((x) =>
          Array.isArray(x)
            ? x
            : [`hp-effect-${x}`, `hideparticles.effect.${x}`],
        );

        keys.forEach(([id, key]) => bindToggle(id, key, () => mod.apply()));
      },
    },

    destroy() {
      if (this._tick) {
        Ticker.remove(this._tick);
        this._tick = null;
      }

      const sr = this._sr;
      if (sr.__hpHooked) {
        sr.spawn = sr.__hpOriginal;
        delete sr.__hpOriginal;
        delete sr.__hpHooked;
      }

      const point = this._blockPoint;
      if (point && point.__hpOriginalVisible !== undefined) {
        point.visible = point.__hpOriginalVisible;
        delete point.__hpOriginalVisible;
      }

      this._sr = null;
      this._bp = null;
      this._blockPoint = null;
      this._blockApplied = null;
    },
  });

  registerMod({
    id: "hideclouds",
    name: "Hide Clouds",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-cloud-off"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9.58 5.548c.24 -.11 .492 -.207 .752 -.286c1.88 -.572 3.956 -.193 5.444 1c1.488 1.19 2.162 3.007 1.77 4.769h.99c1.913 0 3.464 1.56 3.464 3.486c0 .957 -.383 1.824 -1.003 2.454m-2.997 1.033h-11.343c-2.572 -.004 -4.657 -2.011 -4.657 -4.487c0 -2.475 2.085 -4.482 4.657 -4.482c.13 -.582 .37 -1.128 .7 -1.62" /><path d="M3 3l18 18" /></svg>`,
    category: ["visuals", "new"],
    hasOptions: true,

    _tick: null,
    _hidden: new Set(),

    _hide() {
      try {
        const scene = GameHooks.gameWorld.threeScene.scene;
        if (!scene) return;

        scene.traverse((obj) => {
          if (!obj) return;
          const name = String(obj.name || "").toLowerCase();

          if (name.includes("cloud") || name.includes("clouds")) {
            if (cfg("hideclouds.enabled")) {
              if (!this._hidden.has(obj)) {
                obj.__hcOriginalVisible = obj.visible;
                this._hidden.add(obj);
              }
              if (obj.visible) obj.visible = false;
            } else if (this._hidden.has(obj)) {
              obj.visible =
                obj.__hcOriginalVisible != null
                  ? obj.__hcOriginalVisible
                  : true;
              delete obj.__hcOriginalVisible;
              this._hidden.delete(obj);
            }
          }
        });
      } catch (e) {}
    },

    init() {
      this._tick = Ticker.add(() => {
        this._hide();
      }, 500);
    },

    apply() {
      this._hide();
    },

    options: {
      render() {
        return `
      <div class="mod-description">
        Hides the clouds in the sky
      </div>
    `;
      },
      bind() {},
    },

    destroy() {
      if (this._tick) {
        Ticker.remove(this._tick);
        this._tick = null;
      }
      for (const obj of this._hidden) {
        try {
          obj.visible =
            obj.__hcOriginalVisible != null ? obj.__hcOriginalVisible : true;
          delete obj.__hcOriginalVisible;
        } catch (e) {}
      }
      this._hidden.clear();
    },
  });

  registerMod({
    id: "bedwarsnotif",
    name: "Bedwars Notifications",
    category: ["utilities", "new"],
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-bell"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M10 5a2 2 0 1 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" /><path d="M9 17v1a3 3 0 0 0 6 0v-1" /></svg>`,
    hasOptions: true,

    bedListener: null,
    eliminationListener: null,

    init() {
      this.bedListener = Packets.addIncomingListener(
        Packets.toClient.BED_WARS_BED_WAS_DESTROYED,
        (data) => {
          if (!cfg("bedwarsnotif.enabled")) return;
          if (!cfg("bedwarsnotif.bedDestroy")) return;
          if (!Array.isArray(data)) return;

          const username = data[0];
          const team = data[1];
          if (!username || !team) return;

          this.notifyBedDestroyed(username, team);
        },
      );

      this.eliminationListener = Packets.addIncomingListener(
        Packets.toClient.BED_WARS_TEAM_WAS_ELIMINATED,
        (data) => {
          if (!cfg("bedwarsnotif.enabled")) return;
          if (!cfg("bedwarsnotif.teamEliminated")) return;

          const team = data;
          if (!team) return;

          this.notifyTeamEliminated(team);
        },
      );
    },

    notifyBedDestroyed(username, team) {
      this.showNotification(`${username} destroyed `, team, " bed");
    },

    notifyTeamEliminated(team) {
      this.showNotification("", team, " team has been eliminated");
    },

    showNotification(before, team, after) {
      const existing = document.getElementById("__cs_bedwars_notification");
      if (existing) existing.remove();

      const el = document.createElement("div");
      el.id = "__cs_bedwars_notification";

      const teamColor = this.getTeamColor(team);

      el.innerHTML = `
      <span>${this.escapeHtml(before)}</span>
      <span style="color:${teamColor};">
        ${this.escapeHtml(team)}
      </span>
      <span>${this.escapeHtml(after)}</span>
    `;

      Object.assign(el.style, {
        position: "fixed",
        top: "120px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: "9999999",
        color: "#fff",
        background: "#0009",
        fontSize: "34px",
        fontWeight: "100",
        fontFamily: "Lilita One",
        whiteSpace: "nowrap",
        textAlign: "center",
        pointerEvents: "none",
        opacity: "0",
        padding: "6px 16px",
        borderRadius: "10px",
        textShadow: `
        2px 2px 0 rgba(0,0,0,.8),
        -1px -1px 0 rgba(0,0,0,.4),
        1px -1px 0 rgba(0,0,0,.4),
        -1px 1px 0 rgba(0,0,0,.4)
      `,
      });

      document.body.appendChild(el);

      requestAnimationFrame(() => {
        el.style.opacity = "1";
      });

      setTimeout(() => {
        el.style.opacity = "0";
        setTimeout(() => {
          el.remove();
        }, 200);
      }, 3000);
    },

    getTeamColor(team) {
      const colors = {
        red: "#F33",
        "light blue": "#3AF9CF",
        light_blue: "#3AF9CF",
        yellow: "#FCCF1A",
        white: "#F4F4F4",
        purple: "#D147EA",
        orange: "#F09925",
        green: "#8AFF3F",
        blue: "#6EC9E8",
      };

      const key = String(team).toLowerCase().replace(/-/g, "_");
      return colors[key] || "#ffffff";
    },

    _escapeMap: {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    },
    escapeHtml(text) {
      return String(text).replace(/[&<>"']/g, (c) => this._escapeMap[c]);
    },

    options: {
      render() {
        return `
        <div class="mod-description">
          Show notifications when a bed is broken or a team is eliminated
        </div>

        <div class="settings-section-title">
          <span>General</span>
          <div></div>
        </div>

        <div class="setting-row">
          <label>Bed Destroyed</label>
          ${optToggle("bedwarsnotif-bedDestroy", cfg("bedwarsnotif.bedDestroy"))}
        </div>

        <div class="setting-row">
          <label>Team Eliminated</label>
          ${optToggle("bedwarsnotif-teamEliminated", cfg("bedwarsnotif.teamEliminated"))}
        </div>
      `;
      },

      bind() {
        bindToggle("bedwarsnotif-bedDestroy", "bedwarsnotif.bedDestroy");
        bindToggle(
          "bedwarsnotif-teamEliminated",
          "bedwarsnotif.teamEliminated",
        );
      },
    },

    destroy() {
      this.bedListener.off();
      this.eliminationListener.off();
      this.bedListener = null;
      this.eliminationListener = null;
      document.getElementById("__cs_bedwars_notification").remove();
    },
  });

  registerMod({
    id: "armoffset",
    name: "Arm Position",
    category: ["utilities", "new"],
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-arrows-move-vertical"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 18l3 3l3 -3" /><path d="M12 15v6" /><path d="M15 6l-3 -3l-3 3" /><path d="M12 3v6" /></svg>`,
    hasOptions: true,
    _arms: null,
    _origY: null,
    _tick: null,
    _lastAppliedY: null,

    _fetchArms() {
      try {
        const sys = GameHooks.systems.find((s) => s.arms && s.rightArmDown);
        if (!sys.arms) return false;
        this._arms = sys.arms;
        if (this._origY === null) this._origY = sys.arms.position.y;
        return true;
      } catch (e) {
        return false;
      }
    },

    init() {
      this._tick = Ticker.add(() => {
        if (!this._arms || !this._arms.parent) {
          this._arms = null;
          this._origY = null;
          this._lastAppliedY = null;
          this._fetchArms();
        }
        if (this._arms) {
          const enabled = cfg("armoffset.enabled");
          const origY = this._origY != null ? this._origY : 0;
          const offsetY = cfg("armoffset.y") != null ? cfg("armoffset.y") : 0;
          const fallbackY =
            this._origY != null ? this._origY : this._arms.position.y;

          const targetY = enabled ? origY + offsetY : fallbackY;

          if (this._lastAppliedY !== targetY) {
            if (Math.abs(this._arms.position.y - targetY) > 0.001) {
              this._arms.position.y = targetY;
            }
            this._lastAppliedY = targetY;
          }
        }
      }, 0);
    },

    apply() {
      if (!cfg("armoffset.enabled") && this._arms && this._origY !== null) {
        this._arms.position.y = this._origY;
        this._arms = null;
        this._origY = null;
        this._lastAppliedY = null;
      }
    },

    destroy() {
      if (this._tick) {
        Ticker.remove(this._tick);
        this._tick = null;
      }
      this._arms = null;
      this._origY = null;
    },

    options: {
      render() {
        const yVal = cfg("armoffset.y");
        const y = yVal != null ? yVal : 0;
        return `
             <div class="mod-description">
          Move the vertical position of your first-person arms
        </div>

        <div class="settings-section-title">
          <span>General</span>
          <div></div>
        </div>
                <div class="setting-row">
                    <label>Position (Y)</label>
                    <div class="setting-inline">
                        <input type="range" id="ao-y" min="-0.5" max="0.5" step="0.01" value="${y}">
                        <div class="range-val" id="ao-y-val">${parseFloat(y).toFixed(2)}</div>
                    </div>
                </div>`;
      },
      bind() {
        bindSlider(
          "ao-y",
          "ao-y-val",
          "armoffset.y",
          (v) => parseFloat(v).toFixed(2),
          parseFloat,
        );
      },
    },
  });

  registerMod({
    id: "scoreboard",
    name: "Scoreboard",
    category: ["hud", "new"],
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-scoreboard"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10" /><path d="M12 5v2" /><path d="M12 10v1" /><path d="M12 14v1" /><path d="M12 18v1" /><path d="M7 3v2" /><path d="M17 3v2" /><path d="M15 10.5v3a1.5 1.5 0 0 0 3 0v-3a1.5 1.5 0 0 0 -3 0" /><path d="M6 9h1.5a1.5 1.5 0 0 1 0 3h-.5h.5a1.5 1.5 0 0 1 0 3h-1.5" /></svg>`,
    hasOptions: true,

    _tick: null,
    _editor: null,
    _editing: false,
    _dragging: false,
    _dragOffsetX: 0,
    _dragOffsetY: 0,
    _originalBackground: null,
    _lastAppliedSig: null,

    init() {
      waitForBody(() => {
        this._apply();

        this._tick = Ticker.add(() => {
          this._apply();

          if (this._editing) {
            const save = byId("sb-save");
            if (!save || save.offsetParent === null) this.setEditMode(false);
          }
        }, 100);
      });
    },

    _getPosition() {
      return {
        x: Number(cfg("scoreboard.x")) || 92,
        y: Number(cfg("scoreboard.y")) || 20,
      };
    },

    _apply() {
      if (this._editing) return;

      const scoreboard = document.querySelector(".scoreboard-overlay");
      if (!scoreboard) return;

      if (this._originalBackground === null) {
        this._originalBackground = getComputedStyle(scoreboard).backgroundColor;
      }

      if (!cfg("scoreboard.enabled")) {
        if (this._lastAppliedSig === "off") return;
        this._lastAppliedSig = "off";
        scoreboard.style.removeProperty("left");
        scoreboard.style.removeProperty("right");
        scoreboard.style.removeProperty("top");
        scoreboard.style.removeProperty("background");
        scoreboard.style.removeProperty("border-color");
        return;
      }

      const { x, y } = this._getPosition();
      const background = cfg("scoreboard.backgroundColor") || "#0000008c";
      const border = cfg("scoreboard.borderColor") || "#121212";

      const sig = `${x}|${y}|${background}|${border}`;
      if (this._lastAppliedSig === sig) return;
      this._lastAppliedSig = sig;

      const maxWidth = 260;
      const actualWidth = scoreboard.offsetWidth;
      const widthDifference = Math.max(0, maxWidth - actualWidth);

      if (x < 50) {
        scoreboard.style.setProperty("left", "auto", "important");
        scoreboard.style.setProperty(
          "right",
          `calc(100% - ${x}% + ${widthDifference}px)`,
          "important",
        );
      } else {
        scoreboard.style.setProperty("left", "auto", "important");
        scoreboard.style.setProperty(
          "right",
          `calc(100% - ${x}%)`,
          "important",
        );
      }

      scoreboard.style.setProperty("top", `${y}%`, "important");
      scoreboard.style.setProperty("transform", "none", "important");
      scoreboard.style.setProperty("background", background, "important");
      scoreboard.style.setProperty("border-color", border, "important");
    },

    _createEditor() {
      if (this._editor) return;

      const { x, y } = this._getPosition();

      const editor = document.createElement("div");
      editor.id = "__cs_scoreboard_editor";
      editor.innerHTML = `
            <div class="cs-sb-editor-title">
                Preview
            </div>
        `;

      Object.assign(editor.style, {
        position: "fixed",
        left: "auto",
        right: `calc(100% - ${x}%)`,
        top: `${y}%`,
        transform: "none",
        width: "260px",
        boxSizing: "border-box",
        padding: "8px 10px",
        background: this._originalBackground || "rgba(0, 0, 0, 0.55)",
        border: "2px dashed #a855f7",
        borderRadius: "8px",
        color: "#fff",
        fontSize: "18px",
        fontFamily: "Arial, sans-serif",
        textShadow: "0 .08ex 0 #140000",
        boxShadow: "0 2px 8px #00000040",
        zIndex: "2147483646",
        cursor: "move",
        userSelect: "none",
        pointerEvents: "auto",
      });

      const title = editor.querySelector(".cs-sb-editor-title");
      Object.assign(title.style, {
        fontWeight: "700",
        fontFamily: "Lilita One",
        fontSize: "25px",
        marginBottom: "5px",
        textAlign: "center",
      });

      document.body.appendChild(editor);
      this._editor = editor;
      this._bindEditorDrag();
    },

    _bindEditorDrag() {
      if (!this._editor) return;

      this._editor.addEventListener("mousedown", (event) => {
        if (event.button !== 0) return;
        this._dragging = true;
        const rect = this._editor.getBoundingClientRect();
        this._dragOffsetX = event.clientX - rect.left;
        this._dragOffsetY = event.clientY - rect.top;
        event.preventDefault();
      });

      this._editor._csMouseMove = (event) => {
        if (!this._dragging || !this._editor) return;

        const width = this._editor.offsetWidth;
        const height = this._editor.offsetHeight;

        let right =
          window.innerWidth - (event.clientX - this._dragOffsetX + width);
        let top = event.clientY - this._dragOffsetY;

        right = Math.max(0, Math.min(right, window.innerWidth - width));
        top = Math.max(0, Math.min(top, window.innerHeight - height));

        const x = ((window.innerWidth - right) / window.innerWidth) * 100;
        const y = (top / window.innerHeight) * 100;

        this._editor.style.left = "auto";
        this._editor.style.right = `calc(100% - ${x}%)`;
        this._editor.style.top = `${y}%`;

        cfgSet("scoreboard.x", x);
        cfgSet("scoreboard.y", y);

        const xVal = byId("sb-x-val");
        const yVal = byId("sb-y-val");
        if (xVal) xVal.textContent = `${Math.round(x)}%`;
        if (yVal) yVal.textContent = `${Math.round(y)}%`;
      };

      this._editor._csMouseUp = () => {
        this._dragging = false;
      };

      document.addEventListener("mousemove", this._editor._csMouseMove);
      document.addEventListener("mouseup", this._editor._csMouseUp);
    },

    setEditMode(on) {
      this._editing = on;

      if (on) {
        this._createEditor();
        const scoreboard = document.querySelector(".scoreboard-overlay");
        if (scoreboard) scoreboard.style.visibility = "hidden";
      } else {
        this._removeEditor();
        const scoreboard = document.querySelector(".scoreboard-overlay");
        if (scoreboard) scoreboard.style.visibility = "";
        this._lastAppliedSig = null;
        this._apply();
      }
    },

    _removeEditor() {
      if (this._editor) {
        try {
          document.removeEventListener("mousemove", this._editor._csMouseMove);
          document.removeEventListener("mouseup", this._editor._csMouseUp);
        } catch (e) {}
        try {
          this._editor.remove();
        } catch (e) {}
        this._editor = null;
      }

      this._dragging = false;
      this._editing = false;
      const scoreboard = document.querySelector(".scoreboard-overlay");
      if (scoreboard) scoreboard.style.visibility = "";
    },

    _enterEditMode() {
      if (this._editing) return;
      this.setEditMode(true);
    },

    _saveEditMode() {
      this.setEditMode(false);
    },

    options: {
      render() {
        const x = Number(cfg("scoreboard.x")) || 92;
        const y = Number(cfg("scoreboard.y")) || 20;
        const background = cfg("scoreboard.backgroundColor") || "#0000008c";
        const border = cfg("scoreboard.borderColor") || "#121212";

        return `
                <div class="mod-description">
                    Customize the position and colors of the scoreboard
                </div>

                <div class="settings-section-title">
                    <span>General</span>
                    <div></div>
                </div>

                <div class="setting-row">
                    <label>Position</label>

                    <div style="display:flex;gap:6px;">
                        <button class="opt-btn" id="sb-edit">
                            Edit Mode
                        </button>

                        <button class="opt-btn" id="sb-save" style="display:none;">
                            Save
                        </button>
                    </div>
                </div>

                <div class="settings-section-title">
                    <span>Colors</span>
                    <div></div>
                </div>

                <div class="setting-row">
                    <label>Background</label>

                    <div style="display:flex;align-items:center;gap:8px;">
                        <input
                            type="color"
                            id="sb-bg-picker"
                            value="${background.slice(0, 7)}"
                            style="width:32px;height:28px;border:none;background:none;cursor:pointer;padding:0;"
                        >
                        <input
                            type="text"
                            id="sb-bg-text"
                            value="${background}"
                            style="width:72px;background:var(--background-1);border:1px solid var(--border-1);color:var(--white);border-radius:4px;padding:4px 6px;font-size:11px;outline:none;font-family:sans-serif;"
                        >
                    </div>
                </div>

                <div class="setting-row">
                    <label>Border</label>

                    <div style="display:flex;align-items:center;gap:8px;">
                        <input
                            type="color"
                            id="sb-border-picker"
                            value="${border.slice(0, 7)}"
                            style="width:32px;height:28px;border:none;background:none;cursor:pointer;padding:0;"
                        >
                        <input
                            type="text"
                            id="sb-border-text"
                            value="${border}"
                            style="width:72px;background:var(--background-1);border:1px solid var(--border-1);color:var(--white);border-radius:4px;padding:4px 6px;font-size:11px;outline:none;font-family:sans-serif;"
                        >
                    </div>
                </div>
            `;
      },

      bind() {
        const edit = byId("sb-edit");
        const save = byId("sb-save");

        const bgPicker = byId("sb-bg-picker");
        const bgText = byId("sb-bg-text");

        const borderPicker = byId("sb-border-picker");
        const borderText = byId("sb-border-text");

        const mod = MODS_BY_ID.get("scoreboard");

        edit.addEventListener("click", () => {
          mod._enterEditMode();
          if (edit) edit.style.display = "none";
          if (save) save.style.display = "";
        });

        save.addEventListener("click", () => {
          mod._saveEditMode();
          if (edit) edit.style.display = "";
          if (save) save.style.display = "none";
        });

        const updateBackground = (value) => {
          if (!/^#[0-9A-Fa-f]{6}(?:[0-9A-Fa-f]{2})?$/.test(value)) return;
          cfgSet("scoreboard.backgroundColor", value);
          if (bgPicker && value.length === 7) bgPicker.value = value;
          if (bgText) bgText.value = value;
          if (mod._editor) {
            mod._editor.style.background =
              mod._originalBackground || "rgba(0, 0, 0, 0.55)";
          }
          mod._lastAppliedSig = null;
          mod._apply();
        };

        bgPicker.addEventListener("input", () =>
          updateBackground(bgPicker.value),
        );
        bgText.addEventListener("change", () =>
          updateBackground(bgText.value.trim()),
        );

        const updateBorder = (value) => {
          if (!/^#[0-9A-Fa-f]{6}$/.test(value)) return;
          cfgSet("scoreboard.borderColor", value);
          if (borderPicker) borderPicker.value = value;
          if (borderText) borderText.value = value;
          mod._lastAppliedSig = null;
          mod._apply();
        };

        borderPicker.addEventListener("input", () =>
          updateBorder(borderPicker.value),
        );
        borderText.addEventListener("change", () =>
          updateBorder(borderText.value.trim()),
        );
      },
    },

    destroy() {
      if (this._tick) {
        Ticker.remove(this._tick);
        this._tick = null;
      }
      this._removeEditor();

      const scoreboard = document.querySelector(".scoreboard-overlay");
      if (scoreboard) {
        scoreboard.style.removeProperty("left");
        scoreboard.style.removeProperty("right");
        scoreboard.style.removeProperty("top");
        scoreboard.style.removeProperty("transform");
        scoreboard.style.removeProperty("background");
        scoreboard.style.removeProperty("border-color");
        scoreboard.style.removeProperty("visibility");
      }

      this._editing = false;
      this._lastAppliedSig = null;
    },
  });

  registerMod({
    id: "chatemojis",
    name: "Chat Emojis",
    category: ["utilities", "new"],
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-message-heart"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M8 9h8" /><path d="M8 13h3.5" /><path d="M10.48 19.512l-2.48 1.488v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v4" /><path d="M18 22l3.35 -3.284a2.143 2.143 0 0 0 .005 -3.071a2.242 2.242 0 0 0 -3.129 -.006l-.224 .22l-.223 -.22a2.242 2.242 0 0 0 -3.128 -.006a2.143 2.143 0 0 0 -.006 3.071l3.355 3.296" /></svg>`,
    hasOptions: true,

    _input: null,
    _dropdown: null,
    _observer: null,
    _tick: null,

    _boundInput: null,
    _boundKeydown: null,
    _boundKeyup: null,

    _suggestions: [],
    _selectedIndex: 0,
    _lastQuery: "",
    _consumeEnterKeyup: false,
    _dropdownDirty: false,
    _positionDirty: false,

    _emojis: {
      smile: "😄",
      smiley: "😃",
      grinning: "😀",
      grin: "😁",
      laugh: "😆",
      sweat_smile: "😅",
      joy: "😂",
      rofl: "🤣",
      wink: "😉",
      blush: "😊",
      innocent: "😇",
      heart_eyes: "😍",
      kissing_heart: "😘",
      thinking: "🤔",
      sus: "ඞ",
      cool: "😎",
      sunglasses: "😎",
      nerd: "🤓",
      confused: "😕",
      worried: "😟",
      angry: "😠",
      rage: "😡",
      cry: "😢",
      sob: "😭",
      scream: "😱",
      scared: "😨",
      tired: "😫",
      sleepy: "😴",
      dizzy: "😵",
      sick: "🤢",
      clown: "🤡",
      skull: "💀",
      ghost: "👻",
      poop: "💩",
      alien: "👽",
      robot: "🤖",
      heart: "❤️",
      orange_heart: "🧡",
      yellow_heart: "💛",
      green_heart: "💚",
      blue_heart: "💙",
      purple_heart: "💜",
      black_heart: "🖤",
      white_heart: "🤍",
      broken_heart: "💔",
      fire: "🔥",
      sparkles: "✨",
      star: "⭐",
      boom: "💥",
      zap: "⚡",
      hundred: "💯",
      thumbsup: "👍",
      thumbsdown: "👎",
      clap: "👏",
      pray: "🙏",
      wave: "👋",
      ok: "👌",
      peace: "✌️",
      muscle: "💪",
      point_up: "☝️",
      check: "✅",
      x: "❌",
      warning: "⚠️",
      question: "❓",
      exclamation: "❗",
      eyes: "👀",
      ears: "👂",
      nose: "👃",
      brain: "🧠",
      cat: "🐱",
      dog: "🐶",
      monkey: "🐒",
      panda: "🐼",
      bear: "🐻",
      pig: "🐷",
      frog: "🐸",
      chicken: "🐔",
      soccer: "⚽",
      basketball: "🏀",
      football: "🏈",
      baseball: "⚾",
      trophy: "🏆",
      medal: "🏅",
      rocket: "🚀",
      car: "🚗",
      plane: "✈️",
      ship: "🚢",
      gift: "🎁",
      tada: "🎉",
      party: "🥳",
      balloon: "🎈",
      music: "🎵",
      microphone: "🎤",
      coffee: "☕",
      pizza: "🍕",
      burger: "🍔",
      fries: "🍟",
      apple: "🍎",
      cake: "🎂",
      sun: "☀️",
      moon: "🌙",
      snowflake: "❄️",
      rainbow: "🌈",
    },

    _emojiEntries: null,

    init() {
      if (!cfg("chatemojis.enabled")) return;

      this._emojiEntries = Object.entries(this._emojis).map(([k, v]) => [
        k,
        v,
        k.toLowerCase(),
      ]);

      waitForBody(() => {
        this._injectStyles();
        this._observeChatInput();
        this._findInput();

        this._tick = Ticker.add(() => {
          this._findInput();
        }, 500);
      });
    },

    _findInput() {
      const input = document.getElementById("chatGame");
      if (!input) return;
      if (this._input === input) return;

      this._unbindInput();
      this._input = input;

      this._boundInput = () => this._handleInput();

      this._boundKeydown = (event) => this._handleKeydown(event);

      this._boundKeyup = (event) => {
        if (event.key === "Enter" && this._consumeEnterKeyup) {
          event.preventDefault();
          event.stopPropagation();
          event.stopImmediatePropagation();
          this._consumeEnterKeyup = false;
        }
      };

      input.addEventListener("input", this._boundInput);
      input.addEventListener("keydown", this._boundKeydown, true);
      input.addEventListener("keyup", this._boundKeyup, true);
    },

    _unbindInput() {
      if (!this._input) return;

      if (this._boundInput)
        this._input.removeEventListener("input", this._boundInput);
      if (this._boundKeydown)
        this._input.removeEventListener("keydown", this._boundKeydown, true);
      if (this._boundKeyup)
        this._input.removeEventListener("keyup", this._boundKeyup, true);

      this._input = null;
      this._boundInput = null;
      this._boundKeydown = null;
      this._boundKeyup = null;
      this._consumeEnterKeyup = false;
      this._hideDropdown();
    },

    _handleInput() {
      const input = this._input;
      if (!input) return;

      const value = input.value;
      if (value.trim().startsWith("/")) {
        this._hideDropdown();
        return;
      }

      const cursor =
        input.selectionStart != null ? input.selectionStart : value.length;
      const beforeCursor = value.substring(0, cursor);
      const match = beforeCursor.match(/(^|\s):([a-zA-Z0-9_+-]*)$/);

      if (!match) {
        this._hideDropdown();
        return;
      }

      const query = match[2].toLowerCase();
      this._lastQuery = query;
      this._showSuggestions(query);
    },

    _showSuggestions(query) {
      const entries = this._emojiEntries;
      if (!entries) return;

      const filtered = [];
      for (let i = 0; i < entries.length && filtered.length < 8; i++) {
        const e = entries[i];
        if (e[2].includes(query)) filtered.push([e[0], e[1]]);
      }

      this._suggestions = filtered;

      if (!filtered.length) {
        this._hideDropdown();
        return;
      }

      this._selectedIndex = 0;
      this._createDropdown();
      this._renderDropdown();
      this._positionDropdown();
    },

    _createDropdown() {
      if (this._dropdown) return;

      const dropdown = document.createElement("div");
      dropdown.id = "__cs_emoji_chat_dropdown";
      dropdown.className = "__cs_emoji_chat_dropdown";
      document.body.appendChild(dropdown);
      this._dropdown = dropdown;

      dropdown.addEventListener("mousedown", (event) => event.preventDefault());

      dropdown.addEventListener("click", (event) => {
        const item = event.target.closest(".__cs_emoji_item");
        if (!item) return;
        const index = Number(item.dataset.index);
        if (!Number.isFinite(index)) return;
        this._selectedIndex = index;
        this._insertSelectedEmoji();
      });
    },

    _renderDropdown() {
      if (!this._dropdown) return;

      const html = this._suggestions
        .map(
          ([name, emoji], index) => `
                        <div class="__cs_emoji_item ${
                          index === this._selectedIndex ? "selected" : ""
                        }" data-index="${index}">
                            <span class="__cs_emoji_icon">${emoji}</span>
                            <span class="__cs_emoji_name">:${name}</span>
                        </div>
                    `,
        )
        .join("");

      this._dropdown.innerHTML = html;
    },

    _positionDropdown() {
      if (!this._dropdown || !this._input) return;

      const rect = this._input.getBoundingClientRect();
      const dropdownRect = this._dropdown.getBoundingClientRect();

      let left = rect.left;
      let top = rect.top - dropdownRect.height - 6;

      if (top < 5) top = rect.bottom + 6;

      left = Math.max(
        5,
        Math.min(left, window.innerWidth - dropdownRect.width - 5),
      );
      top = Math.max(
        5,
        Math.min(top, window.innerHeight - dropdownRect.height - 5),
      );

      this._dropdown.style.left = `${left}px`;
      this._dropdown.style.top = `${top}px`;
    },

    _handleKeydown(event) {
      if (!this._dropdown) return;
      if (!this._suggestions.length) return;

      if (event.key === "Tab") {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        this._insertSelectedEmoji();
        return;
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();

        this._selectedIndex =
          this._selectedIndex <= 0
            ? this._suggestions.length - 1
            : this._selectedIndex - 1;

        this._renderDropdown();
        return;
      }

      if (event.key === "ArrowDown") {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();

        this._selectedIndex =
          this._selectedIndex >= this._suggestions.length - 1
            ? 0
            : this._selectedIndex + 1;

        this._renderDropdown();
        return;
      }

      if (event.key === "Enter" && this._suggestions.length) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        this._consumeEnterKeyup = true;
        this._insertSelectedEmoji();
        return;
      }

      if (event.key === "Escape") {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        this._hideDropdown();
      }
    },

    _insertSelectedEmoji() {
      const input = this._input;
      if (!input || !this._suggestions.length) return;

      const selected = this._suggestions[this._selectedIndex];
      if (!selected) return;

      const emoji = selected[1];
      const value = input.value;
      const cursor =
        input.selectionStart != null ? input.selectionStart : value.length;
      const beforeCursor = value.substring(0, cursor);
      const match = beforeCursor.match(/(^|\s):([a-zA-Z0-9_+-]*)$/);

      if (!match) {
        this._hideDropdown();
        return;
      }

      const matchStart = cursor - match[0].length;
      const colonStart = matchStart + match[1].length;
      const afterCursor = value.substring(cursor);

      const newValue = value.substring(0, colonStart) + emoji + afterCursor;
      const newCursor = colonStart + emoji.length;

      input.value = newValue;
      input.focus();
      input.setSelectionRange(newCursor, newCursor);
      input.dispatchEvent(new Event("input", { bubbles: true }));

      this._hideDropdown();
    },

    _hideDropdown() {
      this._suggestions = [];
      this._selectedIndex = 0;
      this._lastQuery = "";

      if (this._dropdown) {
        this._dropdown.remove();
        this._dropdown = null;
      }
    },

    _observeChatInput() {
      if (this._observer) return;

      this._observer = new MutationObserver(() => {
        this._findInput();
      });

      this._observer.observe(document.body, {
        childList: true,
        subtree: true,
      });
    },

    _injectStyles() {
      if (document.getElementById("__cs_emoji_chat_styles")) return;

      const style = document.createElement("style");
      style.id = "__cs_emoji_chat_styles";
      style.textContent = `
            .__cs_emoji_chat_dropdown {
                position: fixed;

                z-index: 999999;
                width: 220px;
                max-height: 300px;
                overflow-y: auto;
                padding: 5px;
                box-sizing: border-box;

                background: rgba(20, 20, 25, 0.96);
                border: 1px solid rgba(255, 255, 255, 0.15);
                border-radius: 7px;

                box-shadow:
                    0 6px 20px rgba(0, 0, 0, 0.35);

                font-family: Arial, sans-serif;
                backdrop-filter: blur(8px);
            }

            .__cs_emoji_item {
                display: flex;
                align-items: center;
                gap: 9px;

                height: 34px;
                padding: 0 9px;

                box-sizing: border-box;

                color: #fff;
                border-radius: 5px;

                cursor: pointer;
                user-select: none;

                font-size: 13px;
            }

            .__cs_emoji_item:hover,
            .__cs_emoji_item.selected {
                background: rgba(255, 255, 255, 0.12);
            }

            .__cs_emoji_icon {
                width: 24px;
                text-align: center;
                font-size: 19px;
                line-height: 1;
            }

            .__cs_emoji_name {
                opacity: 0.9;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            .__cs_emoji_chat_dropdown::-webkit-scrollbar {
            background: transparent !important;
                width: 5px !important;
            }

            .__cs_emoji_chat_dropdown::-webkit-scrollbar-thumb {
                background: rgba(255, 255, 255, 0.2) !important;
                border-radius: 5px !important;
            }
        `;

      document.head.appendChild(style);
    },

    options: {
      render() {
        return `
      <div class="mod-description">
        Type : in chat to show a list of emojis you can use
      </div>
    `;
      },
      bind() {},
    },

    destroy() {
      if (this._tick) {
        Ticker.remove(this._tick);
        this._tick = null;
      }
      if (this._observer) {
        this._observer.disconnect();
        this._observer = null;
      }
      this._unbindInput();
      const styles = document.getElementById("__cs_emoji_chat_styles");
      if (styles) styles.remove();
    },
  });

  registerMod({
    id: "guiscale",
    name: "GUI Scale",
    category: ["hud", "new"],
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-transform-point-top-left"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 4a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1l0 -2" fill="currentColor" /><path d="M3 18a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1l0 -2" /><path d="M17 4a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1l0 -2" /><path d="M17 18a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1l0 -2" /><path d="M11 5h2" /><path d="M5 11v2" /><path d="M19 11v2" /><path d="M11 19h2" /></svg>`,
    hasOptions: true,

    _tick: null,
    _lastSig: null,
    _vanillaCenterX: null,
    _vanillaWidth: null,

    _apply() {
      const hotbar = document.querySelector(".pocket-wrapper");
      const bars = document.querySelector(".bars");
      const inventory = document.querySelector(".items-manager");

      if (!cfg("guiscale.enabled")) {
        if (this._lastSig === "off") return;
        this._lastSig = "off";

        if (hotbar) {
          hotbar.style.removeProperty("transform");
          hotbar.style.removeProperty("transform-origin");
        }
        if (bars) {
          bars.style.removeProperty("transform");
          bars.style.removeProperty("transform-origin");
        }
        if (inventory) {
          inventory.style.removeProperty("transform");
          inventory.style.removeProperty("transform-origin");
        }
        return;
      }

      const hotbarScale = Number(cfg("guiscale.hotbar")) || 100;
      const inventoryScale = Number(cfg("guiscale.inventory")) || 100;

      const sig = `${hotbarScale}|${inventoryScale}`;
      if (this._lastSig === sig) return;
      this._lastSig = sig;

      if (hotbar) {
        const scale = hotbarScale / 100;
        const left = 25 - ((hotbarScale - 50) / 150) * 75;

        hotbar.style.setProperty("position", "fixed", "important");
        hotbar.style.setProperty("left", `${left}%`, "important");
        hotbar.style.setProperty("bottom", "0", "important");
        hotbar.style.setProperty(
          "transform",
          `translateX(0%) scale(${scale})`,
          "important",
        );
        hotbar.style.setProperty(
          "transform-origin",
          "center bottom",
          "important",
        );
      }

      if (bars) {
        bars.style.setProperty(
          "transform",
          `scale(${hotbarScale / 100})`,
          "important",
        );
        bars.style.setProperty(
          "transform-origin",
          "center bottom",
          "important",
        );
      }

      if (inventory) {
        inventory.style.setProperty(
          "transform",
          `scale(${inventoryScale / 100})`,
          "important",
        );
        inventory.style.setProperty(
          "transform-origin",
          "center center",
          "important",
        );
      }
    },

    init() {
      this._tick = Ticker.add(() => {
        this._apply();
      }, 0);
    },

    options: {
      render() {
        const hb = cfg("guiscale.hotbar");
        const hotbar = hb != null ? hb : 100;

        const inv = cfg("guiscale.inventory");
        const inventory = inv != null ? inv : 100;

        return `
                <div class="mod-description">
                    Change the size of the inventory or hotbar
                </div>

                <div class="settings-section-title">
                    <span>General</span>
                    <div></div>
                </div>

                <div class="setting-row">
                    <label>Hotbar Scale</label>

                    <div class="setting-inline">
                        <input
                            type="range"
                            id="gs-hotbar"
                            min="50"
                            max="200"
                            step="5"
                            value="${hotbar}"
                        >

                        <div class="range-val" id="gs-hotbar-val">
                            ${hotbar}%
                        </div>
                    </div>
                </div>

                <div class="setting-row">
                    <label>Inventory Scale</label>

                    <div class="setting-inline">
                        <input
                            type="range"
                            id="gs-inventory"
                            min="50"
                            max="200"
                            step="5"
                            value="${inventory}"
                        >

                        <div class="range-val" id="gs-inventory-val">
                            ${inventory}%
                        </div>
                    </div>
                </div>
            `;
      },

      bind() {
        bindSlider(
          "gs-hotbar",
          "gs-hotbar-val",
          "guiscale.hotbar",
          (v) => `${parseFloat(v)}%`,
          parseFloat,
        );

        bindSlider(
          "gs-inventory",
          "gs-inventory-val",
          "guiscale.inventory",
          (v) => `${parseFloat(v)}%`,
          parseFloat,
        );
      },
    },

    destroy() {
      if (this._tick) {
        Ticker.remove(this._tick);
        this._tick = null;
      }

      const hotbar = document.querySelector(".pocket-wrapper");
      const bars = document.querySelector(".bars");
      const inventory = document.querySelector(".items-manager");

      if (hotbar) {
        hotbar.style.removeProperty("position");
        hotbar.style.removeProperty("left");
        hotbar.style.removeProperty("bottom");
        hotbar.style.removeProperty("transform");
        hotbar.style.removeProperty("transform-origin");
      }
      if (bars) {
        bars.style.removeProperty("transform");
        bars.style.removeProperty("transform-origin");
      }
      if (inventory) {
        inventory.style.removeProperty("transform");
        inventory.style.removeProperty("transform-origin");
      }

      this._lastSig = null;
    },
  });

  registerMod({
    id: "actionbar",
    name: "Action Bar",
    category: ["hud", "new"],
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="3" y="6" width="18" height="12" rx="2"/>
        <path d="M7 10h10"/>
        <path d="M7 14h6"/>
    </svg>`,
    hasOptions: true,

    _tick: null,
    _editor: null,
    _editing: false,
    _dragging: false,
    _dragOffsetX: 0,
    _dragOffsetY: 0,
    _originalBackground: null,
    _originalBorder: null,
    _lastSig: null,

    init() {
      waitForBody(() => {
        this._apply();

        this._tick = Ticker.add(() => {
          this._apply();

          if (this._editing) {
            const save = byId("ab-save");
            if (!save || save.offsetParent === null) this.setEditMode(false);
          }
        }, 100);
      });
    },

    _getPosition() {
      return {
        x: Number(cfg("actionbar.x")) || 50,
        y: Number(cfg("actionbar.y")) || 80,
      };
    },

    _apply() {
      if (this._editing) return;

      const actionBar = document.querySelector(".action-bar-overlay");
      const wrapper = document.querySelector(".action-bar-wrapper");

      if (!actionBar || !wrapper) return;

      if (this._originalBackground === null) {
        this._originalBackground = getComputedStyle(actionBar).backgroundColor;
      }
      if (this._originalBorder === null) {
        this._originalBorder = getComputedStyle(actionBar).borderColor;
      }

      if (!cfg("actionbar.enabled")) {
        if (this._lastSig === "off") return;
        this._lastSig = "off";

        wrapper.style.removeProperty("position");
        wrapper.style.removeProperty("left");
        wrapper.style.removeProperty("bottom");
        wrapper.style.removeProperty("width");
        wrapper.style.removeProperty("height");
        wrapper.style.removeProperty("padding-bottom");
        wrapper.style.removeProperty("justify-content");
        wrapper.style.removeProperty("align-items");

        actionBar.style.removeProperty("background");
        actionBar.style.removeProperty("border-color");
        actionBar.style.removeProperty("left");
        actionBar.style.removeProperty("right");
        actionBar.style.removeProperty("top");
        actionBar.style.removeProperty("bottom");
        actionBar.style.removeProperty("transform");
        return;
      }

      const { x, y } = this._getPosition();
      const background = cfg("actionbar.backgroundColor") || "#00000080";
      const border = cfg("actionbar.borderColor") || "#121212";

      const sig = `${x}|${y}|${background}|${border}`;
      if (this._lastSig === sig) return;
      this._lastSig = sig;

      wrapper.style.setProperty("position", "fixed", "important");
      wrapper.style.setProperty("left", "0", "important");
      wrapper.style.setProperty("bottom", "0", "important");
      wrapper.style.setProperty("width", "100vw", "important");
      wrapper.style.setProperty("height", "100vh", "important");
      wrapper.style.setProperty("box-sizing", "border-box", "important");
      wrapper.style.setProperty("padding", "0", "important");

      actionBar.style.setProperty("position", "absolute", "important");
      actionBar.style.setProperty("left", `${x}%`, "important");
      actionBar.style.setProperty("top", `${y}%`, "important");
      actionBar.style.setProperty("right", "auto", "important");
      actionBar.style.setProperty("bottom", "auto", "important");
      actionBar.style.setProperty(
        "transform",
        "translate(-50%, -50%)",
        "important",
      );
      actionBar.style.setProperty("background", background, "important");
      actionBar.style.setProperty("border-color", border, "important");
    },

    _createEditor() {
      if (this._editor) return;

      const { x, y } = this._getPosition();

      const editor = document.createElement("div");
      editor.id = "__cs_actionbar_editor";
      editor.innerHTML = `
            <div class="cs-ab-editor-title">
                Preview
            </div>
        `;

      Object.assign(editor.style, {
        position: "fixed",
        left: `${x}%`,
        top: `${y}%`,
        transform: "translate(-50%, -50%)",
        width: "500px",
        boxSizing: "border-box",
        padding: "8px 16px",
        background: cfg("actionbar.backgroundColor") || "rgba(0, 0, 0, 0.5)",
        border: "2px dashed #a855f7",
        borderRadius: "8px",
        color: "#fff",
        fontSize: "24px",
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
        textShadow: "1px 1px 2px #0009",
        boxShadow: "0 2px 8px #00000040",
        zIndex: "2147483646",
        cursor: "move",
        userSelect: "none",
        pointerEvents: "auto",
      });

      const title = editor.querySelector(".cs-ab-editor-title");
      Object.assign(title.style, {
        fontWeight: "700",
        fontFamily: "Lilita One",
        fontSize: "25px",
        marginBottom: "5px",
        textAlign: "center",
      });

      document.body.appendChild(editor);
      this._editor = editor;
      this._bindEditorDrag();
    },

    _bindEditorDrag() {
      if (!this._editor) return;

      this._editor.addEventListener("mousedown", (event) => {
        if (event.button !== 0) return;
        this._dragging = true;
        const rect = this._editor.getBoundingClientRect();
        this._dragOffsetX = event.clientX - rect.left;
        this._dragOffsetY = event.clientY - rect.top;
        event.preventDefault();
      });

      this._editor._csMouseMove = (event) => {
        if (!this._dragging || !this._editor) return;

        const width = this._editor.offsetWidth;
        const height = this._editor.offsetHeight;

        let left = event.clientX - this._dragOffsetX;
        let top = event.clientY - this._dragOffsetY;

        left = Math.max(0, Math.min(left, window.innerWidth - width));
        top = Math.max(0, Math.min(top, window.innerHeight - height));

        const centerX = left + width / 2;
        const centerY = top + height / 2;

        const x = (centerX / window.innerWidth) * 100;
        const y = (centerY / window.innerHeight) * 100;

        this._editor.style.left = `${x}%`;
        this._editor.style.top = `${y}%`;

        cfgSet("actionbar.x", x);
        cfgSet("actionbar.y", y);

        const xVal = byId("ab-x-val");
        const yVal = byId("ab-y-val");
        if (xVal) xVal.textContent = `${Math.round(x)}%`;
        if (yVal) yVal.textContent = `${Math.round(y)}%`;
      };

      this._editor._csMouseUp = () => {
        this._dragging = false;
      };

      document.addEventListener("mousemove", this._editor._csMouseMove);
      document.addEventListener("mouseup", this._editor._csMouseUp);
    },

    setEditMode(on) {
      this._editing = on;

      if (on) {
        this._createEditor();
        const actionBar = document.querySelector(".action-bar-overlay");
        if (actionBar) actionBar.style.visibility = "hidden";
      } else {
        this._removeEditor();
        const actionBar = document.querySelector(".action-bar-overlay");
        if (actionBar) actionBar.style.visibility = "";
        this._lastSig = null;
        this._apply();
      }
    },

    _removeEditor() {
      if (this._editor) {
        try {
          document.removeEventListener("mousemove", this._editor._csMouseMove);
          document.removeEventListener("mouseup", this._editor._csMouseUp);
        } catch (e) {}
        try {
          this._editor.remove();
        } catch (e) {}
        this._editor = null;
      }

      this._dragging = false;
      this._editing = false;

      const actionBar = document.querySelector(".action-bar-overlay");
      if (actionBar) actionBar.style.visibility = "";
    },

    _enterEditMode() {
      if (this._editing) return;
      this.setEditMode(true);
    },

    _saveEditMode() {
      this.setEditMode(false);
    },

    options: {
      render() {
        const background = cfg("actionbar.backgroundColor") || "#00000080";
        const border = cfg("actionbar.borderColor") || "#121212";

        return `
                <div class="mod-description">
                    Customize the position and colors of the action bar
                </div>

                <div class="settings-section-title">
                    <span>General</span>
                    <div></div>
                </div>

                <div class="setting-row">
                    <label>Position</label>

                    <div style="display:flex;gap:6px;">
                        <button class="opt-btn" id="ab-edit">
                            Edit Mode
                        </button>

                        <button class="opt-btn" id="ab-save" style="display:none;">
                            Save
                        </button>
                    </div>
                </div>

                <div class="settings-section-title">
                    <span>Colors</span>
                    <div></div>
                </div>

                <div class="setting-row">
                    <label>Background</label>

                    <div style="display:flex;align-items:center;gap:8px;">
                        <input
                            type="color"
                            id="ab-bg-picker"
                            value="${background.slice(0, 7)}"
                            style="width:32px;height:28px;border:none;background:none;cursor:pointer;padding:0;"
                        >
                        <input
                            type="text"
                            id="ab-bg-text"
                            value="${background}"
                            style="width:72px;background:var(--background-1);border:1px solid var(--border-1);color:var(--white);border-radius:4px;padding:4px 6px;font-size:11px;outline:none;font-family:sans-serif;"
                        >
                    </div>
                </div>

                <div class="setting-row">
                    <label>Border</label>

                    <div style="display:flex;align-items:center;gap:8px;">
                        <input
                            type="color"
                            id="ab-border-picker"
                            value="${border.slice(0, 7)}"
                            style="width:32px;height:28px;border:none;background:none;cursor:pointer;padding:0;"
                        >
                        <input
                            type="text"
                            id="ab-border-text"
                            value="${border}"
                            style="width:72px;background:var(--background-1);border:1px solid var(--border-1);color:var(--white);border-radius:4px;padding:4px 6px;font-size:11px;outline:none;font-family:sans-serif;"
                        >
                    </div>
                </div>
            `;
      },

      bind() {
        const edit = byId("ab-edit");
        const save = byId("ab-save");

        const bgPicker = byId("ab-bg-picker");
        const bgText = byId("ab-bg-text");
        const borderPicker = byId("ab-border-picker");
        const borderText = byId("ab-border-text");

        const mod = MODS_BY_ID.get("actionbar");

        edit.addEventListener("click", () => {
          mod._enterEditMode();
          if (edit) edit.style.display = "none";
          if (save) save.style.display = "";
        });

        save.addEventListener("click", () => {
          mod._saveEditMode();
          if (edit) edit.style.display = "";
          if (save) save.style.display = "none";
        });

        const updateBackground = (value) => {
          if (!/^#[0-9A-Fa-f]{6}(?:[0-9A-Fa-f]{2})?$/.test(value)) return;
          cfgSet("actionbar.backgroundColor", value);
          if (bgPicker && value.length === 7) bgPicker.value = value;
          if (bgText) bgText.value = value;
          if (mod._editor) mod._editor.style.background = value;
          mod._lastSig = null;
          mod._apply();
        };

        bgPicker.addEventListener("input", () =>
          updateBackground(bgPicker.value),
        );
        bgText.addEventListener("change", () =>
          updateBackground(bgText.value.trim()),
        );

        const updateBorder = (value) => {
          if (!/^#[0-9A-Fa-f]{6}$/.test(value)) return;
          cfgSet("actionbar.borderColor", value);
          if (borderPicker) borderPicker.value = value;
          if (borderText) borderText.value = value;
          if (mod._editor) mod._editor.style.borderColor = value;
          mod._lastSig = null;
          mod._apply();
        };

        borderPicker.addEventListener("input", () =>
          updateBorder(borderPicker.value),
        );
        borderText.addEventListener("change", () =>
          updateBorder(borderText.value.trim()),
        );
      },
    },

    destroy() {
      if (this._tick) {
        Ticker.remove(this._tick);
        this._tick = null;
      }
      this._removeEditor();

      const actionBar = document.querySelector(".action-bar-overlay");
      const wrapper = document.querySelector(".action-bar-wrapper");

      if (actionBar) {
        actionBar.style.removeProperty("position");
        actionBar.style.removeProperty("left");
        actionBar.style.removeProperty("right");
        actionBar.style.removeProperty("top");
        actionBar.style.removeProperty("bottom");
        actionBar.style.removeProperty("transform");
        actionBar.style.removeProperty("background");
        actionBar.style.removeProperty("border-color");
        actionBar.style.removeProperty("visibility");
      }

      if (wrapper) {
        wrapper.style.removeProperty("position");
        wrapper.style.removeProperty("left");
        wrapper.style.removeProperty("bottom");
        wrapper.style.removeProperty("width");
        wrapper.style.removeProperty("height");
        wrapper.style.removeProperty("box-sizing");
        wrapper.style.removeProperty("padding");
      }

      this._editing = false;
      this._lastSig = null;
    },
  });

  registerMod({
    id: "customui",
    name: "Custom UI",
    category: ["hud", "new"],
    icon: `<rect x="3" y="3" width="18" height="18" rx="2"/>
           <path d="M7 8h10M7 12h6M7 16h8"/>`,
    hasOptions: true,

    init() {
      this.styleId = "__celestar_custom_ui";
      this.applyUI();
    },

    apply() {
      this.applyUI();
    },

    applyUI() {
      const existing = document.getElementById(this.styleId);
      if (existing) existing.remove();

      if (!cfg("customui.enabled")) return;

      const css = cfg("customui.css");
      if (!css) return;

      const style = document.createElement("style");
      style.id = this.styleId;
      style.textContent = css;
      document.head.appendChild(style);
    },

    options: {
      render() {
        const css = cfg("customui.css") || "";
        const name = cfg("customui.name") || "";

        return `
                <div class="mod-description">
                    Customize the game's UI with CSS
                </div>

                <div class="settings-section-title">
                    <span>General</span>
                    <div></div>
                </div>

                <div class="setting-row">
                    <label>Status</label>
                    <span id="customui-status"
                        style="font-size:12px;color:${
                          css ? "var(--enabled)" : "var(--grey-2)"
                        };">
                        ${name + " installed" || "No UI installed"}
                    </span>
                </div>

                <div class="setting-row">
                    <label>Upload</label>
                    <div style="display:flex;gap:6px;">
                        <button class="opt-btn" id="customui-upload">
                            Upload .css
                        </button>

                        <button class="opt-btn" id="customui-browse">
                            Browse
                        </button>

                        <button
                            class="opt-btn"
                            id="customui-reset"
                            style="color:#e05252;border-color:#e05252;">
                            Reset
                        </button>
                    </div>
                </div>

                <div
                    id="customui-browse-panel"
                    style="
                        display:none;
                        flex-direction:column;
                        gap:8px;
                        margin-top:4px;
                    "
                >
                    <div style="
                        display:flex;
                        align-items:center;
                        justify-content:space-between;
                    ">
                        <span style="
                            font-size:13px;
                            color:var(--grey-1);
                            font-weight:600;
                        ">
                            Browse UIs
                        </span>
                    </div>

                    <div
                        id="customui-browse-list"
                        style="
                            display:grid;
                            grid-template-columns:1fr 1fr;
                            gap:8px;
                            max-height:300px;
                            overflow-y:auto;
                        "
                    ></div>
                </div>
            `;
      },

      bind() {
        const statusEl = byId("customui-status");
        const browsePanel = byId("customui-browse-panel");
        const browseList = byId("customui-browse-list");

        const mainRows = document.querySelectorAll(
          "#__cs_options_body .setting-row, " +
            "#__cs_options_body .mod-description, " +
            "#__cs_options_body .settings-section-title",
        );

        function updateStatus(name) {
          if (!statusEl) return;
          statusEl.textContent = name || "No UI installed";
          statusEl.style.color = name ? "var(--enabled)" : "var(--grey-2)";
        }

        function showMain() {
          mainRows.forEach((r) => (r.style.display = ""));
          if (browsePanel) browsePanel.style.display = "none";
        }

        function showBrowse() {
          mainRows.forEach((r) => (r.style.display = "none"));
          if (browsePanel) browsePanel.style.display = "flex";
        }

        function applyCSS(css) {
          const old = document.getElementById("__celestar_custom_ui");
          if (old) old.remove();
          if (!css) return;

          const style = document.createElement("style");
          style.id = "__celestar_custom_ui";
          style.textContent = css;
          document.head.appendChild(style);
        }

        byId("customui-upload").addEventListener("click", () => {
          const inp = document.createElement("input");
          inp.type = "file";
          inp.accept = ".css,text/css";

          inp.onchange = async (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const css = await file.text();
            cfgSet("customui.css", css);
            cfgSet("customui.name", file.name);
            cfgSet("customui.enabled", true);

            applyCSS(css);
            updateStatus(file.name);

            const card = document.querySelector(
              `#__cs_menu .card[data-mod="customui"]`,
            );
            if (card) {
              card.classList.add("enabled");
              const tb = card.querySelector(".toggle-btn");
              if (tb) tb.textContent = "Enabled";
            }
          };

          inp.click();
        });

        byId("customui-reset").addEventListener("click", () => {
          cfgSet("customui.css", "");
          cfgSet("customui.name", "");
          cfgSet("customui.enabled", false);

          const style = document.getElementById("__celestar_custom_ui");
          if (style) style.remove();

          updateStatus("");

          const card = document.querySelector(
            `#__cs_menu .card[data-mod="customui"]`,
          );
          if (card) {
            card.classList.remove("enabled");
            const tb = card.querySelector(".toggle-btn");
            if (tb) tb.textContent = "Disabled";
          }
        });

        byId("customui-browse").addEventListener("click", async () => {
          showBrowse();

          browseList.innerHTML = `
                        <div style="
                            grid-column:1/-1;
                            font-size:11px;
                            color:var(--grey-2);
                            text-align:center;
                            padding:16px;
                        ">
                            Loading…
                        </div>
                    `;

          try {
            const res = await fetch(
              `https://celestarminefun.github.io/client/ui.json?t=${Date.now()}`,
            );
            const uis = await res.json();

            browseList.innerHTML = "";

            if (!uis.length) {
              browseList.innerHTML = `
                                <div style="
                                    grid-column:1/-1;
                                    font-size:11px;
                                    color:var(--grey-2);
                                    text-align:center;
                                    padding:16px;
                                ">
                                    No UIs yet
                                </div>
                            `;
              return;
            }

            uis.forEach((ui) => {
              const card = document.createElement("div");
              card.style.cssText = `
                                background:var(--background-4);
                                border:1px solid var(--border-2);
                                border-radius:6px;
                                overflow:hidden;
                            `;

              card.innerHTML = `
                                <div style="
                                    width:100%;
                                    height:80px;
                                    background:var(--background-1);
                                    overflow:hidden;
                                ">
                                    <img
                                        src="${ui.preview}"
                                        style="
                                            width:100%;
                                            height:100%;
                                            object-fit:cover;
                                        "
                                        onerror="this.style.display='none'"
                                    >
                                </div>

                                <div style="
                                    display:flex;
                                    align-items:center;
                                    justify-content:space-between;
                                    padding:8px 10px;
                                    gap:8px;
                                ">
                                    <div style="min-width:0;">
                                        <div style="
                                            font-size:12px;
                                            font-weight:600;
                                            color:var(--white);
                                        ">
                                            ${escHtml(ui.name)}
                                        </div>

                                        <div style="
                                            font-size:10px;
                                            color:var(--grey-2);
                                            margin-top:2px;
                                        ">
                                            by ${escHtml(ui.creator)}
                                        </div>
                                    </div>

                                    <button
                                        class="opt-btn customui-install"
                                        style="
                                            font-size:11px;
                                            padding:4px 10px;
                                            background:var(--enabled);
                                            border-color:var(--enabled-hover);
                                        "
                                    >
                                        Install
                                    </button>
                                </div>
                            `;

              const btn = card.querySelector(".customui-install");

              btn.addEventListener("click", async () => {
                btn.textContent = "Installing…";
                btn.disabled = true;

                try {
                  const r = await fetch(ui.file);
                  if (!r.ok) throw new Error("Failed to fetch CSS");

                  const css = await r.text();
                  cfgSet("customui.css", css);
                  cfgSet("customui.name", ui.name);
                  cfgSet("customui.enabled", true);

                  applyCSS(css);
                  updateStatus(ui.name + " installed");

                  const menuCard = document.querySelector(
                    `#__cs_menu .card[data-mod="customui"]`,
                  );
                  if (menuCard) {
                    menuCard.classList.add("enabled");
                    const tb = menuCard.querySelector(".toggle-btn");
                    if (tb) tb.textContent = "Enabled";
                  }

                  btn.textContent = "Installed";
                  showMain();
                } catch (err) {
                  btn.textContent = "Failed";
                  btn.disabled = false;
                }
              });

              browseList.appendChild(card);
            });
          } catch (err) {
            browseList.innerHTML = `
                            <div style="
                                grid-column:1/-1;
                                font-size:11px;
                                color:#e05252;
                                text-align:center;
                                padding:16px;
                            ">
                                Failed to load
                            </div>
                        `;
          }
        });

        byId("customui-browse-back").addEventListener("click", showMain);
      },
    },
  });

  /*
    * Copyright © 2026 Celestar / thetalkingcat
    * ALL RIGHTS RESERVED

    * This source code is proprietary. Copying, reusing, modifying, redistributing with or without AI without explicit
    * permission from the creator (thetalkingcat) is strictly prohibited.

    * Permission is REQUIRED for any reuse.
  */

  // -- MENU CSS
  const MENU_CSS = `
  #__cs_menu .tabs,
#__cs_menu .title {
    gap: 8px;
    display: flex;
}
#__cs_menu,
#__cs_options_panel {
    background: var(--background-2);
}
#__cs_menu .header,
#__cs_options_header {
    border-bottom: 1px solid var(--border-1);
}
#__cs_menu .mods,
#__cs_options_body {
    overflow-y: auto;
    padding: 12px;
    gap: 12px;
}
#__cs_menu,
#__cs_menu * {
    box-sizing: border-box;
    font-family: sans-serif !important;
    margin: 0;
    padding: 0;
}
#__cs_menu[data-theme="dark"] {
    --background-1: #0b0b15;
    --background-2: #15121f;
    --background-3: #191221;
    --background-4: #1b1623;
    --background-5: #231c2e;
    --border-1: #23232f;
    --border-2: #2f2f3f;
    --primary-1: #7b2fe6;
    --white: #e6f1ff;
    --grey-1: #b6b6b6;
    --grey-2: #807f7f;
    --shadow: 0, 0, 0, 0.5;
    --enabled: #23bd61;
    --enabled-hover: #2ca45c;
    --disabled: #a32444;
    --disabled-hover: #8f203b;
}
#__cs_menu[data-theme="rose-gold"] {
    --background-1: #211317;
    --background-2: #2b181f;
    --background-3: #351d25;
    --background-4: #3d222b;
    --background-5: #472832;
    --border-1: #4a2d35;
    --border-2: #5a3540;
    --primary-1: #f09aaa;
    --white: #fff5f6;
    --grey-1: #edc7cc;
    --grey-2: #bd8992;
    --shadow: 0, 0, 0, 0.5;
    --enabled: #d47789;
    --enabled-hover: #e28698;
    --disabled: #914657;
    --disabled-hover: #a94f63;
}
#__cs_menu[data-theme="light"] {
    --background-1: #e8eaf0;
    --background-2: #f2f3f7;
    --background-3: #e4e6ed;
    --background-4: #dfe1e8;
    --background-5: #d8dae2;
    --border-1: #d1d3dc;
    --border-2: #c4c7d1;
    --primary-1: #7656c7;
    --white: #24242b;
    --grey-1: #62636b;
    --grey-2: #8a8b93;
    --shadow: 0, 0, 0, 0.18;
    --enabled: #3fa96b;
    --enabled-hover: #4fba7a;
    --disabled: #c65368;
    --disabled-hover: #d66377;
}
#__cs_menu[data-theme="midnight-blue"] {
    --background-1: #101722;
    --background-2: #151d2a;
    --background-3: #1b2533;
    --background-4: #202b3a;
    --background-5: #263343;
    --border-1: #283545;
    --border-2: #344457;
    --primary-1: #668fd1;
    --white: #e9eef7;
    --grey-1: #b3bdcc;
    --grey-2: #7f8b9d;
    --shadow: 0, 0, 0, 0.5;
    --enabled: #4d8fd1;
    --enabled-hover: #5da0e2;
    --disabled: #8b6fc4;
    --disabled-hover: #9a7ed3;
}
#__cs_menu[data-theme="dusk"] {
    --background-1: #1b1820;
    --background-2: #242029;
    --background-3: #2c2631;
    --background-4: #332c37;
    --background-5: #3a323e;
    --border-1: #403744;
    --border-2: #4d4351;
    --primary-1: #b486c5;
    --white: #f1ebf2;
    --grey-1: #c5bbc7;
    --grey-2: #918692;
    --shadow: 0, 0, 0, 0.5;
    --enabled: #b080c5;
    --enabled-hover: #c08fd4;
    --disabled: #c58b72;
    --disabled-hover: #d49a80;
}
#__cs_menu[data-theme="olive-green"] {
    --background-1: #171b16;
    --background-2: #20251e;
    --background-3: #282e25;
    --background-4: #30372c;
    --background-5: #384033;
    --border-1: #394034;
    --border-2: #48503f;
    --primary-1: #a3b86c;
    --white: #eef2e5;
    --grey-1: #c2c9b5;
    --grey-2: #8d9681;
    --shadow: 0, 0, 0, 0.5;
    --enabled: #91b85f;
    --enabled-hover: #a1c96d;
    --disabled: #b88c5f;
    --disabled-hover: #c79b6c;
}
#__cs_menu[data-theme="dark-ocean"] {
    --background-1: #0d171b;
    --background-2: #121f24;
    --background-3: #18282e;
    --background-4: #1d3037;
    --background-5: #233840;
    --border-1: #263b42;
    --border-2: #304b53;
    --primary-1: #55b6c4;
    --white: #e6f2f4;
    --grey-1: #b4c8cc;
    --grey-2: #7d969c;
    --shadow: 0, 0, 0, 0.5;
    --enabled: #4fa9b7;
    --enabled-hover: #5dbbca;
    --disabled: #8b719f;
    --disabled-hover: #9b7eaf;
}
#__cs_menu[data-theme="aurora"] {
    --background-1: #10151f;
    --background-2: #151c29;
    --background-3: #1b2433;
    --background-4: #202b3c;
    --background-5: #263346;
    --border-1: #29364a;
    --border-2: #35455b;
    --primary-1: #76b9d8;
    --white: #eaf1f7;
    --grey-1: #b9c7d5;
    --grey-2: #8191a3;
    --shadow: 0, 0, 0, 0.5;
    --enabled: #62bfa0;
    --enabled-hover: #73cdae;
    --disabled: #a47bc2;
    --disabled-hover: #b58bd0;
}
#__cs_menu[data-theme="maroon"] {
    --background-1: #1a0c0e;
    --background-2: #240f12;
    --background-3: #2d1216;
    --background-4: #35161a;
    --background-5: #3d1a1e;
    --border-1: #421f23;
    --border-2: #51272c;
    --primary-1: #c43d4d;
    --white: #f5e9ea;
    --grey-1: #cdb6b8;
    --grey-2: #987f82;
    --shadow: 0, 0, 0, 0.5;
    --enabled: #bd3f50;
    --enabled-hover: #cc4c5c;
    --disabled: #8f6267;
    --disabled-hover: #a07075;
}
#__cs_menu[data-theme="light-mint"] {
    --background-1: #e8f3ef;
    --background-2: #f0f8f5;
    --background-3: #e2efeb;
    --background-4: #dcebe6;
    --background-5: #d5e7e1;
    --border-1: #c8ddd6;
    --border-2: #b9d2c9;
    --primary-1: #45af91;
    --white: #1e2c29;
    --grey-1: #5f716c;
    --grey-2: #899b96;
    --shadow: 0, 0, 0, 0.16;
    --enabled: #3da886;
    --enabled-hover: #4bb998;
    --disabled: #b56f7c;
    --disabled-hover: #c27e8b;
}
#__cs_menu[data-theme="warm-silver"] {
    --background-1: #e9e7e3;
    --background-2: #f1efeb;
    --background-3: #e5e2dd;
    --background-4: #dedbd5;
    --background-5: #d7d4ce;
    --border-1: #d0cdc6;
    --border-2: #c2beb6;
    --primary-1: #8d8478;
    --white: #292824;
    --grey-1: #67645e;
    --grey-2: #918d85;
    --shadow: 0, 0, 0, 0.18;
    --enabled: #718f82;
    --enabled-hover: #819f91;
    --disabled: #a98278;
    --disabled-hover: #b79186;
}
#__cs_menu[data-theme="burnt-orange"] {
    --background-1: #1b120e;
    --background-2: #251713;
    --background-3: #2e1d17;
    --background-4: #362219;
    --background-5: #3e281d;
    --border-1: #452d21;
    --border-2: #55372a;
    --primary-1: #c87845;
    --white: #f4ebe5;
    --grey-1: #cbbab0;
    --grey-2: #968278;
    --shadow: 0, 0, 0, 0.5;
    --enabled: #c58b4d;
    --enabled-hover: #d39a5b;
    --disabled: #a86c63;
    --disabled-hover: #b87a70;
}
#__cs_menu[data-theme="legacy-dark"] {
    --background-1: #101014;
    --background-2: #17171d;
    --background-3: #1d1d24;
    --background-4: #23232b;
    --background-5: #2a2a33;
    --border-1: #303039;
    --border-2: #3c3c48;
    --primary-1: #7b2fe6;
    --white: #e6e1ee;
    --grey-1: #b2adb8;
    --grey-2: #7d7884;
    --shadow: 0, 0, 0, 0.55;
    --enabled: #8b55d1;
    --enabled-hover: #9b67df;
    --disabled: #a34c68;
    --disabled-hover: #b35a76;
}
#__cs_menu {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 999999;
    width: 500px;
    height: 450px;
    border: 1px solid var(--border-1);
    border-radius: 6px;
    overflow: hidden;
    color: #fff;
    box-shadow: 0 0 1rem rgba(var(--shadow));
    display: none;
    flex-direction: column;
    user-select: none;
}
#__cs_menu.open {
    display: flex;
}
#__cs_menu .header {
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    background: var(--background-1);
    flex-shrink: 0;
}
#__cs_menu .search input,
#__cs_menu .tab {
    background: 0 0;
    font-family: sans-serif !important;
}

#__cs_menu .tab-disabled {
    opacity: 0.4;
    cursor: not-allowed;
    position: relative;
}
#__cs_menu .tab-disabled:hover {
    background: var(--background-1);
    color: var(--grey-2);
    border-color: var(--border-1);
    cursor: not-allowed;
}

#__cs_menu .title {
    align-items: center;
    color: var(--white);
    font-size: 16px;
    font-weight: 600;
}
#__cs_menu .tab {
    border: 1.5px solid var(--border-1);
    border-radius: 4px;
    color: var(--grey-2);
    cursor: pointer;
    padding: 4px 14px;
    font-size: 13px;
    transition: 0.15s;
}
#__cs_menu .tab.active {
    background: var(--background-3);
    color: var(--white);
}
#__cs_menu .tab:hover:not(.active) {
    background: var(--background-2);
    color: var(--white);
}
#__cs_menu .close {
    width: 28px;
    height: 28px;
    border: 1.5px solid var(--border-1);
    background: var(--background-3);
    color: var(--white);
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.15s;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    font-family: sans-serif !important;
}
#__cs_menu .close:hover {
    background: var(--background-4);
}
#__cs_menu .toolbar {
    padding: 8px;
    display: flex;
    align-items: center;
    gap: 6px;
    flex-shrink: 0;
}
#__cs_menu .search {
    background: var(--background-1);
    border: 1px solid var(--border-1);
    display: flex;
    align-items: center;
    flex-shrink: 0;
}
#__cs_menu .categories {
    display: flex;
    align-items: center;
    gap: 4px;
}
#__cs_menu .search,
#__cs_options_header {
    align-items: center;
    background: var(--background-1);
}
#__cs_menu .category-btn {
    height: 30px;
    padding: 0 9px;
    background: var(--background-1);
    border: 1px solid var(--border-1);
    border-radius: 5px;
    color: var(--grey-2);
    cursor: pointer;
    font-size: 11px;
    font-family: sans-serif !important;
    transition:
        background 0.15s,
        color 0.15s,
        border-color 0.15s;
}
#__cs_menu .category-btn.active,
#__cs_menu .category-btn:hover {
    background: var(--background-3);
    color: var(--white);
}
#__cs_menu .search {
    width: 190px;
    height: 30px;
    border: 1px solid var(--border-1);
    border-radius: 6px;
    display: flex;
    padding: 0 10px;
    gap: 7px;
}
#__cs_menu .search svg {
    color: var(--grey-2);
    flex-shrink: 0;
}
#__cs_menu .search input {
    flex: 1;
    border: none;
    outline: 0;
    color: var(--white);
    font-size: 12px;
}
#__cs_menu .search input::placeholder {
    color: var(--grey-2);
}
#__cs_menu .mods {
    flex: 1;
    display: grid;
    grid-template-columns: repeat(auto-fill, 148px);
    grid-auto-rows: 148px;
    align-content: start;
    justify-content: center;
    overflow-x: hidden;
}
#__cs_menu .mods::-webkit-scrollbar {
    background: 0 0 !important;
    width: 4px !important;
}
#__cs_menu .mods::-webkit-scrollbar-thumb {
    background: var(--border-2) !important;
    border-radius: 2px !important;
}
#__cs_menu .card {
    width: 148px;
    height: 148px;
    background: var(--background-4);
    border: 1.5px solid var(--border-2);
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: border-color 0.15s;
    overflow: hidden;
}
#__cs_menu .options,
#__cs_options_back {
    transition: background 0.15s;
    font-size: 12px;
    font-family: sans-serif !important;
    cursor: pointer;
}
#__cs_menu .card-icon {
    color: var(--grey-2);
    margin-top: 18px;
    flex-shrink: 0;
}
#__cs_menu .card .name {
    margin-top: 10px;
    margin-bottom: auto;
    color: var(--grey-1);
    font-size: 13px;
}
#__cs_menu .card-btn {
    width: 100%;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
}
#__cs_menu .options {
    width: 100%;
    height: 26px;
    flex-shrink: 0;
    border: none;
    border-top: 1px solid var(--border-2);
    border-bottom: 1px solid var(--border-2);
    background: var(--background-5);
    color: var(--white);
}
#__cs_menu .options:hover {
    background: var(--border-1);
}
#__cs_menu .toggle-btn {
    width: 100%;
    height: 30px;
    flex-shrink: 0;
    border: none;
    background: var(--disabled);
    color: var(--white);
    font-weight: 600;
    font-size: 12px;
    cursor: pointer;
    border-bottom-left-radius: 7px;
    border-bottom-right-radius: 7px;
    transition:
        background 0.15s,
        color 0.15s;
    font-family: sans-serif !important;
}
#__cs_menu .toggle-btn:hover {
    background: var(--disabled-hover);
}
#__cs_menu .card.enabled .toggle-btn {
    background: var(--enabled);
    color: var(--white);
}
#__cs_menu .card.enabled .toggle-btn:hover {
    background: var(--enabled-hover);
}
#__cs_settings_panel {
    flex: 1;
    padding: 14px;
    display: none;
    flex-direction: column;
    gap: 12px;
    overflow-y: auto;
}
#__cs_settings_panel.active {
    display: flex;
}
#__cs_options_panel {
    position: absolute;
    inset: 0;
    display: none;
    flex-direction: column;
    z-index: 10;
}
#__cs_options_panel.open {
    display: flex;
}
#__cs_options_header {
    height: 50px;
    display: flex;
    gap: 10px;
    padding: 0 14px;
    flex-shrink: 0;
}
#__cs_options_header span {
    font-size: 14px;
    font-weight: 600;
    color: var(--white);
}
#__cs_options_back {
    display: flex;
    align-items: center;
    gap: 5px;
    background: var(--background-3);
    border: 1px solid var(--border-1);
    color: var(--white);
    border-radius: 4px;
    padding: 4px 10px;
}
#__cs_options_back:hover {
    background: var(--background-4);
}
#__cs_options_body {
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 12px;
}
#__cs_options_body::-webkit-scrollbar {
    background: 0 0 !important;
    width: 4px !important;
}
#__cs_options_body::-webkit-scrollbar-thumb {
    background: var(--border-2) !important;
    border-radius: 2px !important;
}
#__cs_menu .setting-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    flex-shrink: 0;
}
#__cs_menu .setting-row label {
    font-size: 12px;
    color: var(--grey-2);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    flex-shrink: 0;
}
#__cs_menu .setting-inline {
    display: flex;
    align-items: center;
    gap: 8px;
}
#__cs_menu .range-val {
    font-size: 13px;
    color: var(--primary-1);
    min-width: 36px;
    text-align: right;
}
#__cs_menu input[type="range"] {
    accent-color: var(--primary-1);
    cursor: pointer;
}
#__cs_menu .keybind-box {
    background: var(--background-1);
    border: 1px solid var(--border-1);
    position: relative;
    border-radius: 5px;
    padding: 6px;
    font-size: 12px;
    color: var(--white);
    text-align: center;
    cursor: pointer;
    transition: border-color 0.15s;
    min-width: 50px;
    font-family: sans-serif !important;
}
#__cs_menu .keybind-box.listening {
    border-color: var(--primary-1);
}

.cs-kb-conflict-tooltip {
    position: fixed;
    transform: translateX(-50%);
    padding: 6px 10px;
    background: rgba(224, 82, 82, 0.98);
    color: #fff;
    font-size: 11px;
    font-family: sans-serif;
    font-weight: 600;
    border-radius: 4px;
    white-space: nowrap;
    pointer-events: none;
    z-index: 2147483647;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    opacity: 0;
    animation: csKbTipFadeIn 0.15s ease forwards;
}

.cs-kb-conflict-tooltip::before {
    content: "";
    position: absolute;
    top: -4px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 5px solid rgba(224, 82, 82, 0.98);
}

@keyframes csKbTipFadeIn {
    from { opacity: 0; transform: translateX(-50%) translateY(-4px); }
    to   { opacity: 1; transform: translateX(-50%) translateY(0); }
}

#__cs_menu .keybind-box.conflict {
    border-color: #e05252 !important;
    color: #e05252 !important;
    background: rgba(224, 82, 82, 0.08);
}
#__cs_menu .keybind-box.listening {
    border-color: var(--primary-1) !important;
    color: var(--white) !important;
}

#__cs_menu .mod-description {
    color: var(--white);
    font-size: 13.5px;
    opacity: 0.7;
    margin-bottom: -10px;
    font-weight: 100;
}
#__cs_menu .settings-section-title {
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 18px 0 0;
    color: var(--grey-2);
    opacity: 0.5;
    font-size: 12.5px;
    font-weight: 700;
    text-transform: uppercase;
}
#__cs_menu .settings-section-title span {
    white-space: nowrap;
}
#__cs_menu .settings-section-title div {
    flex: 1;
    height: 1px;
    background: var(--grey-2);
    opacity: 0.5;
}
#__cs_menu .opt-toggle {
    position: relative;
    display: inline-block;
    width: 44px;
    height: 22px;
    flex-shrink: 0;
}
#__cs_menu .opt-toggle input,
#__cs_menu.compact .toggle-btn {
    display: none;
}
#__cs_menu .opt-toggle label {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--border-2);
    border-radius: 11px;
    cursor: pointer;
    transition: background 0.2s;
}
#__cs_menu .opt-toggle input:checked + label {
    background: var(--primary-1);
}
#__cs_menu .opt-toggle label::after {
    content: "";
    position: absolute;
    top: 3px;
    left: 3px;
    width: 16px;
    height: 16px;
    background: var(--white);
    border-radius: 50%;
    transition: left 0.2s;
}
#__cs_menu .opt-toggle input:checked + label::after {
    left: 25px;
}
input[type="color"] {
    appearance: none !important;
    -webkit-appearance: none !important;
    padding: 0 !important;
    border: none !important;
    outline: 0 !important;
    background: 0 0 !important;
    border-radius: 5px !important;
    overflow: hidden !important;
}
input[type="color"]:hover {
    cursor: pointer;
}
input[type="color"]::-webkit-color-swatch-wrapper {
    padding: 0 !important;
    width: 28px;
    height: 28px;
    border: none !important;
    border-radius: 5px !important;
}
input[type="color"]::-webkit-color-swatch {
    border: none !important;
    border-radius: 5px !important;
}
#__cs_menu .opt-btn,
.cs-textbox {
    border: 1px solid var(--border-1);
    background: var(--background-1);
    color: var(--white);
}
.cs-textbox {
    width: 72px;
    height: 28px;
    box-sizing: border-box;
    border-radius: 4px;
    padding: 4px 6px !important;
    font-size: 11px;
    outline: 0;
    font-family: sans-serif;
}
#__cs_menu .opt-btn {
    border-radius: 4px;
    padding: 5px 10px;
    font-size: 12px;
    cursor: pointer;
    transition: background 0.15s;
    font-family: sans-serif !important;
}
#__cs_menu .opt-btn:hover {
    background: var(--border-1);
}
#__cs_menu .compact-btn {
    width: 30px;
    height: 30px;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--background-1);
    border: 1px solid var(--border-1);
    border-radius: 5px;
    color: var(--grey-2);
    cursor: pointer;
    transition:
        background 0.15s,
        color 0.15s,
        border-color 0.15s;
}
#__cs_menu .compact-btn.active,
#__cs_menu .compact-btn:hover {
    background: var(--background-3);
    color: var(--white);
}
#__cs_menu.compact .mods {
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: 50px;
    gap: 8px;
    padding: 10px 12px;
}
#__cs_menu.compact .card {
    width: auto;
    height: 50px;
    flex-direction: row;
    align-items: center;
    border-radius: 6px;
    position: relative;
}
#__cs_menu.compact .card-icon {
    width: 20px;
    height: 20px;
    margin: 0 10px 0 12px;
    flex-shrink: 0;
}
#__cs_menu.compact .card .name {
    margin: 0;
    color: var(--grey-1);
    font-size: 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
#__cs_menu.compact .card-btn {
    width: auto;
    height: 100%;
    margin-left: auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-shrink: 0;
}
#__cs_menu.compact .options {
    width: 50px;
    height: 100%;
    border: none;
    border-left: 1px solid var(--border-2);
    border-radius: 0;
    background: 0 0;
    font-size: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
}
#__cs_menu.compact .options::after {
    content: "";
    width: 25px;
    height: 25px;
    background: currentColor;
    mask: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJpY29uIGljb24tdGFibGVyIGljb25zLXRhYmxlci1vdXRsaW5lIGljb24tdGFibGVyLXNldHRpbmdzIj48cGF0aCBzdHJva2U9Im5vbmUiIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUiIC8+PHBhdGggZD0iTTEwLjMyNSA0LjMxN2MuNDI2IC0xLjc1NiAyLjkyNCAtMS43NTYgMy4zNSAwYTEuNzI0IDEuNzI0IDAgMCAwIDIuNTczIDEuMDY2YzEuNTQzIC0uOTQgMy4zMSAuODI2IDIuMzcgMi4zN2ExLjcyNCAxLjcyNCAwIDAgMCAxLjA2NSAyLjU3MmMxLjc1NiAuNDI2IDEuNzU2IDIuOTI0IDAgMy4zNWExLjcyNCAxLjcyNCAwIDAgMCAtMS4wNjYgMi41NzNjLjk0IDEuNTQzIC0uODI2IDMuMzEgLTIuMzcgMi4zN2ExLjcyNCAxLjcyNCAwIDAgMCAtMi41NzIgMS4wNjVjLS40MjYgMS43NTYgLTIuOTI0IDEuNzU2IC0zLjM1IDBhMS43MjQgMS43MjQgMCAwIDAgLTIuNTczIC0xLjA2NmMtMS41NDMgLjk0IC0zLjMxIC0uODI2IC0yLjM3IC0yLjM3YTEuNzI0IDEuNzI0IDAgMCAwIC0xLjA2NSAtMi41NzJjLTEuNzU2IC0uNDI2IC0xLjc1NiAtMi45MjQgMCAtMy4zNWExLjcyNCAxLjcyNCAwIDAgMCAxLjA2NiAtMi41NzNjLS45NCAtMS41NDMgLjgyNiAtMy4zMSAyLjM3IC0yLjM3YzEgLjYwOCAyLjI5NiAuMDcgMi41NzIgLTEuMDY1IiAvPjxwYXRoIGQ9Ik05IDEyYTMgMyAwIDEgMCA2IDBhMyAzIDAgMCAwIC02IDAiIC8+PC9zdmc+");
    color: var(--grey-2);
    transition: color 0.15s;
}
#__cs_menu.compact .card:hover,
#__cs_menu.compact .options:hover {
    background: var(--background-5);
}
#__cs_menu.compact .options:hover::after {
    color: var(--white);
}
#__cs_menu.compact .card {
    border-color: var(--border-2);
    cursor: pointer;
}
#__cs_menu.compact .card.enabled {
    border-color: var(--enabled);
}
#__cs_menu.compact .card:not(.enabled) {
    border-color: var(--disabled);
}
`;

  // -- MENU
  MODS.sort((a, b) => a.name.localeCompare(b.name));

  function buildMenuHTML() {
    const cards = MODS.map(
      (mod) => `
        <div
    class="card"
    data-mod="${mod.id}"
    data-category="${
      Array.isArray(mod.category)
        ? mod.category.join(",")
        : mod.category || "new"
    }">
            <svg class="card-icon" width="28" height="28" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" stroke-width="1.5"
                stroke-linecap="round" stroke-linejoin="round">
                ${mod.icon}
            </svg>
            <div class="name">${mod.name}</div>
            <div class="card-btn">
                ${mod.hasOptions ? `<button class="options" data-options="${mod.id}">Options</button>` : ""}
                <button class="toggle-btn" data-toggle="${mod.id}">Disabled</button>
            </div>
        </div>`,
    ).join("");

    return `
<div class="header">
    <div class="title">Celestar Mod Menu <span style="font-size:11px;font-weight:700;color:var(--primary-1)">v2.0.0</span></div>
    <div class="tabs">
        <button class="tab active" data-tab="mods">Mods</button>
        <button class="tab" data-tab="settings">Settings</button>
        <button class="tab tab-disabled" id="cs-profiles-tab" title="Coming soon">Profiles</button>
    </div>
    <button class="close" id="__cs_close">
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M1 1L9 9M9 1L1 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
        </svg>
    </button>
</div>

<div class="toolbar" id="__cs_toolbar">

    <div class="search">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>

        <input type="text" id="__cs_search" placeholder="Search mods…">
    </div>

    <div class="categories">

        <button class="category-btn active" data-category="all">
            All
        </button>

        <button class="category-btn" data-category="new">
            New
        </button>

        <button class="category-btn" data-category="hud">
            HUD
        </button>

        <button class="category-btn" data-category="utilities">
            Utilities
        </button>

        <button class="category-btn" data-category="visuals">
            Visuals
        </button>

        <button class="compact-btn" id="cs-compact-toggle" title="Toggle Compact Mode">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-layers-subtract">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M8 6a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2l0 -8" />
                <path d="M16 16v2a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2v-8a2 2 0 0 1 2 -2h2" />
            </svg>
        </button>

    </div>

</div>

<div class="mods" id="__cs_mods">${cards}</div>

<div id="__cs_settings_panel">
    <div class="settings-section-title">
        <span>General</span>
        <div></div>
    </div>
    <div class="setting-row">
        <label>Menu Keybind</label>
        <div class="keybind-box" id="cs-menu-kb">${fmtKey(cfg("client.keybind"))}</div>
    </div>

    <div class="setting-row">
        <label>Theme</label>

        <select id="cs-menu-theme" class="cs-theme-select" style="background:var(--background-1);
           border:1px solid var(--border-1);
           border-radius:4px;
           color:var(--white);
           padding:5px 8px;
           font-size:12px;
           outline:none;
           cursor:pointer;">

            <option value="dark" ${(cfg("client.theme") || "dark") === "dark" ? "selected" : ""}>
                Dark
            </option>
            <option value="legacy-dark" ${cfg("client.theme") === "legacy-dark" ? "selected" : ""}>
                Legacy Dark
            </option>

            <option value="light" ${cfg("client.theme") === "light" ? "selected" : ""}>
                Light
            </option>

            <option value="rose-gold" ${cfg("client.theme") === "rose-gold" ? "selected" : ""}>
                Rose Gold
            </option>

            <option value="midnight-blue" ${cfg("client.theme") === "midnight-blue" ? "selected" : ""}>
                Midnight Blue
            </option>

            <option value="dusk" ${cfg("client.theme") === "dusk" ? "selected" : ""}>
                Dusk
            </option>

            <option value="olive-green" ${cfg("client.theme") === "olive-green" ? "selected" : ""}>
                Olive Green
            </option>

            <option value="dark-ocean" ${cfg("client.theme") === "dark-ocean" ? "selected" : ""}>
                Dark Ocean
            </option>

            <option value="aurora" ${cfg("client.theme") === "aurora" ? "selected" : ""}>
                Aurora
            </option>

            <option value="maroon" ${cfg("client.theme") === "maroon" ? "selected" : ""}>
                Maroon
            </option>

            <option value="light-mint" ${cfg("client.theme") === "light-mint" ? "selected" : ""}>
                Light Mint
            </option>

            <option value="warm-silver" ${cfg("client.theme") === "warm-silver" ? "selected" : ""}>
                Warm Silver
            </option>
            <option value="burnt-orange" ${cfg("client.theme") === "burnt-orange" ? "selected" : ""}>
                Burnt Orange
            </option>
        </select>
    </div>

    <div class="settings-section-title">
        <span>Danger Zone</span>
        <div></div>
    </div>

    <div class="setting-row">
        <label>Reset All Settings</label>
        <button class="opt-btn" id="cs-reset-all" style="color:#e05252;border-color:#e05252;">Reset</button>
    </div>
</div>

<div id="__cs_options_panel">
    <div id="__cs_options_header">
        <button id="__cs_options_back">Back</button>
        <span id="__cs_options_title">Options</span>
    </div>
    <div id="__cs_options_body"></div>
</div>`;
  }

  let _menuOpen = false;
  let _menuEl = null;
  let _cancelResetAll = null;
  let _lobbyMenuTip = null;
  let _lastTipKey = "";
  const _cardsById = new Map();

  function initMenu() {
    if (_menuEl) return;

    const styleEl = document.createElement("style");
    styleEl.id = "__cs_menu_styles";
    styleEl.textContent = MENU_CSS;
    document.head.appendChild(styleEl);

    _menuEl = document.createElement("div");
    _menuEl.id = "__cs_menu";
    _menuEl.setAttribute("data-theme", cfg("client.theme") || "dark");
    _menuEl.innerHTML = buildMenuHTML();

    document.body.appendChild(_menuEl);

    let currentCategory = "all";

    const searchInput = _menuEl.querySelector("#__cs_search");
    const categoryButtons = _menuEl.querySelectorAll(".category-btn");

    const cards = Array.from(_menuEl.querySelectorAll(".card"));
    cards.forEach((card) => {
      _cardsById.set(card.dataset.mod, card);
    });

    function filterMods() {
      const search = searchInput.value.trim().toLowerCase() || "";

      for (const card of cards) {
        const categories = (card.dataset.category || "new")
          .split(",")
          .map((c) => c.trim().toLowerCase())
          .filter(Boolean);

        const name =
          card.querySelector(".name").textContent.toLowerCase() || "";

        const matchesCategory =
          currentCategory === "all" || categories.includes(currentCategory);

        const matchesSearch = !search || name.includes(search);

        card.style.display = matchesCategory && matchesSearch ? "" : "none";
      }
    }

    categoryButtons.forEach((button) => {
      button.addEventListener("click", () => {
        currentCategory = button.dataset.category || "all";

        categoryButtons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");
        filterMods();
      });
    });

    if (searchInput) searchInput.addEventListener("input", filterMods);

    filterMods();

    const compactToggle = _menuEl.querySelector("#cs-compact-toggle");

    if (compactToggle) {
      const compact = !!cfg("client.compact");

      _menuEl.classList.toggle("compact", compact);
      compactToggle.classList.toggle("active", compact);

      compactToggle.addEventListener("click", () => {
        const now = !_menuEl.classList.contains("compact");
        cfgSet("client.compact", now);
        _menuEl.classList.toggle("compact", now);
        compactToggle.classList.toggle("active", now);
      });
    }

    MODS.forEach((mod) => {
      const enabled = !!cfg(mod.id + ".enabled");
      setCardEnabled(mod.id, enabled);

      if (typeof mod.init === "function") {
        try {
          mod.init();
        } catch (e) {
          console.error("[Celestar] mod init failed:", mod.id, e);
        }
      }
    });

    MODS.forEach((mod) => {
      if (typeof mod.apply !== "function") return;
      try {
        mod.apply();
      } catch (e) {
        console.error("[Celestar] mod apply failed:", mod.id, e);
      }
    });

    _menuEl.querySelectorAll(".toggle-btn").forEach((btn) => {
      const id = btn.dataset.toggle;

      btn.addEventListener("click", () => {
        const mod = MODS_BY_ID.get(id);
        if (!mod) return;

        const now = !cfg(id + ".enabled");
        cfgSet(id + ".enabled", now);
        setCardEnabled(id, now);

        if (typeof mod.apply === "function") {
          try {
            mod.apply();
          } catch (e) {
            console.error("[Celestar] mod apply failed:", id, e);
          }
        }
      });
    });

    _menuEl.querySelectorAll(".card").forEach((card) => {
      card.addEventListener("click", (e) => {
        if (!_menuEl.classList.contains("compact")) return;
        if (e.target.closest(".options")) return;
        if (e.target.closest(".toggle-btn")) return;

        const id = card.dataset.mod;
        const mod = MODS_BY_ID.get(id);
        if (!mod) return;

        const now = !cfg(id + ".enabled");
        cfgSet(id + ".enabled", now);
        setCardEnabled(id, now);

        if (typeof mod.apply === "function") {
          try {
            mod.apply();
          } catch (e) {
            console.error("[Celestar] mod apply failed:", id, e);
          }
        }
      });
    });

    _menuEl.querySelectorAll(".options").forEach((btn) => {
      const id = btn.dataset.options;

      btn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        openOptions(id);
      });
    });

    const optionsBack = _menuEl.querySelector("#__cs_options_back");
    if (optionsBack) optionsBack.addEventListener("click", closeOptions);

    _menuEl.querySelectorAll(".tab").forEach((tab) => {
      tab.addEventListener("click", () => {
        if (tab.classList.contains("tab-disabled")) return;

        _menuEl
          .querySelectorAll(".tab")
          .forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");

        const isSettings = tab.dataset.tab === "settings";

        const mods = _menuEl.querySelector("#__cs_mods");
        const toolbar = _menuEl.querySelector("#__cs_toolbar");
        const settings = _menuEl.querySelector("#__cs_settings_panel");

        if (mods) mods.style.display = isSettings ? "none" : "";
        if (toolbar) toolbar.style.display = isSettings ? "none" : "";
        if (settings) settings.classList.toggle("active", isSettings);
      });
    });

    const closeButton = _menuEl.querySelector("#__cs_close");
    if (closeButton) closeButton.addEventListener("click", closeMenu);

    const menuKbEl = _menuEl.querySelector("#cs-menu-kb");
    if (menuKbEl) bindKeybind(menuKbEl, "client.keybind");

    const themeSelect = _menuEl.querySelector("#cs-menu-theme");
    if (themeSelect) {
      themeSelect.addEventListener("change", () => {
        const theme = themeSelect.value;
        cfgSet("client.theme", theme);
        _menuEl.setAttribute("data-theme", theme);
      });
    }

    const resetAllBtn = _menuEl.querySelector("#cs-reset-all");
    if (resetAllBtn) {
      let confirmTimer = null;
      let armed = false;

      const IDLE_MS = 5000;

      const cancelReset = () => {
        if (!armed) return;
        armed = false;
        if (confirmTimer) {
          clearTimeout(confirmTimer);
          confirmTimer = null;
        }
        resetAllBtn.textContent = "Reset";
        resetAllBtn.style.background = "";
        resetAllBtn.style.color = "#e05252";
        resetAllBtn.style.borderColor = "#e05252";
        resetAllBtn.style.fontWeight = "";
      };

      const armReset = () => {
        armed = true;
        resetAllBtn.textContent = "Click again to confirm";
        resetAllBtn.style.background = "#e05252";
        resetAllBtn.style.color = "#fff";
        resetAllBtn.style.borderColor = "#e05252";
        resetAllBtn.style.fontWeight = "600";

        if (confirmTimer) clearTimeout(confirmTimer);
        confirmTimer = setTimeout(() => {
          cancelReset();
        }, IDLE_MS);
      };

      resetAllBtn.addEventListener("click", () => {
        if (armed) {
          if (confirmTimer) {
            clearTimeout(confirmTimer);
            confirmTimer = null;
          }
          resetAllSettings();
        } else {
          armReset();
        }
      });

      resetAllBtn.addEventListener("mouseleave", cancelReset);
      window.addEventListener("blur", cancelReset);
      document.addEventListener("visibilitychange", () => {
        if (document.hidden) cancelReset();
      });

      _cancelResetAll = cancelReset;
    }

    document.addEventListener("keydown", (e) => {
      const active = document.activeElement;
      const isInput =
        active &&
        (active.tagName === "INPUT" ||
          active.tagName === "TEXTAREA" ||
          active.isContentEditable);

      if (!isInput && e.code === cfg("client.keybind")) {
        e.preventDefault();
        e.stopPropagation();
        toggleMenu();
        return;
      }

      if (e.code === "Escape" && _menuOpen) {
        e.preventDefault();
        e.stopPropagation();
        closeMenu();
      }
    });

    onCfgChange((key, value) => {
      if (!key.endsWith(".enabled")) return;
      const id = key.slice(0, -".enabled".length);
      const mod = MODS_BY_ID.get(id);
      setCardEnabled(id, !!value);
      if (mod && typeof mod.apply === "function") {
        try {
          mod.apply();
        } catch (e) {
          console.error("[Celestar] mod apply failed:", id, e);
        }
      }
    });
  }

  function openOptions(id) {
    if (_cancelResetAll) _cancelResetAll();
    const mod = MODS_BY_ID.get(id);
    if (!mod.options) return;
    const panel = byId("__cs_options_panel");
    const title = byId("__cs_options_title");
    const body = byId("__cs_options_body");
    const header = byId("__cs_options_header");
    if (!panel || !title || !body) return;

    title.textContent = mod.name;
    body.innerHTML = mod.options.render();

    try {
      mod.options.bind();
    } catch (e) {
      console.error("[Celestar] options bind failed:", id, e);
    }

    if (header) {
      const existingReset = header.querySelector("#__cs_options_reset");
      if (existingReset) existingReset.remove();

      const resetBtn = document.createElement("button");
      resetBtn.id = "__cs_options_reset";
      resetBtn.className = "opt-btn";
      resetBtn.style.cssText =
        "margin-left:auto;color:#e05252;border-color:#e05252;";
      resetBtn.textContent = "Reset";

      let armed = false;
      let timer = null;

      const cancel = () => {
        if (!armed) return;
        armed = false;
        if (timer) {
          clearTimeout(timer);
          timer = null;
        }
        resetBtn.textContent = "Reset";
        resetBtn.style.background = "";
        resetBtn.style.color = "#e05252";
        resetBtn.style.borderColor = "#e05252";
        resetBtn.style.fontWeight = "";
      };

      resetBtn.addEventListener("click", () => {
        if (!armed) {
          armed = true;
          resetBtn.textContent = "Confirm";
          resetBtn.style.background = "#e05252";
          resetBtn.style.color = "#fff";
          resetBtn.style.borderColor = "#e05252";
          resetBtn.style.fontWeight = "600";
          timer = setTimeout(cancel, 4000);
          return;
        }

        cancel();

        const prefix = mod.id + ".";
        for (const key of Object.keys(DEFAULTS)) {
          if (key.startsWith(prefix) || key === mod.id + ".enabled") {
            GM_setValue(key, DEFAULTS[key]);
            delete _cfg[key];
          }
        }

        body.innerHTML = mod.options.render();
        try {
          mod.options.bind();
        } catch (e) {
          console.error("[Celestar] options rebind failed:", id, e);
        }

        if (typeof mod.apply === "function") {
          try {
            mod.apply();
          } catch (e) {}
        }

        setCardEnabled(mod.id, !!cfg(mod.id + ".enabled"));
      });

      resetBtn.addEventListener("mouseleave", cancel);
      window.addEventListener("blur", cancel);

      header.appendChild(resetBtn);
    }

    panel.classList.add("open");
  }

  function closeOptions() {
    MODS.forEach((mod) => {
      if (typeof mod.setEditMode === "function") mod.setEditMode(false);
    });

    const resetBtn = byId("__cs_options_reset");
    if (resetBtn) resetBtn.remove();

    byId("__cs_options_panel").classList.remove("open");
    const body = byId("__cs_options_body");
    if (body) body.innerHTML = "";

    document
      .querySelectorAll(".cs-kb-conflict-tooltip")
      .forEach((t) => t.remove());
  }

  function setCardEnabled(id, on) {
    const card = _cardsById.get(id);
    if (!card) return;
    card.classList.toggle("enabled", on);
    const tb = card.querySelector(".toggle-btn");
    if (tb) tb.textContent = on ? "Enabled" : "Disabled";
  }

  function toggleMenu() {
    _menuOpen ? closeMenu() : openMenu();
  }

  function openMenu() {
    _menuOpen = true;
    _menuEl.classList.add("open");
  }

  function closeMenu() {
    if (_cancelResetAll) _cancelResetAll();
    _menuOpen = false;
    _menuEl.classList.remove("open");
    closeOptions();
    const s = byId("__cs_search");
    if (s) {
      s.value = "";
      s.dispatchEvent(new Event("input"));
    }
  }

  function getMenuKeyName() {
    const key = cfg("client.keybind") || "G";

    const names = {
      " ": "Space",
      Escape: "Esc",
      Control: "Ctrl",
      Shift: "Shift",
      Alt: "Alt",
      Tab: "Tab",
      Enter: "Enter",
      Backspace: "Backspace",
      ArrowUp: "↑",
      ArrowDown: "↓",
      ArrowLeft: "←",
      ArrowRight: "→",
    };

    return names[key] || key.replace(/^Key/, "").replace(/^Digit/, "");
  }

  function createLobbyMenuTip() {
    if (_lobbyMenuTip) return;

    const wrapper = document.createElement("div");
    wrapper.id = "__cs_lobby_menu_tip";
    Object.assign(wrapper.style, {
      position: "fixed",
      left: "50%",
      transform: "translateX(-50%)",
      bottom: "20px",
      display: "flex",
      gap: "8px",
      zIndex: "9999999999",
      fontFamily: "sans-serif",
      userSelect: "none",
    });

    const key = getMenuKeyName();

    const menuTip = document.createElement("div");
    menuTip.style.cssText = `
    padding: 7px 13px;
    border-radius: 6px;
    background: #000;
    box-shadow: 0 4px 0 0 rgba(0,0,0,0.5);
    border: 1px solid rgba(0,0,0,0.1);
    color: #fff;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: 0.3s;
  `;
    menuTip.textContent = `Celestar Mod Menu v2 | Press ${key} to open menu`;

    menuTip.addEventListener("mouseenter", () => {
      menuTip.style.transform = "scale(1.03)";
    });
    menuTip.addEventListener("mouseleave", () => {
      menuTip.style.transform = "scale(1)";
    });
    menuTip.addEventListener("click", () => {
      if (typeof toggleMenu === "function" && _menuEl) {
        toggleMenu();
      } else {
        setTimeout(() => {
          if (typeof toggleMenu === "function" && _menuEl) toggleMenu();
        }, 200);
      }
    });

    const discordTip = document.createElement("a");
    discordTip.href = "https://dsc.gg/celestar";
    discordTip.target = "_blank";
    discordTip.rel = "noopener noreferrer";
    discordTip.style.cssText = `
    padding: 7px 13px;
    border-radius: 6px;
    background: #4d50f5;
    box-shadow: 0 4px 0 0 rgba(0,0,0,0.5);
    border: 1px solid #000;
    color: #fff;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    text-decoration: none;
    transition: 0.3s;
  `;
    discordTip.textContent = "Join Celestar Discord";

    discordTip.addEventListener("mouseenter", () => {
      discordTip.style.transform = "scale(1.03)";
    });
    discordTip.addEventListener("mouseleave", () => {
      discordTip.style.transform = "scale(1)";
    });

    wrapper.appendChild(menuTip);
    wrapper.appendChild(discordTip);

    document.body.appendChild(wrapper);
    _lobbyMenuTip = wrapper;
    _lastTipKey = key;
  }

  function updateLobbyMenuTip() {
    if (!_lobbyMenuTip) return;
    const key = getMenuKeyName();
    if (key === _lastTipKey) return;
    _lastTipKey = key;

    const menuTip = _lobbyMenuTip.firstElementChild;
    if (menuTip) {
      menuTip.textContent = `Celestar Mod Menu v2 | Press ${key} to open menu`;
    }
  }

  function syncLobbyTip() {
    const game = document.querySelector(".game");
    const home = document.querySelector(".home");
    const inGame = !!game && !home;

    if (!inGame) {
      createLobbyMenuTip();
      updateLobbyMenuTip();
    } else if (_lobbyMenuTip) {
      _lobbyMenuTip.remove();
      _lobbyMenuTip = null;
      _lastTipKey = "";
    }
  }

  waitForBody(() => {
    syncLobbyTip();
    setInterval(syncLobbyTip, 500);
  });

  /*
    * Copyright © 2026 Celestar / thetalkingcat
    * ALL RIGHTS RESERVED

    * This source code is proprietary. Copying, reusing, modifying, redistributing with or without AI without explicit
    * permission from the creator (thetalkingcat) is strictly prohibited.

    * Permission is REQUIRED for any reuse.
  */

  // -- UTILS
  const GAME_RESERVED_KEYS = new Set([
    "KeyW",
    "KeyA",
    "KeyS",
    "KeyD",
    "ShiftLeft",
    "ShiftRight",
    "KeyC",
    "KeyQ",
    "KeyB",
    "KeyP",
    "KeyT",
    "KeyX",
    "KeyF",
    "ArrowUp",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "Escape",
    "F5",
    "F11",
  ]);

  function findKeybindConflict(code, excludeKey) {
    if (!code) return null;

    if (GAME_RESERVED_KEYS.has(code)) {
      return "Game";
    }

    for (const key of Object.keys(DEFAULTS)) {
      if (key === excludeKey) continue;
      if (!key.endsWith(".keybind")) continue;

      const boundCode = cfg(key);
      if (boundCode === code) {
        const modId = key.split(".")[0];
        const mod = MODS_BY_ID.get(modId);
        if (mod) return mod.name;
        return modId.charAt(0).toUpperCase() + modId.slice(1);
      }
    }

    return null;
  }
  function byId(id) {
    return document.getElementById(id);
  }

  const _escMap = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" };
  function escHtml(s) {
    return String(s).replace(/[&<>"]/g, (c) => _escMap[c]);
  }

  function fmtKey(code) {
    if (!code) return "?";
    return code
      .replace("Key", "")
      .replace("Digit", "")
      .replace(/Left$/, "")
      .replace(/Right$/, "");
  }

  function injectStyle(css, id) {
    const el = document.createElement("style");
    if (id) el.id = id;
    el.textContent = css;
    (document.head || document.documentElement).appendChild(el);
    return el;
  }

  function waitForBody(fn) {
    if (document.body) {
      fn();
      return;
    }
    new MutationObserver((_, obs) => {
      if (document.body) {
        obs.disconnect();
        fn();
      }
    }).observe(document.documentElement, { childList: true });
  }

  function resetAllSettings() {
    try {
      for (const key of Object.keys(DEFAULTS)) {
        try {
          GM_setValue(key, DEFAULTS[key]);
        } catch (e) {}
      }

      try {
        GM_setValue("__firstRunDone", false);
        GM_setValue("__cfgVer", 0);
      } catch (e) {}

      for (const key of Object.keys(_cfg)) {
        delete _cfg[key];
      }

      const btn = document.getElementById("cs-reset-all");
      if (btn) {
        btn.textContent = "Resetting…";
        btn.disabled = true;
      }

      setTimeout(() => location.reload(), 500);
    } catch (err) {
      console.error("[Celestar] Reset failed:", err);
      const btn = document.getElementById("cs-reset-all");
      if (btn) {
        btn.textContent = "Failed";
        btn.style.background = "#e05252";
        btn.style.color = "#fff";
      }
    }
  }

  function bindSlider(sliderId, valId, cfgKey, fmt, parse, cb) {
    const el = byId(sliderId);
    const val = byId(valId);
    if (!el) return;
    el.oninput = () => {
      const v = parse ? parse(el.value) : el.value;
      if (val) val.textContent = fmt ? fmt(el.value) : el.value;
      cfgSet(cfgKey, v);
      cb();
    };
  }

  function bindToggle(id, cfgKey, cb) {
    const el = byId(id);
    if (!el) return;
    el.addEventListener("change", () => {
      cfgSet(cfgKey, el.checked);
      if (cb) cb();
    });
  }

  function bindColor(id, cfgKey, cb) {
    const el = byId(id);
    if (!el) return;
    el.addEventListener("change", () => {
      cfgSet(cfgKey, el.value);
      cb();
    });
  }

  function bindKeybind(el, cfgKey) {
    if (!el) return;

    let listening = false;
    let tooltip = null;

    const showTooltip = (text) => {
      hideTooltip();
      tooltip = document.createElement("div");
      tooltip.className = "cs-kb-conflict-tooltip";
      tooltip.textContent = text;
      document.body.appendChild(tooltip);
      positionTooltip();
    };

    const hideTooltip = () => {
      if (tooltip) {
        tooltip.remove();
        tooltip = null;
      }
    };

    const positionTooltip = () => {
      if (!tooltip) return;
      const rect = el.getBoundingClientRect();
      tooltip.style.left = `${rect.left + rect.width / 2}px`;
      tooltip.style.top = `${rect.bottom + 8}px`;
    };

    const updateConflictState = () => {
      const code = cfg(cfgKey);
      if (!code) {
        el.classList.remove("conflict");
        hideTooltip();
        return;
      }
      const conflict = findKeybindConflict(code, cfgKey);
      if (conflict) {
        el.classList.add("conflict");
        showTooltip(`Conflicting with ${conflict}`);
      } else {
        el.classList.remove("conflict");
        hideTooltip();
      }
    };

    updateConflictState();

    const onScrollOrResize = () => {
      if (tooltip) positionTooltip();
    };
    document.addEventListener("scroll", onScrollOrResize, true);
    window.addEventListener("resize", onScrollOrResize);

    el.addEventListener("click", () => {
      if (listening) return;
      listening = true;
      el.classList.add("listening");
      el.textContent = "Press a key";
      hideTooltip();
    });

    onCfgChange((key) => {
      if (key === cfgKey || key.endsWith(".keybind")) {
        setTimeout(updateConflictState, 0);
      }
    });

    document.addEventListener(
      "keydown",
      (e) => {
        if (!listening) return;

        e.preventDefault();
        e.stopImmediatePropagation();

        if (e.code === "Escape") {
          listening = false;
          el.classList.remove("listening");
          el.textContent = fmtKey(cfg(cfgKey));
          updateConflictState();
          return;
        }

        listening = false;
        el.classList.remove("listening");

        el.textContent = fmtKey(e.code);
        cfgSet(cfgKey, e.code);
        updateConflictState();
      },
      true,
    );
  }

  function optToggle(id, checked) {
    return `<div class="opt-toggle">
        <input type="checkbox" id="${id}"${checked ? " checked" : ""}>
        <label for="${id}"></label>
    </div>`;
  }

  waitForBody(initMenu);
})();

/*
  * Copyright © 2026 Celestar / thetalkingcat
  * ALL RIGHTS RESERVED

  * This source code is proprietary. Copying, reusing, modifying, redistributing with or without AI without explicit
  * permission from the creator (thetalkingcat) is strictly prohibited.

  * Permission is REQUIRED for any reuse.
*/
