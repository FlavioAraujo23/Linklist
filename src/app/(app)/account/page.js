import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from 'next-auth';
import UsernameForm from "@/Components/forms/UsernameForm";
import mongoose from "mongoose";
import { Page } from "@/models/Page";
import PageSettingsForm from "@/Components/forms/PageSettingsForm";
import PageButtonsForm from "@/Components/forms/PageButtonsForm";
import PageLinksForm from "@/Components/forms/PageLinksForm";
import cloneDeep from "clone-deep";

export default async function AccountPage({searchParams}) {
  const session = await getServerSession(authOptions);
  const desiredUsername = searchParams?.desiredUsername;

  if(!session) {
    redirect('/')
  }
  mongoose.connect(process.env.MONGO_URI);
  const page = await Page.findOne({owner: session?.user?.email});

  const leanPage = cloneDeep(page.toJSON());
  leanPage._id = leanPage._id.toString();

  if(page) {
    return (
      <>
        <PageSettingsForm page={leanPage} user={session.user} />
        <PageButtonsForm page={leanPage} user={session.user} />
        <PageLinksForm page={leanPage} user={session.user} />
      </> 
    )
  }
  return(
    <div>
      <UsernameForm desiredUsername={desiredUsername} />
    </div>
  )
}