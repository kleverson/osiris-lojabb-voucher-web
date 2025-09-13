import "./style.css";
type props = {
  theme: "BLUE" | "YELLOW";
};

const Loading = ({ theme }: props) => {
  return (
    <div className="bg-yellow h-screen w-screen flex justify-center items-center">
      <span
        className="loader"
        style={{ "--border-color": theme == "BLUE" ? "#465EFF" : "#FCFC30" }}
      ></span>
    </div>
  );
};

export default Loading;
