import { Path,Node } from "./interfaces";
function getDistanceToSubtract (pathsWithZeroDistance:Node[], shortestRoute:Path) {
    let distanceToSubtract = 0
    if(shortestRoute!==null) {
      //we iterate through the shortestRoute's length and check if any path in shortestRoute matches with the path in pathsWithZeroDistance -> if matched -> we increment the count by 1 since each path with 0 distance was set previously to 1
        for(let i=0; i<shortestRoute.path.length-1; i++) {
          const isZeroDistanceTrackPresent =
          pathsWithZeroDistance.filter(trackWithZeroDistance=>trackWithZeroDistance.from_tiploc===shortestRoute.path[i] && trackWithZeroDistance.to_tiploc===shortestRoute.path[i+1]).length>0
          if (isZeroDistanceTrackPresent) {
            distanceToSubtract++
            }
          }
        }
        return distanceToSubtract
    }
    export default getDistanceToSubtract