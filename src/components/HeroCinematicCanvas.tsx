/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from 'react';

export interface HeroCinematicCanvasProps {
  className?: string;
  heroRef: React.RefObject<HTMLElement | null>;
  logoRef: React.RefObject<HTMLElement | null>;
  triggerKey?: number;
  reducedMotion?: boolean;
  onSlashTriggered?: () => void;
}

interface SakuraPetal {
  x: number;
  y: number;
  vx: number;
  vy: number;
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
  petalColor: {
    baseRose: string;
    bodyPink: string;
    paleHighlight: string;
    rimWhite: string;
  };
}

interface RibbonPoint {
  xRatio: number; // 0 to 1 across hero width
  baseYRatio: number; // 0 to 1 across hero height
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
  glowWidth: number;
  opacity: number;
  speed: number;
  points: RibbonPoint[];
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

interface SwipeTrailPoint {
  x: number;
  y: number;
  alpha: number;
  life: number;
  maxLife: number;
  width: number;
}

export const HeroCinematicCanvas: React.FC<HeroCinematicCanvasProps> = ({
  className = '',
  heroRef,
  logoRef,
  triggerKey = 0,
  reducedMotion = false,
  onSlashTriggered
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);

  const stateRef = useRef<{
    time: number;
    slashProgress: number;
    slashActive: boolean;
    petals: SakuraPetal[];
    sparks: SparkParticle[];
    ribbons: EnergyRibbon[];
    swipeTrails: SwipeTrailPoint[];
    flashAlpha: number;
    isVisible: boolean;
    prevTriggerKey: number;
    width: number;
    height: number;
    lastPointerPos: { x: number; y: number } | null;
    lastSwipeTime: number;
  }>({
    time: 0,
    slashProgress: 1.2,
    slashActive: false,
    petals: [],
    sparks: [],
    ribbons: [],
    swipeTrails: [],
    flashAlpha: 0,
    isVisible: true,
    prevTriggerKey: triggerKey,
    width: 1200,
    height: 700,
    lastPointerPos: null,
    lastSwipeTime: 0
  });

  // Watch for external trigger triggers (e.g. click on logo, page load)
  useEffect(() => {
    if (triggerKey !== stateRef.current.prevTriggerKey) {
      stateRef.current.prevTriggerKey = triggerKey;
      triggerSlashActivation();
    }
  }, [triggerKey]);

  const triggerSlashActivation = (burstOrigin?: { x: number; y: number; dirX?: number; dirY?: number }) => {
    const s = stateRef.current;
    s.slashActive = true;
    s.slashProgress = 0;
    s.flashAlpha = 1.0;

    const coords = getSlashCoords();
    const originX = burstOrigin ? burstOrigin.x : (coords.startX + coords.endX) / 2;
    const originY = burstOrigin ? burstOrigin.y : (coords.startY + coords.endY) / 2;

    // Emit initial sparks along the slash
    for (let i = 0; i < 18; i++) {
      const ang = -0.3 + (Math.random() - 0.5) * 1.8;
      const spd = 2.5 + Math.random() * 4.5;
      s.sparks.push({
        x: (burstOrigin ? burstOrigin.x : coords.startX) + (Math.random() - 0.5) * 18,
        y: (burstOrigin ? burstOrigin.y : coords.startY) + (Math.random() - 0.5) * 18,
        vx: Math.cos(ang) * spd,
        vy: Math.sin(ang) * spd,
        color: Math.random() > 0.35 ? '#ffe4e6' : '#f43f5e',
        size: 1.2 + Math.random() * 1.8,
        alpha: 0.95,
        life: 0,
        maxLife: 24 + Math.random() * 20
      });
    }

    // Emit rich burst of cherry blossom petals
    const isMobile = window.innerWidth < 640;
    const burstCount = isMobile ? 24 : 38;

    for (let k = 0; k < burstCount; k++) {
      // 60% follow swipe or slash direction, 40% swirl around logo
      const isDirectional = k < burstCount * 0.6;
      let pvx: number;
      let pvy: number;

      if (isDirectional && burstOrigin && burstOrigin.dirX !== undefined && burstOrigin.dirY !== undefined) {
        const swipeAng = Math.atan2(burstOrigin.dirY, burstOrigin.dirX);
        const fanAng = swipeAng + (Math.random() - 0.5) * 1.1;
        const spd = 3.2 + Math.random() * 5.0;
        pvx = Math.cos(fanAng) * spd;
        pvy = Math.sin(fanAng) * spd;
      } else {
        const slashAng = -0.25 + (Math.random() - 0.5) * 1.0;
        const spd = 2.5 + Math.random() * 4.5;
        pvx = Math.cos(slashAng) * spd;
        pvy = Math.sin(slashAng) * spd;
      }

      const spawnT = Math.random();
      const px = burstOrigin
        ? originX + (Math.random() - 0.5) * 36
        : coords.startX + spawnT * (coords.endX - coords.startX) + (Math.random() - 0.5) * 24;
      const py = burstOrigin
        ? originY + (Math.random() - 0.5) * 36
        : coords.startY + spawnT * (coords.endY - coords.startY) + (Math.random() - 0.5) * 24;

      s.petals.push({
        x: px,
        y: py,
        vx: pvx,
        vy: pvy,
        scale: 0.75 + Math.random() * 0.55,
        length: 12 + Math.random() * 6,
        widthRatio: 0.7 + Math.random() * 0.22,
        notchDepth: 0.25 + Math.random() * 0.25,
        rotX: Math.random() * Math.PI * 2,
        rotY: Math.random() * Math.PI * 2,
        rotZ: Math.random() * Math.PI * 2,
        vRotX: (Math.random() - 0.5) * 0.055,
        vRotY: (Math.random() - 0.5) * 0.075,
        vRotZ: (Math.random() - 0.5) * 0.045,
        alpha: 0,
        targetAlpha: 0.55 + Math.random() * 0.35,
        life: 0,
        maxLife: 220 + Math.random() * 180,
        petalColor: {
          baseRose: '#e11d48',
          bodyPink: '#fb7185',
          paleHighlight: '#fecdd3',
          rimWhite: '#fff0f5'
        }
      });
    }
  };

  const getSlashCoords = () => {
    const heroEl = heroRef.current;
    const logoEl = logoRef.current;
    const s = stateRef.current;

    if (!heroEl || !logoEl) {
      return {
        startX: s.width * 0.38,
        startY: s.height * 0.35,
        endX: s.width * 0.62,
        endY: s.height * 0.22
      };
    }

    const heroRect = heroEl.getBoundingClientRect();
    const logoRect = logoEl.getBoundingClientRect();

    const logoX = logoRect.left - heroRect.left;
    const logoY = logoRect.top - heroRect.top;
    const logoW = logoRect.width;
    const logoH = logoRect.height;

    // Monogram blade slash goes from (14/520, 238/340) to (506/520, 132/340)
    return {
      startX: logoX + (14 / 520) * logoW,
      startY: logoY + (238 / 340) * logoH,
      endX: logoX + (506 / 520) * logoW,
      endY: logoY + (132 / 340) * logoH
    };
  };

  // -------------------------------------------------------------
  // INTERACTIVE MOUSE / TOUCH SWIPE ACROSS BLADE DETECTION
  // -------------------------------------------------------------
  useEffect(() => {
    const heroEl = heroRef.current;
    if (!heroEl) return;

    // Check intersection between segment P1->P2 and blade segment A->B
    const lineCrossesBlade = (
      p1x: number,
      p1y: number,
      p2x: number,
      p2y: number,
      ax: number,
      ay: number,
      bx: number,
      by: number
    ): boolean => {
      const ccw = (x1: number, y1: number, x2: number, y2: number, x3: number, y3: number) => {
        return (y3 - y1) * (x2 - x1) > (y2 - y1) * (x3 - x1);
      };
      return (
        ccw(p1x, p1y, ax, ay, bx, by) !== ccw(p2x, p2y, ax, ay, bx, by) &&
        ccw(p1x, p1y, p2x, p2y, ax, ay) !== ccw(p1x, p1y, p2x, p2y, bx, by)
      );
    };

    // Calculate distance from point P to line segment A->B
    const distToSegment = (
      px: number,
      py: number,
      ax: number,
      ay: number,
      bx: number,
      by: number
    ): number => {
      const dx = bx - ax;
      const dy = by - ay;
      const l2 = dx * dx + dy * dy;
      if (l2 === 0) return Math.hypot(px - ax, py - ay);
      let t = ((px - ax) * dx + (py - ay) * dy) / l2;
      t = Math.max(0, Math.min(1, t));
      return Math.hypot(px - (ax + t * dx), py - (ay + t * dy));
    };

    const handlePointerTrack = (clientX: number, clientY: number) => {
      const s = stateRef.current;
      const heroRect = heroEl.getBoundingClientRect();
      const curX = clientX - heroRect.left;
      const curY = clientY - heroRect.top;

      if (!s.lastPointerPos) {
        s.lastPointerPos = { x: curX, y: curY };
        return;
      }

      const prevX = s.lastPointerPos.x;
      const prevY = s.lastPointerPos.y;
      const vx = curX - prevX;
      const vy = curY - prevY;
      const speed = Math.hypot(vx, vy);

      s.lastPointerPos = { x: curX, y: curY };

      // Blade coordinates
      const coords = getSlashCoords();
      const crossed = lineCrossesBlade(prevX, prevY, curX, curY, coords.startX, coords.startY, coords.endX, coords.endY);
      const nearBlade = distToSegment(curX, curY, coords.startX, coords.startY, coords.endX, coords.endY) < 38;

      const now = performance.now();
      const cooldownMs = 280; // Sensible cooldown between slash bursts

      // If swipe crosses blade or moves rapidly near blade
      if ((crossed || (nearBlade && speed > 2.8)) && now - s.lastSwipeTime > cooldownMs) {
        s.lastSwipeTime = now;

        // Add energetic swipe trail along the cursor path
        s.swipeTrails.push({
          x: curX,
          y: curY,
          alpha: 1.0,
          life: 0,
          maxLife: 20,
          width: 5
        });

        // Trigger the Cherry Blossom burst and notify parent to flare the blade
        triggerSlashActivation({ x: curX, y: curY, dirX: vx, dirY: vy });
        if (onSlashTriggered) {
          onSlashTriggered();
        }
      } else if (nearBlade && speed > 1.2) {
        // Faint pink blade trail when gliding near the blade
        s.swipeTrails.push({
          x: curX,
          y: curY,
          alpha: 0.6,
          life: 0,
          maxLife: 15,
          width: 3
        });
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      handlePointerTrack(e.clientX, e.clientY);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches && e.touches[0]) {
        handlePointerTrack(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const onPointerLeave = () => {
      stateRef.current.lastPointerPos = null;
    };

    heroEl.addEventListener('pointermove', onPointerMove, { passive: true });
    heroEl.addEventListener('pointerleave', onPointerLeave, { passive: true });
    heroEl.addEventListener('touchmove', onTouchMove, { passive: true });
    heroEl.addEventListener('touchend', onPointerLeave, { passive: true });

    return () => {
      heroEl.removeEventListener('pointermove', onPointerMove);
      heroEl.removeEventListener('pointerleave', onPointerLeave);
      heroEl.removeEventListener('touchmove', onTouchMove);
      heroEl.removeEventListener('touchend', onPointerLeave);
    };
  }, [onSlashTriggered]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Helper: Create Ribbons spanning the entire Hero width (0 to 1 ratio)
    const createHeroRibbon = (
      colorStart: string,
      colorMid: string,
      colorEnd: string,
      width: number,
      opacity: number,
      speed: number,
      startRatioY: number,
      endRatioY: number
    ): EnergyRibbon => {
      const numPoints = 12;
      const pts: RibbonPoint[] = [];
      for (let i = 0; i < numPoints; i++) {
        const t = i / (numPoints - 1);
        pts.push({
          xRatio: -0.08 + t * 1.16,
          baseYRatio: startRatioY + (endRatioY - startRatioY) * t,
          amp1: 18 + Math.random() * 24,
          amp2: 10 + Math.random() * 16,
          freq1: 0.6 + Math.random() * 0.5,
          freq2: 1.2 + Math.random() * 0.6,
          phase: Math.random() * Math.PI * 2
        });
      }
      return {
        colorStart,
        colorMid,
        colorEnd,
        width,
        glowWidth: width * 2.2,
        opacity,
        speed,
        points: pts
      };
    };

    stateRef.current.ribbons = [
      // 1. Royal Violet Silk Ribbon
      createHeroRibbon(
        'rgba(88, 28, 135, 0)',
        'rgba(147, 51, 234, 0.18)',
        'rgba(59, 7, 100, 0)',
        12,
        0.18,
        0.45,
        0.22,
        0.42
      ),
      // 2. Cherry Blossom Rose Energy Stream
      createHeroRibbon(
        'rgba(244, 63, 94, 0)',
        'rgba(251, 113, 133, 0.24)',
        'rgba(253, 164, 175, 0)',
        8,
        0.24,
        0.75,
        0.42,
        0.18
      ),
      // 3. Ethereal Lavender Mana Ribbon
      createHeroRibbon(
        'rgba(107, 33, 168, 0)',
        'rgba(192, 132, 252, 0.16)',
        'rgba(126, 34, 206, 0)',
        14,
        0.16,
        0.4,
        0.32,
        0.35
      ),
      // 4. Electric Blue Filament Accent
      createHeroRibbon(
        'rgba(0, 242, 254, 0)',
        'rgba(56, 189, 248, 0.18)',
        'rgba(14, 165, 233, 0)',
        4,
        0.18,
        0.95,
        0.45,
        0.52
      )
    ];

    // Helper: Create ambient sakura petal
    const createPetal = (spawnX?: number, spawnY?: number): SakuraPetal => {
      const s = stateRef.current;
      const px = spawnX !== undefined ? spawnX : Math.random() * s.width;
      const py = spawnY !== undefined ? spawnY : Math.random() * s.height;

      return {
        x: px,
        y: py,
        vx: 0.8 + Math.random() * 1.5,
        vy: -0.4 - Math.random() * 1.2,
        scale: 0.75 + Math.random() * 0.5,
        length: 12 + Math.random() * 6,
        widthRatio: 0.7 + Math.random() * 0.22,
        notchDepth: 0.25 + Math.random() * 0.25,
        rotX: Math.random() * Math.PI * 2,
        rotY: Math.random() * Math.PI * 2,
        rotZ: Math.random() * Math.PI * 2,
        vRotX: (Math.random() - 0.5) * 0.045,
        vRotY: (Math.random() - 0.5) * 0.065,
        vRotZ: (Math.random() - 0.5) * 0.04,
        alpha: 0,
        targetAlpha: 0.45 + Math.random() * 0.35,
        life: 0,
        maxLife: 280 + Math.random() * 220,
        petalColor: {
          baseRose: '#e11d48',
          bodyPink: '#fb7185',
          paleHighlight: '#fecdd3',
          rimWhite: '#fff0f5'
        }
      };
    };

    // Seed initial ambient petals
    const isMobile = window.innerWidth < 640;
    const initialAmbientCount = isMobile ? 18 : 30;
    stateRef.current.petals = [];
    for (let i = 0; i < initialAmbientCount; i++) {
      const p = createPetal();
      p.life = Math.random() * p.maxLife * 0.75;
      p.alpha = p.targetAlpha;
      stateRef.current.petals.push(p);
    }

    // Trigger initial activation once on mount
    triggerSlashActivation();

    // Intersection Observer to pause when scrolled out of view
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

      const heroEl = heroRef.current;
      const rect = heroEl ? heroEl.getBoundingClientRect() : canvas.getBoundingClientRect();
      const displayWidth = Math.max(rect.width, 320);
      const displayHeight = Math.max(rect.height, 300);

      s.width = displayWidth;
      s.height = displayHeight;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const targetW = Math.round(displayWidth * dpr);
      const targetH = Math.round(displayHeight * dpr);

      if (canvas.width !== targetW || canvas.height !== targetH) {
        canvas.width = targetW;
        canvas.height = targetH;
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, displayWidth, displayHeight);

      // -------------------------------------------------------------
      // 1. UPDATE SLASH PROGRESS
      // -------------------------------------------------------------
      if (s.slashActive) {
        s.slashProgress += dt * 1.35;
        if (s.slashProgress > 1.0) {
          s.slashActive = false;
        }
      }

      // Decay blade flash
      if (s.flashAlpha > 0) {
        s.flashAlpha = Math.max(0, s.flashAlpha - dt * 4.5);
      }

      // -------------------------------------------------------------
      // 2. RENDER FULL-HERO ENERGY RIBBONS
      // -------------------------------------------------------------
      ctx.save();
      ctx.globalCompositeOperation = 'screen';

      s.ribbons.forEach((ribbon) => {
        ctx.beginPath();
        const pts = ribbon.points;

        const curCoords: { x: number; y: number }[] = pts.map((pt, idx) => {
          const wave1 = Math.sin(s.time * ribbon.speed + pt.freq1 * idx + pt.phase) * pt.amp1;
          const wave2 = Math.cos(s.time * ribbon.speed * 0.7 + pt.freq2 * idx) * pt.amp2;
          const surge = s.slashActive ? 8 * Math.sin(s.slashProgress * Math.PI) : 0;
          return {
            x: pt.xRatio * displayWidth,
            y: pt.baseYRatio * displayHeight + wave1 + wave2 + surge
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

        const grad = ctx.createLinearGradient(0, displayHeight * 0.15, displayWidth, displayHeight * 0.45);
        grad.addColorStop(0, ribbon.colorStart);
        grad.addColorStop(0.5, ribbon.colorMid);
        grad.addColorStop(1, ribbon.colorEnd);

        ctx.strokeStyle = grad;
        ctx.lineWidth = ribbon.glowWidth;
        ctx.stroke();

        ctx.lineWidth = ribbon.width;
        ctx.stroke();
      });

      // -------------------------------------------------------------
      // 3. RENDER SHARP PINK ENERGY FLASH ACROSS BLADE ON ACTIVATION
      // -------------------------------------------------------------
      if (s.flashAlpha > 0.02) {
        const coords = getSlashCoords();
        const flashGrad = ctx.createLinearGradient(coords.startX, coords.startY, coords.endX, coords.endY);
        flashGrad.addColorStop(0, 'rgba(225, 29, 72, 0)');
        flashGrad.addColorStop(0.5, `rgba(255, 240, 245, ${s.flashAlpha * 0.85})`);
        flashGrad.addColorStop(1, 'rgba(244, 63, 94, 0)');

        ctx.strokeStyle = flashGrad;
        ctx.lineWidth = 6 * s.flashAlpha;
        ctx.beginPath();
        ctx.moveTo(coords.startX - 30, coords.startY + 15);
        ctx.lineTo(coords.endX + 30, coords.endY - 15);
        ctx.stroke();
      }

      // -------------------------------------------------------------
      // 4. RENDER INTERACTIVE POINTER SWIPE TRAILS
      // -------------------------------------------------------------
      for (let i = s.swipeTrails.length - 1; i >= 0; i--) {
        const tr = s.swipeTrails[i];
        tr.life++;
        tr.alpha = (1 - tr.life / tr.maxLife);

        if (tr.life >= tr.maxLife || tr.alpha <= 0) {
          s.swipeTrails.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(tr.x, tr.y, tr.width * tr.alpha, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(244, 63, 94, ${tr.alpha * 0.75})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(tr.x, tr.y, tr.width * 0.5 * tr.alpha, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 228, 230, ${tr.alpha * 0.9})`;
        ctx.fill();
      }

      ctx.restore();

      // -------------------------------------------------------------
      // 5. RENDER SPARKS
      // -------------------------------------------------------------
      if (s.sparks.length > 0) {
        ctx.save();
        ctx.globalCompositeOperation = 'lighter';

        for (let i = s.sparks.length - 1; i >= 0; i--) {
          const sp = s.sparks[i];
          sp.life++;
          sp.x += sp.vx;
          sp.y += sp.vy;
          sp.vx *= 0.94;
          sp.vy *= 0.94;
          sp.alpha = (1 - sp.life / sp.maxLife) * 0.85;

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
      // 6. RENDER SAKURA PETALS (ACROSS FULL HERO VIEWPORT)
      // -------------------------------------------------------------
      const maxAllowedPetals = isMobile ? 32 : 55;

      if (s.petals.length < maxAllowedPetals && Math.random() < 0.1) {
        s.petals.push(createPetal());
      }

      for (let i = s.petals.length - 1; i >= 0; i--) {
        const p = s.petals[i];
        p.life++;

        // Natural aerodynamic flight: wind carries petals up & right
        const sway = Math.sin(s.time * 2.0 + p.x * 0.015) * 0.55;
        p.x += p.vx + sway;
        p.y += p.vy;

        p.vx = p.vx * 0.985 + 0.015 * 0.75;
        p.vy = p.vy * 0.985 + 0.015 * -0.35;

        p.rotX += p.vRotX;
        p.rotY += p.vRotY;
        p.rotZ += p.vRotZ;

        const fadeInFrac = 0.12;
        const fadeOutFrac = 0.28;
        const normLife = p.life / p.maxLife;

        if (normLife < fadeInFrac) {
          p.alpha = (normLife / fadeInFrac) * p.targetAlpha;
        } else if (normLife > 1 - fadeOutFrac) {
          p.alpha = ((1 - normLife) / fadeOutFrac) * p.targetAlpha;
        } else {
          p.alpha = p.targetAlpha;
        }

        const edgeFadeMargin = 80;
        let edgeMultiplier = 1;
        if (p.x < edgeFadeMargin) edgeMultiplier = Math.max(0, p.x / edgeFadeMargin);
        if (p.x > displayWidth - edgeFadeMargin) edgeMultiplier = Math.min(edgeMultiplier, Math.max(0, (displayWidth - p.x) / edgeFadeMargin));
        if (p.y < edgeFadeMargin) edgeMultiplier = Math.min(edgeMultiplier, Math.max(0, p.y / edgeFadeMargin));
        if (p.y > displayHeight - edgeFadeMargin) edgeMultiplier = Math.min(edgeMultiplier, Math.max(0, (displayHeight - p.y) / edgeFadeMargin));

        const finalAlpha = p.alpha * edgeMultiplier;

        if (
          p.life >= p.maxLife ||
          finalAlpha <= 0.01 ||
          p.x > displayWidth + 120 ||
          p.y < -80 ||
          p.x < -100 ||
          p.y > displayHeight + 100
        ) {
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

        ctx.globalAlpha = Math.max(0, Math.min(1, finalAlpha));

        const len = p.length;
        const w = len * p.widthRatio;

        const grad = ctx.createLinearGradient(0, len * 0.6, 0, -len * 0.6);
        if (curl >= 0) {
          grad.addColorStop(0, p.petalColor.baseRose);
          grad.addColorStop(0.35, p.petalColor.bodyPink);
          grad.addColorStop(0.8, p.petalColor.paleHighlight);
          grad.addColorStop(1, p.petalColor.rimWhite);
        } else {
          grad.addColorStop(0, '#9f1239');
          grad.addColorStop(0.4, '#be123c');
          grad.addColorStop(0.85, '#f472b6');
          grad.addColorStop(1, '#ffe4e6');
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
  }, [reducedMotion]);

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
