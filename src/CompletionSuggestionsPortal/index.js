import React, { Component } from 'react';

export default class CompletionSuggestionsPortal extends Component {

  componentWillMount() {
    this.props.store.register(this.props.offsetKey);
    this.updatePortalClientRect(this.props);

    // Trigger a re-render so the plugin becomes visible if necessary
    this.reRender();
  }

  componentWillReceiveProps(nextProps) {
    this.updatePortalClientRect(nextProps);
  }

  componentWillUnmount() {
    this.props.store.unregister(this.props.offsetKey);

    // Trigger a re-render so the plugin becomes hidden if necessary
    this.reRender();
  }

  reRender() {
    this.props.setEditorState(this.props.getEditorState());
  }

  updatePortalClientRect(props) {
    this.props.store.updatePortalClientRect(
      props.offsetKey,
      () => (
        this.refs.searchPortal.getBoundingClientRect()
      ),
    );
  }

  render() {
    return (
      <span className={this.key} ref="searchPortal">
        { this.props.children }
      </span>
    );
  }
}
