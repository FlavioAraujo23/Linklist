import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from 'next-auth';
import UsernameForm from "@/Components/forms/UsernameForm";
import { Page, PageSchema } from "@/models/Page";
import mongoose from "mongoose";
import PageSettingsForm from "@/Components/forms/PageSettingsForm";


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
      <PageSettingsForm page={page} user={session.user} />
    )
  }
  return(
    <div>
      <UsernameForm desiredUsername={desiredUsername} />
    </div>
  )
}