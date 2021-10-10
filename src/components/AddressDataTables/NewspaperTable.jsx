	import { useState, useEffect, React, useRef } from 'react'
import '../../styles/App.scss'
import '../../styles/Tables.scss'
import Config from "../../config.json"
import axios from "axios"

export const NewspaperTable = (props) => {
	const [allNewspaperData, setAllNewspaperData] = useState(null)
	const [isVisible, setIsVisible] = useState(true)
	const articleEntry = useRef(null)


	//API call consts
	const boundUrl = `https://api.baserow.io/api/database/rows/table/`
	const opts = {
  		headers: {'Authorization': `Token ${Config.apiToken}`} 
	}

	useEffect( () => {
    	loadNewspaper(boundUrl + `20025/?user_field_names=true&filter__field_105100__equal=${props.address}`)
  	}, [props.address])

  	useEffect( () => {
    	let allEntries = document.querySelectorAll('.article .entry')
    	allEntries.forEach( entry => {
    		if(entry.clientHeight > 97){
    			entry.parentNode.classList.add('overflow')
    			entry.addEventListener('click', e => { 
    				if(entry.parentNode.classList.contains('overflow') && !entry.parentNode.classList.contains('overflow-open')){
    					entry.parentNode.classList.add('overflow-open')
    				}else if(entry.parentNode.classList.contains('overflow') && entry.parentNode.classList.contains('overflow-open')){
    					entry.parentNode.classList.remove('overflow-open')
    				}
    			})
    		}
    	})
  	}, [allNewspaperData])


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
	      if(res.data.results.length <= 1){
	      	setIsVisible(false)
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
						<th>Date</th>
						<th>Publication</th>
						<th>Article</th>
					</tr>
					{ allNewspaperData && allNewspaperData.sort((a, b) => (a.year > b.year) ? 1 : -1) && 
						allNewspaperData.map( (entry, key) => {
						return(
							<tr key={key}>
								<td>{`${entry.month}/${entry.day}/${entry.year}`}</td>
								<td>{entry.source}</td>
								<td className="article">
								{entry.url ? 
									(<><a href={entry.url} target="_blank" rel="noreferrer"> 
									<p className="title">{entry.title}</p></a>
									<p className="entry" ref={articleEntry}>{entry.entry}</p></>) : 
									(<><p className="title">{entry.title}</p>
									<p className="entry" ref={articleEntry}>{entry.entry}</p></>)
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
		<div className={"newspaperTable dataTable "+ (isVisible ? "active" : "inactive")}>
			<h1>Newspapers</h1> <span className="see-notes">See Notes ></span>
			<span>{	renderRows()}</span>
		</div>
		)
}