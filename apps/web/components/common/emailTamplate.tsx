const EmailTamplate = ({
  firstName,
  lastName,
  email,
  phoneNo,
  message,
}: {
  firstName: string;
  lastName: string;
  email: string;
  phoneNo: string;
  message: string;
}) => {
  return (
    <div className="font-mono">
      <h2>Contact form submission</h2>
      <div className="flex items-center gap-2">
        <strong>First Name:</strong>
        <span>{firstName}</span>
      </div>
      <div className="flex items-center gap-2">
        <strong>Last Name:</strong>
        <span>{lastName}</span>
      </div>
      <div className="flex items-center gap-2">
        <strong>Email:</strong>
        <span>{email}</span>
      </div>
      <div className="flex items-center gap-2">
        <strong>Phone no:</strong>
        <span>{phoneNo}</span>
      </div>
      <div className="flex items-center gap-2">
        <strong>Message:</strong>
        <span>{message}</span>
      </div>
    </div>
  );
};

export default EmailTamplate;
