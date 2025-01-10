import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
  mdiFormatBold,
  mdiFormatItalic,
  mdiFormatStrikethrough,
  mdiFormatUnderline,
} from '@mdi/js';
import Icon from '@mdi/react';
import { FORMAT_TEXT_COMMAND, TextFormatType } from 'lexical';
import { ToolbarButton } from '../LexicalToolbar';

const TextFormatToolbarPlugin = (props: { iconSize: number }): JSX.Element => {
  const [editor] = useLexicalComposerContext();
  const getIcon = (format: TextFormatType): JSX.Element | null => {
    switch (format) {
      case 'bold':
        return <Icon path={mdiFormatBold} size={props.iconSize} />;
      case 'italic':
        return <Icon path={mdiFormatItalic} size={props.iconSize} />;
      case 'strikethrough':
        return <Icon path={mdiFormatStrikethrough} size={props.iconSize} />;
      case 'underline':
        return <Icon path={mdiFormatUnderline} size={props.iconSize} />;
      default:
        return null;
    }
  };

  const onClick = (format: TextFormatType): void => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, format);
  };

  const supportedTextFormats: TextFormatType[] = [
    'bold',
    'italic',
    'underline',
    'strikethrough',
  ];

  return (
    <>
      {supportedTextFormats.map((format) => (
        <ToolbarButton
          key={format}
          aria-label={format}
          onClick={(e) => {
            e.preventDefault();
            onClick(format);
          }}
        >
          {getIcon(format)}
        </ToolbarButton>
      ))}
    </>
  );
};

export default TextFormatToolbarPlugin;
