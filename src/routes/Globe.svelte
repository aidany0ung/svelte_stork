<script lang="ts">
  export const ssr = false;
  import { onMount } from 'svelte';
  
  let el: HTMLCanvasElement;
  
  onMount(async () => {
    // Dynamically import Three.js and ThreeGlobe on client-side only
    const THREE = await import('three');
    const ThreeGlobeModule = await import('three-globe');
    const ThreeGlobe = ThreeGlobeModule.default;
    
    // Scene setup
    const scene = new THREE.Scene();
    scene.alpha = true;
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      el.clientWidth / el.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 200;
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      canvas: el,
      antialias: true,
      alpha: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(el.clientWidth, el.clientHeight);
    
    // Globe setup
    const myGlobe = new ThreeGlobe()
    .globeImageUrl('//unpkg.com/three-globe/example/img/earth-day.jpg')

    
    scene.add(myGlobe);
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 2);
    scene.add(ambientLight);
    
    // Animation loop
    let animationId: number;
    
    function animate() {
      animationId = requestAnimationFrame(animate);
      
      renderer.render(scene, camera);
    }
    
    animate();
    
    // Handle window resize
    function handleResize() {
      camera.aspect = el.clientWidth / el.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(el.clientWidth, el.clientHeight);
    }
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      renderer.dispose();
    };
  });
</script>

<svelte:head>
  <title>Three.js Sveltekit</title>
  <meta name="description" content="Three.js example app built with Svelte" />
</svelte:head>

<div class="wrap w-full">
  {#if !el}
    <div class="loading">Loading 3D Globe...</div>
  {/if}
  <canvas bind:this={el} class="globe-canvas" />
</div>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    overflow: hidden;
  }
  
  .loading {
    position: absolute;
    color: white;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    font-size: 1.2rem;
    animation: pulse 1.5s infinite;
  }
  
  canvas {
    height: 100%;
    width: 100%;
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }

  
  /* Responsive sizing */
  @media (max-width: 768px) {
    .globe-canvas {
      width: 95vw;
      height: 60vh;
    }
  }
</style>