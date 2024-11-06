import { useQuery } from "@tanstack/react-query";
import { getSuggestedUsers } from "../services/userService";
import UserCardSkeleton from "./skeleton/UserCardSkeleton";
import UserCard from "./shared/UserCard";

const FameSidebar = () => {
  const userQuery = useQuery({
    queryKey: ["suggestedUsers"],
    queryFn: getSuggestedUsers,
  });

  return (
    <div className="px-6 py-4 col-span-1 h-full hidden lg:block ">
      <div className="rounded-xl bg-neutral-100 px-4">
        <h2 className="text-xl p-2 font-semibold">Who to follow</h2>
        <div className="flex flex-col gap-4">
          {/* item */}
          {userQuery.isLoading && (
            <>
              <UserCardSkeleton />
              <UserCardSkeleton />
              <UserCardSkeleton />
            </>
          )}
          {userQuery.data && (
            <>
              <UserCard user={userQuery.data.admin} />
              {userQuery.data.suggestedUsers.map((suggestedUser) => (
                <UserCard key={suggestedUser._id} user={suggestedUser} />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FameSidebar;
