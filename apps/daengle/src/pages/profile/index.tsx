import React from 'react';
import myProfile from '../../assets/images/profile.svg';
import Header from '~/components/profile/header';
import Footer from '~/components/profile/footer';

function profile() {
  return (
    <div>
      <Header />
      <title>사용자 프로필 수정</title>
      <div>
        <img src={myProfile} />
      </div>
      <div>
        <section>
          <div>닉네임</div>
          <div>
            <input type="text" />
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default profile;
