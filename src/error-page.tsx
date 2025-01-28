import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <>
      <div className="sm:container flex flex-col justify-center sm:mx-auto px-20 h-screen">
        <div id="error-page">
          <h1 className="font-semibold">Oops!</h1>
          <br />
          <p>Sorry, an unexpected error has occurred.</p>
        </div>
      </div>
    </>
  );
}
