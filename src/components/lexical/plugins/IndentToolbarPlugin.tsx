import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
  COMMAND_PRIORITY_LOW,
  INDENT_CONTENT_COMMAND,
  INSERT_TAB_COMMAND,
  KEY_TAB_COMMAND,
  OUTDENT_CONTENT_COMMAND,
} from 'lexical';
import { ToolbarButton } from '../LexicalToolbar';
import Icon from '@mdi/react';
import { mdiFormatIndentDecrease, mdiFormatIndentIncrease } from '@mdi/js';

const IndentToolbarPlugin = (props: { iconSize: number }): JSX.Element => {
  const [editor] = useLexicalComposerContext();

  editor.registerCommand(
    KEY_TAB_COMMAND,
    (e: KeyboardEvent) => {
      e.preventDefault();
      editor.dispatchCommand(INSERT_TAB_COMMAND, undefined);
      return true;
    },
    COMMAND_PRIORITY_LOW,
  );

  return (
    <>
      <ToolbarButton
        onClick={(e) => {
          e.preventDefault();
          editor.dispatchCommand(INDENT_CONTENT_COMMAND, undefined);
        }}
      >
        <Icon path={mdiFormatIndentIncrease} size={props.iconSize} />
      </ToolbarButton>
      <ToolbarButton
        onClick={(e) => {
          e.preventDefault();
          editor.dispatchCommand(OUTDENT_CONTENT_COMMAND, undefined);
        }}
      >
        <Icon path={mdiFormatIndentDecrease} size={props.iconSize} />
      </ToolbarButton>
    </>
  );
};

export default IndentToolbarPlugin;
