import GameEnvBackground from '/assets/js/GameEnginev1.1/essentials/GameEnvBackground.js';
import Player from '/assets/js/GameEnginev1.1/essentials/Player.js';
import GameObject from '/assets/js/GameEnginev1.1/essentials/GameObject.js';

class RemotePlayerVisualizer extends GameObject {
    constructor(data = null, gameEnv = null) {
        super(gameEnv);
        this.remotePlayersRef = data?.remotePlayers || {};
        this.tagStateRef = data.tagState;
        this.myIdRef = data.myIdRef;
        this.SCALE_FACTOR = 3.5;
        this.frameWidth = 569 / 13;
        this.frameHeight = 36;
        this.spriteImage = null;
    }

    update() {
        if (!this.spriteImage) {
            const img = new Image();
            img.src = "/images/gamebuilder/sprites/kirby.png";
            this.spriteImage = img;
        }
        this.draw();
    }

    draw() {
        if (!this.spriteImage?.complete) return;
        const ctx = this.gameEnv.ctx;
        const drawWidth = this.frameWidth * this.SCALE_FACTOR;
        const drawHeight = this.frameHeight * this.SCALE_FACTOR;

        for (const sid in this.remotePlayersRef) {
            const p = this.remotePlayersRef[sid];
            const isIt = this.tagStateRef.taggerId === sid;

            ctx.drawImage(
                this.spriteImage,
                0, 0,
                this.frameWidth, this.frameHeight,
                p.x, p.y,
                drawWidth, drawHeight
            );

            // Red overlay if this remote player is "it"
            if (isIt) {
                ctx.save();
                ctx.globalAlpha = 0.45;
                ctx.fillStyle = 'red';
                ctx.fillRect(p.x, p.y, drawWidth, drawHeight);
                ctx.restore();

                ctx.save();
                ctx.setTransform(1, 0, 0, 1, 0, 0);
                ctx.globalAlpha = 1.0;
                ctx.font = 'bold 14px Arial';
                ctx.textAlign = 'left';
                ctx.textBaseline = 'top';
                ctx.fillStyle = 'red';
                ctx.fillText('IT', p.x + drawWidth / 2 - 8, p.y - 18);
                ctx.restore();
            }
        }
    }

    resize() {}
    destroy() { this.spriteImage = null; }
}

class TagHUD extends GameObject {
    constructor(data = null, gameEnv = null) {
        super(gameEnv);
        this.tagStateRef = data.tagState;
        this.myIdRef = data.myIdRef;
        this._flashStart = null;
        this._wasIt = false;
    }

    update() {
        const isIt = this.tagStateRef.taggerId === this.myIdRef.value;

        // Trigger flash animation the moment you become "it"
        if (isIt && !this._wasIt) {
            this._flashStart = Date.now();
        }
        this._wasIt = isIt;

        this.draw();
    }

