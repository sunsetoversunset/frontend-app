import { useState, useEffect, React } from 'react'
import '../../styles/App.scss'
import '../../styles/Tables.scss'
import { dataRows } from "../../assets/data/dataRows"
import Config from "../../config.json"
import axios from "axios"

export const CensusTable = (props) => {
	const [allCensusData, setAllCensusData] = useState(null)
	const [isVisible, setIsVisible] = useState(true)

	//API call consts
	const boundUrl = `https://api.baserow.io/api/database/rows/table/`
	const opts = {
  		headers: {'Authorization': `Token ${Config.apiToken}`} 
	}

	useEffect( () => {
    	loadTrackt(boundUrl + `27382/?user_field_names=true&filter__field_144151__equal=${props.address}`)
  	}, [props.address])


	const loadTrackt = (url) => {
	axios.get(url, opts)
	.then((res) => {  
	  if (res.status === 200) {
	    // handle data
	      loadCensus(res.data.results)
	    
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


	const loadCensus = (tractLookups) => {
		let decennials = ["1960", "1970", "1980", "1990", "2000", "2010"];
        let lookups = tractLookups;
        let tempData = []
        let organisedData = {}

            decennials.forEach(d => {

                let thisYearsTract = lookups[0].[`tract_${d}`];

                let queryURL = `https://api.baserow.io/api/database/rows/table/25442/?user_field_names=true&filter__field_133865__equal=${thisYearsTract}&filter__field_133866__equal=${d}`
                axios.get(queryURL, opts)
                    .then(variableData => {
                    	if(variableData.length <= 1){setIsVisible(false)}
                       organisedData = {
                       	year: d,
                       data: variableData.data.results
                   		}

				    tempData.push(organisedData)
            		})
            		.catch((err) => {
				      console.log('err: ', err)
				    })
            })
            setAllCensusData(tempData)
	}


	const renderRows = () => {
		return(
			<table>
				<tbody>
				{dataRows.map( (ent, key) => {
					return(
						<tr key={key} className={ent.shortname}>
						<td>{ent.goodname}</td>
							{renderColumns(ent, key)}
						</tr>
						)
					})
				}
				</tbody>
			</table>
		)
	}

	const renderColumns = (ent, key) => {
		return(
			<>
			{allCensusData ? allCensusData.sort((a, b) => (a.year > b.year) ? 1 : -1): null}
				{allCensusData ? allCensusData.map( (year, keytwo) => {
					if(ent.shortname === 'tract'){
					return(
						<td key={keytwo}>
							{year.data[key].tract}
						</td>
						)
					}else if(ent.shortname === 'year'){
					return(
						<th key={keytwo}>
							{year.year}
						</th>
						)
					}else{
					return(
						<td key={keytwo}>
						{checkAllColumn(ent, key, year, keytwo)}
						</td>
						)
						
					}
				}): null
			}
		</>
		)
	}

	const checkAllColumn = (ent, key, year, keytwo) => {
		return(
			<>
			{year && year.data.map( (data, keythree) => {
				if(ent.shortname === data.variable && data.value){
					return(
						<p key={keythree}>
							{`${data.value}`}
						</p>
						)
				}
			})}
			</>
			)
	}


	return(
		<div className={"censusTable dataTable "+ (isVisible ? "active" : "inactive")} >
			<h1>Census</h1> 
		{/*<span className="see-notes">See Notes ></span>*/}
			<span>{	renderRows()}</span>
		</div>
		)
}