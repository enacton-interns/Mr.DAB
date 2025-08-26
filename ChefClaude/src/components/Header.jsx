import logo from "../assets/chef-claude-icon.png";

const Header = () => {
  return (
    <header className="flex justify-center items-center gap-[11px] h-[80px] bg-white shadow-md">
      <img src={logo} alt="ChefClaude-Logo" className="w-[50px]" />
      <h1 className="font-normal text-xl">Chef Claude</h1>
    </header>
  );
};

export default Header;