    draw() {
        const isIt = this.tagStateRef.taggerId === this.myIdRef.value;
        const ctx = this.gameEnv.ctx;
        const W = this.gameEnv.innerWidth;
        const H = this.gameEnv.innerHeight;
        const now = Date.now();
        const gracePeriod = 2000;
        const timeSinceIt = now - (this.tagStateRef.becameItAt ?? 0);
        const inGrace = timeSinceIt < gracePeriod;

        if (isIt) {
            // Pulsing red border
            const pulse = 0.5 + 0.5 * Math.sin(now / 300);
            ctx.save();
            ctx.strokeStyle = `rgba(255, 30, 30, ${0.4 + 0.5 * pulse})`;
            ctx.lineWidth = 18;
            ctx.strokeRect(0, 0, W, H);
            ctx.restore();

            // Flash overlay on tag transfer
            if (this._flashStart) {
                const elapsed = now - this._flashStart;
                const flashDuration = 600;
                if (elapsed < flashDuration) {
                    const alpha = 0.45 * (1 - elapsed / flashDuration);
                    ctx.save();
                    ctx.fillStyle = `rgba(255, 0, 0, ${alpha})`;
                    ctx.fillRect(0, 0, W, H);
                    ctx.restore();
                } else {
                    this._flashStart = null;
                }
            }

            // "YOU ARE IT" banner
            ctx.save();
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.globalAlpha = 1.0;
            ctx.globalCompositeOperation = 'source-over';
            ctx.font = 'bold 28px Arial';
            ctx.textAlign = 'left';
            ctx.textBaseline = 'top';
            const bannerText = '👆 YOU ARE IT';
            const bannerX = W / 2 - 100;
            const bannerY = 16;
            const bannerMetrics = ctx.measureText(bannerText);
            ctx.fillStyle = 'rgba(0, 0, 0, 0.55)';
            ctx.fillRect(bannerX - 10, bannerY - 4, bannerMetrics.width + 20, 36);
            ctx.fillStyle = '#ff2222';
            ctx.fillText(bannerText, bannerX, bannerY);
            ctx.restore();

            // Grace period countdown
            if (inGrace) {
                const secondsLeft = Math.ceil((gracePeriod - timeSinceIt) / 1000);
                ctx.save();
                ctx.setTransform(1, 0, 0, 1, 0, 0);
                ctx.globalAlpha = 1.0;
                ctx.globalCompositeOperation = 'source-over';
                ctx.font = 'bold 22px Arial';
                ctx.textAlign = 'left';
                ctx.textBaseline = 'top';
                const graceText = `🛡️ grace period: ${secondsLeft}s`;
                const graceMetrics = ctx.measureText(graceText);
                const graceX = W / 2 - 110;
                const graceY = 58;
                ctx.fillStyle = 'rgba(0, 0, 0, 0.55)';
                ctx.fillRect(graceX - 10, graceY - 4, graceMetrics.width + 20, 32);
                ctx.fillStyle = '#ffcc00';
                ctx.fillText(graceText, graceX, graceY);
                ctx.restore();
            }

        } else {
            // Safe indicator for non-it players
            ctx.save();
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.globalAlpha = 1.0;
            ctx.globalCompositeOperation = 'source-over';
            ctx.font = '16px Arial';
            ctx.textAlign = 'left';
            ctx.textBaseline = 'top';
            ctx.fillStyle = 'rgba(255,255,255,0.7)';
            ctx.fillText('✅ safe', W / 2 - 28, 12);
            ctx.restore();
        }
    }

    resize() {}
    destroy() {}
}

class TagCollisionDetector extends GameObject {
    constructor(data = null, gameEnv = null) {
        super(gameEnv);
        this.socket = data.socket;
        this.remotePlayersRef = data.remotePlayers;
        this.tagStateRef = data.tagState;
        this.myIdRef = data.myIdRef;
        this.playerInstance = null;
        this.tagCooldownUntil = 0;
        this.tagCooldownDuration = 2000;
        this.hitRadius = 30;
    }

    _getCenter(x, y, w, h) {
        return { cx: x + w / 2, cy: y + h / 2 };
    }

    update() {
        if (!this.playerInstance) {
            this.playerInstance = this.gameEnv?.gameObjects?.find(
                obj => obj instanceof Player
            );
        }
        if (!this.playerInstance) return;

        const myId = this.myIdRef.value;
        if (!myId || this.tagStateRef.taggerId !== myId) return;

        const now = Date.now();

        // Block tagging during grace period
        const gracePeriod = 2000;
        const timeSinceIt = now - (this.tagStateRef.becameItAt ?? 0);
        if (timeSinceIt < gracePeriod) return;

        if (now < this.tagCooldownUntil) return;

        const px = this.playerInstance.position?.x ?? this.playerInstance.x;
        const py = this.playerInstance.position?.y ?? this.playerInstance.y;
        const pw = this.playerInstance.width ?? 50;
        const ph = this.playerInstance.height ?? 50;
        const local = this._getCenter(px, py, pw, ph);

        const spriteW = (569 / 13) * 3.5;
        const spriteH = 36 * 3.5;
        const shrink = 0.2;
        const shrunkW = spriteW * shrink;
        const shrunkH = spriteH * shrink;

        for (const sid in this.remotePlayersRef) {
            const rp = this.remotePlayersRef[sid];
            const remote = this._getCenter(
                rp.x + (spriteW - shrunkW) / 2,
                rp.y + (spriteH - shrunkH) / 2,
                shrunkW,
                shrunkH
            );

            const dx = local.cx - remote.cx;
            const dy = local.cy - remote.cy;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < this.hitRadius * 2) {
                console.log(`[TAG] Tagged ${sid} at distance ${dist.toFixed(1)}`);
                this.socket.emit("tag", { taggedId: sid });
                this.tagCooldownUntil = now + this.tagCooldownDuration;
                break;
            }
        }
    }

    draw() {}
    resize() {}
    destroy() {}
}

