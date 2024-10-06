import { auth, signOut } from "@/auth";
import { Button } from "@nextui-org/react";
import { FaRegSmile } from "react-icons/fa";

const Home = async () => {
  const session = await auth();

  return (
    <div>
      <h1 className="text-3xl">Hello app!</h1>
      <h3 className="text-2xl fonts-semibold">Users session data:</h3>
      {session ? (
        <div>
          <pre>{JSON.stringify(session, null, 2)}</pre>
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <Button
              type="submit"
              color="primary"
              variant="bordered"
              startContent={<FaRegSmile size={20} />}
            >
              Sign Out
            </Button>
          </form>
        </div>
      ) : (
        <div>Not signed in</div>
      )}
    </div>
  );
};

export default Home;
