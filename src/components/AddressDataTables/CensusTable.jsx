import { useState, useEffect, React } from 'react'
import '../../styles/App.scss'
import '../../styles/Tables.scss'
import { dataFields } from "../../assets/data/dataFields"
import { dataRows } from "../../assets/data/dataRows"
import Config from "../../config.json"
import axios from "axios"


						let barfpoop = []
export const CensusTable = (props) => {
	const [allCensusData, setAllCensusData] = useState(null)

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
						<tr key={key}>
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
			{allCensusData && allCensusData.sort((a, b) => (a.year > b.year) ? 1 : -1)}
				{allCensusData && allCensusData.map( (year, keytwo) => {
					if(ent.shortname === 'tract'){
					return(
						<td key={keytwo}>
							{year.data[key].tract}
						</td>
						)
					}else if(ent.shortname === 'year'){
					return(
						<td key={keytwo}>
							{year.year}
						</td>
						)
					}else{
					return(
						<td key={keytwo}>
						{checkAllColumn(ent, key, year, keytwo)}
						</td>
						)
						
					}
				})
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
						<p>
							{data.value}
						</p>
						)
				}
			})}
			</>
			)
	}


	return(
		<div className="censusTable">
			{/*console.log(allCensusData)*/}
			<h1>Census</h1> <span className="see-notes">See Notes ></span>
			<span>{	renderRows()}</span>
			<table>
				<tbody>

					{/*dataRows.map( (ent, key) => {
						let entz = ent
						let keyz = key
						return(
							<tr key={key}>
								<td>{ent.goodname}</td>
								{allCensusData && allCensusData.sort((a, b) => (a.year > b.year) ? 1 : -1) &&
									allCensusData.map( (year, keytwo) => {
										let yearz = year
										let keytwoz = keytwo

										year.data.map( (data, keythree) => {
											
											if(entz.shortname === data.variable){
												barfpoop.push(entz.shortname)
												return(
													<h1>sporn</h1>
													)
											}
										})


										if(entz.shortname === 'tract'){
										return(
											<td key={keytwoz}>
												{year.data[key].tract}
											</td>
											)
										}else if(entz.shortname === 'year'){
										return(
											<td key={keytwoz}>
												{year.year}
											</td>
											)
										}
										
									})
								}

							</tr>
							)
						 })
					*/}

				</tbody>
			</table>
			{console.log(barfpoop)}
		</div>
		)
}