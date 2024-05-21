import createUser from "@/components/user-auth/users/CreateUser";

export async function POST(request: Request) {
  const code = await createUser("admin2@gmail.com", "12345");
  let msg = "";
  if (code === 201) {
    msg = "user has been created";
  } else if (code === 2002) {
    msg = "Email has already exist!";
  } else {
    msg = "Invalid email or password!";
  }
  return new Response(JSON.stringify(msg), {
    headers: { "Content-Type": "application/json" },
  });
}
