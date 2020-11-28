const degreesToRadians = degrees => degrees * (Math.PI / 180)
const radiansToDegrees = radians => radians * (180 / Math.PI)

const centralSubtendedAngle = (locationX, locationY) => {
    const locationXLatRadians = degreesToRadians(locationX.latitude)
    const locationYLatRadians = degreesToRadians(locationY.latitude)
  return radiansToDegrees(
      Math.acos(
        Math.sin(locationXLatRadians) * Math.sin(locationYLatRadians) +
          Math.cos(locationXLatRadians) *
            Math.cos(locationYLatRadians) *
            Math.cos(
              degreesToRadians(
                Math.abs(locationX.longitude - locationY.longitude)
              )
         )
      )
    )
  }

const earthRadius = 6371

const greatCircleDistance = angle => 2 * Math.PI * earthRadius * (angle / 360)

export const distanceBetweenLocations = (locationX, locationY) => greatCircleDistance(centralSubtendedAngle(locationX, locationY))

// const NewYork = {latitude: 40.7128, longitude: 74.0060}
// const Sydney = {latitude: -33.8688, longitude: -151.2093}
// console.log(distanceBetweenLocations(NewYork, Sydney))
