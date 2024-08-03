import { Link } from "react-router-dom";

function LoginPage() {
  return (
    <div className="mt-4 flex flex-col gap-2 justify-around grow items-center">
      <div className="mb-64 flex flex-col gap-3">
        <h1 className="text-4xl text-center">Login</h1>
        <form className="max-w-sm mx-auto">
          <input type="email" placeholder="your@email.com" />
          <input type="password" placeholder="Password" />
          <button className="primary ">Login</button>
        </form>
          <div className="text-center text-gray-500">Don&apos;t have an account? <Link className="underline text-primary" to='/register'>Register Now!</Link></div>
      </div>
    </div>
  );
}

export default LoginPage;
