import React from 'react'

interface IUserInfoProps {
  name: string;
  phone: string;
}

export function UserInfo({ 
    name,
    phone,
 }: IUserInfoProps): React.ReactElement {

  return (
    <table>
      <thead>
        <tr>
          <th>Username</th>
          <th>Phone number</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{name}</td>
          <td>{phone}</td>
        </tr>
      </tbody>
    </table>
  );
}