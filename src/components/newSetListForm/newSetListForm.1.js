import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "./newSetListForm.scss";

import * as newSetListActions from "./actions";

class NewSetListForm extends Component {
	constructor(props) {
		super(props);
		this.submitSong = this.submitSong.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount() {
		console.log(this.props.newSetList)
	}

	handleChange(e) {
		this.props.actions.updateNewSong(e.target.value)
	}
	
	submitSong(e) {
		e.preventDefault();
		this.props.actions.addSongToList()
	}
	
	render() {
		return(
			<section>
			<article className="new_setList">
					<ol>
					{ typeof(this.props.newSetList.songList) !== 'undefined' ?
						Object.keys(this.props.newSetList.songList).map((key, index) => {
							return (
								<li className="setList_item" key={ key } id={ `song-${index}` }> 
									<p>{this.props.newSetList.songList[key] }</p>
									<i className="fa fa-times delete-song" onClick={() => this.props.actions.removeSongFromList(key) }></i>
								</li>
							)
						}) : null
					}
					</ol>
					<button className="button setList_btn__push" type="submit" onClick={ this.addSetList }>Submit New List</button>
					<button className="button setList_btn__reset" 
						onClick={ this.props.actions.resetNewListForm }>
						Reset this list
					</button>
				</article>

				<form className="form">
					<input
						className="input setList_input__text"
						type="text"
						value={this.props.newSetList.newSong}
						onChange={ this.handleChange }
						maxLength={35}
					/>
					<input 
						className="button setList_input__submit"
						type="submit" 
						value="add song" 
						onClick={(e)=>  this.submitSong(e) }
					/>
				</form>
			</section>
		)
	}
}

function mapStateToProps(state) {
	console.log("newSetListForm state", state);
	return {
		newSetList: {
			newSong: state.newListForm.newSetList.newSong,
			songList: state.newListForm.newSetList.songList, 
			used: state.newListForm.newSetList.used, 
			timeStamp: state.newListForm.newSetList.timeStamp,
		},
		newPostCount: state.newListForm.newPostCount
	}
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators({
			fetchNewList: newSetListActions.fetchNewList,
			resetNewListForm: newSetListActions.resetNewListForm,
			updateNewSong: newSetListActions.updateNewSong,
			addSongToList: newSetListActions.addSongToList,
			removeSongFromList: newSetListActions.removeSongFromList
		}, dispatch)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(NewSetListForm);