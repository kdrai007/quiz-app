import { Link } from "react-router-dom";
export const NavBar = () => {
  return (
    <div className="px-4 py-2 bg-black">
      <Link to="/">
        <h2 className="cursor-pointer text-white">Home</h2>
      </Link>
    </div>
  );
};
