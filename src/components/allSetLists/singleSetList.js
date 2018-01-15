import React from 'react';
import './singleSetList.scss';

function SingleSetList(props) {
	const setList = props.setList;
	const stampSetList = props.stampSetList
	const id = props.id;
	const songList = setList.songList.map((song, id) => {
		return <li key={id} id={`${setList.id}-track-${id}`}> { song } </li>
	})

	return (
		<article className="singleSetList column is-one-third">
			<span className="singleSetList_delete"
				onClick={() => props.deleteList(id)}>
				<i className="fa fa-times"></i>
			</span>
			<ol>
			{ songList }
			</ol>
			<button className="button primary" onClick={ ()=> props.useSetList(id) } >Use this setList</button>
			<span>{ props.setList.used ? `used on: ${setList.timeStamp}`  : "not yet used" }</span>
		</article>
	)
}

export default SingleSetList;