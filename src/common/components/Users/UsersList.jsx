import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

const UsersContainer = styled.div`
  margin-top: 2rem;
  width: 100%;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

const UserCard = styled.div`
  padding: 1rem;
  margin-bottom: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  background-color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const UserInfo = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const UserName = styled.h3`
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
`;

const UserEmail = styled.p`
  margin: 0;
  color: #666;
`;

const ErrorMessage = styled.div`
  color: #e53e3e;
  padding: 1rem;
  text-align: center;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 1rem;
`;

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/auth/users`,
          {
            credentials: 'include',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const contentType = response.headers.get('content-type') || '';
        if (!contentType.includes('application/json')) {
          throw new Error('Unexpected response from server');
        }

        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching users:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <LoadingMessage>Loading users...</LoadingMessage>;
  }

  if (error) {
    return <ErrorMessage>Error: {error}</ErrorMessage>;
  }

  return (
    <UsersContainer>
      {users.map((user) => (
        <UserCard key={user.email}>
          <UserInfo>
            <div>
              <UserName>
                {user.firstname} {user.lastname} (
                {user.username || 'No username'})
              </UserName>
              <UserEmail>{user.email}</UserEmail>
            </div>
          </UserInfo>
        </UserCard>
      ))}
    </UsersContainer>
  );
}
