import React from 'react';
import './App.css';

import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

import { user } from './types';

const users = gql`
  query {
    users (last: 10) {
      id
      email
      birth_date
      first_name
      depots {
        id
        address_1
      }
    }
  }
`;

const App: React.FC = () => {
  const { loading, error, data } = useQuery(users);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div className="App">
      <header className="App-header">
        {data.users.map((user:user) => (
          <div key={user.id}>
            <p>
              {user.first_name}
            </p>
          </div>
        ))}
      </header>
    </div>
  );
}

export default App;
