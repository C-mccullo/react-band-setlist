import React, { Component } from 'react';
import './newSetListForm.css';

class NewSetListForm extends Component {
	constructor(props) {
		super(props);
		this.onInputChange = this.onInputChange.bind(this);
		this.updateList = this.updateList.bind(this);
		this.resetList = this.resetList.bind(this);
		this.addSetList = this.addSetList.bind(this);

		this.state = {
			newSong: "",
			songList: [],
			used: false,
			timeStamp: ""
		}
	}

	resetList() {
		this.setState({ 
			newSong: "", 
			songList: [], 
			used: false, 
			timeStamp: ""
		})
	}

	onInputChange(song) {
		this.setState({ newSong: song });
	}

	updateList(e) {
		e.preventDefault();
		const newSong = this.state.newSong;
		const newSongList = this.state.songList;
		if (newSong !== "" ) {
			let updatedSongList = newSongList.concat(newSong);
			this.setState({ newSong: "", songList: updatedSongList });
		}
	}

	addSetList(e) {
		e.preventDefault();
		const newSongList = this.state.songList;
		if (newSongList <= 0) {
			window.alert("Ooops! Please add some songs to your new song list");
		} else {
			this.props.onAddSetList(this.state);
			this.resetList();
		}
	}

	removeSong(index) {
		const songIndex = index
		const newSongList = this.state.songList;
		newSongList.splice(songIndex, 1);
		this.setState({ songList: newSongList });
	}
	
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
									<i className="fa fa-times delete-song" onClick={ e => this.removeSong(index) }></i>
								</li>
							)
						}) : null
					}
					</ol>
					<button className="button setList_btn__push" type="submit" onClick={ this.addSetList }>Submit New List</button>
					<button className="button setList_btn__reset" onClick={ this.resetList }>
						Reset this list
					</button>
				</article>
				<form className="form">
					<input
						className="input setList_input__text"
						type="text"
						placeholder="type in the name of a song"
						value={this.state.newSong}
						onChange={ e => this.onInputChange(e.target.value) }
						maxLength={35}
					/>
					<input 
						className="button setList_input__submit"
						type="submit" 
						value="add song" 
						onClick={ this.updateList }
					/>
				</form>
			</section>
		)
	}
}

export default NewSetListForm;