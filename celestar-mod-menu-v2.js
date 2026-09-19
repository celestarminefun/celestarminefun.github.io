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

const CS_STORAGE_PREFIX = "__celestar_cmm_v2__:";

function CM_getValue(key, defaultValue) {
  try {
    const raw = localStorage.getItem(CS_STORAGE_PREFIX + key);
    if (raw === null) return defaultValue;
    return JSON.parse(raw);
  } catch (e) {
    return defaultValue;
  }
}

function CM_setValue(key, value) {
  try {
    localStorage.setItem(CS_STORAGE_PREFIX + key, JSON.stringify(value));
  } catch (e) {}
}

function CM_addStyle(css) {
  const style = document.createElement("style");
  style.textContent = css;
  (document.head || document.documentElement).appendChild(style);
  return style;
}

const CS_FAV_KEY = CS_STORAGE_PREFIX + "favourites";

function CM_getFavourites() {
  try {
    const raw = localStorage.getItem(CS_FAV_KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr : [];
  } catch (e) {
    return [];
  }
}

function CM_setFavourites(list) {
  try {
    localStorage.setItem(CS_FAV_KEY, JSON.stringify(list));
  } catch (e) {}
}

function CM_isFavourite(id) {
  return CM_getFavourites().includes(id);
}

function CM_toggleFavourite(id) {
  const list = CM_getFavourites();
  const idx = list.indexOf(id);
  if (idx === -1) list.push(id);
  else list.splice(idx, 1);
  CM_setFavourites(list);
  return idx === -1;
}

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
    "directionhud.raidairdrop": true,
    "directionhud.raidteammates": true,
    "directionhud.airdropSize": 1.0,
    "directionhud.teamSize": 1.0,
    "directionhud.waypoints": true,
    "directionhud.waypointSize": 1.0,
    "directionhud.airdropShape": "square",
    "directionhud.airdropColor": "#ffd23f",
    "directionhud.teamShape": "circle",
    "directionhud.teamColor": "#4ade80",
    "directionhud.showOffscreen": true,
    "directionhud.offscreenMargin": 8,
    "directionhud.fadeEnabled": true,
    "directionhud.fadeStart": 20,
    "directionhud.fadeEnd": 120,
    "directionhud.fadeMin": 0.25,
    "autogg.enabled": false,
    "autogg.message1": "gg",
    "autogg.message2": "well played",
    "autogg.message3": "good game",
    "autogg.random": true,
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
    "bedwarsnotif.sound": true,
    "bedwarsnotif.volume": 0.5,
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
    "hitcolor.enabled": false,
    "hitcolor.hit": "#ffffff",
    "hitcolor.headshot": "#ff0000",
    "chat.enabled": true,
    "chat.avatars": true,
    "chat.longer": false,
    "chat.highlightMentions": true,
    "waypoints.enabled": true,
    "waypoints.keybind": "KeyU",
    "waypoints.list": [],
    "waypoints.showMarker": true,
    "waypoints.showEdge": true,
    "waypoints.markerScale": 1.0,
    "waypoints.showDistance": true,
    "waypoints.color": "#7b2fe6",
    "waypoints.hudEnabled": true,
    "waypoints.autoOpenMenu": true,
    "waypoints.showName": true,
    "invmanager.enabled": true,
    "invmanager.searchEnabled": true,
    "invmanager.sortEnabled": true,
    "invmanager.sortMode": "off",
    "itemtooltip.enabled": false,
    "creativesearch.enabled": true,
    "friendnotify.enabled": true,
    "noads.enabled": true,
    "pickupnotif.enabled": false,
    "pickupnotif.duration": 3000,
    "pickupnotif.maxToasts": 5,
    "client.keybind": "KeyG",
    "client.theme": "dark",
    "client.compact": false,
  };

  // -- CONFIG
  const _cfg = Object.create(null);

  function cfg(key) {
    const v = _cfg[key];
    if (v !== undefined) return v;
    const saved = CM_getValue(key, DEFAULTS[key]);
    const val = saved !== null && saved !== undefined ? saved : DEFAULTS[key];
    _cfg[key] = val;
    return val;
  }

  const _cfgListeners = new Set();

  function cfgSet(key, value) {
    const prev = _cfg[key];
    if (prev === value && (value === null || typeof value !== "object")) {
      return;
    }
    _cfg[key] = value;
    CM_setValue(key, value);
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

  // -- GAME KEYBINDS
  const GameKeybinds = {
    _settings: null,
    _lastActionMap: null,
    _lastReservedSet: null,

    get settings() {
      if (this._settings) return this._settings;
      try {
        const stores = GameHooks.stores;
        if (!stores) return null;
        this._settings = stores.get("settings") || null;
        return this._settings;
      } catch (e) {
        return null;
      }
    },

    all() {
      try {
        return this.settings?.keybinds || {};
      } catch (e) {
        return {};
      }
    },

    byCode() {
      const all = this.all();
      if (this._lastActionMap && this._lastActionMapSrc === all) {
        return this._lastActionMap;
      }
      const out = Object.create(null);
      for (const action in all) {
        const code = all[action];
        if (code) out[code] = action;
      }
      this._lastActionMap = out;
      this._lastActionMapSrc = all;
      return out;
    },

    label(action) {
      try {
        const labels = this.settings?.keyBindLabels;
        if (labels && labels[action]) return labels[action];
      } catch (e) {}
      return String(action)
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (c) => c.toUpperCase())
        .trim();
    },

    actionForCode(code) {
      return this.byCode()[code] || null;
    },

    labelForCode(code) {
      const action = this.actionForCode(code);
      return action ? this.label(action) : null;
    },

    isReserved(code) {
      try {
        const reserved = this.settings?.reservedKeyBindActions;
        if (!reserved) return false;
        if (reserved instanceof Set) return reserved.has(code);
        if (Array.isArray(reserved)) return reserved.includes(code);
        if (typeof reserved === "object") return code in reserved;
        return false;
      } catch (e) {
        return false;
      }
    },

    set(action, code) {
      try {
        const s = this.settings;
        if (!s || typeof s.setKeyBind !== "function") return false;
        s.setKeyBind(action, code);
        this._dirty();
        return true;
      } catch (e) {
        return false;
      }
    },

    clear(action) {
      try {
        const s = this.settings;
        if (!s || typeof s.clearKeyBind !== "function") return false;
        s.clearKeyBind(action);
        this._dirty();
        return true;
      } catch (e) {
        return false;
      }
    },

    resetOne(action) {
      try {
        const s = this.settings;
        if (!s || typeof s.resetKeyBind !== "function") return false;
        s.resetKeyBind(action);
        this._dirty();
        return true;
      } catch (e) {
        return false;
      }
    },

    resetAll() {
      try {
        const s = this.settings;
        if (!s || typeof s.resetKeyBinds !== "function") return false;
        s.resetKeyBinds();
        this._dirty();
        return true;
      } catch (e) {
        return false;
      }
    },

    _dirty() {
      this._lastActionMap = null;
      this._lastActionMapSrc = null;
    },

    onChange(fn) {
      try {
        const s = this.settings;
        if (!s || typeof s.$subscribe !== "function") return () => {};
        return s.$subscribe(() => {
          this._dirty();
          try {
            fn();
          } catch (e) {}
        });
      } catch (e) {
        return () => {};
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
      RAID_AIRDROP_LOCATION: 1803,
      RAID_MAP_HEATMAP: 1801,
      RAID_MAP_TEAMMATES: 1809,
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
      try {
        const world = GameHooks.gameWorld;
        const server = world ? world.server : null;
        if (server && Array.isArray(server.msgsToSend)) {
          server.msgsToSend.push(packetID, data);
        }
      } catch (e) {}
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
        if (!gw || !gw.server || !gw.server.sendData) return false;
        gw.server.sendData(packetId, data);
        return true;
      } catch (e) {
        return false;
      }
    },

    triggerClient(packetId) {
      try {
        const gw = GameHooks.gameWorld;
        if (!gw || !gw.server || !gw.server.msgsListeners) return false;
        const listener = gw.server.msgsListeners[packetId];
        if (typeof listener !== "function") return false;
        listener();
        return true;
      } catch (e) {
        return false;
      }
    },

    destroy() {
      try {
        const world = GameHooks.gameWorld;
        const server = world ? world.server : null;
        if (server && this._originalSendData) {
          server.sendData = this._originalSendData;
        }
      } catch (e) {}
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

  (function initMenuClickSound() {
    const CLICK_URL = "https://minefun.io/assets/click-CLarhmaT.mp3";
    const CLICK_VOLUME = 0.3;

    let audioBuffer = null;
    let fetching = null;
    let lastPlay = 0;
    let fallbackCtx = null;

    function getListener() {
      try {
        const systems = window.GameHooks && window.GameHooks.systems;
        if (!systems) return null;
        const sys = systems.find((s) => s && s.audioListener);
        return sys ? sys.audioListener : null;
      } catch (e) {
        return null;
      }
    }

    function getAudioTarget() {
      const listener = getListener();
      if (listener && listener.context) {
        let masterVol = 1;
        try {
          if (typeof listener.getMasterVolume === "function") {
            masterVol = listener.getMasterVolume() || 1;
          }
        } catch (e) {}

        let input = listener.context.destination;
        try {
          if (typeof listener.getInput === "function") {
            input = listener.getInput();
          }
        } catch (e) {}

        return { ctx: listener.context, input, masterVol };
      }

      try {
        if (!fallbackCtx) {
          const Ctx = window.AudioContext || window.webkitAudioContext;
          if (!Ctx) return null;
          fallbackCtx = new Ctx();
        }
        return {
          ctx: fallbackCtx,
          input: fallbackCtx.destination,
          masterVol: 1,
        };
      } catch (e) {
        return null;
      }
    }

    async function loadBuffer(ctx) {
      if (audioBuffer) return audioBuffer;
      if (fetching) return fetching;

      fetching = (async () => {
        try {
          const res = await fetch(CLICK_URL);
          if (!res.ok) throw new Error("HTTP " + res.status);
          const arrayBuf = await res.arrayBuffer();
          audioBuffer = await ctx.decodeAudioData(arrayBuf);
          return audioBuffer;
        } catch (e) {
          console.warn("[Celestar] Click sound load failed:", e);
          audioBuffer = null;
          return null;
        } finally {
          fetching = null;
        }
      })();

      return fetching;
    }

    async function playClick() {
      const target = getAudioTarget();
      if (!target) return;

      const { ctx, input, masterVol } = target;
      if (ctx.state === "suspended") {
        try {
          await ctx.resume();
        } catch (e) {}
      }

      const buffer = await loadBuffer(ctx);
      if (!buffer) return;

      const src = ctx.createBufferSource();
      src.buffer = buffer;

      const gain = ctx.createGain();
      gain.gain.value = CLICK_VOLUME * masterVol;

      src.connect(gain);
      try {
        gain.connect(input);
      } catch (e) {
        gain.connect(ctx.destination);
      }

      src.start(0);
    }

    const CLICKABLE_SELECTOR = [
      "button",
      ".opt-btn",
      ".tab",
      ".category-btn",
      ".compact-btn",
      ".options",
      ".toggle-btn",
      ".close",
      ".opt-toggle label",
      ".keybind-box",
      'input[type="checkbox"]',
      'input[type="radio"]',
      'input[type="range"]',
      'input[type="color"]',
      "select",
    ].join(",");

    document.addEventListener(
      "mousedown",
      (e) => {
        if (e.button !== 0) return;

        const menu = document.getElementById("__cs_menu");
        if (!menu || !menu.classList.contains("open")) return;
        if (!menu.contains(e.target)) return;

        const hit = e.target.closest(CLICKABLE_SELECTOR);
        if (!hit) return;
        if (hit.disabled) return;

        const now = performance.now();
        if (now - lastPlay < 30) return;
        lastPlay = now;

        playClick();
      },
      true,
    );
  })();

  // -- INPUT
  document.addEventListener("keydown", (e) => {
    if (e.code === cfg("zoom.keybind")) {
      if (!G.keys["zoom_held"]) {
        if (cfg("zoom.scrollable")) {
          zoomTargetLevel = 1 / 2;
          if (!cfg("zoom.smoothness")) {
            zoomCurrentLevel = 1 / 2;
            zoomDirty = true;
          }
        } else {
          const sliderLevel = cfg("zoom.level") || 1 / 2;
          zoomTargetLevel = sliderLevel;
          if (!cfg("zoom.smoothness")) {
            zoomCurrentLevel = sliderLevel;
            zoomDirty = true;
          }
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

      const MIN_ZOOM = 2.0;
      const MAX_ZOOM = 8.0;

      let currentZoom = 1 / zoomTargetLevel;
      const step = 0.25;

      if (e.deltaY < 0) currentZoom += step;
      else currentZoom -= step;

      currentZoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, currentZoom));

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
          <label data-tip="The higher the value, the larger the zoom is">Distance</label>
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
  <label data-tip="A clean transition instead of an instant zoom">Smoothness</label>
  ${optToggle("zoom-smoothness", cfg("zoom.smoothness"))}
</div>

<div class="setting-row">
  <label data-tip="Use your mousewheel to zoom to your liking when holding the keybind">Scrollable</label>
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
                    <label data-tip="The link for the custom crosshair image you want">Image URL</label>
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
                    <label data-tip="The transparency of the crosshair">Opacity</label>
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
        const now = performance.now();
        const arr = button === "left" ? G.lmbClicks : G.rmbClicks;
        while (arr.length && arr[0] < now - 1000) arr.shift();
        return arr.length;
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
            (window.__csLeftClicks ||= []).push(now);
          }
          if (e.button === 2) {
            this._rightMouseDown = true;
            (window.__csRightClicks ||= []).push(now);
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
                    <label data-tip="The clicks per second counter for the left mouse button">Show Left CPS</label>
                    ${optToggle("ks-left-cps", cfg("keystrokes.showLeftCPS"))}
                </div>

                <div class="setting-row">
                    <label data-tip="The clicks per second counter for the right mouse button">Show Right CPS</label>
                    ${optToggle("ks-right-cps", cfg("keystrokes.showRightCPS"))}
                </div>

                <div class="setting-row">
                    <label data-tip="Show the keystrokes HUD only in-game and not in lobby">Show Only In Game</label>
                    ${optToggle("ks-game", cfg("keystrokes.onlyInGame"))}
                </div>

                <div class="setting-row">
                    <label data-tip="Rainbow animation on keystrokes HUD when keys are pressed">Rainbow Mode</label>
                    ${optToggle("ks-rainbow", cfg("keystrokes.rainbow"))}
                </div>

                <div class="setting-row">
                    <label data-tip="Press animation on keystrokes HUD">Animation</label>
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
                    <label data-tip="Thickness of border of HUD">Border Width</label>

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
                    <label data-tip="Roundness of HUD">Border Radius</label>

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
    category: ["hud"],
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-brand-safari"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M8 16l2 -6l6 -2l-2 6l-6 2" /><path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /></svg>`,
    hasOptions: true,

    _canvas: null,
    _ctx: null,
    _tick: null,
    _lastSig: null,
    _lastVisible: null,

    _airdrop: null,
    _teammates: null,
    _airdropListener: null,
    _teammatesListener: null,

    _drawShape(c, x, y, r, shape, fill, stroke, lineWidth) {
      c.save();
      c.translate(x, y);

      if (shape === "circle") {
        c.beginPath();
        c.arc(0, 0, r, 0, Math.PI * 2);
      } else if (shape === "square") {
        c.beginPath();
        c.rect(-r, -r, r * 2, r * 2);
      } else if (shape === "triangle") {
        c.beginPath();
        c.moveTo(0, -r);
        c.lineTo(r * 0.87, r * 0.5);
        c.lineTo(-r * 0.87, r * 0.5);
        c.closePath();
      } else {
        c.beginPath();
        c.moveTo(0, -r);
        c.lineTo(r, 0);
        c.lineTo(0, r);
        c.lineTo(-r, 0);
        c.closePath();
      }

      if (fill) {
        c.fillStyle = fill;
        c.fill();
      }
      if (stroke && lineWidth > 0) {
        c.strokeStyle = stroke;
        c.lineWidth = lineWidth;
        c.stroke();
      }
      c.restore();
    },

    _drawChevron(c, x, y, dir, color, opacity, size) {
      c.save();
      c.globalAlpha = opacity;
      c.fillStyle = color;
      c.beginPath();
      const s = size;
      if (dir < 0) {
        c.moveTo(x - s * 0.5, y - s);
        c.lineTo(x + s * 0.5, y);
        c.lineTo(x - s * 0.5, y + s);
      } else {
        c.moveTo(x + s * 0.5, y - s);
        c.lineTo(x - s * 0.5, y);
        c.lineTo(x + s * 0.5, y + s);
      }
      c.closePath();
      c.fill();
      c.restore();
    },

    _hexToRgb(hex) {
      if (!/^#[0-9A-Fa-f]{6}$/.test(hex)) return { r: 123, g: 47, b: 230 };
      return {
        r: parseInt(hex.slice(1, 3), 16),
        g: parseInt(hex.slice(3, 5), 16),
        b: parseInt(hex.slice(5, 7), 16),
      };
    },

    _computeOpacity(dist) {
      if (!cfg("directionhud.fadeEnabled")) return 1;
      const start = Math.max(
        0,
        parseFloat(cfg("directionhud.fadeStart")) || 20,
      );
      const end = Math.max(
        start + 1,
        parseFloat(cfg("directionhud.fadeEnd")) || 120,
      );
      const min = Math.min(
        1,
        Math.max(0, parseFloat(cfg("directionhud.fadeMin")) ?? 0.25),
      );

      if (dist <= start) return 1;
      if (dist >= end) return min;

      const t = (dist - start) / (end - start);
      return 1 - t * (1 - min);
    },

    init() {
      this._airdropListener = Packets.addIncomingListener(
        Packets.toClient.RAID_AIRDROP_LOCATION || 1803,
        (data) => {
          if (!cfg("directionhud.enabled")) return;
          if (!data || typeof data !== "object") return;

          const x = Number(data.x);
          const z = Number(data.z);
          if (!Number.isFinite(x) || !Number.isFinite(z)) return;

          this._airdrop = { x, z };
        },
      );

      this._teammatesListener = Packets.addIncomingListener(
        Packets.toClient.RAID_MAP_TEAMMATES || 1809,
        (data) => {
          if (!cfg("directionhud.enabled")) return;
          if (!data || typeof data !== "object") return;

          const list = Array.isArray(data.teammates)
            ? data.teammates
            : Array.isArray(data)
              ? data
              : null;

          if (!list) return;

          const out = [];
          for (const entry of list) {
            if (!Array.isArray(entry) || entry.length < 3) continue;

            const name = typeof entry[0] === "string" ? entry[0] : "";
            const x = Number(entry[1]);
            const z = Number(entry[2]);

            if (!Number.isFinite(x) || !Number.isFinite(z)) continue;
            out.push({ name, x, z });
          }

          this._teammates = out;
        },
      );

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
          return normalizeYaw(-value);
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
          this._lastSig = null;
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
          const teammateScale = parseFloat(cfg("directionhud.teamSize")) || 1;
          const airdropScale = parseFloat(cfg("directionhud.airdropSize")) || 1;
          const waypointScale =
            parseFloat(cfg("directionhud.waypointSize")) || 1;

          const airdropShape = cfg("directionhud.airdropShape") || "square";
          const teamShape = cfg("directionhud.teamShape") || "circle";
          const airdropColor = cfg("directionhud.airdropColor") || "#ffd23f";
          const teamColor = cfg("directionhud.teamColor") || "#4ade80";

          const showOffscreen = !!cfg("directionhud.showOffscreen");
          const offscreenMargin =
            parseFloat(cfg("directionhud.offscreenMargin")) || 8;

          let waypoints = [];
          if (cfg("directionhud.waypoints")) {
            const waypointMod = MODS_BY_ID.get("waypoints");
            if (waypointMod) {
              try {
                waypoints = waypointMod._visibleList() || [];
              } catch (e) {
                waypoints = [];
              }
            }
          }

          const airdropSig = this._airdrop
            ? `${Math.round(this._airdrop.x)}:${Math.round(this._airdrop.z)}`
            : "-";

          const teammatesSig = Array.isArray(this._teammates)
            ? this._teammates.length +
              ":" +
              this._teammates
                .map((t) => `${Math.round(t.x)},${Math.round(t.z)}`)
                .join(";")
            : "-";

          const waypointsSig = waypoints.length
            ? waypoints
                .map((w) => `${w.id}:${Math.round(w.x)},${Math.round(w.z)}`)
                .join(";")
            : "-";

          const sig =
            `${Math.round(yaw * 100)}|${size}|${waypointScale}|${airdropScale}|${teammateScale}` +
            `|${airdropShape}|${teamShape}|${airdropColor}|${teamColor}` +
            `|${showOffscreen ? 1 : 0}|${offscreenMargin}` +
            `|${airdropSig}|${teammatesSig}|${waypointsSig}`;
          if (sig === this._lastSig) return;
          this._lastSig = sig;

          const W = Math.round(300 * size);
          const H = Math.round(30 * size);
          const X = (window.innerWidth - W) / 2;
          const Y = 4;
          const centerX = X + W / 2;
          const range = 110;
          const halfRange = range / 2;
          const cy = Y + H / 2;

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
            if (Math.abs(diff) > halfRange + 20) return;

            const px = centerX + (diff / halfRange) * (W / 2);
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

          const wantAirdrop = cfg("directionhud.raidairdrop");
          const wantTeammates = cfg("directionhud.raidteammates");
          const wantWaypoints = cfg("directionhud.waypoints");

          if (wantAirdrop || wantTeammates || wantWaypoints) {
            const p = player && player.position;
            if (p && typeof p.x === "number" && typeof p.z === "number") {
              const computeMarker = (tx, tz) => {
                const dx = tx - p.x;
                const dz = tz - p.z;
                const dist = Math.sqrt(dx * dx + dz * dz);
                if (dist < 1) return null;

                let bearing = (Math.atan2(dx, -dz) * 180) / Math.PI;
                if (bearing < 0) bearing += 360;

                let diff = bearing - yaw;
                while (diff > 180) diff -= 360;
                while (diff < -180) diff += 360;

                const opacity = this._computeOpacity(dist);

                if (Math.abs(diff) > halfRange) {
                  if (!showOffscreen) return null;
                  const dir = diff > 0 ? 1 : -1;
                  const edgeX =
                    dir > 0 ? X + W - offscreenMargin : X + offscreenMargin;
                  return {
                    px: edgeX,
                    opacity,
                    offscreen: true,
                    offscreenDir: dir,
                    dist,
                  };
                }

                const px = centerX + (diff / halfRange) * (W / 2);
                return { px, opacity, offscreen: false, dist };
              };

              if (wantAirdrop && this._airdrop) {
                const m = computeMarker(this._airdrop.x, this._airdrop.z);
                if (m) {
                  const { r, g, b } = this._hexToRgb(airdropColor);
                  const rad = 3.2 * size * airdropScale;

                  if (m.offscreen) {
                    this._drawChevron(
                      c,
                      m.px,
                      cy,
                      m.offscreenDir,
                      `rgba(${r}, ${g}, ${b}, ${m.opacity})`,
                      m.opacity,
                      rad * 1.4,
                    );
                  } else {
                    c.globalAlpha = m.opacity;
                    this._drawShape(
                      c,
                      m.px,
                      cy,
                      rad,
                      airdropShape,
                      airdropColor,
                      "rgba(0,0,0,0.6)",
                      1 * size,
                    );
                    c.globalAlpha = 1;
                  }
                }
              }

              if (wantTeammates && Array.isArray(this._teammates)) {
                const { r, g, b } = this._hexToRgb(teamColor);
                for (const t of this._teammates) {
                  if (!t) continue;
                  if (!Number.isFinite(t.x) || !Number.isFinite(t.z)) continue;

                  const m = computeMarker(t.x, t.z);
                  if (!m) continue;

                  const rad = 2.2 * size * teammateScale;

                  if (m.offscreen) {
                    this._drawChevron(
                      c,
                      m.px,
                      cy,
                      m.offscreenDir,
                      `rgba(${r}, ${g}, ${b}, ${m.opacity})`,
                      m.opacity,
                      rad * 1.4,
                    );
                  } else {
                    c.globalAlpha = m.opacity;
                    this._drawShape(
                      c,
                      m.px,
                      cy,
                      rad,
                      teamShape,
                      teamColor,
                      "rgba(0,0,0,0.6)",
                      1 * size,
                    );
                    c.globalAlpha = 1;
                  }
                }
              }

              if (wantWaypoints && waypoints.length) {
                for (const wp of waypoints) {
                  if (!wp) continue;
                  if (!Number.isFinite(wp.x) || !Number.isFinite(wp.z))
                    continue;

                  const px = computePxLegacy(
                    wp.x,
                    wp.z,
                    p,
                    yaw,
                    centerX,
                    halfRange,
                    W,
                  );
                  if (px === null) continue;

                  const color = /^#[0-9A-Fa-f]{6}$/.test(wp.color)
                    ? wp.color
                    : "#7b2fe6";
                  const r = 3.0 * size * waypointScale;

                  c.save();
                  c.translate(px, cy);
                  c.beginPath();
                  c.moveTo(0, -r);
                  c.lineTo(r, 0);
                  c.lineTo(0, r);
                  c.lineTo(-r, 0);
                  c.closePath();
                  c.fillStyle = color;
                  c.fill();
                  c.strokeStyle = "rgba(0,0,0,0.6)";
                  c.lineWidth = 1 * size;
                  c.stroke();
                  c.restore();
                }
              }
            }
          }

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

        function computePxLegacy(tx, tz, p, yaw, centerX, halfRange, W) {
          const dx = tx - p.x;
          const dz = tz - p.z;
          const dist = Math.sqrt(dx * dx + dz * dz);
          if (dist < 1) return null;

          let bearing = (Math.atan2(dx, -dz) * 180) / Math.PI;
          if (bearing < 0) bearing += 360;

          let diff = bearing - yaw;
          while (diff > 180) diff -= 360;
          while (diff < -180) diff += 360;
          if (Math.abs(diff) > halfRange) return null;

          return centerX + (diff / halfRange) * (W / 2);
        }
      });
    },

    apply() {
      this._lastSig = null;
      if (!cfg("directionhud.enabled")) {
        this._airdrop = null;
        this._teammates = null;
      }
    },

    destroy() {
      if (this._tick) {
        Ticker.remove(this._tick);
        this._tick = null;
      }
      if (this._airdropListener) {
        this._airdropListener.off();
        this._airdropListener = null;
      }
      if (this._teammatesListener) {
        this._teammatesListener.off();
        this._teammatesListener = null;
      }
      if (this._canvas) {
        this._canvas.remove();
        this._canvas = null;
      }
      this._ctx = null;
      this._airdrop = null;
      this._teammates = null;
      this._lastSig = null;
      this._lastVisible = null;
    },

    options: {
      render() {
        const shapeOptions = (selected) => `
          <option value="diamond" ${selected === "diamond" ? "selected" : ""}>Diamond</option>
          <option value="circle" ${selected === "circle" ? "selected" : ""}>Circle</option>
          <option value="square" ${selected === "square" ? "selected" : ""}>Square</option>
          <option value="triangle" ${selected === "triangle" ? "selected" : ""}>Triangle</option>
        `;

        const colorInput = (id, key) => {
          const value = cfg(key);
          return `
            <div class="setting-inline">
              <input type="color" id="${id}-picker" value="${value}">
              <input type="text" id="${id}" class="cs-textbox" value="${value}">
            </div>
          `;
        };

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
            <div class="range-val" id="copt-dh-size-val">
              ${parseFloat(cfg("directionhud.size")).toFixed(2)}x
            </div>
          </div>
        </div>

        <div class="settings-section-title">
          <span>Waypoints</span>
          <div></div>
        </div>

        <div class="setting-row">
          <label data-tip="Show waypoints direction on HUD">Show Waypoint Markers</label>
          ${optToggle("dh-waypoints", cfg("directionhud.waypoints"))}
        </div>

        <div class="setting-row">
          <label>Size (Waypoint Marker)</label>
          <div class="setting-inline">
            <input
              type="range"
              id="copt-dh-waypoint-size"
              min="1"
              max="2"
              step="0.05"
              value="${cfg("directionhud.waypointSize")}"
            >
            <div class="range-val" id="copt-dh-waypoint-size-val">
              ${parseFloat(cfg("directionhud.waypointSize")).toFixed(2)}x
            </div>
          </div>
        </div>

        <div class="settings-section-title">
          <span>Raid</span>
          <div></div>
        </div>

        <div class="setting-row">
          <label data-tip="Show airdrop direction on HUD upon airdrop in Raid">Show Airdrop Marker</label>
          ${optToggle("dh-raid-airdrop", cfg("directionhud.raidairdrop"))}
        </div>

        <div class="setting-row">
          <label>Shape (Airdrop Marker)</label>
          <div class="setting-inline">
            <select id="dh-airdrop-shape" class="cs-textbox" style="width:110px;">
              ${shapeOptions(cfg("directionhud.airdropShape"))}
            </select>
          </div>
        </div>

        <div class="setting-row">
          <label>Size (Airdrop Marker)</label>
          <div class="setting-inline">
            <input
              type="range"
              id="copt-dh-airdrop-size"
              min="1"
              max="2"
              step="0.05"
              value="${cfg("directionhud.airdropSize")}"
            >
            <div class="range-val" id="copt-dh-airdrop-size-val">
              ${parseFloat(cfg("directionhud.airdropSize")).toFixed(2)}x
            </div>
          </div>
        </div>

        <div class="setting-row">
          <label data-tip="Show teammates direction on HUD upon opening the map in Raid">Show Teammate Marker</label>
          ${optToggle("dh-raid-teammates", cfg("directionhud.raidteammates"))}
        </div>

        <div class="setting-row">
          <label>Shape (Teammate Marker)</label>
          <div class="setting-inline">
            <select id="dh-team-shape" class="cs-textbox" style="width:110px;">
              ${shapeOptions(cfg("directionhud.teamShape"))}
            </select>
          </div>
        </div>

        <div class="setting-row">
          <label>Size (Teammate Marker)</label>
          <div class="setting-inline">
            <input
              type="range"
              id="copt-dh-team-size"
              min="1"
              max="2"
              step="0.05"
              value="${cfg("directionhud.teamSize")}"
            >
            <div class="range-val" id="copt-dh-team-size-val">
              ${parseFloat(cfg("directionhud.teamSize")).toFixed(2)}x
            </div>
          </div>
        </div>

        <div class="setting-row">
          <label data-tip="Show arrows on HUD when airdrop or teammate marker go off HUD">Show Edge Arrows</label>
          ${optToggle("dh-offscreen", cfg("directionhud.showOffscreen"))}
        </div>

        <div class="setting-row">
          <label data-tip="The minimum margin to display the edge arrow">Edge Margin</label>
          <div class="setting-inline">
            <input
              type="range"
              id="copt-dh-offscreen-margin"
              min="2"
              max="30"
              step="1"
              value="${cfg("directionhud.offscreenMargin")}"
            >
            <div class="range-val" id="copt-dh-offscreen-margin-val">
              ${parseFloat(cfg("directionhud.offscreenMargin"))}px
            </div>
          </div>
        </div>

        <div class="setting-row">
          <label data-tip="Show distance of marker through fade. The more transparent a marker is, the further away it is">Enable Fade</label>
          ${optToggle("dh-fade-enabled", cfg("directionhud.fadeEnabled"))}
        </div>

        <div class="setting-row">
          <label data-tip="Minimum distance for the fade to begin">Fade Start</label>
          <div class="setting-inline">
            <input
              type="range"
              id="copt-dh-fade-start"
              min="0"
              max="200"
              step="5"
              value="${cfg("directionhud.fadeStart")}"
            >
            <div class="range-val" id="copt-dh-fade-start-val">
              ${parseFloat(cfg("directionhud.fadeStart"))}m
            </div>
          </div>
        </div>

        <div class="setting-row">
          <label data-tip="Minimum distance for the fade to end">Fade End</label>
          <div class="setting-inline">
            <input
              type="range"
              id="copt-dh-fade-end"
              min="10"
              max="500"
              step="5"
              value="${cfg("directionhud.fadeEnd")}"
            >
            <div class="range-val" id="copt-dh-fade-end-val">
              ${parseFloat(cfg("directionhud.fadeEnd"))}m
            </div>
          </div>
        </div>

        <div class="setting-row">
          <label data-tip="Minimum transparency the marker can be">Minimum Opacity</label>
          <div class="setting-inline">
            <input
              type="range"
              id="copt-dh-fade-min"
              min="0"
              max="1"
              step="0.05"
              value="${cfg("directionhud.fadeMin")}"
            >
            <div class="range-val" id="copt-dh-fade-min-val">
              ${Math.round(parseFloat(cfg("directionhud.fadeMin")) * 100)}%
            </div>
          </div>
        </div>

        <div class="settings-section-title">
          <span>Colors</span>
          <div></div>
        </div>

        <div class="setting-row">
          <label>Airdrop Marker</label>
          ${colorInput("dh-airdrop-color", "directionhud.airdropColor")}
        </div>

        <div class="setting-row">
          <label>Teammate Marker</label>
          ${colorInput("dh-team-color", "directionhud.teamColor")}
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

        bindSlider(
          "copt-dh-airdrop-size",
          "copt-dh-airdrop-size-val",
          "directionhud.airdropSize",
          (v) => parseFloat(v).toFixed(2) + "x",
          parseFloat,
        );

        bindSlider(
          "copt-dh-team-size",
          "copt-dh-team-size-val",
          "directionhud.teamSize",
          (v) => parseFloat(v).toFixed(2) + "x",
          parseFloat,
        );

        bindSlider(
          "copt-dh-waypoint-size",
          "copt-dh-waypoint-size-val",
          "directionhud.waypointSize",
          (v) => parseFloat(v).toFixed(2) + "x",
          parseFloat,
        );

        bindSlider(
          "copt-dh-offscreen-margin",
          "copt-dh-offscreen-margin-val",
          "directionhud.offscreenMargin",
          (v) => parseInt(v) + "px",
          parseInt,
        );

        bindSlider(
          "copt-dh-fade-start",
          "copt-dh-fade-start-val",
          "directionhud.fadeStart",
          (v) => parseInt(v) + "m",
          parseInt,
        );

        bindSlider(
          "copt-dh-fade-end",
          "copt-dh-fade-end-val",
          "directionhud.fadeEnd",
          (v) => parseInt(v) + "m",
          parseInt,
        );

        bindSlider(
          "copt-dh-fade-min",
          "copt-dh-fade-min-val",
          "directionhud.fadeMin",
          (v) => Math.round(parseFloat(v) * 100) + "%",
          parseFloat,
        );

        bindToggle("dh-raid-airdrop", "directionhud.raidairdrop");
        bindToggle("dh-raid-teammates", "directionhud.raidteammates");
        bindToggle("dh-waypoints", "directionhud.waypoints");
        bindToggle("dh-offscreen", "directionhud.showOffscreen");
        bindToggle("dh-fade-enabled", "directionhud.fadeEnabled");

        const shapeIds = [
          ["dh-airdrop-shape", "directionhud.airdropShape"],
          ["dh-team-shape", "directionhud.teamShape"],
        ];
        shapeIds.forEach(([id, key]) => {
          const sel = byId(id);
          if (!sel) return;
          sel.addEventListener("change", () => {
            cfgSet(key, sel.value);
            MODS_BY_ID.get("directionhud")._lastSig = null;
          });
        });

        const colorPairs = [
          ["dh-airdrop-color", "directionhud.airdropColor"],
          ["dh-team-color", "directionhud.teamColor"],
        ];
        colorPairs.forEach(([id, key]) => {
          const picker = byId(id + "-picker");
          const text = byId(id);
          if (!picker || !text) return;

          const commit = (value) => {
            if (!/^#[0-9A-Fa-f]{6}$/.test(value)) return false;
            value = value.toLowerCase();
            picker.value = value;
            text.value = value;
            cfgSet(key, value);
            MODS_BY_ID.get("directionhud")._lastSig = null;
            return true;
          };

          picker.addEventListener("input", () => commit(picker.value));
          text.addEventListener("change", () => {
            if (!commit(text.value.trim())) text.value = cfg(key);
          });
          text.addEventListener("keydown", (e) => {
            if (e.key === "Enter") e.target.blur();
          });
        });
      },
    },
  });

  registerMod({
    id: "autogg",
    name: "Auto GG",
    category: ["utilities"],
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
      if (server === this.currentServer && this.wrappedListener) return;

      if (server !== this.currentServer) {
        this.restoreListener();
      }

      const packetId = Packets.toClient.GAME_END;
      const original = server.msgsListeners[packetId];
      if (typeof original !== "function") return;

      this.currentServer = server;
      this.installListener(server);
    },

    _getMessage() {
      const m1 = String(cfg("autogg.message1") || "").trim();
      const m2 = String(cfg("autogg.message2") || "").trim();
      const m3 = String(cfg("autogg.message3") || "").trim();

      if (cfg("autogg.random")) {
        const pool = [m1, m2, m3].filter((m) => m.length > 0);
        if (!pool.length) return null;
        return pool[Math.floor(Math.random() * pool.length)];
      }

      return m1 || null;
    },

    installListener(server) {
      const packetId = Packets.toClient.GAME_END;
      const original = server.msgsListeners[packetId];

      if (typeof original !== "function") return;

      this.originalListener = original;

      this.wrappedListener = (...args) => {
        try {
          original.apply(this, args);
        } catch (e) {
          console.error("[Celestar:AutoGG] original listener threw:", e);
        }

        if (!cfg("autogg.enabled")) return;
        if (Date.now() - this.lastGG < 3000) return;
        this.lastGG = Date.now();

        setTimeout(() => {
          try {
            if (!cfg("autogg.enabled")) return;
            const world = GameHooks.gameWorld;
            const currentServer = world ? world.server : null;
            if (
              !currentServer ||
              typeof currentServer.sendData !== "function"
            ) {
              return;
            }

            const message = this._getMessage();
            if (!message) return;

            currentServer.sendData(Packets.toServer.CHAT, message);
          } catch (e) {}
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
        const m1 = cfg("autogg.message1") || "";
        const m2 = cfg("autogg.message2") || "";
        const m3 = cfg("autogg.message3") || "";
        const random = cfg("autogg.random");

        const textbox = (id, value, placeholder) => `
          <input
            type="text"
            id="${id}"
            class="cs-textbox"
            value="${escHtml(value)}"
            placeholder="${escHtml(placeholder)}"
            style="width:140px;"
          >
        `;

        return `
          <div class="mod-description">
            Automatically sends a message in chat when a game ends
          </div>

          <div class="settings-section-title">
            <span>General</span>
            <div></div>
          </div>

          <div class="setting-row">
            <label>Preset 1</label>
            ${textbox("autogg-msg1", m1, "gg")}
          </div>

          <div class="setting-row">
            <label>Preset 2</label>
            ${textbox("autogg-msg2", m2, "good game")}
          </div>

          <div class="setting-row">
            <label>Preset 3</label>
            ${textbox("autogg-msg3", m3, "gg wp")}
          </div>

          <div class="setting-row">
            <label data-tip="Randomise the preset messages. When turned off, preset 1 will be sent every time">Random</label>
            ${optToggle("autogg-random", random)}
          </div>
        `;
      },

      bind() {
        const bindText = (id, key) => {
          const el = byId(id);
          if (!el) return;
          el.addEventListener("change", () => {
            cfgSet(key, el.value.trim());
          });
          el.addEventListener("keydown", (e) => {
            if (e.key === "Enter") el.blur();
          });
        };

        bindText("autogg-msg1", "autogg.message1");
        bindText("autogg-msg2", "autogg.message2");
        bindText("autogg-msg3", "autogg.message3");

        bindToggle("autogg-random", "autogg.random");
      },
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
    category: ["visuals"],
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
          <label data-tip="Thickness of border of HUD">Border Width</label>
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
          <label data-tip="Roundness of HUD">Border Radius</label>
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
          <label data-tip="Color of FPS value on HUD above 50 FPS">Text (High FPS)</label>
          ${colorInput("fps-high-color", "fps.highColor")}
        </div>

        <div class="setting-row">
          <label data-tip="Color of FPS value on HUD between 30 and 50 FPS">Text (Medium FPS)</label>
          ${colorInput("fps-medium-color", "fps.mediumColor")}
        </div>

        <div class="setting-row">
          <label data-tip="Color of FPS value on HUD below 30 FPS">Text (Low FPS)</label>
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
        cfg("cps.borderRadius") == null ? 6 : cfg("cps.borderRadius");

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
          <label data-tip="Show clicks per second of left mouse button and right mouse button separately">Separate LMB/RMB</label>
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
          <label data-tip="Thickness of border of HUD">Border Width</label>
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
          <label data-tip="Roundness of HUD">Border Radius</label>
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
    category: ["visuals"],
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
    category: ["utilities"],
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

      if (!message.dataset.csOriginal) {
        message.dataset.csOriginal = textEl.textContent;
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

          if (textEl && original != null) {
            textEl.textContent = original;
          }

          const badge = message.querySelector(".cs-translation-badge");
          if (badge) badge.remove();

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
                    <label data-tip="The language that all messages should automatically be translated to">Language</label>

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

    _tick: null,
    _el: null,
    _lastKills: -1,
    _lastDeaths: -1,

    _inGame() {
      return location.pathname.startsWith("/match/the-war");
    },

    _warStore() {
      try {
        return GameHooks.stores?.get("theWarStore") || null;
      } catch (e) {
        return null;
      }
    },

    _remove() {
      if (this._el) {
        this._el.remove();
        this._el = null;
      }
      const stale = document.querySelector(".game .stats .kd-display");
      if (stale) stale.remove();
      this._lastKills = -1;
      this._lastDeaths = -1;
    },

    _update() {
      if (!cfg("kdr.enabled")) {
        this._remove();
        return;
      }

      if (!this._inGame()) {
        this._remove();
        return;
      }

      const war = this._warStore();
      if (!war) return;

      const kills = Number(war.myKills);
      const deaths = Number(war.myDeaths);
      if (!Number.isFinite(kills) || !Number.isFinite(deaths)) return;

      if (kills === this._lastKills && deaths === this._lastDeaths) return;
      this._lastKills = kills;
      this._lastDeaths = deaths;

      const stats = document.querySelector(".game .stats");
      if (!stats) return;

      if (!this._el || !this._el.isConnected) {
        const kdDiv = document.createElement("div");
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
        this._el = kdDiv;
      }

      const kdr = deaths === 0 ? kills : (kills / deaths).toFixed(1);
      const text = `KDR ${kdr}`;
      if (this._el.textContent !== text) this._el.textContent = text;
    },

    init() {
      this._tick = Ticker.add(() => this._update(), 500);
      this._update();
    },

    apply() {
      if (!cfg("kdrindicator.enabled")) {
        this._remove();
        return;
      }
      this._update();
    },

    destroy() {
      if (this._tick) {
        Ticker.remove(this._tick);
        this._tick = null;
      }
      this._remove();
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
    category: ["hud"],
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
    category: ["visuals"],

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
    category: ["visuals"],
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
    category: ["visuals"],
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
    category: ["visuals"],
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
    category: ["utilities"],
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
    category: ["visuals"],
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
    _searchQuery: "",
    _ICON_URLS: {
      arrow: "https://minefun.io/assets/arrow-DQQW0f5R.png",
      brokenHeart: "https://minefun.io/assets/brokenHeart-Cuc7A4WI.png",
      death: "https://minefun.io/assets/death-B8qQV9qP.png",
      brokenShield: "https://minefun.io/assets/brokenShield-BYum1Mgy.png",
      energy: "https://minefun.io/assets/energy-B-HrgJg6.png",
      flame: "https://minefun.io/assets/flame-CE_hd3lD.png",
      gem: "https://minefun.io/assets/gem-DxpxD4nw.png",
      goldCoin: "https://minefun.io/assets/goldCoin-D7FdyftV.png",
      heart: "https://minefun.io/assets/heart-C223j20s.png",
      impactBurst: "https://minefun.io/assets/impactBurst-DoZMqsP-.png",
      medCross: "https://minefun.io/assets/medCross-BpEpzTHw.png",
      poison: "https://minefun.io/assets/poison-CCFqY7Cj.png",
      shield: "https://minefun.io/assets/shield-CW6NNEIE.png",
      slashCross: "https://minefun.io/assets/slashCross-CNDAkHv9.png",
      star: "https://minefun.io/assets/star-D4c5QKaQ.png",
      waterBubbles: "https://minefun.io/assets/waterBubbles-BPxkqFoz.png",
      waterDrop: "https://minefun.io/assets/waterDrop-CxZFek13.png",
      slowness: "https://minefun.io/assets/slowness-C1DqHnGc.png",
      strength: "https://minefun.io/assets/strength-C1T-5lTQ.png",
      weakness: "https://minefun.io/assets/weakness-D3Ofqy0h.png",
      jumpBoost: "https://minefun.io/assets/jumpBoost-BR9nSuOv.png",
      miningSpeed: "https://minefun.io/assets/miningSpeed-Bo0gMPdX.png",
      miningFatigue: "https://minefun.io/assets/miningFatigue-D1Xq2qjB.png",
      invisibility: "https://minefun.io/assets/invisibility-BhBN0U9l.png",
      nightVision: "https://minefun.io/assets/nightVision-CW8dgRdJ.png",
      skull: "https://minefun.io/assets/skull-y4aiBsYt.png",
    },
    _HIT_ATLAS_URL: "https://minefun.io/assets/hitAtlasPlane-DvWiPlVq.png",
    _HIT_ATLAS_FRAMES: 7,
    _HIT_ATLAS_COLS: 1,
    _HIT_ATLAS_ROWS: 7,
    _HIT_ATLAS_FPS: 0.5,

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

      if (sr.__hpHooked && sr.spawn === sr.__hpWrapper) {
        this._sr = sr;
        return;
      }

      const original = sr.spawn;
      sr.__hpOriginal = original;

      const wrapper = function (effect, textureId, position, velocity) {
        const mod = MODS_BY_ID.get("hideparticles");
        try {
          if (
            mod &&
            cfg("hideparticles.enabled") &&
            mod._hideSprite(textureId)
          ) {
            return;
          }
        } catch (e) {}
        try {
          return original.call(this, effect, textureId, position, velocity);
        } catch (e) {
          if (sr.spawn === wrapper) {
            sr.spawn = original;
            sr.__hpHooked = false;
            sr.__hpWrapper = null;
          }
          throw e;
        }
      };

      sr.spawn = wrapper;
      sr.__hpWrapper = wrapper;
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

    _renderIcon(key) {
      if (key === "hit") return this._renderAtlasIcon();

      const url = this._ICON_URLS[key];
      if (!url) return `<div class="hp-icon hp-icon-empty"></div>`;

      return `<img class="hp-icon" src="${escHtml(url)}" alt="" draggable="false"
                   loading="lazy" onerror="this.style.display='none'">`;
    },

    _renderAtlasIcon() {
      const url = this._HIT_ATLAS_URL;
      if (!url) return `<div class="hp-icon hp-icon-empty"></div>`;

      const size = 20;
      const cols = this._HIT_ATLAS_COLS;
      const rows = this._HIT_ATLAS_ROWS;

      return `<div class="hp-icon hp-icon-atlas"
                   style="
                     background-image: url('${escHtml(url)}');
                     background-size: ${cols * size}px ${rows * size}px;
                     background-position: 0 0;
                     width: ${size}px;
                     height: ${size}px;
                   "></div>`;
    },

    options: {
      render() {
        const t = (id, key) => optToggle(id, cfg(key));
        const mod = MODS_BY_ID.get("hideparticles");

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

        const basicRows = basic
          .map(
            ([name, id, key]) => `
                <div class="setting-row hp-row" data-hp-name="${escHtml(name.toLowerCase())}">
                    <label>${name}</label>
                    ${t(id, key)}
                </div>
            `,
          )
          .join("");

        const effectRows = effects
          .map(
            ([name, key]) => `
                <div class="setting-row hp-row" data-hp-name="${escHtml(name.toLowerCase())}">
                    <label class="hp-row-label">
                        ${mod._renderIcon(key)}
                        <span>${name}</span>
                    </label>
                    ${t(`hp-effect-${key}`, `hideparticles.effect.${key}`)}
                </div>
            `,
          )
          .join("");

        const basicKeysJson = escHtml(
          JSON.stringify(basic.map(([_, _id, key]) => key)),
        );
        const effectKeysJson = escHtml(
          JSON.stringify(
            effects.map(([_, key]) => `hideparticles.effect.${key}`),
          ),
        );

        const fps = 1 / mod._HIT_ATLAS_FPS;
        const travelPx = mod._HIT_ATLAS_FRAMES * 20;

        return `
            <style>
              #__cs_options_body .hp-row-label {
                display: inline-flex;
                align-items: center;
                gap: 8px;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                font-size: 12px;
                color: var(--grey-2);
              }
              #__cs_options_body .hp-icon {
                width: 20px;
                height: 20px;
                object-fit: contain;
                image-rendering: pixelated;
                flex-shrink: 0;
              }
              #__cs_options_body .hp-icon-empty {
                display: inline-block;
                width: 20px;
                height: 20px;
                flex-shrink: 0;
                background: rgba(255,255,255,0.04);
                border-radius: 3px;
              }
              #__cs_options_body .hp-icon-atlas {
              display: inline-block;
              flex-shrink: 0;
              image-rendering: pixelated;
              animation: hp-atlas ${mod._HIT_ATLAS_FPS}s steps(${mod._HIT_ATLAS_FRAMES}) infinite;
              }
              @keyframes hp-atlas {
                 from { background-position: 0 0; }
                 to   { background-position: 0 -${mod._HIT_ATLAS_FRAMES * 20}px; }
              }
              #__cs_options_body .hp-section-header {
                display: flex;
                align-items: center;
                gap: 10px;
                margin: 18px 0 0;
              }
              #__cs_options_body .hp-section-header .hp-section-title {
                display: flex;
                align-items: center;
                gap: 10px;
                flex: 1;
                color: var(--grey-2);
                opacity: 0.5;
                font-size: 12.5px;
                font-weight: 700;
                text-transform: uppercase;
              }
              #__cs_options_body .hp-section-header .hp-section-title span {
                white-space: nowrap;
              }
              #__cs_options_body .hp-section-header .hp-section-title div {
                flex: 1;
                height: 1px;
                background: var(--grey-2);
                opacity: 0.5;
              }
              #__cs_options_body .hp-bulk {
                display: flex;
                gap: 4px;
                flex-shrink: 0;
              }
              #__cs_options_body .hp-bulk .opt-btn {
                font-size: 10px;
                padding: 5px 8px;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                opacity: 0.85;
              }
              #__cs_options_body .hp-search {
                width: 100%;
                box-sizing: border-box;
                background: var(--background-1);
                border: 1px solid var(--border-1);
                color: var(--white);
                border-radius: 5px;
                padding: 6px 10px;
                font-size: 12px;
                outline: none;
                font-family: sans-serif;
                margin: 4px 0 8px;
              }
              #__cs_options_body .hp-search::placeholder {
                color: var(--grey-2);
              }
              #__cs_options_body .hp-empty {
                font-size: 12px;
                color: var(--grey-2);
                text-align: center;
                padding: 16px 12px;
                border: 1px dashed var(--border-1);
                border-radius: 8px;
                margin-top: 8px;
              }
              #__cs_options_body .hp-top-row {
              display: flex;
              align-items: center;
              justify-content: space-between;
              }
              #__cs_options_body .hp-top-row .hp-search {
              flex: 0 0 180px;
              width: 180px;
              margin: 0;
              }
            </style>

            <div class="hp-top-row">
  <div class="mod-description" style="margin:0;">
    Hide specific particles from emitting
  </div>
  <input
    type="text"
    id="hp-search-input"
    class="hp-search"
    placeholder="Search particles…"
    value="${escHtml(mod._searchQuery || "")}"
  >
</div>

            <div class="hp-section-header">
              <div class="hp-section-title">
                <span>General</span>
                <div></div>
              </div>
              <div class="hp-bulk" data-hp-keys='${basicKeysJson}'>
                <button class="opt-btn hp-bulk-on" type="button">On All</button>
                <button class="opt-btn hp-bulk-off" type="button">Off All</button>
              </div>
            </div>
            <div id="hp-basic-rows" style="display:flex;flex-direction:column;gap:10px;">${basicRows}</div>

            <div class="hp-section-header">
              <div class="hp-section-title">
                <span>Effect Particles</span>
                <div></div>
              </div>
              <div class="hp-bulk" data-hp-keys='${effectKeysJson}'>
                <button class="opt-btn hp-bulk-on" type="button">On All</button>
                <button class="opt-btn hp-bulk-off" type="button">Off All</button>
              </div>
            </div>
            <div id="hp-effect-rows" style="display:flex;flex-direction:column;gap:10px;">${effectRows}</div>

            <div id="hp-no-results" class="hp-empty" style="display:none;">
              No particles match
            </div>
        `;
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

        document.querySelectorAll(".hp-bulk").forEach((group) => {
          const keysJson = group.dataset.hpKeys;
          if (!keysJson) return;
          let configKeys;
          try {
            configKeys = JSON.parse(keysJson);
          } catch (e) {
            return;
          }

          const setAll = (value) => {
            configKeys.forEach((cfgKey) => cfgSet(cfgKey, value));
            if (typeof window.__csRefreshOptions === "function") {
              window.__csRefreshOptions();
            }
            mod.apply();
          };

          group
            .querySelector(".hp-bulk-on")
            ?.addEventListener("click", () => setAll(true));
          group
            .querySelector(".hp-bulk-off")
            ?.addEventListener("click", () => setAll(false));
        });

        const search = byId("hp-search-input");
        if (search) {
          const applyFilter = () => {
            mod._searchQuery = search.value;
            const q = search.value.trim().toLowerCase();
            let anyVisible = false;

            document.querySelectorAll(".hp-row").forEach((row) => {
              const name = row.dataset.hpName || "";
              const show = !q || name.includes(q);
              row.style.display = show ? "" : "none";
              if (show) anyVisible = true;
            });

            const empty = byId("hp-no-results");
            if (empty) {
              empty.style.display = anyVisible ? "none" : "";
            }
          };

          search.addEventListener("input", applyFilter);

          if (mod._searchQuery) applyFilter();
        }
      },
    },

    destroy() {
      if (this._tick) {
        Ticker.remove(this._tick);
        this._tick = null;
      }

      const sr = this._sr;
      if (
        sr &&
        sr.__hpHooked &&
        sr.__hpWrapper &&
        sr.spawn === sr.__hpWrapper
      ) {
        sr.spawn = sr.__hpOriginal;
      }
      if (sr) {
        delete sr.__hpOriginal;
        delete sr.__hpHooked;
        delete sr.__hpWrapper;
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
      this._searchQuery = "";
    },
  });

  registerMod({
    id: "hideclouds",
    name: "Hide Clouds",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-cloud-off"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9.58 5.548c.24 -.11 .492 -.207 .752 -.286c1.88 -.572 3.956 -.193 5.444 1c1.488 1.19 2.162 3.007 1.77 4.769h.99c1.913 0 3.464 1.56 3.464 3.486c0 .957 -.383 1.824 -1.003 2.454m-2.997 1.033h-11.343c-2.572 -.004 -4.657 -2.011 -4.657 -4.487c0 -2.475 2.085 -4.482 4.657 -4.482c.13 -.582 .37 -1.128 .7 -1.62" /><path d="M3 3l18 18" /></svg>`,
    category: ["visuals"],
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
    name: "BedWars Notifs",
    category: ["utilities"],
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-bell"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M10 5a2 2 0 1 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" /><path d="M9 17v1a3 3 0 0 0 6 0v-1" /></svg>`,
    hasOptions: true,

    bedListener: null,
    eliminationListener: null,

    _bufferCache: new Map(),
    _fetching: new Map(),

    _container: null,
    _toasts: [],

    _eliminatedTeams: Object.create(null),
    _lastRoomKey: null,
    _preloaded: false,

    _SOUND_URLS: {
      bed: "https://minefun.io/assets/select-iaFF95Ap.mp3",
      eliminated: "https://minefun.io/assets/newPhase-Cd7o-1xF.mp3",
    },

    _ICON_URLS: {
      bed: {
        red: "https://minefun.io/assets/640-DSh60gjK.png",
        blue: "https://minefun.io/assets/1046-yBpzjP02.png",
        green: "https://minefun.io/assets/1048-DARFgmWy.png",
        yellow: "https://minefun.io/assets/1058-zkWt4hVU.png",
        purple: "https://minefun.io/assets/1054-BB_QI2Pe.png",
        orange: "https://minefun.io/assets/1052-Ch3SkaG5.png",
        white: "https://minefun.io/assets/1056-D9V-wvsD.png",
        "light blue": "https://minefun.io/assets/1050-CsZnjCVk.png",
        light_blue: "https://minefun.io/assets/1050-CsZnjCVk.png",
        gray: "",
        grey: "",
        default: "",
      },
      eliminated: {
        red: "",
        blue: "",
        green: "",
        yellow: "",
        purple: "",
        orange: "",
        white: "",
        gray: "",
        grey: "",
        "light blue": "",
        light_blue: "",
        default: "https://minefun.io/assets/skull-y4aiBsYt.png",
      },
    },

    _FALLBACK_ICONS: {
      bed: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="width:34px;height:34px;"><rect x="2" y="7" width="20" height="11" rx="2" fill="#ffffff"/><rect x="2" y="12" width="20" height="6" rx="1" fill="#d8d8d8"/><line x1="4" y1="4" x2="20" y2="20" stroke="#ffffff" stroke-width="2.6" stroke-linecap="round"/><line x1="4" y1="4" x2="20" y2="20" stroke="#1e1e2e" stroke-width="1" stroke-linecap="round"/></svg>`,
      eliminated: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="width:34px;height:34px;"><path fill="#ffffff" d="M12 2a9 9 0 0 0-9 9v3a3 3 0 0 0 3 3h1v-3a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v3h1a3 3 0 0 0 3-3v-3a9 9 0 0 0-9-9z"/><circle cx="8.5" cy="9.5" r="1.7" fill="#1e1e2e"/><circle cx="15.5" cy="9.5" r="1.7" fill="#1e1e2e"/><path fill="#ffffff" d="M9 14h6v6a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1z"/><line x1="11" y1="15.5" x2="11" y2="19.5" stroke="#1e1e2e" stroke-width="1.2"/><line x1="13" y1="15.5" x2="13" y2="19.5" stroke="#1e1e2e" stroke-width="1.2"/></svg>`,
    },

    init() {
      this._injectStyles();

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

      this._preloaded = false;
      this._lastRoomKey = null;

      this._roomTick = Ticker.add(() => {
        if (!this._preloaded) {
          const listener = this._getListener();
          if (listener && listener.context) {
            this._preload();
            this._preloaded = true;
          }
        }
        this._checkRoomChange();
      }, 500);
    },

    _getStores() {
      try {
        return GameHooks.stores;
      } catch (e) {
        return null;
      }
    },

    _getRoomKey() {
      try {
        const stores = this._getStores();
        if (!stores) return null;

        const room = stores.get("roomState");
        const lobby = stores.get("lobbyManager");

        const parts = [];
        if (room?.visibilityRoomId) parts.push("r:" + room.visibilityRoomId);
        if (room?.roomLink) parts.push("l:" + room.roomLink);
        if (lobby?.myIdInLobby) parts.push("i:" + lobby.myIdInLobby);
        if (room?.matchId) parts.push("m:" + room.matchId);
        if (room?.gameId) parts.push("g:" + room.gameId);

        if (parts.length === 0) return null;
        return parts.join("|");
      } catch (e) {
        return null;
      }
    },

    _checkRoomChange() {
      const key = this._getRoomKey();
      if (!key) return;

      if (this._lastRoomKey === null) {
        this._lastRoomKey = key;
        return;
      }

      if (key !== this._lastRoomKey) {
        this._lastRoomKey = key;
        this._eliminatedTeams = Object.create(null);
      }
    },

    notifyBedDestroyed(username, team) {
      this.showNotification({
        kind: "bed",
        team,
        line1: `${String(team).toUpperCase()} TEAM BED DESTROYED`,
        line1Color: this.getTeamColor(team),
        line2: "by " + username,
      });
      this.playSound("bed");
    },

    notifyTeamEliminated(team) {
      const key = String(team).toLowerCase();
      if (this._eliminatedTeams[key]) return;
      this._eliminatedTeams[key] = true;

      this.showNotification({
        kind: "eliminated",
        team,
        line1: `${String(team).toUpperCase()} TEAM`,
        line1Color: this.getTeamColor(team),
        line2Before: "has been ",
        line2Red: "eliminated",
      });
      this.playSound("eliminated");
    },

    _getListener() {
      try {
        const systems = GameHooks.systems;
        if (!systems) return null;
        const sys = systems.find((s) => s && s.audioListener);
        return sys ? sys.audioListener : null;
      } catch (e) {
        return null;
      }
    },

    _preload() {
      const listener = this._getListener();
      if (!listener || !listener.context) return;
      const ctx = listener.context;
      Object.values(this._SOUND_URLS).forEach((url) => {
        this._loadBuffer(url, ctx).catch(() => {});
      });
    },

    async _loadBuffer(url, ctx) {
      if (this._bufferCache.has(url)) {
        const cached = this._bufferCache.get(url);
        if (cached) return cached;
        this._bufferCache.delete(url);
      }
      if (this._fetching.has(url)) return this._fetching.get(url);

      const promise = (async () => {
        try {
          const res = await fetch(url);
          if (!res.ok) throw new Error("HTTP " + res.status);
          const arrayBuf = await res.arrayBuffer();
          const audioBuf = await ctx.decodeAudioData(arrayBuf);
          this._bufferCache.set(url, audioBuf);
          return audioBuf;
        } catch (e) {
          console.warn("[Celestar:BedwarsNotif] Sound load failed:", url, e);
          return null;
        } finally {
          this._fetching.delete(url);
        }
      })();

      this._fetching.set(url, promise);
      return promise;
    },

    async playSound(kind) {
      if (!cfg("bedwarsnotif.sound")) return;

      const url = this._SOUND_URLS[kind];
      if (!url) return;

      const listener = this._getListener();
      if (!listener || !listener.context) return;

      const ctx = listener.context;
      if (ctx.state === "suspended") {
        try {
          await ctx.resume();
        } catch (e) {}
      }

      const buffer = await this._loadBuffer(url, ctx);
      if (!buffer) return;

      const volume = Math.min(
        1,
        Math.max(0, parseFloat(cfg("bedwarsnotif.volume")) || 0.5),
      );
      if (volume <= 0) return;

      let masterVol = 1;
      try {
        if (typeof listener.getMasterVolume === "function") {
          masterVol = listener.getMasterVolume() || 1;
        }
      } catch (e) {}

      const src = ctx.createBufferSource();
      src.buffer = buffer;

      const gain = ctx.createGain();
      gain.gain.value = volume * masterVol;

      src.connect(gain);

      try {
        const input =
          typeof listener.getInput === "function"
            ? listener.getInput()
            : listener.context.destination;
        gain.connect(input);
      } catch (e) {
        gain.connect(ctx.destination);
      }

      src.start(0);
    },

    _resolveIconUrl(kind, team) {
      const table = this._ICON_URLS[kind];
      if (!table) return null;
      const key = String(team).toLowerCase().replace(/-/g, "_");
      if (table[key]) return table[key];
      if (table.default) return table.default;
      return null;
    },

    _buildIcon(kind, team) {
      const url = this._resolveIconUrl(kind, team);
      if (url) {
        return `<img src="${this.escapeHtml(url)}" alt="" style="width:34px;height:34px;image-rendering:pixelated;object-fit:contain;">`;
      }
      return this._FALLBACK_ICONS[kind] || this._FALLBACK_ICONS.bed;
    },

    _injectStyles() {
      if (document.getElementById("__cs_bedwars_styles")) return;
      const style = document.createElement("style");
      style.id = "__cs_bedwars_styles";
      style.textContent = `
        #__cs_bedwars_stack {
          position: fixed;
          top: 90px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 9999999;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          pointer-events: none;
        }

        .cs-toast {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 6px 16px 6px 6px;
          background: #2c2c3e;
          border: 2px solid #0d0d17;
          border-radius: 6px;
          box-shadow:
            0 3px 0 rgba(0,0,0,0.35),
            0 6px 18px rgba(0,0,0,0.45);
          font-family: 'Lilita One', 'Trebuchet MS', sans-serif;
          opacity: 0;
          transform: translateY(-12px);
          transition: opacity 200ms ease, transform 200ms ease;
          max-width: 90vw;
        }

        .cs-toast.cs-show {
          opacity: 1;
          transform: translateY(0);
        }

        .cs-toast .cs-icon {
          flex: 0 0 auto;
          width: 46px;
          height: 46px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #1e1e2e;
          border: 2px solid #0d0d17;
          border-radius: 5px;
        }

        .cs-toast .cs-body {
          display: flex;
          flex-direction: column;
          justify-content: center;
          line-height: 1.05;
          gap: 2px;
        }

        .cs-toast .cs-title {
          display: block;
          font-size: 20px;
          letter-spacing: 0.5px;
          color: #ffffff;
          text-shadow:
            2px 2px 0 rgba(0,0,0,0.7),
            -1px -1px 0 rgba(0,0,0,0.4),
            1px -1px 0 rgba(0,0,0,0.4),
            -1px 1px 0 rgba(0,0,0,0.4);
        }

        .cs-toast .cs-sub {
          display: block;
          font-size: 15px;
          font-weight: 400;
          color: #cfd3dd;
          font-family: 'Trebuchet MS', 'Lilita One', sans-serif;
          letter-spacing: 0.3px;
          text-shadow:
            1px 1px 0 rgba(0,0,0,0.7),
            -1px -1px 0 rgba(0,0,0,0.35);
        }

        .cs-toast .cs-sub .cs-red {
          color: #e04545;
        }
      `;
      document.head.appendChild(style);
    },

    _getContainer() {
      if (this._container && this._container.isConnected) {
        return this._container;
      }
      let c = document.getElementById("__cs_bedwars_stack");
      if (!c) {
        c = document.createElement("div");
        c.id = "__cs_bedwars_stack";
        document.body.appendChild(c);
      }
      this._container = c;
      return c;
    },

    showNotification({
      kind,
      team,
      line1,
      line1Color,
      line2,
      line2Before,
      line2Red,
    }) {
      const container = this._getContainer();

      const el = document.createElement("div");
      el.className = "cs-toast";

      const iconHtml = this._buildIcon(kind, team);
      const color = line1Color || "#ffffff";

      let subHtml = "";
      if (line2 != null) {
        subHtml = this.escapeHtml(line2);
      } else if (line2Before != null || line2Red != null) {
        subHtml =
          this.escapeHtml(line2Before || "") +
          `<span class="cs-red">${this.escapeHtml(line2Red || "")}</span>`;
      }

      el.innerHTML = `
        <div class="cs-icon">${iconHtml}</div>
        <div class="cs-body">
          <span class="cs-title" style="color:${color};">${this.escapeHtml(line1)}</span>
          <span class="cs-sub">${subHtml}</span>
        </div>
      `;

      container.appendChild(el);

      const toast = { el, timer: null, hideTimer: null };
      this._toasts.push(toast);

      requestAnimationFrame(() => {
        el.classList.add("cs-show");
      });

      const dismiss = () => {
        el.classList.remove("cs-show");
        toast.hideTimer = setTimeout(() => {
          el.remove();
          const i = this._toasts.indexOf(toast);
          if (i >= 0) this._toasts.splice(i, 1);
        }, 220);
      };

      toast.timer = setTimeout(dismiss, 3000);
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
        gray: "#9AA0B4",
        grey: "#9AA0B4",
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
        const volume = parseFloat(cfg("bedwarsnotif.volume"));
        return `
        <div class="mod-description">
          Show notifications when a bed is broken or a team is eliminated
        </div>

        <div class="settings-section-title">
          <span>General</span>
          <div></div>
        </div>

        <div class="setting-row">
          <label data-tip="Show a notification when a team's bed is destroyed in Bedwars">Bed Destroyed</label>
          ${optToggle("bedwarsnotif-bedDestroy", cfg("bedwarsnotif.bedDestroy"))}
        </div>

        <div class="setting-row">
          <label data-tip="Show a notification when all players of a team loses in Bedwars">Team Eliminated</label>
          ${optToggle("bedwarsnotif-teamEliminated", cfg("bedwarsnotif.teamEliminated"))}
        </div>

        <div class="settings-section-title">
          <span>Sound</span>
          <div></div>
        </div>

        <div class="setting-row">
          <label>Play Sound</label>
          ${optToggle("bedwarsnotif-sound", cfg("bedwarsnotif.sound"))}
        </div>

        <div class="setting-row">
          <label>Volume</label>
          <div class="setting-inline">
            <input
              type="range"
              id="bedwarsnotif-volume"
              min="0"
              max="1"
              step="0.05"
              value="${volume}"
            >
            <div class="range-val" id="bedwarsnotif-volume-val">
              ${Math.round(volume * 100)}%
            </div>
          </div>
        </div>
      `;
      },

      bind() {
        bindToggle("bedwarsnotif-bedDestroy", "bedwarsnotif.bedDestroy");
        bindToggle(
          "bedwarsnotif-teamEliminated",
          "bedwarsnotif.teamEliminated",
        );
        bindToggle("bedwarsnotif-sound", "bedwarsnotif.sound");

        bindSlider(
          "bedwarsnotif-volume",
          "bedwarsnotif-volume-val",
          "bedwarsnotif.volume",
          (v) => Math.round(parseFloat(v) * 100) + "%",
          parseFloat,
        );
      },
    },

    destroy() {
      if (this.bedListener) this.bedListener.off();
      if (this.eliminationListener) this.eliminationListener.off();
      this.bedListener = null;
      this.eliminationListener = null;

      if (this._roomTick) {
        try {
          Ticker.remove(this._roomTick);
        } catch (e) {}
        this._roomTick = null;
      }
      this._preloaded = false;

      this._toasts.forEach((t) => {
        clearTimeout(t.timer);
        clearTimeout(t.hideTimer);
        if (t.el && t.el.parentNode) t.el.parentNode.removeChild(t.el);
      });
      this._toasts = [];

      if (this._container && this._container.parentNode) {
        this._container.parentNode.removeChild(this._container);
      }
      this._container = null;

      const styles = document.getElementById("__cs_bedwars_styles");
      if (styles) styles.remove();

      this._bufferCache.clear();
      this._fetching.clear();
      this._eliminatedTeams = Object.create(null);
      this._lastRoomKey = null;
    },
  });

  registerMod({
    id: "armoffset",
    name: "Arm Position",
    category: ["utilities"],
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
    category: ["hud"],
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
    category: ["utilities"],
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-message-heart"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M8 9h8" /><path d="M8 13h3.5" /><path d="M10.48 19.512l-2.48 1.488v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v4" /><path d="M18 22l3.35 -3.284a2.143 2.143 0 0 0 .005 -3.071a2.242 2.242 0 0 0 -3.129 -.006l-.224 .22l-.223 -.22a2.242 2.242 0 0 0 -3.128 -.006a2.143 2.143 0 0 0 -.006 3.071l3.355 3.296" /></svg>`,
    hasOptions: true,

    _input: null,
    _dropdown: null,
    _observer: null,
    _tick: null,

    _boundInput: null,
    _boundKeydown: null,
    _boundKeyup: null,
    _boundBlur: null,

    _suggestions: [],
    _selectedIndex: 0,
    _lastQuery: "",
    _consumeEnterKeyup: false,

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
      this._boundBlur = () => {
        setTimeout(() => {
          if (!this._dropdown) return;
          const active = document.activeElement;
          if (active === this._input) return;
          this._hideDropdown();
        }, 120);
      };

      input.addEventListener("input", this._boundInput);
      input.addEventListener("keydown", this._boundKeydown, true);
      input.addEventListener("keyup", this._boundKeyup, true);
      input.addEventListener("blur", this._boundBlur);
    },

    _unbindInput() {
      if (!this._input) return;

      if (this._boundInput)
        this._input.removeEventListener("input", this._boundInput);
      if (this._boundKeydown)
        this._input.removeEventListener("keydown", this._boundKeydown, true);
      if (this._boundKeyup)
        this._input.removeEventListener("keyup", this._boundKeyup, true);
      if (this._boundBlur)
        this._input.removeEventListener("blur", this._boundBlur);

      this._input = null;
      this._boundInput = null;
      this._boundKeydown = null;
      this._boundKeyup = null;
      this._boundBlur = null;
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
    category: ["hud"],
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
    category: ["hud"],
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
    category: ["hud"],
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
                        ${name ? name + " installed" : "No UI installed"}
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
                  updateStatus(ui.name);

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

  registerMod({
    id: "hitcolor",
    name: "Hit Color",
    category: ["visuals", "new"],
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-hand-click"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M8 13v-8.5a1.5 1.5 0 0 1 3 0v7.5" /><path d="M11 11.5v-2a1.5 1.5 0 0 1 3 0v2.5" /><path d="M14 10.5a1.5 1.5 0 0 1 3 0v1.5" /><path d="M17 11.5a1.5 1.5 0 0 1 3 0v4.5a6 6 0 0 1 -6 6h-2h.208a6 6 0 0 1 -5.012 -2.7l-.196 -.3c-.312 -.479 -1.407 -2.388 -3.286 -5.728a1.5 1.5 0 0 1 .536 -2.022a1.867 1.867 0 0 1 2.28 .28l1.47 1.47" /><path d="M5 3l-1 -1" /><path d="M4 7h-1" /><path d="M14 3l1 -1" /><path d="M15 6h1" /></svg>`,
    hasOptions: true,

    _styleEl: null,
    _lastSig: null,

    init() {
      this._styleEl = document.createElement("style");
      this._styleEl.id = "__cs_hit_color";
      document.head.appendChild(this._styleEl);
      this.apply();
    },

    apply() {
      if (!this._styleEl) return;

      if (!cfg("hitcolor.enabled")) {
        if (this._lastSig !== "off") {
          this._styleEl.textContent = "";
          this._lastSig = "off";
        }
        return;
      }

      let hit = cfg("hitcolor.hit") || "#ffffff";
      let head = cfg("hitcolor.headshot") || "#ff0000";
      if (!/^#[0-9A-Fa-f]{6}$/.test(hit)) hit = "#ffffff";
      if (!/^#[0-9A-Fa-f]{6}$/.test(head)) head = "#ff0000";

      const sig = hit + "|" + head;
      if (this._lastSig === sig) return;
      this._lastSig = sig;

      this._styleEl.textContent = `
      .hit[data-v-b3cf6f96] {
        background: ${hit} !important;
      }
      .headshot[data-v-b3cf6f96] {
        background: ${head} !important;
      }
    `;
    },

    destroy() {
      this._styleEl?.remove();
      this._styleEl = null;
    },

    options: {
      render() {
        const col = (id, key) => {
          const value = cfg(key) || "#ffffff";
          const pickerValue = /^#[0-9A-Fa-f]{6}$/.test(value)
            ? value
            : "#ffffff";

          return `
          <div class="setting-inline">
            <input
              type="color"
              id="${id}-picker"
              value="${pickerValue}"
            >
            <input
              type="text"
              id="${id}"
              class="cs-textbox"
              value="${value}"
            >
          </div>
        `;
        };

        return `
        <div class="mod-description">
          Changes the color of hit markers and headshot markers
        </div>

        <div class="settings-section-title">
          <span>Colors</span>
          <div></div>
        </div>

        <div class="setting-row">
          <label>Hit</label>
          ${col("hitcolor-hit", "hitcolor.hit")}
        </div>

        <div class="setting-row">
          <label>Headshot</label>
          ${col("hitcolor-headshot", "hitcolor.headshot")}
        </div>
      `;
      },

      bind() {
        const mod = MODS_BY_ID.get("hitcolor");

        const colors = [
          ["hitcolor-hit", "hitcolor.hit"],
          ["hitcolor-headshot", "hitcolor.headshot"],
        ];

        colors.forEach(([id, key]) => {
          const text = byId(id);
          const picker = byId(`${id}-picker`);
          if (!text || !picker) return;

          picker.addEventListener("input", () => {
            const value = picker.value.toLowerCase();
            text.value = value;
            cfgSet(key, value);
            mod.apply();
          });

          text.addEventListener("change", () => {
            let value = text.value.trim();
            if (!/^#[0-9A-Fa-f]{6}$/.test(value)) {
              text.value = cfg(key);
              return;
            }
            value = value.toLowerCase();
            text.value = value;
            picker.value = value;
            cfgSet(key, value);
            mod.apply();
          });

          text.addEventListener("keydown", (e) => {
            if (e.key === "Enter") e.target.blur();
          });
        });
      },
    },
  });

  registerMod({
    id: "chat",
    name: "Chat",
    category: ["utilities", "new"],
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-message"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M8 9h8" /><path d="M8 13h6" /><path d="M18 4a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-5l-5 3v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12" /></svg>`,
    hasOptions: true,

    _observer: null,
    _cache: new Map(),
    _pending: new Map(),
    _styleEl: null,
    _longChatTick: null,

    _myUsername: null,
    _usernameTick: null,

    async _fetchAvatar(username) {
      if (this._cache.has(username)) return this._cache.get(username);
      if (this._pending.has(username)) return this._pending.get(username);

      const promise = (async () => {
        try {
          const res = await fetch("https://api.minefun.io/v1/users/profile", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: username }),
          });

          if (!res.ok) {
            this._cache.set(username, null);
            return null;
          }

          const data = await res.json();
          const url =
            data && typeof data.avatar === "string" ? data.avatar : null;
          this._cache.set(username, url);
          return url;
        } catch (e) {
          this._cache.set(username, null);
          return null;
        } finally {
          this._pending.delete(username);
        }
      })();

      this._pending.set(username, promise);
      return promise;
    },

    _extractUsername(nameEl) {
      if (!nameEl) return "";
      return nameEl.textContent
        .replace(/§[0-9a-fk-or]/gi, "")
        .replace(/:$/, "")
        .trim();
    },

    _getStores() {
      try {
        const app = document.querySelector("#app").__vue_app__;
        const provides = app._context.provides;
        const sym = Object.getOwnPropertySymbols(provides).find(
          (s) => provides[s]._s,
        );
        return provides[sym]._s;
      } catch (e) {
        return null;
      }
    },

    _refreshUsername() {
      try {
        const stores = this._getStores();
        if (!stores) return;
        const userState = stores.get("userState");
        const user = userState && userState.user;
        if (!user) return;

        const name = user.name;
        if (name && typeof name === "string" && name.trim()) {
          this._myUsername = name.trim();
        }
      } catch (e) {}
    },

    _startUsernameWatcher() {
      if (this._usernameTick) return;
      this._refreshUsername();
      this._usernameTick = Ticker.add(() => {
        if (cfg("chat.enabled") && cfg("chat.highlightMentions")) {
          this._refreshUsername();
        }
      }, 3000);
    },

    _stopUsernameWatcher() {
      if (this._usernameTick) {
        Ticker.remove(this._usernameTick);
        this._usernameTick = null;
      }
    },

    _escapeRegex(str) {
      return String(str).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    },

    _messageMentionsMe(textEl) {
      if (!textEl) return false;
      if (!this._myUsername) return false;
      const text = textEl.textContent || "";
      if (!text) return false;

      const re = new RegExp(
        `(^|[^A-Za-z0-9_])${this._escapeRegex(this._myUsername)}([^A-Za-z0-9_]|$)`,
        "i",
      );
      return re.test(text);
    },

    _messageIsMine(nameEl) {
      if (!nameEl) return false;
      if (!this._myUsername) return false;
      const sender = this._extractUsername(nameEl);
      return sender.toLowerCase() === this._myUsername.toLowerCase();
    },

    _applyMentionHighlight(message) {
      if (!cfg("chat.enabled")) return;
      if (!cfg("chat.highlightMentions")) return;
      if (!message || !message.isConnected) return;
      if (message.dataset.csMentionChecked === "1") return;

      const nameEl = message.querySelector(":scope > .name");
      const textEl = message.querySelector(":scope > .text");
      if (!textEl) return;

      const isMine = nameEl ? this._messageIsMine(nameEl) : true;

      if (!isMine && this._messageMentionsMe(textEl)) {
        message.classList.add("cs-chat-mention");
        message.dataset.csMentionChecked = "1";
      } else {
        message.dataset.csMentionChecked = "1";
      }
    },

    _scanMentions() {
      if (!cfg("chat.enabled")) return;
      if (!cfg("chat.highlightMentions")) return;
      document
        .querySelectorAll(".chat .messages .message")
        .forEach((m) => this._applyMentionHighlight(m));
    },

    _clearMentions() {
      document.querySelectorAll(".cs-chat-mention").forEach((el) => {
        el.classList.remove("cs-chat-mention");
      });
      document
        .querySelectorAll(".chat .messages .message[data-cs-mention-checked]")
        .forEach((m) => {
          delete m.dataset.csMentionChecked;
        });
    },

    async _processMessage(message) {
      if (!cfg("chat.enabled")) return;
      if (!message || !message.isConnected) return;

      if (cfg("chat.avatars") && !message.dataset.csAvatar) {
        const nameEl = message.querySelector(":scope > .name");
        if (nameEl) {
          const username = this._extractUsername(nameEl);
          if (username) {
            message.dataset.csAvatar = "pending";
            const avatarUrl = await this._fetchAvatar(username);

            if (
              message.isConnected &&
              cfg("chat.enabled") &&
              cfg("chat.avatars")
            ) {
              if (avatarUrl) {
                const img = document.createElement("img");
                img.src = avatarUrl;
                img.alt = "";
                img.className = "cs-chat-avatar";
                img.draggable = false;
                img.loading = "lazy";
                img.decoding = "async";
                img.onerror = () => {
                  img.remove();
                  message.dataset.csAvatar = "error";
                };
                nameEl.parentNode.insertBefore(img, nameEl);
                message.dataset.csAvatar = "done";
              } else {
                message.dataset.csAvatar = "none";
              }
            }
          }
        }
      }

      if (cfg("chat.highlightMentions")) {
        this._applyMentionHighlight(message);
      }
    },

    _scanAvatars() {
      if (!cfg("chat.enabled")) return;
      if (!cfg("chat.avatars")) return;
      document
        .querySelectorAll(".chat .messages .message")
        .forEach((m) => this._processMessage(m));
    },

    _clearAvatars() {
      document.querySelectorAll(".cs-chat-avatar").forEach((el) => el.remove());
      document
        .querySelectorAll(".chat .messages .message[data-cs-avatar]")
        .forEach((m) => {
          delete m.dataset.csAvatar;
        });
    },

    _applyLongerChat() {
      const messages = document.querySelector(".messages");
      if (!messages) return;

      const want = cfg("chat.enabled") && cfg("chat.longer");
      const target = want ? "60vh" : "";

      if (messages.style.maxHeight !== target) {
        messages.style.maxHeight = target;
      }
    },

    _startLongChatWatcher() {
      if (this._longChatTick) return;
      this._longChatTick = Ticker.add(() => {
        if (!cfg("chat.enabled")) return;
        this._applyLongerChat();
      }, 250);
    },

    _stopLongChatWatcher() {
      if (this._longChatTick) {
        Ticker.remove(this._longChatTick);
        this._longChatTick = null;
      }
      const messages = document.querySelector(".messages");
      if (messages) messages.style.maxHeight = "";
    },

    init() {
      waitForBody(() => {
        this._injectStyles();
        this._startUsernameWatcher();

        this._observer = new MutationObserver((mutations) => {
          if (!cfg("chat.enabled")) return;
          for (const m of mutations) {
            if (m.type !== "childList") continue;
            for (const node of m.addedNodes) {
              if (node.nodeType !== Node.ELEMENT_NODE) continue;
              if (node.matches(".chat .messages .message")) {
                this._processMessage(node);
              }
              node
                .querySelectorAll(".chat .messages .message")
                .forEach((msg) => this._processMessage(msg));
            }
          }
        });

        this._observer.observe(document.body, {
          childList: true,
          subtree: true,
        });

        this._scanAvatars();
        this._scanMentions();
        this._startLongChatWatcher();
      });
    },

    apply() {
      const enabled = cfg("chat.enabled");

      if (enabled && cfg("chat.avatars")) {
        this._clearAvatars();
        this._scanAvatars();
      } else {
        this._clearAvatars();
      }

      if (enabled && cfg("chat.highlightMentions")) {
        this._scanMentions();
      } else {
        this._clearMentions();
      }

      if (enabled && cfg("chat.longer")) {
        this._applyLongerChat();
        this._startLongChatWatcher();
      } else {
        const messages = document.querySelector(".messages");
        if (messages) messages.style.maxHeight = "";
      }
    },

    destroy() {
      if (this._observer) {
        this._observer.disconnect();
        this._observer = null;
      }
      this._clearAvatars();
      this._clearMentions();
      this._cache.clear();
      this._pending.clear();
      this._stopLongChatWatcher();
      this._stopUsernameWatcher();
      this._myUsername = null;
      if (this._styleEl) {
        this._styleEl.remove();
        this._styleEl = null;
      }
    },

    _injectStyles() {
      if (this._styleEl) return;
      this._styleEl = document.createElement("style");
      this._styleEl.id = "__cs_chat_avatar_styles";
      this._styleEl.textContent = `
      .cs-chat-avatar {
        display: inline-block;
        vertical-align: middle;
        width: 1.2em;
        height: 1.2em;
        border-radius: 50%;
        margin-right: 4px;
        margin-top: -2px;
        object-fit: cover;
        background: rgba(255, 255, 255, 0.08);
        flex-shrink: 0;
      }

      .chat .messages .message.cs-chat-mention {
        border-left: 6px solid #ffd23f !important;
        padding-left: 6px !important;
      }
    `;
      document.head.appendChild(this._styleEl);
    },

    options: {
      render() {
        return `
        <div class="mod-description">
          Additional features for chat
        </div>

        <div class="settings-section-title">
          <span>General</span>
          <div></div>
        </div>

        <div class="setting-row">
          <label data-tip="Show avatar of player beside their username in chat">Player Avatars</label>
          ${optToggle("chat-avatars", cfg("chat.avatars"))}
        </div>

        <div class="setting-row">
          <label data-tip="">Longer Chat</label>
          ${optToggle("chat-longer", cfg("chat.longer"))}
        </div>

        <div class="setting-row">
          <label data-tip="Highlight a message when your username is mentioned">Highlight Mentions</label>
          ${optToggle("chat-highlight-mentions", cfg("chat.highlightMentions"))}
        </div>
      `;
      },

      bind() {
        const mod = MODS_BY_ID.get("chat");

        bindToggle("chat-avatars", "chat.avatars", () => mod.apply());
        bindToggle("chat-longer", "chat.longer", () => mod.apply());
        bindToggle("chat-highlight-mentions", "chat.highlightMentions", () => {
          mod._refreshUsername();
          mod.apply();
        });
      },
    },
  });

  registerMod({
    id: "waypoints",
    name: "Waypoints",
    category: ["utilities", "new"],
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-map-pin"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" /><path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0" /></svg>`,
    hasOptions: true,

    _canvas: null,
    _ctx: null,
    _tick: null,
    _lastVisible: null,
    _renderDirty: true,
    _notifyFn: null,

    init() {
      this._migrate();
      this._keyHandler = (e) => {
        if (!cfg("waypoints.enabled")) return;
        const code = cfg("waypoints.keybind");
        if (e.code !== code) return;
        if (e.repeat) return;

        const active = document.activeElement;
        if (
          active &&
          (active.tagName === "INPUT" ||
            active.tagName === "TEXTAREA" ||
            active.isContentEditable)
        ) {
          return;
        }

        e.preventDefault();
        e.stopPropagation();
        this._createWaypointHere();
      };

      document.addEventListener("keydown", this._keyHandler, true);

      waitForBody(() => {
        const canvas = document.createElement("canvas");
        canvas.id = "__cs_waypoint_canvas";
        canvas.style.cssText =
          "position:fixed;top:0;left:0;width:100vw;height:100vh;" +
          "pointer-events:none;z-index:99996;display:none;";
        document.body.appendChild(canvas);

        this._canvas = canvas;
        this._ctx = canvas.getContext("2d");

        const resize = () => {
          if (!this._canvas) return;
          const dpr = window.devicePixelRatio || 1;
          const w = window.innerWidth;
          const h = window.innerHeight;
          this._canvas.width = Math.round(w * dpr);
          this._canvas.height = Math.round(h * dpr);
          this._canvas.style.width = w + "px";
          this._canvas.style.height = h + "px";
          this._ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
          this._renderDirty = true;
        };
        resize();
        window.addEventListener("resize", resize);

        this._tick = Ticker.add(() => this._loop(), 0);
      });

      onCfgChange((key) => {
        if (key.startsWith("waypoints.")) this._renderDirty = true;
      });
    },

    apply() {
      this._renderDirty = true;
      if (!cfg("waypoints.enabled") && this._canvas) {
        this._ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        this._canvas.style.display = "none";
        this._lastVisible = false;
      }
    },

    destroy() {
      if (this._keyHandler) {
        document.removeEventListener("keydown", this._keyHandler, true);
        this._keyHandler = null;
      }
      if (this._tick) {
        Ticker.remove(this._tick);
        this._tick = null;
      }
      if (this._canvas) {
        this._canvas.remove();
        this._canvas = null;
      }
      this._ctx = null;
    },

    _list() {
      const raw = cfg("waypoints.list");
      return Array.isArray(raw) ? raw : [];
    },

    _saveList(list) {
      cfgSet("waypoints.list", list.slice());
      this._renderDirty = true;
    },

    _currentRoomKey() {
      try {
        const path = location.pathname.replace(/\/+$/, "");
        const params = new URLSearchParams(location.search);
        const room = params.get("roomId") || params.get("room") || "";
        return room ? `${path}?roomId=${room}` : path;
      } catch (e) {
        return "/";
      }
    },

    _migrate() {
      const list = this._list();
      let changed = false;
      for (const wp of list) {
        if (typeof wp.roomKey === "string" && wp.roomKey.startsWith("http")) {
          try {
            const u = new URL(wp.roomKey);
            const room =
              u.searchParams.get("roomId") || u.searchParams.get("room") || "";
            wp.roomKey = room
              ? `${u.pathname.replace(/\/+$/, "")}?roomId=${room}`
              : u.pathname.replace(/\/+$/, "");
            changed = true;
          } catch (e) {}
        }
      }
      if (changed) this._saveList(list);
    },

    _isVisibleHere(wp) {
      if (wp.global) return true;
      return wp.roomKey === this._currentRoomKey();
    },

    _visibleList() {
      return this._list().filter((w) => this._isVisibleHere(w));
    },

    _newId() {
      return (
        "wp_" +
        Date.now().toString(36) +
        "_" +
        Math.random().toString(36).slice(2, 7)
      );
    },

    _createWaypointHere() {
      const player = GameHooks.player;
      if (!player || !player.position) {
        this._notify("Waypoint can only be created in game");
        return;
      }

      const p = player.position;
      const list = this._list();
      const wp = {
        id: this._newId(),
        name: `Waypoint ${list.length + 1}`,
        color: cfg("waypoints.color") || "#7b2fe6",
        x: Math.round(p.x * 100) / 100,
        y: Math.round(p.y * 100) / 100,
        z: Math.round(p.z * 100) / 100,
        global: false,
        roomKey: this._currentRoomKey(),
        created: Date.now(),
      };

      list.push(wp);
      this._saveList(list);

      this._notify(`Waypoint "${wp.name}" created`);

      if (cfg("waypoints.autoOpenMenu")) {
        this._openMenuToWaypoints(wp.id);
      }
    },

    _openMenuToWaypoints(highlightId) {
      try {
        if (document.pointerLockElement) {
          document.exitPointerLock();
        }
        if (typeof window.__csToggleMenu !== "function") return;
        if (!window.__csIsMenuOpen || !window.__csIsMenuOpen()) {
          window.__csToggleMenu();
        }

        setTimeout(() => {
          try {
            if (typeof window.__csOpenOptions === "function") {
              window.__csOpenOptions("waypoints");
            }
          } catch (e) {}
        }, 60);
      } catch (e) {}
    },

    _resolveNotify() {
      if (this._notifyFn) return this._notifyFn;
      try {
        const app = document.querySelector("#app")?.__vue_app__;
        if (!app) return null;

        const fn =
          app.$notify ||
          app.config?.globalProperties?.$notify ||
          app._instance?.appContext?.config?.globalProperties?.$notify ||
          app._instance?.proxy?.$notify ||
          null;

        if (typeof fn === "function") {
          this._notifyFn = fn.bind(app);
          return this._notifyFn;
        }
      } catch (e) {}
      return null;
    },

    _notify(text) {
      const notify = this._resolveNotify();
      if (!notify) return;

      try {
        notify({ text, type: "info", duration: 3000 });
        return;
      } catch (e) {}

      try {
        notify({ text });
      } catch (e) {}
    },

    _loop() {
      const home = document.querySelector(".home");
      const shouldShow =
        !home &&
        cfg("waypoints.enabled") &&
        !window.__celestarCleared &&
        this._visibleList().length > 0;

      const canvas = this._canvas;
      const ctx = this._ctx;
      if (!canvas || !ctx) return;

      if (!shouldShow) {
        if (this._lastVisible !== false) {
          canvas.style.display = "none";
          ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
          this._lastVisible = false;
        }
        return;
      }

      if (this._lastVisible !== true) {
        canvas.style.display = "block";
        this._lastVisible = true;
      }

      const player = GameHooks.player;
      const camera =
        GameHooks.gameWorld && GameHooks.gameWorld.threeScene
          ? GameHooks.gameWorld.threeScene.camera
          : null;
      if (!player || !player.position || !camera) return;

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      const list = this._visibleList();
      const camPos = camera.position;
      const W = window.innerWidth;
      const H = window.innerHeight;
      const cx = W / 2;
      const cy = H / 2;

      const showMarker = cfg("waypoints.showMarker");
      const showEdge = cfg("waypoints.showEdge");
      const showDist = cfg("waypoints.showDistance");
      const showName = cfg("waypoints.showName");
      const scale = parseFloat(cfg("waypoints.markerScale")) || 1;

      let Vec3Ctor = null;
      try {
        Vec3Ctor = player.position.constructor;
      } catch (e) {}

      for (const wp of list) {
        const dx = wp.x - camPos.x;
        const dy = wp.y - camPos.y;
        const dz = wp.z - camPos.z;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        let screenX = null;
        let screenY = null;
        let inFront = false;

        if (Vec3Ctor) {
          const v = new Vec3Ctor(wp.x, wp.y, wp.z);

          let forwardX = 0;
          let forwardY = 0;
          let forwardZ = -1;
          if (camera.getWorldDirection) {
            const fwd = camera.getWorldDirection(new Vec3Ctor(0, 0, 0));
            forwardX = fwd.x;
            forwardY = fwd.y;
            forwardZ = fwd.z;
          }

          const dot = dx * forwardX + dy * forwardY + dz * forwardZ;
          inFront = dot > 0;

          if (inFront) {
            v.project(camera);
            screenX = (v.x * 0.5 + 0.5) * W;
            screenY = (1 - (v.y * 0.5 + 0.5)) * H;
          }
        }

        if (inFront && screenX !== null) {
          if (showMarker) {
            this._drawMarker(
              ctx,
              screenX,
              screenY,
              wp,
              dist,
              scale,
              showDist,
              showName,
            );
          }
        } else if (showEdge) {
          this._drawEdge(
            ctx,
            cx,
            cy,
            dx,
            dz,
            wp,
            dist,
            scale,
            showDist,
            showName,
            camera,
            Vec3Ctor,
          );
        }
      }
    },

    _hexToRgb(hex) {
      if (!/^#[0-9A-Fa-f]{6}$/.test(hex)) return { r: 123, g: 47, b: 230 };
      return {
        r: parseInt(hex.slice(1, 3), 16),
        g: parseInt(hex.slice(3, 5), 16),
        b: parseInt(hex.slice(5, 7), 16),
      };
    },

    _drawMarker(ctx, x, y, wp, dist, scale, showDist, showName) {
      const { r, g, b } = this._hexToRgb(wp.color);

      const size = 14 * scale;
      const pulse = 0.6 + 0.4 * Math.sin(performance.now() / 500);

      ctx.save();

      ctx.beginPath();
      ctx.moveTo(x, y - size);
      ctx.lineTo(x + size, y);
      ctx.lineTo(x, y + size);
      ctx.lineTo(x - size, y);
      ctx.closePath();

      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${0.25 * pulse})`;
      ctx.fill();

      ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${0.9 * pulse + 0.1})`;
      ctx.lineWidth = 2 * scale;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(x, y, 3 * scale, 0, Math.PI * 2);
      ctx.fillStyle = "#ffffff";
      ctx.fill();

      const parts = [];
      if (showDist) parts.push(`[${Math.round(dist)}m]`);
      if (showName && wp.name) parts.push(String(wp.name));

      if (parts.length) {
        const text = parts.join(" ");

        ctx.font = `600 ${12 * scale}px Inter, Arial, sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "top";

        const pad = 5 * scale;
        const w = ctx.measureText(text).width + pad * 2;
        const h = 16 * scale;
        const bx = x - w / 2;
        const by = y + size + 4 * scale;

        ctx.fillStyle = "rgba(0, 0, 0, 0.55)";
        ctx.fillRect(bx, by, w, h);

        if (showDist && showName && wp.name) {
          const distText = `[${Math.round(dist)}m]`;
          const nameText = String(wp.name);

          const distW = ctx.measureText(distText).width;
          const spaceW = ctx.measureText(" ").width;
          const nameW = ctx.measureText(nameText).width;
          const totalW = distW + spaceW + nameW;

          let tx = x - totalW / 2;

          ctx.textAlign = "left";
          ctx.fillStyle = "#ffffff";
          ctx.fillText(distText, tx, by + 2 * scale);
          tx += distW + spaceW;

          ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
          ctx.fillText(nameText, tx, by + 2 * scale);
        } else {
          ctx.fillStyle = showDist ? "#ffffff" : `rgb(${r}, ${g}, ${b})`;
          ctx.fillText(text, x, by + 2 * scale);
        }
      }

      ctx.restore();
    },

    _drawEdge(
      ctx,
      cx,
      cy,
      dx,
      dz,
      wp,
      dist,
      scale,
      showDist,
      showName,
      camera,
      Vec3Ctor,
    ) {
      const { r, g, b } = this._hexToRgb(wp.color);

      let fx = 0,
        fz = -1;
      if (camera && camera.getWorldDirection && Vec3Ctor) {
        try {
          const fwd = camera.getWorldDirection(new Vec3Ctor(0, 0, 0));
          fx = fwd.x;
          fz = fwd.z;
        } catch (e) {}
        const len = Math.hypot(fx, fz) || 1;
        fx /= len;
        fz /= len;
      }

      const wl = Math.hypot(dx, dz) || 1;
      const wx = dx / wl;
      const wz = dz / wl;

      const crossY = fx * wz - fz * wx;
      const dot = fx * wx + fz * wz;
      const bearing = Math.atan2(crossY, dot);

      const margin = 40 * scale;
      const halfW = window.innerWidth / 2 - margin;
      const halfH = window.innerHeight / 2 - margin;

      const sinB = Math.sin(bearing);
      const cosB = Math.cos(bearing);

      const horizontal =
        Math.abs(sinB) > 1e-4 ? halfW / Math.abs(sinB) : Infinity;
      const vertical =
        Math.abs(cosB) > 1e-4 ? halfH / Math.abs(cosB) : Infinity;
      const radius = Math.min(horizontal, vertical);

      const ex = cx + sinB * radius;
      const ey = cy - cosB * radius;

      ctx.save();
      ctx.translate(ex, ey);
      ctx.rotate(bearing);

      const s = 12 * scale;
      ctx.beginPath();
      ctx.moveTo(0, -s);
      ctx.lineTo(s * 0.75, s * 0.7);
      ctx.lineTo(0, s * 0.35);
      ctx.lineTo(-s * 0.75, s * 0.7);
      ctx.closePath();

      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.9)`;
      ctx.shadowColor = `rgba(${r}, ${g}, ${b}, 0.6)`;
      ctx.shadowBlur = 8 * scale;
      ctx.fill();
      ctx.restore();

      const parts = [];
      if (showDist) parts.push(`[${Math.round(dist)}m]`);
      if (showName && wp.name) parts.push(String(wp.name));

      if (parts.length) {
        const text = parts.join(" ");

        ctx.save();
        ctx.font = `600 ${12 * scale}px Inter, Arial, sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        const pad = 5 * scale;
        const w = ctx.measureText(text).width + pad * 2;
        const h = 16 * scale;
        const bx = ex - w / 2;
        const by = ey + 22 * scale;

        ctx.fillStyle = "rgba(0, 0, 0, 0.55)";
        ctx.fillRect(bx, by, w, h);

        if (showDist && showName && wp.name) {
          const distText = `[${Math.round(dist)}m]`;
          const nameText = String(wp.name);

          const distW = ctx.measureText(distText).width;
          const spaceW = ctx.measureText(" ").width;
          const nameW = ctx.measureText(nameText).width;
          const totalW = distW + spaceW + nameW;

          let tx = ex - totalW / 2;

          ctx.textAlign = "left";
          ctx.fillStyle = "#ffffff";
          ctx.fillText(distText, tx, by + h / 2);
          tx += distW + spaceW;

          ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
          ctx.fillText(nameText, tx, by + h / 2);
        } else {
          ctx.textAlign = "center";
          ctx.fillStyle = showDist ? "#ffffff" : `rgb(${r}, ${g}, ${b})`;
          ctx.fillText(text, ex, by + h / 2);
        }

        ctx.restore();
      }
    },

    _renderCard(wp) {
      const here = this._currentRoomKey();
      const visibleHere = wp.global || wp.roomKey === here;
      const roomLabel = wp.global
        ? "Global"
        : (() => {
            try {
              const raw = wp.roomKey || "";
              const parsed = raw.startsWith("http")
                ? new URL(raw)
                : new URL(raw, location.origin);

              const parts = parsed.pathname.split("/").filter(Boolean);
              const mode = parts[parts.length - 1] || "match";
              const room = parsed.searchParams.get("roomId") || "";
              return `${mode}${room ? " · " + room : ""}`;
            } catch (e) {
              return wp.roomKey || "unknown";
            }
          })();

      return `
        <div class="cs-waypoint-card cs-profile-card${
          visibleHere ? "" : " inactive"
        }" data-id="${wp.id}">
          <div class="cs-profile-header">
            <div class="cs-profile-dot" style="background:${escHtml(wp.color)};"></div>
            <div class="cs-profile-info">
              <div class="cs-profile-name">
                ${escHtml(wp.name)}
                ${
                  wp.global
                    ? `<span class="cs-profile-badge" style="background:var(--primary-1);">Global</span>`
                    : `<span class="cs-profile-badge" style="background:var(--grey-2);">Room</span>`
                }
              </div>
              <div class="cs-profile-meta">
                ${escHtml(roomLabel)} · X ${wp.x} Y ${wp.y} Z ${wp.z}
              </div>
            </div>
            <div class="cs-profile-actions">
              <button class="opt-btn wp-teleport-btn" title="Copy coords">Copy</button>
              <button class="opt-btn pencil-btn wp-edit-btn" title="Edit">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-edit"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415" /><path d="M16 5l3 3" /></svg>
              </button>
            </div>
          </div>

          <div class="cs-profile-editor" data-editor="${wp.id}">
            <div class="setting-row">
              <label>Name</label>
              <input
                type="text"
                id="wp-name-${wp.id}"
                class="cs-textbox"
                value="${escHtml(wp.name)}"
                style="width:160px;"
              >
            </div>

            <div class="setting-row">
              <label>Color</label>
              <div class="setting-inline">
                <input type="color" id="wp-color-${wp.id}" value="${escHtml(wp.color)}">
                <input type="text" id="wp-color-text-${wp.id}" class="cs-textbox" value="${escHtml(wp.color)}">
              </div>
            </div>

            <div class="setting-row">
              <label>Global</label>
              ${optToggle(`wp-global-${wp.id}`, !!wp.global)}
            </div>

            <div class="setting-row" style="justify-content:flex-end;">
              <button class="opt-btn wp-delete-btn" style="color:#e05252;border-color:#e05252;">
                Delete
              </button>
            </div>
          </div>
        </div>
      `;
    },

    _bindCard(card, wp) {
      const id = wp.id;
      const editor = card.querySelector(`[data-editor="${id}"]`);
      const editBtn = card.querySelector(".wp-edit-btn");
      const nameInput = card.querySelector(`#wp-name-${id}`);
      const colorInput = card.querySelector(`#wp-color-${id}`);
      const colorText = card.querySelector(`#wp-color-text-${id}`);
      const globalToggle = card.querySelector(`#wp-global-${id}`);
      const delBtn = card.querySelector(".wp-delete-btn");
      const copyBtn = card.querySelector(".wp-teleport-btn");

      const persist = (mutate) => {
        const list = this._list();
        const target = list.find((w) => w.id === id);
        if (!target) return;
        mutate(target);
        this._saveList(list);
      };

      if (editBtn && editor) {
        editBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          const isOpen = editor.classList.contains("open");
          document
            .querySelectorAll(".cs-waypoint-card .cs-profile-editor.open")
            .forEach((el) => el.classList.remove("open"));
          if (!isOpen) editor.classList.add("open");
        });
      }

      if (nameInput) {
        nameInput.addEventListener("input", () => {
          persist((t) => {
            t.name = nameInput.value.trim() || "Waypoint";
          });
          const nameEl = card.querySelector(".cs-profile-name");
          if (nameEl) {
            const badge = card.querySelector(
              ".cs-profile-name .cs-profile-badge",
            );
            const badgeHtml = badge ? badge.outerHTML : "";
            nameEl.innerHTML =
              escHtml(nameInput.value.trim() || "Waypoint") + badgeHtml;
          }
        });
      }

      const applyColor = (value) => {
        if (!/^#[0-9A-Fa-f]{6}$/.test(value)) return false;
        value = value.toLowerCase();
        colorInput.value = value;
        colorText.value = value;
        persist((t) => (t.color = value));
        const dot = card.querySelector(".cs-profile-dot");
        if (dot) dot.style.background = value;
        return true;
      };

      if (colorInput && colorText) {
        colorInput.addEventListener("input", () => {
          applyColor(colorInput.value);
        });
        colorText.addEventListener("change", () => {
          if (!applyColor(colorText.value.trim())) {
            colorText.value = cfg("waypoints.color") || "#7b2fe6";
          }
        });
        colorText.addEventListener("keydown", (e) => {
          if (e.key === "Enter") e.target.blur();
        });
      }

      if (globalToggle) {
        globalToggle.addEventListener("change", () => {
          persist((t) => (t.global = globalToggle.checked));
          const nameEl = card.querySelector(".cs-profile-name");
          if (nameEl) {
            const badge = card.querySelector(
              ".cs-profile-name .cs-profile-badge",
            );
            if (badge) {
              badge.textContent = globalToggle.checked ? "Global" : "Room";
              badge.style.background = globalToggle.checked
                ? "#23bd61"
                : "var(--grey-2)";
            }
          }
        });
      }

      if (delBtn) {
        delBtn.addEventListener("click", () => {
          if (!delBtn.dataset.armed) {
            delBtn.dataset.armed = "1";
            delBtn.textContent = "Confirm";
            delBtn.style.background = "#e05252";
            delBtn.style.color = "#fff";
            setTimeout(() => {
              delBtn.dataset.armed = "";
              delBtn.textContent = "Delete";
              delBtn.style.background = "";
              delBtn.style.color = "#e05252";
            }, 3000);
            return;
          }
          const list = this._list().filter((w) => w.id !== id);
          this._saveList(list);
          if (typeof window !== "undefined" && window.__csRefreshOptions) {
            window.__csRefreshOptions();
          }
        });
      }

      if (copyBtn) {
        copyBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          const text = `${wp.x} ${wp.y} ${wp.z}`;
          try {
            navigator.clipboard.writeText(text);
            copyBtn.textContent = "Copied";
            setTimeout(() => (copyBtn.textContent = "Copy"), 1400);
          } catch (err) {
            copyBtn.textContent = "Failed";
            setTimeout(() => (copyBtn.textContent = "Copy"), 1400);
          }
        });
      }
    },

    options: {
      render() {
        const mod = MODS_BY_ID.get("waypoints");
        const list = mod._list();
        const keybind = cfg("waypoints.keybind");
        const scale = parseFloat(cfg("waypoints.markerScale")) || 1;

        const cardsHtml = list.length
          ? list.map((wp) => mod._renderCard(wp)).join("")
          : `<div style="
                font-size:12px;
                color:var(--grey-2);
                text-align:center;
                padding:20px 12px;
                border:1px dashed var(--border-1);
                border-radius:8px;
              ">
                No waypoints yet. Press <b>${fmtKey(keybind)}</b> in-game to create one at your position.
              </div>`;

        return `
          <div class="mod-description">
            Save points of interest in the world
          </div>

          <div class="settings-section-title">
            <span>General</span>
            <div></div>
          </div>

          <div class="setting-row">
            <label>Keybind</label>
            <div class="keybind-box" id="wp-keybind">${fmtKey(keybind)}</div>
          </div>

          <div class="setting-row">
            <label data-tip="Automatically open the module settings when a waypoint is created">Open Menu On Create</label>
            ${optToggle("wp-auto-open", cfg("waypoints.autoOpenMenu"))}
          </div>

          <div class="settings-section-title">
            <span>Display</span>
            <div></div>
          </div>

          <div class="setting-row">
            <label data-tip="Show arrows when a waypoint marker goes off screen">Show Edge Arrows</label>
            ${optToggle("wp-show-edge", cfg("waypoints.showEdge"))}
          </div>

          <div class="setting-row">
            <label data-tip="Show name of waypoint on marker">Show Name</label>
            ${optToggle("wp-show-name", cfg("waypoints.showName"))}
          </div>

          <div class="setting-row">
            <label data-tip="Show distance from waypoint on marker">Show Distance</label>
            ${optToggle("wp-show-distance", cfg("waypoints.showDistance"))}
          </div>

          <div class="setting-row">
            <label>Show Marker</label>
            ${optToggle("wp-show-marker", cfg("waypoints.showMarker"))}
          </div>

          <div class="setting-row">
            <label>Marker Size</label>
            <div class="setting-inline">
              <input type="range" id="wp-scale" min="0.5" max="2" step="0.05" value="${scale}">
              <div class="range-val" id="wp-scale-val">${scale.toFixed(2)}x</div>
            </div>
          </div>

          <div class="settings-section-title">
            <span>Colors</span>
            <div></div>
          </div>

          <div class="setting-row">
            <label>Default New Waypoint</label>
            <div class="setting-inline">
              <input type="color" id="wp-default-color" value="${cfg("waypoints.color") || "#7b2fe6"}">
              <input type="text" id="wp-default-color-text" class="cs-textbox" value="${cfg("waypoints.color") || "#7b2fe6"}">
            </div>
          </div>

          <div class="settings-section-title">
            <span>Your Waypoints (${list.length})</span>
            <div></div>
          </div>

          <div id="__cs_waypoint_list" style="display:flex;flex-direction:column;gap:10px;">
            ${cardsHtml}
          </div>
        `;
      },

      bind() {
        const mod = MODS_BY_ID.get("waypoints");

        const kb = byId("wp-keybind");
        if (kb) bindKeybind(kb, "waypoints.keybind");

        bindToggle("wp-auto-open", "waypoints.autoOpenMenu");
        bindToggle("wp-show-marker", "waypoints.showMarker");
        bindToggle("wp-show-edge", "waypoints.showEdge");
        bindToggle("wp-show-name", "waypoints.showName");
        bindToggle("wp-show-distance", "waypoints.showDistance");

        bindSlider(
          "wp-scale",
          "wp-scale-val",
          "waypoints.markerScale",
          (v) => parseFloat(v).toFixed(2) + "x",
          parseFloat,
        );

        const defPicker = byId("wp-default-color");
        const defText = byId("wp-default-color-text");
        if (defPicker && defText) {
          const setDef = (v) => {
            if (!/^#[0-9A-Fa-f]{6}$/.test(v)) return;
            cfgSet("waypoints.color", v.toLowerCase());
            defPicker.value = v.toLowerCase();
            defText.value = v.toLowerCase();
          };
          defPicker.addEventListener("input", () => setDef(defPicker.value));
          defText.addEventListener("change", () =>
            setDef(defText.value.trim()),
          );
        }

        const list = mod._list();
        const cards = document.querySelectorAll(
          "#__cs_waypoint_list .cs-waypoint-card",
        );
        cards.forEach((card) => {
          const id = card.dataset.id;
          const wp = list.find((w) => w.id === id);
          if (wp) mod._bindCard(card, wp);
        });
      },
    },
  });

  registerMod({
    id: "invmanager",
    name: "Inventory Manager",
    category: ["utilities", "new"],
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-backpack"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 18v-6a6 6 0 0 1 6 -6h2a6 6 0 0 1 6 6v6a3 3 0 0 1 -3 3h-8a3 3 0 0 1 -3 -3" /><path d="M10 6v-1a2 2 0 1 1 4 0v1" /><path d="M9 21v-4a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v4" /><path d="M11 10h2" /></svg>`,
    hasOptions: true,

    _toolbar: null,
    _observer: null,
    _tick: null,
    _query: "",
    _catalog: null,
    _catalogBuilt: false,
    _sortOriginalOrder: null,

    _buildCatalog() {
      if (this._catalogBuilt && this._catalog) return this._catalog;
      try {
        const stores = GameHooks.stores;
        if (!stores) return null;
        const catalog = stores.get("inventoryState")?.items;
        if (!catalog || typeof catalog !== "object") return null;

        const map = Object.create(null);
        for (const id in catalog) {
          const entry = catalog[id];
          if (!entry || typeof entry !== "object") continue;
          const name = entry.name || entry.title || entry.displayName;
          if (name) {
            map[id] = {
              id: String(id),
              name: String(name).toLowerCase(),
              display: String(name),
              category: entry.category ?? 0,
            };
          }
        }
        if (Object.keys(map).length === 0) return null;
        this._catalog = map;
        this._catalogBuilt = true;
        return map;
      } catch (e) {
        return null;
      }
    },

    _extractID(el) {
      const img = el.querySelector("img");
      if (!img?.src) return null;
      const file = img.src.split("/").pop()?.split("?")[0] || "";
      const match = file.match(/^(\d+)/);
      return match ? match[1] : null;
    },

    _matches(el, query) {
      if (!query) return true;
      const id = this._extractID(el);
      if (!id) return false;
      if (id.includes(query)) return true;
      const catalog = this._catalog;
      if (catalog) {
        const entry = catalog[id];
        if (entry && entry.name.includes(query)) return true;
      }
      return false;
    },

    _findSlots() {
      const container = this._slotsContainer();
      if (!container) return [];
      return Array.from(container.children).filter((el) =>
        el.classList.contains("item"),
      );
    },

    _slotsContainer() {
      return document.querySelector(".backpack-items");
    },

    _isCreativeMenu() {
      const inv = document.querySelector(".items-manager");
      if (!inv) return false;
      return !!inv.querySelector(".creative-list-wrapper, .creative-list-cl");
    },

    _isInventoryOpen() {
      const inv = document.querySelector(".items-manager");
      if (!inv) return false;

      if (inv.style.visibility === "hidden") return false;
      if (inv.style.display === "none") return false;
      const cs = getComputedStyle(inv);
      if (cs.visibility === "hidden") return false;
      if (cs.display === "none") return false;
      if (this._isCreativeMenu()) return false;

      return true;
    },

    _buildToolbar() {
      const toolbar = document.createElement("div");
      toolbar.id = "__cs_inv_manager_toolbar";

      toolbar.style.cssText = `
      position: absolute;
      bottom: -65px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 20;
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px;
      box-sizing: border-box;
      width: auto;
      height: 57px;

      background: #6c3d14;
      border: 2px solid #140000;
      border-radius: 9px;
      box-shadow: 0 3px #00000040;

      font-family: 'Lilita One', sans-serif;
      pointer-events: auto;
    `;

      toolbar.innerHTML = `
      <div class="__cs_inv_tool_search">
        <input
          id="__cs_inv_search_input"
          type="text"
          placeholder="Search inventory…"
          autocomplete="off"
          spellcheck="false"
        >
      </div>

      <button
        type="button"
        id="__cs_inv_sort_btn"
        class="__cs_inv_toolbar_btn"
        title="Sort inventory"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="2"
             stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 6h13M3 12h9M3 18h5"/>
          <path d="M18 9l3 3-3 3"/>
          <path d="M21 12h-6"/>
        </svg>
        <span id="__cs_inv_sort_label">Sort</span>
      </button>
    `;

      return toolbar;
    },

    _injectToolbarStyles() {
      if (document.getElementById("__cs_inv_toolbar_styles")) return;
      const style = document.createElement("style");
      style.id = "__cs_inv_toolbar_styles";
      style.textContent = `
      #__cs_inv_manager_toolbar .__cs_inv_tool_search {
        flex: 1;
        display: flex;
        align-items: center;
        height: 39px;
        padding: 0 10px;
        box-sizing: border-box;

        background: #4f2b0e;
        border: 2px solid #140000;
        border-radius: 7px;
      }

      #__cs_inv_manager_toolbar .__cs_inv_tool_search input {
        flex: 1;
        min-width: 0;
        background: transparent;
        border: none;
        outline: none;
        color: #fff;
        font-family: 'Lilita One', sans-serif;
        font-size: 18px;
        padding: 0;
        text-shadow:
          1px 1px 0 #000,
          -1px 1px 0 #000,
          1px -1px 0 #000,
          -1px -1px 0 #000;
      }

      #__cs_inv_manager_toolbar .__cs_inv_tool_search input::placeholder {
        color: rgba(255, 255, 255, 0.6);
        text-shadow:
          1px 1px 0 #000,
          -1px 1px 0 #000,
          1px -1px 0 #000,
          -1px -1px 0 #000;
      }

      #__cs_inv_manager_toolbar .__cs_inv_toolbar_btn {
        display: flex;
        align-items: center;
        gap: 6px;
        height: 39px;
        padding: 0 12px;
        box-sizing: border-box;

        background: #8a4d1a;
        border: 2px solid #140000;
        border-radius: 7px;
        color: #fff;
        font-family: 'Lilita One', sans-serif;
        font-size: 18px;
        cursor: pointer;
        transition: transform 0.08s, background 0.12s;
        box-shadow: 0 2px #00000060;
        user-select: none;
        text-shadow:
          1px 1px 0 #000,
          -1px 1px 0 #000,
          1px -1px 0 #000,
          -1px -1px 0 #000;
      }

      #__cs_inv_manager_toolbar .__cs_inv_toolbar_btn:hover {
        background: #a25a1f;
      }

      #__cs_inv_manager_toolbar .__cs_inv_toolbar_btn:active {
        transform: translateY(1px);
        box-shadow: 0 1px #00000060;
      }

      #__cs_inv_manager_toolbar .__cs_inv_toolbar_btn.active {
        background: #23bd61;
        border-color: #0b3d20;
      }
    `;
      document.head.appendChild(style);
    },

    _cycleSort() {
      const modes = ["off", "name", "category", "id", "stack"];
      const current = cfg("invmanager.sortMode") || "off";
      const idx = modes.indexOf(current);
      const next = modes[(idx + 1) % modes.length];
      cfgSet("invmanager.sortMode", next);
      this._updateSortButton();
      this._applySort();
    },

    _updateSortButton() {
      if (!this._toolbar) return;
      const btn = this._toolbar.querySelector("#__cs_inv_sort_btn");
      const label = this._toolbar.querySelector("#__cs_inv_sort_label");
      if (!btn || !label) return;

      const mode = cfg("invmanager.sortMode") || "off";
      const labels = {
        off: "Sort",
        name: "Name",
        category: "Category",
        id: "ID",
        stack: "Stack",
      };
      label.textContent = labels[mode] || "Sort";
      btn.classList.toggle("active", mode !== "off");
    },

    _applySort() {
      const mode = cfg("invmanager.sortMode") || "off";
      const container = this._slotsContainer();
      if (!container) return;

      const slots = Array.from(container.children).filter((el) =>
        el.classList.contains("item"),
      );

      if (!this._sortOriginalOrder) {
        this._sortOriginalOrder = slots.slice();
      }

      if (mode === "off") {
        for (const el of this._sortOriginalOrder) {
          if (el.isConnected) container.appendChild(el);
        }
        return;
      }

      const getKey = (el) => {
        const id = this._extractID(el);
        const entry = id && this._catalog ? this._catalog[id] : null;

        if (!id) return "\uffff";

        switch (mode) {
          case "name":
            return entry ? entry.name : `\uffff${id}`;
          case "category":
            return entry ? String(entry.category).padStart(6, "0") : "999999";
          case "id":
            return String(id).padStart(6, "0");
          case "stack": {
            const q = el.querySelector(".item-labels .quantity");
            const n = q ? parseInt(q.textContent) || 0 : 0;
            return String(999999 - n).padStart(6, "0");
          }
          default:
            return "";
        }
      };

      slots.sort((a, b) => {
        const ka = getKey(a);
        const kb = getKey(b);
        return ka < kb ? -1 : ka > kb ? 1 : 0;
      });

      for (const el of slots) container.appendChild(el);
    },

    _applyFilter() {
      const q = this._query.trim().toLowerCase();
      const slots = this._findSlots();

      if (!q) {
        slots.forEach((el) => {
          el.style.removeProperty("opacity");
          el.style.removeProperty("filter");
          el.style.removeProperty("outline");
          el.style.removeProperty("outline-offset");
        });
        return;
      }

      slots.forEach((el) => {
        if (this._matches(el, q)) {
          el.style.removeProperty("opacity");
          el.style.removeProperty("filter");
          el.style.removeProperty("outline");
          el.style.removeProperty("outline-offset");
        } else {
          el.style.opacity = "0.2";
          el.style.filter = "grayscale(1)";
          el.style.removeProperty("outline");
          el.style.removeProperty("outline-offset");
        }
      });
    },

    _mount() {
      if (!this._isInventoryOpen()) return;

      const backpack = document.querySelector(".backpack");
      if (!backpack) return;

      const backpackCS = getComputedStyle(backpack);
      if (backpackCS.position === "static") {
        backpack.style.position = "relative";
        backpack.dataset.csPosSet = "1";
      }

      this._buildCatalog();
      this._injectToolbarStyles();

      const showSearch = cfg("invmanager.searchEnabled");
      const showSort = cfg("invmanager.sortEnabled");

      if ((showSearch || showSort) && !this._toolbar?.isConnected) {
        const toolbar = this._buildToolbar();
        backpack.appendChild(toolbar);
        this._toolbar = toolbar;

        if (!showSearch) {
          const search = toolbar.querySelector(".__cs_inv_tool_search");
          if (search) search.style.display = "none";
        }
        if (!showSort) {
          const sortBtn = toolbar.querySelector("#__cs_inv_sort_btn");
          if (sortBtn) sortBtn.style.display = "none";
        }

        if (showSearch) {
          const input = toolbar.querySelector("#__cs_inv_search_input");
          if (input) {
            input.value = this._query;
            input.addEventListener("input", () => {
              this._query = input.value;
              this._applyFilter();
            });
            input.addEventListener("keydown", (e) => {
              e.stopPropagation();
              if (e.key === "Escape") {
                input.value = "";
                this._query = "";
                this._applyFilter();
                input.blur();
              }
            });
          }
        }

        if (showSort) {
          const sortBtn = toolbar.querySelector("#__cs_inv_sort_btn");
          if (sortBtn) {
            sortBtn.addEventListener("click", (e) => {
              e.preventDefault();
              e.stopPropagation();
              this._cycleSort();
            });
          }
          this._updateSortButton();
          this._applySort();
        }

        toolbar.style.opacity = "0";
        requestAnimationFrame(() => {
          toolbar.style.opacity = "1";
        });

        if (this._query) this._applyFilter();
      }
    },

    _unmount() {
      if (this._toolbar) {
        const tb = this._toolbar;
        this._toolbar = null;
        tb.remove();
      }

      document.querySelectorAll(".backpack-items .item").forEach((el) => {
        el.style.removeProperty("opacity");
        el.style.removeProperty("filter");
        el.style.removeProperty("outline");
        el.style.removeProperty("outline-offset");
      });

      const backpack = document.querySelector(".backpack");
      if (backpack && backpack.dataset.csPosSet === "1") {
        backpack.style.removeProperty("position");
        delete backpack.dataset.csPosSet;
      }
    },

    init() {
      waitForBody(() => {
        this._buildCatalog();

        this._observer = new MutationObserver(() => {
          if (!cfg("invmanager.enabled")) {
            if (this._toolbar) this._unmount();
            return;
          }
          const open = this._isInventoryOpen();
          if (open && !this._toolbar) this._mount();
          else if (!open && this._toolbar) this._unmount();
        });

        this._observer.observe(document.body, {
          childList: true,
          subtree: true,
          attributes: true,
          attributeFilter: ["style", "class"],
        });

        if (this._isInventoryOpen()) this._mount();

        this._tick = Ticker.add(() => {
          if (!cfg("invmanager.enabled")) {
            if (this._toolbar) this._unmount();
            return;
          }
          if (!this._catalogBuilt) this._buildCatalog();

          const open = this._isInventoryOpen();
          if (open && !this._toolbar) this._mount();
          else if (!open && this._toolbar) this._unmount();
        }, 250);
      });
    },

    apply() {
      if (!cfg("invmanager.enabled")) {
        this._unmount();
        return;
      }
      if (this._toolbar) this._unmount();
      if (this._isInventoryOpen()) this._mount();
    },

    destroy() {
      if (this._observer) {
        this._observer.disconnect();
        this._observer = null;
      }
      if (this._tick) {
        Ticker.remove(this._tick);
        this._tick = null;
      }
      this._unmount();
      this._catalog = null;
      this._catalogBuilt = false;
      this._sortOriginalOrder = null;
    },

    options: {
      render() {
        return `
        <div class="mod-description">
          Search and sort items in the inventory
        </div>

        <div class="settings-section-title">
          <span>Tools</span>
          <div></div>
        </div>

        <div class="setting-row">
          <label data-tip="Show a search bar in the inventory toolbar">Search Bar</label>
          ${optToggle("inv-search-enabled", cfg("invmanager.searchEnabled"))}
        </div>

        <div class="setting-row">
          <label data-tip="Show the sort button in the inventory toolbar">Sort Button</label>
          ${optToggle("inv-sort-enabled", cfg("invmanager.sortEnabled"))}
        </div>
      `;
      },

      bind() {
        const mod = MODS_BY_ID.get("invmanager");

        bindToggle("inv-search-enabled", "invmanager.searchEnabled", () =>
          mod.apply(),
        );
        bindToggle("inv-sort-enabled", "invmanager.sortEnabled", () =>
          mod.apply(),
        );
      },
    },
  });
  registerMod({
    id: "itemtooltip",
    name: "Item Tooltip",
    category: ["utilities", "new"],
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-tag"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M6.5 7.5a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M3 6v5.172a2 2 0 0 0 .586 1.414l7.71 7.71a2.41 2.41 0 0 0 3.408 0l5.592 -5.592a2.41 2.41 0 0 0 0 -3.408l-7.71 -7.71a2 2 0 0 0 -1.414 -.586h-5.172a3 3 0 0 0 -3 3" /></svg>`,
    hasOptions: true,

    _tooltip: null,
    _catalog: null,
    _catalogBuilt: false,
    _hoveredSlot: null,
    _overHandler: null,
    _moveHandler: null,
    _leaveHandler: null,
    _blurHandler: null,

    _buildCatalog() {
      if (this._catalogBuilt && this._catalog) return this._catalog;
      try {
        const stores = GameHooks.stores;
        if (!stores) return null;
        const catalog = stores.get("inventoryState")?.items;
        if (!catalog || typeof catalog !== "object") return null;

        const map = Object.create(null);
        for (const id in catalog) {
          const entry = catalog[id];
          if (!entry || typeof entry !== "object") continue;
          const name = entry.name || entry.title || entry.displayName;
          if (name) {
            map[id] = {
              id: String(id),
              name: String(name).toLowerCase(),
              display: String(name),
              category: entry.category ?? 0,
              itemType: entry.itemType ?? 0,
              damage: entry.damage ?? null,
              foodPoints: entry.foodPoints ?? null,
              energyValue: entry.energyValue ?? null,
              stack: entry.stack ?? null,
              rarity: entry.rarity ?? null,
            };
          }
        }
        if (Object.keys(map).length === 0) return null;

        this._catalog = map;
        this._catalogBuilt = true;
        return map;
      } catch (e) {
        return null;
      }
    },

    _extractID(el) {
      const idEl = el.querySelector(".id");
      if (idEl?.textContent) {
        const txt = idEl.textContent.trim();
        if (/^\d+$/.test(txt)) return txt;
      }

      const img = el.querySelector("img");
      if (!img?.src) return null;
      const file = img.src.split("/").pop()?.split("?")[0] || "";
      const match = file.match(/^(\d+)/);
      return match ? match[1] : null;
    },

    _findSlot(target) {
      let el = target;
      while (el && el !== document.body) {
        if (el.classList?.contains("item")) return el;
        el = el.parentElement;
      }
      return null;
    },

    _ensureTooltip() {
      if (this._tooltip && this._tooltip.isConnected) return this._tooltip;
      const tt = document.createElement("div");
      tt.id = "__cs_item_tooltip";
      document.body.appendChild(tt);
      this._tooltip = tt;
      return tt;
    },

    _injectStyles() {
      if (document.getElementById("__cs_item_tooltip_styles")) return;
      const style = document.createElement("style");
      style.id = "__cs_item_tooltip_styles";
      style.textContent = `
      #__cs_item_tooltip {
        position: fixed;
        z-index: 2147483647;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.1s ease;

        min-width: 160px;
        max-width: 260px;
        padding: 10px 12px;
        box-sizing: border-box;

        background: #6c3d14;
        border: 2px solid #140000;
        border-radius: 9px;
        box-shadow: 0 3px #00000040;

        font-family: 'Lilita One', sans-serif;
        color: #fff;
        font-size: 15px;
        line-height: 1.4;
        text-shadow:
          1px 1px 0 #000,
          -1px 1px 0 #000,
          1px -1px 0 #000,
          -1px -1px 0 #000;
      }

      #__cs_item_tooltip.show { opacity: 1; }

      #__cs_item_tooltip .cs-tt-name {
        font-size: 17px;
        font-weight: 700;
        margin-bottom: 6px;
        color: #fff;
        text-shadow:
          0px 2px 0 #000,
          -1px 1px 0 #000,
          1px -1px 0 #000,
          -1px -1px 0 #000;
      }

      #__cs_item_tooltip .cs-tt-row {
        display: flex;
        justify-content: space-between;
        gap: 12px;
        font-size: 14px;
      }

      #__cs_item_tooltip .cs-tt-row + .cs-tt-row { margin-top: 2px; }

      #__cs_item_tooltip .cs-tt-label {
        color: #f4e6d2;
        opacity: 0.9;
      }

      #__cs_item_tooltip .cs-tt-value {
        color: #fff;
        font-weight: 700;
      }

      #__cs_item_tooltip .cs-tt-value.good { color: #7ddf8b; }
      #__cs_item_tooltip .cs-tt-value.warn { color: #ffd23f; }
      #__cs_item_tooltip .cs-tt-value.bad  { color: #ff8a8a; }

      #__cs_item_tooltip .cs-tt-sep {
        height: 2px;
        background: #140000;
        opacity: 0.4;
        margin: 6px 0;
        border-radius: 1px;
      }

      #__cs_item_tooltip .cs-tt-id {
        font-size: 11px;
        color: rgba(255, 255, 255, 0.7);
        text-align: right;
        margin-top: 6px;
        text-shadow:
          1px 1px 0 #000,
          -1px 1px 0 #000,
          1px -1px 0 #000,
          -1px -1px 0 #000;
      }
    `;
      document.head.appendChild(style);
    },

    _categoryLabel(categoryId) {
      const CATEGORY_NAMES = {
        24: "Plant",
        575: "Decoration",
        840: "Functional",
        852: "Tool",
        863: "Food",
        882: "Armor",
        887: "Item",
        934: "Block",
      };
      return CATEGORY_NAMES[categoryId] || null;
    },

    _rarityName(rarity) {
      const names = ["Common", "Rare", "Epic", "Legendary"];
      return names[rarity] || `Rarity ${rarity}`;
    },

    _buildTooltipHTML(entry, quantity) {
      const rows = [];

      const catLabel = this._categoryLabel(entry.category);
      if (catLabel) {
        rows.push(`
        <div class="cs-tt-row">
          <span class="cs-tt-label">Type</span>
          <span class="cs-tt-value">${escHtml(catLabel)}</span>
        </div>
      `);
      }

      if (entry.damage != null) {
        rows.push(`
        <div class="cs-tt-row">
          <span class="cs-tt-label">Damage</span>
          <span class="cs-tt-value">${entry.damage}</span>
        </div>
      `);
      }

      if (entry.foodPoints != null) {
        rows.push(`
        <div class="cs-tt-row">
          <span class="cs-tt-label">Hunger</span>
          <span class="cs-tt-value good">+${entry.foodPoints}</span>
        </div>
      `);
      }

      if (entry.energyValue != null) {
        rows.push(`
        <div class="cs-tt-row">
          <span class="cs-tt-label">Fuel</span>
          <span class="cs-tt-value warn">${entry.energyValue}</span>
        </div>
      `);
      }

      if (entry.rarity != null && entry.rarity > 0) {
        const rarityClass = entry.rarity >= 3 ? "warn" : "good";
        rows.push(`
        <div class="cs-tt-row">
          <span class="cs-tt-label">Rarity</span>
          <span class="cs-tt-value ${rarityClass}">${this._rarityName(entry.rarity)}</span>
        </div>
      `);
      }

      const sep = rows.length ? `<div class="cs-tt-sep"></div>` : "";

      return `
      <div class="cs-tt-name">${escHtml(entry.display)}</div>
      ${sep}
      ${rows.join("")}
      <div class="cs-tt-id">ID ${escHtml(entry.id)}</div>
    `;
    },

    _showTooltip(slotEl, e) {
      if (!cfg("itemtooltip.enabled")) return;
      this._buildCatalog();

      const id = this._extractID(slotEl);
      if (!id) return;
      const entry = this._catalog ? this._catalog[id] : null;
      if (!entry) return;

      const q = slotEl.querySelector(".item-labels .quantity");
      const quantity = q ? parseInt(q.textContent) || 0 : 1;

      const tt = this._ensureTooltip();
      tt.innerHTML = this._buildTooltipHTML(entry, quantity);
      tt.classList.add("show");

      this._positionTooltip(tt, e);
    },

    _positionTooltip(tt, e) {
      const rect = tt.getBoundingClientRect();
      const margin = 14;

      let x = e.clientX + margin;
      let y = e.clientY + margin;

      if (x + rect.width > window.innerWidth - 8) {
        x = e.clientX - rect.width - margin;
      }
      if (y + rect.height > window.innerHeight - 8) {
        y = e.clientY - rect.height - margin;
      }

      x = Math.max(8, Math.min(x, window.innerWidth - rect.width - 8));
      y = Math.max(8, Math.min(y, window.innerHeight - rect.height - 8));

      tt.style.left = x + "px";
      tt.style.top = y + "px";
    },

    _hideTooltip() {
      if (this._tooltip) this._tooltip.classList.remove("show");
    },

    _bind() {
      this._unbind();
      this._hoveredSlot = null;

      this._overHandler = (e) => {
        if (!cfg("itemtooltip.enabled")) return;
        const slot = this._findSlot(e.target);
        if (!slot) {
          if (this._hoveredSlot) {
            this._hoveredSlot = null;
            this._hideTooltip();
          }
          return;
        }
        if (this._hoveredSlot === slot) return;
        this._hoveredSlot = slot;
        this._showTooltip(slot, e);
      };

      this._moveHandler = (e) => {
        if (!this._hoveredSlot) return;
        if (this._tooltip && this._tooltip.classList.contains("show")) {
          this._positionTooltip(this._tooltip, e);
        }
      };

      this._leaveHandler = (e) => {
        const slot = this._findSlot(e.target);
        if (!slot) return;
        if (this._hoveredSlot !== slot) return;
        this._hoveredSlot = null;
        this._hideTooltip();
      };

      this._blurHandler = () => {
        this._hoveredSlot = null;
        this._hideTooltip();
      };

      document.addEventListener("mouseover", this._overHandler, true);
      document.addEventListener("mousemove", this._moveHandler, true);
      document.addEventListener("mouseout", this._leaveHandler, true);
      document.addEventListener("scroll", this._blurHandler, true);
      document.addEventListener("mousedown", this._blurHandler, true);
      document.addEventListener("wheel", this._blurHandler, true);
    },

    _unbind() {
      if (this._overHandler) {
        document.removeEventListener("mouseover", this._overHandler, true);
        this._overHandler = null;
      }
      if (this._moveHandler) {
        document.removeEventListener("mousemove", this._moveHandler, true);
        this._moveHandler = null;
      }
      if (this._leaveHandler) {
        document.removeEventListener("mouseout", this._leaveHandler, true);
        this._leaveHandler = null;
      }
      if (this._blurHandler) {
        document.removeEventListener("scroll", this._blurHandler, true);
        document.removeEventListener("mousedown", this._blurHandler, true);
        document.removeEventListener("wheel", this._blurHandler, true);
        this._blurHandler = null;
      }
      this._hoveredSlot = null;
      this._hideTooltip();
    },

    init() {
      waitForBody(() => {
        this._buildCatalog();
        this._injectStyles();
        this._ensureTooltip();
        this._bind();
      });
    },

    apply() {
      if (!cfg("itemtooltip.enabled")) {
        this._unbind();
        this._hideTooltip();
      } else {
        this._buildCatalog();
        this._injectStyles();
        this._ensureTooltip();
        this._bind();
      }
    },

    destroy() {
      this._unbind();
      if (this._tooltip) {
        this._tooltip.remove();
        this._tooltip = null;
      }
      this._catalog = null;
      this._catalogBuilt = false;
    },

    options: {
      render() {
        return `
        <div class="mod-description">
          Shows detailed item information when hovering any item
        </div>
      `;
      },
      bind() {},
    },
  });

  registerMod({
    id: "creativesearch",
    name: "Creative Search",
    category: ["utilities", "new"],
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-search"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 10a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" /><path d="M21 21l-6 -6" /></svg>`,
    hasOptions: true,

    _bar: null,
    _observer: null,
    _tick: null,
    _query: "",
    _catalog: null,
    _catalogBuilt: false,
    _originalOrder: null,
    _lastItemCount: null,
    _lastCategoryKey: null,

    _buildCatalog() {
      if (this._catalogBuilt && this._catalog) return this._catalog;
      try {
        const stores = GameHooks.stores;
        if (!stores) return null;
        const catalog = stores.get("inventoryState")?.items;
        if (!catalog || typeof catalog !== "object") return null;

        const map = Object.create(null);
        for (const id in catalog) {
          const entry = catalog[id];
          if (!entry || typeof entry !== "object") continue;
          const name = entry.name || entry.title || entry.displayName;
          if (name) {
            map[id] = {
              id: String(id),
              name: String(name).toLowerCase(),
              display: String(name),
            };
          }
        }
        if (Object.keys(map).length === 0) return null;

        this._catalog = map;
        this._catalogBuilt = true;
        return map;
      } catch (e) {
        return null;
      }
    },

    _extractID(el) {
      const idEl = el.querySelector(".id");
      if (idEl?.textContent) {
        const txt = idEl.textContent.trim();
        if (txt) return txt;
      }

      const img = el.querySelector("img");
      if (!img?.src) return null;
      const file = img.src.split("/").pop()?.split("?")[0] || "";
      const match = file.match(/^(\d+)/);
      return match ? match[1] : null;
    },

    _findItems(list) {
      return Array.from(list.children).filter((el) => {
        if (!el.classList.contains("item")) return false;
        const cs = getComputedStyle(el);
        if (cs.display === "none") return false;
        if (cs.visibility === "hidden") return false;
        if (el.dataset.csHidden === "1") return false;
        return true;
      });
    },

    _allItems(list) {
      return Array.from(list.children).filter((el) =>
        el.classList.contains("item"),
      );
    },

    _isCreativeMenu() {
      const inv = document.querySelector(".items-manager");
      if (!inv) return false;
      return !!inv.querySelector(".creative-list-wrapper, .creative-list-cl");
    },

    _isCreativeOpen() {
      const inv = document.querySelector(".items-manager");
      if (!inv) return false;
      if (!this._isCreativeMenu()) return false;

      if (inv.style.visibility === "hidden") return false;
      if (inv.style.display === "none") return false;
      const cs = getComputedStyle(inv);
      if (cs.visibility === "hidden") return false;
      if (cs.display === "none") return false;

      if (!inv.querySelector(".creative-list")) return false;

      return true;
    },

    _buildBar() {
      const bar = document.createElement("div");
      bar.id = "__cs_creative_search_bar";

      bar.style.cssText = `
      position: sticky;
      top: 0;
      z-index: 30;
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px;
      box-sizing: border-box;
      width: 100%;
      background: transparent;
      font-family: 'Lilita One', sans-serif;
      pointer-events: auto;
    `;

      bar.innerHTML = `
      <div class="__cs_creative_search_input_wrap">
        <input
          id="__cs_creative_search_input"
          type="text"
          placeholder="Search items…"
          autocomplete="off"
          spellcheck="false"
        >
      </div>
    `;

      return bar;
    },

    _injectStyles() {
      if (document.getElementById("__cs_creative_search_styles")) return;
      const style = document.createElement("style");
      style.id = "__cs_creative_search_styles";
      style.textContent = `
      #__cs_creative_search_bar .__cs_creative_search_input_wrap {
        flex: 1;
        display: flex;
        align-items: center;
        height: 39px;
        padding: 0 10px;
        box-sizing: border-box;
        background: #4f2b0e;
        border: 2px solid #140000;
        border-radius: 7px;
      }

      #__cs_creative_search_bar .__cs_creative_search_input_wrap input {
        flex: 1;
        min-width: 0;
        background: transparent;
        border: none;
        outline: none;
        color: #fff;
        font-family: 'Lilita One', sans-serif;
        font-size: 18px;
        padding: 0;
        text-shadow:
          1px 1px 0 #000,
          -1px 1px 0 #000,
          1px -1px 0 #000,
          -1px -1px 0 #000;
      }

      #__cs_creative_search_bar .__cs_creative_search_input_wrap input::placeholder {
        color: rgba(255, 255, 255, 0.6);
        text-shadow:
          1px 1px 0 #000,
          -1px 1px 0 #000,
          1px -1px 0 #000,
          -1px -1px 0 #000;
      }
    `;
      document.head.appendChild(style);
    },

    _matches(el, query) {
      if (!query) return true;

      const id = this._extractID(el);
      if (!id) return false;
      if (id.includes(query)) return true;

      const catalog = this._catalog;
      if (catalog) {
        const entry = catalog[id];
        if (entry && entry.name.includes(query)) return true;
      }

      const title = (
        el.getAttribute("title") ||
        el.getAttribute("alt") ||
        ""
      ).toLowerCase();
      if (title && title.includes(query)) return true;

      return false;
    },

    _getListFingerprint(list) {
      const items = this._allItems(list);
      if (items.length === 0) return "empty";
      const parts = items.map((el) => {
        const id = this._extractID(el) || "?";
        const img = el.querySelector("img");
        const src = img?.getAttribute("src") || "";
        const file = src.split("/").pop()?.split("?")[0] || "";
        return id + "|" + file;
      });
      return items.length + ":" + parts.join(",");
    },

    _applySearch() {
      const list = document.querySelector(".creative-list");
      if (!list) return;

      this._allItems(list).forEach((el) => {
        el.style.removeProperty("opacity");
        el.style.removeProperty("filter");
        el.style.removeProperty("outline");
        el.style.removeProperty("outline-offset");
        el.style.removeProperty("order");
        delete el.dataset.csHidden;
      });

      const q = this._query.trim().toLowerCase();
      if (!q) return;

      const items = this._findItems(list);
      for (const el of items) {
        if (this._matches(el, q)) {
          el.style.outlineOffset = "2px";
        } else {
          el.style.opacity = "0.2";
          el.style.filter = "grayscale(1)";
        }
      }

      list.scrollTop = 0;
    },

    _clearSearch() {
      this._query = "";
      if (this._bar) {
        const input = this._bar.querySelector("#__cs_creative_search_input");
        if (input) input.value = "";
      }
      this._applySearch();
    },

    _mount() {
      if (!this._isCreativeOpen()) return;

      const list = document.querySelector(".creative-list");
      if (!list) return;
      if (this._bar?.isConnected) return;

      this._buildCatalog();
      this._injectStyles();

      const listCS = getComputedStyle(list);
      if (listCS.position === "static") {
        list.style.position = "relative";
        list.dataset.csPosSet = "1";
      }

      const bar = this._buildBar();
      list.insertBefore(bar, list.firstChild);
      this._bar = bar;

      this._lastCategoryKey = this._getListFingerprint(list);

      const input = bar.querySelector("#__cs_creative_search_input");
      input.value = this._query;

      input.addEventListener("input", () => {
        this._query = input.value;
        this._applySearch();
      });

      input.addEventListener("keydown", (e) => {
        e.stopPropagation();
        if (e.key === "Escape") {
          input.value = "";
          this._query = "";
          this._applySearch();
          input.blur();
        }
      });

      if (this._query) this._applySearch();
    },

    _unmount() {
      if (this._bar) {
        const b = this._bar;
        this._bar = null;
        b.remove();
      }

      const list = document.querySelector(".creative-list");
      if (list) {
        this._allItems(list).forEach((el) => {
          el.style.removeProperty("opacity");
          el.style.removeProperty("filter");
          el.style.removeProperty("outline");
          el.style.removeProperty("outline-offset");
          el.style.removeProperty("order");
          delete el.dataset.csHidden;
        });
      }

      if (list && list.dataset.csPosSet === "1") {
        list.style.removeProperty("position");
        delete list.dataset.csPosSet;
      }

      this._lastCategoryKey = null;
    },

    init() {
      waitForBody(() => {
        this._buildCatalog();

        const check = () => {
          if (!cfg("creativesearch.enabled")) {
            if (this._bar) this._unmount();
            return;
          }
          if (!this._catalogBuilt) this._buildCatalog();

          const open = this._isCreativeOpen();
          if (open && !this._bar) {
            this._mount();
          } else if (!open && this._bar) {
            this._unmount();
            return;
          }

          if (open && this._bar) {
            const list = document.querySelector(".creative-list");
            if (list) {
              const fp = this._getListFingerprint(list);
              if (this._lastCategoryKey !== fp) {
                this._lastCategoryKey = fp;
                this._clearSearch();
              }
            }
          }
        };

        this._observer = new MutationObserver(check);

        this._observer.observe(document.body, {
          childList: true,
          subtree: true,
          attributes: true,
          attributeFilter: ["style", "class"],
        });

        if (this._isCreativeOpen()) this._mount();

        this._tick = setInterval(check, 250);
      });
    },

    apply() {
      if (!cfg("creativesearch.enabled")) {
        this._unmount();
        return;
      }
      if (this._bar) this._unmount();
      if (this._isCreativeOpen()) this._mount();
    },

    destroy() {
      if (this._observer) {
        this._observer.disconnect();
        this._observer = null;
      }
      if (this._tick) {
        clearInterval(this._tick);
        this._tick = null;
      }
      this._unmount();
      this._catalog = null;
      this._catalogBuilt = false;
      this._originalOrder = null;
      this._lastItemCount = null;
      this._lastCategoryKey = null;
    },

    options: {
      render() {
        return `
        <div class="mod-description">
          Adds a search bar to the top of the creative menu
        </div>
      `;
      },
      bind() {},
    },
  });

  registerMod({
    id: "friendnotify",
    name: "Friend Notifs",
    category: ["utilities", "new"],
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-users"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 7a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" /><path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /><path d="M21 21v-2a4 4 0 0 0 -3 -3.85" /></svg>`,
    hasOptions: true,

    _tick: null,
    _lastSeen: new Map(),
    _notifyFn: null,

    _stores() {
      try {
        return GameHooks.stores;
      } catch (e) {
        return null;
      }
    },

    _friends() {
      try {
        return this._stores()?.get("friends") || null;
      } catch (e) {
        return null;
      }
    },

    _raw(v) {
      return v?.__v_raw || v;
    },

    _resolveNotify() {
      if (this._notifyFn) return this._notifyFn;
      try {
        const app = document.querySelector("#app")?.__vue_app__;
        if (!app) return null;

        const fn =
          app.$notify ||
          app.config?.globalProperties?.$notify ||
          app._instance?.appContext?.config?.globalProperties?.$notify ||
          app._instance?.proxy?.$notify ||
          null;

        if (typeof fn === "function") {
          this._notifyFn = fn.bind(app);
          return this._notifyFn;
        }
      } catch (e) {}
      return null;
    },

    _myRoomIds() {
      const ids = new Set();
      try {
        const stores = this._stores();
        if (!stores) return ids;

        const room = stores.get("roomState");
        const lobby = stores.get("lobbyManager");

        if (room?.visibilityRoomId) ids.add(String(room.visibilityRoomId));
        if (room?.roomLink) ids.add(String(room.roomLink));
        if (lobby?.myIdInLobby) ids.add(String(lobby.myIdInLobby));

        return ids;
      } catch (e) {
        return ids;
      }
    },

    _friendRoomIds(f) {
      const ids = new Set();
      const details = this._raw(f?.currentLobbyDetails);
      if (!details) return ids;

      if (details.gameId) ids.add(String(details.gameId));
      if (details.lobbyId) ids.add(String(details.lobbyId));

      return ids;
    },

    _friendInMyRoom(f) {
      const myIds = this._myRoomIds();
      if (myIds.size === 0) return false;

      const friendIds = this._friendRoomIds(f);
      for (const id of friendIds) {
        if (myIds.has(id)) return true;
      }
      return false;
    },

    _friendName(f) {
      return f?.name || f?.username || f?.displayName || "A friend";
    },

    _friendId(f) {
      return String(
        f?.userId || f?.id || f?.friendshipId || this._friendName(f),
      );
    },

    _friendMode(f) {
      const details = this._raw(f?.currentLobbyDetails);
      return details?.mode || "";
    },

    _push(body) {
      const notify = this._resolveNotify();
      if (!notify) return;

      try {
        notify({ text: body, type: "info", duration: 4000 });
        return;
      } catch (e) {}

      try {
        notify({ text: body });
      } catch (e) {}
    },

    _check() {
      const friends = this._friends();
      if (!friends) return;

      const myIds = this._myRoomIds();
      if (myIds.size === 0) {
        this._lastSeen.clear();
        return;
      }

      const online = friends.onlineFriends;
      if (!Array.isArray(online)) return;

      const currentIds = new Set();

      for (const friend of online) {
        const id = this._friendId(friend);
        currentIds.add(id);

        const status = friend.status || "offline";
        const joinable = status === "lobby" || status === "playing";

        const isInMyRoom = this._friendInMyRoom(friend);
        const was = this._lastSeen.get(id);
        const wasInMyRoom = was ? was.inMyRoom : false;

        if (isInMyRoom && joinable && !wasInMyRoom) {
          const name = this._friendName(friend);
          const body = `Your friend, ${name}, joined your room`;
          this._push(body);
        }

        this._lastSeen.set(id, {
          inMyRoom: isInMyRoom,
          roomIds: [...this._friendRoomIds(friend)].join(","),
          status,
        });
      }

      for (const id of [...this._lastSeen.keys()]) {
        if (!currentIds.has(id)) this._lastSeen.delete(id);
      }
    },

    init() {
      this._lastSeen = new Map();
      this._resolveNotify();

      this._tick = Ticker.add(() => {
        if (!cfg("friendnotify.enabled")) return;
        this._check();
      }, 500);
    },

    apply() {
      if (!cfg("friendnotify.enabled")) {
        this._lastSeen?.clear();
      }
    },

    destroy() {
      if (this._tick) {
        Ticker.remove(this._tick);
        this._tick = null;
      }
      this._lastSeen?.clear();
      this._lastSeen = new Map();
      this._notifyFn = null;
    },

    options: {
      render() {
        return `
        <div class="mod-description">
          Shows a notification when your friend joins your room
        </div>
      `;
      },

      bind() {
        const mod = MODS_BY_ID.get("friendnotify");

        const id = setInterval(() => {
          const c = byId("fn-count");
          const r = byId("fn-room");
          if (c) {
            const n = mod._lastSeen?.size || 0;
            c.textContent = n ? n + " friends" : "Waiting…";
          }
          if (r) {
            const ids = [...mod._myRoomIds()];
            const txt = ids.length ? ids.join(" / ") : "—";
            r.textContent = txt;
            r.title = txt;
          }
        }, 1000);

        const obs = new MutationObserver(() => {
          if (!byId("fn-count")) {
            clearInterval(id);
            obs.disconnect();
          }
        });
        obs.observe(document.body, { childList: true, subtree: true });
      },
    },
  });

  registerMod({
    id: "noads",
    name: "Game Ad Blocker",
    category: ["utilities", "new"],
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m4.9 4.9 14.2 14.2"/></svg>`,
    hasOptions: true,

    _origShow: null,
    _origVisibleDesc: null,
    _patched: false,
    _tick: null,

    _store() {
      try {
        return GameHooks.stores?.get("ownAd") || null;
      } catch (e) {
        return null;
      }
    },

    _patch() {
      if (this._patched) return;
      const store = this._store();
      if (!store || typeof store.show !== "function") return;

      this._origShow = store.show;
      const self = this;
      store.show = function () {
        try {
          if (this.visible !== undefined) this.visible = false;
          if (this.skipReady !== undefined) this.skipReady = true;
          if (this.secondsLeft !== undefined) this.secondsLeft = 0;
        } catch (e) {}
        return Promise.resolve({
          completed: true,
          skipped: true,
          rewarded: false,
          shown: false,
        });
      };

      try {
        const desc = Object.getOwnPropertyDescriptor(store, "visible");
        this._origVisibleDesc = desc;
        Object.defineProperty(store, "visible", {
          get() {
            return false;
          },
          set() {},
          configurable: true,
        });
      } catch (e) {}

      this._patched = true;
    },

    _unpatch() {
      if (!this._patched) return;
      const store = this._store();
      if (store) {
        try {
          if (this._origShow) store.show = this._origShow;
        } catch (e) {}

        try {
          if (this._origVisibleDesc) {
            Object.defineProperty(store, "visible", this._origVisibleDesc);
          }
        } catch (e) {}
      }
      this._patched = false;
      this._origShow = null;
      this._origVisibleDesc = null;
    },

    _injectStyles() {
      if (document.getElementById("__cs_no_ads_styles")) return;
      const style = document.createElement("style");
      style.id = "__cs_no_ads_styles";
      style.textContent = `
      .own-video-ad,
      .own-video-ad * {
        display: none !important;
        visibility: hidden !important;
        pointer-events: none !important;
      }
    `;
      document.head.appendChild(style);
    },

    init() {
      this._injectStyles();
      this._tick = Ticker.add(() => {
        if (!cfg("noads.enabled")) return;
        if (!this._patched) this._patch();
      }, 500);
    },

    apply() {
      if (!cfg("noads.enabled")) {
        this._unpatch();
        const s = document.getElementById("__cs_no_ads_styles");
        if (s) s.remove();
      } else {
        this._injectStyles();
        this._patch();
      }
    },

    destroy() {
      if (this._tick) {
        Ticker.remove(this._tick);
        this._tick = null;
      }
      this._unpatch();
      const s = document.getElementById("__cs_no_ads_styles");
      if (s) s.remove();
    },

    options: {
      render() {
        return `
        <div class="mod-description">
          Blocks Meeland.io and Blombo.io ads from appearing
        </div>
      `;
      },
      bind() {},
    },
  });

  registerMod({
    id: "pickupnotif",
    name: "Pickup Notifs",
    category: ["utilities", "new"],
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-bell-up"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12.5 17h-8.5a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6a2 2 0 1 1 4 0a7 7 0 0 1 4 6v1" /><path d="M9 17v1a3 3 0 0 0 3.49 2.96" /><path d="M19 22v-6" /><path d="M22 19l-3 -3l-3 3" /></svg>`,
    hasOptions: true,

    _container: null,
    _pollTick: null,
    _seedTick: null,
    _knownTotals: null,
    _catalog: null,
    _catalogBuilt: false,
    _activeToasts: null,
    _itemImageCache: null,

    _totals() {
      if (!(this._knownTotals instanceof Map)) this._knownTotals = new Map();
      return this._knownTotals;
    },

    _toasts() {
      if (!(this._activeToasts instanceof Set)) this._activeToasts = new Set();
      return this._activeToasts;
    },

    _imgCache() {
      if (!(this._itemImageCache instanceof Map))
        this._itemImageCache = new Map();
      return this._itemImageCache;
    },

    _buildCatalog() {
      if (this._catalogBuilt && this._catalog) return this._catalog;
      try {
        const stores = GameHooks.stores;
        if (!stores) return null;
        const catalog = stores.get("inventoryState")?.items;
        if (!catalog || typeof catalog !== "object") return null;

        const map = Object.create(null);
        let count = 0;
        for (const id in catalog) {
          const entry = catalog[id];
          if (!entry || typeof entry !== "object") continue;
          const name = entry.name || entry.title || entry.displayName;
          if (!name) continue;

          let icon = null;
          if (entry.textures) {
            const t = entry.textures;
            icon = t.all || t.side || t.top || t.bottom || null;
          }
          if (!icon && entry.inventoryIconPath) icon = entry.inventoryIconPath;
          if (!icon && entry.texture) icon = entry.texture;
          if (!icon && entry.url) icon = entry.url;
          if (!icon && entry.src) icon = entry.src;
          if (!icon && entry.image) icon = entry.image;
          if (!icon && entry.icon) icon = entry.icon;

          if (icon && !icon.startsWith("http") && !icon.startsWith("/")) {
            icon = "/assets/" + icon;
          }

          map[id] = {
            id: String(id),
            display: String(name),
            icon,
          };
          count++;
        }

        if (count === 0) return null;

        this._catalog = map;
        this._catalogBuilt = true;
        return map;
      } catch (e) {
        return null;
      }
    },

    _nameFor(id) {
      const cat = this._catalog?.[id];
      if (cat && cat.display) return cat.display;

      try {
        const stores = GameHooks.stores;
        const entry = stores?.get("inventoryState")?.items?.[id];
        if (entry) {
          const name = entry.name || entry.title || entry.displayName;
          if (name) {
            if (!this._catalog) this._catalog = Object.create(null);
            this._catalog[id] = {
              id: String(id),
              display: String(name),
              icon: cat?.icon || null,
            };
            return String(name);
          }
        }
      } catch (e) {}

      return null;
    },

    _iconFor(id) {
      const cache = this._imgCache();
      if (cache.has(id)) return cache.get(id);

      let url = null;

      const cat = this._catalog?.[id];
      if (cat && cat.icon) url = cat.icon;

      if (!url) {
        try {
          const stores = GameHooks.stores;
          const raw = stores?.get("inventoryState")?.items?.[id];
          if (raw) {
            url =
              raw.inventoryIconPath ||
              raw.texture ||
              raw.url ||
              raw.src ||
              raw.image ||
              raw.icon ||
              null;
            if (url && !url.startsWith("http") && !url.startsWith("/")) {
              url = "/assets/" + url;
            }
            if (!url && raw.textures) {
              const t = raw.textures;
              url = t.all || t.side || t.top || t.bottom || null;
            }
          }
        } catch (e) {}
      }

      if (!url) {
        const slots = document.querySelectorAll(".item");
        for (const slot of slots) {
          const img = slot.querySelector("img");
          if (!img?.src) continue;
          const file = img.src.split("/").pop()?.split("?")[0] || "";
          const match = file.match(/^(\d+)/);
          if (match && match[1] === id) {
            url = img.src;
            break;
          }
        }
      }

      if (!url) {
        cache.set(id, null);
        setTimeout(() => cache.delete(id), 1000);
        return null;
      }

      cache.set(id, url);
      return url;
    },

    _injectStyles() {
      if (document.getElementById("__cs_pickup_styles")) return;
      const style = document.createElement("style");
      style.id = "__cs_pickup_styles";
      style.textContent = `
      #__cs_pickup_stack {
        position: fixed;
        bottom: 16px;
        right: 16px;
        display: flex;
        flex-direction: column-reverse;
        gap: 6px;
        z-index: 99997;
        pointer-events: none;
        font-family: 'Lilita One', sans-serif;
        user-select: none;
      }
      .__cs_pickup_toast {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 6px 12px 6px 6px;
        background: #6c3d14;
        border: 2px solid #140000;
        border-radius: 9px;
        box-shadow: 0 3px #00000040;
        color: #fff;
        text-shadow:
          1px 1px 0 #000,
          -1px 1px 0 #000,
          1px -1px 0 #000,
          -1px -1px 0 #000;
        animation: __cs_pickup_in 0.15s ease-out;
        min-width: 140px;
      }
      .__cs_pickup_toast.fade {
        animation: __cs_pickup_out 0.2s ease-in forwards;
      }
      .__cs_pickup_icon {
        width: 32px;
        height: 32px;
        flex-shrink: 0;
        image-rendering: pixelated;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #4f2b0e;
        border: 2px solid #140000;
        border-radius: 7px;
        color: #fff;
        overflow: hidden;
      }
      .__cs_pickup_icon img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        image-rendering: pixelated;
        display: block;
      }
      .__cs_pickup_info {
        display: flex;
        flex-direction: column;
        line-height: 1.15;
      }
      .__cs_pickup_name {
        font-size: 14px;
        font-weight: 700;
      }
      .__cs_pickup_amount {
        font-size: 12px;
        color: #ffd23f;
      }
      @keyframes __cs_pickup_in {
        from { opacity: 0; transform: translateX(16px); }
        to   { opacity: 1; transform: translateX(0); }
      }
      @keyframes __cs_pickup_out {
        from { opacity: 1; transform: translateX(0); }
        to   { opacity: 0; transform: translateX(16px); }
      }
    `;
      document.head.appendChild(style);
    },

    _ensureContainer() {
      if (this._container && this._container.isConnected)
        return this._container;
      const el = document.createElement("div");
      el.id = "__cs_pickup_stack";
      document.body.appendChild(el);
      this._container = el;
      return el;
    },

    _makeToast(id, amount) {
      const name = this._nameFor(id) || `Item #${id}`;

      const toast = document.createElement("div");
      toast.className = "__cs_pickup_toast";

      const iconWrap = document.createElement("div");
      iconWrap.className = "__cs_pickup_icon";
      iconWrap.textContent = String(id);
      iconWrap.style.fontSize = "11px";

      const info = document.createElement("div");
      info.className = "__cs_pickup_info";

      const nameEl = document.createElement("div");
      nameEl.className = "__cs_pickup_name";
      nameEl.textContent = name;

      const amountEl = document.createElement("div");
      amountEl.className = "__cs_pickup_amount";
      amountEl.textContent = `+${amount}`;

      info.appendChild(nameEl);
      info.appendChild(amountEl);
      toast.appendChild(iconWrap);
      toast.appendChild(info);

      const tryIcon = (attempt) => {
        if (!toast.isConnected && attempt > 0) return;
        const url = this._iconFor(id);
        if (url) {
          iconWrap.textContent = "";
          iconWrap.style.fontSize = "";
          const img = document.createElement("img");
          img.src = url;
          img.alt = "";
          img.draggable = false;
          img.onerror = () => {
            img.remove();
            iconWrap.textContent = String(id);
            iconWrap.style.fontSize = "11px";
          };
          iconWrap.appendChild(img);
          return;
        }
        if (attempt < 6) {
          setTimeout(() => tryIcon(attempt + 1), 150);
        }
      };
      tryIcon(0);

      return toast;
    },

    _pushToast(id, amount) {
      if (!cfg("pickupnotif.enabled")) return;

      const container = this._ensureContainer();
      const toast = this._makeToast(id, amount);
      container.appendChild(toast);
      this._toasts().add(toast);

      const max = Math.max(1, Number(cfg("pickupnotif.maxToasts")) || 5);
      const all = [...container.children];
      if (all.length > max) {
        const old = all.slice(0, all.length - max);
        for (const el of old) {
          el.classList.add("fade");
          setTimeout(() => el.remove(), 200);
          this._toasts().delete(el);
        }
      }

      const duration = Math.max(
        800,
        Number(cfg("pickupnotif.duration")) || 3000,
      );
      setTimeout(() => {
        if (!toast.isConnected) return;
        toast.classList.add("fade");
        setTimeout(() => {
          toast.remove();
          this._toasts().delete(toast);
        }, 200);
      }, duration);
    },

    _readTotals() {
      try {
        const app = document.querySelector("#app")?.__vue_app__;
        const provides = app?._context?.provides;
        const sym = Object.getOwnPropertySymbols(provides || {}).find(
          (s) => provides[s]?._s,
        );
        const inv = provides[sym]._s.get("inventoryState");
        if (!inv) return null;

        const totals = new Map();
        for (const key of ["0", "1", "2", "3"]) {
          const arr = inv[key];
          if (!Array.isArray(arr)) continue;
          for (const slot of arr) {
            if (!slot || !slot.id) continue;
            const id = String(slot.id);
            const q = Number(slot.q) || 0;
            totals.set(id, (totals.get(id) || 0) + q);
          }
        }
        return totals;
      } catch (e) {
        return null;
      }
    },

    _seedBaseline() {
      const totals = this._readTotals();
      if (totals) this._knownTotals = totals;
    },

    _poll() {
      if (!cfg("pickupnotif.enabled")) return;

      const totals = this._readTotals();
      if (!totals) return;

      const known = this._totals();

      if (known.size > 0) {
        for (const [id, total] of totals) {
          const prev = known.get(id) || 0;
          if (total > prev) {
            this._pushToast(id, total - prev);
          }
        }
      }

      this._knownTotals = totals;
    },

    init() {
      if (!(this._knownTotals instanceof Map)) this._knownTotals = new Map();
      if (!(this._activeToasts instanceof Set)) this._activeToasts = new Set();
      if (!(this._itemImageCache instanceof Map))
        this._itemImageCache = new Map();

      this._injectStyles();

      let attempts = 0;
      const seed = () => {
        if (!this._catalogBuilt) this._buildCatalog();
        this._seedBaseline();
        attempts++;
        if (
          (this._knownTotals.size > 0 && this._catalogBuilt) ||
          attempts >= 20
        ) {
          Ticker.remove(this._seedTick);
          this._seedTick = null;
        }
      };
      this._seedTick = Ticker.add(seed, 500);
      seed();

      waitForBody(() => {
        this._ensureContainer();
      });

      this._pollTick = Ticker.add(() => this._poll(), 200);
    },

    apply() {
      if (!cfg("pickupnotif.enabled")) {
        const c = document.getElementById("__cs_pickup_stack");
        if (c) c.innerHTML = "";
      }
    },

    destroy() {
      if (this._seedTick) {
        Ticker.remove(this._seedTick);
        this._seedTick = null;
      }
      if (this._pollTick) {
        Ticker.remove(this._pollTick);
        this._pollTick = null;
      }
      if (this._container) {
        this._container.remove();
        this._container = null;
      }
      if (this._knownTotals instanceof Map) this._knownTotals.clear();
      if (this._activeToasts instanceof Set) this._activeToasts.clear();
    },

    options: {
      render() {
        return `
        <div class="mod-description">
          Shows a notification on the bottom right when you gain new items
        </div>

        <div class="settings-section-title">
          <span>General</span>
          <div></div>
        </div>

        <div class="setting-row">
          <label data-tip="How long each pickup notification stays on screen">Duration</label>
          <div class="setting-inline">
            <input type="range" id="pn-duration" min="1000" max="8000" step="250"
              value="${cfg("pickupnotif.duration") || 3000}">
            <div class="range-val" id="pn-duration-val">
              ${((cfg("pickupnotif.duration") || 3000) / 1000).toFixed(1)}s
            </div>
          </div>
        </div>

        <div class="setting-row">
          <label data-tip="Maximum number of pickup notifications visible at once">Max Toasts</label>
          <div class="setting-inline">
            <input type="range" id="pn-max" min="1" max="10" step="1"
              value="${cfg("pickupnotif.maxToasts") || 5}">
            <div class="range-val" id="pn-max-val">
              ${cfg("pickupnotif.maxToasts") || 5}
            </div>
          </div>
        </div>
      `;
      },

      bind() {
        bindSlider(
          "pn-duration",
          "pn-duration-val",
          "pickupnotif.duration",
          (v) => `${(parseInt(v) / 1000).toFixed(1)}s`,
          (v) => parseInt(v),
        );
        bindSlider(
          "pn-max",
          "pn-max-val",
          "pickupnotif.maxToasts",
          (v) => String(parseInt(v)),
          (v) => parseInt(v),
        );
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
#__cs_menu .mods::-webkit-scrollbar,
#__cs_profiles_panel::-webkit-scrollbar {
    background: 0 0 !important;
    width: 4px !important;
}
#__cs_menu .mods::-webkit-scrollbar-thumb,
#__cs_profiles_panel::-webkit-scrollbar-thumb{
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
    overflow: hidden;
    position: relative;
}

