import { useState, useEffect, React } from 'react'
import '../../styles/App.scss'
import '../../styles/Tables.scss'
import Config from "../../config.json"
import axios from "axios"

export const OccupantsTable = (props) => {
	const [allOccupantData, setAllOccupantData] = useState(null)
	const [isVisible, setIsVisible] = useState(true)


	//API call consts
	const boundUrl = `https://api.baserow.io/api/database/rows/table/`
	const opts = {
  		headers: {'Authorization': `Token ${Config.apiToken}`} 
	}

	useEffect( () => {
    	loadOccupants(boundUrl + `20022/?user_field_names=true&filter__field_105086__equal=${props.address}`)
  	}, [props.address])


	const loadOccupants = (url, tempOccpData) => {	
	let tempData = tempOccpData || []

	axios.get(url, opts)
	.then((res) => {  
	  if (res.status === 200) {
	    // handle data
	      res.data.results.forEach( e => {
	      	tempData.push(e)
	      })
	      if(res.data.results.length < 1){setIsVisible(false)}
	      //handle loading next page if url exists
          if (res.data.next) {
            let nextUrl = res.data.next.replace("http", "https")
            return loadOccupants(nextUrl, tempData)
          } else {
            console.log('finished getting all data') 
            setAllOccupantData(tempData)
	  	}
	  	
	  } else {
	    // Handle case where baserow throws an error
	    console.error('Got baserow error status: ', res.status)
	    if (res.statusText !== "") {
	      console.log('Got baserow statusText: ', res.statusText)
	    }
	  }
	})
	.catch((err) => {
	  console.log('err: ', err)
	  setIsVisible(false)
	})
	}


	const renderRows = () => {
		return(
			<table>
				<tbody>
					<tr className="year">
						<th>Year</th>
						<th>Unit</th>
						<th>Occupants</th>
					</tr>
					{allOccupantData && allOccupantData.sort((a, b) => (a.year > b.year) ? 1 : -1) && 
						allOccupantData.map( (entry, key) => {
						return(
							<tr key={key}>
							{entry.address_fragment || allOccupantData.length === 1 ?
								(<>
									<td>{entry.year}</td>
									<td>{entry.address_fragment}</td>
									<td>{entry.entry}</td>
								</>) : null
							}
							</tr>
							)
					})
					}
				</tbody>
			</table>
		)
	}


	return(
		<div className={"occupantTable dataTable "+ (isVisible ? "active" : "inactive")}>
			<h1>Occupants</h1> <span className="see-notes">See Notes ></span>
			<span>{	renderRows()}</span>
		</div>
		)
}