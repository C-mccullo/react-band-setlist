import React from 'react';
import SingleSetList from './singleSetList';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as setListActions from "./actions";
import * as setListFormActions from "../setListForm/actions";

class AllSetLists extends React.Component {
	constructor(props) {
		super(props)
	}

	componentDidMount() {
		// this.props.actions.fetchSetLists();
	}

	render() {
		console.log("setLists in component", this.props.setLists);
		return (
			<div>
				<h3>New Lists</h3>
				<section className="columns">
				{ 
					this.props.setLists.map((setList, id) => {
						return (
							<SingleSetList key={id}
								id={id} 
								useSetList={ this.props.actions.useSetList } 
								setList={ this.props.setLists[id] }
								deleteList={ this.props.actions.deleteList }/>
						)
					}) 
				}
				</section>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		setLists: state.setLists.setLists	
	}
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators({
			resetCount: setListFormActions.resetCount,
			useSetList: setListActions.useSetList,
			fetchSetLists: setListActions.fetchSetLists,
			deleteList: setListActions.deleteSetList
		}, dispatch)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AllSetLists);