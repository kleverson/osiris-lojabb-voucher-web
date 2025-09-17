const ErrorMessage = ({ error }: { error?: string }) => {
  if (!error) return null;
  return <p className="text-red-500 text-sm">{error}</p>;
};

export default ErrorMessage;
