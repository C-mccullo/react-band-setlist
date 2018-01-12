import React from 'react';
import SingleSetList from './singleSetList';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as setListActions from "./actions";
import * as setListFormActions from "../setListForm/actions";

class AllSetLists extends React.Component {

	componentDidMount() {
		// this.props.actions.resetCount();
	}

	render() {
		const setLists = this.props.setLists;
		console.log(setLists);
		return (
			<div>
				<h3>New Lists</h3>
				<section className="columns">
				{/* { 
					setLists.map((setList, id) => {
						return (
							<SingleSetList key={id}
								id={id} 
								useSetList={ this.props.actions.useSetList } 
								setList={ setLists[id] }
								deleteList={ this.props.actions.deleteList }/>
						)
					}) 
				} */}
				</section>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		setLists: state.setLists	
	}
}

function mapDispatchToProps(dispatch) {
	actions: bindActionCreators({
		resetCount: setListFormActions.resetCount,
		useSetList: setListActions.useSetList,
		fetchSetLists: setListActions.fetchSetLists
	})
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AllSetLists);