"use client";

import { useState, useCallback } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import { MapPin } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { LOCATIONS } from "@/lib/constants";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface MapLocation {
  id: string;
  name: string;
  lat: number;
  lng: number;
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const MAP_LOCATIONS: MapLocation[] = [
  {
    id: "mazunte",
    name: LOCATIONS.mazunte.name,
    lat: LOCATIONS.mazunte.lat,
    lng: LOCATIONS.mazunte.lng,
  },
  {
    id: "zipolite",
    name: LOCATIONS.zipolite.name,
    lat: LOCATIONS.zipolite.lat,
    lng: LOCATIONS.zipolite.lng,
  },
  {
    id: "cdmx",
    name: LOCATIONS.cdmx.name,
    lat: LOCATIONS.cdmx.lat,
    lng: LOCATIONS.cdmx.lng,
  },
];

/* Center on Oaxacan coast (between Mazunte and Zipolite) */
const DEFAULT_CENTER = {
  lat: 15.6628,
  lng: -96.5403,
};

const DEFAULT_ZOOM = 6;

/* ------------------------------------------------------------------ */
/*  Fallback (no API key)                                              */
/* ------------------------------------------------------------------ */

function MapFallback() {
  return (
    <div
      className={cn(
        "flex h-full min-h-[400px] w-full flex-col items-center justify-center rounded-xl",
        "border border-sand bg-sand/40"
      )}
    >
      <MapPin className="h-12 w-12 text-terracotta/60" />
      <p className="mt-3 font-heading text-lg font-semibold text-charcoal">
        Nuestras Ubicaciones
      </p>
      <div className="mt-4 flex flex-col gap-2">
        {MAP_LOCATIONS.map((loc) => (
          <a
            key={loc.id}
            href={`https://www.google.com/maps/search/?api=1&query=${loc.lat},${loc.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "inline-flex items-center gap-2 rounded-lg px-4 py-2",
              "text-sm font-medium text-terracotta underline-offset-2",
              "transition-colors hover:text-terracotta-dark hover:underline"
            )}
          >
            <MapPin className="h-4 w-4" />
            {loc.name}
          </a>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Map component                                                      */
/* ------------------------------------------------------------------ */

export function LocationMap() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const [activeMarker, setActiveMarker] = useState<string | null>(null);

  const handleMarkerClick = useCallback((id: string) => {
    setActiveMarker((prev) => (prev === id ? null : id));
  }, []);

  const handleInfoWindowClose = useCallback(() => {
    setActiveMarker(null);
  }, []);

  if (!apiKey) {
    return <MapFallback />;
  }

  return (
    <div className="h-full min-h-[400px] w-full overflow-hidden rounded-xl border border-sand">
      <APIProvider apiKey={apiKey}>
        <Map
          defaultCenter={DEFAULT_CENTER}
          defaultZoom={DEFAULT_ZOOM}
          mapId="casa-davan-locations"
          gestureHandling="cooperative"
          disableDefaultUI={false}
          className="h-full min-h-[400px] w-full"
        >
          {MAP_LOCATIONS.map((location) => (
            <AdvancedMarker
              key={location.id}
              position={{ lat: location.lat, lng: location.lng }}
              title={location.name}
              onClick={() => handleMarkerClick(location.id)}
            >
              {/* Custom marker pin */}
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full",
                  "bg-terracotta text-cream shadow-lg",
                  "transition-transform hover:scale-110",
                  activeMarker === location.id && "scale-110 ring-2 ring-cream"
                )}
              >
                <MapPin className="h-4 w-4" />
              </div>
            </AdvancedMarker>
          ))}

          {/* Info window for active marker */}
          {activeMarker && (() => {
            const loc = MAP_LOCATIONS.find((l) => l.id === activeMarker);
            if (!loc) return null;

            return (
              <InfoWindow
                position={{ lat: loc.lat, lng: loc.lng }}
                onCloseClick={handleInfoWindowClose}
                pixelOffset={[0, -40]}
              >
                <div className="p-1">
                  <p className="font-heading text-sm font-semibold text-charcoal">
                    {loc.name}
                  </p>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${loc.lat},${loc.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 block text-xs text-terracotta hover:underline"
                  >
                    View on Google Maps
                  </a>
                </div>
              </InfoWindow>
            );
          })()}
        </Map>
      </APIProvider>
    </div>
  );
}
