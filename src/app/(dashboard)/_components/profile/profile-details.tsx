import { useState } from "react";
import { useAuthContext } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import EditProfile from "@/app/(dashboard)/_components/profile/edit-profile";

const ProfileDetails = () => {
  const { user } = useAuthContext();
  const [editMode, setEditMode] = useState(false);

  if (editMode) {
    return (
      <EditProfile onEditModeExit={() => setEditMode(false)} user={user} />
    );
  }

  return (
    <>
      <div>
        <h1 className="text-4xl font-semibold">{user.name}</h1>
        <h3 className="text-muted-foreground">{user.email}</h3>
      </div>

      {user.status && <div>{user.status}</div>}

      <Button
        variant="secondary"
        className="w-full"
        onClick={() => setEditMode(true)}
      >
        Edit Profile
      </Button>
    </>
  );
};

export default ProfileDetails;
