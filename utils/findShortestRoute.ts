import Graph from "node-dijkstra"
import { Node, Path } from "./interfaces";
const findShortestRoute = (allTrackData:Node[], tracksWithZeroDistance:Node[], fromTrack:string, toTrack:string) => {
    const route = new Graph()
    let nodeData:any={}
    let zeroCounter=0
    for (const track of allTrackData) {
      const source = track.from_tiploc
      const neighbour = track.to_tiploc
      let distance = track.distance
      //the zero distance is set to 1 because node-dijkstra doesn't allow 0 cost to be put in. These converted distances -> if found in the shortest route -> are subtracted from the total track in the end by keeping track of a zero counter
      if (distance===0) {
        distance=1
      }
      
      
      nodeData[source] ={...nodeData[source], [neighbour]:distance}
      }
    
   
    for (const nodeSource of Object.keys(nodeData)) {
      route.addNode(nodeSource, nodeData[nodeSource])
    }
    
    const shortestRoute:Path = (route.path(fromTrack,toTrack,{cost:true})) as Path
    if(shortestRoute!==null) {
    for(let i=0; i<shortestRoute.path.length-1; i++) {
      const isZeroDistanceTrackPresent =
      tracksWithZeroDistance.filter(trackWithZeroDistance=>trackWithZeroDistance.from_tiploc===shortestRoute.path[i] && trackWithZeroDistance.to_tiploc===shortestRoute.path[i+1]).length>0
      if (isZeroDistanceTrackPresent) {
        zeroCounter++
      }
      }
    shortestRoute.cost-=zeroCounter //since we converted the zero distances to 1, they have to be subtracted from the total cost
    }
  }
  export default findShortestRoute