#__cs_menu .card-fav {
    position: absolute;
    top: 6px;
    left: 6px;
    width: 22px;
    height: 22px;
    padding: 0;
    border: none;
    background: transparent;
    color: var(--grey-2);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    transition: background 0.2s, color 0.2s;
    z-index: 2;
}

#__cs_menu .card-fav:hover {
    background: var(--background-5);
    color: var(--white);
}

#__cs_menu .card-fav.active {
    color: #ffd23f;
}
#__cs_menu .card-fav.active svg {
    fill: #ffd23f;
    stroke: #ffd23f;
}
#__cs_menu.compact .card-fav {
    top: 50%;
    left: 6px;
    transform: translateY(-50%);
    width: 18px;
    height: 18px;
}

#__cs_menu.compact .card-fav.active svg {
    width: 14px;
    height: 14px;
}

#__cs_menu.compact .card-fav {
    left: 152px !important;
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
    margin: 10px 0 0;
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
#__cs_menu .opt-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed !important;
}
#__cs_menu .opt-btn:disabled:hover {
  background: var(--background-1)
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

#__cs_profiles_panel {
    flex: 1;
    padding: 14px;
    display: none;
    flex-direction: column;
    gap: 12px;
    overflow-y: auto;
}
#__cs_profiles_panel.active {
    display: flex;
}
#__cs_profiles_list {
    display: flex;
    flex-direction: column;
    gap: 10px;
}
.cs-profile-card {
    background: var(--background-4);
    border: 1.5px solid var(--border-2);
    border-radius: 8px;
    overflow: hidden;
    padding: 6px 8px !important;
    transition: border-color 0.15s;
    flex-shrink: 0;
}
.cs-profile-card.active {
    border-color: var(--primary-1);
}
.cs-profile-header {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 12px;
}
.cs-profile-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    flex-shrink: 0;
}
.cs-profile-info {
    flex: 1;
    min-width: 0;
}
.cs-profile-name {
    font-size: 13px;
    font-weight: 600;
    color: var(--white);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.cs-profile-meta {
    font-size: 11px;
    color: var(--grey-2);
    margin-top: 3px !important;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.cs-profile-badge {
    display: inline-block;
    font-size: 9px;
    font-weight: 700;
    color: var(--white);
    background: var(--primary-1);
    padding: 2px 6px !important;
    border-radius: 4px !important;
    margin-left: 6px !important;
    vertical-align: middle;
    line-height: 1.4;
}
.cs-profile-actions {
    display: flex;
    gap: 6px;
    flex-shrink: 0;
}
.cs-profile-actions .opt-btn {
    font-size: 11px;
    border: 1px solid var(--border-2) !important;
    padding: 4px 10px;
}
.cs-profile-actions .pencil-btn {
    width: 28px;
    height: 28px;
    padding: 0 !important;
    display: flex;
    align-items: center;
    justify-content: center;
}
.cs-profile-editor {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 0 12px;
    border-top: 1px solid var(--border-2);
    max-height: 0;
    overflow: hidden;
    opacity: 0;
    transition:
        max-height 0.28s ease,
        opacity 0.2s ease,
        padding 0.28s ease;
}
.cs-profile-editor.open {
    max-height: 300px;
    padding: 7px 0 0 0 !important;
    margin-top: 7px !important;
    opacity: 1;
}
.cs-profile-editor .setting-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0px;
}
.cs-profile-editor .setting-inline {
    display: flex !important;
    align-items: center !important;
    gap: 6px !important;
}

.cs-profile-editor .setting-inline input[type="color"] {
    width: 28px !important;
    height: 28px !important;
    padding: 0 !important;
    margin: 0 !important;
    border: 1px solid var(--border-1) !important;
    box-sizing: border-box !important;
    flex: 0 0 28px !important;
}

.cs-profile-editor .setting-inline input[type="color"]::-webkit-color-swatch-wrapper {
    width: 100% !important;
    height: 100% !important;
    padding: 0 !important;
}

.cs-profile-editor .setting-inline input[type="color"]::-webkit-color-swatch {
    border: none !important;
    border-radius: 3px !important;
}

.cs-profile-editor .setting-inline .cs-textbox {
    width: 72px !important;
    height: 28px !important;
    padding: 0 6px !important;
    margin: 0 !important;
    box-sizing: border-box !important;
    flex: 0 0 72px !important;
}
#__cs_menu .setting-row label[data-tip],
#__cs_menu .hp-row-label[data-tip] {
  cursor: help;
}

