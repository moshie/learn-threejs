import type { PerspectiveCamera, Renderer } from 'three';

export function viewportResizeHandler(
  camera: PerspectiveCamera,
  renderer: Renderer
) {
  function handler(_event: UIEvent) {
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight);
  }

  return handler;
}
