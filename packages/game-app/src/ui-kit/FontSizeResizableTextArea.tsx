import { TextareaHTMLAttributes, DetailedHTMLProps, FC, useMemo, useState, useCallback, ChangeEvent } from 'react';

export type TextAreaProps = DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>;

interface FontSizeResizableTextAreaProps {
  textAreaProps: Omit<TextAreaProps, 'className'>;
  className?: TextAreaProps['className'];
}

const FontSizeResizableTextArea: FC<FontSizeResizableTextAreaProps> = ({
  textAreaProps: { onChange, value, style, ...others },
  className,
}) => {
  const [val, setValue] = useState(value);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      setValue(event.target.value);
      onChange && onChange(event);
    },
    [onChange],
  );

  const fontSize = useMemo(() => {
    const baseSize = 32;
    const amtLength = val ? val.toString().length : 0;
    const maxLength = 10;
    // increase/decrease deduction amount
    const fudgeFactor = 5;

    if (amtLength > maxLength) {
      const diff = amtLength - maxLength + fudgeFactor;
      return `${baseSize - diff}px`;
    }
    return `${baseSize}px`;
  }, [val]);

  const memoStyle = useMemo(() => {
    return { ...style, fontSize };
  }, [style, fontSize]);

  return <textarea className={className} style={memoStyle} {...others} onChange={handleChange} value={value} />;
};

FontSizeResizableTextArea.displayName = 'FontSizeResizableTextArea';

export default FontSizeResizableTextArea;