#__cs-setting-tooltip {
  position: fixed;
  z-index: 2147483647;
  max-width: 240px;
  padding: 8px 11px;
  --tip-bg: #15121f;
  --tip-border: #2f2f3f;
  --tip-text: #e6f1ff;
  background: var(--tip-bg);
  color: var(--tip-text);
  border: 1px solid var(--tip-border);
  border-radius: 6px;
  font-size: 12px;
  font-family: sans-serif;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.25);
  pointer-events: none;
  opacity: 0;
  transform: translateY(-3px);
  transition: .12s;
}

#__cs-setting-tooltip.show {
  opacity: 1;
  transform: translateY(0);
}

#__cs-setting-tooltip::before {
  content: "";
  position: absolute;
  top: -5px;
  left: 12px;
  width: 8px;
  height: 8px;
  background: var(--tip-bg);
  border-top: 1px solid var(--tip-border);
  border-left: 1px solid var(--tip-border);
  transform: rotate(45deg);
}
`;

  // -- MENU
  MODS.sort((a, b) => a.name.localeCompare(b.name));

  function buildMenuHTML() {
    const cards = MODS.map((mod) => {
      const fav = CM_isFavourite(mod.id);
      return `
        <div
    class="card"
    data-mod="${mod.id}"
    data-category="${
      Array.isArray(mod.category)
        ? mod.category.join(",")
        : mod.category || "new"
    }">
            <button
              class="card-fav${fav ? " active" : ""}"
              data-fav="${mod.id}"
              title="${fav ? "Remove from favourites" : "Add to favourites"}"
              type="button"
            >
              <svg width="16" height="16" viewBox="0 0 24 24"
                   fill="none" stroke="currentColor" stroke-width="2"
                   stroke-linecap="round" stroke-linejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
            </button>
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
        </div>`;
    }).join("");

    return `
