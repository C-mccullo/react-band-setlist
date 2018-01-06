import React, { Component } from 'react';


class GenerateNewList extends Component {
	constructor(props) {
    super(props);
    this.generateSetList = this.generateSetList.bind(this);
    this.packageGeneratedList = this.packageGeneratedList.bind(this);
    this.removeGeneratedList = this.removeGeneratedList.bind(this);

    this.state = {
      generatedList: [],
      hasGeneratedList: false
    }
  }

  generateSetList() {
  	if (this.props.setLists.length !== 0) {
	  	const setLists = this.props.setLists;
	  	let combinedSongList = [];
	  	let i;
	  	for ( i = 0; i < 8; i++ ) {
				let rand = Math.floor(Math.random() * setLists.length);
				let randSong = Math.floor(Math.random() * setLists[rand].songList.length);
		  	let songSelect = setLists[rand].songList[randSong];
				combinedSongList.push(songSelect);
	  	}
	  	this.setState({ generatedList: combinedSongList, hasGeneratedList: true });
		} else {
			console.log("the array is empty")
			return
		}
	}
	
	// timeStamp to be added later
  packageGeneratedList() {
  	const generatedList = this.state.generatedList;
  	const addedList = {
  		newSong: "",
			songList: generatedList,
			used: false,
			timeStamp: ""
  	}
  	this.props.onAddSetList(addedList);
  	this.removeGeneratedList();
  }

  removeGeneratedList() {
  	this.setState({ generatedList: [], hasGeneratedList: false });
  }

	render() {
		return(
			<section className="row">
				<article className="">
				{ 
					this.state.generatedList.length === 0 ?
					<div>
						<h3>Hey hit the button to generate a new setlist!</h3>
					</div>
					:
					null
				}
				{ typeof(this.state.generatedList) !== [] ?
					this.state.generatedList.map((song, index) => {
						return (
							<li key={ index }> {song} </li>
						)
					}) 
					: null
				}
				</article>
				{
					!this.state.hasGeneratedList ? (
						<div>
							<button className="button primary" onClick={ this.generateSetList }>Make a New Set List</button>
						</div>
					) : (
						<div>
							<button className="button primary" onClick={ this.packageGeneratedList }>Save this Set List!</button>
							<button className="button danger" onClick={ this.removeGeneratedList }>Try Again</button>
						</div>
					)
				}
			</section>
		)
	}
}


export default GenerateNewList;