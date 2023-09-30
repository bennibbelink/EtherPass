const LandingPage = () => {
  // check if metamask account
  // if not, show a message to install metamask
  return (
    <div className="flex flex-col items-center gap-4 m-4">
      <h1 className="text-4xl">Welcome to EtherPass</h1>
      <p className="prose text-center">
        Create a registry for safer password keeping
      </p>
    </div>
  );
};

export default LandingPage;
