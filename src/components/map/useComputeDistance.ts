import { useMemo } from "react"

/**
 * Returns the distance, in meters, between two LatLngs. Available only when GoogleMap is initialized.
 * @param from
 * @param to
 */
export function useComputeDistance(
  from: google.maps.LatLng | google.maps.LatLngLiteral,
  to: google.maps.LatLng | google.maps.LatLngLiteral
): number | undefined {
  const distance = useMemo(() => {
    if (!window.google?.maps?.geometry?.spherical) return

    return window.google.maps.geometry.spherical.computeDistanceBetween(from, to)
  }, [window.google?.maps?.geometry?.spherical, JSON.stringify(from), JSON.stringify(to)])

  return distance
}
