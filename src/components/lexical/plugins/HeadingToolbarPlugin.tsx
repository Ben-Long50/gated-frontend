import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $createHeadingNode } from '@lexical/rich-text';
import { $setBlocksType } from '@lexical/selection';
import { mdiFormatHeader1, mdiFormatHeader2, mdiFormatHeader3 } from '@mdi/js';
import Icon from '@mdi/react';
import { $getSelection, $isRangeSelection } from 'lexical';
import { ToolbarButton } from '../LexicalToolbar';

type HeadingTag = 'h1' | 'h2' | 'h3';

const HeadingToolbarPlugin = (props: { iconSize: number }): JSX.Element => {
  const [editor] = useLexicalComposerContext();
  const getIcon = (format: HeadingTag): JSX.Element | null => {
    switch (format) {
      case 'h1':
        return <Icon path={mdiFormatHeader1} size={props.iconSize} />;
      case 'h2':
        return <Icon path={mdiFormatHeader2} size={props.iconSize} />;
      case 'h3':
        return <Icon path={mdiFormatHeader3} size={props.iconSize} />;
      default:
        return null;
    }
  };

  const headingTags: HeadingTag[] = ['h1', 'h2', 'h3'];

  const onClick = (tag: HeadingTag): void => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createHeadingNode(tag));
      }
    });
  };

  return (
    <>
      {headingTags.map((heading) => (
        <ToolbarButton
          onClick={(e) => {
            e.preventDefault();
            onClick(heading);
          }}
          key={heading}
          aria-label={heading}
        >
          {getIcon(heading)}
        </ToolbarButton>
      ))}
    </>
  );
};

export default HeadingToolbarPlugin;
