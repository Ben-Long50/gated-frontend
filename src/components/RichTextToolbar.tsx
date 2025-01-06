import { Quill } from 'react-quill';
import ImageResize from 'quill-image-resize-module-react';
import ImageUploader from 'quill-image-uploader';
import handleResponse from '../hooks/handleResponse';

const Size = Quill.import('formats/size');
Size.whitelist = ['extra-small', 'small', 'medium', 'large'];
Quill.register(Size, true);

const Font = Quill.import('attributors/style/font');
Font.whitelist = ['Exo-Regular', 'Omnitrinx'];

Quill.register(Font, true);

Quill.register('modules/imageResize', ImageResize);

Quill.register('modules/imageUploader', ImageUploader);

export const modules = {
  toolbar: {
    container: '#toolbar',
  },
  imageResize: {
    parchment: Quill.import('parchment'),
  },
  imageUploader: {
    upload: async (file) => {
      const formData = new FormData();

      formData.append('picture', file);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/book/image`,
        {
          method: 'POST',
          body: formData,
        },
      );
      const data = await handleResponse(response);
      console.log(data);

      return data;
    },
  },
};

export const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'align',
  'strike',
  'script',
  'blockquote',
  'background',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'color',
  'table',
];

const RichTextToolbar = (props) => (
  <div id="toolbar" className={props.className}>
    <span className="ql-formats">
      <select className="ql-font" defaultValue="arial">
        <option value="Exo-Regular">Exo-Regular</option>
        <option value="Omnitrinx">Omnitrinx</option>
      </select>
      <select className="ql-size" defaultValue="medium">
        <option value="extra-small">Size 1</option>
        <option value="small">Size 2</option>
        <option value="medium">Size 3</option>
        <option value="large">Size 4</option>
      </select>
      <select className="ql-header" defaultValue="3">
        <option value="1">Heading</option>
        <option value="2">Subheading</option>
        <option value="3">Normal</option>
      </select>
    </span>
    <span className="ql-formats">
      <button className="ql-bold" />
      <button className="ql-italic" />
      <button className="ql-underline" />
      <button className="ql-strike" />
    </span>
    <span className="ql-formats">
      <button className="ql-list" value="ordered" />
      <button className="ql-list" value="bullet" />
      <button className="ql-indent" value="-1" />
      <button className="ql-indent" value="+1" />
    </span>
    <span className="ql-formats">
      <button className="ql-script" value="super" />
      <button className="ql-script" value="sub" />
      <button className="ql-blockquote" />
    </span>
    <span className="ql-formats">
      <select className="ql-align" />
      <select className="ql-color" />
      <select className="ql-background" />
    </span>
    <span className="ql-formats">
      <button className="ql-link" />
      <button className="ql-image" />
      <button className="ql-video" />
    </span>
    <span className="ql-formats">
      <button className="ql-clean" />
    </span>
  </div>
);

export default RichTextToolbar;
