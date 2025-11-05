"use client";
import { useEffect, useRef, useState } from "react";

declare global { interface Window { google: any } }

export default function DesignPage() {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [kwp, setKwp] = useState<number | null>(null);

  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || (window as any).GOOGLE_MAPS_API_KEY;
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=drawing,geometry`;
    script.async = true;
    script.onload = () => initMap();
    document.body.appendChild(script);
  }, []);

  function initMap() {
    const map = new window.google.maps.Map(mapRef.current!, { center: { lat: 51.5074, lng: -0.1278 }, zoom: 18, mapTypeId: "satellite" });
    const drawing = new window.google.maps.drawing.DrawingManager({ drawingMode: window.google.maps.drawing.OverlayType.POLYGON, drawingControl: true });
    drawing.setMap(map);
    window.google.maps.event.addListener(drawing, 'overlaycomplete', (e:any) => {
      if (e.type === 'polygon') {
        const area = window.google.maps.geometry.spherical.computeArea(e.overlay.getPath()); // m^2
        const panelWatt = 0.4; // 400W per panel
        const panelArea = 2.0; // m^2 per panel (approx)
        const packing = 0.75; // packing factor
        const panels = Math.floor((area * packing) / panelArea);
        const kwpEstimate = (panels * panelWatt) / 1000;
        setKwp(parseFloat(kwpEstimate.toFixed(2)));
      }
    });
  }

  return (
    <main className="space-y-4">
      <h2 className="text-xl font-semibold">Design — Draw rooftop polygon</h2>
      <div ref={mapRef} className="w-full h-[70vh] rounded-2xl overflow-hidden border"></div>
      <p className="text-sm">kWp estimate: <strong>{kwp ?? '—'}</strong> (adjust constants in code for your panels)</p>
    </main>
  );
}
