import React, { PropTypes, Component } from 'react';
import { Components, registerComponent, withCurrentUser } from 'meteor/vulcan:core';
import Editor, { Editable, createEmptyState } from 'ory-editor-core';
import { Trash, DisplayModeToggle, Toolbar } from 'ory-editor-ui'
import withEditor from './withEditor.jsx'
import { IntercomAPI } from 'react-intercom';

const placeholderContent = {
    id: '2',
    cells: [{
      rows: [
        {
          cells: [
            {
              content: {
                plugin: {
                  name: 'ory/editor/core/content/slate'
                },
                state: {}
              },
              id: '7d29c96e-53b8-4b3e-b0f1-758b405d6daf'
            }
          ],
          id: 'd62fe894-5795-4f00-80c8-0a5c9cfe85b9'
        },
      ],
      id: '15efd3c3-b683-4da6-b107-16d8d0c8cd26'
    }]
  };


class PostEditor extends Component {
  constructor(props) {
    super(props);
    const editor = this.props.editor;
    const document = this.props.document;

    if (document && document.content) {
      // Perform deep copy on content to avoid Slate bug when passing
      // in frozen or immutable objects
      const state = JSON.parse(JSON.stringify(document.content));
      editor.trigger.editable.add(state)
    } else {
      editor.trigger.editable.add(placeholderContent);
    }

  }

  render() {
    IntercomAPI('hide');
    const document = this.props.document;
    const addValues = this.context.addToAutofilledValues;
    const editor = this.props.editor;

    const onChange = function(data) {
      addValues({content: data});
      return data;
    };

    return (
      <div className="postEditor">
        <Editable editor={editor} id={placeholderContent.id} onChange={onChange} />
        <Trash editor={editor} />
        <DisplayModeToggle editor={editor} />
        <Toolbar editor={editor} />
      </div>
    );
  }
}

PostEditor.contextTypes = {
  addToAutofilledValues: React.PropTypes.func,
}

registerComponent('PostEditor', PostEditor, withEditor, withCurrentUser);

export default withEditor(PostEditor);
