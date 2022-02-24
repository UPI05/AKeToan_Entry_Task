import React from 'react';
import './index.scss';
import { useSelector } from 'react-redux';

function HomePage() {
  const userInfo = useSelector(state => state.userInfo);
  return (
    <div className="content-div">
      <div className="img">
        <img src={userInfo.imageUrl} />
      </div>
      <span>
        <h2>
          Hello <i style={{ color: 'blue' }}>{userInfo.name}</i>!
        </h2>
      </span>
    </div>
  );
}

export default HomePage;
