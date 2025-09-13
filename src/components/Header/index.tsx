type props = {
  title: string;
};

const Header = ({ title }: props) => {
  return (
    <header>
      <div className="container flex flex-col gap-6 md:gap-0 md:flex-row items-start md:items-center px-5">
        <img src="/imgs/brand_rescue.svg" className="h-20 md:h-auto" alt="" />
        <h1 className="text-[32px] md:text-5xl font-medium text-[#465EFF] relative md:left-[-100px]">
          {title}
        </h1>
      </div>
    </header>
  );
};

export default Header;
