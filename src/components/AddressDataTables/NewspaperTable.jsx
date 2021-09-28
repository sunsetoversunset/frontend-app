import { useState, useEffect, React } from 'react'
import '../../styles/App.scss'
import '../../styles/Tables.scss'
import { dataFields } from "../../assets/data/dataFields"
import { dataRows } from "../../assets/data/dataRows"
import Config from "../../config.json"
import axios from "axios"

export const NewspaperTable = (props) => {
	const [allNewspaperData, setAllNewspaperData] = useState(null)


	//API call consts
	const boundUrl = `https://api.baserow.io/api/database/rows/table/`
	const opts = {
  		headers: {'Authorization': `Token ${Config.apiToken}`} 
	}

	useEffect( () => {
    	loadNewspaper(boundUrl + `20025/?user_field_names=true&filter__field_105100__equal=${props.address}`)
  	}, [props.address])


	const loadNewspaper = (url) => {	
		let tempNews = []

	axios.get(url, opts)
	.then((res) => {  
	  if (res.status === 200) {
	    // handle data
	      res.data.results.forEach( e => {
	      	tempNews.push(e)
	      })
	      setAllNewspaperData(tempNews)
	  	
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


	const renderRows = () => {
		return(
			<table>
				<tbody>
					<tr className="year">
						<td>Date</td>
						<td>Publication</td>
						<td>Article</td>
					</tr>
					{ allNewspaperData && allNewspaperData.sort((a, b) => (a.year > b.year) ? 1 : -1) && 
						allNewspaperData.map( (entry, key) => {
						return(
							<tr key={key}>
								<td>{`${entry.month}/${entry.day}/${entry.year}`}</td>
								<td>{entry.source}</td>
								<td>
								{entry.url ? 
									(<a href={entry.url} target="_blank" > 
									<p className="title">{entry.title}</p>
									<p>{entry.entry}</p>
									</a>) : 
									(<><p className="title">{entry.title}</p>
									<p>{entry.entry}</p></>)
								}
								</td>
							</tr>
							)
					})
					}
				</tbody>
			</table>
		)
	}


	return(
		<div className="censusTable dataTable">
			<h1>Newspapers</h1> <span className="see-notes">See Notes ></span>
			<span>{	renderRows()}</span>
		</div>
		)
}