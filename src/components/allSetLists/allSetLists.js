import React from 'react';
import SingleSetList from './singleSetList';

class AllSetLists extends React.Component {

	componentDidMount() {
		this.props.onReset();
	}

	render() {
		const setLists = this.props.setLists;
		const useSetList = (id) => {
			this.props.onUseSetList(id);
		}
	
		return (
			<div>
				<h3>New Lists</h3>
				<section className="columns">
				{ 
					setLists.map((setList, id) => {
						return (
							<SingleSetList key={id} 
								stampSetList={ useSetList.bind(this, id) } 
								setList={ setLists[id] }
								onDeleteList={ this.props.onDeleteList }/>
						)
					}) 
				}
				</section>
			</div>
		)
	}
}

export default AllSetLists;