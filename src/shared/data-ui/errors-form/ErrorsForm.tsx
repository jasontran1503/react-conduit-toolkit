const ErrorsForm = ({ errors }: { errors: Record<string, string[]> }) => {
  const errorList = Object.keys(errors).map((key) => `${key} ${errors[key]}`);

  return (
    <>
      {errorList.length > 0 && (
        <ul className="error-messages">
          {errorList.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      )}
    </>
  );
};

export default ErrorsForm;