<div class="header">
    <div class="title">Celestar Mod Menu <span style="font-size:11px;font-weight:700;color:var(--primary-1)">v2.1.0</span></div>
    <div class="tabs">
        <button class="tab active" data-tab="mods">Mods</button>
        <button class="tab" data-tab="settings">Settings</button>
        <button class="tab" data-tab="profiles">Profiles</button>
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

<div id="__cs_profiles_panel">
    <div class="setting-row">
        <label>Import</label>
        <div class="setting-inline">
            <button class="opt-btn" id="cs-prof-import">Import .json</button>
        </div>
    </div>

    <div class="settings-section-title">
        <span>Your Profiles</span>
        <div></div>
    </div>
    <div id="__cs_profiles_list"></div>
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

    const modsGrid = _menuEl.querySelector("#__cs_mods");

    function sortCardsByFavourite() {
      if (!modsGrid) return;
      const favs = new Set(CM_getFavourites());
      const sorted = cards.slice().sort((a, b) => {
        const aFav = favs.has(a.dataset.mod) ? 1 : 0;
        const bFav = favs.has(b.dataset.mod) ? 1 : 0;
        if (aFav !== bFav) return bFav - aFav;

        const aName = MODS_BY_ID.get(a.dataset.mod)?.name || "";
        const bName = MODS_BY_ID.get(b.dataset.mod)?.name || "";
        return aName.localeCompare(bName, undefined, {
          sensitivity: "base",
          numeric: true,
        });
      });
      for (const card of sorted) modsGrid.appendChild(card);
    }

    sortCardsByFavourite();

    _menuEl.querySelectorAll(".card-fav").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        const id = btn.dataset.fav;
        if (!id) return;

        const nowFav = CM_toggleFavourite(id);
        btn.classList.toggle("active", nowFav);
        btn.title = nowFav ? "Remove from favourites" : "Add to favourites";

        sortCardsByFavourite();

        if (typeof filterMods === "function") filterMods();
      });
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

        const tabName = tab.dataset.tab;
        const isSettings = tabName === "settings";
        const isProfiles = tabName === "profiles";
        const isMods = !isSettings && !isProfiles;

        const mods = _menuEl.querySelector("#__cs_mods");
        const toolbar = _menuEl.querySelector("#__cs_toolbar");
        const settings = _menuEl.querySelector("#__cs_settings_panel");
        const profiles = _menuEl.querySelector("#__cs_profiles_panel");

        if (mods) mods.style.display = isMods ? "" : "none";
        if (toolbar) toolbar.style.display = isMods ? "" : "none";
        if (settings) settings.classList.toggle("active", isSettings);
        if (profiles) profiles.classList.toggle("active", isProfiles);

        if (isProfiles) renderProfilesList();
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

    const importBtn = _menuEl.querySelector("#cs-prof-import");
    if (importBtn) {
      importBtn.addEventListener("click", () => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = ".json,application/json";

        input.onchange = async (e) => {
          const file = e.target.files && e.target.files[0];
          if (!file) return;

          const payload = await importProfileFromFile(file);
          if (!payload) return;

          let slotId = findEmptySlot();

          if (slotId === null) {
            const answer = prompt(
              "All slots are full, which slot do you want to override (1-10)",
              "1",
            );
            const parsed = parseInt(answer, 10);
            if (!PROFILE_SLOTS.includes(parsed)) {
              alert("Cancelled");
              return;
            }
            slotId = parsed;
          }

          const ok = importToSlot(slotId, payload);
          if (!ok) {
            alert("Import failed");
            return;
          }

          _menuEl
            .querySelectorAll(".tab")
            .forEach((t) => t.classList.remove("active"));
          const profilesTab = _menuEl.querySelector(
            '.tab[data-tab="profiles"]',
          );
          if (profilesTab) profilesTab.classList.add("active");

          const mods = _menuEl.querySelector("#__cs_mods");
          const toolbar = _menuEl.querySelector("#__cs_toolbar");
          const settings = _menuEl.querySelector("#__cs_settings_panel");
          const profiles = _menuEl.querySelector("#__cs_profiles_panel");
          if (mods) mods.style.display = "none";
          if (toolbar) toolbar.style.display = "none";
          if (settings) settings.classList.remove("active");
          if (profiles) profiles.classList.add("active");

          renderProfilesList();
          requestAnimationFrame(() => {
            const newCard = document.querySelector(
              `.cs-profile-card[data-slot="${slotId}"]`,
            );
            const newEditor = newCard?.querySelector(
              `[data-editor="${slotId}"]`,
            );
            if (newEditor) {
              document
                .querySelectorAll(".cs-profile-editor.open")
                .forEach((el) => el.classList.remove("open"));
              newEditor.classList.add("open");
            }
          });
        };

        input.click();
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
        resetAllBtn.textContent = "Confirm";
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
          if (key.startsWith(prefix)) {
            CM_setValue(key, DEFAULTS[key]);
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

  window.__csRefreshOptions = () => {
    const panel = byId("__cs_options_panel");
    if (!panel || !panel.classList.contains("open")) return;
    const title = byId("__cs_options_title");
    if (!title) return;
    const id = [...MODS_BY_ID.entries()].find(
      ([, m]) => m.name === title.textContent,
    )?.[0];
    if (!id) return;
    openOptions(id);
  };

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
    if (document.pointerLockElement) {
      document.exitPointerLock();
    }
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

  window.__csToggleMenu = toggleMenu;
  window.__csOpenMenu = openMenu;
  window.__csCloseMenu = closeMenu;
  window.__csIsMenuOpen = () => _menuOpen;
  window.__csOpenOptions = openOptions;

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
    "ShiftRight",
    "KeyB",
    "KeyF",
    "KeyM",
    "KeyR",
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

    const gameLabel = GameKeybinds.labelForCode(code);
    if (gameLabel) return `Game: ${gameLabel}`;

    if (GameKeybinds.isReserved(code)) return "Game (reserved)";

    if (GAME_RESERVED_KEYS.has(code)) return "Game";

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

  const _escMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  function escHtml(s) {
    return String(s).replace(/[&<>"']/g, (c) => _escMap[c]);
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
          CM_setValue(key, DEFAULTS[key]);
        } catch (e) {}
      }

      try {
        CM_setValue("__firstRunDone", false);
        CM_setValue("__cfgVer", 0);
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

    if (!window.__csGameKbHooked) {
      window.__csGameKbHooked = true;
      GameKeybinds.onChange(() => {
        document
          .querySelectorAll("#__cs_menu .keybind-box")
          .forEach((box) =>
            box.dispatchEvent(new CustomEvent("cs-kb-refresh")),
          );
      });
    }

    el.addEventListener("cs-kb-refresh", () => {
      updateConflictState();
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

  // -- PROFILES
  const PROFILE_EXCLUDE = new Set([
    "textures.pack",
    "customui.css",
    "customui.name",
    "client.keybind",
    "client.theme",
    "client.compact",
    "waypoints.list",
  ]);

  const PROFILE_SLOTS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const PROFILE_MAX_BYTES = 4 * 1024 * 1024;

  function profileKeys() {
    return Object.keys(DEFAULTS).filter((k) => !PROFILE_EXCLUDE.has(k));
  }

  function snapshotConfig() {
    const data = {};
    for (const key of profileKeys()) {
      data[key] = cfg(key);
    }
    return data;
  }

  function normalizeProfile(data) {
    const out = {};
    for (const key of profileKeys()) {
      out[key] = data && data[key] !== undefined ? data[key] : DEFAULTS[key];
    }
    return out;
  }

  function configsEqual(a, b) {
    const keys = profileKeys();
    for (const key of keys) {
      if (!valueEqual(a[key], b[key])) return false;
    }
    return true;
  }

  function valueEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return a === b;
    if (typeof a !== typeof b) return false;

    if (Array.isArray(a) || Array.isArray(b)) {
      if (!Array.isArray(a) || !Array.isArray(b)) return false;
      if (a.length !== b.length) return false;
      for (let i = 0; i < a.length; i++) {
        if (!valueEqual(a[i], b[i])) return false;
      }
      return true;
    }

    if (typeof a === "object") {
      const ka = Object.keys(a);
      const kb = Object.keys(b);
      if (ka.length !== kb.length) return false;
      for (const k of ka) {
        if (!valueEqual(a[k], b[k])) return false;
      }
      return true;
    }

    return false;
  }

  function getSlotMeta(slotId) {
    const raw = CM_getValue("profiles.slot" + slotId, null);
    if (!raw || typeof raw !== "object") {
      return {
        name: "Profile " + slotId,
        color: "#7b2fe6",
        created: 0,
        updated: 0,
        saved: false,
      };
    }
    return raw;
  }

  function setSlotMeta(slotId, meta) {
    CM_setValue("profiles.slot" + slotId, meta);
  }

  function getSlotData(slotId) {
    const raw = CM_getValue("profiles.slot" + slotId + ".data", null);
    if (!raw || typeof raw !== "object") return null;
    return normalizeProfile(raw);
  }

  function setSlotData(slotId, data) {
    CM_setValue("profiles.slot" + slotId + ".data", data);
  }

  function isSlotPopulated(slotId) {
    const data = CM_getValue("profiles.slot" + slotId + ".data", null);
    const meta = getSlotMeta(slotId);
    return !!meta.saved && !!data && typeof data === "object";
  }

  function estimateProfileBytes(data) {
    try {
      return new Blob([JSON.stringify(data)]).size;
    } catch (e) {
      return Infinity;
    }
  }

  function saveToSlot(slotId) {
    const data = snapshotConfig();

    const bytes = estimateProfileBytes(data);
    if (bytes > PROFILE_MAX_BYTES) {
      alert(
        "Profile too large to save (" +
          Math.round(bytes / 1024) +
          "KB). Remove large packs or CSS before saving.",
      );
      return null;
    }

    try {
      setSlotData(slotId, data);
    } catch (e) {
      alert("Failed to save profile data (storage full?)");
      return null;
    }

    const meta = getSlotMeta(slotId);
    meta.saved = true;
    meta.updated = Date.now();
    if (!meta.created) meta.created = Date.now();
    setSlotMeta(slotId, meta);

    CM_setValue("profiles.activeSlot", slotId);
    CM_setValue("profiles.activeSnapshot", snapshotConfig());

    return meta;
  }

  function loadFromSlot(slotId) {
    const data = getSlotData(slotId);
    if (!data) return false;

    for (const key of Object.keys(data)) {
      CM_setValue(key, data[key]);
      delete _cfg[key];
    }

    setSlotData(slotId, normalizeProfile(data));

    CM_setValue("profiles.activeSlot", slotId);
    CM_setValue("profiles.activeSnapshot", snapshotConfig());
    return true;
  }

  function deleteSlot(slotId) {
    CM_setValue("profiles.slot" + slotId, {
      name: "Profile " + slotId,
      color: "#7b2fe6",
      created: 0,
      updated: 0,
      saved: false,
    });
    CM_setValue("profiles.slot" + slotId + ".data", null);

    const active = CM_getValue("profiles.activeSlot", null);
    if (active === slotId) {
      CM_setValue("profiles.activeSlot", null);
      CM_setValue("profiles.activeSnapshot", null);
    }
  }

  function isActiveSlotModified() {
    const active = CM_getValue("profiles.activeSlot", null);
    if (!active) return false;
    const snap = CM_getValue("profiles.activeSnapshot", null);
    if (!snap) return false;
    return !configsEqual(snapshotConfig(), normalizeProfile(snap));
  }

  function findEmptySlot() {
    for (const slotId of PROFILE_SLOTS) {
      if (!isSlotPopulated(slotId)) return slotId;
    }
    return null;
  }

  function exportProfileToFile(slotId) {
    const meta = getSlotMeta(slotId);
    const data = getSlotData(slotId);
    if (!data) {
      alert("This slot is empty.");
      return;
    }

    const payload = {
      kind: "celestar-profile",
      version: 1,
      name: meta.name || "Profile " + slotId,
      color: /^#[0-9A-Fa-f]{6}$/.test(meta.color) ? meta.color : "#7b2fe6",
      exportedAt: Date.now(),
      data,
    };

    let json;
    try {
      json = JSON.stringify(payload, null, 2);
    } catch (e) {
      alert("Failed to serialize profile.");
      return;
    }

    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download =
      (payload.name || "profile").replace(/[^a-z0-9_-]/gi, "_") + ".json";
    document.body.appendChild(a);
    a.click();
    a.remove();

    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  async function importProfileFromFile(file) {
    try {
      const text = await file.text();
      const raw = JSON.parse(text);
      if (!raw || typeof raw !== "object") return null;
      if (!raw.data || typeof raw.data !== "object") return null;

      const kind = raw.kind || "celestar-profile";
      if (kind !== "celestar-profile") {
        const proceed = confirm(
          "This file wasn't exported by Celestar. Import anyway?",
        );
        if (!proceed) return null;
      }

      return {
        name: String(raw.name || "Imported Profile").slice(0, 32),
        color: /^#[0-9A-Fa-f]{6}$/.test(raw.color) ? raw.color : "#7b2fe6",
        data: normalizeProfile(raw.data),
      };
    } catch (e) {
      alert("Failed to read profile file: " + e.message);
      return null;
    }
  }

  function importToSlot(slotId, payload) {
    if (!payload || !payload.data) return false;

    const bytes = estimateProfileBytes(payload.data);
    if (bytes > PROFILE_MAX_BYTES) {
      alert(
        "Imported profile too large (" +
          Math.round(bytes / 1024) +
          "KB). Max is " +
          Math.round(PROFILE_MAX_BYTES / 1024) +
          "KB.",
      );
      return false;
    }

    try {
      setSlotData(slotId, payload.data);
    } catch (e) {
      alert("Failed to write profile data (storage full?)");
      return false;
    }

    const meta = getSlotMeta(slotId);
    meta.name = String(payload.name || "Profile " + slotId).slice(0, 32);
    meta.color = payload.color || "#7b2fe6";
    meta.saved = true;
    meta.created = meta.created || Date.now();
    meta.updated = Date.now();
    setSlotMeta(slotId, meta);

    CM_setValue("profiles.activeSlot", slotId);
    CM_setValue("profiles.activeSnapshot", snapshotConfig());
    return true;
  }

  function timeAgo(ts) {
    const diff = Date.now() - ts;
    const s = Math.floor(diff / 1000);
    if (s < 5) return "just now";
    if (s < 60) return s + "s ago";
    const m = Math.floor(s / 60);
    if (m < 60) return m + "m ago";
    const h = Math.floor(m / 60);
    if (h < 24) return h + "h ago";
    const d = Math.floor(h / 24);
    return d + "d ago";
  }

  function renderProfilesList() {
    const list = byId("__cs_profiles_list");
    if (!list) return;
    list.innerHTML = "";

    const active = CM_getValue("profiles.activeSlot", null);
    const modified = isActiveSlotModified();

    for (const slotId of PROFILE_SLOTS) {
      const meta = getSlotMeta(slotId);
      const populated = isSlotPopulated(slotId);
      const isActive = active === slotId;

      const card = document.createElement("div");
      card.className = "cs-profile-card";
      if (isActive) card.classList.add("active");
      card.dataset.slot = slotId;

      const updatedText = meta.updated
        ? timeAgo(meta.updated)
        : "Not saved yet";

      const activeBadge =
        isActive && modified
          ? `<span class="cs-profile-badge">Modified</span>`
          : isActive
            ? `<span class="cs-profile-badge">Active</span>`
            : "";

      card.innerHTML = `
      <div class="cs-profile-header">
        <div class="cs-profile-dot" style="background:${meta.color};"></div>
        <div class="cs-profile-info">
          <div class="cs-profile-name">
            ${escHtml(meta.name)}${activeBadge}
          </div>
          <div class="cs-profile-meta">
            ${populated ? "Saved " + updatedText : "Empty slot"}
          </div>
        </div>
        <div class="cs-profile-actions">
  ${
    populated
      ? `<button class="opt-btn load-btn"${isActive ? " disabled" : ""}>${"Load"}</button>
         <button class="opt-btn pencil-btn" title="Edit">
           <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-edit"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415" /><path d="M16 5l3 3" /></svg>
         </button>`
      : `<button class="opt-btn create-btn">Create</button>`
  }
</div>
      </div>

      <div class="cs-profile-editor" data-editor="${slotId}">
        <div class="setting-row">
          <label>Name</label>
          <input
            type="text"
            id="cs-prof-name-${slotId}"
            class="cs-textbox"
            maxlength="32"
            value="${escHtml(meta.name)}"
            style="width:160px;"
          >
        </div>

        <div class="setting-row">
          <label>Color</label>
          <div class="setting-inline">
            <input
              type="color"
              id="cs-prof-color-${slotId}"
              value="${meta.color}"
            >
            <input
              type="text"
              id="cs-prof-color-text-${slotId}"
              class="cs-textbox"
              value="${meta.color}"
            >
          </div>
        </div>

        <div class="setting-row">
          <label>Actions</label>
          <div class="setting-inline">
            <button class="opt-btn" id="cs-prof-save-${slotId}">Save</button>
            <button class="opt-btn" id="cs-prof-export-${slotId}" title="Download this profile as .json">Export</button>
            <button
              class="opt-btn"
              id="cs-prof-delete-${slotId}"
              style="color:#e05252;border-color:#e05252;"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    `;

      list.appendChild(card);
      bindProfileCard(card, slotId, meta);
    }
  }

  function bindProfileCard(card, slotId, meta) {
    const editor = card.querySelector(`[data-editor="${slotId}"]`);
    const pencilBtn = card.querySelector(".pencil-btn");
    const loadBtn = card.querySelector(".load-btn");
    const nameInput = card.querySelector(`#cs-prof-name-${slotId}`);
    const colorInput = card.querySelector(`#cs-prof-color-${slotId}`);
    const colorText = card.querySelector(`#cs-prof-color-text-${slotId}`);
    const saveBtn = card.querySelector(`#cs-prof-save-${slotId}`);
    const deleteBtn = card.querySelector(`#cs-prof-delete-${slotId}`);
    const createBtn = card.querySelector(".create-btn");
    const exportBtn = card.querySelector(`#cs-prof-export-${slotId}`);

    if (pencilBtn && editor) {
      pencilBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        const isOpen = editor.classList.contains("open");
        document
          .querySelectorAll(".cs-profile-editor.open")
          .forEach((el) => el.classList.remove("open"));
        if (!isOpen) editor.classList.add("open");
      });
    }

    if (nameInput) {
      nameInput.addEventListener("input", () => {
        const m = getSlotMeta(slotId);
        m.name = nameInput.value.trim().slice(0, 32) || "Profile " + slotId;
        setSlotMeta(slotId, m);

        const nameEl = card.querySelector(".cs-profile-name");
        if (!nameEl) return;
        const active = CM_getValue("profiles.activeSlot", null);
        const modified = isActiveSlotModified();
        const badge =
          active === slotId && modified
            ? `<span class="cs-profile-badge">Modified</span>`
            : active === slotId
              ? `<span class="cs-profile-badge">Active</span>`
              : "";
        nameEl.innerHTML = escHtml(m.name) + badge;
      });
    }

    if (colorInput && colorText) {
      const applyColor = (value, updatePicker, updateText) => {
        if (!/^#[0-9A-Fa-f]{6}$/.test(value)) return false;
        value = value.toLowerCase();
        if (updatePicker) colorInput.value = value;
        if (updateText) colorText.value = value;

        const m = getSlotMeta(slotId);
        m.color = value;
        setSlotMeta(slotId, m);

        const dot = card.querySelector(".cs-profile-dot");
        if (dot) dot.style.background = value;
        return true;
      };

      colorInput.addEventListener("input", () =>
        applyColor(colorInput.value, false, true),
      );

      colorText.addEventListener("change", () => {
        if (!applyColor(colorText.value.trim(), true, true)) {
          colorText.value = getSlotMeta(slotId).color;
        }
      });

      colorText.addEventListener("keydown", (e) => {
        if (e.key === "Enter") e.target.blur();
      });
    }

    const armButton = (
      btn,
      idleText,
      armedText,
      idleStyle,
      armedStyle,
      onConfirm,
    ) => {
      if (!btn) return;
      btn.addEventListener("click", () => {
        if (btn.dataset.armed === "1") {
          btn.dataset.armed = "";
          btn.textContent = idleText;
          Object.assign(btn.style, idleStyle);
          onConfirm();
          return;
        }
        btn.dataset.armed = "1";
        btn.textContent = armedText;
        Object.assign(btn.style, armedStyle);
        setTimeout(() => {
          if (btn.dataset.armed !== "1") return;
          btn.dataset.armed = "";
          btn.textContent = idleText;
          Object.assign(btn.style, idleStyle);
        }, 3000);
      });
    };

    armButton(
      saveBtn,
      "Save",
      "Confirm",
      { color: "", background: "" },
      { color: "#fff", background: "var(--primary-1)" },
      () => {
        const result = saveToSlot(slotId);
        if (result) renderProfilesList();
      },
    );

    armButton(
      deleteBtn,
      "Delete",
      "Confirm",
      { background: "", color: "#e05252" },
      { background: "#e05252", color: "#fff", fontWeight: "600" },
      () => {
        deleteSlot(slotId);
        renderProfilesList();
      },
    );

    if (loadBtn && !loadBtn.disabled) {
      armButton(
        loadBtn,
        "Load",
        "Confirm",
        { background: "", color: "" },
        { background: "var(--primary-1)", color: "#fff" },
        () => {
          loadFromSlot(slotId);
          location.reload();
        },
      );
    }

    armButton(
      createBtn,
      "Create",
      "Confirm",
      { background: "", color: "" },
      { background: "var(--primary-1)", color: "#fff" },
      () => {
        saveToSlot(slotId);
        renderProfilesList();
        requestAnimationFrame(() => {
          const newCard = document.querySelector(
            `.cs-profile-card[data-slot="${slotId}"]`,
          );
          const newEditor = newCard?.querySelector(`[data-editor="${slotId}"]`);
          if (newEditor) {
            document
              .querySelectorAll(".cs-profile-editor.open")
              .forEach((el) => el.classList.remove("open"));
            newEditor.classList.add("open");
          }
        });
      },
    );

    if (exportBtn) {
      exportBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        exportProfileToFile(slotId);
      });
    }
  }

  window.__csProfiles = {
    save: saveToSlot,
    load: loadFromSlot,
    del: deleteSlot,
    snapshot: snapshotConfig,
    meta: getSlotMeta,
    data: getSlotData,
    active: () => CM_getValue("profiles.activeSlot", null),
    modified: isActiveSlotModified,
    export: exportProfileToFile,
    import: importProfileFromFile,
    importToSlot,
    slots: PROFILE_SLOTS,
    excluded: Array.from(PROFILE_EXCLUDE),
  };

  waitForBody(initMenu);

  (function initSettingTooltips() {
    let tipEl = null;
    let currentTarget = null;

    function readMenuVars() {
      const menu = document.getElementById("__cs_menu");
      if (!menu) return null;
      const cs = getComputedStyle(menu);
      return {
        bg: cs.getPropertyValue("--background-1").trim() || "#15121f",
        border: cs.getPropertyValue("--border-2").trim() || "#2f2f3f",
        text: cs.getPropertyValue("--white").trim() || "#e6f1ff",
      };
    }

    function applyTheme() {
      if (!tipEl) return;
      const vars = readMenuVars();
      if (!vars) return;
      tipEl.style.setProperty("--tip-bg", vars.bg);
      tipEl.style.setProperty("--tip-border", vars.border);
      tipEl.style.setProperty("--tip-text", vars.text);
    }

    function ensureTip() {
      if (tipEl && tipEl.isConnected) return tipEl;

      tipEl = document.createElement("div");
      tipEl.id = "__cs-setting-tooltip";
      document.body.appendChild(tipEl);

      applyTheme();
      return tipEl;
    }

    function showTip(target) {
      const text = target.getAttribute("data-tip");
      if (!text) return;

      const el = ensureTip();
      applyTheme();

      el.textContent = text;
      el.classList.add("show");
      currentTarget = target;

      const rect = target.getBoundingClientRect();
      const tipRect = el.getBoundingClientRect();

      let top = rect.bottom + 8;
      let placement = "bottom";
      if (top + tipRect.height > window.innerHeight - 5) {
        top = rect.top - tipRect.height - 8;
        placement = "top";
      }

      let left = rect.left;
      const maxLeft = window.innerWidth - tipRect.width - 8;
      if (left > maxLeft) left = maxLeft;
      if (left < 8) left = 8;

      el.style.left = left + "px";
      el.style.top = top + "px";
      el.dataset.placement = placement;
    }

    function hideTip() {
      if (tipEl) tipEl.classList.remove("show");
      currentTarget = null;
    }

    document.addEventListener(
      "mouseover",
      (e) => {
        const target = e.target.closest(
          "#__cs_menu .setting-row label[data-tip], #__cs_menu .hp-row-label[data-tip]",
        );
        if (!target) return;
        if (target === currentTarget) return;
        showTip(target);
      },
      true,
    );

    document.addEventListener(
      "mouseout",
      (e) => {
        const target = e.target.closest(
          "#__cs_menu .setting-row label[data-tip], #__cs_menu .hp-row-label[data-tip]",
        );
        if (!target) return;
        const to = e.relatedTarget;
        if (to && target.contains(to)) return;
        hideTip();
      },
      true,
    );

    document.addEventListener("scroll", hideTip, true);
    document.addEventListener("mousedown", hideTip, true);

    document.addEventListener(
      "change",
      (e) => {
        if (e.target && e.target.id === "cs-menu-theme") {
          setTimeout(applyTheme, 0);
        }
      },
      true,
    );

    window.__csRefreshTooltipTheme = applyTheme;
  })();
})();

/*
  * Copyright © 2026 Celestar / thetalkingcat
  * ALL RIGHTS RESERVED

  * This source code is proprietary. Copying, reusing, modifying, redistributing with or without AI without explicit
  * permission from the creator (thetalkingcat) is strictly prohibited.

  * Permission is REQUIRED for any reuse.
*/
