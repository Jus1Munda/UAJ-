/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from 'react';

export interface NXCinematicCanvasProps {
  className?: string;
  layer: 'background' | 'foreground';
  triggerKey?: number;
  interactive?: boolean;
  isHovered?: boolean;
  reducedMotion?: boolean;
  density?: 'low' | 'normal' | 'high';
}

interface SakuraPetal {
  x: number;
  y: number;
  z: number; // -1 to 1 (depth)
  vx: number;
  vy: number;
  vz: number;
  scale: number;
  length: number;
  widthRatio: number;
  notchDepth: number;
  rotX: number;
  rotY: number;
  rotZ: number;
  vRotX: number;
  vRotY: number;
  vRotZ: number;
  alpha: number;
  targetAlpha: number;
  life: number;
  maxLife: number;
  isForeground: boolean;
  petalColor: {
    baseRose: string;
    bodyPink: string;
    paleHighlight: string;
    rimWhite: string;
  };
}

interface RibbonPoint {
  x: number;
  baseY: number;
  amp1: number;
  amp2: number;
  freq1: number;
  freq2: number;
  phase: number;
}

interface EnergyRibbon {
  colorStart: string;
  colorMid: string;
  colorEnd: string;
  width: number;
  opacity: number;
  speed: number;
  points: RibbonPoint[];
  glowWidth: number;
}

interface SparkParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  alpha: number;
  life: number;
  maxLife: number;
}

