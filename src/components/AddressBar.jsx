import { useEffect, useRef, useState } from "react"
import * as d3 from "d3"
 
export const AddressBar = (props) => {
  const [bbox, setBbox]  = useState({});
  const addressContainer = useRef(null)
  const addressRef       = useRef(null)
  const mult             = 200

  // ---------------------------------------------------------------
  const set = () => {
    setBbox(addressContainer && addressContainer.current ? addressContainer.current.getBoundingClientRect() : {});
  }

  // ---------------------------------------------------------------
  useEffect(() => {
    set()
    window.addEventListener('resize', set);
    return () => window.removeEventListener('resize', set);
  }, [])

  // ---------------------------------------------------------------
  useEffect(() => {
    const svg = d3.select(addressRef.current)
      .attr("width", bbox.width)
      .attr("height", bbox.height)

    // clear out before we draw
    svg.selectAll("*").remove();

    // N addresses
    svg.append('g')
      .attr('class', 'addresses-text-n')
      .selectAll('text')
      .data(props.addressesNData)
      .enter()
      .append('text')
      .attr("x", function(d) {
        return ((parseFloat(d.coord_max) + parseFloat(d.coord_min)) / 2) * mult 
			})
			.attr("y", "45")
      .on('click', function(d){
        window.open(`${window.location.origin}/address/${this.innerHTML}/`)
      })
			.attr("text-anchor", "middle")
			.text(function(d) { 
				return d.address 
			})
    
    // S addresses
    svg.append('g')
      .attr('class', 'addresses-text-s hidden-strip')
      .selectAll('text')
			.data(props.addressesSData)
			.enter()
			.append('text')
			.attr("x", function(d) { 
        return -((parseFloat(d.coord_max) + parseFloat(d.coord_min)) / 2) * mult
			})
			.attr("y", "45")
			.attr("text-anchor", "middle")
			.text(function(d) { 
				return d.address 
			})

  }, [props.addressesNData, props.addressesSData, bbox])

  // ---------------------------------------------------------------
  return (
    <div ref={ addressContainer } className="strip-addresses">
      <svg
        ref={addressRef}
      />
    </div>
  )
}

