const LongText = ({ text = "--" }: { text?: string }) => {
  return <span className="max-w-3xs block truncate">{text}</span>;
};

export default LongText;
