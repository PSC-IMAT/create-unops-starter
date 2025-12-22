"use client";

import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";

const TILESET_URL = "mapbox://paschek7.khartoum_buildings_v1";
const SOURCE_ID = "khartoum";
const SOURCE_LAYER = "buildings";
const LAYER_ID = "khartoum-3d";

// Tu peux ajuster (tes heights semblent petites dans l'échantillon)
const HEIGHT_SCALE = 1;

const CATEGORIES = [
  "building",
  "education",
  "health",
  "power",
  "waste",
  "water",
];

const STATUSES = ["damaged", "undamaged", "unknown"];

export default function KhartoumBuildingsMap() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    if (mapRef.current) return; // évite double init en dev

    if (!mapboxgl.accessToken) {
      console.error("Missing NEXT_PUBLIC_MAPBOX_TOKEN");
      return;
    }

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: "mapbox://styles/mapbox/standard-satellite",
      config: {
        basemap: {
          showPedestrianRoads: false,
          show3dObjects: true,
          showPlaceLabels: false,
          showPointOfInterestLabels: false,
          showRoadLabels: false,
          showTransitLabels: false,
          showAdminBoundaries: false,
          showLandmarkIconLabels: false,
        },
      },
      zoom: 18,
      center: [32.55, 15.51666667],
      pitch: 60,
      antialias: true,
    });

    mapRef.current = map;

    map.on("load", () => {
      // Source: tileset Mapbox
      if (!map.getSource(SOURCE_ID)) {
        map.addSource(SOURCE_ID, {
          type: "vector",
          url: TILESET_URL,
        });
      }

      // Layer 3D
      if (!map.getLayer(LAYER_ID)) {
        map.addLayer({
          id: LAYER_ID,
          type: "fill-extrusion",
          source: SOURCE_ID,
          "source-layer": SOURCE_LAYER,
          minzoom: 13,
          paint: {
            // Couleur: hover -> blanc, sinon selon status
            "fill-extrusion-color": [
              "case",
              ["boolean", ["feature-state", "hover"], false],
              "#95a5a6",
              [
                "match",
                ["get", "tor_category"],

                // Building
                "building",
                [
                  "match",
                  ["get", "status"],
                  "damaged",
                  "#ff2f00", // red
                  "undamaged",
                  "#ffffff", // white
                  "unknown",
                  "#ededed", // light gray
                  "#ededed",
                ],

                // Education
                "education",
                [
                  "match",
                  ["get", "status"],
                  "damaged",
                  "#00a83c", // green damaged
                  "undamaged",
                  "#00d24d", // light green undamaged
                  "#00d24d",
                ],

                // Health
                "health",
                [
                  "match",
                  ["get", "status"],
                  "damaged",
                  "#ff7f00", // orange damaged
                  "undamaged",
                  "#ffd200", // yellow undamaged
                  "#ffd200",
                ],

                // Power
                "power",
                [
                  "match",
                  ["get", "status"],
                  "damaged",
                  "#ff9900", // orange damaged
                  "undamaged",
                  "#ffd640", // yellow undamaged
                  "#ffd640",
                ],

                // Waste
                "waste",
                "#b0724f", // brown undamaged (only state shown)

                // Water
                "water",
                [
                  "match",
                  ["get", "status"],
                  "damaged",
                  "#00b7ff", // cyan damaged
                  "undamaged",
                  "#0099ff", // cyan undamaged
                  "#0099ff",
                ],

                /* default */ "#95a5a6",
              ],
            ],

            // Hauteur 3D
            "fill-extrusion-height": [
              "*",
              ["to-number", ["coalesce", ["get", "height"], 0]],
              HEIGHT_SCALE,
            ],

            // Base (si tu as un champ baseHeight un jour, tu peux le mettre ici)
            "fill-extrusion-base": 0,

            "fill-extrusion-opacity": 0.85,
          },
        });
      }

      // Outline layer for damaged buildings
      const OUTLINE_ID = `${LAYER_ID}-outline`;
      if (!map.getLayer(OUTLINE_ID)) {
        map.addLayer({
          id: OUTLINE_ID,
          type: "line",
          source: SOURCE_ID,
          "source-layer": SOURCE_LAYER,
          filter: ["==", ["get", "status"], "damaged"],
          paint: {
            "line-color": "#ff2f00",
            "line-width": 3,
            "line-opacity": 1,
          },
        });
      }
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  return (
      <div ref={containerRef} className="w-full h-full rounded-4xl" />
  );
}
