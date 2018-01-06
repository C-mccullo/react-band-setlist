import React from 'react';

const LoginModal = (props) => {
  return (
    <div className="LoginModal">
      { props.currentUser ?
				<button onClick={props.logout}>Log Out</button>                
				:
				<button onClick={props.login}>Log In</button>              
			}
    </div>
  )
}

export default LoginModal