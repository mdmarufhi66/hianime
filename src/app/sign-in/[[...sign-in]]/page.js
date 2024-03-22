import { SignIn } from "@clerk/nextjs";

export const metadata = {
  title: "ZenAnime | Sign in",
  description: "Sign in",
};

export default function Page() {
  return (
    <div className="flex items-center justify-center my-10">
      <SignIn />
    </div>
  );
}
