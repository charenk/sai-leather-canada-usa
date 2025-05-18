
import React from 'react';

interface FormSectionHeadingProps {
  number: number;
  title: string;
}

const FormSectionHeading: React.FC<FormSectionHeadingProps> = ({ number, title }) => {
  return (
    <h3 className="text-xl font-bold text-sai-navy mb-6 flex items-center gap-2">
      <span className="w-8 h-8 bg-sai-red/10 rounded-full flex items-center justify-center text-sai-red">
        {number}
      </span>
      {title}
    </h3>
  );
};

export default FormSectionHeading;
