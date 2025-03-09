import { redirect } from "next/navigation";
import { getUserSession } from "@/app/api/utils";
import { prisma } from "@/prisma/prisma-client";
import { ProfileForm } from "@/components/shared";

export default async function ProfilePage() {
  const session = await getUserSession()

  if (!session) {
    return redirect('/not-authenticated')
  }

  const user = await prisma.user.findFirst({
    where: {
      id: Number(session.id)
    }
  })

  if (!user) {
    return redirect('/not-authenticated')
  }

  return <ProfileForm data={user} />
}