export function convertMetersToKilometers(meters: number) {
  meters = Math.round(meters)
  if (meters > 900) {
    const kilometers = meters / 1000
    return `${kilometers} km`
  } else {
    return `${meters} m`
  }
}
