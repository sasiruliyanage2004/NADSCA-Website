"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface HubNode {
  id: string;
  name: string;
  country: string;
  lat: number;
  lng: number;
  latency: string;
  status: string;
  role: string;
}

const HUBS: HubNode[] = [
  { id: "cmbo", name: "Colombo • Galle", country: "Sri Lanka", lat: 6.9271, lng: 79.8612, latency: "< 2ms", status: "PRIMARY SITE", role: "Our Servers • Local Clients" },
  { id: "canada", name: "Canada", country: "North America", lat: 45.4215, lng: -75.6972, latency: "180ms", status: "CLIENT REGION", role: "Served from Colombo" },
  { id: "usa", name: "USA", country: "North America", lat: 38.9072, lng: -77.0369, latency: "174ms", status: "CLIENT REGION", role: "Served from Colombo" },
];

const CONNECTIONS: [string, string][] = [
  ["cmbo", "canada"],
  ["cmbo", "usa"],
];

function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

export default function NetworkGlobe3D() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeHub, setActiveHub] = useState<HubNode>(HUBS[0]);
  const [networkStats, setNetworkStats] = useState({
    totalNodes: 8,
    activeRoutes: 10,
    p99Latency: "14.2ms",
    throughput: "98.4 GB/s",
  });

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let width = mount.clientWidth;
    let height = mount.clientHeight;

    // --- Scene, Camera, Renderer ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.8);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    renderer.setSize(width, height);
    renderer.setPixelRatio(isMobile ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    mount.appendChild(renderer.domElement);

    const globeRadius = 2.4;
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // Initial slight tilt
    globeGroup.rotation.x = 0.25;
    globeGroup.rotation.y = -1.2;

    const isDarkMode = () =>
      typeof document !== "undefined" &&
      document.documentElement.classList.contains("dark");

    // --- 1. Holographic Dot Matrix Sphere (Fibonacci Sphere) ---
    const dotCount = isMobile ? 380 : 850;
    const dotPositions = new Float32Array(dotCount * 3);
    const dotSizes = new Float32Array(dotCount);

    const phiGolden = Math.PI * (3 - Math.sqrt(5)); // ~2.3999632

    for (let i = 0; i < dotCount; i++) {
      const y = 1 - (i / (dotCount - 1)) * 2; // y goes from 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phiGolden * i;

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      dotPositions[i * 3] = x * globeRadius;
      dotPositions[i * 3 + 1] = y * globeRadius;
      dotPositions[i * 3 + 2] = z * globeRadius;

      dotSizes[i] = Math.random() * 2.0 + 1.5;
    }

    const dotGeo = new THREE.BufferGeometry();
    dotGeo.setAttribute("position", new THREE.BufferAttribute(dotPositions, 3));
    dotGeo.setAttribute("size", new THREE.BufferAttribute(dotSizes, 1));

    // Custom circular glow particle texture
    const createCircleTexture = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
        grad.addColorStop(0, "rgba(255, 255, 255, 1)");
        grad.addColorStop(0.3, "rgba(0, 210, 255, 0.85)");
        grad.addColorStop(0.7, "rgba(30, 127, 232, 0.35)");
        grad.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 64, 64);
      }
      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true;
      return texture;
    };

    const dotTexture = createCircleTexture();

    const dotMat = new THREE.PointsMaterial({
      size: 0.085,
      map: dotTexture,
      transparent: true,
      opacity: isDarkMode() ? 0.75 : 0.45,
      blending: isDarkMode() ? THREE.AdditiveBlending : THREE.NormalBlending,
      depthWrite: false,
      color: new THREE.Color(isDarkMode() ? 0x00d2ff : 0x1e7fe8),
    });

    const dotMesh = new THREE.Points(dotGeo, dotMat);
    globeGroup.add(dotMesh);

    // --- 2. Inner Translucent Wireframe Core ---
    const innerGeo = new THREE.SphereGeometry(globeRadius * 0.985, 28, 28);
    const innerWireMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(isDarkMode() ? 0x1e7fe8 : 0x0088cc),
      wireframe: true,
      transparent: true,
      opacity: isDarkMode() ? 0.08 : 0.05,
    });
    const innerSphere = new THREE.Mesh(innerGeo, innerWireMat);
    globeGroup.add(innerSphere);

    // --- 3. Equatorial & Orbital Data Rings ---
    const ringGeo = new THREE.TorusGeometry(globeRadius * 1.08, 0.012, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(0x12b8a6),
      transparent: true,
      opacity: isDarkMode() ? 0.45 : 0.25,
    });
    const ring1 = new THREE.Mesh(ringGeo, ringMat);
    ring1.rotation.x = Math.PI / 2.3;
    globeGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(globeRadius * 1.15, 0.008, 16, 100);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(0x00d2ff),
      transparent: true,
      opacity: isDarkMode() ? 0.35 : 0.2,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.y = Math.PI / 3;
    globeGroup.add(ring2);

    // --- 4. Hub Markers (Beacons & Pulsing Rings) ---
    const hubVectors = new Map<string, THREE.Vector3>();
    const beaconGroup = new THREE.Group();
    globeGroup.add(beaconGroup);

    const beaconGeo = new THREE.SphereGeometry(0.065, 16, 16);
    const beaconMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(0x00d2ff),
    });

    const beaconPulseGeo = new THREE.RingGeometry(0.06, 0.14, 24);
    const beaconPulseMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(0x6fcf3e),
      transparent: true,
      opacity: 0.8,
      side: THREE.DoubleSide,
    });

    const pulseMeshes: { mesh: THREE.Mesh; baseScale: number }[] = [];

    HUBS.forEach((hub) => {
      const pos = latLngToVector3(hub.lat, hub.lng, globeRadius * 1.01);
      hubVectors.set(hub.id, pos);

      // Core beacon dot
      const beacon = new THREE.Mesh(beaconGeo, beaconMat);
      beacon.position.copy(pos);
      beaconGroup.add(beacon);

      // Normal orienting ring
      const pulseRing = new THREE.Mesh(beaconPulseGeo, beaconPulseMat);
      pulseRing.position.copy(pos.clone().multiplyScalar(1.002));
      pulseRing.lookAt(pos.clone().multiplyScalar(2));
      beaconGroup.add(pulseRing);

      pulseMeshes.push({ mesh: pulseRing, baseScale: 1 });
    });

    // --- 5. Curved Data Arcs (Quadratic Splines) & Traveling Photons ---
    const arcCurves: THREE.QuadraticBezierCurve3[] = [];
    const arcGroup = new THREE.Group();
    globeGroup.add(arcGroup);

    const photonGeo = new THREE.SphereGeometry(0.045, 12, 12);
    const photonMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(0xffffff),
    });

    interface Photon {
      mesh: THREE.Mesh;
      curve: THREE.QuadraticBezierCurve3;
      progress: number;
      speed: number;
    }

    const photons: Photon[] = [];

    CONNECTIONS.forEach(([fromId, toId]) => {
      const v1 = hubVectors.get(fromId);
      const v2 = hubVectors.get(toId);
      if (!v1 || !v2) return;

      const distance = v1.distanceTo(v2);
      // Midpoint pulled outward above globe surface proportional to distance
      const mid = v1
        .clone()
        .add(v2)
        .multiplyScalar(0.5)
        .normalize()
        .multiplyScalar(globeRadius + distance * 0.28);

      const curve = new THREE.QuadraticBezierCurve3(v1, mid, v2);
      arcCurves.push(curve);

      // Sample curve points for glowing tube/line
      const points = curve.getPoints(40);
      const curveGeo = new THREE.BufferGeometry().setFromPoints(points);
      const curveMat = new THREE.LineBasicMaterial({
        color: new THREE.Color(0x1e7fe8),
        transparent: true,
        opacity: isDarkMode() ? 0.6 : 0.4,
      });
      const arcLine = new THREE.Line(curveGeo, curveMat);
      arcGroup.add(arcLine);

      // Add a photon light packet traveling along the arc
      const photonMesh = new THREE.Mesh(photonGeo, photonMat);
      arcGroup.add(photonMesh);
      photons.push({
        mesh: photonMesh,
        curve,
        progress: Math.random(),
        speed: 0.004 + Math.random() * 0.005,
      });
    });

    // --- 6. Ambient Atmosphere Glow & Lighting ---
    const ambientLight = new THREE.AmbientLight(0xffffff, isDarkMode() ? 1.2 : 2.0);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0x00d2ff, 1.5);
    dirLight.position.set(5, 4, 6);
    scene.add(dirLight);

    // --- 7. Interactive Mouse & Drag Physics ---
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let targetRotY = globeGroup.rotation.y;
    let targetRotX = globeGroup.rotation.x;
    let currentRotY = globeGroup.rotation.y;
    let currentRotX = globeGroup.rotation.x;
    let dragVelocityX = 0;
    let dragVelocityY = 0;

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
      dragVelocityX = 0;
      dragVelocityY = 0;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (isDragging) {
        const deltaX = e.clientX - prevMouseX;
        const deltaY = e.clientY - prevMouseY;
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;

        targetRotY += deltaX * 0.006;
        targetRotX += deltaY * 0.006;
        dragVelocityX = deltaX * 0.006;
        dragVelocityY = deltaY * 0.006;
      }
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    mount.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointerup", onPointerUp);

    // --- 8. Theme Sync ---
    const updateTheme = () => {
      const dark = isDarkMode();
      dotMat.color.setHex(dark ? 0x00d2ff : 0x1e7fe8);
      dotMat.opacity = dark ? 0.75 : 0.45;
      dotMat.blending = dark ? THREE.AdditiveBlending : THREE.NormalBlending;
      dotMat.needsUpdate = true;

      innerWireMat.color.setHex(dark ? 0x1e7fe8 : 0x0088cc);
      innerWireMat.opacity = dark ? 0.08 : 0.05;

      ringMat.opacity = dark ? 0.45 : 0.25;
      ring2Mat.opacity = dark ? 0.35 : 0.2;
      ambientLight.intensity = dark ? 1.2 : 2.0;
    };

    const themeObserver = new MutationObserver(updateTheme);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // --- 9. Render Loop with GPU Sleeping ---
    const clock = new THREE.Clock();
    let raf = 0;
    let isIntersecting = true;
    let isTabVisible = !document.hidden;

    const animate = () => {
      if (!isIntersecting || !isTabVisible) {
        raf = 0;
        return;
      }

      const elapsed = clock.getElapsedTime();

      // Inertia & rotation
      if (!isDragging) {
        targetRotY += 0.0025 + dragVelocityX;
        targetRotX += dragVelocityY;
        dragVelocityX *= 0.94;
        dragVelocityY *= 0.94;
      }

      currentRotX += (targetRotX - currentRotX) * 0.08;
      currentRotY += (targetRotY - currentRotY) * 0.08;

      globeGroup.rotation.x = currentRotX;
      globeGroup.rotation.y = currentRotY;

      // Pulse beacon rings
      pulseMeshes.forEach((item, idx) => {
        const p = ((elapsed * 2 + idx * 0.4) % 2) / 2; // 0 to 1
        const scale = 1 + p * 1.8;
        item.mesh.scale.set(scale, scale, scale);
        (item.mesh.material as THREE.MeshBasicMaterial).opacity = Math.max(0, 0.85 * (1 - p));
      });

      // Animate photons along routes
      photons.forEach((photon) => {
        photon.progress = (photon.progress + photon.speed) % 1;
        const pt = photon.curve.getPoint(photon.progress);
        photon.mesh.position.copy(pt);
      });

      // Rings independent spin
      ring1.rotation.z = elapsed * 0.12;
      ring2.rotation.z = -elapsed * 0.08;

      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };

    const startAnimate = () => {
      if (!raf && isIntersecting && isTabVisible) {
        raf = requestAnimationFrame(animate);
      }
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry.isIntersecting;
        if (isIntersecting) {
          startAnimate();
        } else if (raf) {
          cancelAnimationFrame(raf);
          raf = 0;
        }
      },
      { threshold: 0.05 }
    );
    io.observe(mount);

    const handleVisibility = () => {
      isTabVisible = !document.hidden;
      if (isTabVisible) {
        startAnimate();
      } else if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    startAnimate();

    // --- 10. Resize Handler ---
    const onResize = () => {
      if (!mount) return;
      width = mount.clientWidth;
      height = mount.clientHeight;
      if (!width || !height) return;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", onResize);

    // Dynamic latency telemetry jitter
    const interval = setInterval(() => {
      setNetworkStats((prev) => ({
        ...prev,
        p99Latency: (13.8 + Math.random() * 0.8).toFixed(1) + "ms",
        throughput: (97.8 + Math.random() * 1.5).toFixed(1) + " GB/s",
      }));
    }, 2800);

    // --- 11. Cleanup ---
    return () => {
      clearInterval(interval);
      if (raf) cancelAnimationFrame(raf);
      io.disconnect();
      themeObserver.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointerMove);
      mount.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);

      dotGeo.dispose();
      dotMat.dispose();
      dotTexture.dispose();
      innerGeo.dispose();
      innerWireMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      beaconGeo.dispose();
      beaconMat.dispose();
      beaconPulseGeo.dispose();
      beaconPulseMat.dispose();
      photonGeo.dispose();
      photonMat.dispose();
      renderer.dispose();

      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative w-full rounded-3xl bg-slate-900/95 dark:bg-[#090C12] border border-ink/10 dark:border-white/10 p-6 md:p-10 overflow-hidden shadow-2xl">
      {/* Background Ambient Radial Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -right-40 w-96 h-96 rounded-full bg-azure/20 dark:bg-azure/25 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-teal/20 dark:bg-teal/25 blur-3xl"
      />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Col: Info & Live Telemetry HUD */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <span className="text-azure dark:text-azure-light font-mono font-semibold text-xs tracking-widest uppercase mb-3 block">
              WHERE WE SERVE FROM
            </span>
            <h3 className="font-display text-2xl sm:text-3xl md:text-4xl text-white font-medium tracking-tight leading-tight mb-4">
              Our servers. Our team. Clients from Galle to North America.
            </h3>
            <p className="text-white/70 text-sm sm:text-[15px] leading-relaxed mb-6">
              Every application we deliver runs on servers we own and manage in Colombo. The same platform, the same support team, and the same security standards serve clients in Galle, Colombo, Canada and the USA.
            </p>
          </div>

          {/* Real-Time Metrics HUD (3 Badges) */}
          <div className="grid grid-cols-3 gap-2.5 pt-2">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3.5 backdrop-blur-md">
              <div className="text-[10px] font-mono text-white/50 uppercase tracking-wider">PRIMARY SITE</div>
              <div className="font-display text-lg sm:text-xl text-emerald-400 mt-1 font-bold">Colombo</div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3.5 backdrop-blur-md">
              <div className="text-[10px] font-mono text-white/50 uppercase tracking-wider">HOSTING</div>
              <div className="font-display text-lg sm:text-xl text-white mt-1 font-bold">Own Servers</div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3.5 backdrop-blur-md">
              <div className="text-[10px] font-mono text-white/50 uppercase tracking-wider">CLIENT REGIONS</div>
              <div className="font-display text-lg sm:text-xl text-cyan-400 mt-1 font-bold">Asia &amp; N. America</div>
            </div>
          </div>

          {/* Clients We Serve Pills */}
          <div className="pt-2">
            <div className="text-[11px] font-mono text-white/50 uppercase tracking-wider mb-2">
              CLIENTS WE SERVE
            </div>
            <div className="flex flex-wrap gap-2">
              {["• Galle", "• Colombo", "• Canada", "• USA"].map((item) => (
                <span
                  key={item}
                  className="px-3 py-1 rounded-xl bg-white/[0.05] border border-white/10 text-xs font-mono text-white/80"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: 3D Holographic Globe Canvas */}
        <div className="lg:col-span-7 relative h-[420px] md:h-[540px] flex items-center justify-center">
          {/* Top HUD Overlay */}
          <div className="pointer-events-none absolute top-4 inset-x-6 z-20 flex items-center justify-between text-[11px] font-mono">
            <span className="flex items-center gap-1.5 text-cyan-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              CLIENT CONNECTIONS
            </span>
            <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              ALL SERVED FROM COLOMBO
            </span>
          </div>

          {/* Colombo / Galle Marker Overlay */}
          <div className="pointer-events-none absolute top-[34%] left-[24%] z-20">
            <div className="px-2.5 py-1.5 rounded-xl bg-[#070A10]/85 border border-cyan-400/40 backdrop-blur-md font-mono text-left shadow-xl">
              <div className="text-[11px] font-bold text-white tracking-wide">COLOMBO • GALLE</div>
              <div className="text-[8px] text-cyan-300 font-medium">OUR SERVERS • LOCAL CLIENTS</div>
            </div>
          </div>

          {/* North America Marker Overlay */}
          <div className="pointer-events-none absolute bottom-[32%] right-[22%] z-20 flex gap-2">
            <div className="px-2.5 py-1 rounded-lg bg-[#070A10]/85 border border-white/20 backdrop-blur-md font-mono text-[10px] font-bold text-white tracking-wide shadow-xl">
              CANADA
            </div>
            <div className="px-2.5 py-1 rounded-lg bg-[#070A10]/85 border border-white/20 backdrop-blur-md font-mono text-[10px] font-bold text-white tracking-wide shadow-xl">
              USA
            </div>
          </div>

          {/* 3D WebGL Canvas Container */}
          <div
            ref={mountRef}
            className="w-full h-full cursor-grab active:cursor-grabbing select-none"
            aria-label="Interactive 3D Network Globe - Click and drag to rotate the globe"
            role="region"
          />

          {/* Bottom HUD Overlay */}
          <div className="pointer-events-none absolute bottom-4 inset-x-6 z-20 flex items-center justify-between text-[10px] font-mono text-white/40">
            <span>ENGINEERED BY NADSCA</span>
            <span>ILLUSTRATIVE, REGIONS APPROXIMATE</span>
          </div>
        </div>
      </div>
    </div>
  );
}
