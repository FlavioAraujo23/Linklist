import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from 'next-auth';
import UsernameForm from "@/Components/forms/UsernameForm";
import { Page } from "@/models/Page";


export default async function AccountPage({searchParams}) {
  const session = await getServerSession(authOptions);
  const desiredUsername = searchParams?.desiredUsername;

  if(!session) {
    redirect('/')
  }

  const page = await Page.findOne({owner: session?.user.email});
  if(page) {
    return (
      <div>Sua página é: /{page.uri}</div>
    )
  }
  return(
    <div>
      <UsernameForm desiredUsername={desiredUsername} />
    </div>
  )
}