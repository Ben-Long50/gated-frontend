import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { ToolbarButton } from '../LexicalToolbar';
import { FORMAT_ELEMENT_COMMAND } from 'lexical';
import {
  mdiFormatAlignCenter,
  mdiFormatAlignLeft,
  mdiFormatAlignRight,
} from '@mdi/js';
import Icon from '@mdi/react';

const AlignToolbarPlugin = (props: { iconSize: number }): JSX.Element => {
  const [editor] = useLexicalComposerContext();
  return (
    <>
      <ToolbarButton
        onClick={(e) => {
          e.preventDefault();
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left');
        }}
      >
        <Icon path={mdiFormatAlignLeft} size={props.iconSize} />
      </ToolbarButton>
      <ToolbarButton
        onClick={(e) => {
          e.preventDefault();
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center');
        }}
      >
        <Icon path={mdiFormatAlignCenter} size={props.iconSize} />
      </ToolbarButton>
      <ToolbarButton
        onClick={(e) => {
          e.preventDefault();
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right');
        }}
      >
        <Icon path={mdiFormatAlignRight} size={props.iconSize} />
      </ToolbarButton>
    </>
  );
};

export default AlignToolbarPlugin;
