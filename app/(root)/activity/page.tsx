import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { fetchUser, getActivity } from "@/lib/actions/user.actions";
import Image from "next/image";
import Link from "next/link";

const Page = async () => {
  const user = await currentUser();

  if(!user) return null;

  const userInfo = await fetchUser(user.id);

  if(!userInfo?.onboarded) redirect('/onboarding');

  //getAcitivties
  const activities = await getActivity(userInfo._id);

    return (
      <section>
          <h1 className="head-text mb-10">Activity</h1>
          <section className="mt-10 flex flex-col gap-5">
            {activities.length > 0 ? (
              <>
                {activities.map((activity) => (
                  <Link key={activity._id} href={`/thread/${activity.parentId}`}>
                    <article className="activity-card">
                      <Image src={activity.author.image} alt="profile picture" width={20} height={20} className="rounded-full object-cover"/>
                      <p className="!text-small-regular text-light-1">
                        <span className="text-primary-500">
                          {activity.author.name}
                        </span>{" "}
                        repiled to your thread
                      </p>
                    </article>
                  </Link>
                ))}
              </>
            ) : (
              <p className="!text-base-regular text-light-1">No Activity Yet</p>
            )}
          </section>
      </section>
    )
  }
  
  export default Page;