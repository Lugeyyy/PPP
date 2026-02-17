import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface HeroBackgroundProps {
  className?: string;
}

export function HeroBackground({ className = '' }: HeroBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true 
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 800;
    const posArray = new Float32Array(particlesCount * 3);
    const colorsArray = new Float32Array(particlesCount * 3);

    const tealColor = new THREE.Color(0x14B8A6);
    const amberColor = new THREE.Color(0xF59E0B);
    const blueColor = new THREE.Color(0x3B82F6);

    for (let i = 0; i < particlesCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 100;
      posArray[i + 1] = (Math.random() - 0.5) * 100;
      posArray[i + 2] = (Math.random() - 0.5) * 50;

      const colorChoice = Math.random();
      let color: THREE.Color;
      if (colorChoice < 0.4) {
        color = tealColor;
      } else if (colorChoice < 0.7) {
        color = amberColor;
      } else {
        color = blueColor;
      }

      colorsArray[i] = color.r;
      colorsArray[i + 1] = color.g;
      colorsArray[i + 2] = color.b;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorsArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.3,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    const geometry = new THREE.IcosahedronGeometry(15, 2);
    const material = new THREE.MeshBasicMaterial({
      color: 0x14B8A6,
      wireframe: true,
      transparent: true,
      opacity: 0.08,
    });
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(20, -10, -20);
    scene.add(sphere);

    const geometry2 = new THREE.TorusGeometry(12, 0.5, 16, 100);
    const material2 = new THREE.MeshBasicMaterial({
      color: 0xF59E0B,
      wireframe: true,
      transparent: true,
      opacity: 0.06,
    });
    const torus = new THREE.Mesh(geometry2, material2);
    torus.position.set(-25, 15, -30);
    scene.add(torus);

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / width) * 2 - 1;
      mouseY = -(event.clientY / height) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);

      particlesMesh.rotation.x += 0.0003;
      particlesMesh.rotation.y += 0.0005;

      sphere.rotation.x += 0.002;
      sphere.rotation.y += 0.003;

      torus.rotation.x -= 0.001;
      torus.rotation.y += 0.002;

      camera.position.x += (mouseX * 2 - camera.position.x) * 0.02;
      camera.position.y += (mouseY * 2 - camera.position.y) * 0.02;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className={`absolute inset-0 -z-10 ${className}`}
      style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #0F172A 100%)' }}
    />
  );
}
