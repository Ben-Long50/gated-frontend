import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { ToolbarButton } from '../LexicalToolbar';
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
} from '@lexical/list';
import Icon from '@mdi/react';
import { mdiFormatListBulleted, mdiFormatListNumbered } from '@mdi/js';

const ListToolbarPlugin = (props: { iconSize: number }): JSX.Element => {
  const [editor] = useLexicalComposerContext();
  return (
    <>
      <ToolbarButton
        onClick={(e) => {
          e.preventDefault();
          editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
        }}
      >
        <Icon path={mdiFormatListNumbered} size={props.iconSize} />
      </ToolbarButton>
      <ToolbarButton
        onClick={(e) => {
          e.preventDefault();
          editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
        }}
      >
        <Icon path={mdiFormatListBulleted} size={props.iconSize} />
      </ToolbarButton>
    </>
  );
};

export default ListToolbarPlugin;
