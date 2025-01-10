import AlignToolbarPlugin from './plugins/AlignToolbarPlugin';
import HeadingToolbarPlugin from './plugins/HeadingToolbarPlugin';
import IndentToolbarPlugin from './plugins/IndentToolbarPlugin';
import ListToolbarPlugin from './plugins/ListToolbarPlugin';
import TableToolbarPlugin from './plugins/TableToolbarPlugin';
import TextFormatToolbarPlugin from './plugins/TextFormatToolbarPlugin';

const iconSize = 1.2;

interface ToolbarButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
}

export const ToolbarButton = (props: ToolbarButtonProps): JSX.Element => {
  return (
    <button
      className="bg-tertiary hover:text-accent my-auto h-full rounded pb-0.5 pl-1 pr-1 pt-1"
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export function ToolbarPlugin(): JSX.Element {
  return (
    <div className="text-tertiary flex flex-wrap gap-2">
      <HeadingToolbarPlugin iconSize={iconSize} />
      <TextFormatToolbarPlugin iconSize={iconSize} />
      <ListToolbarPlugin iconSize={iconSize} />
      <IndentToolbarPlugin iconSize={iconSize} />
      <AlignToolbarPlugin iconSize={iconSize} />
      <TableToolbarPlugin iconSize={iconSize} />
    </div>
  );
}
