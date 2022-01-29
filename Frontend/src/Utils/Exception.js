export const exception_handler = (message) => {
  switch (message) {
    case "NotAuthorizedException": return 'Incorrect Password or Email!';
    case "CodeMismatchException": return 'Invalid Code, Try Again!';
    case "LimitExceededException": return 'Limit Exceeded, Try Later!';
    case 'UsernameExistsException': return 'Account already exists!';

    default: return 'Something Went Wrong!';
  }
}