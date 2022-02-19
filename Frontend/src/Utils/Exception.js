export const exception_handler = (message) => {
  switch (message) {
    case "NotAuthorizedException": return 'Incorrect Credentials!';
    case "CodeMismatchException": return 'Invalid Code, Try Again!';
    case "LimitExceededException": return 'Limit Exceeded, Try Later!';
    case 'UsernameExistsException': return 'Account already exists!';
    case "NetworkError": return 'Network Error!';
    case "isAdminApprove": return 'Admin Not Approved';
    case "UserNotConfirmedException": return 'User is not Verified!';

    default: return 'Something Went Wrong!';
  }
}