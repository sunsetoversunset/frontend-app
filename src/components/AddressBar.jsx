import { useEffect, useRef, useState } from "react"
import * as d3 from "d3"
 
export const AddressBar = (props) => {
  const [bbox, setBbox]  = useState({});
  const addressContainer = useRef(null)
  const addressRef       = useRef(null)

  // ---------------------------------------------------------------
  const set = () => {
    setBbox(addressContainer && addressContainer.current ? addressContainer.current.getBoundingClientRect() : {});
  }

  // ---------------------------------------------------------------
  useEffect(() => {
    let addressesN = d3.selectAll('.addresses-text-n')
    let addressesS = d3.selectAll('.addresses-text-s')

    addressesN.transition()
      .attr("transform", "translate(" + -props.scrollAmount + ",0)");

    addressesS.transition()
      .attr("transform", "translate(" + props.scrollAmount + ",0)");
  }, [props.scrollAmount])

  // ---------------------------------------------------------------
  useEffect(() => {
    set()
    window.addEventListener('resize', set);
    return () => window.removeEventListener('resize', set);
  }, [])

  // ---------------------------------------------------------------
  useEffect(() => {
    const svg = d3.select(addressRef.current)

    if (props.directionFacing === 'n') {
      svg.selectAll(`.addresses-text-n`).attr("class", 'addresses-text-n visible');
      svg.selectAll(`.addresses-text-s`).attr("class", 'addresses-text-s hidden');
    } else {
      svg.selectAll(`.addresses-text-s`).attr("class", 'addresses-text-s visible');
      svg.selectAll(`.addresses-text-n`).attr("class", 'addresses-text-n hidden');
    }

  }, [props.directionFacing])

  // ---------------------------------------------------------------
  useEffect(() => {
    const svg = d3.select(addressRef.current)
      .attr("width", bbox.width)
      .attr("height", bbox.height)

    // clear out before we draw
    svg.selectAll("*").remove();

    // N addresses
    if (props.directionFacing === 'n') {
      svg.append('g')
        .attr('class', 'addresses-text-n')
        .selectAll('text')
        // .data(props.filteredAddressesN)
        .data(props.addressesNData)
        .enter()
        .append('text')
        .attr("x", function(d) {
          return ((parseFloat(d.coord_max) + parseFloat(d.coord_min)) / 2) * props.mult 
        })
        .attr("y", "45")
        .on('click', function(d){
          window.open(`${window.location.origin}/#/address/${this.innerHTML}/`)
        })
        .attr("text-anchor", "middle")
        .text(function(d) { 
          return d.address 
        })
    } else {
      // S addresses
      svg.append('g')
        .attr('class', 'addresses-text-s')
        .selectAll('text')
        // .data(props.filteredAddressesS)
        .data(props.addressesSData)
        .enter()
        .append('text')
        .attr("x", function(d) { 
          return (-(parseFloat(d.coord_max) + parseFloat(d.coord_min)) / 2) * props.mult
        })
        .attr("y", "45")
        .on('click', function(d) {
          window.open(`${window.location.origin}/#/address/${this.innerHTML}/`)
        })
        .attr("text-anchor", "middle")
        .text(function(d) { 
          return d.address 
        })
    }
  
  }, [
    props.mult,
    props.addressesNData, 
    props.addressesSData, 
    // props.filteredAddressesN,
    // props.filteredAddressesS,
    props.directionFacing,
    bbox
  ])

  // ---------------------------------------------------------------
  return (
    <div ref={ addressContainer } className="strip-addresses">
      <svg
        ref={addressRef}
      />
    </div>
  )
}