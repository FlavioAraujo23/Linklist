import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from 'next-auth';
import UsernameForm from "@/Components/forms/UsernameForm";
import { Page, PageSchema } from "@/models/Page";
import mongoose from "mongoose";


export default async function AccountPage({searchParams}) {
  const session = await getServerSession(authOptions);
  const desiredUsername = searchParams?.desiredUsername;

  if(!session) {
    redirect('/')
  }
  mongoose.connect(process.env.MONGO_URI);
  const page = await mongoose.model('Page').findOne({owner: session?.user.email});
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