class NetworkSynchronizer extends GameObject {
    constructor(data = null, gameEnv = null) {
        super(gameEnv);
        this.socket = data?.socket;
        this.playerInstance = null;
        this.lastEmit = 0;
        this.emitDelay = 50;
    }

    update() {
        if (!this.playerInstance) {
            this.playerInstance = this.gameEnv?.gameObjects?.find(
                obj => obj instanceof Player
            );
        }
        if (!this.playerInstance || !this.socket) return;

        const now = Date.now();
        if (now - this.lastEmit < this.emitDelay) return;

        this.socket.emit("move", {
            x: this.playerInstance.position?.x ?? this.playerInstance.x,
            y: this.playerInstance.position?.y ?? this.playerInstance.y
        });
        this.lastEmit = now;
    }

    draw() {}
    resize() {}
    destroy() {}
}

class GameLevelMultiplayer {
    constructor(gameEnv) {
        const path = gameEnv.path;
        const width = gameEnv.innerWidth;
        const height = gameEnv.innerHeight;

        const socket = io("ws://localhost:8590", { transports: ["websocket"] });

        const myIdRef = { value: null };
        const remotePlayers = {};
        const tagState = { taggerId: null, becameItAt: 0 };

        socket.on("connect", () => {
            console.log("connected:", socket.id);
            myIdRef.value = socket.id;
        });

        socket.on("player_update", (data) => {
            if (!data?.players) return;
            const players = data.players;

            if (data.taggerId !== undefined) {
                tagState.taggerId = data.taggerId;
            }

            for (const sid in players) {
                if (sid === socket.id) continue;
                if (!remotePlayers[sid]) {
                    remotePlayers[sid] = { x: players[sid].x, y: players[sid].y };
                } else {
                    remotePlayers[sid].x = players[sid].x;
                    remotePlayers[sid].y = players[sid].y;
                }
            }

            for (const sid in remotePlayers) {
                if (!players[sid]) delete remotePlayers[sid];
            }
        });

        socket.on("tag_update", (data) => {
            tagState.taggerId = data.taggerId;
            // Record the moment this client became "it" for grace period
            if (data.taggerId === myIdRef.value) {
                tagState.becameItAt = Date.now();
                console.log("You are now IT!");
            }
        });

        socket.on("player_left", (data) => {
            delete remotePlayers[data.sid];
        });

        socket.on("disconnect", () => {
            console.log("disconnected from server");
        });

        const bgData = {
            name: "custom_bg",
            src: path + "/images/gamebuilder/bg/Arena.png",
            pixels: { height: 720, width: 1280 }
        };

        const playerData = {
            id: 'playerData',
            greeting: 'Hi',
            src: '/images/gamebuilder/sprites/kirby.png',
            SCALE_FACTOR: 10,
            STEP_FACTOR: 1000,
            ANIMATION_RATE: 20,
            INIT_POSITION: { x: width * 0.1, y: height * 0.3 },
            pixels: { height: 36, width: 569 },
            orientation: { rows: 1, columns: 13 },
            down: { row: 0, start: 0, columns: 3 },
            left: { row: 0, start: 0, columns: 3 },
            right: { row: 0, start: 0, columns: 3 },
            up: { row: 0, start: 0, columns: 3 },
            upLeft: { row: 0, start: 0, columns: 3 },
            upRight: { row: 0, start: 0, columns: 3 },
            hitbox: { widthPercentage: 0.2, heightPercentage: 0.2 },
            keypress: { up: 87, left: 65, down: 83, right: 68 },
        };

        this.classes = [
            { class: GameEnvBackground, data: bgData },
            { class: Player, data: playerData },
            { class: NetworkSynchronizer, data: { socket } },
            { class: TagCollisionDetector, data: { socket, remotePlayers, tagState, myIdRef } },
            { class: RemotePlayerVisualizer, data: { remotePlayers, tagState, myIdRef } },
            { class: TagHUD, data: { tagState, myIdRef } },
        ];
    }
}

export default GameLevelMultiplayer;