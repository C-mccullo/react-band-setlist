import React from 'react';
import './singleSetList.css';

function SingleSetList(props) {
	const setList = props.setList;
	const useSetList = props.useSetList
	const id = props.id;

	const songList = setList.songList.map((song, id) => {
		return <li key={id} id={`${setList.id}-track-${id}`}> { song } </li>
	})

	return (
		<article className="singleSetList column is-one-third">
			<ol>
			{ songList }
			</ol>
			<button className="button primary" onClick={ () => useSetList(id) } > Use this setList </button>
			<span className="singleSetList_delete" 
				onClick={()=> props.deleteList(setList.id)}>
				<i className="fa fa-times"></i>
			</span>
			<span>{ props.used ? `used on ${setList.timeStamp}`  : null }</span>
		</article>
	)
}

export default SingleSetList;