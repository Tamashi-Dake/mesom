const ProfileImages = ({ avatarImg, coverImg }) => {
  return (
    <div className="relative group/cover">
      <img
        src={coverImg || "https://placehold.co/1000x1000"}
        className="h-52 w-full object-cover"
        alt="cover image"
      />
      <div className="avatarImg absolute -bottom-16 left-4">
        <div className="w-32 rounded-full relative group/avatarImg">
          <img src={avatarImg || "https://placehold.co/1000x1000"} />
        </div>
      </div>
    </div>
  );
};

export default ProfileImages;
