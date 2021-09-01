import React, { useEffect } from 'react';
import Router from 'next/router';

import { verifyToken, getCookieToken, signoutUser } from '../lib/utils';

const profile = ({ profile }) => {
  return (
    <div>
      <h1>Profile</h1>
    </div>
  );
};

export async function getServerSideProps({ req }) {
  const token = getCookieToken(req);
  let profile = verifyToken(token);

  if (!profile) {
    return {
      props: {},
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: {
      profile,
    },
  };
}

export default profile;
