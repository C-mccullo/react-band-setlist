import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "./newSetListForm.scss";

import * as newSetListActions from "./actions";

class NewSetListForm extends Component {
	constructor(props) {
		super(props);
	}
	// updateNewListSong
		// onInputChange(song) {
		// 	this.setState({ newSong: song });
		// }
	// addSongToList
		// updateList(e) {
		// 	e.preventDefault();
		// 	const newSong = this.state.newSong;
		// 	const newSongList = this.state.songList;
		// 	if (newSong !== "" ) {
		// 		let updatedSongList = newSongList.concat(newSong);
		// 		this.setState({ newSong: "", songList: updatedSongList });
		// 	}
		// }
	// addToSetLists (in allSetListsReducer)
		// addSetList(e) {
		// 	e.preventDefault();
		// 	const newSongList = this.state.songList;
		// 	if (newSongList <= 0) {
		// 		window.alert("Ooops! Please add some songs to your new song list");
		// 	} else {
		// 		this.props.onAddSetList(this.state);
		// 		this.resetList();
		// 	}
		// }
	// removeSongFromList
		// removeSong(index) {
		// 	const songIndex = index
		// 	const newSongList = this.state.songList;
		// 	newSongList.splice(songIndex, 1);
		// 	this.setState({ songList: newSongList });
		// }
	
	render() {
		return(
			<section>
			<article className="new_setList">
					<ol>
					{ typeof(this.state.songList) !== 'undefined' ?
						this.state.songList.map((song, index) => {
							return (
								<li className="setList_item" key={ index } id={ `song-${index}` }> 
									<p>{song}</p>
									<i className="fa fa-times delete-song" onClick={e => this.props.actions.removeSongFromList(index) }></i>
								</li>
							)
						}) : null
					}
					</ol>
					<button className="button setList_btn__push" type="submit" onClick={ this.addSetList }>Submit New List</button>
					<button className="button setList_btn__reset" onClick={ this.props.actions.resetNewListForm }>
						Reset this list
					</button>
				</article>

				<form className="form">
					<input
						className="input setList_input__text"
						type="text"
						placeholder="type in the name of a song"
						value={this.state.newSong}
						onChange={e => this.props.actions.updateNewListSong(e.target.value) }
						maxLength={35}
					/>
					<input 
						className="button setList_input__submit"
						type="submit" 
						value="add song" 
						onClick={this.props.actions.addSongToList }
					/>
				</form>
			</section>
		)
	}
}

function mapStateToProps(state) {
	return {
		newSetList: {
			newSong: state.newSetList.newSetList.newSong,
			songList: state.newSetList.newSetList.songList, 
			used: state.newSetList.newSetList.used, 
			timeStamp: state.newSetList.newSetList.timeStamp,
		},
		newPostCount: state.newSetList.newPostCount
	}
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators({
			resetNewListForm: newSetListActions.resetNewListForm,
			updateNewListSong: newSetListActions.updateNewListSong,
			addSongToList: newSetListActions.addSongToList,
			removeSongFromList: newSetListActions.removeSongFromList
		})
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(NewSetListForm);