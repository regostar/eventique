import React, { useState } from 'react';
import LoginSignupPage from './LoginSignupPage';
import SignupPage from './SignupPage';

function App() {
  const [isSignup, setIsSignup] = useState(false);

  const handleSignupButtonClick = () => {
    setIsSignup(true);
  };

  return (
    <div>
      {isSignup ? <SignupPage /> : <LoginSignupPage onSignupButtonClick={handleSignupButtonClick} />}
    </div>
  );
}

export default App;
