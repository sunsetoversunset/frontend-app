import { useState, useEffect, React } from 'react'
import '../../styles/App.scss'
import '../../styles/Tables.scss'
import { dataRows } from "../../assets/data/dataRows"
import Config from "../../config.json"
import axios from "axios"

export const CensusTable = (props) => {
	const [ allCensusData, setAllCensusData ] = useState(null)
	const [ isVisible, setIsVisible ] = useState(true)

	const boundUrl = `https://api.baserow.io/api/database/rows/table/`
	const opts = { headers: {'Authorization': `Token ${Config.apiToken}`} }
	let tempData = []

	// ---------------------------------------------------------
	useEffect(() => {
		loadTract(boundUrl + `27382/?user_field_names=true&filter__field_144151__equal=${props.address}`)
	}, [props.address])

	// ---------------------------------------------------------
	const loadTract = (url) => {
		axios.get(url, opts)
		.then((res) => {  
			if (res.status === 200) {
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

	// ---------------------------------------------------------
	const getTractData = (queryURL, d) => {
		return axios.get(queryURL, opts)
			.then(res => {
				// console.log('[getTractData] res: ', res)
				if (res.status === 200) {
					console.log('[getTractData] done.')
					tempData.push({
						year: d,
						data: res.data.results
					})
				}
			})
			.catch((err) => {
				console.log('err: ', err)
			})
	}

	// ---------------------------------------------------------
	const loadCensus = async (tractLookups) => {
		let decennials = ["1960", "1970", "1980", "1990", "2000", "2010"];
		let lookups    = tractLookups;
		const promises = []

		decennials.forEach(d => {
			let thisYearsTract = lookups[0][`tract_${d}`];
			let queryURL = `https://api.baserow.io/api/database/rows/table/25442/?user_field_names=true&filter__field_133865__equal=${thisYearsTract}&filter__field_133866__equal=${d}`
			
			promises.push(getTractData(queryURL, d))
		})

		await Promise.all(promises)
		console.log('[loadCensus] done, tempData: ', tempData)
		setAllCensusData(tempData)
	}

	// ---------------------------------------------------------
	const renderRows = () => {
		return (
			<table>
				<tbody>
				{
					dataRows.map( (ent, key) => {
						return (
							<tr key={key} className={ent.shortname}>
								<td>{ent.goodname}</td>
								{/* { renderColumns(ent, key) } */}
							</tr>
						)
					})
				}
				</tbody>
			</table>
		)
	}

	// ---------------------------------------------------------
	const renderColumns = (ent, key) => {
		return (
			<>
				{ 
					allCensusData ? 
					allCensusData.sort((a, b) => (a.year > b.year) ? 1 : -1) : null 
				}
				{ 
					allCensusData ? 
					allCensusData.map((year, keytwo) => {
						if (ent.shortname === 'tract') {
							return (
								<td key={keytwo}>
									{ year.data[key].tract }
								</td>
							)
						}	else if(ent.shortname === 'year') {
							return (
								<th key={keytwo}>
									{year.year}
								</th>
							)
						} else {
							return (
								<td key={keytwo}>
									{ checkAllColumn(ent, key, year, keytwo) }
								</td>
							)
						}
					}) : null
				}
			</>
		)
	}

	// ---------------------------------------------------------
	const checkAllColumn = (ent, key, year, keytwo) => {
		return(
			<>
			{
				year && year.data.map((data, keythree) => {
				if (ent.shortname === data.variable && data.value) {
					return (
						<p key={keythree}>
							{`${data.value}`}
						</p>
					)
				}
			})}
		</>
		)
	}

	// ---------------------------------------------------------
	return (
		<div 
			className={"censusTable dataTable " + (isVisible ? "active" : "inactive")}
		>
			<h1>Census</h1> 
			<span className="see-notes">See Notes ></span>
			<span>{	renderRows() }</span>
		</div>
	)
}