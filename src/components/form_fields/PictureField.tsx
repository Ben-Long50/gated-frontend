import { FormApi } from '@tanstack/react-form';
import ThemeContainer from '../ThemeContainer';
import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from 'src/contexts/ThemeContext';
import ArrowHeader4 from '../ArrowHeader4';
import Icon from '@mdi/react';
import { mdiCloseBox, mdiImagePlus } from '@mdi/js';

type SizeInfo = {
  aspectRatio: string;
  minHeight: string;
  maxHeight: string;
};

const PictureField = ({
  form,
  sizeInfo,
}: {
  form: FormApi;
  sizeInfo: SizeInfo;
}) => {
  const { accentPrimary } = useContext(ThemeContext);
  const [imagePreview, setImagePreview] = useState('');
  const [aspectRatio, setAspectRatio] = useState(sizeInfo.aspectRatio);

  useEffect(() => {
    const pictureInfo = form.getFieldValue('picture');
    if (pictureInfo) {
      setImagePreview(pictureInfo.imageUrl);
    } else setImagePreview('');
  }, [form]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      form.setFieldValue('picture', selectedFile);

      const fileUrl = URL.createObjectURL(selectedFile);
      setImagePreview(fileUrl);
    }
  };

  return (
    <div className="flex flex-col gap-4 sm:gap-8">
      <div className="flex aspect-square w-full items-center">
        <ThemeContainer
          className="mx-auto my-auto w-full"
          chamfer="medium"
          borderColor={accentPrimary}
          overflowHidden={true}
        >
          {!imagePreview ? (
            <label
              className="bg-secondary flex w-full cursor-pointer flex-col items-center justify-center"
              style={sizeInfo}
            >
              <div className="flex flex-col items-center justify-center gap-2 pb-6 pt-5">
                <Icon className="text-tertiary" path={mdiImagePlus} size={3} />
                <p className="text-tertiary font-semibold">Upload Picture</p>
                <p className="text-tertiary">PNG, JPG, JPEG</p>
              </div>
              <input
                id="file"
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          ) : (
            <form.Subscribe selector={(state) => state.values.position}>
              {(position) => (
                <div
                  className="bg-secondary h-full w-full overflow-hidden bg-black"
                  style={{
                    aspectRatio,
                    maxHeight: sizeInfo.maxHeight,
                    minHeight: sizeInfo.minHeight,
                  }}
                >
                  <img
                    className="h-full w-full object-cover"
                    src={imagePreview}
                    alt="Preview"
                    style={{
                      objectPosition: `${position.x}% ${position.y}%`,
                    }}
                  />
                  <button
                    className="text-secondary absolute right-2 top-2 rounded-md bg-zinc-900"
                    onClick={() => {
                      form.setFieldValue('picture', '');
                      setImagePreview('');
                    }}
                  >
                    <Icon path={mdiCloseBox} size={1.5} />
                  </button>
                </div>
              )}
            </form.Subscribe>
          )}
        </ThemeContainer>
      </div>

      <div className="items-centerv flex flex-wrap items-center justify-between gap-4">
        <ArrowHeader4 title="Aspect Ratio Previews" />
        <div className="flex items-center gap-4">
          <button
            className={`${aspectRatio === '1/1' ? 'text-accent' : 'text-tertiary'} bg-tertiary timing hover:text-accent size-12 rounded-md text-center font-semibold shadow-md shadow-black`}
            onClick={(e) => {
              e.preventDefault();
              setAspectRatio('1/1');
            }}
          >
            1 : 1
          </button>
          <button
            className={`${aspectRatio === '5/4' ? 'text-accent' : 'text-tertiary'} bg-tertiary timing hover:text-accent size-12 rounded-md text-center font-semibold shadow-md shadow-black`}
            onClick={(e) => {
              e.preventDefault();
              setAspectRatio('5/4');
            }}
          >
            5 : 4
          </button>
          <button
            className={`${aspectRatio === '10/3' ? 'text-accent' : 'text-tertiary'} bg-tertiary timing hover:text-accent size-12 rounded-md text-center font-semibold shadow-md shadow-black`}
            onClick={(e) => {
              e.preventDefault();
              setAspectRatio('10/3');
            }}
          >
            10 : 3
          </button>
        </div>
      </div>
      <form.Field name="position.y">
        {(field) => (
          <label className="flex flex-col gap-4" htmlFor="position">
            <div className="flex justify-between">
              <ArrowHeader4 title="Picture Position (Vertical)" />
              <h4>{field.state.value}%</h4>
            </div>
            <input
              id="position"
              name="position.y"
              className="w-full"
              onChange={(e) => field.handleChange(Number(e.target.value))}
              value={field.state.value}
              type="range"
              min={0}
              max={100}
            />
          </label>
        )}
      </form.Field>
    </div>
  );
};

export default PictureField;
