import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RichTextEditor from 'react-rte';


class TextEditorField extends Component {

  static propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string
  }
  constructor() {
    super();
    this.state = {
      value: RichTextEditor.createEmptyValue(),
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.submitSucceeded) {
      this.setState({ value: RichTextEditor.createEmptyValue() });
    }
  }
  onChange(value) {
    this.setState({value});
    if (this.props.onChange) {
      // this.props.onChange(value.toString('html'));
      let html = value.toString('html');
      if(html.length === 2 && html.charCodeAt(0) === 8203 && html.charCodeAt(1) === 10) {
        html = ''
      }
      this.props.input.onChange(html)
    }
  }



  render() {
    console.log(this.state);
    return (
      <RichTextEditor
        editorClassName="react-rte"
        value={this.state.value}
        onChange={value => this.onChange(value)}
      />
    );
  }
}

TextEditorField.propTypes = {
  onChange: PropTypes.func,
};

const noop = () => {};
TextEditorField.defaultProps = {
  onChange: noop,
};

export default TextEditorField;
