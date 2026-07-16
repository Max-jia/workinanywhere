import React, { useEffect, useRef } from 'react';

const FuzzyText = ({
  children,
  fontSize = 'clamp(2rem, 10vw, 10rem)',
  fontWeight = 900,
  fontFamily = 'inherit',
  color = '#fff',
  enableHover = true,
  baseIntensity = 0.18,
  hoverIntensity = 0.5,
  fuzzRange = 30,
  fps = 60,
  direction = 'horizontal',
  transitionDuration = 0,
  clickEffect = false,
  glitchMode = false,
  glitchInterval = 2000,
  glitchDuration = 200,
  gradient = null,
  letterSpacing = 0,
  className = ''
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    let animationFrameId;
    let isCancelled = false;
    let glitchTimeoutId;
    let glitchEndTimeoutId;
    let clickTimeoutId;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const init = async () => {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const computedFontFamily =
        fontFamily === 'inherit' ? window.getComputedStyle(canvas).fontFamily || 'sans-serif' : fontFamily;

      const fontSizeStr = typeof fontSize === 'number' ? `${fontSize}px` : fontSize;
      const fontString = `${fontWeight} ${fontSizeStr} ${computedFontFamily}`;

      try { await document.fonts.load(fontString); } catch { await document.fonts.ready; }
      if (isCancelled) return;

      let numericFontSize;
      if (typeof fontSize === 'number') {
        numericFontSize = fontSize;
      } else {
        const temp = document.createElement('span');
        temp.style.fontSize = fontSize;
        document.body.appendChild(temp);
        numericFontSize = parseFloat(window.getComputedStyle(temp).fontSize);
        document.body.removeChild(temp);
      }

      const text = React.Children.toArray(children).join('');

      const offscreen = document.createElement('canvas');
      const offCtx = offscreen.getContext('2d');
      if (!offCtx) return;

      offCtx.font = `${fontWeight} ${fontSizeStr} ${computedFontFamily}`;
      offCtx.textBaseline = 'alphabetic';

      let totalWidth = 0;
      if (letterSpacing !== 0) {
        for (const char of text) { totalWidth += offCtx.measureText(char).width + letterSpacing; }
        totalWidth -= letterSpacing;
      } else {
        totalWidth = offCtx.measureText(text).width;
      }

      const metrics = offCtx.measureText(text);
      const actualAscent = metrics.actualBoundingBoxAscent ?? numericFontSize;
      const actualDescent = metrics.actualBoundingBoxDescent ?? numericFontSize * 0.2;
      const tightHeight = Math.ceil(actualAscent + actualDescent);
      const offscreenWidth = Math.ceil(totalWidth) + 10;

      offscreen.width = offscreenWidth;
      offscreen.height = tightHeight;

      offCtx.font = `${fontWeight} ${fontSizeStr} ${computedFontFamily}`;
      offCtx.textBaseline = 'alphabetic';

      if (gradient && Array.isArray(gradient) && gradient.length >= 2) {
        const grad = offCtx.createLinearGradient(0, 0, offscreenWidth, 0);
        gradient.forEach((c, i) => grad.addColorStop(i / (gradient.length - 1), c));
        offCtx.fillStyle = grad;
      } else {
        offCtx.fillStyle = color;
      }

      if (letterSpacing !== 0) {
        let xPos = 5;
        for (const char of text) { offCtx.fillText(char, xPos, actualAscent); xPos += offCtx.measureText(char).width + letterSpacing; }
      } else {
        offCtx.fillText(text, 5, actualAscent);
      }

      const horizontalMargin = fuzzRange + 20;
      canvas.width = offscreenWidth + horizontalMargin * 2;
      canvas.height = tightHeight;
      ctx.translate(horizontalMargin, 0);

      let isHovering = false;
      let isClicking = false;
      let isGlitching = false;
      let currentIntensity = baseIntensity;
      let targetIntensity = baseIntensity;
      let lastFrameTime = 0;
      const frameDuration = 1000 / fps;
      let transitionStep = 0;

      const startGlitchLoop = () => {
        if (!glitchMode || isCancelled) return;
        glitchTimeoutId = setTimeout(() => {
          if (isCancelled) return;
          isGlitching = true;
          glitchEndTimeoutId = setTimeout(() => { isGlitching = false; startGlitchLoop(); }, glitchDuration);
        }, glitchInterval);
      };
      if (glitchMode) startGlitchLoop();

      const run = timestamp => {
        if (isCancelled) return;
        if (timestamp - lastFrameTime < frameDuration) { animationFrameId = requestAnimationFrame(run); return; }
        lastFrameTime = timestamp;

        ctx.clearRect(-fuzzRange - 20, -10, offscreenWidth + fuzzRange * 2 + 40, tightHeight + 20);

        if (isClicking) targetIntensity = 1;
        else if (isGlitching) targetIntensity = 1;
        else if (isHovering) targetIntensity = hoverIntensity;
        else targetIntensity = baseIntensity;

        if (transitionDuration > 0) {
          const step = 1 / (transitionDuration / frameDuration);
          currentIntensity += (targetIntensity - currentIntensity) * step * 0.1;
        } else {
          currentIntensity = targetIntensity;
        }

        if (direction === 'horizontal') {
          for (let j = 0; j < tightHeight; j++) {
            const dx = Math.floor(currentIntensity * (Math.random() - 0.5) * fuzzRange);
            ctx.drawImage(offscreen, 0, j, offscreenWidth, 1, dx, j, offscreenWidth, 1);
          }
        } else if (direction === 'vertical') {
          for (let i = 0; i < offscreenWidth; i++) {
            const dy = Math.floor(currentIntensity * (Math.random() - 0.5) * fuzzRange);
            ctx.drawImage(offscreen, i, 0, 1, tightHeight, i, dy, 1, tightHeight);
          }
        } else {
          for (let j = 0; j < tightHeight; j++) {
            const dx = Math.floor(currentIntensity * (Math.random() - 0.5) * fuzzRange);
            ctx.drawImage(offscreen, 0, j, offscreenWidth, 1, dx, j, offscreenWidth, 1);
          }
        }

        animationFrameId = requestAnimationFrame(run);
      };

      animationFrameId = requestAnimationFrame(run);

      if (enableHover) {
        canvas.style.cursor = 'default';
        canvas.addEventListener('mousemove', e => {
          const rect = canvas.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          isHovering = x > 0 && x < canvas.width && y > 0 && y < canvas.height;
        });
        canvas.addEventListener('mouseleave', () => { isHovering = false; });
      }
      if (clickEffect) {
        canvas.addEventListener('click', () => {
          isClicking = true;
          clearTimeout(clickTimeoutId);
          clickTimeoutId = setTimeout(() => { isClicking = false; }, 150);
        });
      }

      canvas.cleanupFuzzyText = () => {
        window.cancelAnimationFrame(animationFrameId);
        clearTimeout(glitchTimeoutId);
        clearTimeout(glitchEndTimeoutId);
        clearTimeout(clickTimeoutId);
      };
    };

    init();
    return () => { isCancelled = true; if (canvas?.cleanupFuzzyText) canvas.cleanupFuzzyText(); };
  }, [children, fontSize, fontWeight, fontFamily, color, enableHover, baseIntensity, hoverIntensity, fuzzRange, fps, direction, transitionDuration, clickEffect, glitchMode, glitchInterval, glitchDuration, gradient, letterSpacing]);

  return <canvas ref={canvasRef} className={className} style={{ display: 'block', maxWidth: '100%' }} />;
};

export default FuzzyText;
