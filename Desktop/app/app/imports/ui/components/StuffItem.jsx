import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { Stuffs } from '../../api/stuff/Stuff';
export let selected=[];

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class StuffItem extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
      super(props);
      this.state={checked:[]}
  }

  delete =() => {
   Stuffs.remove(this.props.stuff._id);
  }

  toggleChecked = () => {
    var i = selected.findIndex(id => id === this.props.stuff._id)
    if (i === -1){
        selected.push(this.props.stuff._id)
        this.setState({
            checked: selected
        })
    }else {
        selected = selected.filter(function(id, index, arr){
            return index !== i;
        });
        this.setState({
            checked: selected
        })
    }
};
  render() {
    return (
        <Table.Row>
          <Table.Cell>{this.props.stuff.name}</Table.Cell>
          <Table.Cell>{this.props.stuff.surname}</Table.Cell>
          <Table.Cell>{this.props.stuff.age}</Table.Cell>
          <Table.Cell>{this.props.stuff.country}</Table.Cell>
          <Table.Cell>
            <Link to={`/edit/${this.props.stuff._id}`}>Edit</Link>
            <button onClick={this.delete}>Delete</button>
            <input type="checkbox" ref="check" onClick={this.toggleChecked.bind(this)} />

          </Table.Cell>
        </Table.Row>
    );
  }
}

/** Require a document to be passed to this component. */
StuffItem.propTypes = {
  stuff: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(StuffItem);
