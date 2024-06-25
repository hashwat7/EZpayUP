import { useNavigate } from "react-router-dom";
export const Appbar = ({ username }) => {
  const navigate = useNavigate();
  const initials =
    username.firstName[0].toUpperCase() + username.lastName[0].toUpperCase();
  const fullName = username.firstName + " " + username.lastName;

  const handleLogout = () => {
    // Implement your logout logic here
    // Example: Clear user session, navigate to login page, etc.
    localStorage.setItem("token", "");
    navigate("/signin");
    console.log("Logging out...");
    // Example: navigate('/login');
  };

  return (
    <div className="shadow h-14 flex justify-between items-center bg-white px-4">
      <div className="text-lg font-bold">EZPayUP</div>
      <div className="flex items-center">
        <div className="mr-4">Hello, {fullName}</div>
        <button
          onClick={handleLogout}
          className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-300"
        >
          Logout
        </button>
        <div className="rounded-full h-12 w-12 bg-gray-300 flex items-center justify-center ml-4">
          <div className="text-xl font-bold">{initials}</div>
        </div>
      </div>
    </div>
  );
};
