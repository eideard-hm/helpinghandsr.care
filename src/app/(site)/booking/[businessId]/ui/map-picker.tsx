'use client';

import { useEffect, useRef, useState } from 'react';

import L from 'leaflet';

type PickPayload = {
  addressText: string;
  lat: number;
  lng: number;
  placeId?: string;
};

export function MapPicker({
  addressText,
  onAddressPick,
  onCoordsChange,
}: {
  addressText: string;
  onAddressPick: (payload: PickPayload) => void;
  onCoordsChange: (latlng: { lat: number; lng: number }) => void;
}) {
  const mapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [query, setQuery] = useState(addressText);
  const [searching, setSearching] = useState(false);
  const [results, setResults] = useState<
    Array<{ displayName: string; lat: number; lng: number; placeId: string }>
  >([]);

  useEffect(() => {
    setQuery(addressText);
  }, [addressText]);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    // Load Leaflet CSS (simple runtime link)
    const id = 'leaflet-css';
    if (!document.getElementById(id)) {
      const link = document.createElement('link');
      link.id = id;
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);
    }

    const map = L.map(containerRef.current, {
      zoomControl: true,
      attributionControl: true,
    }).setView([4.711, -74.0721], 12); // default Bogotá; you can change

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    const marker = L.marker([4.711, -74.0721], { draggable: true }).addTo(map);

    marker.on('dragend', () => {
      const latlng = marker.getLatLng();
      onCoordsChange({ lat: latlng.lat, lng: latlng.lng });
    });

    map.on('click', (e) => {
      marker.setLatLng(e.latlng);
      onCoordsChange({ lat: e.latlng.lat, lng: e.latlng.lng });
    });

    mapRef.current = map;
    markerRef.current = marker;

    // initial coords
    onCoordsChange({ lat: 4.711, lng: -74.0721 });

    return () => {
      map.remove();
      mapRef.current = null;
      markerRef.current = null;
    };
  }, [onCoordsChange]);

  async function findOnMap() {
    const q = query.trim();
    if (q.length < 3) return;

    setSearching(true);
    setResults([]);

    const res = await fetch(`/api/geocode?q=${encodeURIComponent(q)}`, {
      cache: 'no-store',
    });
    const json = await res.json();

    setSearching(false);

    if (!json.ok) return;

    setResults(json.results ?? []);
  }

  function selectResult(r: {
    displayName: string;
    lat: number;
    lng: number;
    placeId: string;
  }) {
    const map = mapRef.current;
    const marker = markerRef.current;
    if (!map || !marker) return;

    marker.setLatLng([r.lat, r.lng]);
    map.setView([r.lat, r.lng], 16);

    onCoordsChange({ lat: r.lat, lng: r.lng });
    onAddressPick({
      addressText: r.displayName,
      lat: r.lat,
      lng: r.lng,
      placeId: r.placeId,
    });

    setResults([]);
  }

  async function useMyLocation() {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const map = mapRef.current;
        const marker = markerRef.current;
        if (!map || !marker) return;

        marker.setLatLng([latitude, longitude]);
        map.setView([latitude, longitude], 16);
        onCoordsChange({ lat: latitude, lng: longitude });
      },
      () => {
        // ignore for MVP
      },
      { enableHighAccuracy: true, timeout: 8000 },
    );
  }

  return (
    <div className='rounded-2xl border border-slate-200 bg-white overflow-hidden'>
      <div className='p-3 border-b border-slate-200 flex flex-col md:flex-row gap-2 md:items-center'>
        <input
          className='h-10 flex-1 rounded-xl border border-slate-200 px-3'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder='Search address and press Find'
        />
        <div className='flex gap-2'>
          <button
            type='button'
            onClick={findOnMap}
            className='h-10 px-4 rounded-xl bg-brand text-white hover:bg-(--brand-600)'
          >
            {searching ? 'Finding...' : 'Find on map'}
          </button>
          <button
            type='button'
            onClick={useMyLocation}
            className='h-10 px-4 rounded-xl border border-slate-200 hover:bg-slate-50'
          >
            Use my location
          </button>
        </div>
      </div>

      {results.length > 0 && (
        <div className='p-3 border-b border-slate-200 bg-slate-50'>
          <div className='text-xs text-slate-600 mb-2'>Select a match</div>
          <div className='grid gap-2'>
            {results.map((r) => (
              <button
                key={r.placeId}
                type='button'
                onClick={() => selectResult(r)}
                className='text-left p-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-sm'
              >
                {r.displayName}
              </button>
            ))}
          </div>
        </div>
      )}

      <div
        ref={containerRef}
        className='h-72 md:h-80 w-full'
      />
    </div>
  );
}
