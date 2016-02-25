var Note = React.createClass({
	getInitialState: function () {
		return {editing: false}
	},
	edit: function () {
		this.setState({editing: true});
	},
	save: function () {
		this.props.onChange(this.refs.newText.getDOMNode().value, this.props.index);
		this.setState({editing: false});
	},
	remove: function () {
		this.props.onRemove(this.props.index);
	},
	renderDisplay: function () {
		return (
			<div className="note">
				<p>{this.props.children}</p>
	          	<span>
	          		<button onClick={this.edit} className="btn btn-primary glyphicon glyphicon-pencil"/>
	          		<button onClick={this.remove} className="btn btn-danger glyphicon glyphicon-trash"/>
	          	</span>
			</div>
		);
	},
	renderForm: function () {
		return (
			<div className="note">
				<textarea ref="newText" defaultValue={this.props.children} className="form-control"></textarea>
				<button onClick={this.save} className="btn btn-success btn-sm glyphicon glyphicon-floppy-disk"/>
			</div>
		);
	},
	render: function () {
		if (this.state.editing) {
			return this.renderForm();
		} else {
			return this.renderDisplay();
		}
	}
});

var Board = React.createClass({
	propTypes: {
		count: function (props, propName) {
			if (typeof props[propName] !== "number") {
				return new Error('The count property must be a number!');
			}
			if (props[propName] > 100) {
				return new Error('Creating ' + props[propName] + ' notes is not a good idea!');
			}
		}
	},
	getInitialState: function () {
		return {
			notes: [
				'Call Amir',
				'Email Brittany',
				'Whats App Alina',
				'Pick up Shadi'
			]
		};
	},
	update: function (newText, i) {
		var arr = this.state.notes;
		arr[i] = newText;
		this.setState({notes: arr});
	},
	remove: function (i) {
		var arr = this.state.notes;
		arr.splice(i, 1);
		this.setState({notes: arr});
	},
	eachNote: function (note, i) {
		return (
			<Note key={i}
			      index={i}
			      onChange={this.update}
			      onRemove={this.remove}
			>{note}</Note>
		);
	},
	render: function () {
		return (
			<div className="board">
				{this.state.notes.map(this.eachNote)}
			</div>
		);
	}
});

React.render(<Board count={10}/>, document.getElementById('react-container'));

