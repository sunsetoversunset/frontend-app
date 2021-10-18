import '../../styles/App.scss'
import '../../styles/Tables.scss'

export const OnlineBuildingRecords = (props) => {

	return(
		<div className={"onlineBuildingRecordsTable dataTable "}>
			<h1>Online Building Records</h1> 
			{/*<span className="see-notes">See Notes ></span>*/}
			<table>
				<tbody>
					<tr>
						<td>
							<a target="_blank" rel="noreferrer" href="https://ladbsdoc.lacity.org/"> 
							Search online building records for this address <span className="arrow"></span>
							</a>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		)
}