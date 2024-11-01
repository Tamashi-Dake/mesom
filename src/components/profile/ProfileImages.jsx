const ProfileImages = ({ avatarImg, coverImg }) => {
  return (
    <div className="relative group/cover">
      <img
        src={coverImg || "/placeholder.png"}
        className="h-52 w-full object-cover"
        alt="cover image"
      />
      <div className="avatarImg absolute -bottom-16 left-4">
        <div className="w-32 h-32 rounded-full border-4 border-white relative group/avatarImg">
          <img
            className="w-full h-full object-cover rounded-full"
            src={avatarImg || "/placeholder.png"}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileImages;
