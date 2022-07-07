import Graph from "node-dijkstra"
import { Node, Path } from "./interfaces";
const findShortestRoute = (allTrackData:Node[], tracksWithZeroDistance:Node[], fromTrack:string, toTrack:string) => {
    const route = new Graph()
    let nodeData: {[key:string]:{[key:string]:number}}
    let zeroCounter=0
    for (const track of allTrackData) {
      const source = track.from_tiploc
      const neighbour = track.to_tiploc
      let distance = track.distance+1
      /*
      IMPORTANT NOTES RELATED TO 0 DISTANCES:
      1 is added to the distance because node-dijkstra cannot handle nodes with 0 cost. This limitation is important to tackle because there are interconnections in the data with a distance of 0. Not taking into account these would result in either no path being found or a much longer route. 

      an example of this is route ABWD -> PLMSEJ. Shortest route is ABWD->ABWDXR -> PLMSEJ but distance between ABWD->ABWDXR is 0. If we ignore ABWD->ABWDXR, a much longer route has to be taken.

      the added 1's are removed from the cost in the end

      Alternate approach might be mapping two tracks to be the same if their distance is 0 but will require additional data store and we will lose critical information i.e. instead of showing ABWD->ABWDXR->PLMSEJ, we'd only be showing ABWD->PLMSEJ which might not be sufficient information for the user
      */
     
      nodeData[source] ={...nodeData[source], [neighbour]:distance}
      }
    
    for (const nodeSource of Object.keys(nodeData)) {
      route.addNode(nodeSource, nodeData[nodeSource])
    }
    
    const shortestRoute:Path = (route.path(fromTrack,toTrack,{cost:true})) as Path
    if(shortestRoute.path!==null) {
    const distanceToSubtract = shortestRoute.path.length-1

    shortestRoute.cost-=distanceToSubtract //since the cost of each path was over-estimated by 1, it has to be subtracted from the total cost
    }
    return shortestRoute
    }
  export default findShortestRoute