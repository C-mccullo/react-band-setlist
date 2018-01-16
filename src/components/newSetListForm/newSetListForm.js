import React, { Component } from "react";
import { Field, Form, reduxForm } from "redux-form";

import "./newSetListForm.scss";

class NewSetListForm extends Component {
  constructor(props) {
    super(props)
  }

  renderInput(field) {
    console.log("renderInput", { ...field })
    return (
      <div style={ { "display": "inline"}  }>
        <input { ...field.input } name={field.name} type={field.type}
          className={field.className} placeholder={field.placeholder} />
      </div>
    )
  }

  addToList(values) {
    console.log(values);
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <section>
        <Form className="form" onSubmit={ handleSubmit(this.addToList.bind(this))}>
          <Field name="newSong" component={this.renderInput} placeholder="add a new song" className="input setList_input__text" type="text"/>
          <button
            className="input setList_input__submit"
            type="submit"
            onClick={handleSubmit}
          > add song </button>
        </Form>
      </section>
    )
  }
}


{/* <input
  className="input setList_input__text"
  type="text"
  value={this.props.newSetList.newSong}
  onChange={this.handleChange}
  maxLength={35}
/> */}
{/* <input
  className="button setList_input__submit"
  type="submit"
  value="add song"
  onClick={(e) => this.submitSong(e)}
/> */}

export default reduxForm({
  form: "NewSetListForm"
})(NewSetListForm);