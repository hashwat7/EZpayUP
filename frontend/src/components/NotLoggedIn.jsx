import { BottomWarning } from "./BottonWarning";

export const NotLoggedIn = () => {
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white  text-center p-10 w-80 h-max px-4">
          <span>You aren't signed in</span>
          <BottomWarning
            label={"Please sign in to continue"}
            buttonText={"Sign in"}
            to={"/signin"}
          />
        </div>
      </div>
    </div>
  );
};
