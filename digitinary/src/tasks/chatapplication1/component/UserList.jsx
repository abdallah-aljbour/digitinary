// UserList.js
const UserList = ({ users }) => {
  return (
    <div className="p-4 bg-gray-200 rounded-lg shadow-sm">
      <h2 className="font-bold text-lg mb-2">Active Users</h2>
      <ul className="space-y-2">
        {users.map((user) => (
          <li key={user.id} className="p-2 bg-white rounded shadow-sm">
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