export const NXCinematicCanvas: React.FC<NXCinematicCanvasProps> = ({
  className = '',
  layer,
  triggerKey = 0,
  interactive = true,
  isHovered = false,
  reducedMotion = false,
  density = 'normal'
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // Keep state refs so render loop doesn't re-instantiate on re-renders
  const stateRef = useRef<{
    time: number;
    slashProgress: number; // 0 to 1 during active slash, > 1 when completed
    slashActive: boolean;
    slashStartTime: number;
    petals: SakuraPetal[];
    sparks: SparkParticle[];
    ribbons: EnergyRibbon[];
    lastTimestamp: number;
    isVisible: boolean;
    prevTriggerKey: number;
  }>({
    time: 0,
    slashProgress: 1.2,
    slashActive: false,
    slashStartTime: 0,
    petals: [],
    sparks: [],
    ribbons: [],
    lastTimestamp: 0,
    isVisible: true,
    prevTriggerKey: triggerKey
  });

  // Watch for external trigger triggers
  useEffect(() => {
    if (triggerKey !== stateRef.current.prevTriggerKey) {
      stateRef.current.prevTriggerKey = triggerKey;
      triggerSlashActivation();
    }
  }, [triggerKey]);

  // Hover can gently trigger slash or petal flutter if not currently slashing
  useEffect(() => {
    if (interactive && isHovered && !reducedMotion) {
      if (!stateRef.current.slashActive && stateRef.current.slashProgress >= 1) {
        triggerSlashActivation();
      }
    }
  }, [isHovered, interactive, reducedMotion]);

  const triggerSlashActivation = () => {
    const s = stateRef.current;
    s.slashActive = true;
    s.slashProgress = 0;
    s.slashStartTime = s.time;

    // Emit subtle initial burst spark flash at start of slash
    if (layer === 'foreground') {
      for (let i = 0; i < 8; i++) {
        const ang = Math.random() * Math.PI * 2;
        const spd = 1.2 + Math.random() * 2.5;
        s.sparks.push({
          x: 20 + (Math.random() - 0.5) * 12,
          y: 242 + (Math.random() - 0.5) * 12,
          vx: Math.cos(ang) * spd,
          vy: Math.sin(ang) * spd,
          color: Math.random() > 0.4 ? 'rgba(255, 183, 197, 0.7)' : 'rgba(255, 245, 247, 0.8)',
          size: 0.8 + Math.random() * 1.4,
          alpha: 0.8,
          life: 0,
          maxLife: 18 + Math.random() * 20
        });
      }
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Multiplier based on density
    const petalCountMultiplier = density === 'low' ? 0.35 : density === 'high' ? 1.1 : 0.85;

    // Initialize Ribbons (background only) - Restrained, translucent, no heavy fog
    if (layer === 'background') {
      const createRibbon = (
        colorStart: string,
        colorMid: string,
        colorEnd: string,
        width: number,
        opacity: number,
        speed: number,
        startY: number,
        endY: number
      ): EnergyRibbon => {
        const numPoints = 8;
        const pts: RibbonPoint[] = [];
        for (let i = 0; i < numPoints; i++) {
          const t = i / (numPoints - 1);
          pts.push({
            x: -20 + t * 560,
            baseY: startY + (endY - startY) * t,
            amp1: 14 + Math.random() * 16,
            amp2: 6 + Math.random() * 10,
            freq1: 0.7 + Math.random() * 0.6,
            freq2: 1.4 + Math.random() * 0.8,
            phase: Math.random() * Math.PI * 2
          });
        }
        return {
          colorStart,
          colorMid,
          colorEnd,
          width,
          opacity,
          speed,
          points: pts,
          glowWidth: width * 2.2
        };
      };

      stateRef.current.ribbons = [
        // 1. Deep royal violet silk ribbon (subtle & translucent)
        createRibbon(
          'rgba(88, 28, 135, 0)',
          'rgba(147, 51, 234, 0.22)',
          'rgba(59, 7, 100, 0)',
          10,
          0.22,
          0.55,
          110,
          220
        ),
        // 2. Cherry blossom pink energy trail
        createRibbon(
          'rgba(244, 63, 94, 0)',
          'rgba(251, 113, 133, 0.25)',
          'rgba(253, 164, 175, 0)',
          7,
          0.24,
          0.85,
          240,
          130
        ),
        // 3. Ethereal lavender mana ribbon looping behind letters
        createRibbon(
          'rgba(107, 33, 168, 0)',
          'rgba(192, 132, 252, 0.18)',
          'rgba(126, 34, 206, 0)',
          14,
          0.18,
          0.45,
          155,
          175
        ),
        // 4. Subtle electric blue wisp
        createRibbon(
          'rgba(0, 242, 254, 0)',
          'rgba(56, 189, 248, 0.2)',
          'rgba(14, 165, 233, 0)',
          3.5,
          0.18,
          1.1,
          215,
          255
        )
      ];
    }

    // Helper: Create a single sakura petal with natural variations
    const createPetal = (
      x?: number,
      y?: number,
      isSlashBurst: boolean = false
    ): SakuraPetal => {
      // Blade slash path: from (25, 240) to (500, 134)
      const slashT = Math.random();
      const defaultX = 25 + slashT * 475;
      const defaultY = 240 + slashT * -106 + (Math.random() - 0.5) * 36;

      const px = x !== undefined ? x : isSlashBurst ? defaultX : 20 + Math.random() * 480;
      const py = y !== undefined ? y : isSlashBurst ? defaultY : 50 + Math.random() * 240;

      // Depth: z in [-1, 1]
      const isFore = layer === 'foreground';
      const z = isFore ? 0.1 + Math.random() * 0.9 : -0.9 + Math.random() * 0.8;

      // Velocities: Natural aerodynamic drift along slash
      let vx = 0.6 + Math.random() * 1.4;
      let vy = -0.4 - Math.random() * 1.2;

      if (isSlashBurst) {
        const burstAngle = -0.22 + (Math.random() - 0.5) * 0.75;
        const burstSpeed = 1.8 + Math.random() * 2.8;
        vx = Math.cos(burstAngle) * burstSpeed;
        vy = Math.sin(burstAngle) * burstSpeed;
      }

      const vRotX = (Math.random() - 0.5) * 0.045;
      const vRotY = (Math.random() - 0.5) * 0.065;
      const vRotZ = (Math.random() - 0.5) * 0.04;

      const maxLife = isSlashBurst ? 170 + Math.random() * 140 : 240 + Math.random() * 180;

      return {
        x: px,
        y: py,
        z,
        vx,
        vy,
        vz: (Math.random() - 0.5) * 0.01,
        scale: 0.7 + Math.random() * 0.45 + (isFore ? 0.15 : -0.1),
        length: 11 + Math.random() * 5,
        widthRatio: 0.7 + Math.random() * 0.22,
        notchDepth: 0.25 + Math.random() * 0.25,
        rotX: Math.random() * Math.PI * 2,
        rotY: Math.random() * Math.PI * 2,
        rotZ: Math.random() * Math.PI * 2,
        vRotX,
        vRotY,
        vRotZ,
        alpha: 0,
        targetAlpha: (0.45 + Math.random() * 0.3) * (isFore ? 1 : 0.75),
        life: 0,
        maxLife,
        isForeground: isFore,
        petalColor: {
          baseRose: '#f43f5e',
          bodyPink: '#fb7185',
          paleHighlight: '#fbcfe8',
          rimWhite: '#fff5f7'
        }
      };
    };

    // Seed initial ambient petals (balanced density)
    const initialAmbientCount = Math.round(
      (layer === 'foreground' ? 14 : 10) * petalCountMultiplier
    );
    stateRef.current.petals = [];
    for (let i = 0; i < initialAmbientCount; i++) {
      const p = createPetal(undefined, undefined, false);
      p.life = Math.random() * p.maxLife * 0.8;
      p.alpha = p.targetAlpha;
      stateRef.current.petals.push(p);
    }

    // Trigger initial activation once on mount
    triggerSlashActivation();

    // Intersection Observer to avoid processing when scrolled out of view
    const observer = new IntersectionObserver(
      (entries) => {
        stateRef.current.isVisible = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    let lastTime = performance.now();

    const render = (now: number) => {
      animFrameRef.current = requestAnimationFrame(render);

      if (!stateRef.current.isVisible || reducedMotion) {
        return;
      }

      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      const s = stateRef.current;
      s.time += dt;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      const displayWidth = Math.max(rect.width, 10);
      const displayHeight = Math.max(rect.height, 10);

      const targetW = Math.round(displayWidth * dpr);
      const targetH = Math.round(displayHeight * dpr);

      if (canvas.width !== targetW || canvas.height !== targetH) {
        canvas.width = targetW;
        canvas.height = targetH;
      }

      ctx.save();
      ctx.scale(targetW / 520, targetH / 340);
      ctx.clearRect(0, 0, 520, 340);

      // -------------------------------------------------------------
      // 1. UPDATE SLASH ACTIVATION PROGRESS & SPAWN TRAIL PETALS
      // -------------------------------------------------------------
      if (s.slashActive) {
        s.slashProgress += dt * 1.35;

        const curT = Math.min(s.slashProgress, 1.0);
        const slashX = 15 + curT * 490;
        const slashY = 242 - curT * 112;

        if (s.slashProgress <= 1.0) {
          const spawnCount = Math.round((layer === 'foreground' ? 2 : 1) * petalCountMultiplier);
          for (let k = 0; k < spawnCount; k++) {
            const spawnX = slashX + (Math.random() - 0.5) * 20;
            const spawnY = slashY + (Math.random() - 0.5) * 16;
            s.petals.push(createPetal(spawnX, spawnY, true));
          }

          if (layer === 'foreground') {
            const spAngle = -0.3 + (Math.random() - 0.5) * 1.2;
            const spd = 1.5 + Math.random() * 3;
            s.sparks.push({
              x: slashX,
              y: slashY,
              vx: Math.cos(spAngle) * spd,
              vy: Math.sin(spAngle) * spd,
              color: Math.random() > 0.3 ? 'rgba(255, 245, 247, 0.7)' : 'rgba(255, 183, 197, 0.65)',
              size: 0.8 + Math.random() * 1.4,
              alpha: 0.75,
              life: 0,
              maxLife: 14 + Math.random() * 16
            });
          }
        } else {
          s.slashActive = false;
        }
      }

      // -------------------------------------------------------------
      // 2. RENDER ENERGY RIBBONS (BACKGROUND LAYER — NATURAL & SEAMLESS)
      // -------------------------------------------------------------
      if (layer === 'background') {
        ctx.save();
        ctx.globalCompositeOperation = 'screen';

        s.ribbons.forEach((ribbon) => {
          ctx.beginPath();
          const pts = ribbon.points;

          const curCoords: { x: number; y: number }[] = pts.map((pt, idx) => {
            const wave1 = Math.sin(s.time * ribbon.speed + pt.freq1 * idx + pt.phase) * pt.amp1;
            const wave2 = Math.cos(s.time * ribbon.speed * 0.7 + pt.freq2 * idx) * pt.amp2;
            const surge = s.slashActive ? 6 * Math.sin(s.slashProgress * Math.PI) : 0;
            return {
              x: pt.x,
              y: pt.baseY + wave1 + wave2 + surge
            };
          });

          ctx.moveTo(curCoords[0].x, curCoords[0].y);
          for (let i = 1; i < curCoords.length - 1; i++) {
            const xc = (curCoords[i].x + curCoords[i + 1].x) / 2;
            const yc = (curCoords[i].y + curCoords[i + 1].y) / 2;
            ctx.quadraticCurveTo(curCoords[i].x, curCoords[i].y, xc, yc);
          }
          const lastPt = curCoords[curCoords.length - 1];
          ctx.lineTo(lastPt.x, lastPt.y);

          const grad = ctx.createLinearGradient(0, 100, 520, 240);
          grad.addColorStop(0, ribbon.colorStart);
          grad.addColorStop(0.5, ribbon.colorMid);
          grad.addColorStop(1, ribbon.colorEnd);

          // Translucent outer aura stroke without heavy canvas blur
          ctx.strokeStyle = grad;
          ctx.lineWidth = ribbon.glowWidth;
          ctx.stroke();

          // Core thread stroke
          ctx.lineWidth = ribbon.width;
          ctx.stroke();
        });

        ctx.restore();
      }

      // -------------------------------------------------------------
      // 3. RENDER SPARKS (FOREGROUND LAYER)
      // -------------------------------------------------------------
      if (layer === 'foreground' && s.sparks.length > 0) {
        ctx.save();
        ctx.globalCompositeOperation = 'lighter';

        for (let i = s.sparks.length - 1; i >= 0; i--) {
          const sp = s.sparks[i];
          sp.life++;
          sp.x += sp.vx;
          sp.y += sp.vy;
          sp.vx *= 0.94;
          sp.vy *= 0.94;
          sp.alpha = (1 - sp.life / sp.maxLife) * 0.7;

          if (sp.life >= sp.maxLife || sp.alpha <= 0) {
            s.sparks.splice(i, 1);
            continue;
          }

          ctx.fillStyle = sp.color;
          ctx.globalAlpha = Math.max(0, sp.alpha);
          ctx.beginPath();
          ctx.arc(sp.x, sp.y, sp.size, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      // -------------------------------------------------------------
      // 4. RENDER SAKURA PETALS (DELICATE, NATURAL TRANSLUCENCY)
      // -------------------------------------------------------------
      const maxAllowedPetals = Math.round(
        (layer === 'foreground' ? 28 : 18) * petalCountMultiplier
      );

      if (s.petals.length < maxAllowedPetals && Math.random() < 0.1) {
        s.petals.push(createPetal(undefined, undefined, false));
      }

      for (let i = s.petals.length - 1; i >= 0; i--) {
        const p = s.petals[i];
        p.life++;

        const sway = Math.sin(s.time * 2.0 + p.x * 0.02) * 0.4;
        p.x += p.vx + sway;
        p.y += p.vy;

        p.vx = p.vx * 0.985 + 0.015 * 0.7;
        p.vy = p.vy * 0.985 + 0.015 * -0.35;

        p.rotX += p.vRotX;
        p.rotY += p.vRotY;
        p.rotZ += p.vRotZ;

        const fadeInFrac = 0.15;
        const fadeOutFrac = 0.25;
        const normLife = p.life / p.maxLife;

        if (normLife < fadeInFrac) {
          p.alpha = (normLife / fadeInFrac) * p.targetAlpha;
        } else if (normLife > 1 - fadeOutFrac) {
          p.alpha = ((1 - normLife) / fadeOutFrac) * p.targetAlpha;
        } else {
          p.alpha = p.targetAlpha;
        }

        if (p.life >= p.maxLife || p.x > 560 || p.y < -30 || p.x < -40 || p.y > 380) {
          s.petals.splice(i, 1);
          continue;
        }

        // Draw realistic Sakura Petal
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotZ);

        const curl = Math.cos(p.rotY);
        const pitch = Math.sin(p.rotX);
        const scaleX = Math.max(0.12, Math.abs(curl)) * p.scale;
        const scaleY = (0.75 + Math.abs(pitch) * 0.25) * p.scale;
        ctx.scale(scaleX, scaleY);

        ctx.globalAlpha = Math.max(0, Math.min(1, p.alpha));

        const len = p.length;
        const w = len * p.widthRatio;

        const grad = ctx.createLinearGradient(0, len * 0.6, 0, -len * 0.6);
        if (curl >= 0) {
          grad.addColorStop(0, p.petalColor.baseRose);
          grad.addColorStop(0.35, p.petalColor.bodyPink);
          grad.addColorStop(0.8, p.petalColor.paleHighlight);
          grad.addColorStop(1, p.petalColor.rimWhite);
        } else {
          grad.addColorStop(0, '#be185d');
          grad.addColorStop(0.4, '#e11d48');
          grad.addColorStop(0.85, '#f472b6');
          grad.addColorStop(1, '#fce7f3');
        }

        ctx.fillStyle = grad;
        ctx.beginPath();

        const notchY = -len * 0.55 * (1 - p.notchDepth * 0.25);
        ctx.moveTo(0, len * 0.65);
        ctx.bezierCurveTo(-w * 0.85, len * 0.35, -w * 0.95, -len * 0.3, -w * 0.45, -len * 0.65);
        ctx.quadraticCurveTo(0, notchY, w * 0.45, -len * 0.65);
        ctx.bezierCurveTo(w * 0.95, -len * 0.3, w * 0.85, len * 0.35, 0, len * 0.65);
        ctx.closePath();
        ctx.fill();

        // Subtle soft rim (delicate and natural, no harsh white stroke)
        ctx.strokeStyle = 'rgba(255, 240, 245, 0.25)';
        ctx.lineWidth = 0.4 / p.scale;
        ctx.stroke();

        ctx.restore();
      }

      ctx.restore();
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
      observer.disconnect();
    };
  }, [layer, density, reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{
        display: 'block',
        background: 'transparent'
      }}
    />
  );
};
