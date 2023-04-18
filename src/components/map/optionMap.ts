const blackFlag = [
  {
    featureType: "all",
    elementType: "all",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "all",
    elementType: "labels",
    stylers: [
      {
        visibility: "off",
      },
      {
        saturation: "-100",
      },
    ],
  },
  {
    featureType: "all",
    elementType: "labels.text.fill",
    stylers: [
      {
        saturation: 36,
      },
      {
        color: "#000000",
      },
      {
        lightness: 40,
      },
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "all",
    elementType: "labels.text.stroke",
    stylers: [
      {
        visibility: "off",
      },
      {
        color: "#000000",
      },
      {
        lightness: 16,
      },
    ],
  },
  {
    featureType: "all",
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "administrative",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#000000",
      },
      {
        lightness: 20,
      },
    ],
  },
  {
    featureType: "administrative",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#000000",
      },
      {
        lightness: 17,
      },
      {
        weight: 1.2,
      },
    ],
  },
  {
    featureType: "landscape",
    elementType: "geometry",
    stylers: [
      {
        color: "#000000",
      },
      {
        lightness: 20,
      },
    ],
  },
  {
    featureType: "landscape",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#4d6059",
      },
    ],
  },
  {
    featureType: "landscape",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#4d6059",
      },
    ],
  },
  {
    featureType: "landscape.natural",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#4d6059",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [
      {
        lightness: 21,
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#4d6059",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#4d6059",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [
      {
        visibility: "on",
      },
      {
        color: "#7f8d89",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#7f8d89",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#7f8d89",
      },
      {
        lightness: 17,
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#7f8d89",
      },
      {
        lightness: 29,
      },
      {
        weight: 0.2,
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "geometry",
    stylers: [
      {
        color: "#000000",
      },
      {
        lightness: 18,
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#7f8d89",
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#7f8d89",
      },
    ],
  },
  {
    featureType: "road.local",
    elementType: "geometry",
    stylers: [
      {
        color: "#000000",
      },
      {
        lightness: 16,
      },
    ],
  },
  {
    featureType: "road.local",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#7f8d89",
      },
    ],
  },
  {
    featureType: "road.local",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#7f8d89",
      },
    ],
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [
      {
        color: "#000000",
      },
      {
        lightness: 19,
      },
    ],
  },
  {
    featureType: "water",
    elementType: "all",
    stylers: [
      {
        color: "#2b3638",
      },
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: "#2b3638",
      },
      {
        lightness: 17,
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#24282b",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#24282b",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.stroke",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
]
const gray1 = [
  {
    featureType: "administrative",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#444444",
      },
    ],
  },
  {
    featureType: "landscape",
    elementType: "all",
    stylers: [
      {
        color: "#f2f2f2",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "all",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "all",
    stylers: [
      {
        saturation: -100,
      },
      {
        lightness: 45,
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "all",
    stylers: [
      {
        visibility: "simplified",
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "transit",
    elementType: "all",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "all",
    stylers: [
      {
        color: "#cbcbcb",
      },
      {
        visibility: "on",
      },
    ],
  },
]
const gray2 = [
  {
    featureType: "administrative",
    elementType: "all",
    stylers: [
      {
        saturation: "-100",
      },
    ],
  },
  {
    featureType: "administrative.province",
    elementType: "all",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "landscape",
    elementType: "all",
    stylers: [
      {
        saturation: -100,
      },
      {
        lightness: 65,
      },
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "all",
    stylers: [
      {
        saturation: -100,
      },
      {
        lightness: "50",
      },
      {
        visibility: "simplified",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "all",
    stylers: [
      {
        saturation: "-100",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "all",
    stylers: [
      {
        visibility: "simplified",
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "all",
    stylers: [
      {
        lightness: "30",
      },
    ],
  },
  {
    featureType: "road.local",
    elementType: "all",
    stylers: [
      {
        lightness: "40",
      },
    ],
  },
  {
    featureType: "transit",
    elementType: "all",
    stylers: [
      {
        saturation: -100,
      },
      {
        visibility: "simplified",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        hue: "#ffff00",
      },
      {
        lightness: -25,
      },
      {
        saturation: -97,
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels",
    stylers: [
      {
        lightness: -25,
      },
      {
        saturation: -100,
      },
    ],
  },
]
const gray3 = [
  {
    featureType: "administrative",
    elementType: "all",
    stylers: [
      {
        visibility: "on",
      },
      {
        saturation: -100,
      },
      {
        lightness: 20,
      },
    ],
  },
  {
    featureType: "road",
    elementType: "all",
    stylers: [
      {
        visibility: "on",
      },
      {
        saturation: -100,
      },
      {
        lightness: 40,
      },
    ],
  },
  {
    featureType: "water",
    elementType: "all",
    stylers: [
      {
        visibility: "on",
      },
      {
        saturation: -10,
      },
      {
        lightness: 30,
      },
    ],
  },
  {
    featureType: "landscape.man_made",
    elementType: "all",
    stylers: [
      {
        visibility: "simplified",
      },
      {
        saturation: -60,
      },
      {
        lightness: 10,
      },
    ],
  },
  {
    featureType: "landscape.natural",
    elementType: "all",
    stylers: [
      {
        visibility: "simplified",
      },
      {
        saturation: -60,
      },
      {
        lightness: 60,
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "all",
    stylers: [
      {
        visibility: "off",
      },
      {
        saturation: -100,
      },
      {
        lightness: 60,
      },
    ],
  },
  {
    featureType: "transit",
    elementType: "all",
    stylers: [
      {
        visibility: "off",
      },
      {
        saturation: -100,
      },
      {
        lightness: 60,
      },
    ],
  },
]
export const options: google.maps.MapOptions = {
  gestureHandling: "greedy",
  maxZoom: 20,
  minZoom: 3,
  draggable: true,
  keyboardShortcuts: false,
  scrollwheel: true,
  fullscreenControl: false,
  streetViewControl: false,
  mapTypeControl: false,
  backgroundColor: "#b3daf7",
  disableDefaultUI: true,
  clickableIcons: false,
  styles: gray3,
}
